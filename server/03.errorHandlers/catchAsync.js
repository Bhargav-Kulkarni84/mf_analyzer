// Takes an async route handler (fn).
// Returns a new Express middleware function.
// Express invokes that middleware with (req, res, next).
// Any rejected Promise is forwarded to Express error handling.

const catchAsync =(fn)=>(
    (req,res,next)=>{
        Promise.resolve(fn(req,res,next))
               .catch(next);
    }
)

export default catchAsync;