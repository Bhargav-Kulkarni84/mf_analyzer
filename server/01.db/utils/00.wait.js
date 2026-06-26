/*
    --This file takes the time (in ms) as argument and generates delay using promises.
*/

const wait = (delay_ms)=>{
    return new Promise ((resolve) =>{

        //Set timeout executes the function passed in arg1 after arg2 time,.
        setTimeout(resolve,delay_ms);

        //Resolve changes the promise state from pending to fullfilled.
    })
}

export {wait}

// const wait = (delay)=>{
//     return new Promise(resolve =>{
//         return setTimeout(()=>{
//             return resolve();
//         },delay);
//     })
// }
