<template>
  <transition name="fade">
    <div
      class="system-message"
      :class="[{ 'full-width': fullWidth }, messageStatus]"
      role="alert"
      v-if="showSystemMessage"
    >
      <a
        :class="closeIcon.iconClass"
        href="#"
        @click.prevent="showSystemMessage = false"
        :title="closeIcon.tooltip"
        v-if="closeIcon.iconClass"
      ></a>
      <h6>
        <span :class="iconClass" v-if="iconClass"></span>
        <strong v-if="systemMessage">{{ systemMessage }}</strong>
      </h6>
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: "CmdSystemMessage",
  data() {
    return {
      showSystemMessage: true
    }
  },
  props: {
    messageStatus: {
      type: String,
      required: true
    },
    fullWidth: {
      type: Boolean,
      default: true
    },
    iconClass: {
      type: String,
      default: "icon-warning"
    },
    systemMessage: {
      type: String,
      required: true
    },
    closeIcon: {
      type: Object,
      default: function() {
        return {
          iconClass: "icon-cancel",
          tooltip: "Close"
        }
      }
    }
  },
  watch: {
    systemMessage () {
      this.showSystemMessage = true
    }
  }
}
</script>

<style lang="scss">
/* begin cmd-system-message --------------------------------------------------------------------------------------------------------------------------------------------------- */
.system-message {
  margin: var(--default-margin) 0;

  h6 {
    display: table;
    margin: 0 auto var(--default-margin) auto;

    strong {
      margin-left: calc(var(--default-margin) / 2);
    }
  }

  > :last-child {
    margin-bottom: 0;
  }

    > a[class*="icon-"]:not(.button) {
        font-size: 1rem;
        padding: 0;
        position: absolute;
        right: 0.5rem;
        text-decoration: none;
        top: 0.5rem;
    }
}
/* end cmd-system-message --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>
