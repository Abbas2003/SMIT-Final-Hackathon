const devUrl = "http://localhost:4000/";
const prodUrl = "https://smit-final-hackathon-backend.vercel.app/"; // Add the backend production URL here

// Set BASE_URL depending on the environment
export const BASE_URL = prodUrl;

export const AppRoutes = {

    // Auth Routes
    login: BASE_URL + "api/v1/auth/login",
    register: BASE_URL + "api/v1/auth/register",

    // User Routes
    getMyInfo: BASE_URL + "api/v1/user/get-my-info",
    updateUser: BASE_URL + "api/v1/user/update-user",
    updatePassword: BASE_URL + "api/v1/user/change-password",

    // Send Password to Email
    sendLoginPassword: BASE_URL + "api/v1/user/send-email",

    // Guarantors Routes
    addGuarantor: BASE_URL + "api/v1/guarantor/add-guarantors",

    // Application Routes
    loanRequest: BASE_URL + "api/v1/loan/request-loan",
    getLoanRequests: BASE_URL + "api/v1/loan/get-user-loans",
    getAllLoanRequests: BASE_URL + "api/v1/loan/get-all-loans",
    updateLoanStatus: BASE_URL + "api/v1/loan/update-loan-status",

};