<template>
  <div class="column">
    <div class="ui stackable red card hvr-grow-shadow">
      <div class="content">
        <div v-if="event.creator._id === currentUser" class="ui teal right right corner label">
          <i class="heart icon"></i>
        </div>
        <div class="header">{{event.title}}</div>
        <div class="meta">2 days ago</div>
      </div>
      <div class="content">
        <h4 class="ui sub header">Activity</h4>
        <div class="description">
          <p>{{event.description}}</p>
          <p>Cute dogs come in a variety of shapes and sizes. Some cute dogs are cute for their adorable faces, others for their tiny stature, and even others for their massive size.</p>
        </div>
        <h4 class="ui sub header">Date : {{event.date | date}}</h4>
        <h4 class="ui sub header">Price : {{event.price}}</h4>
      </div>
      <div class="extra content">
        <button class="ui purple button" @click="viewEvent(index)">View Event</button>
        <div class="right floated author">
          <img class="ui avatar image" src="../../../assets/matt.jpg">
          {{event.creator.email.split("@")[0]}}
        </div>
      </div>
      <div
        v-if="!(event.creator._id === currentUser)"
        @click="bookEvent(event._id)"
        class="ui bottom attached red button"
      >
        <i class="add icon"></i>
        Book Event
      </div>
    </div>
    <div class="ui hidden divider"></div>
  </div>
</template>

<script>
import Api from "./../../../services/Api.js";

export default {
  props: ["event", "index"],
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    }
  },
  methods: {
    viewEvent(pos) {
      this.$emit("view-event", pos);
      $(".modal").modal("show");
    },
    bookEvent(_id){
      let requestBody = {
        query:`
          mutation{
            bookEvent(eventId:"${_id}"){
              _id
              createdAt
            }
          }
        ` 
      }

      let headers = {'Authorization':"Bearer "+this.$store.getters.getToken}

      Api().post('/graphql',
      {
        query:requestBody.query
      },{
        headers
      })
      .then(res =>{
        console.log(res.data)
      })
      .catch(e => {
        console.log(e)
      })
    }
  }
};
</script>

<style scoped>
/* Grow Shadow */
.hvr-grow-shadow {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px #73d807b0 !important;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: box-shadow, transform;
  transition-property: box-shadow, transform;
}
.hvr-grow-shadow:hover,
.hvr-grow-shadow:focus,
.hvr-grow-shadow:active {
  box-shadow: 0 6px 22px 4px cyan !important;
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
