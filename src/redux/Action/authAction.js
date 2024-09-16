import axios from "axios";
import { setToken, setUser } from "../Reducers/loginReducers";

export const login = (data, navigate) => async (dispatch, getState) => {
  console.log(data);
  try {
    const response = await axios.post(
      `http://localhost:5000/api/user/login`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("response", response);
    dispatch(setToken(response.data.token));
    dispatch(setUser(response.data.user));
    navigate("/")
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.message);
      return;
    }
  }
};

export const register = (data, navigate) => async (dispatch, getState) => {
  console.log("Isi data:", data);

  try {
    // Mengirimkan permintaan POST ke API register dengan formData dan header multipart/form-data
    const response = await axios.post(
      `http://localhost:5000/api/user/register`,
      data,
      {
        headers: {
         "Content-Type": "application/json",
        },
      }
    );

    // Cek jika respons status adalah 201 (Created)
    if (response.status === 201) {
      console.log("Register Berhasil:", response);
      alert("Registrasi berhasil!");
      navigate("/login");
    }
  } catch (error) {
    // Penanganan kesalahan saat melakukan permintaan
    console.error("Error during registration:", error);

    // Tampilkan alert jika registrasi gagal
    alert("Registrasi gagal. Silakan coba lagi.");
  }
};
