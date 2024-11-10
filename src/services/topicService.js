import { get } from "../utils/request";

export const getListTopic = async (data) => {
    const result = await get(`http://localhost:3002/topics`);

    return result;
}

export const getTopic = async (id) => {
    const result = await get(`http://localhost:3002/topics/${id}`);

    return result;
}
