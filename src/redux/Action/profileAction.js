import axios from "axios";
import { setPostUpdateProfile, setProfil } from "../Reducers/profileReducers";

export const getDataProfil = () => async (dispatch, getState) => {
  try {
    // console.log("Starting fetch data profil"); // Debug log

    // Get token from the Redux state (assuming it's stored in state.auth.token)
    const token = getState().auth.token;
    // console.log("Token from state:", token); // Debug log

    // Set Authorization header with the token
    const response = await axios.get("http://localhost:5000/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token here
      },
    });

    // Check for successful response
    if (response.status === 200) {
      // console.log("Data profile login:", response.data); // Debug log
      dispatch(setProfil(response.data));
    }
  } catch (error) {
    // Handle error and dispatch error state
    console.error("Error fetching data:", error);
  }
};

export const postUpdateProfil =
  (data, navigate) => async (dispatch, getState) => {
    console.log("form DAta 111", data)
    try {
      // console.log("Starting fetch data profil"); // Debug log

      // Get token from the Redux state (assuming it's stored in state.auth.token)
      const token = getState().auth.token;
      console.log("Token from state:", token); // Debug log

      // Set Authorization header with the token
      const response = await axios.post(
        "http://localhost:5000/api/profile",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token here
          },
        }
      );

      // Check for successful response
      if (response.status === 200) {
        // console.log("Data profile login:", response.data); // Debug log
        dispatch(setPostUpdateProfile(response.data));
        navigate("/profileuser");
      }
    } catch (error) {
      // Handle error and dispatch error state
      console.error("Error fetching data:", error);
    }
  };
