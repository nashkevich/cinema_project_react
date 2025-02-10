import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Исправлено localStorage.get
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Исправлено conifg → config
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log("Refresh Token");
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const result = await axios({
            url: "http://127.0.0.1:8000/api/token/refresh",
            method: "POST",
            data: JSON.stringify({ refresh: refreshToken }), // Исправлено
            headers: { "Content-Type": "application/json" },
          });

          const newToken = result.data.access;
          localStorage.setItem("token", newToken);
          error.config.headers.Authorization = `Bearer ${newToken}`; // Исправлено
          return axios(error.config);
        } catch (refreshError) {
          console.error("Ошибка обновления токена:", refreshError);
          return Promise.reject(refreshError);
        }
      } else {
        console.log("Can't find refresh token");
      }
    }
    return Promise.reject(error); // Добавлено, чтобы API не был undefined
  }
);

export default api;
