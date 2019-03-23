<template>
  <div>
    <div class="ui two column centered grid">
      <div class="eight column centered row">
        <div class="six wide column">
          <h1 style="text-align:center;">Create Events Page</h1>
        </div>
      </div>
      <div class="row">
        <div class="ten wide column">
          <center>
            <div class="ui inverted large form">
              <div class="fields">
                <div class="inline field">
                  <label>Title</label>
                  <input
                    type="text"
                    v-model.trim="title"
                    name="title"
                    placeholder="Enter title here..."
                    required
                  >
                </div>
                <div class="inline field">
                  <label>Description</label>
                  <input
                    type="text"
                    v-model.trim="description"
                    name="description"
                    placeholder="Enter description here..."
                    required
                  >
                </div>
                <div class="inline field">
                  <label>Price</label>
                  <input
                    type="text"
                    v-model.trim="price"
                    name="price"
                    placeholder="Enter price here..."
                    required
                  >
                </div>
                <div class="inline field">
                  <label>Date</label>
                  <input
                    type="text"
                    v-model.trim="date"
                    name="date"
                    placeholder="Enter date here..."
                    required
                  >
                </div>
              </div>
            </div>
          </center>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <center>
            <button class="ui button green center" @click="createEvent()">Create Event</button>
          </center>
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
      title: "",
      description: "",
      price: "",
      date: ""
    };
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    }
  },
  methods: {
    createEvent() {
      if (
        this.title === "" &&
        this.description === "" &&
        this.price === "" &&
        this.date === ""
      )
        return;

      let requestBody = {
        query: `
          mutation{
            createEvent(eventInput:{title:"${this.title}",description:"${
          this.description
        }",price:${+this.price},date:"${new Date().toISOString()}"}){
              title
            }
          }
        `
      };

      let headers = { Authorization: "Bearer " + this.$store.getters.getToken };

      Api()
        .post(
          "/graphql",
          {
            query: requestBody.query
          },
          { headers }
        )
        .then(res => {
          console.log(res.data);
          this.$store.dispatch("setMsg", {
            isError: false,
            text: "Event Created"
          });
          this.$router.push('/events')
        })
        .catch(e => {
          console.log(e.response.data.errors["0"].message);
          this.$store.dispatch('setMsg',{
            isError: true,
            text: e.response.data.errors["0"].message
          })
        });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.isAuth) vm.$router.push("/");
    });
  }
};
</script>