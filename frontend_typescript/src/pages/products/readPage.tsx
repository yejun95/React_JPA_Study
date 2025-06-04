
import {useLoaderData, useParams} from "react-router";
import { LoaderFunctionArgs } from "react-router";
import ReadComponent from "../../components/products/readComponent";
import jwtAxios from "../../util/jwtUtil";
import {useQuery} from "@tanstack/react-query";
import PendingModal from "../../components/common/pendingModal.tsx";

// export async function loadProduct({params}: LoaderFunctionArgs) {
//   const {pno} = params
//   const res = await jwtAxios.get(`http://localhost:8080/api/products/${pno}`)
//   return res.data
// }


function ReadPage() {
  // const product:ProductDTO = useLoaderData()

  const { pno } = useParams()

  const {data, isPending, error} = useQuery({
    queryKey: ['products', pno], // 캐싱 이름
    queryFn: async () => { // 반환해줄 함수
      const res = await jwtAxios.get(`http://localhost:8080/api/products/${pno}`)
      return res.data
    },
    staleTime: 1000 * 60 * 24 // api 신선도 유지 시간
  })

  const product = data

  return (  
    <div className="w-full">   
      <div>Product Read</div>
      {isPending && <PendingModal/>}
      {product &&
        <ReadComponent product={product}></ReadComponent>
      }
  </div>

  );
}

export default ReadPage;