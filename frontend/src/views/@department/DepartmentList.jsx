import React, { useEffect, useState } from "react";
import DepartmentCard from "../../custom/DepartmentCard";
import { useDispatch, useSelector } from "react-redux";
import { getDepartments } from "../../redux/slices/department";
import Loader from "../../custom/@common/Loader";
import { Link } from "react-router-dom";

const DepartmentList = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const { loading } = useSelector((state) => state.dept);

  useEffect(() => {
    async function getDepartment() {
      const response = await dispatch(getDepartments());
      setData(response?.payload?.data);
    }
    getDepartment();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="space-y-6">
          <div className="flex items-center text-sm text-gray-500">
            <span className="font-medium text-gray-700">Home</span>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-semibold">Departments</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-800">Departments</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.map((dept) => (
              <Link key={dept.id} to={`/department/${dept._id}`}>
                <DepartmentCard
                  name={dept.name}
                  hodOffice={dept?.hodOffice}
                  hod={dept.hod?.user.firstName}
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;
