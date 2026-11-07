import { create } from 'zustand';

export const useStore = create((set) => ({
  theme: 'light',
  items: [],
  loading: true,
  
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'light' ? 'dark' : 'light' 
  })),

  fetchProducts: async () => {
    setTimeout(() => {
      set({
        items: [
          { id: 1, name: 'MacBook Pro' },
          { id: 2, name: 'iPhone 16' },
          { id: 3, name: 'AirPods' }
        ],
        loading: false
      });
    }, 1000);
  }
}));