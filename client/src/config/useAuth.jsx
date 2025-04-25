import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/store/auth/action";

const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const jwt = localStorage.getItem("jwt");
  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
    if (jwt) {
      dispatch(getUserProfile(jwt));
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  }, [dispatch, jwt]);

  return {
    isSignedIn,
    user: auth.user,
  };
};

export default useAuth;
