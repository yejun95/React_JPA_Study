import {createSearchParams, useLoaderData} from "react-router";
import ListComponent from "../../components/products/listComponent";
import {useQuery} from "@tanstack/react-query";
import useCustomMove from "../../hooks/useCustomMove.tsx";
import jwtAxios from "../../util/jwtUtil.ts";
import PendingModal from "../../components/common/pendingModal.tsx";


// export async function loadProducts({request}: LoaderFunctionArgs) {
//
//   const url = new URL(request.url);
//   const page = url.searchParams.get('page') || "1";
//   const size = url.searchParams.get('size') || "10";
//   const queryStr = createSearchParams({page,size}).toString()
//   const res = await jwtAxios.get(`http://localhost:8080/api/products/list?${queryStr}`)
//
//   return res.data
// }

  
const ListPage = () => {

  //const pageResponse = useLoaderData()

  const {page, size} = useCustomMove()
  const queryStr = createSearchParams({page: String(page), size: String(size)}).toString()

  const {data, isPending, error} = useQuery({
    queryKey: ['products/list'], // 캐싱 이름
    queryFn: async () => { // 반환해줄 함수
      const res = await jwtAxios.get(`http://localhost:8080/api/products/list?${queryStr}`)

      return res.data
    },
    staleTime: 1000 * 20 // api 신선도 유지 시간
  })

  let pageResponse;

  if (data) {
    pageResponse = data
  }

  return ( 
  <div className="w-full mt-4 border border-solid border-neutral-300 shadow-md">
    <div className="text-2xl m-4 font-extrabold">
    Products List Page
    </div>

    {isPending && <PendingModal/>}

    {pageResponse &&
      <ListComponent serverData={pageResponse}></ListComponent>
    }

  </div>
  );
}
  
  export default ListPage;