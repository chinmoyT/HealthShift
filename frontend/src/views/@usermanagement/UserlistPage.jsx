import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getUserList, getUserById, clearUserById, deactivateUser } from "../../redux/slices/user";
import Spinner from "../../custom/@common/Spinner";
import { Trash, SquarePen } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import UserSidePanel from "./UserSidePanel";
import Loader from "../../custom/@common/Loader";

const UserlistPage = () => {
  const dispatch = useDispatch();
  const { users, loading, } = useSelector((state) => state.user);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isAddUser, setIsAddUser] = useState(false);

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  const handleAddUser = ()=> {
    dispatch(clearUserById());
    setIsAddUser(true);
    setDrawerOpen(true)
  }

  const handleEditUser = async (user) => {
    setIsAddUser(false);
    await dispatch(getUserById(user._id ));
    setDrawerOpen(true);
  };

  const handleDeactivateListener = async (user)=> {
    await dispatch(deactivateUser(user._id));
    dispatch(getUserList());
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">User List</h2>
        <Button

          className="bg-primary hover:bg-neutral-800 px-4 py-2 rounded"
          onClick={handleAddUser}
        >
          + Add User
        </Button>
        <UserSidePanel
          open={drawerOpen}
          setOpen={setDrawerOpen}
          isAddUser={isAddUser}
          setDrawerClose={setDrawerOpen}
        />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <div className="flex">
                    {user?.role !== 'ADMIN' && (
                      <Tooltip>
                      <TooltipTrigger asChild>
                        <Trash className="cursor-pointer" onClick={() => handleDeactivateListener(user)} size={16} />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Remove User</p>
                      </TooltipContent>
                    </Tooltip>
                    )}

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SquarePen
                          className="cursor-pointer"
                          size={16}
                          onClick={() => handleEditUser(user)}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit User</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default UserlistPage;
