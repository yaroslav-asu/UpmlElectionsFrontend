<template>
  <div class="votes-display"
       :style="{
    'grid-template-columns': `repeat(${columnsTemplate})`,
    'grid-template-rows': `repeat(${rowsTemplate})`,
  }">
    <div class="candidate-bar flex items-center justify-center text-center"
         v-for="id in candidatesCount"
         :key="id"
         :style="{'background-color': this.colors[id - 1]}"
    >

    </div>
  </div>
</template>

<script>
export default {
  name: "VotesDisplay",
  props: {
    colors: {
      required: true,
    },
    candidates: {
      required: true,
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },
  data() {
    return {
      windowWidth: window.innerWidth,
    }
  },
  methods: {
    onResize(){
      this.windowWidth = window.innerWidth
    },
  },
  computed:{
    candidatesCount(){
      if (this.candidates){
        return Object.keys(this.candidates).length
      }
      return 0
    },
    candidatesPercentage(){
      if (this.candidates){
        return Object.values(this.candidates).map((object) => object.percentage)
      }
      return []
    },
    gridSettings(){
      let settings = `${this.candidatesCount},`
      return settings + this.candidatesPercentage.join('% ') + '%'
    },
    rowsTemplate(){
      if (this.windowWidth < 768){
        return this.gridSettings
      }
      return '1, auto'
    },
    columnsTemplate(){

      if (this.windowWidth < 768){
        return '1, auto'
      }
      return this.gridSettings
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
  display: grid;
}

.candidate-bar {
  overflow: hidden;
}

@media (max-width: 768px) {
  .votes-display {
    height: 100vh;
  }
}
</style>
