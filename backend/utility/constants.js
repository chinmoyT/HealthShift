const USER_ROLES = {
    ADMIN: "ADMIN",
    MANAGER: "MANAGER",
    STAFF: "STAFF",
} 

const STATUS = ["SCHEDULED", "OPEN", "CLAIMED", "APPROVED", "SICK_LEAVE"]

const MODULES = {
    LEAVES_MANAGEMENT: "Leaves_Management",
    DEPARTMENT: "Department",
    STAFF_MANAGEMENT: "Staff_Management",
    USER_MANAGEMENT: "User_Management",
    ANALYTICS: "Analytics",
}


module.exports = { USER_ROLES, 
        STATUS, 
        MODULES
}