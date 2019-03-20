<template>
  <div class="column" :id="booking._id">
    <div class="ui stackable card">
      <div class="image">
        <img src="../../../assets/matthew.png">
      </div>
      <div class="content">
        <div class="header">{{booking.event.title}}</div>
        <div class="meta">
          <a>{{booking.event.creator.email.split('@')[0]}}</a>
        </div>
        <div class="description">{{booking.event.description}}</div>
      </div>
      <div class="extra content">
        <span class="right floated">{{booking.event.date}}</span>
        <span>
          <i class="user icon"></i>
          75 Bookings
        </span>
      </div>
      <div class="ui bottom attached black button" @click="cancelBooking(booking._id)">
        <i class="close icon"></i>
        Cancel Booking
      </div>
    </div>
  </div>
</template>

<script>
import Api from "./../../../services/Api.js";

export default {
  props: ["booking"],
  methods: {
    cancelBooking(_id) {
      let token = this.$store.getters.getToken;
      let headers = { Authorization: "Bearer " + token };

      let requestBody = {
        query: `
          mutation{
            cancelBooking(bookingId:"${_id}")
          }
        `
      };

      Api().post(
        "/graphql",
        {
          query: requestBody.query
        },
        {
          headers
        }
      ).then(res => {
        console.log(res.data)
        $(`#${_id}`).fadeOut()
      }).catch(e=>console.log(e))
    }
  }
};
</script>