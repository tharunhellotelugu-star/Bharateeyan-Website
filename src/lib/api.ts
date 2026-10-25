// Where the AI endpoints live. Empty means same origin (AI Studio, local dev, Vercel);
// the GitHub Pages build sets VITE_API_BASE to the Vercel deployment.
const API_BASE = (import.meta.env.VITE_API_BASE ?? '').replace(/\/$/, '');

export const apiUrl = (path: string) => API_BASE + path;
