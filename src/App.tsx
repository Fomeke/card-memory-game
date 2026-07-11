import { useState } from "react";
import Card from "./components/Card";

{
  /* funcion que crea el mazo definiendo los 6 simbolos en un arreglo,
  y los ... los duplica para tener los 12, los mezcla aleatoriamente con el sort(),
  convierte cada simbolo en un objeto carta con el map(), cada uno tiene sus propiedades */
}
function createCard() {
  {
    /* define los simbolos que existiran */
  }
  const symbol = ["🧐", "♣️", "♦️", "♥️", "♠️", "🤖"];

  {
    /* duplica los simbolos */
  }
  const duplicate = [...symbol, ...symbol];

  {
    /*mezcla los 12 simbolos en orden aleatorio con el random devuelve numeros
    positivos y negativos al azar, lo que hace que el sort mezcle sin orden*/
  }
  const save = duplicate.sort(() => Math.random() - 0.5);

  {
    /*reccore y transforma cada simbolo en un objeto card con sus props*/
  }
  const x = save.map((n, index) => {
    return { id: index, symbols: n, faceUp: false, wasFound: false };
  });
  return x;
}

function App() {
  {
    /* aqui guardo los arreglos de las 12 cartas, y el set lo ocupo para actualizar el arreglo*/
  }
  const [cards, setCards] = useState(createCard);

  {
    /*aqui guardo la primera carta que se selecciona con el click, para luego comporarlas.
    tambien empieza en null por que nadie a clickeado nada*/
  }
  const [firstCard, setFirstCard] = useState<{
    id: number;
    symbols: string;
    faceUp: boolean;
    wasFound: boolean;
  } | null>(null);

  const handleClick = (selectCard: {
    id: number;
    symbols: string;
    faceUp: boolean;
    wasFound: boolean;
  }) => {
    {
      /*bloquea el clic si al carta ya fue encontrada o si es la misma carta que esta seleccionada
      el "?" es para que no explote si el firstcard es null xD*/
    }
    if (selectCard.wasFound === true || selectCard.id === firstCard?.id) {
      return null;
    }
    {
      /*si no hay primera carta. guarda esta como primera y la voltea boca arriba
      el map recorre todo y solo modifica la clickeada usando la id*/
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
      {
        /*se compara los simbolos si son iguales y marca ambas cartas como encontradas. luego reseteo el firstcard */
      }
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
        {
          /*si los simbolos no son iguales primero voltea la segunda carta para que el jugador
          la vea con el setTimeout espera 500ms y voltea todas las cartas que esten boca arriba y no encontradas*/
        }
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

  const [colorFund, setColorFund] = useState("#000000");
  document.body.style.backgroundColor = colorFund;
  /* dibuja las cartas en la pantalla, recorre cards con el map() y por cada carta
    renderiza un componente <Card /> le pasa 4 props*/
  return (
    <div className="container" style={{ backgroundColor: colorFund }}>
      <div
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
      <input
        onChange={(e) => setColorFund(e.target.value)}
        type="color"
        style={{}}
      />

      <h1 style={{ textAlign: "center", display: "grid", color: "#FFFFFF" }}>
        {cards.every((a) => a.wasFound === true) ? "Lo lograste🥳" : ""}
      </h1>
    </div>
  );
}
export default App;
