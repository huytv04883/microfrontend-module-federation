declare module 'remoteReact/Count' {
  import { ComponentType } from 'react';
  const Count: ComponentType;
  export default Count;
}

declare module 'remoteVue/Counter' {
  import { DefineComponent } from 'vue';
  const Counter: DefineComponent;
  export default Counter;
}
