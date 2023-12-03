<template>
  <headerComp :selected="0"></headerComp>
  <main class="main-soon">
    <SoonSect></SoonSect>
  </main>
</template>

<script>

import {defineComponent} from "vue";
import headerComp from "@/components/header/HeaderComp.vue";
import SoonSect from "@/components/soon/SoonSect.vue";

export default defineComponent({
  components: {headerComp, SoonSect}
})
</script>

<style lang="scss">

</style>