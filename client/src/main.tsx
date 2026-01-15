import { BrowserRouter,Route,Routes} from "react-router";
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css';

//Import all the components.
import GetData from './pages/AllFundData.jsx';
import FundDetails from './pages/FundDetails.jsx'
import HygineCheck from './components/hygine-check/HygineCheck.jsx'

createRoot(document.getElementById('root')!).render(

<BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/getdata" element={<GetData/>} />
    <Route path='/fundDetails' element ={<FundDetails/>}/>
    <Route path='/hygineCheck' element ={<HygineCheck/>}/>
  </Routes>
</BrowserRouter>

)
