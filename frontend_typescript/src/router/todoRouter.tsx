import {lazy, Suspense} from "react";

const Loading = () => <div>Loading...</div>
const TodoIndex = lazy(() => import("../pages/todo/indexPage.tsx"))
const TodoList = lazy(() => import("../pages/todo/listPage.tsx"))

const todoRouter = () => {
  return (
    {
      path: 'todo',
      Component: TodoIndex,
      children: [
        {
          path: 'list',
          element: <Suspense fallback={<Loading/>}><TodoList/></Suspense>
        }
      ]
    }
  )
}

export default todoRouter