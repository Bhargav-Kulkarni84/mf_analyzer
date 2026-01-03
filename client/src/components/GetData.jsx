import axios from 'axios';
import FundTitle from '../pages/FundTitle';

import { useState,useEffect } from 'react';

export default function GetData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get('http://localhost:3000/getData');
      setData(res.data);
    };
    getData();
  }, []);

  if (data.length === 0) {
    return <div>Data Loading...</div>;
  }

  return (
    <div className=" grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((fund, index) => (
        <FundTitle key={index} fund={fund} index={index} />
      ))}
    </div>
  );
}
