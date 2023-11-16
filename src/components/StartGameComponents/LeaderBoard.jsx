import { useEffect, useState } from "react";
import { getAllUsers } from "../../firebase";
import GamePage from "../GamePage";
import { Link } from "react-router-dom";

export default function LeaderBoard() {
 let counter = 1;
 const [users, setUsers] = useState([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  getAllUsers().then((result) => {
   setUsers(result.sort((a, b) => b.Fish_Count - a.Fish_Count).slice(0, 9));
   setLoading(false);
  });
 }, []);

 if (loading) return <p>is loading...</p>;

 return (
  <div className="m-auto">
   <div className="bg-[url('/scroll-leaderboard-2.png')] bg-contain bg-no-repeat bg-center min-h-[820px] min-w-[870px] overflow-auto m-auto pb-60">
    <p className=" text-[35px] pt-28 ">Leaderboard</p>
    <div className="min-h-[500px]">
     <ul className=" text-[32px] pt-24 min-h-[200px] ">
      {users.map((user) => {
       return (
        <li key={user.userName}>
         <p className="text-[20px]">{counter++ + " - " + user.userName}</p>
         <div></div>
         <p className="text-[12px] mb-1">Fish Caught: {user.Fish_Count}</p>
        </li>
       );
      })}
     </ul>
    </div>
   </div>
   <div className="min-w-[870px]">
    <Link className="button" to="/game" element={<GamePage />}>
     {" "}
     Back to Game{" "}
    </Link>
   </div>
  </div>
 );
}
