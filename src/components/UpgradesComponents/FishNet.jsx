import { getUserDetails, upgradeFishNet } from "../../firebase";
import { useContext, useState, useEffect } from "react";
import { UserNameContext } from "../../contexts/UsernameContext";

export default function FishNet({ userMoney, setUserMoney }) {
 const { currentUser } = useContext(UserNameContext);
 const [userFishNet, setUserFishNet] = useState(0);

 useEffect(() => {
  if (currentUser === "Guest") return;
  getUserDetails(currentUser).then((result) => {
   setUserFishNet(result.Fish_Bag);
  });
 }, [currentUser, userFishNet]);

 return (
  <>
   <p>Fish Net: {userFishNet}</p>
   <button
    disabled={userMoney < 1000 ? true : false}
    onClick={() => {
     if (userMoney >= 1000) {
      upgradeFishNet(currentUser, userFishNet + 1, userMoney - 1000).then(() => {
       setUserFishNet(userFishNet + 1);
       setUserMoney(userMoney - 1000);
      });
     }
    }}
   >
    Upgrade Fish Net (1000)
   </button>
  </>
 );
}
