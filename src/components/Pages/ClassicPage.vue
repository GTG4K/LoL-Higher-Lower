<template>
  <main :class="rotate">
    <div class="champ-details">
      <img class="champ-1" :src="champ1[1]" alt="" />
      <div class="details">
        <div class="role-name-wr">
          <div class="role-name">
            <img v-if="champ1[0].main === 'top'" src="../../assets/icons/topi.png" alt="" />
            <img v-else-if="champ1[0].main === 'jg'" src="../../assets/icons/jgi.png" alt="" />
            <img v-else-if="champ1[0].main === 'mid'" src="../../assets/icons/midi.png" alt="" />
            <img v-else-if="champ1[0].main === 'bot'" src="../../assets/icons/boti.png" alt="" />
            <img v-else src="../../assets/icons/supi.png" alt="" />
            <h2>{{ champ1[0].name }}</h2>
          </div>
          <h1>WR: {{ champ1[0][champ1[0].main] }}</h1>
        </div>
      </div>
    </div>
    <div v-show="initialDataLoaded" class="champ-details">
      <img class="champ-2" :src="champ2[1]" alt="" @load="onLoad" />
      <div class="details">
        <div class="role-name-wr">
          <div class="role-name">
            <img v-if="champ2[0].main === 'top'" src="../../assets/icons/topi.png" alt="" />
            <img v-else-if="champ2[0].main === 'jg'" src="../../assets/icons/jgi.png" alt="" />
            <img v-else-if="champ2[0].main === 'mid'" src="../../assets/icons/midi.png" alt="" />
            <img v-else-if="champ2[0].main === 'bot'" src="../../assets/icons/boti.png" alt="" />
            <img v-else src="../../assets/icons/supi.png" alt="" />
            <h2>{{ champ2[0].name }}</h2>
          </div>
          <p v-if="!guess">has</p>
          <div v-if="!guess" class="action">
            <base-button @click="onHigher" theme="league" size="small" direction="up"> Higher </base-button>
            <base-button @click="onLower" theme="league" size="small" direction="down"> Lower </base-button>
          </div>
          <p v-if="!guess">Winrate than {{ champ1[0].name }} {{ champ1[0].main }}.</p>
          <h1 v-if="guess" :class="passCheck">WR: {{ wrChamp2 }}</h1>
        </div>
      </div>
    </div>
    <div class="champ-details">
      <img class="champ-2" :src="champ3[1]" alt="" />
    </div>
    <div class="score">
      <h1>score: {{ score }}</h1>
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
      wrChamp1: 0,
      wrChamp2: 0,
      champ1: [],
      champ2: [],
      champ3: [],
      champs: [],
      correct: false,
      colorCorrect: null,
      gameOver: false,
      guess: false,
      next: false,
      // dataRoleIcons: {bot:"",sup:"", },
      initialDataLoaded: false,
    };
  },
  inject: ["dataChamp", "dataChamps"],
  watch: {
    guess() {
      let MyWR = 0;
      if (this.guess) {
        console.log("in the loop");
        this.wrChamp2 = 0;
        const wrC2 = this.champ2[0][this.champ2[0].main];
        console.log(wrC2);
        let duration = 60;
        let counter = setInterval(() => {
          if (MyWR + 10 <= wrC2) {
            MyWR += 10;
            this.wrChamp2 = MyWR.toFixed(2);
          } else if (MyWR + 1 <= wrC2) {
            MyWR += 1;
            this.wrChamp2 = MyWR.toFixed(2);
          } else if (MyWR + 0.05 <= wrC2) {
            MyWR += 0.05;
            this.wrChamp2 = MyWR.toFixed(2);
          } else if (MyWR + 0.01 <= wrC2) {
            MyWR += 0.01;
            this.wrChamp2 = MyWR.toFixed(2);
          } else {
            this.correct ? (this.colorCorrect = "pass") : (this.colorCorrect = "fail");
            clearInterval(counter);
          }
        }, duration);
      }
    },
    colorCorrect() {
      if (this.colorCorrect === "pass" || this.colorCorrect === "fail") {
        this.next = true;
        setTimeout(() => {
          this.champ1 = this.champ2;
          this.champ2 = this.champ3;
          this.next = false;
          this.guess = false;
          this.colorCorrect = null;
        }, 1500);
        this.champ3 = this.generateRandomChamp([this.champ1[0].name, this.champ1[0].name]);
        getDownloadURL(ref(storage, `images/${this.champ3[0].name}.jpg`)).then((url) => {
          this.champ3.push(url);
          this.initialDataLoaded = true;
        });
      }
    },
  },
  created() {
    // get first champ data from App.vue
    this.champ1 = this.dataChamp;
    this.champs = this.dataChamps;
    // const [c1] = this.champ1;

    this.champ2 = this.generateRandomChamp([this.champ1[0].name, this.champ1[0].name]);
    getDownloadURL(ref(storage, `images/${this.champ2[0].name}.jpg`)).then((url) => {
      this.champ2.push(url);
      this.initialDataLoaded = true;
    });
    this.champ3 = this.generateRandomChamp([this.champ1[0].name, this.champ2[0].name]);
    getDownloadURL(ref(storage, `images/${this.champ3[0].name}.jpg`)).then((url) => {
      this.champ3.push(url);
      this.initialDataLoaded = true;
    });
  },
  methods: {
    generateRandomChamp(names) {
      const newChamp = [];
      let randomChapmIndex = Math.floor(Math.random() * this.champs.length);
      let selectedChamp = this.champs[randomChapmIndex];
      while (this.champs[randomChapmIndex].name === names[0] || this.champs[randomChapmIndex].name === names[1]) {
        randomChapmIndex = Math.floor(Math.random() * this.champs.length);
        selectedChamp = this.champs[randomChapmIndex];
      }
      newChamp.push(selectedChamp);
      return newChamp;
    },
    onLoad(e) {
      e.target.classList.toggle("showAnimation");
      e.target.style.opacity = 1;
    },
    onHigher() {
      //If Guess is correct
      if (this.champ1[0][this.champ1[0].main] < this.champ2[0][this.champ2[0].main]) {
        this.score++;
        this.correct = true;
        this.guess = true;

        // this.champ1 = [];
        // this.champ1.push(this.champ2[0]);
        // this.champ1.push(this.champ2[1]);

        // this.champ2 = [];
        // let randomChapmIndex = Math.floor(Math.random() * this.champs.length);
        // let selectedChamp = this.champs[randomChapmIndex];
        // while (this.champs[randomChapmIndex].name === this.champ1[0].name) {
        //   randomChapmIndex = Math.floor(Math.random() * this.champs.length);
        //   selectedChamp = this.champs[randomChapmIndex];
        // }
        // this.champ2 = [];
        // this.champ2.push(selectedChamp);
        // getDownloadURL(ref(storage, `images/${selectedChamp.name}.jpg`)).then(
        //   (url) => {
        //     this.champ2.push(url);
        //     this.initialDataLoaded = true;
        //   }
        // );
      }
      // else {
      //   this.gameOver = true;
      //   this.$router.push("/summary");
      // }
    },
    onLower() {
      if (this.champ1[0][this.champ1[0].main] > this.champ2[0][this.champ2[0].main]) {
        this.score++;
        this.guess = true;
        this.correct = true;
        // this.champ1 = [];
        // this.champ1.push(this.champ2[0]);
        // this.champ1.push(this.champ2[1]);

        // this.champ2 = [];
        // let randomChapmIndex = Math.floor(Math.random() * this.champs.length);
        // let selectedChamp = this.champs[randomChapmIndex];
        // while (this.champs[randomChapmIndex].name === this.champ1[0].name) {
        //   randomChapmIndex = Math.floor(Math.random() * this.champs.length);
        //   selectedChamp = this.champs[randomChapmIndex];
        // }
        // this.champ2 = [];
        // this.champ2.push(selectedChamp);
        // getDownloadURL(ref(storage, `images/${selectedChamp.name}.jpg`)).then(
        //   (url) => {
        //     this.champ2.push(url);
        //     this.initialDataLoaded = true;
        //   }
        // );
      }
      // else {
      //   this.gameOver = true;
      //   this.$router.push("/summary");
      // }
    },
  },
  computed: {
    champDetailsClass() {
      return {
        hidden: !this.initialDataLoaded,
      };
    },
    rotate() {
      return {
        nextAnimation: this.next,
      };
    },
    passCheck() {
      return {
        green: this.colorCorrect === "pass",
        red: this.colorCorrect === "fail",
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
  position: fixed;
  display: grid;
  grid-template-columns: 50vw 50vw 50vw;
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
.score {
  position: fixed;
  width: fit-content;
  height: fit-content;
  right: 20px;
  bottom: 12px;
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
.green {
  color: var(--color-pass);
  border-color: var(--color-pass);
}
.red {
  color: var(--color-fail);
  border-color: var(--color-fail);
}
h2 {
  color: var(--color-league-100);
  font-weight: 700;
  font-size: 45px;
}
p {
  color: var(--color-league-200);
  font-weight: 400;
  font-size: 20px;
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

.showAnimation {
  animation-name: show;
  animation-duration: 1s;
}
.nextAnimation {
  animation-name: next;
  animation-duration: 1.5s;
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

@keyframes next {
  from {
    left: 0;
  }
  to {
    left: -50vw;
  }
}
</style>
