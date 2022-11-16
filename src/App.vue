<template>
  <router-view v-if="dataLoaded" @gameOver="gameOver" :champ="champ" :score="score" />
</template>

<script>
import { storage } from "./firebase";
import { ref, getDownloadURL } from "firebase/storage";

export default {
  data() {
    return {
      champ: [],
      score: 0,
      dataLoaded: false,
      champs: [
        {
          name: "Aatrox",
          main: "top",
          top: 49.58,
          jg: 42.64,
          mid: 52.6,
          bot: 38.71,
          sup: 40.48,
        },
        {
          name: "Ahri",
          main: "mid",
          top: 49.68,
          jg: 3.7,
          mid: 50.23,
          bot: 45.54,
          sup: 45.33,
        },
        {
          name: "Akali",
          main: "mid",
          top: 46.85,
          jg: 17.86,
          mid: 48.15,
          bot: 33.33,
          sup: 19.15,
        },
        {
          name: "Akshan",
          main: "mid",
          top: 50.77,
          jg: 43.77,
          mid: 51.68,
          bot: 49.5,
          sup: 39.64,
        },
        {
          name: "Alistar",
          main: "sup",
          top: 41.47,
          jg: 28.95,
          mid: 38.89,
          bot: 48,
          sup: 49.37,
        },
        {
          name: "Amumu",
          main: "sup",
          top: 45.68,
          jg: 50.72,
          mid: 32.04,
          bot: 30.43,
          sup: 51.44,
        },
        {
          name: "Anivia",
          main: "mid",
          top: 52.76,
          jg: 18.18,
          mid: 51.59,
          bot: 47.52,
          sup: 48.35,
        },
        {
          name: "Annie",
          main: "mid",
          top: 52.4,
          jg: 20,
          mid: 50.38,
          bot: 48.65,
          sup: 46.07,
        },
        {
          name: "Aphelios",
          main: "bot",
          top: 47.17,
          jg: 20,
          mid: 37.05,
          bot: 44.64,
          sup: 16.13,
        },
        {
          name: "Ashe",
          main: "bot",
          top: 45.89,
          jg: 19.12,
          mid: 46,
          bot: 50.36,
          sup: 49.51,
        },
        {
          name: "Aurelionsol",
          main: "mid",
          top: 48.37,
          jg: 18.75,
          mid: 50.59,
          bot: 39.58,
          sup: 38.32,
        },
        {
          name: "Azir",
          main: "mid",
          top: 47.57,
          jg: 12.5,
          mid: 44.59,
          bot: 37.02,
          sup: 42.04,
        },
        {
          name: "Bard",
          main: "sup",
          top: 45.51,
          jg: 17.65,
          mid: 36.47,
          bot: 29.79,
          sup: 50.44,
        },
        {
          name: "Belveth",
          main: "jg",
          top: 46.82,
          jg: 51.33,
          mid: 49.12,
          bot: 33.33,
          sup: 48.5,
        },
        {
          name: "Blitzcrank",
          main: "sup",
          top: 37.86,
          jg: 42.79,
          mid: 39.13,
          bot: 28.13,
          sup: 51.92,
        },
        {
          name: "Brand",
          main: "sup",
          top: 48.12,
          jg: 35.41,
          mid: 49.47,
          bot: 50.72,
          sup: 49.48,
        },
        {
          name: "Braum",
          main: "sup",
          top: 37.31,
          jg: 13.33,
          mid: 47.8,
          bot: 50,
          sup: 47.8,
        },
        {
          name: "Caitlyn",
          main: "bot",
          top: 42.94,
          jg: 15.79,
          mid: 41.79,
          bot: 49.75,
          sup: 34.8,
        },
        {
          name: "Camille",
          main: "top",
          top: 51.01,
          jg: 45.05,
          mid: 49.78,
          bot: 46.61,
          sup: 45.49,
        },
        {
          name: "Cassiopeia",
          main: "mid",
          top: 50.86,
          jg: 27.27,
          mid: 51.58,
          bot: 52.38,
          sup: 45.28,
        },
        {
          name: "Chogath",
          main: "top",
          top: 50.69,
          jg: 42.24,
          mid: 48.87,
          bot: 53,
          sup: 43.97,
        },
        {
          name: "Corki",
          main: "mid",
          top: 47.08,
          jg: 23.53,
          mid: 48.18,
          bot: 42.23,
          sup: 21.43,
        },
        {
          name: "Darius",
          main: "top",
          top: 51.48,
          jg: 45.76,
          mid: 51.92,
          bot: 39.72,
          sup: 41.88,
        },
        {
          name: "Diana",
          main: "jg",
          top: 44.6,
          jg: 49.94,
          mid: 51.18,
          bot: 48.08,
          sup: 30.19,
        },
        {
          name: "Draven",
          main: "bot",
          top: 52.9,
          jg: 28.13,
          mid: 45.77,
          bot: 50.97,
          sup: 23.53,
        },
        {
          name: "Drmundo",
          main: "top",
          top: 50.72,
          jg: 50.02,
          mid: 52.14,
          bot: 50.14,
          sup: 43.36,
        },
        {
          name: "Ekko",
          main: "jg",
          top: 54.58,
          jg: 54.58,
          mid: 50.52,
          bot: 25,
          sup: 50,
        },
        {
          name: "Elise",
          main: "jg",
          top: 66.67,
          jg: 54.39,
          mid: 33.33,
          bot: 0,
          sup: 65.12,
        },
        {
          name: "Evelynn",
          main: "jg",
          top: 100,
          jg: 54.91,
          mid: 85.71,
          bot: 33.33,
          sup: 40,
        },
        {
          name: "Ezreal",
          main: "bot",
          top: 45.83,
          jg: 31.25,
          mid: 43.22,
          bot: 49.25,
          sup: 20,
        },
        {
          name: "Fiddlesticks",
          main: "jg",
          top: 67.86,
          jg: 53.4,
          mid: 58.06,
          bot: 50,
          sup: 50.54,
        },
        {
          name: "Fiora",
          main: "top",
          top: 53.04,
          jg: 25,
          mid: 49.09,
          bot: 100,
          sup: 100,
        },
        {
          name: "Fizz",
          main: "mid",
          top: 53.85,
          jg: 36.36,
          mid: 51.03,
          bot: 66.67,
          sup: 36.36,
        },
        {
          name: "Galio",
          main: "mid",
          top: 42.86,
          jg: 27.27,
          mid: 50.06,
          bot: 0,
          sup: 46.63,
        },
        {
          name: "Gangplank",
          main: "top",
          top: 50.7,
          jg: 0,
          mid: 51.87,
          bot: 25,
          sup: 23.08,
        },
        {
          name: "Garen",
          main: "top",
          top: 52.69,
          jg: 50.79,
          mid: 54.97,
          bot: 40,
          sup: 40,
        },
        {
          name: "Gnar",
          main: "top",
          top: 52.53,
          jg: 100,
          mid: 27.27,
          bot: 50,
          sup: 50,
        },
        {
          name: "Gragas",
          main: "top",
          top: 48.11,
          jg: 51.29,
          mid: 56.13,
          bot: 60,
          sup: 50,
        },
        {
          name: "Graves",
          main: "jg",
          top: 46.67,
          jg: 50.84,
          mid: 47.78,
          bot: 65,
          sup: 25,
        },
        {
          name: "Gwen",
          main: "top",
          top: 48.76,
          jg: 48.53,
          mid: 66.67,
          bot: 50,
          sup: 0,
        },
        {
          name: "Hecarim",
          main: "jg",
          top: 27.27,
          jg: 49.95,
          mid: 35.71,
          bot: 33.33,
          sup: 14.29,
        },
        {
          name: "Heimerdinger",
          main: "mid",
          top: 50.54,
          jg: 47.37,
          mid: 54.8,
          bot: 55.45,
          sup: 51.02,
        },
        {
          name: "Illaoi",
          main: "top",
          top: 49.81,
          jg: 0,
          mid: 46.27,
          bot: 100,
          sup: 43.75,
        },
        {
          name: "Irelia",
          main: "mid",
          top: 51.14,
          jg: 37.5,
          mid: 50.54,
          bot: 32.5,
          sup: 22.22,
        },
        {
          name: "Ivern",
          main: "jg",
          top: 33.33,
          jg: 46.8,
          mid: 51.79,
          bot: 40,
          sup: 50,
        },
        {
          name: "Janna",
          main: "sup",
          top: 60,
          jg: 50,
          mid: 42.86,
          bot: 33.33,
          sup: 54.76,
        },
        {
          name: "Jarvaniv",
          main: "jg",
          top: 50,
          jg: 50.1,
          mid: 40,
          bot: 83.33,
          sup: 47.58,
        },
        {
          name: "Jax",
          main: "top",
          top: 51.4,
          jg: 52.65,
          mid: 47.69,
          bot: 50,
          sup: 26.47,
        },
        {
          name: "Jayce",
          main: "top",
          top: 49.48,
          jg: 53.85,
          mid: 55.25,
          bot: 40,
          sup: 28.57,
        },
        {
          name: "Jhin",
          main: "bot",
          top: 41.18,
          jg: 37.5,
          mid: 60,
          bot: 50.13,
          sup: 19.23,
        },
        {
          name: "Jinx",
          main: "bot",
          top: 50,
          jg: 0,
          mid: 50,
          bot: 51.1,
          sup: 0,
        },
      ],
    };
  },
  created() {
    const randomChapmIndex = Math.floor(Math.random() * this.champs.length);
    const selectedChamp = this.champs[randomChapmIndex];
    this.champ.push(selectedChamp);
    getDownloadURL(ref(storage, `images/${selectedChamp.name}.jpg`)).then((url) => {
      this.champ.push(url);
      this.dataLoaded = true;
    });
  },
  methods: {
    gameOver(champ, type, score) {
      this.champ = champ;
      this.score = score;
      setTimeout(() => {
        this.$router.push(`/${type}/over`);
      }, 1500);
    },
  },
  provide() {
    return {
      dataChamp: this.champ,
      dataChamps: this.champs,
    };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700&display=swap");

:root {
  --font: "Montserrat", sans-serif;
  --font-color: #ffffff;

  --color-bg-dark: rgb(20, 20, 20);

  --color-green-50: #7cd6a4;
  --color-green-100: #13e270;
  --color-green-200: #0faa55;
  --color-green-300: #0c8040;

  --color-pass: var(--color-green-100);
  --color-fail: #d82222;

  --color-dark-league: #1d1911be;
  --color-league-50: #e2ca99;
  --color-league-100: #c8aa6e;
  --color-league-200: #c79943;
  --color-league-300: #c59327;
}

* {
  font-family: var(--font);
  transition: 0.3s all;
}

body {
  background-color: var(--color-bg-dark);
}

/* CSS RESET */
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
</style>
