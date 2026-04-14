import { Show, SignInButton, SignUpButton } from "@clerk/react";

export default function LoginPage() {
  return (
    <>
      <Show when="signed-out">
        <SignInButton />
        <SignUpButton />
      </Show>
    </>
  );
}
