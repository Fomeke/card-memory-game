import { useState } from "react";
import Card from "./components/Card";

function createCard() {
  const symbol = ["A", "♣️", "♦️", "♥️", "♠️", "B"];

  const duplicate = [...symbol, ...symbol];

  const save = duplicate.sort(() => Math.random() - 0.5);

  const x = save.map((n) => {
    return { symbols: n, faceUp: false, wasFound: false };
  });
  return x;
}

function App() {
  const [cards, setCards] = useState(createCard);

  const [firstCard, setFirstCard] = useState<{
    symbols: string;
    faceUp: boolean;
    wasFound: boolean;
  } | null>(null);

  const handleClick = (selectCard: {
    symbols: string;
    faceUp: boolean;
    wasFound: boolean;
  }) => {
    if (firstCard === null) {
      setFirstCard(firstCard);
    } else {
      if (firstCard.symbols === selectCard.symbols) {
      } else {
      }
    }
  };

  return cards.map((card, index) => (
    <Card
      key={index}
      symbols={card.symbols}
      faceUp={card.faceUp}
      wasFound={card.wasFound}
      click={() => handleClick(card)}
    />
  ));
}

export default App;
