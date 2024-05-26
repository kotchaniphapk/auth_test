import { Button, Card, Image, Spacer, Input } from "@nextui-org/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { login } from "../../reducers/user";
import logo from "../../assets/vite.svg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const _onSubmit = () => {
    if (!email) {
      setError("Email cannot be empty");
      return;
    }
    if (!password) {
      setError("Password cannot be empty");
      return;
    }
    setLoading(true);
    setError(null);
    dispatch(login({ email, password })).then((data) => {
      if (data.error) {
        setError(data.error?.message || "");
        setLoading(false);
        return;
      }
      if (data.payload) {
        localStorage.setItem("user", JSON.stringify(data.payload));
        navigate("/");
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image src={logo} className="w-10" width={200} />
      <Spacer y={2} />
      <div className="font-bold text-lg">Sign in to your account</div>
      <div className="text-sm flex gap-1">
        {"Don't have an account yet?"}
        <Link to="/register" className="text-primary underline">
          Create one here.
        </Link>
      </div>
      <Spacer y={4} />
      <Card className="p-4 py-6 min-w-[400px]">
        <form id="login" onSubmit={(e) => e.preventDefault()}>
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
              <div className="text-red-500 text-sm">{error}</div>
            </>
          )}

          <Spacer y={2} />
          <Button
            color="primary"
            fullWidth
            type="submit"
            form="login"
            isLoading={loading}
            onClick={_onSubmit}
            className="text-xl font-bold"
          >
            Sign in
          </Button>
          <Spacer y={2} />
        </form>
      </Card>
    </div>
  );
}

export default Login;
