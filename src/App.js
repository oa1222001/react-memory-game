import "./App.css";
import { useEffect, useState } from "react";
import SingleCard from "./components/singleCard";
const cardImages = [
  {
    src: "../../img/helmet-1.png",
  },
  {
    src: "../../img/potion-1.png",
  },
  {
    src: "../../img/ring-1.png",
  },
  {
    src: "../../img/scroll-1.png",
  },
  {
    src: "../../img/shield-1.png",
  },
  {
    src: "../../img/sword-1.png",
  },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  useEffect(() => {
    if (choiceOne !== null && choiceTwo !== null) {
      if (choiceOne.src === choiceTwo.src) {
        console.log("won");
      } else {
        console.log("lost");
      }
      resetTurn();
    }
  }, [choiceOne, choiceTwo]);
  const shufflCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setTurns(0);
  };
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shufflCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            handleChoice={handleChoice}
            key={card.id}
            card={card}
          ></SingleCard>
        ))}
      </div>
    </div>
  );
}

export default App;
