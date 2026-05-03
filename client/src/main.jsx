import { createRoot } from 'react-dom/client'
import { BrowserRouter,Route,Routes } from 'react-router'
import './index.css'

import App from './App.jsx'

import SubCategories from './components/02.SubCategories.jsx'
import ShowFunds from './pages/01.ShowFunds.jsx'
// import FundDetails from './components/04.FundDetails.jsx';

//Auth Routes.
import Login from './pages/02.Login.jsx'
import SignUp from './pages/03.SignUp.jsx'
// import ProtectedRoute from './pages/04.ProtectedRoute.jsx';

createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
    <Routes>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />


      {/* fund routes */}

      {/* <Route path="/" element={<ProtectedRoute> <App /> </ProtectedRoute>}/> */}
      <Route path="/" element={<App/>} />
      
      {/* <Route path="/home" element={<ProtectedRoute> <App /> </ProtectedRoute>}/> */}
      <Route path="/home" element={<App />}/>

      {/* <Route path="/fund" element={<ProtectedRoute> <ShowFunds/> </ProtectedRoute>}/> */}
      <Route path="/fund" element={<ShowFunds/>}/>

      {/* <Route path="/fund/:schemeCode" element={<ProtectedRoute> <FundDetails/> </ProtectedRoute>}/> */}
      {/* <Route path="/fund/:schemeCode" element={<FundDetails/>}/> */}

      {/* Fetch the sub category from the category selected */}
      <Route path={"/:category"} element={<SubCategories/>}/>
      

    </Routes>
  </BrowserRouter>
)
