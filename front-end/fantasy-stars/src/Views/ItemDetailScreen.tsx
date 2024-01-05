import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Footballer from "../Models/footballer";
import "../Stylings/ItemDetailScreen.css";
import backgroundImage from "../images/Football_field.svg.png";

const ItemDetailScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const footballer = location.state?.footballer as Footballer;

  const getStringOrPlaceholder = (
    value: string | undefined,
    placeholder: string
  ) => {
    return value || `${placeholder} nicht vorhanden`;
  };


  const handleDelete = async (footballer: Footballer) => {
    const endpoint = `http://localhost:3001/footballer/deleteFootballer/${footballer.id}`;
    try {
      const response = await fetch(endpoint, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log('Fußballspieler gelöscht:', footballer.id);
      navigate(`/`);
    } catch (error) {
      console.error('Fehler beim Löschen des Fußballspielers:', error);
    }
  };
  

  if (!footballer) {
    return <p>Footballer details not available.</p>;
  }

  return (
    <div
      className="edit-detail-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="edit-form-container">
        <h2 className="edit-detail-title">
          Details of {footballer.name}
        </h2>
        <img
          src={
            typeof footballer.bild === "string"
              ? footballer.bild
              : "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
          }
          alt={footballer.name}
          className="footballer-image"
        />
        <table className="edit-detail-table">
          <tbody>
            <tr>
              <th>Name:</th>
              <td>{footballer.name}</td>
            </tr>
            <tr>
              <th>Beschreibung:</th>
              <td>{footballer.description}</td>
            </tr>
            <tr>
              <th>Klub:</th>
              <td>{footballer.klub}</td>
            </tr>
            <tr>
              <th>Nationalität:</th>
              <td>{footballer.nationalitaet}</td>
            </tr>
            <tr>
              <th>Alter:</th>
              <td>{footballer.alter}</td>
            </tr>
            <tr>
              <th>Position:</th>
              <td>{footballer.position}</td>
            </tr>
            <tr>
              <th>Marktwert:</th>
              <td>
                {footballer.marktwert
                  ? `${footballer.marktwert} Mio. €`
                  : "Marktwert nicht vorhanden"}
              </td>
            </tr>
            <tr>
              <th>Likes:</th>
              <td>{footballer.likes}</td>
            </tr>
          </tbody>
        </table>
        <div className="edit-detail-actions" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
  
  <div style={{ display: 'flex' }}> {/* Neues Div für Edit und Delete */}
    <button
      onClick={() => navigate(`/edit/${footballer.id}`, { state: { footballer } })}
      className="edit-save-button"
      style={{
        backgroundColor: "#4CAF50", // Grün für Edit
        color: "white",
        border: "none",
        borderRadius: "5px",
        padding: "10px 15px",
        cursor: "pointer",
      }}
    >
      Edit Item
    </button>

    <button
      onClick={(event) => handleDelete(footballer)}
      style={{
        backgroundColor: "#ff4d4d", // Rot für Delete
        color: "white",
        border: "none",
        borderRadius: "5px",
        padding: "10px 15px",
        cursor: "pointer",
        marginLeft: "5px", // Minimaler Abstand zwischen den Buttons
      }}
    >
      Löschen
    </button>
  </div>

  <button
    onClick={() => navigate("/")}
    className="edit-cancel-button"
    style={{
      backgroundColor: "#007bff", // Blau für Back to All Items
      color: "white",
      border: "none",
      borderRadius: "5px",
      padding: "10px 15px",
      cursor: "pointer",
    }}
  >
    Back to All Items
  </button>
</div>



      </div>
    </div>
  );
  
};
export default ItemDetailScreen;
