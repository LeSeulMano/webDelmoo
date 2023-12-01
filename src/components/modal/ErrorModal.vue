<template>
  <div class="overlay" ref="overlay" v-if="errorModalVisible" @click="closeErrorModal"></div>
  <div v-if="errorModalVisible" class="error-modal" ref="errorModal">
    <div class="error-header">
      <h4>Error !</h4>
      <div class="close-modal" @click="closeErrorModal">
        <IonIcon name="close-outline"></IonIcon>
      </div>
    </div>
    <div class="error-content">
      <p>
        <span>{{message}}</span>
      </p>
      <h6>Si l'erreur persiste, contactez l'administrateur</h6>
    </div>
  </div>
</template>

<script>
import {IonIcon} from '@ionic/vue';
import anime from "animejs";
export default {

  components: {
    IonIcon
  },
  data() {
    return {
      errorMessage: '',
    };
  },
  props: {
    message: String,
    errorModalVisible: Boolean
  },
  methods: {
    closeErrorModal() {
      anime({
        targets: this.$refs.overlay,
        opacity: 0,
      });
      anime({
        targets: this.$refs.errorModal,
        translateX: ["0", "500%"],
        duration: 500,
        complete: () => {
          this.$emit('update:errorModalVisible', false);
        },
      });
    },
  }

}

</script>

<style lang="scss">

</style>