import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainScreen from "./Views/MainScreen";
import ItemDetailScreen from "./Views/ItemDetailScreen";
import EditItemDetailScreen from "./Views/EditItemDetailScreen";
import CreateItemScreen from "./Views/CreateItemScreen";
import AboutScreen from "./Views/AboutScreen";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ErrorDisplay from "./Views/ErrorDisplay";
import LoginScreen from "./Views/Authentification/LoginScreen";
import { AuthProvider } from "./AuthentificationState";

function App() {
  return (
    <Router>

    <AuthProvider>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />
        <div
          style={{
            overflow: "auto",
            flexGrow: 0,
            flexShrink: 0,
            maxHeight: "calc(100vh - 100px)",
          }}
        >
          <Routes>
            <Route path="/" element={<MainScreen />} />
            <Route path="/details/:id" element={<ItemDetailScreen />} />
            <Route path="/edit/:id" element={<EditItemDetailScreen />} />
            <Route path="/create" element={<CreateItemScreen />} />
            <Route path="/about" element={<AboutScreen />} />
            <Route path="/error" element={<ErrorDisplay />} />
            <Route path="/login" element={<LoginScreen />} />
          </Routes>
        </div>
      </div>
    </AuthProvider>
    </Router>

  );
}

export default App;