<template>
  <main>
    <div class="champ-details">
      <img class="champ-1" :src="champ1[1]" alt="" />
    </div>
    <div
      v-show="initialDataLoaded"
      class="champ-details"
      :class="champDetailsClass"
    >
      <img class="champ-2" :src="champ2[1]" alt="" @load="onLoad" />
    </div>
  </main>
</template>

<script>
import { storage } from "../../firebase";
import { ref, getDownloadURL } from "firebase/storage";

export default {
  data() {
    return {
      champ1: [],
      champ2: [],
      champs: [],
      initialDataLoaded: false,
    };
  },
  inject: ["dataChamp", "dataChamps"],
  created() {
    // get first champ data from App.vue
    this.champ1 = this.dataChamp;
    this.champs = this.dataChamps;
    const [c1] = this.champ1;

    //Get data for the second champ
    let randomChapmIndex = Math.floor(Math.random() * this.champs.length);
    let selectedChamp = this.champs[randomChapmIndex];
    // check if its the same and get another champ if true
    while (this.champs[randomChapmIndex].name === c1.name) {
      randomChapmIndex = Math.floor(Math.random() * this.champs.length);
      selectedChamp = this.champs[randomChapmIndex];
    }
    this.champ2.push(selectedChamp);
    getDownloadURL(ref(storage, `images/${selectedChamp.name}.jpg`)).then(
      (url) => {
        this.champ2.push(url);
        this.initialDataLoaded = true;
      }
    );
  },
  methods: {
    onLoad(e) {
      e.target.classList.toggle("showAnimation");
      setTimeout(() => {
        e.target.style.opacity = 1;
      }, 1000);
    },
  },
  computed: {
    champDetailsClass() {
      return {
        hidden: !this.initialDataLoaded,
      };
    },
  },
};
</script>

<style scoped>
main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
}
.champ-details {
  height: 100vh;
}
.champ-details {
  height: 100vh;
}
.hidden {
  opacity: 0;
}
.showAnimation {
  animation-name: show;
  animation-duration: 1s;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.7);
}
img:hover {
  filter: brightness(1);
}

@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
