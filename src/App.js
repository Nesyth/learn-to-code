import Auth from "./components/Auth.js";
import Dashboard from "./components/Dashboard.js";
import Navbar from "./components/Navbar.js"
import { useUserContext } from "./context/UserContext.js";

function App() {
  const { user, loading, error } = useUserContext();

  return (
    <div className="App">
      <Navbar></Navbar>
      {error && <p className="error">{error}</p>}
      {loading ? <h2>Loading...</h2> : <> {user ? <Dashboard /> : <Auth />} </>}
    </div>
  );
}

export default App;