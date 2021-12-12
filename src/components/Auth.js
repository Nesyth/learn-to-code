import React, { useState } from "react";
import SignIn from "./SignIn.js";
import SignUp from "./SignUp.js";

const Auth = () => {
  const [index, setIndex] = useState(false);
  const toggleIndex = () => {
    setIndex((prevState) => !prevState);
  };
  return (
    <div className="container">
      {!index ? <SignIn /> : <SignUp />}
      <p onClick={toggleIndex}>
        {!index ? "New user?" : "Already have an account?"}
      </p>
    </div>
  );
};

export default Auth;