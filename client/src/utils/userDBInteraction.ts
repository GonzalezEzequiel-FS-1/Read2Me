import axios from "axios";

const DBURL = import.meta.env.DBURL || "http://localhost:3003/api";

const createUser = async (email: string, uid: string) => {
  try {
    const response = await axios.post(`${DBURL}/user`, { email, uid });
    return response.data;
  } catch (err: any) {
    return { success: false, error: err.message };
  }
};

export default createUser;
