<template>
  <div class="info-box">
    <div class="title">{{ title }}</div>
    <div class="description">
      <slot name="description"></slot>
    </div>
    <div class="action">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>

<style scoped>
.info-box {
  position: relative;
  border: solid 3px;
  border-radius: 8px;
  padding: 20px 20px;
  text-align: center;
  border-color: var(--color-green-100);
  color: white;
  width: 500px;
}
.title {
  position: absolute;
  top: -22px;
  left: 50%;
  font-size: 20px;
  transform: translate(-50%, 0);
  background: var(--color-green-100);
  padding: 10px 50px;
  border-radius: 8px;
  color: white;
  font-weight: 700;
  width: max-content;
}
.description {
  font-size: 17px;
  padding: 20px 0;
}

.action {
}
</style>
