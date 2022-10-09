<template>
  <div class="line flex justify-center">
    <div class="art section">26.03%</div>
    <div class="ola section">13.01%</div>
    <div class="stasa section">23.29%</div>
    <div class="yana section">26.71%</div>
  </div>
</template>

<script>
export default {
  name: "Element"
}
</script>

<style scoped>
.line {
  width: 100%;
  height: 30px;
  color: white;
}

.art {
  width: 26.03%;
  background-color: #dc2828;
}

.yana {
  width: 26.71%;
  background-color: #b828dc;
}

.stasa {
  width: 23.29%;
  background-color: #2870dc;
}

.ola {
  width: 13.01%;
  background-color: #b8dc28;
}



.section {
  height: 100%;
}
</style>
