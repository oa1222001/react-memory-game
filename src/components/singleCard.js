import classes from "./singleCard.module.css";
const SingleCard = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };
  return (
    <div className={classes.card}>
      <div className={flipped ? classes.flipped : ""}>
        <img src={card.src} className={classes.front} alt="card front" />
        <img
          src="../img/cover.png"
          className={classes.back}
          onClick={handleClick}
          alt="card back"
        />
      </div>
    </div>
  );
};

export default SingleCard;
