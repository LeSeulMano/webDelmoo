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
            <div class="btn btn-primary pointer btn-no-hover" v-for="(matter, index) in currentMatterYear" :key="index" @click="onMatterChange($event)">
              <div>
                <div>{{ matter }}</div>
              </div>
            </div>
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
          </div>
          <div class="files">
            <CoursCard v-for="(cour, index) in cours.filter(c => c.type == (currentType == 1 ? 'Cm' : currentType == 2 ? 'Td' : currentType == 3 ? 'Fiche' : 'Cm') && c.matter == currentMatter && c.promotion == currentYear)" :key="index" :matter="cour.matter" :type="cour.type" :date="cour.date" :name="cour.name"></CoursCard>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { IonIcon } from '@ionic/vue';
import CoursCard from "@/components/cours/result/card/CoursCard.vue";
import axios from 'axios';
export default ({
  components: {
    CoursCard,
    IonIcon
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
    reload(){
      this.$router.push({name: 'Result', query: {search: this.search } } ).then(() => {
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
        }).then((res)=> {
          this.cours = res.data.json;
        })
        this.currentYear = 1;
        isYear = true;
        break;
      case '2':
        axios.post(this.link + "/cours/year", {
          year: '2'
        }).then((res)=> {
          this.cours = res.data.json;
        })
        isYear = true;
        this.currentYear = 2;
        break;
      case '3':
        axios.post(this.link + "/cours/year", {
          year: '3'
        }).then((res)=> {
          this.cours = res.data.json;
        })
        isYear = true;
        this.currentYear = 3;
        break;
    }
    if(!search) {
      axios.get(this.link + "/cours").then((res) => {
        this.cours = res.data.json;
      })
    }
    else{
      if(!isYear) {
        axios.post(this.link + "/cours/search", {
          search: search
        }).then((res)=> {
          this.cours = res.data.json;
          console.log(this.cours);
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
          max-height: 59vh;}

      }


    }
  }
}
</style>