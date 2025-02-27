import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";
import {useState} from "react";

const getNum = (param, defaultValue) => {

    if(!param) {
        return defaultValue;
    }
    return parseInt(param);
}

const useCustomMove = () => {

    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(false);
    const [queryParams] = useSearchParams();

    const page = getNum(queryParams.get('page'), 1);
    const size = getNum(queryParams.get('size'), 10);

    //page=3&size=10
    const queryDefault = createSearchParams({page, size}).toString();

    const moveToList = (pageParam) => {

        let queryStr = "";

        if(pageParam) {
            const pageNum = getNum(pageParam.page, 1);
            const sizeNum = getNum(pageParam.size, 10);

            queryStr = createSearchParams({page: pageNum, size: sizeNum}).toString();
        } else {
            queryStr = queryDefault;
        }

        {/* 동일 페이지를 클릭 했을 때, 값이 refresh 되기 위하여 ListComponent쪽 useEffect에 상태 변화를 줌 */}
        setRefresh(!refresh);
        navigate({
            pathname: '../list',
            search: queryStr
        })
    }

    const moveToModify = (num) => {
        navigate({
            pathname: `../modify/${num}`,
            search: queryDefault
        })
    }

    const moveToRead = (num) => {
        navigate({
            pathname: `../read/${num}`,
            search: queryDefault
        })
    }

    return {moveToList, moveToModify, moveToRead, page, size, refresh}
}

export default useCustomMove;