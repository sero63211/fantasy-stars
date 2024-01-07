import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footballer from "../Models/footballer";
import "../Stylings/ItemDetailScreen.css";
import backgroundImage from "../images/Football_field.svg.png";

const CreateItemScreen: React.FC = () => {
  const navigate = useNavigate();

  const initialFootballer: Footballer = {
    id: "",
    name: "",
    description: "",
    klub: "",
    nationalitaet: "",
    alter: 0,
    position: "",
    marktwert: 0,
    bild: undefined,
    likes: 0,
  };

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
  


  const [footballer, setFootballer] = useState(initialFootballer);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState("");

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

  const [errorMessage, setErrorMessage] = useState("");

  const validateInputs = () => {
    const requiredFields: (keyof Footballer)[] = [
      "name",
      "klub",
      "nationalitaet",
      "alter",
      "position",
      "marktwert",
    ];
    const missingFields = requiredFields.filter((field) => {
      // Eine zusätzliche Überprüfung, um TypeScript zu versichern, dass der Zugriff sicher ist
      return (
        footballer[field] === null ||
        footballer[field] === undefined ||
        footballer[field] === ""
      );
    });

    if (missingFields.length > 0) {
      setErrorMessage(
        `Folgende Felder müssen noch ausgefüllt werden: ${missingFields.join(
          ", "
        )}`
      );
      return false;
    }

    setErrorMessage(""); // Fehlermeldung zurücksetzen
    return true;
  };

  const createFootballer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:3001/footballer/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([footballer]),
      });

      if (!response.ok) {
        throw new Error(
          `Fehler beim Erstellen des Fußballspielers: Status ${response.status}`
        );
      }

      const result = await response.json();
      console.log("Erstellter Fußballspieler:", result);

      // Angenommen, die ID befindet sich direkt im result-Objekt
      const createdFootballer = result[0];
      if (createdFootballer && createdFootballer.id) {
        console.log(
          "Navigiere zum Detailbildschirm mit ID:",
          createdFootballer.id
        );
        navigate(`/details/${createdFootballer.id}`, {
          state: { footballer: createdFootballer },
        });
      } else {
        console.error("Erstellter Fußballspieler hat keine ID:", result);
      }
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
    }
  };

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
        <h2 className="edit-detail-title">Create New Footballer</h2>
        <p className="error-message">{errorMessage}</p>

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
            <tr>
              <th>Name:</th>
              <td>
                <input
                  type="text"
                  name="name"
                  value={footballer.name}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
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
          <button onClick={createFootballer} className="create-save-button">
            Create Footballer
          </button>
          <button onClick={() => navigate(-1)} className="create-cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateItemScreen;
