import {createBrowserRouter} from "react-router-dom";
import fundRoutes from "./01.FundRoutes.jsx"

const allRoutes = [...fundRoutes];
const router = createBrowserRouter(allRoutes);

export default router;