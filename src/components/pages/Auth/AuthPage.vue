<template>
  <div>
    <div class="ui two stackable column centered grid">
      <div class="eight column centered row">
        <div class="column">
          <h1>Auth Page</h1>
        </div>
      </div>
      <div class="eight column centered row">
        <div class="four wide column">
          <div class="ui inverted form">
            <div class="field">
              <label>Email</label>
              <input
                type="email"
                v-model.trim="email"
                name="email"
                placeholder="Enter your email"
                required
              >
            </div>
            <div class="field">
              <label>Password</label>
              <input
                type="password"
                v-model.trim="password"
                name="password"
                placeholder="Enter your password"
                required
              >
            </div>
          </div>
        </div>
        <div class="row">
          <div class="column">
            <div class="ui hidden divider"></div>
            <button v-if="isSignup" class="ui button green center" @click="signup()">Sign Up</button>
            <button v-else class="ui button green center" @click="login()">Log In</button>
            <div class="ui hidden divider"></div>
            <button
              v-if="isSignup"
              class="ui basic button"
              @click="toggleSignup()"
            >Already have a account?</button>
            <button v-else class="ui basic button" @click="toggleSignup()">Don't have a account?</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "./../../../services/Api.js";

export default {
  data() {
    return {
      email: "",
      password: "",
      isSignup: false
    };
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    }
  },
  methods: {
    signup(event) {
      if (this.email === "" && this.password === "") return;

      let requestBody = {
        query: `
          mutation{
            createUser(userInput: {email:"${this.email}",password:"${
          this.password
        }"}){
              userId
              token
              tokenExpiration
            }
          }
        `
      };

      Api()
        .post("/graphql", {
          query: requestBody.query
        })
        .then(res => {
          console.log(res.data);
          let token = res.data.data.createUser.token;
          let userId = res.data.data.createUser.userId;
          this.$store.dispatch("setUser", { token, userId });
          this.$store.dispatch("setMsg", { text: "Signed up", isError: false });
          this.$router.push("/events");
        })
        .catch(e => {
          if (e.response.data.errors["0"].message.includes("duplicate")) {
            this.$store.dispatch("setMsg", {
              text:"Email taken",
              isError: true
            });
            this.$store.dispatch('resetMsg')
          }
        });
    },
    login() {
      if (this.email === "" && this.password === "") return;

      let requestBody = {
        query: `
          query{
            login(email: "${this.email}",password: "${this.password}"){
              userId
              token
              tokenExpiration
            }
          }
        `
      };

      Api()
        .post("/graphql", {
          query: requestBody.query
        })
        .then(res => {
          console.log(res);
          let token = res.data.data.login.token;
          let userId = res.data.data.login.userId;
          this.$store.dispatch("setUser", { token, userId });
          this.$store.dispatch("setMsg", { text: "Logged in", isError: false });
          this.$router.push("/events");
        })
        .catch(e => console.log(e.response.data.errors["0"].message));
    },
    toggleSignup() {
      if (this.isSignup === true) this.isSignup = false;
      else this.isSignup = true;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.isAuth) vm.$router.push("/events");
      console.log(vm.$store.getters.isAuth);
      if (!vm.$store.getters.isAuth) vm.$router.push("/");
      else vm.$router.push("/events");
    });
  }
};
</script>