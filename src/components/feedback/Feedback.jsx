import styles from "./Feedback.module.css"

const Feedback = ({isCorrect, selectedAnswer, destination, handleNextGame=()=>{} }) => {
  return (
    <section className={styles.feedbackContainer}>
      {selectedAnswer && (
        <>
          <p className={isCorrect ? styles.correct : styles.wrong}>
            {isCorrect ? "🎉 Correct!" : "😢 Wrong!"}
          </p>
          {!isCorrect && <p>The correct answer is: {destination.city}</p>}
          <p className={styles.funFact}>
            Fun Fact:
            {
              destination.fun_fact[
                Math.floor(Math.random() * destination.fun_fact.length)
              ]
            }
          </p>
        </>
      )}
    </section>
  );
};

export default Feedback ;
