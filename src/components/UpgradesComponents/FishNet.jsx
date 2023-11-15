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
    <li className="flex flex-cols justify-center items-center border-black text-white mt-10">
      <p className="mx-2 text-[25px] font-bold">
        Fish Net: Holds {userFishNet} fish
      </p>
      <img className="w-32" src="/net-upgrade.png" alt="" />
      <button
        className={userMoney < 1000 ? "button-disabled" : "button"}
        disabled={userMoney < 1000 ? true : false}
        onClick={() => {
          if (userMoney >= 1000) {
            upgradeFishNet(currentUser, userFishNet + 1, userMoney - 1000).then(
              () => {
                setUserFishNet(userFishNet + 1);
                setUserMoney(userMoney - 1000);
              }
            );
          }
        }}
      >
        Upgrade (1000)
      </button>
    </li>
  );
}
