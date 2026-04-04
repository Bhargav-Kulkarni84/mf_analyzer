import { createRoot } from 'react-dom/client'
import { BrowserRouter,Route,Routes } from 'react-router'
import './index.css'

import App from './App.jsx'

import SubCategories from './components/02.SubCategories.jsx'
import ShowFunds from './pages/01.ShowFunds.jsx'
import FundDetails from './components/04.FundDetails.jsx';

//Auth Routes.

createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
    <Routes>

      <Route path='/' element={<App/>}/>

      <Route path="/test" element={<FundDetails/>}/>

      {/* fund routes */}
      <Route path="/fund" element={<ShowFunds/>}/>

      <Route path="/fund/:schemeCode" element={<FundDetails/>}/>

      {/* <Route path={"/rolling"} element={<GetRollingReturn/>}/> */}
      
      {/* Fetch the specific details of the fund given the id of the fund */}
      {/* <Route path={"/fund/:id"} element={<FundCard/>}/> */}

      {/* Fetch the sub category from the category selected */}
      <Route path={"/:category"} element={<SubCategories/>}/>

      

    </Routes>
  </BrowserRouter>
)
