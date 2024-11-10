import { get } from "../utils/request";

export const getListQuestion = async (topicId) => {
    const result = await get(`http://localhost:3002/questions?topicId=${topicId}`);

    return result;
}