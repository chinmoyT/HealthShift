export const UserModel = {
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
    isActive: false,
    createdAt: ""
}

export const StaffProfileModel = {
    user: UserModel,
    employeeId: "",
    department: "",
    speciality: "",
    availability: "",
    isManager: false,
    gender: "",
    role: ""
}

export const departmentModel = {
    id: "",
    name: "",
    description: "",
    Manager: UserModel
}

export const ShiftModel = {
    staff: StaffProfileModel,
    department: departmentModel,
    startTime: "",
    endTime: "",
    status: "",
    notes: ""
}