import React from 'react';

function PageComponent({serverData, movePage}) {

    //serverData.prev, pageNumList, next 등을 이용하여 화면 구성
    return (
        <div className={'m-6 flex justify-items-center'}>

            {/* 이전 버튼 */}
            {serverData.prev ?
                <div
                    className={'m-2 p-2 w-16 text-center font-bold text-blue-400'}
                    onClick={() => movePage({page: serverData.prevPage})}>
                    Prev </div> : <></>}

            {/* 페이지 리스트 */}
            {serverData.pageNumList.map(pageNum =>
                <div
                    key={pageNum}
                    className={`m-2 p-2 w-12 text-center rounded shadow-md text-white ${serverData.current === pageNum? 'bg-gray-500': 'bg-blue-400'}`}
                    onClick={() => movePage({page: pageNum})}>
                    {pageNum}
                </div>
            )}

            {/* 다음 버튼 */}
            {serverData.next ?
                <div
                    className={'m-2 p-2 w-16 text-center font-bold text-blue-400'}
                    onClick={() => movePage({page: serverData.nextPage})}>
                    Next
                </div> : <></>}

        </div>
    );
}

export default PageComponent;