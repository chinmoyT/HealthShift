import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerFooter,
} from "@/components/ui/Drawer";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ROLE_OPTIONS } from "../../utils/common";
import { useSelector } from "react-redux";
import { UserModel } from "../../utils/Models";
import { Checkbox } from "@/components/ui/checkbox";
import { addUser, getUserList, updateUser } from "../../redux/slices/user";
import { useDispatch } from "react-redux";

const UserSidePanel = ({ open, setOpen, isAddUser, setDrawerClose }) => {
  const { userById } = useSelector((state) => state.user);
  const [userDetails, setUserDetails] = useState(UserModel);
  const dispatch = useDispatch();

  useEffect(()=> {
    if(userById && !isAddUser) {
      setUserDetails(userById);
    } else {
      setUserDetails(UserModel);
    }
  }, [userById, isAddUser]);

  const handleOnChange = (key, value) => {
    setUserDetails((prev)=> ({
      ...prev,
      [key]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (isAddUser) {
      await dispatch(addUser(userDetails));
      setDrawerClose(false);
      await dispatch(getUserList());
    } else {
      await dispatch(updateUser(userDetails));
      setDrawerClose(false);
      await dispatch(getUserList());
    }
  };
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="p-6 h-screen">
        <div className="flex justify-center w-full h-full">
          <Card className="w-full max-w-md h-full overflow-y-auto">
            <CardHeader className="text-center">
              <CardTitle>{isAddUser ? "Add User" : "Edit User"}</CardTitle>
            </CardHeader>

            <CardContent>
              <form className="space-y-4" onSubmit={handleOnSubmit}>
                <div className="flex space-x-2">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="Enter first name"
                      defaultValue={userById?.firstName}
                      onChange={(e) =>
                        handleOnChange("firstName", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Enter last name"
                      defaultValue={userById?.lastName}
                      onChange={(e) =>
                        handleOnChange("lastName", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    defaultValue={userById?.email}
                    onChange={(e) => handleOnChange("email", e.target.value)}
                  />
                </div>

                {isAddUser && (
                  <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    defaultValue={userById?.password}
                    onChange={(e) => handleOnChange("password", e.target.value)}
                  />
                </div>
                )}

                <div className="flex items-center gap-1">
                  <div className="flex-1 space-y-2 min-w-[250px]">
                    <Label htmlFor="role">Role</Label>
                    <Select 
                    value={userById?.role}
                    onValueChange={(value) => handleOnChange("role", value)} >
                      <SelectTrigger id="role" className="w-full">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {ROLE_OPTIONS.map((role) => (
                          <SelectItem
                            key={role.value}
                            value={role.value}
                          >
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2 mt-8">
                    <Checkbox
                      id="isActive"
                      checked={userDetails?.isActive}
                      onCheckedChange={(checked) =>
                        handleOnChange("isActive", checked)
                      }
                    />
                    <Label htmlFor="isActive" className="cursor-pointer">
                      Activate User
                    </Label>
                  </div>
                </div>

                <DrawerFooter className="pt-6 flex gap-2">
                  <Button
                    type="submit"
                    className="bg-foreground text-white w-full"
                  >
                    {isAddUser ? "Save" : "Update"}
                  </Button>
                  <DrawerClose asChild>
                    <Button variant="outline" className="w-full">
                      Cancel
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </form>
            </CardContent>
          </Card>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default UserSidePanel;
