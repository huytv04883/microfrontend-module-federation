import { Show, UserButton } from "@clerk/react";

export default function HomePage() {
  return (
    <Show when="signed-in">
      <UserButton />
    </Show>
  );
}
