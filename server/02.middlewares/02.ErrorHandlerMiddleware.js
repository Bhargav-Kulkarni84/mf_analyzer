async function ErrorHandlerMiddleware(err,req,res,next){

    err.statusCode = err.statusCode || 500; 
    err.status = err.status || 'server error'; 

    //If the error is operational error and has a redirection link attached.
    if(err.isOperational && err.redirectTo){

        return res.status(err.statusCode)
                  .json({type: err.status, message : err.message, redirectTo : redirectTo});
    }

    return res.status(err.statusCode)
              .json({type: err.status, message : err.message, stack: err.stack});

}

export default ErrorHandlerMiddleware;