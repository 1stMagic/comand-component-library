<template>
  <ol class="multistep-form-progress-bar">
      <li v-for="(step, index) in multisteps" :key="index" :class="{active : activeLink == index}">
        <a :href="step.path" @click.prevent="clickedStep($event, index)">
          <span class="number" v-if="showStepNumber">{{ index + 1 }}</span>
          <span v-else :class="step.iconClass"></span>
          <span>{{ step.name }}</span>
          <span class="icon-single_arrow_right"></span>
        </a>
      </li>
  </ol>
</template>

<script>
export default {
  name: 'MultistepFormProgressBar',
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

<style scoped lang="scss">
.multistep-form-progress-bar {
  display: flex;
  justify-content: space-around;

  li {
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
            padding: calc(var(--default-padding) /2);
            display: flex;
            justify-content: center;
            z-index: 1;

            &::before {
              font-size: 1rem;
            }
          }
        }
      }

      .number {
         border-radius: var(--full-circle);
         border: var(--default-border);
         color: var(--default-background-color-reduced-opacity);
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

  @media only screen and (max-width: 600px) {
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

/* >>> MULTISTEP-FORM-PROGRESS-BAR */
.multistep-form-progress-bar {
  border: var(--default-border);

  li {
    display: flex;

    &:not(:first-child) {
      border-left: .2rem solid var(--border-color);
    }

    a {
      background: var(--primary-color-reduced-opacity);

      span, span[class*="icon"] {
        color: var(--default-background-color-reduced-opacity);

        & + span[class*="icon"] {
          &:last-child {
            border: var(--default-border);
            background: var(--primary-color);
            border-radius: var(--full-circle);
          }
        }
      }

      &:hover, &:active, &:focus {
        span, span[class*="icon"] {
          color: var(--pure-white);
        }
      }
    }

    &.active {
      a {
        font-weight: bold;
        background: var(--primary-color);

        span, span[class*='icon'] {
          color: var(--pure-white);
        }
      }

      .number {
          background: var(--pure-white);
          border-color: var(--pure-white);
          color: var(--primary-color);
      }

      & ~ li {
        background: var(--default-background-color);
        border-left-color: var(--border-color);

        a {
          background: none;
          color: var(--text-color);

          span, span[class*='color'] {
            color: var(--text-color);

            & + span[class*="icon"] {
              &:last-child {
                border-color: var(--border-color);
                background: var(--medium-gray);
              }
            }
          }

          &:hover, &:active, &:focus {
            span, span[class*="icon"] {
              color: var(--primary-color);
            }
          }
        }
      }

      & + li {
        border-left-color: var(--border-color);
      }
    }
  }

  @media only screen and (max-width: 600px) {
    li {

      &:not(:last-child) {
        border-bottom: .2rem solid var(--border-color);
      }

      &.active {
        & ~ li {
          border-bottom-color: var(--border-color);
        }
      }
    }
  }
}
/* <<< END MULTISTEP-FORM-PROGRESS-BAR */
</style>
