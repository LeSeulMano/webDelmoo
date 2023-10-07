<template>

  <section class="sect1">
    <div class="news">

      <div class="article">

        <div class="btn btn-podcast type-article btn-no-hover">
          <div>
            <div>podcast</div>
          </div>
        </div>
        <h1>Présentation de l'équipe Delmoo !</h1>
      </div>

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
  background-color: blue;
  display: flex;
  justify-content: center;
  align-items: center;

  .news {
    width: 75%;
    background-color: red;
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
      width: 27%;

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

      &::before{
        left: -1.7rem;
        height: 0.7rem;
        position: absolute;
        content: "";
        top: 0.5rem;
        width: 5px;
        background-color: #E42618;
        transform: skewY(30deg);
      }
      &::after {
        left: -0.9rem;
        height: 2rem;
        position: absolute;
        content: "";
        top: 0.5rem;
        width: 5px;
        background-color: #E42618;
        transform: skewY(30deg);
      }


   }

  }

}
</style>