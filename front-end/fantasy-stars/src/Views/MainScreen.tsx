import Card from "../Components/Card";
import Header from "../Components/Header";
import Footballer from "../Models/footballer";
import useFootballers from "../domain/hooks";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../images/Football_field.svg.png";
import { useEffect } from "react";

const MainScreen: React.FC = () => {
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

  useEffect(() => {
    console.log("State: ", state);
    if (error) {
      console.error("Error: ", error.message);
    }
  }, [state, footballers, error]);

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`, // Your imported image
        backgroundSize: "cover", // Ensures the background covers the entire div
        backgroundPosition: "center", // Centers the background image
        backgroundRepeat: "no-repeat", // Prevents the image from repeating
        width: "100vw", // Full viewport width
        height: "100vh", // Full viewport height
        overflow: "auto", // Adds scrollbars if content overflows
      }}
    >
      <Header />
      <h1>List of Footballers</h1>
      <div
        style={{
          position: "relative",
          display: "flex",
          overflowX: "auto",
          padding: "10px",
          whiteSpace: "nowrap",
          height: "100vh", // Setzt die Höhe auf 100% der Viewport-Höhe
        }}
      >
        <Card
          footballer={{}}
          onCardChange={refresh}
          onClick={() => navigate("/create")}
        />
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
          bottom: "10px",
          right: "10px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "5px",
          borderRadius: "5px",
        }}
      >
        {state === "initial" && "Initial"}
        {state === "loading" && "Loading..."}
        {state === "error" && `Error: ${error?.message}`}
        {state === "success" && "Success"}
      </div>
    </div>
  );
};

export default MainScreen;