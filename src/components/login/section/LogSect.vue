<template>
  <section id="section4" class="common_login">
    <div class="connexion_inscription">
      <div class="choose_form_header">
        <h2 id="connexion" action="connexion">Se connecter</h2>
        <h2 action="inscription">S'inscrire</h2>
      </div>
      <div class="choose_form_body">
        <div class="connexion">
          <form>
            <label for="etudiant">Numéro Etudiant</label>
            <input type="text" name="student_number" v-model="student_number" placeholder="Entrez votre numéro étudiant"
                   required>
            <label for="mot_de_passe">Mot de passe</label>
            <input type="password" name="mot_de_passe" v-model="password" placeholder="Entrez votre mot de passe"
                   required>
            <div class="btn-action">
              <div class="btn btn-secondary btn-icon-backward">
                <router-link class="router-link" to="/">
                  <IonIcon name="arrow-back"></IonIcon>
                  <div>Retour</div>
                </router-link>
              </div>
              <div class="btn btn-primary btn-icon-forward btn-submit-connexion" @click="connexion">
                <div>
                  <div>Connexion</div>
                  <IonIcon name="arrow-forward"></IonIcon>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="inscription">
          <form>
            <label for="username">Pseudo</label>
            <input type="text" name="username" placeholder="Entrez votre pseudo" required>

            <label for="email">Email</label>
            <input type="email" name="email" placeholder="Entrez votre email" required>

            <label for="netudiant">N° étudiant</label>
            <input type="text" name="netudiant" placeholder="Entrez votre n° étudiant" required>

            <label for="mot_de_passe">Mot de passe</label>
            <input type="password" name="mot_de_passe" placeholder="Entrez votre mot de passe">

            <label for="mot_de_passe">Confirmation Mot de passe</label>
            <input type="password" name="mot_de_passe" placeholder="Entrez votre mot de passe">

            <div class="btn-action">
              <div class="btn btn-secondary btn-icon-backward">
                <router-link class="router-link" to="/">
                  <IonIcon name="arrow-back"></IonIcon>
                  <div>Retour</div>
                </router-link>
              </div>
              <div class="btn btn-primary btn-icon-forward btn-submit-inscription">
                <div>
                  <div>Inscription</div>
                  <IonIcon name="arrow-forward"></IonIcon>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {IonIcon} from '@ionic/vue';
import {ref} from "vue";
import axios from "axios";

export default {
  components: {
    IonIcon,
  },
  data() {
    let student_number = ref("");
    let password = ref('');
    return {
      student_number,
      password
    }
  },
  methods: {
    show(elt) {
      elt.style.position = 'relative'
      elt.style.visibility = 'visible'
      elt.style.opacity = '1'
      elt.style.maxHeight = '50rem'
    },
    hide(elt) {
      elt.style.position = 'absolute'
      elt.style.opacity = '0'
      elt.style.visibility = 'hidden'
      elt.style.maxHeight = '0'
    },
    showConnexion() {
      console.log("oui")
      let inscriptionForm = document.querySelector('.inscription')
      let inscriptionH2 = document.querySelector('h2[action="inscription"]')

      let connexionForm = document.querySelector('.connexion')
      let connexionH2 = document.querySelector('h2[action="connexion"]')
      connexionH2.classList.add('onForm')
      inscriptionH2.classList.remove('onForm')
      this.hide(inscriptionForm)
      this.show(connexionForm)
    },
    showInscription() {
      let inscriptionForm = document.querySelector('.inscription')
      let inscriptionH2 = document.querySelector('h2[action="inscription"]')

      let connexionForm = document.querySelector('.connexion')
      let connexionH2 = document.querySelector('h2[action="connexion"]')
      connexionH2.classList.remove('onForm')
      inscriptionH2.classList.add('onForm')
      this.show(inscriptionForm)
      this.hide(connexionForm)
    },
    connexion() {
      if (!this.password || !this.student_number) {
        return;
      }
      axios.post('http://localhost:5000/login',
          {
            student_number: this.student_number,
            password: this.password
          }, {
            withCredentials: true,
          })
    }
  },

  mounted() {

    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;

    let main = document.querySelector('main');
    main.style.width = screenWidth + 'px';
    main.style.height = screenHeight + 'px';
    document.querySelector('#section4').style.height = screenHeight + "px";
    this.showInscription();
    // let connexionH2 = document.querySelector('h2[action="connexion"]')
    let inscriptionH2 = document.querySelector('h2[action="inscription"]')
    let connexionH2 = document.getElementById('connexion');

    connexionH2.addEventListener('click', () => {
      console.log("non")
      this.showConnexion();
    });
    inscriptionH2.addEventListener('click', () => {
      this.showInscription();
    });
  }

}

</script>

<style lang="scss">
@import "../../../utils/computer/variables";

#section4 {
  padding: 0;

  &:before {
    display: none;
  }

  .connexion_inscription {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;

    // Effet Glass Morphism
    background: rgba($color: $terciary-white, $alpha: .5); // rgba(35,35,35,0.5)
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    border: 1px solid rgba($color: $terciary-white, $alpha: .25); //rgba(35,35,35,0.25)

    // Effet d'ombre
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    border-radius: $half-round;
    padding: 2.4rem 3rem 2rem 3rem;


    .choose_form_header {
      margin-bottom: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;


      h2 {
        position: relative;
        font-size: $h5-text;
        color: $secondary-red;
        margin: 0;
        text-transform: uppercase;
        cursor: pointer;

        &:first-of-type {
          margin-right: 3rem;
        }

        &.onForm {
          color: $primary-red;

          &::after {
            position: absolute;
            content: '';
            top: calc(100% + .3rem);
            left: 0;
            width: 100%;
            height: 2px;
            background-color: $primary-red;
            transition: .3s;
          }

        }
      }
    }

    .choose_form_body {

      form, input, label {
        position: relative;
        display: block;
        border: none;
        outline: none;
      }

      form {

        label {
          font-size: $small-text;
          text-transform: uppercase;
          color: $primary-red;
          font-weight: 600;
          text-indent: .5rem;
        }

        input {
          font-size: $p-text;
          color: $primary-black;
          padding: .8rem 1rem;
          border-radius: $half-round;
          width: 18rem;

          &::placeholder {
            color: $secondary-black;
          }

          margin-bottom: 1.3rem;
        }

        .btn-action {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 2.5rem;
        }

      }

      .connexion, .inscription {
        position: absolute;
        transition: opacity .5s, max-height .4s;

      }
    }

  }
}

</style>