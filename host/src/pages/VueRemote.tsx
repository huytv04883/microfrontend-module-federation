import { loadRemoteModule } from "@/utils/loader";
import { VueWrapper } from "@/components";
import { useState, useEffect } from "react";
import type { DefineComponent } from "vue";

export default function VueRemotePage() {
  const [Counter, setCount] = useState<DefineComponent<any, any, any> | null>(null);

  useEffect(() => {
    loadRemoteModule<{ default: DefineComponent<any, any, any> }>("remoteVue", "Counter").then(
      (m) => setCount(() => m.default),
    );
  }, []);

  return (
    <div className="pt-2">
      {Counter ? (
        <VueWrapper component={Counter} />
      ) : (
        <div>Loading Vue remote...</div>
      )}
    </div>
  );
}
