<template>
  <div class="curve-divider" :class="{ flip }" aria-hidden="true">
    <svg viewBox="0 0 1440 120" preserveAspectRatio="none" class="curve">
      <defs>
        <linearGradient id="curveStroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" :stop-color="strokeColor" stop-opacity="0.9" />
          <stop offset="1" :stop-color="strokeColor" stop-opacity="0.1" />
        </linearGradient>
      </defs>
      <path
        d="M1440,10 C1100,70 1000,110 720,110 C440,110 340,70 0,10"
        fill="none"
        :stroke="useGradient ? 'url(#curveStroke)' : strokeColor"
        :opacity="opacity"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
      />
      <path
        d="M1440,30 C1100,90 1000,120 720,120 C440,120 340,90 0,30"
        fill="none"
        :stroke="useGradient ? 'url(#curveStroke)' : strokeColor"
        :opacity="opacity * 0.7"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
      />
    </svg>
  </div>
  
</template>

<script>
export default {
  name: 'CurveDivider',
  props: {
    flip: { type: Boolean, default: false },
    opacity: { type: Number, default: 0.4 },
    strokeColor: { type: String, default: '#ffffff' },
    strokeWidth: { type: Number, default: 2 },
    useGradient: { type: Boolean, default: true }
  }
}
</script>

<style scoped>
.curve-divider {
  width: 100%;
  line-height: 0;
  transform: translateZ(0);
}
.curve-divider.flip {
  transform: rotate(180deg);
}
.curve {
  display: block;
  width: 100%;
  height: 90px;
}
</style>


