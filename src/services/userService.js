import { get } from "../utils/request";

export const getUser = async (email, password) => {
    const result = await get(`http://localhost:3002/users?email=${email}&password=${password}`);

    return result;
};
