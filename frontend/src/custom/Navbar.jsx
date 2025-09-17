import React, { useEffect, useState } from "react";
import localStorageUtils from "../utils/localStorage";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getGreeting } from "../utils/common";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorageUtils.getDecryptedItem("user");
    setUsername(userData?.firstName);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex justify-end items-center px-6 py-4 shadow-md border-b">
      {/* <div className="text-lg font-semibold text-gray-800">MyApp</div> */}

      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">
          {getGreeting()},{" "}
          <span className="font-semibold text-gray-800">{username}</span> 👋
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="User Avatar"
              />
              <AvatarFallback>
                {username?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40 mt-2">
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
