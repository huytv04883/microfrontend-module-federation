import { SignIn } from "@clerk/react";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
}
