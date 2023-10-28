<template>

  <headerComp :selected="2"></headerComp>

  <main>
    <CoursSect></CoursSect>
  </main>

</template>

<script>

import headerComp from "@/components/header/HeaderComp.vue";
import CoursSect from "@/components/cours/search/sections/CoursSect.vue";

export default ({
  components: {headerComp, CoursSect}
})
</script>

<style lang="scss">
@import '../utils/computer/components.scss';

main{
  position: relative;
}

@media only screen and (max-width: 1024px) {
  main {}
}

</style>