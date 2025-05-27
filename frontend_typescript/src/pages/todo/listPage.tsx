import { useSearchParams } from "react-router";
import ListComponent from "../../components/todo/listComponent";


function ListPage() {

  const [queryParams] = useSearchParams()
  
  const page: string | null = queryParams.get("page")
  const size: string | null = queryParams.get("size")
  
  return ( 
  <div className="bg-white w-full">
   <div className="text-4xl">Todo List Page {page} {size}</div>
   <ListComponent/>
  </div>
 );


  return ( 
    <div className="bg-white w-full">
      <div className="text-4xl">Todo List Page</div>
    </div>
   );
}

export default ListPage;