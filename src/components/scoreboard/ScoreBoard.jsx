import styles from "./ScoreBoard.module.css";

const Scoreboard = ({
  score,
  totalAttempts,
  inviter,
  inviterScore,
  inviterAttempts,
  resetScore,
}) => {
  return (
    <section className={styles.scoreboard}>
      <h2 className={styles.title}>
        Score:
        <span className={styles.score}>
          {score}/{totalAttempts}
        </span>
      </h2>
      <button className={styles.resetButton} onClick={resetScore}>Reset Score</button>
      {inviter && (
        <p className={styles.inviterText}>
          {`${inviter} scored ${inviterScore}/${inviterAttempts} points! Can you beat them?`}
        </p>
      )}
    </section>
  );
};

export default Scoreboard;
