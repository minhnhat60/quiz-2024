export const get = async (api) => {
    const response = await fetch(api);
    const result = await response.json();

    return result;
}

export const post = async (api, data) => {
    const response = await fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();

    return result;
}

export const patch = async (api, data) => {
    const response = await fetch(api, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();

    return result;
}

export const del = async (api) => {
    const response = await fetch(api, {
        method: "DELETE"
    });

    const result = await response.json();

    return result;
}