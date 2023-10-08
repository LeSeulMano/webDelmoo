<template>

  <section class="sect2">
    <div class="about">
      <div class="about-desc">
        <h1 class="title-delmoo"></h1>
        <h2 data-aos="fade-right" data-aos-duration="1000">
          DELMOO, c'est ton asso polyvalente sur le campus ! On partage des trucs pour les cours, on lance des projets
          trop cools, et on anime la vie étudiante avec des podcasts et un journal.
        </h2>
        <h2 data-aos="fade-right" data-aos-delay="200" data-aos-duration="1000">
          Notre but ? Rendre le campus plus
          fun grâce à des events et des ateliers. Peu importe ce que t'aimes, que ce soit l'éducation, la créativité
          ou prendre les devants, chez DELMOO, t'as ta place.
        </h2>
        <div class="about-desc-social">
          <div data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
            <a href="https://instagram.com/delmoo_off" target="_blank">
              <div>
                <ion-icon name="logo-instagram"></ion-icon>
              </div>
              <h3>@delmoo_off</h3>
            </a>
          </div>
          <div data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000">
            <a href="mailto:delmoo.pro@gmail.com">
              <div>
                <ion-icon name="mail-outline"></ion-icon>
              </div>
              <h3>delmoo.pro@gmail.com</h3>
            </a>
          </div>
        </div>
      </div>
      <div class="about-illu">
        <div class="about-illu-img about-illu-img-1">
          <img src="../../../assets/about1.jpg">
          <div class="side-bar"></div>
        </div>
        <div class="about-illu-img about-illu-img-2">
          <img src="../../../assets/about2.jpg">
          <div class="side-bar"></div>
        </div>
      </div>
    </div>
  </section>

</template>

<script>

</script>

<style lang="scss">
@import "../../../utils/common.scss";

.sect2 {
  height: calc(100vh - 7rem);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    text-decoration: none;
  }

  height: calc(100vh - 7rem);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $primary-red;

  .about {
    position: relative;
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;

    h1, h2 {
      color: $primary-white;
    }

    .about-desc {
      width: 52%;

      h1 {
        font-size: $h1-text;
        margin: 0;
        margin-bottom: 3.5rem;
        line-height: 120%;

        div {
          display: inline-block;
          margin-right: 1.5rem;
          font-size: $h1-text;
          white-space: nowrap;

          span {
            display: inline;
            font-size: $h1-text;
          }
        }

        .letter {
          display: inline-block;
          font-size: $h1-text;
          color: $primary-white;
          opacity: 0;
        }
      }

      h2 {
        font-size: $p-text;
        font-weight: 400;
      }

      h2:not(p:last-of-type) {
        margin-bottom: 1.6rem;
      }

      .about-desc-social {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-top: 2rem;

        > div {

          &:not(div:last-of-type) {
            margin-right: 3.5rem;
          }

          a {
            position: relative;
            display: flex;
            align-items: center;

            h3, ion-icon {
              color: $primary-white;
              margin: 0;
            }

            h3 {
              position: relative;
              font-size: $p-text;
              font-weight: 600;

              &:after {
                position: absolute;
                content: '';
                height: 2px;
                width: 0%;
                top: 100%;
                left: 0;
                transition: .3s;
                background-color: $primary-white;
                z-index: 2;
              }
            }

            ion-icon {
              position: relative;
              top: .22rem;
              font-size: $h5-text;
              margin-right: .5rem;
            }

            &:hover h3::after {
              width: 100%;
            }
          }
        }
      }
    }

    .about-illu {
      position: relative;
      width: 45%;
      height: 40vw;

      .about-illu-img {
        position: absolute;
        width: 16vw;
        height: 16vw;

        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

        img {
          width: 100%;
          height: 100%;
          border-radius: $half-round;
        }

        &.about-illu-img-1 {
          z-index: 3;
          top: 30%;
          left: 23%;
          transform: translate(-23%, -30%);

          // Ligne sur le côté
          &:after, &:before {
            position: absolute;
            content: '';
            top: 2%;
            width: 5px;
            background-color: $primary-white;
            transform: skewY(30deg);
          }

          &:after {
            right: -1.8vh;
            height: 14vh;
          }

          &:before {
            right: -3.1vh;
            height: 10vh;
          }
        }

        &.about-illu-img-2 {
          z-index: 2;
          top: 85%;
          left: 90%;
          transform: translate(-90%, -85%);

          // Ligne sur le côté
          &:after, &:before {
            position: absolute;
            content: '';
            bottom: 2%;
            width: 5px;
            background-color: $primary-white;
            transform: skewY(30deg);
          }

          &:after {
            left: -1.8vh;
            height: 14vh;
          }

          &:before {
            left: -3.1vh;
            height: 10vh;
          }
        }
      }
    }

  }

}

</style>