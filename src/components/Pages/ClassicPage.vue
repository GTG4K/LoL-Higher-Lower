<template>
  <main>
    <div class="champ-details">
      <img class="champ-1" :src="champ1[1]" alt="" />
      <div class="details">
        <div class="role-name-wr">
          <div class="role-name">
            <img
              v-if="champ1[0].main === 'top'"
              src="../../assets/icons/topi.png"
              alt=""
            />
            <img
              v-else-if="champ1[0].main === 'jg'"
              src="../../assets/icons/jgi.png"
              alt=""
            />
            <img
              v-else-if="champ1[0].main === 'mid'"
              src="../../assets/icons/midi.png"
              alt=""
            />
            <img
              v-else-if="champ1[0].main === 'bot'"
              src="../../assets/icons/boti.png"
              alt=""
            />
            <img v-else src="../../assets/icons/supi.png" alt="" />
            <h2>{{ champ1[0].name }}</h2>
          </div>
          <h1>WR: {{ champ1[0][champ1[0].main] }}</h1>
        </div>
      </div>
    </div>
    <div
      v-show="initialDataLoaded"
      class="champ-details"
      :class="champDetailsClass"
    >
      <img class="champ-2" :src="champ2[1]" alt="" @load="onLoad" />
      <div class="details">
        <div class="role-name-wr">
          <div class="role-name">
            <img
              v-if="champ2[0].main === 'top'"
              src="../../assets/icons/topi.png"
              alt=""
            />
            <img
              v-else-if="champ2[0].main === 'jg'"
              src="../../assets/icons/jgi.png"
              alt=""
            />
            <img
              v-else-if="champ2[0].main === 'mid'"
              src="../../assets/icons/midi.png"
              alt=""
            />
            <img
              v-else-if="champ2[0].main === 'bot'"
              src="../../assets/icons/boti.png"
              alt=""
            />
            <img v-else src="../../assets/icons/supi.png" alt="" />
            <h2>{{ champ2[0].name }}</h2>
          </div>
          <div class="action">
            <base-button theme="league" size="small" direction="up">
              Higher
            </base-button>
            <base-button theme="league" size="small" direction="down">
              Lower
            </base-button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { storage } from "../../firebase";
import { ref, getDownloadURL } from "firebase/storage";

export default {
  data() {
    return {
      score: 0,
      champ1: [],
      champ2: [],
      champs: [],
      // dataRoleIcons: {bot:"",sup:"", },
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

    console.log();
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
  provide() {
    return {
      dataRoleIcons: this.dataRoleIcons,
    };
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
  position: relative;
}
.details {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.hidden {
  opacity: 0;
}
.showAnimation {
  animation-name: show;
  animation-duration: 1s;
}

.action {
  display: grid;
  gap: 20px;
}
.role-name-wr {
  margin-top: 250px;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
}
.role-name {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.role-name img {
  width: 50px;
}
h1 {
  color: var(--color-league-100);
  font-weight: 700;
  font-size: 32px;
  background-color: rgba(36, 36, 36, 0.37);
  padding: 5px;
  border-radius: 4px;
  border: solid 1px;
  border-color: var(--color-league-100);
}
h2 {
  color: var(--color-league-100);
  font-weight: 700;
  font-size: 45px;
}
img.champ-1,
img.champ-2 {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.7);
}
img:hover {
  filter: brightness(1);
}

@media only screen and (max-width: 1000px) {
  main {
    grid-template-columns: 1fr;
  }
  .champ-details {
    height: 50vh;
    position: relative;
  }
  .role-name-wr {
    margin-top: 100px;
  }
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
