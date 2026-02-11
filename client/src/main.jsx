import { createRoot } from 'react-dom/client'
import { BrowserRouter,Route,Routes } from 'react-router'
import './index.css'
import App from './App.jsx'

import ShowFunds from './components/ShowFunds.jsx'
import FundCard from './components/FundCard.jsx'
import GetRollingReturn from './components/GetRollingReturn.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>

    <Routes>

      <Route path='/' element={<App/>}/>

      {/* fund routes */}
      <Route path="/fund" element={<ShowFunds/>}/>

      <Route path={"/rolling"} element={<GetRollingReturn/>}/>
      
      {/* Fetch the specific details of the fund given the id of the fund */}
      <Route path={"/fund/:id"} element={<FundCard/>}/>
    

    </Routes>
  </BrowserRouter>
)
