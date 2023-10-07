<template>
  <headerComp></headerComp>
  <main>
    <LandingPage></LandingPage>

  </main>

</template>

<script>
import headerComp from "@/components/header/HeaderComp.vue";
import LandingPage from "@/components/sections/home/LandingPage.vue";

export default {
  name: 'App',
  components: {
    headerComp,
    LandingPage
  }
}

</script>

<style lang='scss'>
main{
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: red;
}
</style>