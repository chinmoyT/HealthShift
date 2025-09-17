import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge"
import { Phone, Mail } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const ProfileCard = ({
  firstName,
  lastName,
  email,
  phoneNumber,
  department,
  role,
  avatarUrl,
  lastUpdated,
}) => {
  const updatedDate = new Date(lastUpdated).toLocaleString();
  return (
    <Card className="w-full min-w-[260px] shadow-xl rounded-2xl border border-gray-300 transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02] hover:cursor-grab">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar>
            {avatarUrl ? (
              <AvatarImage src={avatarUrl} alt={firstName} />
            ) : (
              <AvatarFallback>
                {firstName?.charAt(0).toUpperCase()}
                {lastName?.charAt(0).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <CardTitle className="text-base md:text-lg font-semibold truncate">
            {firstName} {lastName}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-6 text-gray-600 text-sm flex-wrap">
          <div className="flex items-center gap-2 min-w-0">
            <Mail size={16} className="flex-shrink-0" />
            <span className="truncate">{email}</span>
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <Phone size={16} className="flex-shrink-0" />
            <span className="truncate">{phoneNumber}</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:gap-4 text-sm">
          <span className="font-medium text-gray-800 shrink-0">Role:</span>
          <span className="text-gray-600 break-words min-w-0">{role}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:gap-4 text-sm">
          <span className="font-medium text-gray-800 shrink-0 min-w-0">
            Department:
          </span>
          <span className="text-gray-600 break-words">{department}</span>
        </div>
        
      </CardContent>

      <CardFooter className="text-xs text-gray-500">
        Last updated: {updatedDate}
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
