<template>
  <button :class="buttonClass" :type="type" @click="redirectTo">
    <slot></slot>
    <i class="fas fa-caret-right"></i>
  </button>
</template>

<script>
export default {
  props: {
    size: String,
    type: String,
    redirect: String,
  },
  computed: {
    buttonClass() {
      return {
        tiny: this.size === "tiny",
        small: this.size === "small",
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
