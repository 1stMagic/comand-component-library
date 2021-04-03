<template>
  <ol class="cmd-multistep-form-progress-bar">
      <li v-for="(step, index) in multisteps" :key="index" :class="{active : activeLink === index}">
        <a :href="step.path" @click.prevent="clickedStep($event, index)">
          <span class="number" v-if="showStepNumber">{{ index + 1 }}</span>
          <span v-else :class="step.iconClass"></span>
          <span>{{ step.name }}</span>
          <span :class="separatorIconClass"></span>
        </a>
      </li>
  </ol>
</template>

<script>
export default {
  name: 'CmdMultistepFormProgressBar',
  data () {
    return {
      activeLink: 0,
      showStepNumber: true
    }
  },
  props: {
    multisteps: {
      type: Array,
      required: true
    },
    separatorIconClass: {
        type: String,
        required: true
    }
  },
  methods: {
    clickedStep (event, index) {
      this.activeLink = index;
      this.$emit('click', {event: event, index: index, stepPath: this.multisteps[index].path})
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variables';
/* begin cmd-multistep-form-progress-bar --------------------------------------------------------------------------------------------------------------------------------------------------- */
.cmd-multistep-form-progress-bar {
  display: flex;
  justify-content: space-around;

  li {
    display: flex;
    flex: 1;
    list-style-type: none;
    margin: 0;

    a {
      display: flex;
      text-decoration: none;
      padding: var(--default-padding);
      align-items: center;
      justify-content: center;
      width: 100%;

      span, span[class*="icon"] {
        & + span[class*="icon"] {
          &:last-child {
            margin: 0;
            position: absolute;
            right: 0;
            transform: translateX(50%);
            padding: calc(var(--default-padding) / 2);
            display: flex;
            justify-content: center;
            z-index: 1;
          }
        }
      }

      .number {
         margin-right: calc(var(--default-margin) / 2);
         line-height: 100%;
         width: 2rem;
         height: 2rem;
         display: flex;
         align-items: center;
         justify-content: center;
      }
    }

    &:last-child {
      a {
        span[class*="icon-"] {
          &:last-of-type {
            display: none;
          }
        }
      }
    }
  }

  @media only screen and (max-width: $small-max-width) {
    flex-direction: column;

    li {
      a {
        span, span[class*="icon"] {
          & + span[class*="icon"] {
            &:last-child {
              left: auto;
              right: auto;
              bottom: 0;
              transform: translateY(50%);
              &::before {
                transform: rotate(90deg);
              }
            }
          }
        }
      }

      &.active {
        & ~ li {
          border-left: 0;
        }
      }
    }
  }
}
/* end cmd-multistep-form-progress-bar --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>
