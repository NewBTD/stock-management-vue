import { defineStore } from "pinia";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "vue-router";



export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
    user: null as {
      firstname: string;
      lastname: string;
      email: string;
      id: string;
      image: string;
      username: string;
    } | null,
  }),
  persist: true,
  actions: {
    async login(username: string, password: string) {
      const headers = {
        "Content-Type": "application/json",
      };
      const body = JSON.stringify({ username, password });
      try {
        const response: AxiosResponse = await axios.post(
          "https://dummyjson.com/auth/login",
          body,
          { headers }
        );
        if (response.status !== 200) throw new Error("Login failed");

        const data = await response.data;
        // console.log("data", data);
        this.token = data.accessToken;
        const { firstName, lastName, email, id, image, username } = data;
        this.user = {
          firstname: firstName,
          lastname: lastName,
          email: email,
          id: id,
          image: image,
          username: username,
        }; // Assuming user data is returned
        console.log(this.token);
        console.log(this.user);
        return { success: true };
      } catch (error) {
        console.error("Login error:", error);
        return { success: false };
      }
    },
    logout() {
      this.token = null;
      this.user = null;
    },
    async fetchUserInfo() {
      if (!this.token) return;
      try {
        const response = await axios.get("https://dummyjson.com/auth/me", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        if (response.status !== 200)
          throw new Error("Failed to fetch user info");
        const data = await response.data;
        const { firstName, lastName, email, id, image, username } = data;
        this.user = {
          firstname: firstName,
          lastname: lastName,
          email: email,
          id: id,
          image: image,
          username: username,
        };
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    },
  },
});
