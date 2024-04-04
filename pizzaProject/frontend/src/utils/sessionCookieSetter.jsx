import axios from "axios";

// Обновление refresh token и получение нового access token
const updateRefreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', { refresh: refreshToken });
    const accessToken = response.data.access; // Сохраняем новый access token в переменную
    return accessToken;
  } catch (error) {
    throw error; // Перехватываем ошибку и выбрасываем ее дальше
  }
};

export default updateRefreshToken;