import ModifyComponent from "../../components/member/modifyComponent"
import BasicMenu from "../../components/menus/basicMenu"
import {useParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import jwtAxios from "../../util/jwtUtil.ts";

function ModifyPage () {
  const { pno } = useParams()

  const { data, isPending, error } = useQuery({
    queryKey: ['product', pno],
    queryFn: async () => {
      const res = await jwtAxios.get(`http://localhost:8080/api/products/${pno}`)
      return res.data
    },
    staleTime: 1000 * 60 * 24
  })

  const product: ProductDTO = data


  return (
      <>
      <BasicMenu/>
      <div className="bg-white my-5 w-full flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">

       <main className="bg-sky-300 md:w-4/5 lg:w-3/4 px-5 py-5">
        <div className=" text-3xl">Member Modify Page</div>
        <div className="bg-white w-full mt-4 p-2">
          <ModifyComponent/>
        </div>
        </main>

      <aside className="bg-green-300 md:w-1/3 lg:w-1/4 px-5 py-40">
       <h1 className="text-2xl md:text-4xl"> Sidebar </h1>
      </aside>

     </div>
    </>
    )
}
export default ModifyPage
