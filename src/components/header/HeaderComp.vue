<template>
  <header>
    <router-view/>
    <div class="header-container">
      <router-link class="onSelected" to="/">Accueil</router-link>
      <router-link class="onPage" to="/">Cours</router-link>
      <router-link class="nav-logo" to="/">
        <img src="../../assets/Logo_DELMOO.png" alt="Logo de l'association Delmoo">
      </router-link>
      <router-link class="onPage" to="/">Podcast</router-link>
      <router-link class="onPage" to="/">Shop</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderComp',
}
</script>

<style lang="scss">
@import 'src/utils/common.scss';

header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  height: 7rem;
  width: 100%;
  background-color: $terciary-white;
  transition: .3s;

  .header-container {
    display: flex;
    align-items: center;

    .nav-logo {
      position: relative;
      width: 10rem;
      transition: .3s;

      img {
        position: absolute;
        transition: .3s;
        top: -3.2rem;
        left: 40%;
        transform: translateX(-50%);
        width: 7rem;
        height: 7rem;
        filter: drop-shadow(0 0 0.2rem $terciary-black);
      }
    }


    .onPage, .onSelected {

      text-decoration: none;
      list-style: none;
      margin-right: 2.5rem;
      font-weight: 600;
      position: relative;
      display: block;
      padding: .6rem .9rem;
      z-index: 2;
      color: $primary-red;
      font-size: $p-text;

      &.onSelected{
        color: $secondary-red;
      }
      &.onSelected::after{
        position: absolute;
        content:'';
        height: 2px;
        width: 50%;
        top: 80%;
        left: 50%;
        transform: translateX(-50%);
        background-color: $secondary-red;
      }

      &:not(.onSelected)::after {
        position: absolute;
        content:'';
        height: 2px;
        width: 0%;
        top: 80%;
        left: 50%;
        transform: translateX(-50%);
        background-color: $primary-red;
        transition: .3s;
      }
      &:not(.onSelected):hover::after {
        width: 50%;
      }


    }
  }


}

</style>