<template>
  <main>
    <div class="background-image" :class="backgroundImageClass"></div>
    <div v-show="showMenu" class="page-content" :class="pageContentClass">
      <img src="../../assets/images/Zoe.png" alt="" />
      <h1>Defeat [-15LP]</h1>
      <h1>Winrate Mastery +{{ score }} points</h1>
      <div class="Game-Details">
        <base-infobox title="Classic">
          <template v-slot:description>
            <p>Never FF 15, Try again.</p>
          </template>
          <template v-slot:action>
            <base-button type="button" size="small" @click="playClassic">Stay on the grind</base-button>
          </template>
        </base-infobox>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  props: ["type", "champ", "score"],
  data() {
    return {
      showMenu: false,
      gameStart: false,
    };
  },
  mounted() {
    const [, image] = this.champ;
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
  overflow: hidden;
}
h1 {
  color: var(--color-league-100);
  font-weight: 700;
  font-size: 32px;
  padding: 5px;
  border-radius: 4px;
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

  filter: brightness(0.6);

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.page-content {
  width: 100vw;
  display: flex;
  gap: 50px;
  margin: 120px auto;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  animation-name: show;
  animation-duration: 1.5s;
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
