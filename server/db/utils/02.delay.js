const wait = (delay_ms)=>{
    return new Promise ((resolve) =>{
        setTimeout(resolve,delay_ms);
    })
}

export {wait}

// function printDelay(dealy_ms){

//     for(let i=delay_ms/1000; i>=0;i--){
//         console.log("");
//     }

// }