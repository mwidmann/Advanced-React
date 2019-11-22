<template>
  <AnimationStyles>
    <transition
      name="count"
      @before-enter="beforeEnter"
      @before-leave="beforeLeave"
    >
      <Dot :key="count" class="count">
        {{ count }}
      </Dot>
    </transition>
  </AnimationStyles>
</template>

<script>
import Styled from 'vue-styled-components'
import theme from '~/assets/theme'

const AnimationStyles = Styled.span`
  position: relative;
  .count {
    display: block;
    position: relative;
    transition: all .4s;
    backface-visibility: hidden;
  }
  .count-enter-active {
    transform: rotateX(0.5turn);
  }
  .count-enter-to {
    transform: rotateX(0);
  }
  .count-leave-active {
    top: 0;
    position: absolute;
    transform: rotateX(0);
  }
  .count-leave-to {
    transform: rotateX(0.5turn);
  }
`

const Dot = Styled.div`
  background: ${theme.vue};
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  line-height: 2rem;
  min-width: 3rem;
  margin-left: 1rem;
  font-weight: 100;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`

export default {
  components: {
    AnimationStyles,
    Dot,
  },
  props: {
    count: {
      type: Number,
      required: true,
    },
  },
  methods: {
    beforeEnter(el) {
      console.log(`enter`, el)
    },
    beforeLeave(el) {
      console.log(`leave`, el)
    },
  },
}
</script>

<style></style>
