import axios from "axios"
const URL = "http://localhost:3001";

export const createCategory = async (categoryData) => {
    try {
        const data = await axios.post(`${URL}/api/categories`, categoryData);
        console.log(data);
        return data;
    }
    catch (error) {
        console.log(error.response.data.message);
    }
}

