<template>
  <headerComp :isMenuOpen="isMenuOpen" :changeMenu="changeMenu"></headerComp>
  <main>
    <LandingPage></LandingPage>
    <AboutSect></AboutSect>
    <StaffSelect></StaffSelect>
  </main>

</template>

<script>
import headerComp from "@/components/header/HeaderComp.vue";
import LandingPage from "@/components/sections/home/LandingSect.vue";
import AboutSect from "@/components/sections/home/AboutSect.vue";
import StaffSelect from "@/components/sections/home/StaffSect.vue";
export default {
  name: 'App',
  components: {
    headerComp,
    LandingPage,
    AboutSect,
    StaffSelect
  },
  data() {
    return {
      isMenuOpen: false
    }
  },
  methods: {
    changeMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
  },
  mounted() {
    const header = document.querySelector('header');
    const logo = document.querySelector('.nav-logo');

    document.addEventListener('scroll', () => {
      if (document.documentElement.scrollTop > 5 && !document.getElementById('menu-opener').classList.contains('opened')) {
        header.classList.add('header-shrink');
        logo.classList.add('header-logo-shrink');
        this.headerShrinked = true;
      } else if (!document.getElementById('menu-opener').classList.contains('opened')) {
        header.classList.remove('header-shrink');
        logo.classList.remove('header-logo-shrink');
        this.headerShrinked = false;
      }
    });

    // Définissez this.headerShrinked comme une propriété de données Vue
    this.headerShrinked = false;
  }
}

</script>

<style lang='scss'>
main{
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
</style>