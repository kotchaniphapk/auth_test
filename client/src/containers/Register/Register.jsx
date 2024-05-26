import { Button, Card, Image, Input, Spacer } from "@nextui-org/react"

import logo from "../../assets/vite.svg";
import { Link , useNavigate } from "react-router-dom";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { signup } from "../../reducers/user";

const emailValidation = /^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/i;

function Register() {
const [error, setError] = useState(null);
const [loading,setLoading] =useState(false); 
const [name ,setName] =useState("");
const [email ,setEmail] = useState("");
const [password, setPassword] = useState("");

const dispatch = useDispatch();
const navigate = useNavigate();

const _onSubmit = () => {
  if (!name){
    setError("Name can not be emty") 
  } 
  if (!email || !emailValidation.test(email)){
    setError("Please enter a valid email")
  }
  if (!password || password.length < 8) {
    setError("Please enter password must be 8 characters")
  }

  setLoading(true);
  dispatch(signup({ name, email, password}))
  .then((data) => {
    if (data.error) {
      setError(data.error.message);
    } else {
      navigate("/signin")
    }

    setLoading(false);
  })
};

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
      <Image
        src={logo}
        className="w-10"
        width={200}
      />
      <Spacer y={2} />
      <div className="font-bold text-lg">
        Create your account
      </div>
      <div className="text-sm flex gap-1">
        {"Already have an account?"}
        <Link to="/signin" className="text-primary underline">
          Sign in here
        </Link>
      </div>
      <Spacer y={4} />
      <Card className="p-4 pt-6 pb-6 min-w-[400px]">
        <form id="register" onSubmit={(e) => e.preventDefault()}>
          <Input
            label="How can we call you?"
            placeholder="Enter your name"
            variant="bordered"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Spacer y={2} />
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Spacer y={2} />
          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            variant="bordered"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <>
              <Spacer y={2} />
              <div className="text-red-500 text-xs">
                {error}
              </div>
            </>
          )}
          <Spacer y={2} />
          <Button
            color="primary"
            fullWidth
            type="submit"
            form="register"
            isLoading={loading}
            isDisabled={!email || !password}
            onClick={_onSubmit}
          >
            Sign Up
          </Button>
        </form>
      </Card>
    </div>
    </div>
  )
}

export default Register
