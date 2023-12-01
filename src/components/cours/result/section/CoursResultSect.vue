<template>
  <section id="sect1" class="sect-cours-result">

    <div class="courses">
      <div class="courses-header">
        <div class="style-bar"></div>
        <div class="search-bar">
          <input type="text" placeholder="Quel cours recherches-tu ?" v-model="search">
          <div @click="reload">
            <IonIcon name="search"></IonIcon>
          </div>
        </div>
        <div class="style-bar"></div>
      </div>
      <div class="courses-body">
        <div class="subject-courses">
          <div class="subject-school-year">
            <div class="btn btn-cours btn-no-hover pointer" :class="currentYear == 1 ? 'btn-school-year-selected' : ''"
                 @click="onYearChange(1)">
              <div>
                <div>1A</div>
              </div>
            </div>
            <div class="btn btn-cours btn-no-hover pointer" :class="currentYear == 2 ? 'btn-school-year-selected' : ''"
                 @click="onYearChange(2)">
              <div>
                <div>2A</div>
              </div>
            </div>
            <div class="btn btn-cours btn-no-hover pointer" :class="currentYear == 3 ? 'btn-school-year-selected' : ''"
                 @click="onYearChange(3)">
              <div>
                <div>3A</div>
              </div>
            </div>
          </div>
          <div class="subject-courses-btn">
            <div class="btn btn-primary pointer btn-no-hover" v-for="(matter, index) in currentMatterYear" :key="index"
                 @click="onMatterChange($event)">
              <div>
                <div>{{ matter }}</div>
              </div>
            </div>
          </div>
          <div class="subject-courses-select">
            <select>
              <option v-for="(matter, index) in currentMatterYear" :key="index" :value="matter">{{matter}}</option>
            </select>
          </div>
        </div>
        <div class="file-courses">
          <div class="file-type-filter">
            <div class="btn btn-no-hover file-type-cm pointer btn-cours"
                 :class="currentType == 1 ? 'btn-filter-cm-selecter' : ''" @click="currentType = 1">
              <div>
                <div>CM</div>
              </div>
            </div>
            <div class="btn btn-no-hover file-type-td pointer btn-shop"
                 :class="currentType == 2 ? 'btn-filter-td-selecter' : ''" @click="currentType = 2">
              <div>
                <div>TD</div>
              </div>
            </div>
            <div class="btn btn-no-hover file-type-fiche pointer btn-podcast"
                 :class="currentType == 3 ? 'btn-filter-fiche-selecter' : ''" @click="currentType = 3">
              <div>
                <div>Fiches</div>
              </div>
            </div>
<!--            <div>-->
              <div class="btn btn-no-hover pointer btn-cours">
                <div>
                  <div>ME</div>
                </div>
              </div>
              <div class="btn btn-no-hover pointer btn-cours">
                <div>
                  <div>MT</div>
                </div>
              </div>
              <div class="btn btn-no-hover pointer btn-cours">
                <div>
                  <div>IIA</div>
                </div>
              </div>
              <div class="btn btn-no-hover pointer btn-cours">
                <div>
                  <div>GEII</div>
                </div>
              </div>
              <div class="btn btn-no-hover pointer btn-cours">
                <div>
                  <div>GCB</div>
                </div>
              </div>
              <div class="btn btn-no-hover pointer btn-cours">
                <div>
                  <div>ICY</div>
                </div>
              </div>
              <div class="btn btn-no-hover pointer btn-cours">
                <div>
                  <div>GI</div>
                </div>
              </div>
              <div class="btn btn-no-hover pointer btn-cours">
                <div>
                  <div>GM</div>
                </div>
              </div>
              <div class="btn btn-no-hover pointer btn-cours">
                <div>
                  <div>ESE</div>
                </div>
              </div>
              <div class="btn btn-no-hover pointer btn-cours">
                <div>
                  <div>Info</div>
                </div>
              </div>
<!--            </div>-->
          </div>
          <div class="files">
            <CoursCard
                v-for="(cour, index) in cours.filter(c => c.type == (currentType == 1 ? 'CM' : currentType == 2 ? 'TD' : currentType == 3 ? 'Fiche' : 'CM') && c.matter == currentMatter && c.promotion == currentYear)"
                :key="index" :matter="cour.matter" :type="cour.type" :date="cour.date" :name="cour.name"
                :path="cour.path"></CoursCard>
          </div>
        </div>
      </div>
    </div>
    <ErrorModal :errorModalVisible="errorModalVisible" :message="errorMessage"
                @update:errorModalVisible="updateErrorModal"></ErrorModal>
  </section>
</template>

<script>
import {IonIcon} from '@ionic/vue';
import CoursCard from "@/components/cours/result/card/CoursCard.vue";
import axios from 'axios';
import ErrorModal from "@/components/modal/ErrorModal.vue";
import anime from "animejs";

export default ({
  components: {
    CoursCard,
    IonIcon,
    ErrorModal
  },
  data() {
    const first = ["analyse", "algèbre", "outil mathématique", "algo", "électrostatique", "électrocinétique", "mécanique", "thermodynamique", "chimie des matériaux", "proba", "magnétostatique", "optique géométrique", "automatique"];
    const second = ["analyse", "algèbre", "algo", "base de donnée", "architecture", "électromagnétisme", "physique des ondes", "optique ondulatoire", "automatique", "calcul formel", "thermodynamique", "analyse numérique", "programmation orientée objet", "génie logiciel"];
    const third = ["compta", "équipement vidéo", "équipement audio", "analyse et traitement des signaux",
      "transmission audio", "C", "POO, C++", "infographie", "réseau multimédia", "dev web", "communication",
      "psycho", "filmologie", "algo", "outil mathématique", "électronique", "électrotechnique",
      "traitement du signal", "automatique", "composant de l'électronique", "conversion analogique",
      "synthèse logique", "transmission numérique", "IoT", "canaux de propagation", "analyse", "probabilité",
      "analyse numérique", "gros oeuvre", "second oeuvres", "maquette numérique", "conception architectural",
      "lecture et analyse de plan", "étude de prix", "économie de la maitrise de l'oeuvre", "rdm", "mécanique des système",
      "mécanique des sols", ""];

    let currentYear = 1;
    let currentType = 1;
    let currentMatter = currentYear == 1 ? first[0] : currentYear == 2 ? second[0] : currentYear == 3 ? third[0] : first[0];
    let search = '';
    let cours = [];
    const link = 'http://localhost:5000';
    return {
      errorModalVisible: false,
      errorMessage: "",
      currentMatterYear: first,
      first,
      second,
      third,
      currentYear,
      currentType,
      search,
      cours,
      link,
      currentMatter
    }
  },

  methods: {
    showErrorModal(message) {
      this.errorMessage = message;
      this.errorModalVisible = true;
      this.$nextTick(() => {
        anime({
          targets: this.$refs.overlay,
          opacity: 1,
          duration: 500,
        });
        anime({
          targets: ".error-modal",
          translateX: ["200%", "0%"],
          easing: 'easeOutElastic(.5, .3)',
          duration: 500
        });
      })
    },
    updateErrorModal(value) {
      this.errorModalVisible = value;
    },
    reload() {
      this.$router.push({name: 'Result', query: {search: this.search}}).then(() => {
        window.location.reload()
      })
    },
    onMatterChange(event) {
      document.querySelectorAll(".btn-subject-selected")[0].classList.remove("btn-subject-selected");
      event.currentTarget.classList.add('btn-subject-selected');
      this.currentMatter = event.currentTarget.lastChild.innerText;
    },
    onYearChange(year) {
      document.querySelectorAll(".btn-subject-selected")[0].classList.remove("btn-subject-selected");
      document.querySelectorAll(".pointer")[3].classList.add("btn-subject-selected");
      this.currentMatter = year == 1 ? this.first[0] : year == 2 ? this.second[0] : year == 3 ? this.third[0] : this.first[0];
      this.currentYear = year;
      this.currentMatterYear = year == 1 ? this.first : year == 2 ? this.second : year == 3 ? this.third : this.first;
    }
  },

  mounted() {
    const header = document.querySelector('header');
    const screenHeight = window.innerHeight;
    let section1 = document.getElementById('sect1')
    let headerHeight = header.offsetHeight
    section1.style.paddingTop = headerHeight + 'px'
    document.querySelector('#sect1').style.height = screenHeight - headerHeight + "px";
    if (window.matchMedia("(min-width: 1024px)").matches) {
      document.addEventListener("scroll", () => {
        if (document.documentElement.scrollTop > 5 && !document.getElementById('menu-opener').classList.contains('opened')) {
          header.classList.add('header-hidden')
        } else if (!document.getElementById('menu-opener').classList.contains('opened')) {
          header.classList.remove("header-hidden");
        }
      });
    }

    const search = this.$route.query.search;
    let isYear = false;
    switch (search) {
      case "1":
        axios.post(this.link + "/cours/year", {
          year: '1'
        }, {
          validateStatus: function (status) {
            return status === 201 || status === 500;
          }
        }).then((res) => {
          if (res.status == 500) {
            this.showErrorModal(res.data.message);
            return;
          }
          this.cours = res.data.json;
        })
        this.currentYear = 1;
        isYear = true;
        break;
      case '2':
        axios.post(this.link + "/cours/year", {
          year: '2'
        }, {
          validateStatus: function (status) {
            return status === 201 || status === 500;
          }
        }).then((res) => {
          if (res.status == 500) {
            this.showErrorModal(res.data.message);
            return;
          }
          this.cours = res.data.json;
        })
        isYear = true;
        this.currentYear = 2;
        break;
      case '3':
        axios.post(this.link + "/cours/year", {
          year: '3'
        }, {
          validateStatus: function (status) {
            return status === 201 || status === 500;
          }
        }).then((res) => {
          if (res.status == 500) {
            this.showErrorModal(res.data.message);
            return;
          }
          this.cours = res.data.json;
        })
        isYear = true;
        this.currentYear = 3;
        break;
    }
    if (!search) {
      axios.get(this.link + "/cours", {
        validateStatus: function (status) {
          return status === 201 || status === 500;
        }
      }).then((res) => {
        if (res.status == 500) {
          this.showErrorModal(res.data.message);
          return;
        }
        this.cours = res.data.json;
      })
    } else {
      if (!isYear) {
        axios.post(this.link + "/cours/search", {
          search: search
        }, {
          validateStatus: function (status) {
            return status === 201 || status === 500;
          }
        }).then((res) => {
          if (res.status == 500) {
            this.showErrorModal(res.data.message);
            return;
          }
          this.cours = res.data.json;
        })
      }
    }

    document.querySelectorAll(".pointer")[3].classList.add("btn-subject-selected");
  }
})
</script>

<style lang="scss">
@import "../../../../utils/computer/components.scss";

.sect-cours-result {
  position: relative;
  overflow: hidden;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    position: absolute;
    content: '';
    height: 100%;
    width: 101%;
    bottom: -.5rem;
    background-image: url("../../../../assets/wave4.svg");
    background-repeat: no-repeat;
    background-position-y: 100%;
    left: 50%;
    transform: translateX(-50%);
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);
    z-index: 999;
    transition: opacity 0.5s;
    display: flex;
    justify-content: center;
    align-items: center;
  }


  .error-modal {
    position: fixed;
    width: 40rem;
    background-color: $primary-white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    border-radius: 5%;
    overflow: hidden;
    z-index: 1000;

    .error-header {
      height: 20%;
      width: 100%;
      top: 0;
      left: 0;
      background-color: $primary-red;
      display: flex;
      justify-content: center;
      align-items: center;

      h4 {
        font-size: $h4-text;
        color: $secondary-white;
      }

      .close-modal {
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: white;
        border-radius: 50%;
        padding: 5px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;

        ion-icon {
          font-size: 20px; // ajustez la taille de l'icône selon vos besoins
          color: $primary-red; // ajustez la couleur selon vos besoins
        }
      }
    }

    .error-content {
      max-height: 20rem;
      margin: .8rem 0 1rem 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;

      p {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
      }

      h6 {
        font-size: $p-text;
      }

    }

  }


  .courses {
    position: relative;
    margin: 0 auto;
    margin-top: 2rem;
    width: 80%;
    padding: 1.9rem;
    border-radius: $half-round;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    // Effet Glass Morphism
    background: rgba($color: $primary-black, $alpha: .5); // rgba(35,35,35,0.5)
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    border: 1px solid rgba($color: $primary-black, $alpha: .25); //rgba(35,35,35,0.25)

    // Effet d'ombre
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    .courses-header {
      position: relative;
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2.2rem;


      .style-bar {
        width: 32%;
        height: 5px;
        transform: skewX(-20deg);
        background-color: $primary-red;
      }

      .search-bar {
        display: flex;
        align-items: center;
        width: 30%;
        margin: 0 .5rem;

        input {
          margin: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: $half-round 0 0 $half-round;
          padding: 15px 25%;
          outline: none;
          border: none;
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
          background-color: $primary-white;

          z-index: 2;
          font-size: $p-text;
          color: $primary-red;

          &:focus {
            border: none;
          }

          &::placeholder {
            color: $secondary-red;
          }
        }

        div {
          border-radius: 0 $half-round $half-round 0;
          padding: 25px 1.6rem;
          cursor: pointer;
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
          background-color: $primary-white;
          z-index: 1;
          display: flex;
          height: 100%;
          justify-content: center;
          align-items: center;

          ion-icon {
            position: absolute;
            color: $secondary-red;
            font-size: $big-text;
          }
        }
      }

    }

    .courses-body {

      position: relative;
      display: flex;
      justify-content: space-between;
      height: 100%;
      width: 100%;

      .subject-courses {
        position: relative;
        height: 90%;
        padding-left: .5rem;
        width: 16rem;
        margin-right: 5rem;

        .subject-school-year {
          position: relative;
          display: flex;
          padding-left: .5rem;
          margin-right: 2rem;
          margin-bottom: 1.5rem;

          .btn {
            &:not(.btn:last-of-type) {
              margin-right: 1rem;
            }

            > div {
              padding: .6rem .8rem;

              > div {
                font-size: $p-text;
                color: $primary-white;
                font-weight: 600;
                text-transform: uppercase;
              }
            }
          }

          .btn-school-year-selected {
            > div::before {
              background-color: $primary-white;
            }

            > div > div {
              color: $cours-color;
            }
          }

        }

        .subject-courses-btn {

          position: relative;
          overflow-y: scroll;
          padding-right: 1rem;
          padding-left: .4rem;
          width: 100%;
          max-height: 59vh;
          z-index: 5;

          .btn {
            display: block;
            font-size: $h6-text;
            color: $primary-white;
            font-weight: 600;
            width: 14rem;
            box-shadow: none;

            > div::before {
              box-shadow: none;
            }

            &.btn-subject-selected {
              > div:before {
                background-color: $primary-white;
              }

              > div > div {
                color: $primary-red;
              }
            }

            &:not(.btn:last-of-type) {
              margin-bottom: 1.2rem;
            }
          }

        }

      }

      .file-courses {
        position: relative;
        width: 100%;

        .file-type-filter {

          .btn {
            &:not(.btn:last-of-type) {
              margin-right: .85rem;
            }

            > div {
              padding: .55rem .9rem;

              > div {
                font-size: $p-text;
                color: $primary-white;
                font-weight: 600;
                text-transform: uppercase;
              }
            }

            &.btn-filter-cm-selecter {
              > div::before {
                background-color: $primary-white;
              }

              > div > div {
                color: $cours-color;
              }
            }

            &.btn-filter-td-selecter {
              > div::before {
                background-color: $primary-white;
              }

              > div > div {
                color: $shop-color;
              }
            }

            &.btn-filter-fiche-selecter {
              > div::before {
                background-color: $primary-white;
              }

              > div > div {
                color: $podcast-color;
              }
            }
          }
        }


        .files {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          margin-top: 1.5rem;
          overflow-y: scroll;
          max-height: 59vh;
        }

      }


    }
  }
}

@media only screen and (max-width: 1024px) {

  // Taille d'écriture
  $small-text: 1.25rem;
  $p-text: 1rem;
  $big-text: 1.2rem;
  $h6-text: 1.2rem;
  $h5-text: 2.4rem;
  $h4-text: 2.9rem;
  $h3-text: 3.8rem;
  $h2-text: 4.9rem;
  $h1-text: 6.4rem;

  .sect-cours-result {
    padding-bottom: 3rem;

    .courses {
      margin-top: 2rem;
      padding: 1.9rem;
      flex-wrap: wrap;

      .courses-header {
        position: relative;
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2.5rem;

        .style-bar {
          width: 0%;
          height: 5px;
          transform: skewX(-20deg);
          background-color: $primary-red;
        }

        .search-bar {
          width: 100%;
          margin: 0 0rem;

          input {
            padding: 1.1rem 1.55rem;
            font-size: $p-text;
          }

          div {
            padding: 1.24rem 1rem;

            ion-icon {
              font-size: $h6-text;
            }
          }
        }

      }

      .courses-body {
        flex-wrap: wrap;

        .subject-courses {
          position: relative;
          height: 90%;
          padding-left: 0;
          width: 100%;
          margin-right: 0;
          margin-bottom: .2rem;

          .subject-school-year {
            padding-left: .5rem;
            margin-right: 0;
            margin-bottom: 1.5rem;

            .btn {
              &:not(.btn:last-of-type) {
                margin-right: 1.2rem;
              }

              > div {
                padding: .8rem 1rem;

                > div {
                  font-size: $p-text;
                }
              }
            }

            .btn-school-year-selected {
              > div::before {
                background-color: $primary-white;
              }

              > div > div {
                color: $cours-color;
              }
            }

          }

          .subject-courses-btn {
            display: none;
          }

          .subject-courses-select {
            display: block;
            position: relative;

            &:before {
              position: absolute;
              content: url("../../../../assets/chevron-down.svg");
              left: 96%;
              top: 50%;
              transform: translate(-96%, -50%);
              width: 1.3rem;
              border-radius: $half-round;
              z-index: 5;
            }

            select {
              position: relative;
              display: block;
              margin: 0;
              margin-bottom: 2.5rem;
              width: 100%;
              padding: 1.2rem 1.55rem;
              border-radius: $half-round;

              outline: none;
              border: none;
              box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
              background-color: $primary-red;

              z-index: 2;
              font-size: $p-text;
              color: $primary-white;
              font-weight: 600;

              &:focus {
                border: none;
              }

              &::placeholder {
                color: $secondary-red;
              }

              // Supprimer la fleche pour ouvrir par défaut
              &::-ms-expand {
                display: none;
              }

              appearance: none;
              -webkit-appearance: none;
              -moz-appearance: none;

              option {
                font-size: $p-text;
                color: $primary-white;
                font-weight: 600;
                min-height: 0;
                padding: .6rem;
              }
            }
          }

        }

        .file-courses {
          position: relative;
          width: 100%;

          .file-type-filter {
            padding-left: .5rem;

            .btn {
              &:not(.btn:last-of-type) {
                margin-right: .85rem;
              }

              > div {
                padding: .75rem 1.1rem;

                > div {
                  font-size: $p-text;
                  color: $primary-white;
                  font-weight: 600;
                  text-transform: uppercase;
                }
              }

              &.btn-filter-cm-selecter {
                > div::before {
                  background-color: $primary-white;
                }

                > div > div {
                  color: $cours-color;
                }
              }

              &.btn-filter-td-selecter {
                > div::before {
                  background-color: $primary-white;
                }

                > div > div {
                  color: $shop-color;
                }
              }

              &.btn-filter-tp-selecter {
                > div::before {
                  background-color: $primary-white;
                }

                > div > div {
                  color: $podcast-color;
                }
              }
            }
          }

          .files {
            margin-top: 1.5rem;
            max-height: 59vh;

            .file {
              position: relative;
              //margin-right: 3%;
              margin-bottom: 3%;
              padding: 1.5rem;
              border-radius: $half-round;
              width: 10%;
              min-width: 290px;

              // Effet Glass Morphism
              background: rgba($color: $terciary-white, $alpha: .5); // rgba(35,35,35,0.5)
              -webkit-backdrop-filter: blur(10px);
              backdrop-filter: blur(10px);
              border: 1px solid rgba($color: $terciary-white, $alpha: .25); //rgba(35,35,35,0.25)

              // Effet d'ombre
              box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

              .file-metadata {
                display: flex;
                justify-content: space-between;

                .file-type {
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

                .file-date-added {
                  padding: .4rem .6rem;
                  font-size: $small-text;
                  color: $primary-white;
                  font-weight: 600;
                }
              }

              h4 {
                display: block;
                font-size: $h5-text;
                color: $primary-white;
                text-align: center;
                font-weight: 700;
                margin: 1.2rem 0 .4rem 0;
                width: 100%;

                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }

              h5 {
                font-size: $p-text;
                font-weight: 600;
                margin: 0;
                margin-bottom: 1rem;
                color: $primary-white;
                text-align: center;
              }

              .file-cta {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 1.4rem;

                .btn {
                  margin-right: 1rem;

                  > div {
                    display: flex;
                    align-items: center;
                    padding: 0.55rem 0.9rem;

                    ion-icon {
                      font-size: $h6-text;
                    }
                  }

                  &.btn-icon-forward {
                    margin-left: 1rem;
                  }

                  &.btn-icon {
                    > div {
                      padding: 0.82rem 0.9rem 0.28rem 0.9rem;
                    }
                  }

                }
              }
            }
          }

          .file-type-cm div::before {
            background-color: $cours-color;
          }

          .file-type-td div::before {
            background-color: $shop-color;
          }

          .file-type-tp div::before {
            background-color: $podcast-color;
          }

        }
      }
    }

  }

}
</style>