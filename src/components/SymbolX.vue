<template>
  <svg :height="jsonData.svgHeight" :width="jsonData.svgWidth">
    <g fill="none">
      <path
        :id="'cross1-' + pos"
        class="cross1"
        :class="{ cross1Forward: !isReverse, cross1Backward: isReverse }"
        fill="none"
      />
      <path
        :id="'cross2-' + pos"
        class="cross2"
        :class="{ cross2Forward: !isReverse, cross2Backward: isReverse }"
        fill="none"
      />
    </g>
  </svg>
</template>

<script>
import json from "./svgParams.json";

export default {
  name: "SymbolX",
  props: ["pos", "isReverse"],
  data: function() {
    return {
      jsonData: json,
    };
  },
  mounted: function() {
    const r = json.svgCrossBoxLength;
    const padding = json.svgPadding;
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
      stroke.setAttribute("stroke-width", json.svgStrokeWidth);
    });
  },
};
</script>

<style scoped lang="stylus">
json('svgParams.json');
obliqueLength = 2 * svgCrossBoxLength * (2 ** 0.5);

.cross1, .cross2 {
  stroke-dasharray: obliqueLength;
}

.cross1Forward {
  animation: animationForward crossAnimationDuration linear forwards;
}

.cross1Backward {
  animation: animationBackward crossAnimationDuration linear forwards;
  animation-delay: crossDelay;
}

.cross2Forward {
  stroke-dashoffset: obliqueLength;
  animation: animationForward crossAnimationDuration linear forwards;
  animation-delay: crossDelay;
}

.cross2Backward {
  animation: animationBackward crossAnimationDuration linear forwards;
}

@keyframes animationForward {
  from {
    stroke-dashoffset: obliqueLength;
  }

  to {
    stroke-dashoffset: 0;
  }
}

@keyframes animationBackward {
  from {
    stroke-dashoffset: 0;
  }

  to {
    stroke-dashoffset: obliqueLength;
  }
}
</style>
