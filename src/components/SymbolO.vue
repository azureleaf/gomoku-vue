<template>
  <svg :height="jsonData.svgHeight" :width="jsonData.svgWidth">
    <g fill="none">
      <path
        :id="'circle' + pos"
        class="circleStyle"
        :class="{ animationForward: !isReverse, animationBackward: isReverse }"
        stroke="#F4511E"
        :stroke-width="jsonData.svgStrokeWidth"
        fill="none"
      />
    </g>
  </svg>
</template>

<script>
import json from "./svgParams.json";

export default {
  name: "SymbolO",
  props: ["pos", "isReverse"],
  data: function () {
    return {
      jsonData: json,
    };
  },
  mounted: function () {
    // Both are valid in <script>: json.svgPadding / this.jsonData.svgPadding
    // However, "json.svgPadding" notation can't be used inside <template>
    const r = json.svgCircleRadius;
    const padding = json.svgPadding;
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
json('svgParams.json');

.circleStyle {
  stroke-dasharray: 2 * PI * svgCircleRadius;
  animation: animateCircle linear forwards;
}

.animationForward {
  animation-direction: normal;
  animation-duration: circleAnimationDuration;
}

.animationBackward {
  animation-direction: reverse;
  animation-duration: circleAnimationDuration;
}

@keyframes animateCircle {
  from {
    stroke-dashoffset: 2 * PI * svgCircleRadius;
  }

  to {
    stroke-dashoffset: 0;
  }
}
</style>
