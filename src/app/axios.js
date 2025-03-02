import axios from "axios";
 const axiosApi= axios.create({
 baseURL:"http://localhost:8000/api",
 withCredentials:true,
 headers:{"Accept":"application/json"}
});
export default axiosApi