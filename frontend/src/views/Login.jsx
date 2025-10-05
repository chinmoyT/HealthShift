import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, userAccess } from "../redux/slices/auth";
import localStorageUtils from "../utils/localStorage";
import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle } from "@/components/ui/alert";

const Login = (props) => {
  const { isAdmin } = props;
  // const { user, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await dispatch(loginUser({ email, password }));
    if (response?.payload?.jsonData) {
      await localStorageUtils.setEncryptedItem("token", response?.payload?.jsonData);
      localStorageUtils.setEncryptedItem("user", response.payload.data);
      const storedToken = localStorageUtils.getDecryptedItem("token")
      if(storedToken) {
        const userRole = response?.payload?.data?.role
        const accessResponse = await dispatch(userAccess({role: userRole}));
        localStorageUtils.setEncryptedItem("access",accessResponse?.payload?.data);
      }
      navigate("/");


    } else {
      return (
        <>
          <Alert>
            <AlertTitle>{response?.payload?.errorMessage}</AlertTitle>
          </Alert>
        </>
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center mb-2">
            Login to your account
          </CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          {isAdmin && (
            <CardAction>
              <Button variant="link">Sign Up</Button>
            </CardAction>
          )}
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" onClick={handleLogin}>
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
