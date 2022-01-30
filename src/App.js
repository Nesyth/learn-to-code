import { useUserContext } from "./context/UserContext.js";
import { Routes, Route } from "react-router-dom";
import React from "react";
import Auth from "./components/Auth.js";
import Dashboard from "./components/Dashboard.js";
import Exercises from "./components/exercises/Exercises.js";
import Navbar from "./components/Navbar.js";
import Welcome from "./components/Welcome.js";
import Create from "./components/exercises/Create.js";
import Exercise from "./components/exercises/Exercise.js";

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
              <Route path="create" element={<Create />} />
              <Route path=":id" element={<Exercise />} />
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