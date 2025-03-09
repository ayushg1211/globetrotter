"use client";
import { useEffect, useState } from "react";
import styles from "./Destination.module.css";
import { fetchRandomDestination } from "@/services/destinationService";
import Questions from "@/components/questions/Questions";
import ShareGame from "../share-game/ShareGame";
import Feedback from "../feedback/Feedback";
import Scoreboard from "../scoreboard/ScoreBoard";

const Destinations = () => {
  const [destination, setDestination] = useState(null);
  const [options, setOptions] = useState([]);
  const [isCorrect, setIsCorrect] = useState(undefined);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [disableOption, setDisableOption] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [inviter, setInviter] = useState(null);
  const [inviterScore, setInviterScore] = useState(null);
  const [inviterAttempts, setInviterAttempts] = useState(null);
  //   setSearchParams(new URLSearchParams(window.location.search));
  // }, []);

  useEffect(() => {
    getDestination();

    const savedScore = Number(localStorage.getItem("score")) || 0;
    const savedTotalAttempts = Number(localStorage.getItem("totalAttempts")) || 0;
  
    setScore(savedScore);
    setTotalAttempts(savedTotalAttempts);

    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get("user");
    const userScore = urlParams.get("score");
    const userTotalAttempts = urlParams.get("totalAttempts");

    if (user && userScore !== null && userTotalAttempts !== null) {
      setInviter(user);
      setInviterScore(userScore);
      setInviterAttempts(userTotalAttempts);
    }
  }, []);

  // To Get Question and it's Options
  async function getDestination() {
    try {
      const { destination, options } = await fetchRandomDestination();
      setDestination(destination);
      setOptions(options);
    } catch (error) {
      console.error("Failed to fetch destination:", error);
    }
  }

  // Option Selection
  const handleSelectedOption = (selectedOption, target) => {
    let correct = selectedOption.city === destination.city;
    setIsCorrect(correct);
    setSelectedAnswer(selectedOption);
    setDisableOption(true);
    setSelectedTarget(target);
    // console.log(destination.city);
    // console.log(selectedOption);

    if (correct) {
      target.classList.add(styles.right);
      const newScore = score + 1;
      setScore(newScore);
      localStorage.setItem("score", newScore);
    } else {
      target.classList.add(styles.wrong);
    }

    const newTotalAttempts = totalAttempts + 1;
    setTotalAttempts(newTotalAttempts);
    localStorage.setItem("totalAttempts", newTotalAttempts);
  };

  // Play Again
  const handleNextGame = () => {
    setIsCorrect(null);
    setSelectedAnswer(null);
    setDisableOption(false);

    // console.log(selectedTarget);
    selectedTarget.classList.remove(styles.right);
    selectedTarget.classList.remove(styles.wrong);

    getDestination();
  };

  // Reset Score
  const resetScore = () => {
    setScore(0);
    setTotalAttempts(0);
    localStorage.removeItem("score");
    localStorage.removeItem("totalAttempts");
  };


  if (!destination) return <p>Loading...</p>;

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Guess the Destination!</h1>
      <Questions
        destination={destination}
        options={options}
        handleSelectedOption={handleSelectedOption}
        disableOption={disableOption}
      />

      <Feedback className={styles.feedback} isCorrect={isCorrect} selectedAnswer={selectedAnswer} destination={destination} handleNextGame={handleNextGame}/>
        
      {selectedAnswer && <button className={styles.button} onClick={handleNextGame}>Play Again</button>}

      <Scoreboard className={styles.scoreboard} score={score} totalAttempts={totalAttempts} inviter={inviter} inviterScore={inviterScore} inviterAttempts={inviterAttempts} resetScore={resetScore}/>

      <ShareGame className={styles.shareGame} score={score} totalAttempts={totalAttempts} />
    </section>
  );
};

export default Destinations;
