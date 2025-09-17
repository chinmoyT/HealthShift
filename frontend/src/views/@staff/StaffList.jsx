import React, { useCallback, useEffect, useState } from "react";
import ProfileCard from "../../custom/ProfileCard";
import { useDispatch } from "react-redux";
import { getStaffProfileList, updateStaff } from "../../redux/slices/user";
import { Link } from "react-router-dom";
import StaffDetails from "./StaffDetails";

const StaffList = () => {
  const [staffs, setStaffs] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const dispatch = useDispatch();

  const getStaffList = useCallback(async () => {
    const response = await dispatch(getStaffProfileList());
    if (response?.payload?.status) {
      setStaffs(response.payload?.data);
    }
  }, [dispatch]);

  useEffect(() => {
    getStaffList();
  }, [getStaffList]);

  const updateStaffDetails = (key, value) => {
    switch (key) {
      case "user.firstName":
        setSelectedStaff((prev) => ({
          ...prev,
          user: {
            ...prev.user,
            firstName: value,
          },
        }));
        break;
      case "user.lastName":
        setSelectedStaff((prev) => ({
          ...prev,
          user: {
            ...prev.user,
            lastName: value,
          },
        }));
        break;

      default:
        setSelectedStaff((prev) => ({
          ...prev,
          [key]: value,
        }));
        break;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(updateStaff(selectedStaff));
    if(res?.payload?.status) {
      await getStaffList();
    }
    setDialogOpen(false);
    await dispatch(getStaffProfileList());
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {staffs?.map((staff) => (
          <div
            key={staff._id}
            onClick={() => {
              setDialogOpen(true);
              setSelectedStaff(staff);
            }}
            className="w-full"
          >
            <ProfileCard
              firstName={staff?.user?.firstName}
              lastName={staff?.user?.lastName}
              email={staff?.user?.email}
              phoneNumber={staff?.phoneNumber}
              department={staff?.department}
              role={staff?.role}
              lastUpdated={staff?.updatedAt}
            />
          </div>
        ))}
      </div>
      <StaffDetails
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        staff={selectedStaff}
        updateStaffDetails={updateStaffDetails}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default StaffList;
