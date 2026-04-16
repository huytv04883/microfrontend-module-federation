import {
  init,
  loadRemote,
  registerRemotes,
} from "@module-federation/enhanced/runtime";

// Registry of all known remotes — source of truth, nothing is loaded from here upfront.
const REMOTES_REGISTRY: Record<string, string> = {
  remoteReact: "http://localhost:3001/react_remote_entry.js",
  remoteVue: "http://localhost:3002/vue_remote_entry.js",
};

// Track which remotes have already been registered to avoid duplicate calls.
const registeredRemotes = new Set<string>();

/**
 * Initialises the Module Federation runtime with no remotes.
 * Remotes are registered on-demand via loadRemoteModule().
 */
export const initFederation = (): void => {
  init({ name: "host", remotes: [] });
};

/**
 * Registers a remote (if not already registered) then loads the requested module.
 * Call this instead of loadRemote() directly so remotes are fetched only when needed.
 */
export const loadRemoteModule = async <T = unknown>(
  remoteName: string,
  exposedModule: string,
): Promise<T> => {
  if (!registeredRemotes.has(remoteName)) {
    const entry = REMOTES_REGISTRY[remoteName];
    if (!entry) throw new Error(`Unknown remote: "${remoteName}"`);
    registerRemotes([{ name: remoteName, entry }]);
    registeredRemotes.add(remoteName);
  }
  const mod = await loadRemote<T>(`${remoteName}/${exposedModule}`);
  if (!mod) throw new Error(`Failed to load "${remoteName}/${exposedModule}"`);
  return mod;
};

export { loadRemote };
