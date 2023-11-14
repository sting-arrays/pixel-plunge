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
        <div className='flex justify-center leading-[100px]'>
        <img 
        alt='fish swimming to the side'
        src='/src/assets/Other/fishidex-fish-2.png' />
        <h1 className="text-[35px] mb-5">Fishidex</h1>
        <img 
        alt='fish swimming to the side'
        src='/src/assets/Other/fishidex-fish-2.png'/>
        </div>
        
        <ul className="grid grid-cols-2 grid-rows-5 gap-3 mb-5">
          {allFish.map((fish) => {
            if (currentUser === "Guest") {
              return (
                <li
                  className="flex flex-col mr-0 bg-cyan-600 rounded-lg py-7 w-96 text-white bg-opacity-60 justify-self-center"
                  key={fish.name}
                >
                  <img
                    className="self-center"
                    src={fish.image}
                    alt="fish swimming in the sea and having a great time"
                  />
                  <h3 className="text-[20px]">{fish.name}</h3>
                  <p>{fish.facts}</p>
                </li>
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
      <h1 className="text-[35px] mb-5">Fishidex</h1>
      <ul className="grid grid-cols-2 grid-rows-5 gap-3 mb-5">
        {allFish.map((fish) => {
          return (
            <li
              className="flex flex-col mr-0 bg-cyan-600 rounded-lg py-7 w-96 text-white bg-opacity-60"
              key={fish.name}
            >
              <img
                className="self-center"
                src={
                  usersFish.includes(fish.name) ? fish.image : fish.grey_image
                }
                alt="fish swimming in the sea and having a great time"
              />
              {usersFish.includes(fish.name) ? (
                <h3 className="text-[20px]">{fish.name}</h3>
              ) : (
                <h3 className="text-[20px]">???</h3>
              )}
              {usersFish.includes(fish.name) ? (
                <p>{fish.facts}</p>
              ) : (
                <p>?????</p>
              )}
            </li>
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
