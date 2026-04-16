# Module Federation Demo
## React Host + React Remote + Vue Remote

A microfrontend demo using **Webpack Module Federation** to compose a React shell with independently deployed React and Vue 3 remotes — all sharing singletons and running simultaneously.

---

### Project Structure

```
microfrontend-module-federation/
├── host/           # React shell app (TypeScript)   → http://localhost:3000
├── remote-react/   # React remote app (TypeScript)  → http://localhost:3001
└── remote-vue/     # Vue 3 remote app (TypeScript)  → http://localhost:3002
```

---

### Quick Start

```bash
# 1. Install dependencies for all three apps
npm run install:all

# 2. Install root-level dependencies (concurrently)
npm install

# 3. Start all apps simultaneously
npm start
```

Or run each app in a separate terminal:

```bash
cd remote-react && npm i && npm start
cd remote-vue   && npm i && npm start
cd host         && npm i && npm start
```

Available root scripts:

| Script              | Description                              |
|---------------------|------------------------------------------|
| `npm run install:all` | Install deps for all three sub-apps    |
| `npm start`         | Run all three apps concurrently          |
| `npm run build`     | Build all three apps in sequence         |

---

### Ports

| App          | Port |
|--------------|------|
| Host         | 3000 |
| Remote React | 3001 |
| Remote Vue   | 3002 |

---

### Module Federation Config

#### Host (`host/webpack.config.js`)
Consumes both remotes and declares shared singletons:

```js
remotes: {
  remoteReact: "remoteReact@http://localhost:3001/remoteEntry.js",
  remoteVue:   "remoteVue@http://localhost:3002/remoteEntry.js",
},
shared: {
  react:              { singleton: true, requiredVersion: "^18" },
  "react-dom":        { singleton: true, requiredVersion: "^18" },
  vue:                { singleton: true, requiredVersion: "^3" },
  "@clerk/clerk-react": { singleton: true, requiredVersion: "^6" },
}
```

#### Remote React (`remote-react/webpack.config.js`)
Exposes one component:

```js
exposes: {
  "./Counter": "./src/components/Count.tsx",
}
```

#### Remote Vue (`remote-vue/webpack.config.js`)
Exposes one Vue SFC, processed with `vue-loader`:

```js
exposes: {
  "./Counter": "./src/components/Counter.vue",
}
```

---

### Key Files

| File | Purpose |
|------|---------|
| [host/src/VueWrapper.tsx](host/src/VueWrapper.tsx) | Mounts a federated Vue component inside the React tree using `createApp` |
| [host/src/App.tsx](host/src/App.tsx) | Shell app — lazy-loads both remote components |
| [host/webpack.config.js](host/webpack.config.js) | Host federation config — remotes + shared scope |
| [remote-react/webpack.config.js](remote-react/webpack.config.js) | React remote federation config — exposes `HelloReact` |
| [remote-vue/webpack.config.js](remote-vue/webpack.config.js) | Vue remote federation config — exposes `Counter` via `vue-loader` |

---

### How `VueWrapper` Works

`VueWrapper` ([host/src/VueWrapper.tsx](host/src/VueWrapper.tsx)) bridges the framework boundary:

1. Accepts a `componentLoader` — an async function returning any federated Vue component.
2. Uses `Promise.all` to load the component and `vue` in parallel.
3. Calls `createApp(VueComponent, vueProps).mount(containerRef)` inside a `useEffect`.
4. Cleans up by calling `app.unmount()` on React unmount, preventing memory leaks.

```tsx
<VueWrapper
  componentLoader={() => import("remoteVue/Counter")}
  vueProps={{ message: "Hello from React!" }}
/>
```

---

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Build | Webpack 5 + Module Federation |
| Shell | React 18, TypeScript |
| Remote A | React 18, TypeScript |
| Remote B | Vue 3, TypeScript, `vue-loader` |
| Auth | `@clerk/clerk-react` (shared singleton) |
| Dev runner | `concurrently` |
