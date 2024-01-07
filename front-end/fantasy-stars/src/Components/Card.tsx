import React, { useEffect, useState } from "react";
import Footballer from "../Models/footballer";
import heartIcon from "../images/heart.png";
import heartFillIcon from "../images/heart.fill.png";

interface CardProps {
  footballer: Footballer;
  onCardChange: () => void;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ footballer, onCardChange, onClick }) => {
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isEmpty =
    !footballer.name &&
    !footballer.klub &&
    !footballer.alter &&
    !footballer.position;

  useEffect(() => {
    if (!isEmpty) {
      const liked = localStorage.getItem(`liked-${footballer.id}`);
      setIsHeartFilled(liked === "true");
    }
  }, [footballer.id, isEmpty]);

  const updateLikes = async (increment: boolean) => {
    const endpoint = `http://localhost:3001/footballer/${
      increment ? "likes" : "dislikes"
    }/${footballer.id}`;

    try {
      const response = await fetch(endpoint, { method: "PUT" });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      onCardChange();
    } catch (error) {
      console.error(
        "[updateLikes] Fehler beim Aktualisieren der Likes:",
        error
      );
    }
  };

  const toggleHover = () => {
    setIsHovered(!isHovered);
  };

  const handleHeartClick = async (event: React.MouseEvent) => {
    event.stopPropagation();
    const newHeartFilledState = !isHeartFilled;

    setIsHeartFilled(newHeartFilledState);
    await updateLikes(newHeartFilledState);
    localStorage.setItem(
      `liked-${footballer.id}`,
      newHeartFilledState.toString()
    );

    onCardChange();
  };

  if (isEmpty) {
    // Zeigt nur das Plus-Symbol an, wenn das footballer-Objekt leer ist
    return (
      <div
        onClick={onClick}
        style={{
          justifyContent: "center",
          border: "1px solid black",
          borderRadius: "20px",
          padding: "10px",
          margin: "10px",
          textAlign: "center",
          backgroundColor: "#fdd835",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "hidden",
          minWidth: "150px",
          height: "350px",
          cursor: "pointer",
          position: "relative",
        }}
      >
        <span
          style={{
            fontSize: "4em", // Macht das Pluszeichen größer
          }}
        >
          &#43;
        </span>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      style={{
        border: "1px solid black",
        borderRadius: "20px",
        padding: "10px",
        margin: "10px",
        textAlign: "center",
        backgroundColor: "#fdd835",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        width: "250px",
        height: "350px",
        cursor: "pointer",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%", // Full width
          height: "140px", // Fix height of image container
          position: "relative",
          marginBottom: "10px", // Space below the image container
        }}
      >
        {footballer.bild ? (
          <img
            src={
              typeof footballer.bild === "string"
                ? footballer.bild
                : footballer.bild instanceof File
                ? URL.createObjectURL(footballer.bild)
                : "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
            }
            alt={footballer.name}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center",
              borderRadius: "10px",
            }}
          />
        ) : (
          <p
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              textAlign: "center",
            }}
          >
            Kein Bild vorhanden!
          </p>
        )}
      </div>
      <h3 style={{ margin: "5px 0" }}>{footballer.name}</h3>
      <p style={{ margin: "5px 0" }}>
        <strong>Klub:</strong> {footballer.klub}
      </p>
      <p style={{ margin: "5px 0" }}>
        <strong>Alter:</strong> {footballer.alter}
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "auto",
        }}
      >
        <img
          src={isHeartFilled ? heartFillIcon : heartIcon}
          alt="Herz"
          style={{
            cursor: "pointer",
            width: "24px",
            height: "24px",
            marginRight: "10px",
          }}
          onClick={handleHeartClick}
        />
        <span>Gefällt {footballer.likes} mal</span>
      </div>
    </div>
  );
};

export default Card;
