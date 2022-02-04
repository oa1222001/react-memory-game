import "./App.css";
import { useEffect, useState } from "react";
import SingleCard from "./components/singleCard";
const cardImages = [
  {
    src: "../../img/helmet-1.png",
    matched: false,
  },
  {
    src: "../../img/potion-1.png",
    matched: false,
  },
  {
    src: "../../img/ring-1.png",
    matched: false,
  },
  {
    src: "../../img/scroll-1.png",
    matched: false,
  },
  {
    src: "../../img/shield-1.png",
    matched: false,
  },
  {
    src: "../../img/sword-1.png",
    matched: false,
  },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    shuffleCards();
  }, []);
  useEffect(() => {
    if (choiceOne !== null && choiceTwo !== null) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevcards) =>
          prevcards.map((card) => {
            if (card.src == choiceOne.src) {
              card.matched = true;
            }
            return card;
          })
        );
      } else {
        console.log("lost");
      }
      setTimeout(() => {
        resetTurn();
      }, 2000);
      console.log(cards);
    }
  }, [choiceOne, choiceTwo]);

  const shuffleCards = () => {
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
    setDisabled(false);
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            handleChoice={handleChoice}
            key={card.id}
            card={card}
            disabled={disabled}
            flipped={card === choiceOne || card === choiceTwo}
          ></SingleCard>
        ))}
      </div>
    </div>
  );
}

export default App;
