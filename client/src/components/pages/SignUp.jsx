import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "@/store/auth/action";
import { getUserProfile } from "@/store/auth/action";
import { AlertCircle } from "lucide-react";

export default function SignUp() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [signUpError, setSignUpError] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    role: "USER",
    company: "",
  });
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");

  //check if jwt exists and then get user using it so if user exists naviagte to homepage
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRoleChange = (value) => {
    setFormData({ ...formData, role: value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    const { name, mobile, email } = formData;
    const newErrors = {};

    if (!name) newErrors.name = "Enter a valid name";
    if (!mobile) newErrors.mobile = "Enter a valid mobile number";
    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!email) {
      newErrors.email = "Enter a valid email";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email format";
    }

    // If there are errors, set them and prevent moving to the next step
    if (Object.keys(newErrors).length > 0) {
      setSignUpError(newErrors);
      return;
    }
    // Clear errors and move to the next step
    setSignUpError({});
    setCurrentStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password } = formData;
    const newErrors = {};

    // Validate password
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    // If there are errors, set them and prevent form submission
    if (Object.keys(newErrors).length > 0) {
      setSignUpError(newErrors);
      return;
    }

    // Clear errors and dispatch the signup action
    setSignUpError({});
    dispatch(signup(formData));
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 bg-gray-100 lg:block h-screen relative">
        <img
          src="/signin.png"
          alt="Real Estate"
          className=" object-cover h-full w-full"
        />
        <h1 className="absolute top-4 left-[15%] font-black font-jakarta text-7xl text-Bgpurple">
          HomeSpace
        </h1>
        <div className="absolute h-full w-full bg-black inset-0 opacity-10" />
      </div>
      <div className="flex w-full items-center justify-center lg:w-1/2">
        <div className="mx-auto w-full max-w-sm space-y-4 p-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-text">Sign Up</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Create your account (Step {currentStep} of 2)
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {currentStep === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    placeholder="Enter Full Name"
                    onChange={handleChange}
                  />
                  {signUpError.name && (
                    <span className="text-red-500 text-sm  py-0.5 1 flex items-center gap-1">
                      <AlertCircle className="size-4" />
                      {signUpError.name}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="Enter mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                  {signUpError.mobile && (
                    <span className="text-red-500 text-sm  py-0.5 flex items-center gap-1">
                      <AlertCircle className="size-4" />
                      {signUpError.mobile}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {signUpError.email && (
                    <span className="text-red-500 text-sm  py-0.5 1 flex items-center gap-1">
                      <AlertCircle className="size-4" /> {signUpError.email}
                    </span>
                  )}
                </div>
              </>
            )}
            {currentStep === 2 && (
              <>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  {signUpError.password && (
                    <span className="text-red-500 text-sm   flex items-center gap-1">
                      <AlertCircle className="size-4" />
                      {signUpError.password}
                    </span>
                  )}
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    className="pt-1"
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
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <RadioGroup
                    value={formData.role}
                    onValueChange={handleRoleChange}
                    className="flex"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="USER" id="user" />
                      <Label htmlFor="user">User</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="AGENT" id="agent" />
                      <Label htmlFor="agent">Agent</Label>
                    </div>
                  </RadioGroup>
                </div>
                {formData.role === "AGENT" && (
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      placeholder="Enter Company Name"
                      onChange={handleChange}
                    />
                  </div>
                )}
                {auth.error?.status === 409 && (
                  <h1 className=" font-semibold text-red-600 py-2">
                    {auth.error?.data.error}!
                  </h1>
                )}
              </>
            )}
            {currentStep === 1 ? (
              <Button
                className="w-full bg-Bgpurple hover:bg-indigo-800 hover:scale-[.99] hover:shadow-sm"
                type="button"
                onClick={handleNext}
              >
                Next
              </Button>
            ) : (
              <Button
                className="w-full bg-Bgpurple hover:bg-indigo-800 hover:scale-[.99] hover:shadow-sm"
                type="submit"
              >
                Create Account
              </Button>
            )}

            {currentStep == 2 && (
              <button
                className="w-full border-Bgpurple/80 rounded-lg border  h-10 px-4 py-2 hover:scale-[.99] hover:shadow-sm"
                type="button"
                onClick={() => setCurrentStep(1)}
              >
                Back
              </button>
            )}
          </form>
          <div className="text-center text- sm">
            Already have an account?{" "}
            <Link className="underline text-indigo-800" to="/signin">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
