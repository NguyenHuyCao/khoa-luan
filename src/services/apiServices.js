import axios from "../utils/axiosCustomize";

const getUsers = () => {
  // return axios.get("api/v1/quizz/quizzes");
  return axios.get("/users");
};

const addUser = (fullname, email, phone_number, address, password) => {
  return axios.post(
    "/users/",
    {
      fullname,
      email,
      phone_number,
      address,
      password,
    },
    {
      // headers: {
      //   // Authorization: `Bearer ${token}`,
      // },
      // withCredentials: true, // Nếu cần gửi cookie
    }
  );
};

export { getUsers, addUser };
