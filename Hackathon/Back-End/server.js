const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const _ = require('lodash');

// Initialize Express app
const app = express();
const cors = require('cors');
app.use(cors({ origin: '*' }));

// Use body-parser to parse incoming JSON requests
app.use(bodyParser.json());

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/medicine_db', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// MongoDB schema and model for Medicine
const medicineSchema = new mongoose.Schema({
    Medicine: String,
    Generic_Name: String,
    Class: String,
    Brand_Name: String,
    Dosage_Form: String,
    Route_of_Administration: String,
    Side_Effects: [String],
    Storage_Conditions: String,
    Expiration_Date: String,
    Strength: String,
    Indications: [String],
    Precautions: [String],
    Price: String
});
const Medicine = mongoose.model('Medicine', medicineSchema);

// Helper function: Simple Prediction based on input fields
const predictMedicine = async (inputData) => {
    // Retrieve all medicine data
    const medicines = await Medicine.find({}).exec();

    // Debugging: Log the retrieved medicines and input data
    console.log("All Medicines:", medicines);
    console.log("Input Data:", inputData);

    // Filter medicines based on inputData
    let predictions = medicines.filter(medicine => {
        let match = true;

        // If inputData is empty, do not match
        if (Object.keys(inputData).length === 0) {
            return false;
        }

        // Iterate over inputData keys to perform comparison
        for (const key in inputData) {
            if (inputData[key]) {
                const inputValue = inputData[key].toString().toLowerCase();

                // Ensure the key exists in the medicine object
                if (medicine[key]) {
                    const medicineValue = medicine[key].toString().toLowerCase();

                    // Special case for formula or other substring-sensitive fields
                    if (key === "formula") {
                        // Check if inputValue is a substring of medicineValue
                        if (!medicineValue.includes(inputValue)) {
                            match = false;
                            break;
                        }
                    }
                    // General comparison for other properties
                    else if (!medicineValue.includes(inputValue)) {
                        match = false;
                        break;
                    }
                } else {
                    // If the key does not exist in the medicine object
                    match = false;
                    break;
                }
            }
        }

        return match;
    });

    // Debugging: Log predictions
    console.log("Predictions:", predictions);

    return predictions;
};


app.post('/glucose', (req, res) => {
    const { age, weight, diet, exercise } = req.body;
    const coefficients = {
        Age: 0.5,         // Hypothetical coefficient for Age
        Weight: 0.3,      // Hypothetical coefficient for Weight
        Diet: 20,         // Hypothetical coefficient for Diet (0=Low Carb, 1=High Carb)
        Exercise: -5,     // Hypothetical coefficient for Exercise (0=None, 1=Low, 2=High)
        Intercept: 100    // Hypothetical Intercept value
    };
    // Validate the input
    if (age == undefined || weight == undefined || diet == undefined || exercise == undefined) {
        return res.status(400).json({ error: 'Missing required input data' });
    }

    // Apply the formula for prediction
    const predictedGlucose = (
        (coefficients.Age * age) +
        (coefficients.Weight * weight) +
        (coefficients.Diet * diet) +
        (coefficients.Exercise * exercise) +
        coefficients.Intercept
    );

    // Return the predicted blood glucose value
    res.json({ predicted_glucose: predictedGlucose });
});

// API 1: Add a Medicine Entry
app.post('/add', async (req, res) => {
    const data = req.body;
    const newMedicine = new Medicine(data);
    try {
        await newMedicine.save();
        res.status(201).json({ message: 'Medicine added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error adding medicine' });
    }
});

// API 2: Update a Medicine Entry
app.put('/update/:medicineName', async (req, res) => {
    const { medicineName } = req.params;
    const data = req.body;
    try {
        const updated = await Medicine.updateOne({ Medicine: medicineName }, { $set: data });
        if (updated.nModified === 0) {
            return res.status(404).json({ error: 'Medicine not found' });
        }
        res.status(200).json({ message: 'Medicine updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating medicine' });
    }
});

// API 3: Delete a Medicine Entry
app.delete('/delete/:medicineName', async (req, res) => {
    const { medicineName } = req.params;
    try {
        const deleted = await Medicine.deleteOne({ Medicine: medicineName });
        if (deleted.deletedCount === 0) {
            return res.status(404).json({ error: 'Medicine not found' });
        }
        res.status(200).json({ message: 'Medicine deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting medicine' });
    }
});

// API 4: Retrieve All Medicines
app.get('/medicines', async (req, res) => {
    try {
        const medicines = await Medicine.find().exec();
        res.status(200).json(medicines);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving medicines' });
    }
});

// API 5: Predict Medicine Based on Input (No ML)
app.post('/predict', async (req, res) => {
    const data = req.body;
    // const requiredFields = ["Indications", "Storage_Conditions"];

    // Check for required fields in the input data
    // if (!requiredFields.every(field => field in data)) {
    //     return res.status(400).json({ error: 'Missing required fields' });
    // }
    // includes in the formula sturcture
    // Use simple matching logic to find predictions
    const predictions = await predictMedicine(data);

    if (predictions.length > 0) {
        res.status(200).json({ predicted_medicines: predictions });
    } else {
        res.status(404).json({ message: 'No matching medicines found' });
    }
});

// Run the server
const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
