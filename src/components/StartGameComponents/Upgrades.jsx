import GamePage from "../GamePage";
import { Link } from "react-router-dom";
import Currency from "../UpgradesComponents/Currency";
import OxygenTank from "../UpgradesComponents/OxygenTank";
import SwimSpeed from "../UpgradesComponents/SwimSpeed";
import FishNet from "../UpgradesComponents/FishNet";
import WelcomePage from "../WelcomePage";
import { getUserDetails } from "../../firebase";
import { useContext, useState, useEffect } from "react";
import { UserNameContext } from "../../contexts/UsernameContext";

export default function Upgrades() {
  const { currentUser } = useContext(UserNameContext);
  const [userMoney, setUserMoney] = useState(0);
  const [isLoading, setIsLoadiing] = useState(true);

  if (currentUser === "Guest")
    return (
      <div className="flex flex-col justify-center h-screen">
        <div className='flex justify-center'>
      <img 
      src='src/assets/Other/Scuba mask 2.png'
      className='w-24'/>
      <p className='text-[35px] mb-5 font-bold leading-[100px]'>Upgrades</p>
      <img 
      src='src/assets/Other/Scuba mask 2.png'
      className='w-24'/>
      </div>
      
        <p className="block text-3xl text-white">
          You must login to view upgrade options!
        </p>
        <Link
          className="block mx-auto my-5 w-96 button"
          to="/game"
          element={<GamePage />}
        >
          {" "}
          Back to Game{" "}
        </Link>
        <Link
          className="block mx-auto my-5 w-96 button"
          to="/"
          element={<WelcomePage />}
        >
          {" "}
          Return Home to Login{" "}
        </Link>
      </div>
    );

  useEffect(() => {
    if (currentUser === "Guest") return;
    getUserDetails(currentUser).then((result) => {
      setUserMoney(result.Money);
      setIsLoadiing(false);
    });
  }, [currentUser]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div className='flex justify-center'>
      <img 
      src='src/assets/Other/Scuba mask 2.png'
      className='w-24'/>
      <p className='text-[35px] mb-5 font-bold leading-[100px]'>Ugrades</p>
      <img 
      src='src/assets/Other/Scuba mask 2.png'
      className='w-24'/>
      </div>
      
      
      <Currency userMoney={userMoney} />
      <ul className="">
        <OxygenTank userMoney={userMoney} setUserMoney={setUserMoney} />
        <FishNet userMoney={userMoney} setUserMoney={setUserMoney} />
      </ul>
      <Link className="button mt-12" to="/game" element={<GamePage />}>
        {" "}
        Back to Game{" "}
      </Link>
    </div>
  );
}
