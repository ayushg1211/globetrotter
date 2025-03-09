import { useState } from "react";
import styles from "./ShareGame.module.css" ;

const ShareGame = ({ score, totalAttempts }) => {
  const [username, setUsername] = useState("");

  const generateShareLink = () => {
    if (!username.trim()) {
      alert("Please enter your username before sharing!");
      return;
    }

    const baseUrl = window.location.origin;
    const shareUrl = `${baseUrl}/?user=${encodeURIComponent(
      username
    )}&score=${score}&totalAttempts=${totalAttempts}`;

    const whatsappMessage = `Hey! I scored ${score}/${totalAttempts} in Globetrotter. Can you beat my score? Play now: ${shareUrl}`;
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappLink, "_blank");
  };

  return (
    <section className={styles.shareGame}>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={styles.input}
      />
      <button className={styles.shareButton} onClick={generateShareLink}>Challenge a Friend</button>
    </section>
  );
};

export default ShareGame;
