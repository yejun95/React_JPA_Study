import React, {useState} from 'react';
import ResultModal from "../common/ResultModal";
import {postAdd} from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
    title: '',
    content: '',
    dueDate: ''
}

function AddComponent(props) {
    const [todo, setTodo] = useState(initState);

    const [result, setResult] = useState(null);

    const {moveToList} = useCustomMove()

    const handleChangeTodo = (e) => {
        //console.log(e.target.name, e.target.value)

        // todo[title,,, content,,, duedate]
        todo[e.target.name] = e.target.value;

        setTodo({...todo})
    }

    const handleClickAdd = () => {
        //console.log('todo', todo)
        postAdd(todo).then(data => {
            // Response: {TNO: ...}
            setResult(data.TNO);
            setTodo({...initState})
        })
    }

    const closeModal = () => {
        setResult(null)

        // modal close 후 목록으로 이동
        moveToList();
    }

    return (
        <div className={'border-2 border-sky-200 mt-10 m-2 p-4'}>

            {/* TITLE */}
            <div className={'flex justify-center'}>
                <div className={'relative mb-4 flex w-full flex-wrap items-stretch'}>
                    <div className={'w-1/5 p-6 text-right font-bold'}>TITLE</div>
                    <input className={'w-4/5 p-6 rounded-r borer border-solid border-neutral-500 shadow-md'}
                           name={'title'}
                           text={'text'}
                           value={todo.title}
                           onChange={handleChangeTodo}
                    >
                    </input>
                </div>
            </div>

            {/* CONTENT */}
            <div className={'flex justify-center'}>
                <div className={'relative mb-4 flex w-full flex-wrap items-stretch'}>
                    <div className={'w-1/5 p-6 text-right font-bold'}>CONTENT</div>
                    <input className={'w-4/5 p-6 rounded-r borer border-solid border-neutral-500 shadow-md'}
                           name={'content'}
                           text={'text'}
                           value={todo.content}
                           onChange={handleChangeTodo}
                    >
                    </input>
                </div>
            </div>

            {/* DUEDATE */}
            <div className={'flex justify-center'}>
                <div className={'relative mb-4 flex w-full flex-wrap items-stretch'}>
                    <div className={'w-1/5 p-6 text-right font-bold'}>DUEDATE</div>
                    <input className={'w-4/5 p-6 rounded-r borer border-solid border-neutral-500 shadow-md'}
                           name={'dueDate'}
                           type={'date'}
                           value={todo.dueDate}
                           onChange={handleChangeTodo}
                    >
                    </input>
                </div>
            </div>

            {/* ADD BUTTON */}
            <div className={'flex justify-end'}>
                <div className={'relative mb-4 flex p-4 flex-wrap items-stretch'}>
                    <button type={'button'}
                            className={'rounded p-4 w-36 bg-blue-500 text-xl text-white'}
                            onClick={handleClickAdd}
                    >
                        ADD
                    </button>
                </div>
            </div>

            { result ?
                <ResultModal
                        title={'ADD Result'}
                        content={`New ${result} ADD`}
                        callbackFn={closeModal}
                />
                :
                <></>}

        </div>
    );
}

export default AddComponent;