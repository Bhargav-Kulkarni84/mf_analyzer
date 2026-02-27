import { createRoot } from 'react-dom/client'
import { BrowserRouter,Route,Routes } from 'react-router'
import './index.css'
import App from './App.jsx'

import ShowFunds from './pages/ShowFunds.jsx'
import FundCard from './components/FundCard.jsx'
import GetRollingReturn from './components/GetRollingReturn.jsx'
import SubCategories from './components/SubCategories.jsx'
import Categories from './components/Categories.jsx'
import Test from './components/Test.jsx'

let y = 2;

createRoot(document.getElementById('root')).render(
  <BrowserRouter>

    <Routes>

      <Route path='/' element={<Categories/>}/>

      {/* fund routes */}
      <Route path="/fund" element={<ShowFunds/>}/>

      <Route path={"/rolling"} element={<GetRollingReturn/>}/>
      
      {/* Fetch the specific details of the fund given the id of the fund */}
      <Route path={"/fund/:id"} element={<FundCard/>}/>

      {/* <Route path={"test"} element={<SubCategories/>}/> */}

      <Route path={"/:category"} element={<SubCategories/>}/>

      <Route path={"/:category/:subcategories"} element={<SubCategories/>}/>
    

    </Routes>
  </BrowserRouter>
)
