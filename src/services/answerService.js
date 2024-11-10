import { get, post } from "../utils/request";

export const createAnswer = async (data) => {
    const result = await post(`http://localhost:3002/answers`, data);

    return result
};

export const getListAnswerById = async (id) => {
    const result = await get(`http://localhost:3002/answers/${id}`);

    return result
};