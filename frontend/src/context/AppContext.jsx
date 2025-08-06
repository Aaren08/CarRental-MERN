import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toast } from "react-hot-toast";
import { AppContext } from "./ContexedApp.js";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [cars, setCars] = useState([]);

  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  // FUNCTION TO CHECK IF USER IS LOGGED IN
  const checkUser = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/user/data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setUser(data.user);
        setIsOwner(data.user.role === "owner");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [token, navigate]);

  // RETRIEVE TOKEN FROM LOCAL STORAGE
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      checkUser();
    }
  }, [checkUser]);

  // FUNCTION TO FETCH ALL CARS FROM SERVER
  const getCars = async () => {
    try {
      const { data } = await axios.get("/api/user/cars");
      data.success ? setCars(data.cars) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getCars();
  }, []);

  // FUNCTION TO LOGOUT USER
  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsOwner(false);
    axios.defaults.headers.common["Authorization"] = "";
    navigate("/");
    toast.success("You have been logged out");
  };

  const value = {
    navigate,
    currency,
    axios,
    checkUser,
    logoutUser,
    user,
    setUser,
    token,
    setToken,
    isOwner,
    setIsOwner,
    showLogin,
    setShowLogin,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    cars,
    setCars,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
