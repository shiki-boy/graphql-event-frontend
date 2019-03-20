<template>
  <div>
    <div class="ui two column centered grid">
      <div class="eight column centered row">
        <div class="six wide column">
          <h1 style="text-align:center;">Events Page</h1>
        </div>
      </div>
      <div class="eight column centered row">
        <div class="four wide column">
          <center>
            <router-link to="/events/create" class="ui blue button">Create Event</router-link>
          </center>
        </div>
        <div class="row">
          <div class="column"></div>
        </div>
      </div>
    </div>
    <div class="ui hidden divider"></div>
    <h4 class="ui container horizontal inverted divider header">
      <i class="calendar check icon"></i>
      Events
    </h4>
    <div class="ui hidden divider"></div>
    <div class="ui three column grid container">
      <template v-if="isLoading">
        <div class="ui active centered inline inverted loader"></div>
      </template>
      <event-component
        v-on:view-event="viewEventModal"
        v-else
        v-for="(event, index) in Events"
        :key="index"
        :index="index"
        :event="event"
      ></event-component>
    </div>
    <view-event-modal :viewEvent="viewEvent"></view-event-modal>
  </div>
</template>

<script>
import Api from "./../../../services/Api.js";
import Event from "./Event.vue";
import ViewEvent from "./ViewEvent.vue";

export default {
  data() {
    return {
      Events: [
        {
          _id: "uetfb89eyf8",
          title: "Title",
          description: "This is a description.",
          price: 12.09,
          date: "13/11/32",
          creator: { _id: "someone", email: "user@ta.com" }
        }
      ],
      viewEvent: {
        _id: "uetfb89eyf8",
        title: "Title",
        description: "This is a description.",
        price: 12.09,
        date: "13/11/32",
        creator: { _id: "someone", email: "user@ta.com" }
      }
    };
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    }
  },
  methods: {
    viewEventModal(pos) {
      this.viewEvent = this.Events[pos];
    }
  },
  mounted() {
    let requestBody = {
      query: `
          query{
            events{
              _id
              title
              description
              price
              date
              creator{
                _id
                email
              }
            }
          }
        `
    };

    Api()
      .post("/graphql", {
        query: requestBody.query
      })
      .then(res => {
        // console.log(res.data);
        this.$store.dispatch("loadingComplete");
        this.Events = res.data.data.events;
      })
      .catch(e => console.log(e.response.data.errors["0"].message));
  },
  components: {
    eventComponent: Event,
    viewEventModal: ViewEvent
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.isAuth) vm.$router.push("/");
    });
  }
};
</script>
