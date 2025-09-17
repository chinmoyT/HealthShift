// import React, { useEffect, useState } from "react";
// import navbarItems from "../configs/navigationConfig";
// import {
//   Sidebar,
//   SidebarProvider,
//   SidebarHeader,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuItem,
//   SidebarMenuButton,
// } from "@/components/ui/sidebar";
// import localStorageUtil from "../utils/localStorage";
// import { X, AlignJustify } from "lucide-react";

// const SideBar = () => {
//   const [allowedModules, setAllowedModules] = useState([]);
//   const [isCollapsed, setIsCollapsed] = useState(false); // Desktop collapse
//   const [isMobileOpen, setIsMobileOpen] = useState(false); // Mobile overlay

//   useEffect(() => {
//     const access = localStorageUtil.getDecryptedItem("access");

//     const filterAllowedModules = navbarItems?.filter(
//       (item) => access[item.Module]?.canView
//     );

//     setAllowedModules(filterAllowedModules);
//   }, []);

//   return (
//     <SidebarProvider>
//       <div className="flex min-h-screen">
//         <button
//           onClick={() => setIsMobileOpen(true)}
//           className="p-2 md:hidden fixed top-4 left-4 z-50 bg-white rounded-md shadow"
//         >
//           <AlignJustify size={20} />
//         </button>

//         <div
//           className={`
//             bg-white shadow-md transition-all duration-300
//             ${isCollapsed ? "w-14" : "w-64"} 
//             ${isMobileOpen ? "fixed top-0 left-0 h-full z-50" : "hidden md:block"}
//           `}
//         >
//           <Sidebar>
//             <div className={`flex items-center justify-between px-4 py-2 ${isCollapsed ? "w-14" : "w-64"}`}>
//               {!isCollapsed && <SidebarHeader />}
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setIsCollapsed(!isCollapsed)}
//                   className="hidden md:block"
//                 >
//                   {isCollapsed ? <AlignJustify size={18} /> : <X size={18} />}
//                 </button>

//                 <button
//                   onClick={() => setIsMobileOpen(false)}
//                   className="md:hidden"
//                 >
//                   <X size={20} className="text-gray-600 hover:text-black" />
//                 </button>
//               </div>
//             </div>

//             <SidebarContent>
//               <SidebarGroup>
//                 {!isCollapsed && (
//                   <SidebarGroupLabel>Navigation</SidebarGroupLabel>
//                 )}
//                 <SidebarGroupContent>
//                   <SidebarMenu>
//                     {allowedModules?.map((item) => (
//                       <SidebarMenuItem key={item.title}>
//                         <SidebarMenuButton asChild>
//                           <a
//                             href={item.url}
//                             className="flex items-center gap-3 justify-center md:justify-start"
//                           >
//                             <item.icon size={20} />
//                             {!isCollapsed && <span>{item.title}</span>}
//                           </a>
//                         </SidebarMenuButton>
//                       </SidebarMenuItem>
//                     ))}
//                   </SidebarMenu>
//                 </SidebarGroupContent>
//               </SidebarGroup>
//             </SidebarContent>
//           </Sidebar>
//         </div>
//       </div>
//     </SidebarProvider>
//   );
// };

// export default SideBar;
