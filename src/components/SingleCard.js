import './SingleCard.css';

function SingleCard({ card, handleChoice, flipped, disabled }) {
  function handleCLick() {
    if (!disabled) handleChoice(card);
  }

  return (
    <div className='card'>
      <div className={flipped ? 'flipped' : ''}>
        <img className='front' src={card.src} alt='front image' />
        <img
          className='back'
          src='/img/cover.png'
          alt='back image'
          onClick={handleCLick}
        />
      </div>
    </div>
  );
}

export default SingleCard;
