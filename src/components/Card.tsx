interface cardProps {
  id: number;
  symbols: string; // el simbolo de la carta
  faceUp: boolean; // si esta boca arriba ono
  wasFound: boolean; // si ya fue encontrado
  click: () => void; // la funcion que se ejecuta al clickear
}

function Card(props: cardProps) {
  const { id, symbols, faceUp, wasFound, click } = props; //recibe los props
  return (
    <div
      onClick={click}
      style={{ width: "125px", height: "135px", fontSize: "120px" }}
    >
      {faceUp ? symbols : "🎴"}
    </div>
  ); //esto dibuja la carta y cuando clickean llama la funcion
}

export default Card;
