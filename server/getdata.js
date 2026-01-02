import reader from 'xlsx';

const file =reader.readFile('../data/3yr/MidCap3.xlsx');

let data = [];

const sheets = file.SheetNames

for(let i = 0; i < sheets.length; i++)
{
   const temp = reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]])
   temp.forEach((res) => {
      data.push(res)
   })
}


export {data} ;