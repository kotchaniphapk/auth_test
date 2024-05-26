import { Button, Spacer } from "@nextui-org/react";

import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div id="error-page" className="container mx-auto">
      <h1 className="text-lg font-bold">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <Spacer y={1} />
      <p className="text-danger">
        <i>{error.statusText || error.message}</i>
      </p>
      <Spacer y={1} />
      <Button
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Go Home
      </Button>
    </div>
  );
}
