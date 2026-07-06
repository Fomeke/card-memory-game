import { useState } from "react";
import Card from "./components/Card";

{
  /* funcion que crea el mazo definiendo los 6 simbolos en un arreglo,
  y los ... los duplica para tener los 12, los mezcla aleatoriamente con el sort(),
  convierte cada simbolo en un objeto carta con el map(), cada uno tiene sus propiedades */
}
function createCard() {
  const symbol = ["A", "♣️", "♦️", "♥️", "♠️", "B"];

  const duplicate = [...symbol, ...symbol];

  const save = duplicate.sort(() => Math.random() - 0.5);

  const x = save.map((n, index) => {
    return { id: index, symbols: n, faceUp: false, wasFound: false };
  });
  return x;
}

{
  /* el componente principal, tiene 2 estados: cards el arreglo de 12 cartas, se inicializa con createcard()
  firstCard la primera carta clickeada, empieza en null*/
}
function App() {
  const [cards, setCards] = useState(createCard);

  const [firstCard, setFirstCard] = useState<{
    id: number;
    symbols: string;
    faceUp: boolean;
    wasFound: boolean;
  } | null>(null);

  {
    /* se ejecuta cuando clickean una carta.
    si firstCard === null (no hay primera carta todavia), guarda la carta seleccionada
    com primera carta con setFirstCard */
  }
  const handleClick = (selectCard: {
    id: number;
    symbols: string;
    faceUp: boolean;
    wasFound: boolean;
  }) => {
    if (selectCard.wasFound === true || selectCard.id === firstCard?.id) {
      return null;
    }
    if (firstCard === null) {
      setFirstCard(selectCard);
      setCards(
        cards.map((card) => {
          if (card.id === selectCard.id) {
            return { ...card, faceUp: true };
          } else {
            return card;
          }
        }),
      );
    } else {
      if (firstCard.symbols === selectCard.symbols) {
        setCards(
          cards.map((card) => {
            if (card.id === selectCard.id) {
              return { ...card, faceUp: true, wasFound: true };
            } else if (card.symbols === selectCard.symbols) {
              return { ...card, wasFound: true };
            } else {
              return card;
            }
          }),
        );
        setFirstCard(null);
      } else {
        setCards(
          cards.map((card) => {
            if (card.id === selectCard.id) {
              return { ...card, faceUp: true };
            } else {
              return card;
            }
          }),
        );
        setTimeout(() => {
          setCards(
            cards.map((card) => {
              if (card.faceUp === true && card.wasFound === false) {
                return { ...card, faceUp: false };
              } else {
                return card;
              }
            }),
          );
          setFirstCard(null);
        }, 500);
      }
    }
  };
  /* dibuja las cartas en la pantalla, recorre cards con el map() y por cada carta
    renderiza un componente <Card /> le pasa 4 props*/
  return (
    <div
      className="board"
      style={{
        justifyContent: "center",
        display: "grid",
        gridTemplateColumns: "repeat(4, 0fr)",
      }}
    >
      {cards.map((card, index) => (
        <Card
          key={index}
          id={card.id}
          symbols={card.symbols}
          faceUp={card.faceUp}
          wasFound={card.wasFound}
          click={() => handleClick(card)}
        />
      ))}
    </div>
  );
}
export default App;
