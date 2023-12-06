<template>
  <div class="cookie-content" v-if="show">
      <h4>Nous nous soucions de votre vie privé</h4>
      <p>Nous utilisons des cookies sur notre site pour facilité votre expérience, pour cela il faut les accepter. Comme de toute facon personne ne lit
      ce genre de message je peux vous dire que c'est cookie sont la pour faire des stats et les stats c'est fun ! Tous le monde clique sur refusé a chaque fois
      parce que askip les cookies c'est mal, mais bon nous on a rien comme cookie donc si tu lit ce message accept stp. Si tu veux voir notre politique de confidentialité clique
      la dessus, de toute facon tu liras pas mais bon on est obligé...</p>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean
  }
}

</script>

<style lang="scss">

</style>