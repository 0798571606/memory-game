import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { src: '/img/helmet-1.png', matched: false },
  { src: '/img/potion-1.png', matched: false },
  { src: '/img/ring-1.png', matched: false },
  { src: '/img/scroll-1.png', matched: false },
  { src: '/img/shield-1.png', matched: false },
  { src: '/img/sword-1.png', matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false)

  function shuffleCards() {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
  }

  function handleChoice(card) {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  // compare two selected cards
  useEffect(
    function () {
      if (choiceOne && choiceTwo) {
        setDisabled(true)
        
        if (choiceOne.src === choiceTwo.src) {
          setCards((prevCards) => {
            return prevCards.map((card) => {
              if (card.src === choiceOne.src) return { ...card, matched: true };
              else return card;
            });
          });
          resetTurn();
        } else {
          setTimeout(() => {
            resetTurn();
          }, 1000);
        }
      }
    },
    [choiceOne, choiceTwo]
  );

  function resetTurn() {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((turn) => turn + 1);
    setDisabled(false)
  }

  useEffect(function () {
    shuffleCards()
  }, [])

  return (
    <div className='App'>
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
