
import Index from "../05.pages/00.Index.jsx"

import ShowFunds from "../05.pages/01.ShowFunds.jsx";
import SubCategories from '../01.components/02.SubCategories.jsx'
import FundDetails from '../01.components/04.FundDetails.jsx';

import NoRouteFound from "./NoRouteFound.jsx";
import { Children } from "react";

const fundRoutes = [

    {
        path : "/",
        element:<Index/>
    },

    {
        path: "/funds",
        element: <ShowFunds />,
    },

    {
        path: "/funds/scheme/:schemeCode",
        element: <FundDetails />,
    },

    {
        path: "/funds/category/:category/:subcategory",
        element: <SubCategories />,
    },

    {
        path : "*",
        element:<NoRouteFound/>
    }


]

export default fundRoutes;

