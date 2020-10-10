<template>
  <label v-if="(element === 'input' || element === 'select' || element === 'textarea') && $attrs.type !== 'search'"
         :for="id"
         :class="[status, {'inline' : displayinline, 'checked': isChecked }]">
    <!-- begin label (+ required) -->
    <span v-if="labelText && $attrs.type !== 'checkbox' && $attrs.type !== 'radio'">
      {{ labelText }}<sup v-if="$attrs.required">*</sup>
    </span>
    <!-- end label (+ required) -->

    <!-- begin icon -->
    <span v-if="$attrs.type !== 'checkbox' && $attrs.type !== 'radio' && iconClass" class="place-inside" :class="[status, iconClass]"></span>
    <!-- end icon -->

    <!-- begin inputfield -->
    <template v-if="element === 'input' && $attrs.type !== 'checkbox' && $attrs.type !== 'radio'">
      <input v-bind="$attrs"
             :id="id" :class="[htmlClass, status]"
             @focus="tooltip = true"
             @blur="tooltip = false"
             @input="onInput"
             :disabled="status === 'disabled'"
      />
    </template>
    <!-- end inputfield -->

    <!-- begin checkbox and radiobutton -->
    <template v-else-if="element === 'input' && ($attrs.type === 'checkbox' || $attrs.type === 'radio')">
      <input v-bind="$attrs"
             @change="onChange"
             :checked="isChecked"
             :value="inputValue"
             :class="[htmlClass, status]"
             :id="id"
             :disabled="status === 'disabled'" />
      <span v-if="labelText" class="label">{{ labelText }}</span>
      <slot v-else></slot><sup v-if="$attrs.required">*</sup>
    </template>
    <!-- end checkbox and radiobutton -->

    <!-- begin selectbox -->
    <select v-if="element === 'select'"
            v-bind="$attrs"
            :class="[htmlClass, status]"
            :id="id"
            :disabled="status === 'disabled'"
            @change="$emit('input', $event.target.value)"
    >
      <option v-for="(option, index) in selectOptions" :key="index" :value="option.value" :selected="option.selected">{{ option.text }}</option>
    </select>
    <!-- end selectbox -->

    <!-- begin textarea -->
    <textarea v-if="element === 'textarea'"
              v-bind="$attrs"
              :class="[htmlClass, status]"
              :id="id"
              @input="onInput"
              @focus="tooltip = true"
              @blur="tooltip = false">
    </textarea>
    <!-- end textarea -->

    <!-- begin tooltip -->
    <Tooltip v-if="tooltip && tooltipText" :tooltipText="tooltipText" />
    <!-- end tooltip -->

    <!-- begin searchfield -->
    <span v-else-if="element === 'input' && $attrs.type === 'search'" class="input-wrapper">
      <input v-bind="$attrs" :class="status" :id="id" @input="onInput" :value="value" />
      <button type="button" class="icon-search"></button>
    </span>
    <!-- begin searchfield -->
  </label>

  <!-- begin button -->
  <button v-else v-bind="$attrs" @click="$emit('click', $event)">
    <span v-if="buttonIcon.iconPosition === 'before'" :class="buttonIcon.iconClass"></span>
    <span v-if="buttonIcon.iconPosition">{{ buttonText }}</span>
    <template v-else>
      {{ buttonText }}
    </template>
    <span v-if="buttonIcon.iconPosition === 'after'" :class="buttonIcon.iconClass"></span>
  </button>
  <!-- begin button -->
</template>

<script>
import Tooltip  from '@/components/Tooltip.vue'

export default {
  inheritAttrs: false,
  name: "FormElement",
  components: {
    Tooltip
  },
  data () {
    return {
      tooltip: false
    }
  },
  props: {
    value: {
      type: [String, Boolean, Array],
      required: false,
      default: ""
    },
    element: {
      type: String,
      validator(value) {
        return value === "input" ||
                value === "select" ||
                value === "textarea" ||
                value === "button";
      },
      required: true
    },
    labelText: {
      type: String,
      required: false
    },
    inputValue: {
      /* allow checkbox/radiobuttons to get value from outside */
      type: String,
      required: false
    },
    htmlClass: {
      /* may not be named as 'class' because it is a reserved keyword in JavaScript */
      type: String,
      required: false
    },
    id: {
      type: String,
      required: false
    },
    selectOptions: {
      type: Array,
      required: false
    },
    buttonText: {
      type: String,
      required: false
    },
    buttonIcon: {
      type: Object,
      default() {
        return {}
      }
    },
    tooltipText: {
      type: String,
      required: false
    },
    iconClass: {
      type: String,
      required: false
    },
    displayinline: {
      type: Boolean,
      required: false
    },
    status: {
      type: String,
      required: false
    }
  },
  computed: {
    isChecked() {
      if (typeof this.value === "boolean") {
        return this.value
      }
      if (typeof this.value === "string") {
        return this.value === this.inputValue
      }
      if (this.value !== undefined) {
        return this.value.includes(this.inputValue)
      }
      return false
    }
  },
  methods: {
    onChange(e) {
      if (typeof this.value === "boolean") {
        this.$emit("input", e.target.checked)
      } else if (typeof this.value === "string") {
        this.$emit("input", e.target.value)
      } else if (this.value !== undefined) {
        let values = [...this.value]
        if (e.target.checked) {
          values.push(e.target.value)
        } else {
          values = values.filter(value => value !== e.target.value)
        }
        this.$emit("input", values)
      }
    },
    onInput(e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style lang="scss">
/* begin form-element --------------------------------------------------------------------------------------------------------------------------------------------------- */
input, select, .select, textarea {
  &.error + .tooltip {
    border-color: var(--error-color);
    color: var(--error-color);
    background: #fff3f3;
  }
}

label {
  &.checked {
    span {
      color: var(--primary-color);
    }
  }
}
/* end form-element --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>
