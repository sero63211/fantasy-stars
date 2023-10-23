import React, { useState, Component } from "react";

interface MainScreenProps {
  initialCount?: number; // Optionaler Startwert für den Zähler
}

const MainScreen: React.FC<MainScreenProps> = ({ initialCount = 0 }) => {
  const [count, setCount] = useState<number>(initialCount);

  return (
    <div>
      <p>Main Screen</p>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Erhöhen</button>
    </div>
  );
};

export default MainScreen;
