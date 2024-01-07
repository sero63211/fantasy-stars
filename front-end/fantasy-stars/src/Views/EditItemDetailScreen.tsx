import React, { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Footballer from "../Models/footballer";
import "../Stylings/ItemDetailScreen.css";
import backgroundImage from "../images/Football_field.svg.png";

const EditItemDetailScreen: React.FC = () => {

  const [positions, setPositions] = useState([
    "Torwart",
    "Innenverteidiger",
    "Außenverteidiger",
    "Mittelfeldspieler",
    "Defensiver Mittelfeldspieler",
    "Zentraler Mittelfeldspieler",
    "Offensiver Mittelfeldspieler",
    "Flügelspieler",
    "Stürmer",
    "Mittelstürmer",
  ]);

  const navigate = useNavigate();
  const location = useLocation();
  const originalFootballer = location.state?.footballer as Footballer;

  const [footballer, setFootballer] = useState(originalFootballer);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFootballer({ ...footballer, bild: URL.createObjectURL(file) });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFootballer({ ...footballer, [e.target.name]: e.target.value });
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
        <div>
          <img
            src={
              typeof footballer.bild === "string"
                ? footballer.bild
                : "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
            }
            alt={footballer.name}
            className="footballer-image"
            onClick={handleImageClick}
          />
          <input
            type="file"
            accept="image/jpeg"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
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
                <select
                  name="position"
                  value={footballer.position}
                  onChange={handleInputChange}
                >
                  <option value="">Wähle eine Position</option>
                  {positions.map((position) => (
                    <option key={position} value={position}>
                      {position}
                    </option>
                  ))}
                </select>
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
