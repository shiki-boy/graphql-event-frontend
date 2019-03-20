<template>
  <div class="ui inverted modal">
    <div class="header">{{viewEvent.title}}</div>
    <div class="ui hidden divider"></div>
    <div class="ui grid container">
      <div class="row">
        <div class="column">
          <div class="ui items">
            <div class="item">
              <div class="content">
                <a class="header">Description</a>
                <div class="description">
                  <h4>{{viewEvent.description}}</h4>
                  <h4>Cute dogs come in a variety of shapes and sizes. Some cute dogs are cute for their adorable faces, others for their tiny stature, and even others for their massive size.</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <div class="ui big relaxed list" style="color:initial;">
            <div class="item">Date : {{viewEvent.date | date}}</div>
            <div class="item">Price : {{viewEvent.price}}</div>
            <div class="item">Created By : {{viewEvent.creator.email.split('@')[0]}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="ui hidden divider"></div>
    <div class="actions">
      <div class="ui cancel red button">Cancel</div>
      <div class="ui approve green button">OK</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["viewEvent"]
};
</script>