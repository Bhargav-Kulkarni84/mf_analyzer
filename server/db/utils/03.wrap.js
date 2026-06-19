
//A wrapper function to store the status of promises.
const wrap = (promise,index)=>{
    return promise
    .then(
        ()=>{
            console.log(`Succesfully Inserted the ${index}-th fund`);
            return {status : "success", index};
        },
        (e)=>{
            console.log(`Failed Insertion of the ${index}-th fund`, e.message)
            return {status : "failed", index,error: e};
        }
    )
}

export {wrap}