const token = localStorage.getItem("token") || "null";

export const headers = {
    "authorization": "Bearer " + JSON.parse(token)
};
