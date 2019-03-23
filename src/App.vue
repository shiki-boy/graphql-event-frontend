<template>
  <div>
    <app-header></app-header>
    <div class="ui grid container" id="msg">
      <div class="four wide column">
        <transition name="fade">
          <div
            v-show="msg.text !== null"
            :class="[msg.isError ? errorClass : noerrorClass ]"
            id="msg"
          >
            <i class="warning icon"></i>
            {{msg.text}}
          </div>
        </transition>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  data() {
    return {
      errorClass: "ui segment inverted red",
      noerrorClass: "ui segment inverted green"
    };
  },
  computed: {
    msg() {
      return this.$store.getters.msg;
    }
  },
  components: {
    appHeader: Navbar
  },
  beforeCreate() {
    var status = this.$store.dispatch("tryAutoLogin");
    status.then(d => {
      if (d === "200") this.$router.push("/events");
    });
  }
};
</script>

<style>
body.pushable>.pusher{
  background: #666;
}
.fade-enter-active {
  transition: all 1s ease;
}
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter {
  opacity: 0;
}
.fade-leave-to {
  opacity: 0;
}

#msg {
  width: 60%;
}

body {
  background: #666;
  color: white;
}
input {
  caret-color: red;
}
</style>
