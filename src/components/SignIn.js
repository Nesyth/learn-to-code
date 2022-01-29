import React, { useRef } from "react";
import { useUserContext } from "../context/UserContext.js";

const Signin = () => {
  const emailRef = useRef();
  const psdRef = useRef();
  const { signInUser, forgotPassword, signInWithGoogle, signInWithGithub } = useUserContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = psdRef.current.value;
    if (email && password) signInUser(email, password);
  };

  const forgotPasswordHandler = () => {
    const email = emailRef.current.value;
    if (email)
      forgotPassword(email).then(() => {
        emailRef.current.value = "";
      });
  };

  return (
    <div className="form">
      <h1>Login</h1>
      <form>
        <input placeholder="Email" type="email" ref={emailRef} />
        <input placeholder="Password" type="password" ref={psdRef} />
        <button onClick={onSubmit}>Sign In</button>
        <p className="align-center">OR</p>
        <button onClick={signInWithGoogle}>Sign In with Google</button>
        <button onClick={signInWithGithub}>Sign In with Github</button>
        {/* <p onClick={forgotPasswordHandler}>Forgot Password?</p> */}
      </form>
    </div>
  );
};

export default Signin;