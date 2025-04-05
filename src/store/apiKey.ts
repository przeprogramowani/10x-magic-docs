import { create } from "zustand";

interface ApiKeyState {
  apiKey: string;
  setApiKey: (key: string) => void;
}

export const useApiKeyStore = create<ApiKeyState>()((set) => ({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY || "",
  setApiKey: (key: string) => set({ apiKey: key }),
}));
