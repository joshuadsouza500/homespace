import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function SignUp() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    role: "USER",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRoleChange = (value) => {
    setFormData({ ...formData, role: value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep === 1) {
      // You might want to validate the first step's data here
      setCurrentStep(2);
    } else {
      // Here you would typically validate form data and submit
      console.log(formData);
      // In a real application, submit this data to your backend
    }
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
        <div className="mx-auto w-full max-w-sm space-y-6 p-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-text">Sign Up</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Create your account (Step {currentStep} of 2)
            </p>
          </div>
          <form onSubmit={handleNext} className="space-y-4">
            {currentStep === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile</Label>
                  <Input
                    id="mobile"
                    required
                    type="tel"
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    required
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            {currentStep === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    required
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <RadioGroup
                    value={formData.role}
                    onValueChange={handleRoleChange}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="user" id="user" />
                      <Label htmlFor="user">User</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="agent" id="agent" />
                      <Label htmlFor="agent">Agent</Label>
                    </div>
                  </RadioGroup>
                </div>
              </>
            )}
            <Button className="w-full bg-text" type="submit">
              {currentStep === 1 ? "Next" : "Create Account"}
            </Button>
            <button
              className="w-full"
              type="button"
              onClick={() => setCurrentStep(1)}
            >
              {currentStep === 2 ? "Back" : ""}
            </button>
          </form>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link className="underline" to="/signin">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
