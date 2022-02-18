<template>
  <div class="votes-display"
       :style="{
    'grid-template-columns': `repeat(${columnsCount})`,
    'grid-template-rows': `repeat(${rowsCount})`,
  }">
    <div class="candidate-bar flex items-center justify-center text-center"
         v-for="id in candidatesCounts"
         :key="id"
         :style="{'background-color': this.candidateVoteColor(id)}"
    >
    </div>
  </div>
</template>

<script>
import axios from "axios";
import constants from "src/js/constants";


export default {
  name: "VotesDisplay",
  props: {
    colors: {
      required: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
    this.onResize()
    axios.get(constants.serverIp + 'candidates/').then((req) => {
      let request = req.data
      this.candidates = request
      this.candidatesNames = Object.keys(request)
      this.candidatesCounts = this.candidatesNames.length
      // console.log(request)
      this.gridSettings = `${this.candidatesCounts},`
      for (let candidatesData of Object.values(this.candidates)) {
        this.gridSettings += `${candidatesData.percentage}% `
      }
    })

  },
  data() {
    return {
      gridSettings: null,
      candidates: null,
      candidatesNames: null,
      candidatesCounts: null,
      windowWidth: null,
      columnsCount: null,
      rowsCount: null,
    }
  },
  methods: {
    onResize(){
      if (window.innerWidth < 768){
        this.columnsCount = '1, auto'
        this.rowsCount = this.gridSettings
      }
      else {
        this.columnsCount = this.gridSettings
        this.rowsCount = '1, auto'
      }
    },
    candidateVoteColor(id){
      if (this.colors){
        return this.colors[id]
      }
      return 'red'
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize);
  },

}
</script>

<style lang="scss" scoped>
.votes-display {
  width: 100%;
  min-height: 10px;
  //background-color: red;
  display: grid;
}

.candidate-bar {
  overflow: hidden;
  //padding-top: 10px;
  //padding-bottom: 10px;
}

@media (max-width: 768px) {
  .votes-display {
    height: 100vh;
    //grid-column: auto;

  }
}
</style>
