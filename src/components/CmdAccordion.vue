<template>
  <div class="cmd-accordion">
    <template v-for="(accordionContent, index) in accordion" :key="index">
      <a href="#" :title="tooltip" @click.prevent="toggleContentVisibility(accordionContent)">
        <slot :name="'accordionHeadline' + index">
          <component :is="accordionHeadlineLevel">
            {{ accordionContent.headline }}
          </component>
        </slot>
        <span class="toggle-icon" :class="[accordionContent.status ? openIconClass : closeIconClass]"></span>
      </a>
      <transition name="fade">
        <div class="accordion-content" v-if="accordionContent.status" aria-expanded="true">
          <slot :name="'accordionContent' + index">
            <p>{{ accordionContent.content }}</p>
          </slot>
        </div>
      </transition>
    </template>
  </div>
</template>


<script>
export default {
  name: "CmdAccordion",
  data() {
    return {
      accordion: []
    }
  },
  props: {
    toggleMode: {
      type: String,
      default: "single"
    },
    accordionHeadlineLevel: {
      type: String,
      default: "h3",
      validator(value) {
        const allowedTags = ["h2", "h3", "h4", "h5", "h6"]

        // check if allowedTags includes given value for this property (if not output warning in console)
        if (!allowedTags.includes(value)) {
          console.warn("Not allowed tag (" + value + ") used for accordionHeadline-property! Allowed tags are: " + allowedTags)
          return false
        }
        return true
      }
    },
    accordionData: {
      type: [Array, Number],
      required: true
    },
    openIconClass: {
      type: String,
      default: "icon-single-arrow-up"
    },
    closeIconClass: {
      type: String,
      default: "icon-single-arrow-down"
    },
    tooltip: {
      type: String,
      required: false
    }
  },
  methods: {
    toggleContentVisibility(accordionContent) {
      accordionContent.status = !accordionContent.status

      if (this.toggleMode === 'single' || this.toggleMode === '') {
        for (let i = 0; i < this.accordion.length; i++) {
          if (this.accordion[i] !== accordionContent) {
            this.accordion[i].status = false;
          }
        }
      }
    }
  },
  watch: {
    accordionData: {
      handler() {
        if (typeof this.accordionData === 'number') {
          this.accordion = []
          for (let i = 0; i < this.accordionData; i++) {
            this.accordion.push({status: false})
          }
        } else {
          // create copy of given data and assign to data-property
          this.accordion = JSON.parse(JSON.stringify(this.accordionData))
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss">
/* begin cmd-accordion ---------------------------------------------------------------------------------------- */
.cmd-accordion {
  margin-bottom: var(--default-margin);

  > a {
    display: flex;
    align-items: center;
    gap: var(--grid-gap);
    border-radius: var(--border-radius);
    margin: var(--default-margin) 0 0 0;
    padding: calc(var(--default-padding) / 2) var(--default-padding);
    border: var(--default-border);
    background: var(--default-background-color);
    text-decoration: none;

    &:hover, &:active, &:focus, &.active {
      background: var(--primary-color);
      border-color: var(--primary-color);

      & + .accordion-content {
        border-color: var(--primary-color);
      }

      > * {
        color: var(--pure-white);
      }
    }

    &:first-child {
      margin: 0;
    }

    > h2, > h3, > h4, > h5, > h6 {
      margin-bottom: 0;
    }

    label, .label {
      margin-top: 0;
    }

    & + .accordion-content {
      border-top: 0;
    }

    > span {
      font-size: inherit;

      &[class*="icon-"] {
        margin-left: auto;
        font-size: 1rem;
      }
    }
  }

  .accordion-content {
    padding: var(--default-padding);
    border: var(--default-border);
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
    background: var(--pure-white);

    &.active {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    > *:last-child {
      margin-bottom: 0;
    }
  }
}
/* end cmd-accordion ------------------------------------------------------------------------------------------ */
</style>