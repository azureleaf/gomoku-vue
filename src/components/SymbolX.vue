<template>
  <svg height="20" width="20">
    <g fill="none">
      <path :id="'cross1-' + pos" class="cross1" fill="none" />
      <path :id="'cross2-' + pos" class="cross2" fill="none" />
    </g>
  </svg>
</template>

<script>
export default {
  name: "SymbolO",
  props: ["pos"],
  mounted: function() {
    const r = 8;
    const padding = 2;
    let cross1 = document.getElementById("cross1-" + this.pos);
    cross1.setAttribute(
      "d",
      `M ${padding},${padding} L ${2 * r + padding},${r * 2 + padding} `
    );
    let cross2 = document.getElementById("cross2-" + this.pos);
    cross2.setAttribute(
      "d",
      `M ${padding + 2 * r},${padding} L ${padding},${padding + 2 * r} `
    );
    [cross1, cross2].forEach(stroke => {
      stroke.setAttribute("stroke", "blue");
      stroke.setAttribute("stroke-width", 3);
    });
  },
};
</script>

<style scoped lang="stylus">
.cross1 {
  stroke-dasharray: 100;
  animation: animateCross1 0.3s linear forwards;
}

.cross2 {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: animateCross2 0.3s linear forwards;
  animation-delay: 0.2s;
}

@keyframes animateCross1 {
  from {
    stroke-dashoffset: 100;
  }

  to {
    stroke-dashoffset: 0;
  }
}

@keyframes animateCross2 {
  from {
    stroke-dashoffset: 100;
  }

  to {
    stroke-dashoffset: 0;
  }
}
</style>
