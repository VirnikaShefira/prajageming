import axios from "axios";
import { setDataFormPendaftaran, setPendaf } from "../Reducers/pendaftaranMagangReducers";

export const getDataPendaftaran = () => async (dispatch, getState) => {
  try {
    console.log("Starting fetch data pendaftaran"); // Debug log

    // Get token from the Redux state (assuming it's stored in state.auth.token)
    const token = getState().auth.token;
    console.log("Token from state:", token); // Debug log

    // Set Authorization header with the token
    const response = await axios.get(
      "http://localhost:5000/api/internship-form",
      {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token here
        },
      }
    );

    console.log("Response status:", response.status); // Debug log
    // Check for successful response
    if (response.status === 200) {
      console.log("Data pendaftaran:", response.data.formData); // Debug log
      dispatch(setPendaf(response.data.formData));
    }
  } catch (error) {
    // Handle error and dispatch error state
    console.error("Error fetching data:", error);
  }
};

export const postPendaftaranMagang =
  (data, navigate) => async (dispatch, getState) => {
    console.log("form Data Form", data)
    try {
      // console.log("Starting fetch data profil"); // Debug log

      // Get token from the Redux state (assuming it's stored in state.auth.token)
      const token = getState().auth.token;
      console.log("Token from state:", token); // Debug log

      // Set Authorization header with the token
      const response = await axios.post(
        "http://localhost:5000/api/apply-internship",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token here
          },
        }
      );

      // Check for successful response
      if (response.status === 200) {
         console.log("Data profile login:", response.data); // Debug log
        dispatch(setDataFormPendaftaran(response.data));
        navigate("/");
      }
    } catch (error) {
      // Handle error and dispatch error state
      console.error("Error fetching data:", error);
    }
  };
