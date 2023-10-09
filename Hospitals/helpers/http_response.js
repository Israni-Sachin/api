const successResponse = (res, message, data) => {
    res.status(200).json({
        status: 200,
        message,
        data
    })
}

const errorResponse = (res, message, status = 500) => {
    res.status(status).json({
        status,
        message
    });
}

module.exports = { successResponse, errorResponse }

// error manager
// class Errors {
//     code: int;
//     messsage: string;
//     httpCode: int;
//     defaultMessage: string;
// }

// constructor(error, message) {
//     this.code = error.code;
//     this.message = message || defaultMessage
//     this.httpCode = error.httpCode
//     this.defaultMessage = error.message
// }

// getError and getHttpError and _geterrorByName


// error config
// {
//     'error message str': {
//         DEFAULT_MSG: '';
//         CODE: 1;
//         HTTP_CODE: 404
//     }
// }

// httpResponse
//         sendFaliure(req,res,error,errors=()){
//             res.status(error.httpCode||500)
//             const response ={
//                 status:error.httpCode||500,
//                 message:error.message,
//                 if(errors){
//                     response.errors = error
//                 }
//             }
//             console.log(response);
//             res.josn(response);
//         }

// bulk data insertion

// Promise.all,any,race