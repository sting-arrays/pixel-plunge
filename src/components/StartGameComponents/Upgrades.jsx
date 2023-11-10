import GamePage from "../GamePage";
import { Link } from "react-router-dom";
import Currency from "../UpgradesComponents/Currency";
import OxygenTank from "../UpgradesComponents/OxygenTank";
import SwimSpeed from "../UpgradesComponents/SwimSpeed";
import FishNet from "../UpgradesComponents/FishNet";
import { getUserDetails } from "../../firebase";
import { useContext, useState, useEffect } from "react";
import { UserNameContext } from "../../contexts/UsernameContext";

export default function Upgrades() {
 const { currentUser } = useContext(UserNameContext);
 const [userMoney, setUserMoney] = useState(0);
 const [isLoading, setIsLoadiing] = useState(true);

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
   <OxygenTank userMoney={userMoney} setUserMoney={setUserMoney} />
   <FishNet userMoney={userMoney} setUserMoney={setUserMoney} />
  </div>
 );
}
