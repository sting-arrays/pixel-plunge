import GamePage from "../GamePage";
import { Link } from "react-router-dom";
import { getAllFish, getUserDetails } from "../../firebase";
import { useEffect, useState, useContext } from "react";
import { UserNameContext } from "../../contexts/UsernameContext";

export default function Fishidex() {
 const [allFish, setAllFish] = useState([]);
 const { currentUser, setCurentUser } = useContext(UserNameContext);
 const [usersFish, setUsersFish] = useState([]);

 useEffect(() => {
  getAllFish().then((response) => {
   setAllFish(response);
  });
 }, []);

 if (allFish.length === 0) {
  return <p>is loading ...</p>;
 }

 if (currentUser === "Guest") {
  return (
   <div>
    <p>This is fishidex!</p>
    <ul>
     {allFish.map((fish) => {
      if (currentUser === "Guest") {
       return (
        <div key={fish.name}>
         <li>
          <img src={fish.image} alt="fish swimming in the sea and having a great time" />
         </li>
         <li>{fish.name}</li>
         <li>{fish.facts}</li>
        </div>
       );
      }
     })}
    </ul>
    <Link className="button" to="/game" element={<GamePage />}>
     {" "}
     Back to Game{" "}
    </Link>
   </div>
  );
 }

 getUserDetails(currentUser).then((result) => {
  setUsersFish(result.caught_fish);
 });

 if (usersFish.length === 0) return <div>Loading...</div>;

 return (
  <div>
   <p>This is fishidex!</p>
   <ul>
    {allFish.map((fish) => {
     return (
      <div key={fish.name}>
       <li>
        <img src={usersFish.includes(fish.name) ? fish.image : fish.grey_image} alt="fish swimming in the sea and having a great time" />
       </li>
       <li>{fish.name}</li>
       <li>{fish.facts}</li>
      </div>
     );
    })}
   </ul>
   <Link className="button" to="/game" element={<GamePage />}>
    {" "}
    Back to Game{" "}
   </Link>
  </div>
 );
}
