import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";

export const MainRouter = [
    {
        path: '/',
        component: HomePage,
        exact:true
    },
    {
        path:'/Product/:id',
        component:ProductPage,
        exact:true
    }
]