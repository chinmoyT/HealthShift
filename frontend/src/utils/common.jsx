export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

export const ROLE_OPTIONS = [
  { value: "STAFF", label: "Staff" },
  { value: "MANAGER", label: "Manager" },
];

export const DEPARTMENTS = [
  { value: 'Cardiology', id: 'CARDIOLOGY' },
  { value: 'Neurology', id: 'NEUROLOGY' },
  { value: 'Orthopedics', id: 'ORTHOPEDICS' },
  { value: 'Radiology', id: 'RADIOLOGY' },
  { value: 'Emergency', id: 'EMERGENCY' },
  { value: 'Pediatrics', id: 'PEDIATRICS' },
  { value: 'Oncology', id: 'ONCOLOGY' },
  { value: 'Gynecology', id: 'GYNECOLOGY' },
  { value: 'Urology', id: 'UROLOGY' },
  { value: 'Dermatology', id: 'DERMATOLOGY' },
  { value: 'Ophthalmology', id: 'OPHTHALMOLOGY' },
  { value: 'Ent', id: 'ENT' },
  { value: 'Anesthesiology', id: 'ANESTHESIOLOGY' },
  { value: 'Pathology', id: 'PATHOLOGY' },
  { value: 'Psychiatry', id: 'PSYCHIATRY' }
]

export const GENDER = [
  {id: 'MALE', value: "Male"},
  {id: 'FEMALE', value: "Female"}
]

export const ROLE = [
  { id: 'HEAD_OF_DEPARTMENT', value: 'Head Of Department' },
  { id: 'ATTENDING_PHYSICIAN', value: 'Attending Physician' },
  { id: 'RESIDENT', value: 'Resident' },
  { id: 'INTERN', value: 'Intern' },
  { id: 'SPECIALIST_DOCTOR', value: 'Specialist Doctor' },
  { id: 'NURSE', value: 'Nurse' },
  { id: 'PHYSICIAN_ASSISTANT', value: 'Physician Assistant' },
  { id: 'LABORATORY_TECHNICIAN', value: 'Laboratory Technician' },
  { id: 'PHARMACIST', value: 'Pharmacist' },
  { id: 'RADIOLOGIST', value: 'Radiologist' },
  { id: 'ANESTHESIOLOGIST', value: 'Anesthesiologist' },
  { id: 'SURGEON', value: 'Surgeon' },
  { id: 'HOSPITAL_ADMINISTRATOR', value: 'Hospital Administrator' },
  { id: 'RECEPTIONIST', value: 'Receptionist' },
  { id: 'SUPPORT_STAFF', value: 'Support Staff' }
]