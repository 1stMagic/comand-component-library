<template>
  <label :class="status">
    <span>Label for FakeSelect:</span>
    <ul class="select" v-click-outside="closeOptions" :class="status">
      <li>
        <a href="#" @click.prevent="toggleOptions">
          <span v-if="type == 'country' && miscInfo" class="flag" :class="miscInfo"></span>
          <span v-else-if="type == 'color' && miscInfo" class="color" :style="'background: ' + miscInfo"></span>
          <span>{{ optionName }}</span>
          <span class="icon-single_arrow_down"></span>
        </a>
        <ul v-if="type == 'filterList' && showOptions">
          <li v-for="(option, index) in selectData" :key="index">
            <label :for="'option_' + (index + 1)">
              <input type="checkbox" :value="option.optionValue" @change="optionSelect" :checked="value.includes(`${option.optionValue}`)" :id="'option_' + (index + 1)" />
              <span>{{ option.optionName }}</span>
            </label>
          </li>
        </ul>
        <ul v-else-if="type == 'country' && showOptions">
          <li v-for="(country, index) in selectData" :key="index">
            <a href="#" @click.prevent="selectOption(country.countryName, country.isoCode)">
              <span class="flag" :class="country.isoCode"></span><span>{{country.countryName}}</span>
            </a>
          </li>
        </ul>
        <ul v-else-if="type == 'color' && showOptions">
          <li v-for="(color, index) in selectData" :key="index">
            <a href="#" @click.prevent="selectOption(color.colorName, color.hexCode)">
              <span class="color" :style="'background: ' + color.hexCode"></span><span>{{ color.colorName }}</span>
            </a>
          </li>
        </ul>
        <template v-else-if="!type && showOptions">
          <slot></slot>
        </template>
      </li>
    </ul>
  </label>
</template>

<script>
export default {
  name: 'fakeSelect',
  props: {
    type: {
      type: String,
      required: false
    },
    value: {
      type: [String, Array],
      required: false
    },
    defaultOptionName: {
      type: String,
      required: false
    },
    selectData: {
      type: Array,
      required: true
    },
    status: {
      type: String,
      required: false
    }
  },
  methods: {
    toggleOptions () {
      if(this.status != 'disabled') {
        this.showOptions = !this.showOptions
      }
    },
    optionSelect (event) {
      let value = [...this.value] // copy array from props
      if(event.target.checked) {
        value.push(event.target.value); // attention: value will be transformed into string!
      } else {
        value = value.filter(v => v !== event.target.value);
      }
      this.$emit('input', value);
    },

    selectOption (optionName, miscInfo) {
      this.optionName = optionName
      this.miscInfo = miscInfo
      this.showOptions = false
      this.$emit('input', miscInfo);
    },

    closeOptions() {
      this.showOptions = false
    }
  },
  data () {
    return {
      showOptions: false,
      optionName: this.defaultOptionName,
      miscInfo: ""
    }
  },
  created () {
    for(let i = 0; i < this.selectData.length; i++) {
      let currentEntry = this.selectData[i]
      if(this.type == 'country' && this.value == currentEntry.isoCode){
        this.optionName = currentEntry.countryName
        this.miscInfo = currentEntry.isoCode
      } else if (this.type == 'color' && this.value == currentEntry.hexCode) {
        this.optionName = currentEntry.colorName
        this.miscInfo = currentEntry.hexCode
      }
    }
  }
}
</script>

<style scoped lang="scss">
/* begin replace_select --------------------------------------------------------------------------------------------------------------------------------------------------- */
.select {
  margin: 0;
  display: block;
  background: var(--blank-color); /* background(-gradient) for text-input-elements (w3c) */
  box-shadow: none;
  border-radius: var(--border-radius);
  min-width: 0;

  > li {
    &:first-child {
      > a {
        [class*='icon-'] {
          font-size: 1rem;
          margin-left: auto;
        }
      }
    }
  }

  li {
    margin-left: 0;
    list-style: none;

    a, a:visited {
      display: flex;
      align-items: center;
      border-bottom: var(--default-border);
      color: var(--text-color);
      padding: .7rem;
      padding-top: .8rem;
      border: var(--default-border);
      text-decoration: none;
      outline: none;

      span {
        &:first-child, &:nth-child(2) {
          border: 0;
        }
      }

      &:hover, &:active, &:focus {
        background: var(--primary-color);

        span {
          color: var(--pure-white);
        }
      }
    }

    ul {
      position: absolute;
      list-style: none;
      z-index: 10;
      width: 100%;
      margin-left: 0;
      background: var(--blank-color);
      border: var(--primary-border);
      border-bottom-right-radius: var(--border-radius);
      border-bottom-left-radius: var(--border-radius);
    }
  }

  &.error {
    background: var(--error-background);

    > li > a {
      border-color: var(--error-color);

      > span, span[class*="icon-"] {
        color: var(--error-color);
      }

      &:hover, &:active, &:focus {
        border: var(--primary-border);

        span {
          color: var(--text-color);
        }
      }
    }
  }

  &.disabled {
    border-color: var(--disabled-color);
    background: var(--disabled-background);
    color: var(--disabled-color);

    a {
      &:hover, &:active, &:focus {
        cursor: not-allowed;
      }
    }
  }
}
/* end replace_select --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>
