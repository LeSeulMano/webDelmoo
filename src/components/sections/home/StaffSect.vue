<template>
  <section class="sect3">
    <div class="team">
      <h1 class="title-sect3"></h1>
      <div class="team-members">
        <div class="team-member" data-aos="fade-down" data-aos-duration="600">
          <div class="team-member-img"><img src="../../../assets/team1.jpg"></div>
          <h3>Yacine</h3>
          <h4>Président</h4>
        </div>
        <div class="team-member" data-aos="fade-down" data-aos-delay="200" data-aos-duration="600">
          <div class="team-member-img"><img src="../../../assets/team2.jpg"></div>
          <h3>Marin</h3>
          <h4>Responsable I.T.</h4>
        </div>
        <div class="team-member" data-aos="fade-down" data-aos-delay="400" data-aos-duration="600">
          <div class="team-member-img"><img src="../../../assets/team3.webp"></div>
          <h3>Camille</h3>
          <h4>Trésoriere</h4>
        </div>
        <div class="team-member" data-aos="fade-down" data-aos-delay="600" data-aos-duration="600">
          <div class="team-member-img"><img src="../../../assets/team4.webp"></div>
          <h3>Valentin</h3>
          <h4>Secrétaire</h4>
        </div>
      </div>
      <div class="team-cta">
        <div class="btn btn-primary btn-icon-forward" data-aos="fade-up" data-aos-delay="400" data-aos-duration="600">
          <a href="#">
            <div>Nous rejoindre</div>
            <ion-icon name="people"></ion-icon>
          </a>
        </div>
        <div class="btn btn-cours btn-icon-forward" data-aos="fade-up" data-aos-delay="600" data-aos-duration="600">
          <a href="#">
            <div>Devenir tutorant</div>
            <ion-icon name="school"></ion-icon>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

</script>

<style lang="scss">
@import "../../../utils/common.scss";

.sect3 {
  z-index: 2;

  &:before {
    position: absolute;
    content: "";
    height: 100%;
    width: 101%;
    bottom: -0.5rem;
    background-image: url("../../../assets/wave4.svg");
    background-repeat: no-repeat;
    background-position-y: 100%;
    left: 50%;
    transform: translateX(-50%);
  }

  &:after {
    position: absolute;
    content: "";
    height: 100%;
    width: 101%;
    top: -0.5rem;
    background-image: url("../../../assets/wave2.svg");
    background-repeat: no-repeat;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;

  }

  .team {
    position: relative;
    width: 80%;
    margin: 0 auto;
    padding-top: 17rem;

    h1 {
      line-height: 120%;
      margin: 0;
      font-size: $h1-text;

      div {
        display: inline-block;
        margin-right: 1.5rem;
        white-space: nowrap;

        span {
          display: inline;
          font-size: $h1-text;
        }
      }
      .letter {
        display: inline-block;
        font-size: $h1-text;
        color: $primary-red;
        opacity: 0;
      }
    }

    .team-members {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 3.5rem;


      .team-member {
        position: relative;
        border-radius: $half-round;
        width: 20%;
        max-width: 250px;
        padding: 2rem 0;

        // Effet Glass Morphism
        background:  rgba($color: $terciary-white, $alpha: .5); // rgba(35,35,35,0.5)
        -webkit-backdrop-filter: blur(10px);
        backdrop-filter: blur(10px);
        border: 1px solid rgba($color: $terciary-white, $alpha: .25);  //rgba(35,35,35,0.25)

        // Effet d'ombre
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

        &:not(.team-member:last-of-type) {
          margin-right: 5%;
        }

        // Ligne sur le côté
        &:after, &:before {
          position: absolute;
          content:'';
          top: .5rem;
          width: 4px;
          background-color: $primary-red;
          transform: skewY(30deg);
        }
        &:after {
          left: -.8rem;
          height: 6rem;
        }
        &:before {
          left: -1.4rem;
          height: 3.7rem;
        }

        .team-member-img {
          position: relative;
          margin: 0 auto;
          width: 7.1vw;
          height: 7.1vw;
          border-radius: $round;
          overflow: hidden;
          margin-bottom: 1.2rem;
          border: 3px solid $secondary-red;

          img {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            height: 100%;
          }
        }

        h3, h4 {
          text-align: center;
        }
        h3 {
          position: relative;
          font-size: $h5-text;
          //color: $primary-red;
          margin: 0;

          &:after {
            position: absolute;
            content:'';
            bottom: -.55rem;
            left: 50%;
            transform: translateX(-50%);
            background-color: $secondary-red;
            width: 4rem;
            height: 2px;
            font-weight: 700;
          }
        }
        h4 {
          font-size: $p-text;
          color: $secondary-red;
          margin: 1.1rem 0 0 0;
          font-weight: 600;
        }
      }
    }
    .team-cta {
      position: relative;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 4rem;

      .btn {
        &:not(.btn:last-of-type) {
          margin-right: 3rem;
        }
      }
    }
  }
}
</style>