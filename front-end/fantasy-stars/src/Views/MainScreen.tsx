import Card from "../Components/Card";
import Footballer from "../Models/footballer";
import useFootballers from "../domain/hooks";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../images/Football_field.svg.png";
import { useEffect } from "react";
import Footer from "../Components/Footer";
import { useAuth } from "../AuthentificationState";

const MainScreen: React.FC = () => {
  const { loggedIn, setLoggedIn } = useAuth();
  const { footballers, state, error, refresh } = useFootballers();
  const navigate = useNavigate();

  const handleCardChange = () => {
    refresh();
  };

  const handleCardClick = (footballer: Footballer) => {
    navigate(`/details/${footballer.id}-${footballer.name}`, {
      state: { footballer },
    });
  };

  const handleErrorClick = () => {
    navigate('/error', { state: { message: error?.message } });
  };

  useEffect(() => {
    console.log("State: ", state);
    if (error) {
      console.error("Error: ", error.message);
    }
  }, [state, footballers, error]);

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`, 
        backgroundSize: "cover", 
        backgroundPosition: "center", 
        backgroundRepeat: "no-repeat", 
        width: "100vw", 
        height: "100vh", 
        overflow: "auto", 
      }}
    >
      <h1>List of Footballers</h1>
      <div
        style={{
          position: "relative",
          display: "flex",
          overflowX: "auto",
          padding: "10px",
          whiteSpace: "nowrap",
          height: "100vh", 
        }}
      >
        {loggedIn == true ?
        <Card
          footballer={{}}
          onCardChange={refresh}
          onClick={() => navigate("/create")}
        />
        :
        null
      }
        {footballers.map((footballer, index) => (
          <div style={{ display: "inline-block", marginRight: "10px" }}>
            <Card
              key={index}
              footballer={footballer}
              onCardChange={handleCardChange}
              onClick={() => handleCardClick(footballer)}
            />{" "}
          </div>
        ))}
      </div>
      <div
       style={{
        position: "absolute",
        bottom: "60px", 
        right: "10px",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        padding: "5px",
        borderRadius: "5px",
        cursor: "pointer",
        zIndex: 1000 
      }}
        onClick={state === "error" ? handleErrorClick : undefined}

      >
        {state === "initial" && "Initial"}
        {state === "loading" && "Loading..."}
        {state === "error" && `Error: ${error?.message}`}
        {state === "success" && "Success"}
      </div>
      <Footer />
    </div>
  );

};

export default MainScreen;