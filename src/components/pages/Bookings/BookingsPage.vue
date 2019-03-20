<template>
  <div>
    <div class="ui two column centered grid">
      <div class="eight column centered row">
        <div class="six wide column">
          <h1 style="text-align:center;">Bookings Page</h1>
        </div>
      </div>
    </div>
    <div class="ui hidden divider"></div>
    <h4 class="ui container horizontal inverted divider header">
      <i class="calendar tags icon"></i>
      Bookings
    </h4>
    <div class="ui three column grid container">
      <template v-if="isLoading">
        <div class="ui active centered inline inverted loader"></div>
      </template>
      <booking-component v-else v-for="(booking, index) in Bookings" :key="index" :booking="booking"></booking-component>
    </div>
  </div>
</template>

<script>
import Api from "./../../../services/Api.js";
import Booking from "./Booking.vue";

export default {
  data() {
    return {
      Bookings: [
        {
          event: {
            title: "this is a test",
            description: "from frontend",
            date: "1552152045650",
            creator: {
              email: "test@test.com"
            }
          }
        }
      ]
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    }
  },
  components: {
    bookingComponent: Booking
  },
  mounted() {
    const userId = this.$route.params.id;
    let requestBody = {
      query: `
        query{
          bookings(userId:"${userId}"){
            _id
            event{
              title
              description
              date
              creator{
                email
              }
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
        this.Bookings = res.data.data.bookings
        this.$store.dispatch('loadingComplete')
      })
      .catch(e => console.log(e));
  }
};
</script>