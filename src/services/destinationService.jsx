import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

export const fetchRandomDestination = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "destinations"));
      // console.log(querySnapshot.docs[0].data()) ;
      const allDestinations = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (allDestinations.length > 0) {
        // Pick a random destination
        const randomDestination =
          allDestinations[Math.floor(Math.random() * allDestinations.length)];

        // setDestination(randomDestination);  ///////////
        
        // Create answer choices (shuffle to avoid obvious answer)
        const shuffledOptions = [...allDestinations]
          .sort(() => 0.5 - Math.random())
          .slice(0, 4); // Pick 3 random choices

        if (!shuffledOptions.some((opt) => opt.id === randomDestination.id)) {
          shuffledOptions.pop() ;
          shuffledOptions.push(randomDestination); // Ensure the correct answer is included
        }

        // setOptions(shuffledOptions.sort(() => 0.5 - Math.random())); // Shuffle again ////////////////
        return {
          destination: randomDestination,
          options: shuffledOptions.sort(() => 0.5 - Math.random()), // Shuffle again
        };

      }
    } catch (error) {
      console.error("Error fetching destinations:", error);
      return null
    }
  };