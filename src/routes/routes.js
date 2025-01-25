const devUrl = "http://localhost:4000/";
const prodUrl = "https://lmsportalb.onrender.com/";

// Set BASE_URL depending on the environment
export const BASE_URL = process.env.NODE_ENV === 'production' ? devUrl : devUrl;

export const AppRoutes = {

    // Auth Routes
    login: BASE_URL + "api/v1/auth/login",
    register: BASE_URL + "api/v1/auth/register",

    // User Routes
    getAllUsers: BASE_URL + "api/v1/user/all-users",
    deleteUser: BASE_URL + "api/v1/user/:id",
    addUser: BASE_URL + "api/v1/user/smit-registration",
    updateUser: BASE_URL + "api/v1/user/:id",
    getSingleUser: BASE_URL + "api/v1/user/single-user",

};