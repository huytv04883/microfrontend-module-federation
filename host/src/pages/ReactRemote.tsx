import { loadRemoteModule } from "@/utils/loader";
import { ComponentType, lazy, Suspense } from "react";

const RemoteCount = lazy(() =>
  loadRemoteModule<{ default: ComponentType }>("remoteReact", "Counter").then(
    (m) => ({ default: m.default }),
  ),
);

export default function ReactRemotePage() {
  return (
    <Suspense fallback={<div>Loading React remote...</div>}>
      <div className="pt-2">
        <RemoteCount />
      </div>
    </Suspense>
  );
}
