import React, { useEffect, useState } from "react";
import { getuserData } from "../../../api/chatRequest";

import { Avatar } from "flowbite-react";
const Conversations = ({ data, currentUser }) => {
  const [userData, setuserData] = useState(null);

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUser);

    const getuser = async () => {
      try {
        const { data } = await getuserData(userId);
        setuserData(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getuser();
  }, []);
  return (
    <div>
      <div className="bg-slate-300  rounded-md hover:bg-slate-200">
        <Avatar className="h-16" img={userData?.profileimage} rounded-md>
          <div className="space-y-1 font-medium dark:text-white">
            <div className="">{userData?.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400"></div>
          </div>
        </Avatar>
      </div>
    </div>
  );
};

export default Conversations;
