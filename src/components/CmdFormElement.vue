<template>
  <label v-if="(element === 'input' || element === 'select' || element === 'textarea')"
         :for="id"
         :class="['cmd-form-element', status, {'inline' : displayinline, 'checked': isChecked}]"
         ref="label">
    <!-- begin label (+ required) -->
    <span v-if="labelText && $attrs.type !== 'checkbox' && $attrs.type !== 'radio'"
          :class="{'hidden': hideLabelText}">
      <span>{{ labelText }}</span><sup v-if="$attrs.required && !hideLabel">*</sup>
    </span>
    <!-- end label (+ required) -->

    <!-- begin icon -->
    <span v-if="$attrs.type !== 'checkbox' && $attrs.type !== 'radio' && iconClass" class="place-inside"
          :class="[status, iconClass]"></span>
    <!-- end icon -->

    <!-- begin inputfield -->
    <template
        v-if="element === 'input' && $attrs.type !== 'checkbox' && $attrs.type !== 'radio' && $attrs.type !== 'search'">
      <input v-bind="$attrs"
             :id="id" :class="htmlClass"
             @focus="tooltip = true"
             @blur="tooltip = false"
             @input="onInput"
             @mouseover="datalistFocus"
             @change="$emit('change', $event)"
             :autocomplete="datalist ? 'off' : 'on'"
             :list="datalist ? datalist.id : false"
             :disabled="status === 'disabled'"
      />
    </template>
    <!-- end inputfield -->

    <!-- begin datalist -->
    <template v-if="datalist && datalist.options.length">
      <datalist :id="datalist.id">
        <option v-for="(option, index) in datalist.options" :key="index" :value="option"></option>
      </datalist>
    </template>
    <!-- end datalist -->

    <!-- begin checkbox and radiobutton -->
    <template v-else-if="element === 'input' && ($attrs.type === 'checkbox' || $attrs.type === 'radio')">
      <input v-bind="$attrs"
             @change="onChange"
             :checked="isChecked"
             :value="inputValue"
             :id="id"
             :disabled="status === 'disabled'"/>
      <span v-if="labelText">{{ labelText }}</span>
      <slot v-else></slot>
      <sup v-if="$attrs.required">*</sup>
    </template>
    <!-- end checkbox and radiobutton -->

    <!-- begin selectbox -->
    <select v-if="element === 'select'"
            v-bind="$attrs"
            :id="id"
            :disabled="status === 'disabled'"
            @change="$emit('input', $event.target.value)"
    >
      <option v-for="(option, index) in selectOptions" :key="index" :value="option.value"
              :selected="option.selected">{{ option.text }}
      </option>
    </select>
    <!-- end selectbox -->

    <!-- begin textarea -->
    <textarea v-if="element === 'textarea'"
              v-bind="$attrs"
              :id="id"
              :disabled="status === 'disabled'"
              :value="value"
              @input="onInput"
              @focus="tooltip = true"
              @blur="tooltip = false">
    </textarea>
    <!-- end textarea -->

    <!-- begin tooltip -->
    <CmdTooltip v-if="tooltip && tooltipText" :tooltipText="tooltipText" />
    <!-- end tooltip -->

    <!-- begin searchfield -->
    <span v-else-if="element === 'input' && $attrs.type === 'search'" class="flex-container no-gap">
      <input v-bind="$attrs" :id="id" @input="onInput" :value="value"/>
      <button class="no-flex" type="button" :disabled="status === 'disabled'">
        <span class="icon-search"></span>
      </button>
    </span>
    <!-- end searchfield -->
  </label>

  <!-- begin button -->
  <button v-else class="button" v-bind="$attrs" @click="$emit('click', $event)" :disabled="status === 'disabled'">
    <span v-if="buttonIcon.iconPosition === 'before'" :class="buttonIcon.iconClass"></span>
    <span v-if="buttonIcon.iconPosition">{{ buttonText }}</span>
    <template v-else>
      {{ buttonText }}
    </template>
    <span v-if="buttonIcon.iconPosition === 'after'" :class="buttonIcon.iconClass"></span>
  </button>
  <!-- end button -->
</template>

<script>
import CmdTooltip from "./CmdTooltip";

export default {
  inheritAttrs: false,
  name: "FormElement",
  components: {
      CmdTooltip
  },
  data() {
    return {
      tooltip: false
    }
  },
  props: {
    value: {
      type: [String, Boolean, Array, Number],
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
    hideLabel: {
      type: Boolean,
      default: false
    },
    labelText: {
      type: String,
      required: false
    },
    hideLabelText: {
      type: Boolean,
      default: false
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
    datalist: {
      type: Object,
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
      if (typeof this.value === "number") {
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
        this.$emit("update:value", e.target.checked)
      } else if (typeof this.value === "string") {
        this.$emit("update:value", e.target.value)
      } else if (this.value !== undefined) {
        let values = [...this.value]
        if (e.target.checked) {
          values.push(e.target.value)
        } else {
          values = values.filter(value => value !== e.target.value)
        }
        this.$emit("update:value", values)
      }
    },
    datalistFocus() {
      /* corrects focus-bug for datalist in firefox */
      if (this.datalist) {
        this.$refs.label.focus()
      }
    },
    onInput(e) {
      this.$emit('update:value', e.target.value)
    }
  }
}
</script>
