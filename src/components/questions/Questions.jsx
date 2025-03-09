// components/Question.js
import styles from "./Questions.module.css";

const Questions = ({ destination, options, handleSelectedOption, disableOption }) => {
  return (
    <section className={styles.container}>
      <p className={styles.questionText}>
        {destination.clues[
          0
        ]}
      </p>
      <ul className={styles.optionsList}>
        {options.map((option) => (
          <li key={option.id}>
            <button
              className={styles.choice}
              onClick={(e) => handleSelectedOption(option, e.target)}
              disabled={disableOption}
            >
              {option.city}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Questions;