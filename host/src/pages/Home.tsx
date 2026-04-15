import { loadRemoteModule } from "@/utils/loader";
import { UserButton } from "@clerk/react";
import { ComponentType, lazy, Suspense } from "react";

const RemoteCount = lazy(() =>
  loadRemoteModule<{ default: ComponentType }>("remoteReact", "Count").then(
    (m) => {
      console.log("mmmmmmmmmmmmmm", m);
      
      return {
        default: m.default,
      };
    },
  ),
);

export default function HomePage() {
  return (
    <>
      <UserButton />
      <Suspense fallback={<div>Loading remote...</div>}>
        <RemoteCount />
      </Suspense>
    </>
  );
}
