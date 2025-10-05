import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function EmployeeCard({ staff }) {
  return (
    <>
      {staff?.map((emp) => (
        <Card className="w-full max-w-md rounded-2xl shadow-md" key={emp._id}>
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarImage
                src="https://example.com/employee.jpg"
                alt="Employee"
              />
              <AvatarFallback>EM</AvatarFallback>
            </Avatar>

            <div>
              <h2 className="text-lg font-semibold">{emp?.user?.firstName}</h2>
            </div>
          </CardHeader>

          <CardContent className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Phone:</span> {emp?.phoneNumber}
            </p>
            <p>
              <span className="font-medium">Email:</span> {emp?.user?.email}
            </p>
            <p>
              <span className="font-medium">Employee ID:</span>{" "}
              {emp?.employeeId}
            </p>
            <p>
              <span className="font-medium">Role:</span> {emp?.user?.role}
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
