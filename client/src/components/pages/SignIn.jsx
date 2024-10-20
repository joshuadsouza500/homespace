import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUserProfile, signin } from "@/store/auth/action";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
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
    e.preventDefault();
    dispatch(signin(formData));
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 bg-gray-100  lg:block">
        <img
          src="/Signup.png"
          alt="Real Estate"
          className="h-full w-full object-contain"
        />
      </div>
      <div className="flex w-full items-center justify-center lg:w-1/2">
        <div className="mx-auto w-full max-w-sm space-y-6 p-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-text">Sign In</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your credentials to access your account
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {auth.error?.status === 500 && (
              <h1 className=" font-semibold text-red-600 py-1">
                {auth.error?.data.error}!
              </h1>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="user@example.com"
                value={formData.name}
                onChange={handleChange}
                required
                type="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                required
                type="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <Button className="w-full bg-Bgpurple" type="submit">
              Sign In
            </Button>
          </form>

          <div className="text-center text-sm">
            {"Don't"} have an account?{" "}
            <Link className="underline" to="/signup">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
