<template>
  <main>
    <div v-show="imageLoaded" class="background-image" :class="backgroundImageClass"></div>
    <div v-show="showMenu" class="page-content" :class="pageContentClass">
      <img src="../../assets/logo/logo.png" alt="" />
      <div class="gamemodes">
        <base-infobox title="Classic">
          <template v-slot:description>
            <p>Guess the champs based on their most played roles</p>
          </template>
          <template v-slot:action>
            <base-button type="button" size="small" @click="playClassic" direction="right">Play</base-button>
            <p class="filter_text">filter by Role:</p>
            <div class="filters">
              <base-button type="button" @click="playClassic" theme="leagueDark"
                ><img src="../../assets/icons/topi.png" alt=""
              /></base-button>
              <base-button type="button" @click="playClassic" theme="leagueDark"
                ><img src="../../assets/icons/jgi.png" alt=""
              /></base-button>
              <base-button type="button" @click="playClassic" theme="leagueDark"
                ><img src="../../assets/icons/midi.png" alt=""
              /></base-button>
              <base-button type="button" @click="playClassic" theme="leagueDark"
                ><img src="../../assets/icons/boti.png" alt=""
              /></base-button>
              <base-button type="button" @click="playClassic" theme="leagueDark"
                ><img src="../../assets/icons/supi.png" alt=""
              /></base-button>
            </div>
          </template>
        </base-infobox>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      champ1: "",
      imageLoaded: false,
      showMenu: false,
      gameStart: false,
    };
  },
  inject: ["dataChamp"],
  created() {
    this.champ1 = this.dataChamp;
  },
  mounted() {
    const [, image] = this.champ1;
    const bgImage = document.querySelector(".background-image");
    bgImage.style.backgroundImage = `url('${image}')`;
    setTimeout(() => {
      this.imageLoaded = true;
      this.showMenu = true;
    }, 500);
  },
  methods: {
    playClassic() {
      this.gameStart = true;
      setTimeout(() => {
        this.showMenu = false;
        this.$router.push("/classic");
      }, 1000);
    },
  },
  computed: {
    pageContentClass() {
      return {
        hideAnimation: this.gameStart,
      };
    },
    backgroundImageClass() {
      return {
        halfImage: this.gameStart,
      };
    },
  },
};
</script>

<style scoped>
main {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.background-image {
  position: fixed;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  opacity: 1;
  box-shadow: inset 0 0 300px rgb(0, 0, 0);
  filter: brightness(0.6);

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  animation-name: show;
  animation-duration: 1s;
}
.page-content {
  width: 100vw;
  display: flex;
  gap: 100px;
  margin: 160px auto;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  animation-name: show;
  animation-duration: 1.5s;
}

.filters {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 10px;
}

.filter_text {
  margin-top: 20px;
}

.halfImage {
  width: 50vw;
  transition: 1s ease;
}
.hideAnimation {
  animation-name: hide;
  animation-duration: 1s;
}

@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes hide {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
