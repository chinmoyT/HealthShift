import React, { useEffect, useState } from "react";
import DepartmentCard from "../DepartmentCard";
import { useDispatch } from "react-redux";
import { getDepartments } from "../../redux/slices/department";

const DepartmentList = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState();

  useEffect(() => {
    async function getDepartment() {
      const response = await dispatch(getDepartments());
      console.log("dept", response.payload.data);
      setData(response?.payload?.data);
    }
    getDepartment();
  }, []);

  console.log('departments',data?.map((d)=> d))
  return (
    <div className="flex flex-wrap gap-6">
      {data?.map((dept) => (
          <DepartmentCard name={dept.name} hodOffice={dept?.hodOffice} hod={dept.hod?.user.firstName} />
      ))}
    </div>
  );
};

export default DepartmentList;
