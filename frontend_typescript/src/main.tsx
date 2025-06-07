import {createRoot} from 'react-dom/client'
import './index.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    {/*<Provider store={store}>* zustand 적용으로 인한 redux toolkit 부분 주석 진행/}
      <RouterProvider router={router}></RouterProvider>
    {/*</Provider>*/}
    <ReactQueryDevtools initialIsOpen={true}/>
  </QueryClientProvider>
)
