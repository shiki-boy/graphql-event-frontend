<template>
  <div class="ui secondary pointing huge inverted red menu">
    <div class="header item">Events GraphQL</div>
    <!-- <router-link class="item" to="/" exact>Authenticate</router-link> -->
    <router-link to="/" v-if="!isAuth" class="ui item">Login</router-link>
    <template v-else>
      <router-link class="item" to="/events" exact>Events</router-link>
      <router-link class="item" :to="/bookings/+userId" exact>My Bookings</router-link>
    </template>
    <div class="right menu">
      <a v-if="isAuth" @click="logout()" class="ui item">Logout</a>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    },
    userId(){
      return this.$store.getters.currentUser
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logoutUser");
      this.$store.dispatch("setMsg",{text:"Logged out",isError:false})
      this.$router.push('/')
    }
  }
};
</script>