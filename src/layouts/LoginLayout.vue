<template>
  <q-layout class="flex justify-center items-center">
    <q-card class="flex column justify-center items-center q-pa-xl">
      <h3 class="q-mb-sm">Вход</h3>
      <q-input type="text" v-model="name" model-value="" label="ФИО через пробел" class="q-mb-md" lazy-rules></q-input>
      <q-input type="password" v-model="password" model-value="" label="Пароль"  class="q-mb-md" lazy-rules></q-input>
      <q-btn type="submit" color="primary" class="q-mt-sm" @click="submit">Вход</q-btn>
    </q-card>
  </q-layout>
</template>

<script>
import {ref} from 'vue'
import axios from "axios";
import constants from "src/js/constants";
export default {
  name: "LoginLayout",

  data() {
    return {
      name: ref(''),
      password: ref('')
    }
  },
  methods: {
    submit(){

      axios.get(constants.serverIp + 'login/' + this.name).then((req) => {
        console.log(req)
      })
    }
  }
}
</script>

<style scoped>
.q-card{
  border-radius: 20px;
}
</style>
