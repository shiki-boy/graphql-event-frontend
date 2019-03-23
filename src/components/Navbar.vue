<template>
  <div class="ui secondary pointing huge inverted red fixed menu">
    <mobile-navbar v-if="width<500"></mobile-navbar>
    <button class="ui icon basic button" v-if="width<500" @click="showMenu()">
      <i class="cloud icon"></i>
    </button>
    <div class="header item">Events GraphQL</div>
    <template v-if="width>500">
      <router-link to="/" v-if="!isAuth" class="ui item">Login</router-link>
      <template v-else>
        <router-link class="item" to="/events" exact>Events</router-link>
        <router-link class="item" :to="/bookings/+userId" exact>My Bookings</router-link>
      </template>
      <div class="right menu" id="right-menu">
        <a v-if="isAuth" @click="logout()" class="ui item">Logout</a>
      </div>
    </template>
  </div>
</template>

<script>
import MobileNavbar from "./MobileNavbar.vue";

export default {
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    },
    userId() {
      return this.$store.getters.currentUser;
    },
    width() {
      return window.innerWidth;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logoutUser");
      this.$store.dispatch("setMsg", { text: "Logged out", isError: false });
      this.$router.push("/");
    },
    showMenu(){
      $(".ui.sidebar")
      .sidebar({silent:true,mobileTransition:'scale down'})
      .sidebar('toggle')
    }  
  },
  components: {
    mobileNavbar: MobileNavbar
  }
};
</script>

<style scoped>
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  #right-menu {
    display: none;
  }
}
</style>
