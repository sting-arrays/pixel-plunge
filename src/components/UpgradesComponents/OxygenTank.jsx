import { getUserDetails, upgradeOxygen } from "../../firebase";
import { useContext, useState, useEffect } from "react";
import { UserNameContext } from "../../contexts/UsernameContext";

export default function OxygenTank({ userMoney, setUserMoney }) {
  const { currentUser } = useContext(UserNameContext);
  const [userOxygen, setUserOxygen] = useState(0);

  useEffect(() => {
    if (currentUser === "Guest") return;
    getUserDetails(currentUser).then((result) => {
      setUserOxygen(result.Oxygen);
    });
  }, [currentUser, userOxygen]);

  return (
    <>
      <img src="src/assets/Other/o2tank.png" alt="" />
      <p>Oxygen Tank: {userOxygen} seconds</p>

      <button
        disabled={userMoney < 500 ? true : false}
        onClick={() => {
          if (userMoney >= 500) {
            upgradeOxygen(currentUser, userOxygen + 1, userMoney - 500).then(
              () => {
                setUserOxygen(userOxygen + 1);
                setUserMoney(userMoney - 500);
              }
            );
          }
        }}
      >
        Upgrade (500)
      </button>
    </>
  );
}
