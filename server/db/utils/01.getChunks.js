/* 
    This function divides the array in chunks. 
    The chunk size is passed as a argument.
*/

function getChunks(arr, chunkSize){

    const chunks = [];

    for(let i=0; i<arr.length; i+=chunkSize){

        const chunk = arr.slice(i,i+chunkSize);
        chunks.push(chunk);

    }

    return chunks;

}

export {getChunks}