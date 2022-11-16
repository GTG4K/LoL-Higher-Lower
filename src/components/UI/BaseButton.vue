<template>
  <button :class="buttonClass" :type="type" @click="redirectTo">
    <slot></slot>
    <i v-if="!direction === 'right'" class="fas fa-caret-right"></i>
    <i v-else-if="direction === 'up'" class="fas fa-caret-up"></i>
    <i v-else-if="direction === 'down'" class="fas fa-caret-down"></i>
    <i v-else-if="direction === 'left'" class="fas fa-caret-left"></i>
  </button>
</template>

<script>
export default {
  props: {
    size: String,
    theme: String,
    direction: String,
    type: String,
    redirect: String,
  },
  computed: {
    buttonClass() {
      return {
        tiny: this.size === "tiny",
        small: this.size === "small",
        league: this.theme === "league",
        leagueDark: this.theme === "leagueDark",
      };
    },
  },
  methods: {
    redirectTo() {
      if (this.redirect) {
        this.$router.push(`${this.redirect}`);
      }
    },
  },
};
</script>

<style scoped>
i {
  position: absolute;
  color: white;
  font-size: 20px;
  right: 10px;
  top: 50%;
  transform: translate(0, -50%);
}

button {
  position: relative;
  background: var(--color-green-100);
  padding: 10px;
  color: white;
  font-size: 18px;
  border: solid 3px;
  border-radius: 8px;
  border-color: var(--color-green-50);
}

.league {
  background: var(--color-league-100);
  border-color: var(--color-league-50);
  color: var(--color-league-dark);
}

.leagueDark {
  background-color: rgba(36, 36, 36, 0.37);
  border-radius: 4px;
  border: solid 1px;
  border-color: var(--color-league-100);
}

.leagueDark:hover {
  background-color: rgba(24, 24, 24, 0.37);
  border-color: var(--color-green-200);
}

.league:hover {
  background: var(--color-league-200);
}

.league:active {
  background: var(--color-league-300);
}

button:hover {
  background: var(--color-green-200);
}

button:active {
  background: var(--color-green-300);
}

.small {
  width: 300px;
}
</style>
