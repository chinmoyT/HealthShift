import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Phone, Building2, User } from "lucide-react";
import React from "react";

const DepartmentCard = ({ name, hod, hodOffice, hodPhoneNumber }) => {
  return (
    <Card className="w-full max-w-lg shadow-md hover:shadow-lg transition-shadow rounded-2xl">
      
      <CardHeader className="border-b">
        <CardTitle className="text-xl font-semibold text-gray-800">
          {name}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 mt-4">
        
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback>
              {hod ? hod.charAt(0).toUpperCase() : "?"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <User className="h-4 w-4 text-gray-500" /> HOD
            </p>
            <p className="text-gray-600">{hod || "Not Assigned"}</p>
          </div>
        </div>

        {/* Office Section */}
        <div>
          <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <Building2 className="h-4 w-4 text-gray-500" /> Office
          </p>
          <p className="text-gray-600">{hodOffice || "N/A"}</p>
        </div>

        {/* Phone Section */}
        <div>
          <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <Phone className="h-4 w-4 text-gray-500" /> Phone
          </p>
          <p className="text-gray-600">{hodPhoneNumber || "N/A"}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DepartmentCard;
