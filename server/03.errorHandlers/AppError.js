class AppError extends Error{

    constructor(message,statusCode,redirectTo = null){

        //Pass the message to the parent constructor.
        super(message);
        
        //Add the field status code to current AppError object and give it value passed a parameter to constructor.
        this.statusCode = statusCode;
        this.status = "server error"
        
        //If status code starts with 4 then the error is from client side.
        if(Math.floor(statusCode / 100) === 4){
            this.status = "client error"
        }
        
        //Add the redirect to field.
        this.redirectTo = redirectTo;
        
        this.isOperational = true

        Error.captureStackTrace(
            this,
            this.constructor
        )

    }

}

export default AppError