import React from "react";
import { useUserContext } from "../context/UserContext.js";

const Dashboard = () => {
  const { user, logoutUser } = useUserContext();
  return (
    <div>
      <h1>Dashboard (alpha ver, refresh if doesn't work correctly)</h1>
      <h2>Name: {user.displayName}</h2>
      <h2>Email: {user.email}</h2>
      <button onClick={logoutUser}>Log out</button>
    </div>
  );
};

export default Dashboard;