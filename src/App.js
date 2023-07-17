import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Play from "./Play";

export default function App() {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  useEffect(() => {
    const storedCards = localStorage.getItem("cards");
    const storedSelectedCards = localStorage.getItem("selectedCards");
    const storedMatchedCards = localStorage.getItem("matchedCards");

    if (storedCards) {
      setCards(JSON.parse(storedCards));
    }
    if (storedSelectedCards) {
      setSelectedCards(JSON.parse(storedSelectedCards));
    }
    if (storedMatchedCards) {
      setMatchedCards(JSON.parse(storedMatchedCards));
    }
  }, []);

  return (
    <Play
      cards={cards}
      setCards={setCards}
      selectedCards={selectedCards}
      setSelectedCards={setSelectedCards}
      matchedCards={matchedCards}
      setMatchedCards={setMatchedCards}
    />
  );
}
