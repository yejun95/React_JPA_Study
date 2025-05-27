
import { useLoaderData } from "react-router";
import { LoaderFunctionArgs } from "react-router";
import ReadComponent from "../../components/products/readComponent";
import jwtAxios from "../../util/jwtUtil";

export async function loadProduct({params}: LoaderFunctionArgs) {
  const {pno} = params
  const res = await jwtAxios.get(`http://localhost:8080/api/products/${pno}`)
  return res.data
}


function ReadPage() {

  const product:ProductDTO = useLoaderData()

  return (  
    <div className="w-full">   
      <div>Product Read</div>
      <ReadComponent product={product}></ReadComponent>
  </div>

  );
}

export default ReadPage;