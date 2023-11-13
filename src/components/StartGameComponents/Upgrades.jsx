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
        <p className="block text-3xl">
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
      <p>This is the upgrades page</p>
      <Link className="button" to="/game" element={<GamePage />}>
        {" "}
        Back to Game{" "}
      </Link>
      <Currency userMoney={userMoney} />
      <ul className="grid grid-cols2 grid-rows-1">
        <OxygenTank userMoney={userMoney} setUserMoney={setUserMoney} />
        <FishNet userMoney={userMoney} setUserMoney={setUserMoney} />
      </ul>
    </div>
  );
}
