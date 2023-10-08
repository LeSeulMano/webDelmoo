<template>

  <section class="sect1">
    <div class="news">
      <div  v-for="n in 3" :key="n" class="article">
        <div class="btn btn-podcast type-article btn-no-hover">
          <div>
            <div>podcast</div>
          </div>
        </div>
        <h1>Présentation de l'équipe Delmoo !</h1>
        <div class="img-article">
          <img src="../../../assets/podcast.jpeg">
        </div>
        <div class="infos-article">
          <div class="info-article">
            <span class="material-icons">schedule</span>
            <div>12:23</div>
          </div>
          <div class="info-article">
            <span class="material-icons">person</span>
            <div>Yacine, Maurin et toute la clique</div>
          </div>
        </div>
        <div class="btn btn-primary btn-icon-forward">
          <router-link class="router-link" to="/">
            <div>Regarder</div>
            <span class="material-icons">play_circle</span>
          </router-link>
        </div>
      </div>
    </div>
    <div class="scroll-next-section">
      <p>Découvrez qui nous sommes !</p>
      <span class="material-icons">expand_more</span>
    </div>
  </section>

</template>

<script>
export default {
  name: 'LandingPage',
}
</script>

<style lang="scss">
@import '../../../utils/common.scss';

.sect1 {

  height: calc(100vh - 7rem);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../../../assets/wave1.svg");
  background-repeat: no-repeat;
  background-position-y: 100%;

  .news {

    margin-top: -10%;
    width: 75%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .article {

      background: rgba(249, 243, 241, 0.5);
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(249, 243, 241, 0.25);
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      border-radius: 16px;
      padding: 1.3rem 1.8rem 1.3rem 1.8rem;
      width: 24%;

      .material-icons {
        font-size: $h6-text;
      }

      .type-article {
        display: inline-block;

        > div {
          padding: .4rem .6rem;

          > div {
            font-size: $small-text;
            color: $primary-white;
            font-weight: 600;
            text-transform: uppercase;
          }
        }
      }

      h1 {
        display: block;
        font-size: $h4-text;
        margin: .8rem 0 1rem 0;
        width: 100%;
        line-height: 133%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .img-article {

        position: relative;
        border-radius: 16px;
        overflow: hidden;
        width: 100%;
        aspect-ratio: 16/10;

        img {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
        }

      }

      .infos-article {
        margin-top: .5rem;
        display: flex;
        justify-content: space-between;

        .info-article {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 50%;

          div {
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-left: .4rem;
          }
        }
      }

      .btn-primary {
        margin-top: 1.5rem;
        left: 50%;
        transform: translateX(-50%);
      }


      &::before {
        left: -1.7rem;
        height: 4.7rem;
        position: absolute;
        content: "";
        top: 0.5rem;
        width: 5px;
        background-color: #E42618;
        transform: skewY(30deg);
      }

      &::after {
        left: -0.9rem;
        height: 7rem;
        position: absolute;
        content: "";
        top: 0.5rem;
        width: 5px;
        background-color: #E42618;
        transform: skewY(30deg);
      }


    }

  }

  .scroll-next-section {
    position: absolute;
    left: 50%;
    top: 98.5%;
    transform: translate(-50%, -98.5%);
    text-align: center;
    transition: .3s;

    p {
      font-size: $p-text;
      color: $primary-white;
      font-weight: 600;
      margin: 0;
      margin-bottom: .1rem;
    }
    .material-icons {
      font-size: $h5-text;
      color: $primary-white;
      animation: updown 3s ease infinite;
      line-height: .5rem;
    }
  }

}
</style>