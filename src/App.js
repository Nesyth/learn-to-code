import { useUserContext } from "./context/UserContext.js";
import { Routes, Route } from "react-router-dom";
import React from "react";
import Auth from "./components/Auth.js";
import Dashboard from "./components/Dashboard.js";
import Exercises from "./components/Exercises.js";
import Navbar from "./components/Navbar.js";
import Welcome from "./components/Welcome.js";
import Exercise1 from "./components/exercises/Exercise1.js";
import Exercise2 from "./components/exercises/Exercise2.js";
import Exercise3 from "./components/exercises/Exercise3.js";

export default function App() {
  const { user, loading, error } = useUserContext();

  return (
    <>
      {user ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="dashboard" index element={<Dashboard />} />
            <Route path="exercises">
              <Route index={true} element={<Exercises />} />
              <Route path="1" element={<Exercise1 />} />
              <Route path="2" element={<Exercise2 />} />
              <Route path="3" element={<Exercise3 />} />
            </Route>
          </Routes>
        </>
      ) : (
        <div className="App">
          <Welcome />
          {error && <p className="error">{error}</p>}
          {loading ? <h2>Loading...</h2> : <> {user ? null: <Auth />} </>}
        </div>
        )}
    </>
  );
}