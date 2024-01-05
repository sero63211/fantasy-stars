import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Footballer from "../Models/footballer";
import "../Stylings/ItemDetailScreen.css";
import backgroundImage from "../images/Football_field.svg.png";

const EditItemDetailScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const originalFootballer = location.state?.footballer as Footballer;

  const [footballer, setFootballer] = useState(originalFootballer);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFootballer({ ...footballer, [e.target.name]: e.target.value });
  };
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState("");

  const handleImageClick = () => {
    setDialogOpen(true);
    if (typeof footballer.bild === "string") {
      setTempImageUrl(footballer.bild);
    } else {
      setTempImageUrl(""); // Setzen Sie einen Standardwert oder leeren String
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const updateFootballer = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3001/footballer/updateFootballers/${footballer.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(footballer),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Fehler beim Aktualisieren des Fußballspielers: Status ${response.status}`
        );
      }

      const updatedFootballer = await response.json();

      if (updatedFootballer && updatedFootballer.id) {
        // Navigation nach erfolgreichem Update
        navigate(`/details/${updatedFootballer.id}`, {
          state: { footballer: updatedFootballer },
        });
      } else {
        throw new Error(
          "Fehler: Die Antwort enthält keinen aktualisierten Fußballspieler."
        );
      }
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
    }
  };

  if (!footballer) {
    return (
      <div className="edit-detail-container">
        <p>Footballer details not available for editing.</p>
      </div>
    );
  }

  return (
    <div
      className="edit-detail-container"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Correct way to use imported image
        backgroundSize: "cover", // Ensures the background covers the entire div
        backgroundPosition: "center", // Centers the background image
        backgroundRepeat: "no-repeat", // Prevents the image from repeating
      }}
    >
      <div className="edit-form-container">
        {" "}
        <h2 className="edit-detail-title">
          Edit Details of {originalFootballer.name}
        </h2>
        <img
          src={
            typeof footballer.bild === "string"
              ? footballer.bild
              : footballer.bild instanceof File
              ? URL.createObjectURL(footballer.bild)
              : "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
          }
          alt={footballer.name}
          onClick={handleImageClick}
          className="footballer-image"
        />
        {isDialogOpen && (
          <div className="dialog-overlay">
            <div className="dialog">
              <input
                type="text"
                value={tempImageUrl}
                onChange={(e) => setTempImageUrl(e.target.value)}
              />
              <button
                onClick={() => {
                  setFootballer({ ...footballer, bild: tempImageUrl });
                  handleCloseDialog();
                }}
              >
                Save URL
              </button>
              <button onClick={handleCloseDialog}>Close</button>
            </div>
          </div>
        )}
        <table className="edit-detail-table">
          <tbody>
            <th>Name:</th>
            <td>
              <input
                type="text"
                name="name"
                value={footballer.name}
                onChange={handleInputChange}
              />
            </td>
            <tr>
              <th>Beschreibung:</th>
              <td>
                <textarea
                  name="description"
                  value={footballer.description}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <th>Klub:</th>
              <td>
                <input
                  type="text"
                  name="klub"
                  value={footballer.klub}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <th>Nationalität:</th>
              <td>
                <input
                  type="text"
                  name="nationalitaet"
                  value={footballer.nationalitaet}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <th>Alter:</th>
              <td>
                <input
                  type="number"
                  name="alter"
                  value={footballer.alter}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <th>Position:</th>
              <td>
                <input
                  type="text"
                  name="position"
                  value={footballer.position}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <th>Marktwert:</th>
              <td>
                <input
                  type="number"
                  name="marktwert"
                  value={footballer.marktwert}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="edit-detail-actions">
          <button onClick={updateFootballer} className="edit-save-button">
            Save Changes
          </button>
          <button onClick={() => navigate(-1)} className="edit-cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditItemDetailScreen;
