<template>
  <div id="app">
    <div class="container" style="margin-top: 50px;">
      <div class="row">
        <form-component />
      </div>
    </div>
  </div>
</template>

<script>
import FormComponent from './components/FormComponent.vue';

export default {
  name: 'App',
  components: {
    FormComponent
  }
}
</script>