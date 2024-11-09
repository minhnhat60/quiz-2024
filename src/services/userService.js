import { get, post } from "../utils/request";

export const getUser = async (email, password) => {
    var stringPassword = "";

    if(password) {
        stringPassword = `&password=${password}`
    }
    const result = await get(`http://localhost:3002/users?email=${email}${stringPassword}`);

    return result;
};

export const createUser = async (data) => {
    const result = await post(`http://localhost:3002/users`, data);

    return result;
}
