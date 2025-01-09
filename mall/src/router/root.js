import {createBrowserRouter} from 'react-router-dom';
import { Suspense, lazy } from "react";

const Loading = <div>Loading....</div>
const Main = lazy(() => import("../pages/MainPage"));
const About = lazy(() => import("../pages/AboutPage"));
const TodoIndex = lazy(() => import("../pages/todo/indexPage"))
const TodoList = lazy(() => import("../pages/todo/ListPage"))

const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Main/></Suspense>
    },
    {
        path: "about",
        element: <Suspense fallback={Loading}><About/></Suspense>
    },
    {
        path: "todo",
        element: <Suspense fallback={Loading}><TodoIndex/></Suspense>,
        children: [
            {
                path: "list",
                element: <Suspense fallback={Loading}><TodoList/></Suspense>
            }
        ]
    }
])

export default root;