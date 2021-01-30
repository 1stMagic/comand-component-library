<template>
  <div class="label" :class="status">
    <span>Label for FakeSelect:</span>
    <ul class="select" :class="[status, {'open': showOptions}]" v-click-outside="closeOptions">
      <li>
        <a href="#" @click.prevent="toggleOptions">
          <img v-if="type === 'country' && miscInfo" :src="flagPath" class="flag" :class="miscInfo" />
          <span v-else-if="type === 'color' && miscInfo" class="color" :style="'background: ' + miscInfo"></span>
          <span>{{ optionName }}</span>
          <span :class="iconClass"></span>
        </a>
        <ul v-if="type === 'filterList' && showOptions">
          <li v-for="(option, index) in selectData" :key="index">
            <label :for="'option-' + (index + 1)">
              <input type="checkbox" :value="option.optionValue" @change="optionSelect" :checked="value.includes(`${option.optionValue}`)" :id="'option-' + (index + 1)" />
              <span>{{ option.optionName }}</span>
            </label>
          </li>
        </ul>
        <ul v-else-if="type === 'country' && showOptions">
          <li v-for="(country, index) in selectData" :key="index">
            <a href="#" @click.prevent="selectOption(country.countryName, country.isoCode, country.flagPath)">
              <img class="flag" :src="country.flagPath" :alt="country.countryName" /><span>{{country.countryName}}</span>
            </a>
          </li>
        </ul>
        <ul v-else-if="type === 'color' && showOptions">
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
  </div>
</template>

<script>
export default {
  name: 'CmdFakeSelect',
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
      required: false
    },
    status: {
      type: String,
      required: false
    },
    iconClass: {
      type: String,
      required: true
    }
  },
  methods: {
    toggleOptions () {
      if(this.status !== 'disabled') {
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

    selectOption (optionName, miscInfo, flagPath) {
      this.optionName = optionName
      this.miscInfo = miscInfo
      this.flagPath = flagPath
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
      miscInfo: "",
      flagPath: ""
    }
  },
  created () {
    if (this.selectData) {
      for (let i = 0; i < this.selectData.length; i++) {
        let currentEntry = this.selectData[i]
        if (this.type === 'country' && this.value === currentEntry.isoCode) {
          this.optionName = currentEntry.countryName
          this.miscInfo = currentEntry.isoCode
          this.flagPath = currentEntry.flagPath
        } else if (this.type === 'color' && this.value === currentEntry.hexCode) {
          this.optionName = currentEntry.colorName
          this.miscInfo = currentEntry.hexCode
        }
      }
    }
  }
}
</script>

<style lang="scss">
/* begin cmd-fakeselect --------------------------------------------------------------------------------------------------------------------------------------------------- */
.select {
  margin: 0;
  display: block;
  background: var(--pure-white); /* background(-gradient) for text-input-elements (w3c) */
  box-shadow: none;
  border-radius: var(--border-radius);
  min-width: 0;

  > li {
    &:first-child {
      > a {
        border: var(--default-border);

        [class*='icon-'] {
          font-size: 1rem;
          margin-left: auto;
        }
      }
    }
  }

  &.open {
    > li {
      &:first-child {
        > a {
          border-color: var(--primary-color);
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
      background: var(--pure-white);
      border: var(--primary-border);
      border-top: 0;
      border-bottom-right-radius: var(--border-radius);
      border-bottom-left-radius: var(--border-radius);

      li {
        &:last-child {
          a {
            border-bottom: 0;
          }
        }
      }
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
        border-color: var(--error-color);
        background: var(--error-background);

        span {
          color: var(--error-color);
        }
      }
    }
  }

  @mixin disabled-styles {
    color: var(--disabled-color);
    border-color: var(--disabled-color);
    background: var(--disabled-background-color);
  }

  &.disabled {
    li {
      a {
        @include disabled-styles;

        &:hover, &:active, &:focus {
          cursor: not-allowed;
          @include disabled-styles;

          span {
            color: var(--disabled-color);
          }
        }
      }
    }
  }
}
/* end cmd-fakeselect --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>
