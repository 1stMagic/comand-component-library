<template>
  <label v-if="(element == 'input' || element == 'select' || element == 'textarea') && inputType != 'search'" :for="id">
    <span v-if="labelText && (inputType != 'checkbox' && inputType != 'radio')">{{ labelText }}<sup v-if="optionalAttributes.required">*</sup></span>
    <template v-if="element == 'input' && (inputType != 'checkbox' && inputType != 'radio')">
      <input
             :type="inputType"
             :class="htmlClass"
             :id="id"
             :name="name"
             :placeholder="placeholderText"
             :autofocus="optionalAttributes.autofocus"
             :disabled="optionalAttributes.disabled"
             :max="optionalAttributes.max"
             :maxlength="optionalAttributes.maxlength"
             :min="optionalAttributes.min"
             :minlength="optionalAttributes.minlength"
             :pattern="optionalAttributes.pattern"
             :required="optionalAttributes.required"
             :step="optionalAttributes.step"
             :tabindex="optionalAttributes.tabindex"
             :value="value"
              @input="$emit('input', $event.target.value)" />
    </template>
    <template v-else-if="element == 'input' && (inputType == 'checkbox' || inputType == 'radio')">
      <input
        :type="inputType"
        :class="htmlClass"
        :id="id"
        :name="name"
        :autofocus="optionalAttributes.autofocus"
        :checked="isChecked"
        :disabled="optionalAttributes.disabled"
        :required="optionalAttributes.required"
        :tabindex="optionalAttributes.tabindex"
        :value="optionalAttributes.value"
        @change="onChange" />
      <span v-if="labelText">{{ labelText }}<sup v-if="optionalAttributes.required">*</sup></span>
    </template>
    <select v-if="element == 'select'"
            :class="htmlClass"
            :id="id"
            :name="id"
            :autofocus="optionalAttributes.autofocus"
            :disabled="optionalAttributes.disabled"
            :multiple="optionalAttributes.multiple"
            :pattern="optionalAttributes.pattern"
            :required="optionalAttributes.required"
            :tabindex="optionalAttributes.tabindex"
            :value="value"
            @change="$emit('input', $event.target.value)">
      <option v-for="(option, index) in selectOptions" :key="index" :value="option.value" :selected="option.selected">{{ option.text }}</option>
    </select>
    <textarea v-if="element == 'textarea'"
        :class="htmlClass"
        :id="id"
        :name="id"
        :placeholder="placeholderText"
        :autofocus="optionalAttributes.autofocus"
        :disabled="optionalAttributes.disabled"
        :maxlength="optionalAttributes.maxlength"
        :minlength="optionalAttributes.minlength"
        :pattern="optionalAttributes.pattern"
        :required="optionalAttributes.required"
        :tabindex="optionalAttributes.tabindex"
        :value="value"
        @input="$emit('input', $event.target.value)"></textarea>
  </label>
  <div v-else-if="element == 'input' && inputType == 'search'" class="input_wrapper">
    <input
      :type="inputType"
      :class="htmlClass"
      :id="id"
      :name="name"
      :placeholder="placeholderText"
      :autofocus="optionalAttributes.autofocus"
      :disabled="optionalAttributes.disabled"
      :max="optionalAttributes.max"
      :maxlength="optionalAttributes.maxlength"
      :min="optionalAttributes.min"
      :minlength="optionalAttributes.minlength"
      :pattern="optionalAttributes.pattern"
      :required="optionalAttributes.required"
      :tabindex="optionalAttributes.tabindex"
      :value="value"
      @input="$emit('input', $event.target.value)" />
    <button type="button" class="icon-search"></button>
  </div>

  <button v-else
          :type="inputType"
          :class="htmlClass"
          :id="id"
          :name="id"
          :autofocus="optionalAttributes.autofocus"
          :disabled="optionalAttributes.disabled"
          :tabindex="optionalAttributes.pattern"
          :value="optionalAttributes.value" @click="$emit('click', $event)">
    <span v-if="buttonIcon.iconPosition == 'before'" :class="buttonIcon.iconClass"></span>
    <span v-if="buttonIcon.iconPosition">{{ buttonText }}</span>
    <template v-else>
      {{ buttonText }}
    </template>
    <span v-if="buttonIcon.iconPosition == 'after'" :class="buttonIcon.iconClass"></span>
  </button>
</template>

<script>
export default {
  name: 'FormElement',
  props: {
    value: {
      type: [String, Array, Boolean],
      default: ''
    },
    element: {
      type: String,
      validator (value) {
        if (value === 'input' || value === 'select' || value === 'textarea' || value === 'button') {
          return true
        }
        return false
      },
      required: true
    },
    inputType: {
      type: String,
      default: 'text'
    },
    labelText: String,
    placeholderText: String,
    htmlClass: String, /* may not be named as 'class' because it is a reserved keyword in JavaScript */
    name: String, /* even if not necessary for submitting values by JavaScript based code (i.e. ajax), 'name' is at least required for 'input type="radio"' to identify related groups */
    id: String,
    optionalAttributes: {
      type: Object,
      default () {
        return {}
      }
    },
    selectOptions: Array,
    buttonText: String,
    buttonIcon: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    isChecked () {
      if (typeof this.value === 'boolean') {
        return this.value
      }
      if (typeof this.value === 'string') {
        return this.value === this.optionalAttributes.value
      }
      return this.value.includes(this.optionalAttributes.value)
    }
  },
  methods: {
    onChange (e) {
      if (typeof this.value === 'boolean') {
        this.$emit('input', e.target.checked)
      } else if (typeof this.value === 'string') {
        this.$emit('input', e.target.value)
      } else {
        let values = [...this.value]
        if (e.target.checked) {
          values.push(e.target.value)
        } else {
          values = values.filter(value => value !== e.target.value)
        }
        this.$emit('input', values)
      }
    }
  }
}
</script>
