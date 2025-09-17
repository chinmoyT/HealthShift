import {Clock4, Home, CalendarDays, UserRoundCheck, Users, ChartArea} from "lucide-react";

const navbarItems = [
  {
    title: "Leave Management",
    Module: "Leaves_Management",
    url: "/home",
    icon: CalendarDays
  },
  {
    title: "Department",
    Module: "Department",
    url: "/department",
    icon: Clock4
  },
  {
    title: "Staff Management",
    Module: "Staff_Management",
    url: "/staff",
    icon: UserRoundCheck
  },
  {
    title: "User Management",
    Module: "User_Management",
    url: "/um",
    icon: Users
  },
  {
    title: "Analytics",
    Module: "Analytics",
    url: "/analytics",
    icon: ChartArea
  },
];

export default navbarItems;