from flask import Flask, jsonify, request
from pymongo import MongoClient
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
import pandas as pd
import numpy as np

# Flask app initialization
app = Flask(__name__)

# MongoDB client and database setup
client = MongoClient("mongodb://localhost:27017/")  # Replace with your MongoDB connection string
db = client["medicine_db"]  # Database name
collection = db["medicines"]  # Collection name

# Initialize model and scaler globally
knn = KNeighborsClassifier(n_neighbors=5)
scaler = StandardScaler()
label_encoders = {}

# Helper Function: Train the Model
# def train_model():
#     data = list(collection.find({}, {"_id": 0}))  # Retrieve data from MongoDB, excluding the "_id" field
#     if len(data) < 2:
#         return False  # Not enough data to train
#     df = pd.DataFrame(data)
    
#     # Encoding categorical features
#     categorical_columns = ["Class", "Brand_Name", "Dosage_Form", "Route_of_Administration"]
#     for column in categorical_columns:
#         le = LabelEncoder()
#         df[column] = le.fit_transform(df[column])
#         label_encoders[column] = le
    
#     # Prepare features (X) and target (y)
#     X = df.drop(columns=["Medicine", "Generic_Name", "Indications", "Precautions", "Side_Effects", "Storage_Conditions", "Expiration_Date", "Strength"])
#     y = df["Medicine"]
    
#     # Scale the features
#     X_scaled = scaler.fit_transform(X)
    
#     # Fit the model
#     knn.fit(X_scaled, y)
#     return True


from sklearn.preprocessing import LabelEncoder, MultiLabelBinarizer

# Helper Function: Train the Model
def train_model():
    data = list(collection.find({}, {"_id": 0}))  # Retrieve data from MongoDB, excluding the "_id" field
    if len(data) < 2:
        return False  # Not enough data to train
    df = pd.DataFrame(data)
    
    # Prepare features (X) and target (y)
    X = df.drop(columns=["Medicine", "Generic_Name", "Indications", "Precautions", "Side_Effects", "Storage_Conditions", "Expiration_Date", "Strength"])
    y = df["Medicine"]
    
    # # Handle categorical columns (update this list with the correct columns)
    # categorical_columns = ["Brand_Name", "Class", "Dosage_Form", "Route_of_Administration", "Strength"]
    
    # # Label Encoding for categorical columns that are not lists
    # le = LabelEncoder()
    # for column in categorical_columns:
    #     # Ensure the column contains no list values before encoding
    #     if not isinstance(df[column].iloc[0], list):  # Check if the column contains lists
    #         df[column] = le.fit_transform(df[column])

    # # Handle list columns (Indications, Precautions, Side_Effects)
    # list_columns = ["Indications", "Precautions", "Side_Effects"]
    # for column in list_columns:
    #     mlb = MultiLabelBinarizer(sparse_output=False)
    #     # Ensure no list values are passed to LabelEncoder
    #     if isinstance(df[column].iloc[0], list):
    #         encoded_values = mlb.fit_transform(df[column])
    #         encoded_df = pd.DataFrame(encoded_values, columns=[f"{column}_{category}" for category in mlb.classes_])
    #         df = pd.concat([df, encoded_df], axis=1)
    
    # # Drop the original list columns and categorical columns that have been encoded
    # df = df.drop(columns=list_columns + categorical_columns)
    
    # # Scale the numerical columns
    # X = df.drop(columns=["Medicine"])  # Drop the target column
    # X_scaled = scaler.fit_transform(X)  # Fit and transform the data
    # knn.fit(X_scaled, y)
    
    return True

train_model()
# API 1: Add a Medicine Entry
@app.route("/add", methods=["POST"])
def add_medicine():
    # data = request.json
    # if not all(key in data for key in ["Medicine", "Class", "Brand_Name", "Dosage_Form", "Route_of_Administration", "Side_Effects"]):
    #     return jsonify({"error": "Missing required fields"}), 400
    # collection.insert_one(data)
    if train_model():
        return jsonify({"message": "Medicine added and model trained successfully"}), 201
    return jsonify({"message": "Medicine added, but not enough data to train the model"}), 201

# API 2: Update a Medicine Entry
@app.route("/update/<medicine_name>", methods=["PUT"])
def update_medicine(medicine_name):
    data = request.json
    updated = collection.update_one({"Medicine": medicine_name}, {"$set": data})
    if updated.matched_count == 0:
        return jsonify({"error": "Medicine not found"}), 404
    train_model()
    return jsonify({"message": "Medicine updated and model retrained"}), 200

# API 3: Delete a Medicine Entry
@app.route("/delete/<medicine_name>", methods=["DELETE"])
def delete_medicine(medicine_name):
    deleted = collection.delete_one({"Medicine": medicine_name})
    if deleted.deleted_count == 0:
        return jsonify({"error": "Medicine not found"}), 404
    train_model()
    return jsonify({"message": "Medicine deleted and model retrained"}), 200

# API 4: Retrieve All Medicines
@app.route("/medicines", methods=["GET"])
def get_all_medicines():
    data = list(collection.find({}, {"_id": 0}))
    return jsonify(data), 200

# API 5: Predict Medicine Based on Input (with similarity percentage)
@app.route("/predict", methods=["POST"])
def predict_medicine():
    data = request.json
    required_fields = ["Class", "Brand_Name", "Dosage_Form", "Route_of_Administration", "Side_Effects"]
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400
    
    # Prepare input data for prediction
    input_data = pd.DataFrame([data])
    
    # Encode categorical features
    for column, le in label_encoders.items():
        input_data[column] = le.transform(input_data[column])
    
    # Scale the input data
    input_scaled = scaler.transform(input_data.drop(columns=["Medicine", "Generic_Name", "Indications", "Precautions", "Side_Effects", "Storage_Conditions", "Expiration_Date", "Strength"]))
    
    # Get predictions and distances
    distances, indices = knn.kneighbors(input_scaled)
    medicines = [list(collection.find({}, {"_id": 0}))[index] for index in indices[0]]
    
    # Calculate match percentages based on distances
    total_distance = sum(distances[0])
    percentage_matches = [(medicine["Medicine"], 100 * (1 - distance / total_distance)) for medicine, distance in zip(medicines, distances[0])]
    
    # Sort by highest match percentage
    percentage_matches = sorted(percentage_matches, key=lambda x: x[1], reverse=True)[:5]

    return jsonify({"top_matches": percentage_matches}), 200

# API 6: Compare Input with Existing Medicines (based on similarity)
@app.route("/compare", methods=["POST"])
def compare_medicines():
    data = request.json
    required_fields = ["Class", "Brand_Name", "Dosage_Form", "Route_of_Administration", "Side_Effects"]
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400
    
    # Prepare input data for comparison
    input_data = pd.DataFrame([data])
    
    # Encode categorical features
    for column, le in label_encoders.items():
        input_data[column] = le.transform(input_data[column])
    
    # Scale the input data
    input_scaled = scaler.transform(input_data.drop(columns=["Medicine", "Generic_Name", "Indications", "Precautions", "Side_Effects", "Storage_Conditions", "Expiration_Date", "Strength"]))
    
    # Get distances to all medicines
    distances, indices = knn.kneighbors(input_scaled)
    medicines = [list(collection.find({}, {"_id": 0}))[index] for index in indices[0]]
    
    return jsonify({"similar_medicines": medicines}), 200

# Run the Flask App
if __name__ == "__main__":
    app.run(debug=True)
