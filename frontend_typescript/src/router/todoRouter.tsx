import {lazy, Suspense} from "react";
import {Navigate} from "react-router";

const Loading = () => <div>Loading...</div>
const TodoIndex = lazy(() => import("../pages/todo/indexPage.tsx"))
const TodoList = lazy(() => import("../pages/todo/listPage.tsx"))
const TodoRead = lazy(() => import("../pages/todo/readPage.tsx"))

const todoRouter = () => {
  return (
    {
      path: 'todo',
      Component: TodoIndex,
      children: [
        { // /todo 경로로 들어오면 바로 list 페이지를 보여주도록 리다이렉트한다.
          path: "",
          element: <Navigate to={'/todo/list'}/>
        },
        {
          path: 'list',
          element: <Suspense fallback={<Loading/>}><TodoList/></Suspense>
        },
        {
          path: 'read/:tno',
          element: <Suspense fallback={<Loading/>}><TodoRead/></Suspense>
        },
      ]
    }
  )
}

export default todoRouter