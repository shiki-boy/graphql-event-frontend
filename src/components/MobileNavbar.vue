<template>
  <div class="ui sidebar top vertical menu">
    <router-link to="/" v-if="!isAuth" class="ui item">Login</router-link>
    <template v-else>
      <router-link class="item" to="/events" exact>Events</router-link>
      <router-link class="item" :to="/bookings/+userId" exact>My Bookings</router-link>
      <a v-if="isAuth" @click="logout()" class="ui item">Logout</a>
    </template>
  </div>
</template>

<script>
// import jQuery from 'jquery'
export default {
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    },
    userId() {
      return this.$store.getters.currentUser;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logoutUser");
      this.$store.dispatch("setMsg", { text: "Logged out", isError: false });
      this.$router.push("/");
    }
  }
};
</script>