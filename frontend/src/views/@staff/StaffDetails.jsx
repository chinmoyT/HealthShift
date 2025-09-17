import React from "react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { DEPARTMENTS, GENDER, ROLE } from "../../utils/common";

const StaffDetails = ({
  open,
  staff,
  onClose,
  updateStaffDetails,
  onSubmit,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md sm:max-w-lg bg-white rounded-lg shadow-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-900 mb-6">
            Staff Details
          </DialogTitle>
          <DialogClose className="absolute top-4 right-4 rounded-full p-1 hover:bg-gray-200 transition-colors">
          </DialogClose>
        </DialogHeader>

        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="flex gap-4">
            <div className="flex flex-col flex-1 gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                defaultValue={staff?.user?.firstName}
                disabled
                onChange={(e) =>
                  updateStaffDetails("user.firstName", e.target.value)
                }
              />
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                defaultValue={staff?.user?.lastName}
                disabled
                onChange={(e) =>
                  updateStaffDetails("user.lastName", e.target.value)
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="text"
              defaultValue={staff?.user?.email ?? ""}
              disabled
              // className="bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="number"
              defaultValue={staff?.phoneNumber ?? ""}
              onChange={(e) =>
                updateStaffDetails("phoneNumber", e.target.value)
              }
              // className="bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div className="flex gap-2">
            <div className="flex flex-1 flex-col gap-2">
              <Label htmlFor="department">Department</Label>
              <Select
                value={staff?.department}
                onValueChange={(value) =>
                  updateStaffDetails("department", value)
                }
              >
                <SelectTrigger className="w-[210px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS?.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-1 flex-col gap-2">
            <Label htmlFor="speciality">Role</Label>
            <Select
                value={staff?.role}
                onValueChange={(value) =>
                  updateStaffDetails("role", value)
                }
              >
                <SelectTrigger className="w-[210px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ROLE?.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>      
          </div>

          <div className="flex gap-2">
                  <div className="flex flex-1 flex-col gap-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={staff?.gender}
                onValueChange={(value) => updateStaffDetails("gender", value)}
              >
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  {GENDER?.map((g) => (
                    <SelectItem key={g.id} value={g.id}>
                      {g.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-1 items-center gap-1">
                  <Checkbox id='manager'
                  checked={staff?.isManager}
                  onCheckedChange={(value)=> {
                    updateStaffDetails('isManager', value)
                    }} />
                  <Label htmlFor="manager">Is Manager</Label>
            </div>
          </div>
          

          

          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StaffDetails;
