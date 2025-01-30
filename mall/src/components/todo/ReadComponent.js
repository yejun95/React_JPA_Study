import React, {useEffect, useState} from 'react';
import {getOne} from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import {useSearchParams} from "react-router-dom";

const initState = {
    tno: 0,
    title: '',
    content: '',
    dueDate: '',
    complete: false
}

function ReadComponent({tno}) {
    const [todo, setTodo] = useState(initState);
    const [queryParam] = useSearchParams();

    const {moveToList} = useCustomMove();

    useEffect(() => {

        getOne(tno).then(data => {
            console.log(data)
            setTodo(data);
        })

    }, [tno]);

    return (
        <div className={'border-2 border-sky-200 mt-10 m-2 p-4'}>

            {makeDiv('tno', todo.tno)}
            {makeDiv('content', todo.content)}
            {makeDiv('title', todo.title)}
            {makeDiv('Due Date', todo.dueDate)}
            {makeDiv('Complete', todo.complete ? 'Completed' : 'Not yet')}

            {/* buttons...........start */}
            <div className={'flex justify-end p-4'}>

                <button type='button'
                        className={'rounded p-4 m-2 text-xml w-32 text-white bg-blue-500'}
                        onClick={() => moveToList(queryParam)}
                >
                    List
                </button>
            </div>
        </div>
    );


}

// 중괄호 생략 시 return 생략 가능
const makeDiv = (title, value) =>
    <div className={'flex justify-center'}>
        <div className={'relative mb-4 flex w-full flex-wrap items-stretch'}>
            <div className={'w-1/5 p-6 text-right font-bold'}>{title}</div>
            <div className={'w-4/5 p-6 rounded-r border border-solid shadow-md'}>
                {value}
            </div>
        </div>
    </div>

export default ReadComponent;
