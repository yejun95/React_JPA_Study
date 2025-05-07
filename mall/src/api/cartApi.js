import jwtAxios from "../util/jwtUtil";

const HOST = `http://localhost:8080/api/cart`

export const getCartItems = async () => {
    const res = await jwtAxios.get(`${HOST}/items`)
    return res.data
}
