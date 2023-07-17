/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { data } from "./data";

function Play({
  cards,
  setCards,
  selectedCards,
  setSelectedCards,
  matchedCards,
  setMatchedCards,
}) {
  const resetCart = () => {
    localStorage.removeItem("cards");
    localStorage.removeItem("selectedCards");
    localStorage.removeItem("matchedCards");

    setMatchedCards([]);
    setSelectedCards([]);

    // const symbols = ["🐶", "🐱", "🐭", "🐹", "🐰", "🐻", "🐼", "🐯"];
    // const newCards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);

    const newCards = [...data].sort(() => Math.random() - 0.5);

    setCards(newCards);
  };

  // Guarda los datos en el Local Storage
  useEffect(() => {
    if (cards.length > 0) {
      localStorage.setItem("cards", JSON.stringify(cards));
      localStorage.setItem("selectedCards", JSON.stringify(selectedCards));
      localStorage.setItem("matchedCards", JSON.stringify(matchedCards));
    }
  }, [cards, selectedCards, matchedCards]);

  // Verifica si dos cartas seleccionadas son un par
  useEffect(() => {
    if (selectedCards.length === 2) {
      setTimeout(() => {
        const [card1, card2] = selectedCards;
        if (cards[card1].matched === cards[card2].matched) {
          setMatchedCards([...matchedCards, card1, card2]);
        }
        setSelectedCards([]);
      }, 1000);
    }
  }, [selectedCards, cards, matchedCards]);

  // Maneja el clic en una carta
  const handleCardClick = (index) => {
    if (matchedCards.includes(index)) {
      return;
    }
    if (selectedCards.length === 1 && selectedCards[0] === index) {
      return;
    }
    setSelectedCards([...selectedCards, index]);
  };

  console.log(selectedCards);

  // Renderiza las cartas en la cuadrícula
  const renderCards = () => {
    return cards.map((symbol, index) => (
      <div
        key={index}
        className={`card ${selectedCards.includes(index) ? "selected" : ""} ${
          matchedCards.includes(index) ? "matched" : ""
        }`}
        onClick={() => handleCardClick(index)}
      >
        {matchedCards.includes(index) || selectedCards.includes(index) ? (
          <img width={100} src={symbol.emoji} />
        ) : (
          ""
        )}
      </div>
    ));
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "2rem",
        }}
      >
        <h1>Memorama</h1>
        <button className="btn btn-primary" onClick={() => resetCart()}>
          Comenzar
        </button>
      </div>

      <div className="grid m-4">{renderCards()}</div>
    </div>
  );
}

export default Play;
