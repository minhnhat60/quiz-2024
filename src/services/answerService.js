import { post } from "../utils/request";

export const createAnswer = async (data) => {
    const result = await post(`http://localhost:3002/answers`, data);

    return result
};