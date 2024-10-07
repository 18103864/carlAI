import axios from "axios"

const API = axios.create({
    baseURL: "https://carlai.onrender.com/api/",
});

export const GetPosts = async () => API.get("/post/");
export const CreatePost = async (data) => API.post("/post/", data);
export const GenerateAIImage = async (data) => API.post("/generateImage/", data);