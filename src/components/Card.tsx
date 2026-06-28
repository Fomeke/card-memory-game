interface cardProps {
  symbols: string;
  faceUp: boolean;
  wasFound: boolean;
  click: () => void;
}

function Card(props: cardProps) {
  const { symbols, faceUp, wasFound, click } = props;
  return <div onClick={click}>{faceUp ? symbols : "🎴"}</div>;
}

export default Card;
