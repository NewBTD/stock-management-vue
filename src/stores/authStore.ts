import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as { username: string } | null,
    returnUrl: '',
  }),
  actions: {
    login(username: string) {
      this.user = { username };
      // Here you can also store the user in localStorage or perform other actions
      localStorage.setItem('user', JSON.stringify(this.user));
    },
    logout() {
      this.user = null;
      // Clear localStorage or perform other logout actions
      localStorage.removeItem('user');
    },
    initialize() {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          this.user = JSON.parse(storedUser);
        }
    },
    log(){
        console.log(this.user)
        console.log(this.returnUrl)
    }
  },
});

