import { BrowserRouter,Route,Routes} from "react-router";
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import GetData from './components/GetData';
import Temp from './components/Temp';
import './index.css';

createRoot(document.getElementById('root')!).render(

<BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/getdata" element={<GetData/>} />
    <Route path='/temp' element={<Temp/>}/>
  </Routes>
</BrowserRouter>

)
