import { useEffect, useRef } from "react";
import type { DefineComponent } from "vue";
import { App, createApp, defineComponent, h } from "vue";

interface VueWrapperProps {
  component: DefineComponent<any, any, any>;
  vueProps?: Record<string, unknown>;
}

export default function VueWrapper({ component, vueProps = {} }: VueWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<App | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const wrapper = defineComponent({
      render() {
        return h(component, vueProps);
      },
    });

    appRef.current = createApp(wrapper);
    appRef.current.mount(containerRef.current);

    return () => {
      appRef.current?.unmount();
      appRef.current = null;
    };
  }, [component, JSON.stringify(vueProps)]);

  return <div ref={containerRef} />;
}
