<template>
  <svg height="20" width="20">
    <g fill="none">
      <path
        :id="'circle' + pos"
        class="circle"
        stroke="#F4511E"
        stroke-width="4"
        fill="none"
      />
    </g>
  </svg>
</template>

<script>
export default {
  name: "SymbolO",
  props: ["pos"],
  mounted: function() {
    const r = 7;
    const padding = 3;
    document
      .getElementById("circle" + this.pos)
      .setAttribute(
        "d",
        `M ${r + padding},${padding} ` +
          `A ${r},${r} 0 0 1 ${r + padding},${2 * r + padding} ` +
          `A ${r},${r} 0 0 1 ${r + padding},${padding}`
      );
  },
};
</script>

<style scoped lang="stylus">
.circle {
  stroke-dasharray: 180;
  animation: animateCircle 1s linear forwards;
}

@keyframes animateCircle {
  from {
    stroke-dashoffset: 180;
  }
  to {
    stroke-dashoffset: 0;
  }
}
</style>
