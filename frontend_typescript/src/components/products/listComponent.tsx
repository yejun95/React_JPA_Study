import useCustomMove from "../../hooks/useCustomMove";
import PageComponent from "../common/pageComponent";
import {useQueryClient} from "@tanstack/react-query";


function ListComponent({serverData}: {serverData:PageResponseDTO<ProductDTO>}) {

  const {moveToList, moveToRead, page, size} = useCustomMove()

  const queryClient = useQueryClient()

  const moveCheckPage = (pageParam: PageParam) => {
    const pageValue = pageParam.page
    const sizeValue = pageParam.size ? pageParam.size : 10

    if (pageValue === page && sizeValue === size) {

      if (!confirm("동일한 페이지를 다시 호출할까요?")) {
        return
      }

      queryClient.invalidateQueries({
        queryKey: ['products/list'],
        exact: false
      })
    }

    moveToList(pageParam)
  }

  return (
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2 text-2xl">
   
     <div className="flex flex-wrap mx-auto p-6 bg-white">
   
      {serverData.dtoList.map(product =>
   
      <div
      key= {product.pno} 
      className="w-1/2 p-1 rounded shadow-md border-2 border-gray-200"
      onClick={() => moveToRead(product.pno)}
      > 
   
       <div className="flex flex-col h-full">
        <div className="font-extrabold text-2xl p-2 w-full ">
         {product.pno}
        </div>
        <div className="text-1xl m-1 p-2 w-full flex flex-col">
 
         <div className="w-full overflow-hidden ">
          <img alt="product"
          className="m-auto rounded-md w-60" 
          src={`http://localhost:8080/api/products/view/s_${product.uploadFileNames[0]}`}/>
         </div>
   
         <div className="bottom-0 font-extrabold bg-white">
          <div className="text-center p-1">
           이름: {product.pname}
          </div>
          <div className="text-center p-1">
           가격: {product.price}
          </div>
         </div>
   
        </div>
       </div>
      </div>
      )}
     </div>
  
     <PageComponent serverData={serverData} movePage={moveCheckPage}></PageComponent>
  
    </div>
 );
}

export default ListComponent;
