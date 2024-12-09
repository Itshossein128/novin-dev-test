import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import { toast } from "react-toastify";
import validateEmail from "../../utils/validateEmail";

interface LoginProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const navigate = useNavigate();

  const validateInputs = (): boolean => {
    let isValid = true;

    if (email.trim() === "") {
      setEmailError("Enter Your Email!");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Enter a Valid Email!");
      isValid = false;
    } else {
      setEmailError(null);
    }

    if (password.trim() === "") {
      setPasswordError("Enter Your Password!");
      isValid = false;
    } else {
      setPasswordError(null);
    }

    return isValid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInputs()) return;

    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });

      if (response.data.token) {
        setIsAuthenticated(true);
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
        toast.success("Login was successful.");
      }
    } catch (error) {
      console.error(error);
      toast.error("The username or password entered is incorrect!");
    }
  };

  return (
    <div
      className="flex items-center justify-center flex-col"
      style={{ minHeight: "inherit" }}
    >
      <h2 className="text-2xl font-semibold mb-5">Admin Login</h2>
      <form
        onSubmit={handleLogin}
        className="flex flex-col w-full max-w-lg space-y-3"
      >
        <label className="flex flex-col">
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="emailError"
          />
          {emailError && (
            <span id="emailError" className="p-1 text-red-500 text-sm">
              {emailError}
            </span>
          )}
        </label>
        <label className="flex flex-col">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-describedby="passwordError"
          />
          {passwordError && (
            <span id="passwordError" className="p-1 text-red-500 text-sm">
              {passwordError}
            </span>
          )}
        </label>
        <button
          type="submit"
          className="rounded-sm text-white bg-blue-500 hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
