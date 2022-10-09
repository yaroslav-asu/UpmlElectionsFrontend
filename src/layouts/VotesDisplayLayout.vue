<template>
<q-layout class="flex column justify-center items-center">
<!--  <ul>-->
<!--    <li v-for="name in names" :key="name"> {{ name.join(' ')}}</li>-->
<!--  </ul>-->
</q-layout>
</template>

<script>
import axios from "axios";
import constants from "src/js/constants";
import {mapGetters} from "vuex";

export default {
  name: "VotesDisplayLayout",
  mounted() {
    axios.get(constants.serverIp + 'voters-data/' + this.sessionId).then(req => {
      console.log(req.data)
      // this.names = req.data
    })
  },
  data(){
    return {
      names: []
    }
  },

  computed: {
    ...mapGetters('mainStore', ['sessionId'])
  }
}
</script>

<style scoped>

</style>
