import './styles/style.css';
import { initFederation } from './utils/loader';

// Initialise the Module Federation runtime (registers remote URLs dynamically)
// before the app bootstraps so that any loadRemote() call in the tree is safe.
initFederation();
import('./main');
