import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUserProfile, signin } from "@/store/auth/action";
import { AlertCircle } from "lucide-react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [signInError, setSignInError] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const auth = useSelector((store) => store.auth);

  useEffect(() => {
    if (jwt) {
      dispatch(getUserProfile(jwt));
    }
  }, [dispatch, jwt]);

  useEffect(() => {
    if (auth.user) {
      navigate("/");
    }
  }, [auth.user, navigate]);

  //localStorage.clear();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    const { email, password } = formData;
    e.preventDefault();
    const newError = {};

    if (!email) newError.email = "Enter a valid email";
    if (!password) newError.password = "Enter a valid password";
    setSignInError(newError);

    if (Object.keys(newError).length > 0) return;
    if (Object.keys(newError).length === 0) {
      setSignInError({});
      dispatch(signin(formData));
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 bg-gray-100  lg:block">
        <img
          src="/HouseF.jpeg"
          alt="Real Estate"
          className=" h-screen w-full object-cover"
        />
      </div>
      <div className="flex w-full items-center justify-center lg:w-1/2">
        <div className="mx-auto w-full max-w-sm space-y-4 p-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-text">Sign In</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your credentials to access your account
            </p>
          </div>
          <form className="space-y-4 " onSubmit={handleSubmit}>
            {formData.email &&
              formData.password &&
              auth.error?.status === 401 && (
                <h2 className=" font-semibold text-red-500 -my-2 py-1">
                  {auth.error?.data.error}!
                </h2>
              )}
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="user@example.com"
                value={formData.name}
                onChange={handleChange}
                type="email"
              />
              {signInError.email && (
                <span className="text-red-500 text-sm  py-0.5 1 flex items-center gap-1">
                  <AlertCircle className="size-4" /> {signInError.email}
                </span>
              )}
            </div>
            <div className="space-y-1 pb-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
              />
              <div className="flex p-0.5 gap-x-1">
                <input
                  type="checkbox"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                />
                <span className="text-sm text-muted-foreground">
                  {" "}
                  Show Password
                </span>
              </div>
              {signInError.password && (
                <span className="text-red-500 text-sm p x-2 py-0.5 1 flex items-center gap-1">
                  <AlertCircle className="size-4" /> {signInError.password}
                </span>
              )}
            </div>
            <Button
              className="w-full bg-Bgpurple hover:bg-indigo-800 transition-colors duration-500 ease-in-out"
              disabled={!formData.email || !formData.password} // disable button if empty to prevent unneccesary api calls to backend
              type="submit"
            >
              Sign In
            </Button>
          </form>

          <div className="text-center ">
            {"Don't"} have an account?{" "}
            <Link className="underline text-indigo-800" to="/signup">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
