import { Button, CircularProgress } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userState, setUserState] = useState(null);

  const user = useSelector((state) => state.user.data);
  const navigate = useNavigate();

  const _onSubmit = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };
  const _onSignup = () => {
    navigate("/register");
  };

  useEffect(() => {
    if (user.id) {
      setUserState(user);
    } else {
      try {
        const lsUser = JSON.parse(localStorage.getItem("user"));
        setUserState(lsUser);
      } catch (e) {
        //
      }
    }
  }, [user]);

  if (!userState?.id) {
    return (
      <div>
        <section className="py-12 sm:py-16 lg:pt-20 xl:pb-0">
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="mt-5 text-4xl font-bold  text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl">
                Welcome to Sodality Test
              </h1>
              <div className="mt-10 flex gap-6">
                <Button
                  color="primary"
                  fullWidth
                  type="submit"
                  isLoading={loading}
                  className="font-bold text-xl px-12 py-6 rounded-md"
                  onClick={_onSubmit}
                >
                  Login
                </Button>
                <Button
                  color="primary"
                  fullWidth
                  type="submit"
                  isLoading={loading}
                  className="font-bold text-xl px-12 py-6 rounded-md"
                  onClick={_onSignup}
                >
                  Signup
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <section className="py-12 sm:py-16 lg:pt-20 xl:pb-0">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        {loading && <CircularProgress />}
        {error && (
          <p className="text-danger">
            Something went wrong. Please refresh the page.
          </p>
        )}
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="mt-5 text-4xl font-bold  text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl">
            Welcome to Sodality Test
          </h1>
          <p className="max-w-md mx-auto mt-6 text-4xl font-medium  text-gray-900">
            Hello{"  "}
            <span className="text-primary">{userState.name}</span>
          </p>
          <div className="inline-flex mt-10 ">
            <Button
              color="primary"
              fullWidth
              type="submit"
              isLoading={loading}
              onClick={_onSubmit}
              className="font-bold text-xl px-12 py-6 rounded-md"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
