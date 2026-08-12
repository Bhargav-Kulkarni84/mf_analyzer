//A wrapper function to store the status of promises.
const wrap = (promise,index)=>{
    return promise
    .then(
        //Success handler.
        ()=>{
            // console.log(`Succesfully Inserted the ${index}-th fund`);
            return {status : "success", index};
        },
        //Failure Handler.
        (e)=>{
            //On error we return the status as failed along with fund's index and the error.
            // console.log(`Insertion Failed for the fund with scheme-code ${index}-th fund`, e.message)
            return {status : "failed", index:index, error: e};
        }
    )
}

export {wrap}