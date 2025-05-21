import axios from "axios";

const token = "fb21c7ec-0237-42da-a10e-b255a2bff547";
const apiKey = "e1a6e491-0aa1-4106-93a0-5b2ea39aedff";

export const instance =axios.create(({
    baseURL: `https://social-network.samuraijs.com/api/1.1`,
    headers: {
            Authorization: `Bearer ${token}`,
            "API-KEY": apiKey,
          }
}))