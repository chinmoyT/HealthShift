import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDepartmentById } from "../../redux/slices/department";
import { useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import EmployeeCard from "../../custom/EmployeeCard";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const DepartmentDetails = () => {
  const [departmentData, setDepartmentData] = useState({});
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    async function getDepartmentDetails() {
      const response = await dispatch(getDepartmentById(id));
      console.log("dept details", response.payload.data);
      if (response.payload.status) {
        setDepartmentData(response.payload.data);
      }
    }

    getDepartmentDetails();
  }, []);
  console.log("depData", departmentData);
  return (
    <div className="w-full space-y-6">
      
      <div className="flex items-center text-sm text-gray-500">
        <Link to="/" className="hover:underline text-gray-700">
          Home
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link to="/departments" className="hover:underline text-gray-700">
          Departments
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900 font-semibold">
          {departmentData?.department?.name || "Department"}
        </span>
      </div>

      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold">
            {departmentData?.department?.name}
          </h1>

          {departmentData?.department?.hod && (
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={departmentData?.department?.hod?.user?.avatarUrl}
                  alt={departmentData?.department?.hod?.user?.firstName}
                />
                <AvatarFallback>
                  {departmentData?.department?.hod?.user?.firstName?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold">
                  {departmentData?.department?.hod?.user?.firstName} (HOD)
                </p>
                {/* <Badge variant="secondary" className="text-xs">
                {departmentData?.department?.hod?.hodOffice}
              </Badge> */}
              </div>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <Input className="max-w-sm" placeholder="Search Employee" />
      </div>

      {/* Cards Section */}
      {departmentData?.staff?.length === 0 ? (
        <p className="text-center text-gray-500">
          No employees found in this department.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <EmployeeCard staff={departmentData?.staff} />
        </div>
      )}
    </div>
  );
};

export default DepartmentDetails;
