<template>
  <div :class="[status, 'cmd-select label']">
    <span>Label for FakeSelect:</span>
    <ul :class="{'open': showOptions}" @clickout="closeOptions">
      <li>
        <a href="#" @click.prevent="toggleOptions">
          <img v-if="type === 'country' && miscInfo" :src="flagPath" class="flag" :class="miscInfo"/>
          <span v-else-if="type === 'color' && miscInfo" class="color"
                :style="'background: ' + miscInfo"></span>
          <span>{{ optionName }}</span>
          <span :class="iconClass"></span>
        </a>
        <ul v-if="type === 'filterList' && showOptions" class="filter-list">
          <li v-for="(option, index) in selectData" :key="index">
            <label :for="'option-' + (index + 1)">
              <input type="checkbox" :value="option.optionValue" @change="optionSelect"
                     :checked="value.includes(`${option.optionValue}`)" :id="'option-' + (index + 1)"/>
              <span>{{ option.optionName }}</span>
            </label>
          </li>
        </ul>
        <ul v-else-if="type === 'country' && showOptions">
          <li v-for="(country, index) in selectData" :key="index">
            <a href="#"
               @click.prevent="selectOption(country.countryName, country.isoCode, country.flagPath)">
              <img class="flag" :src="country.flagPath"
                   :alt="country.countryName"/><span>{{ country.countryName }}</span>
            </a>
          </li>
        </ul>
        <ul v-else-if="type === 'color' && showOptions">
          <li v-for="(color, index) in selectData" :key="index">
            <a href="#" @click.prevent="selectOption(color.colorName, color.hexCode)">
              <span class="color" :style="'background: ' + color.hexCode"></span><span>{{
                color.colorName
              }}</span>
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
import "clickout-event"

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
    toggleOptions() {
      if (this.status !== 'disabled') {
        this.showOptions = !this.showOptions
      }
    },
    optionSelect(event) {
      let value = [...this.value] // copy array from props
      if (event.target.checked) {
        value.push(event.target.value); // attention: value will be transformed into string!
      } else {
        value = value.filter(v => v !== event.target.value);
      }
      this.$emit('update:value', value);
    },
    selectOption(optionName, miscInfo, flagPath) {
      this.optionName = optionName
      this.miscInfo = miscInfo
      this.flagPath = flagPath
      this.showOptions = false
      this.$emit('update:value', miscInfo);
    },
    closeOptions() {
      this.showOptions = false
    }
  },
  data() {
    return {
      showOptions: false,
      optionName: this.defaultOptionName,
      miscInfo: "",
      flagPath: ""
    }
  },
  created() {
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
/* begin cmd-fakeselect ------------------------------------------------------------------------------------------ */
@mixin disabled-styles {
  color: var(--disabled-color);
  border-color: var(--disabled-color);
  background: var(--disabled-background-color);
}

.select {

}

.cmd-select {
  > ul {
    margin: 0;
    display: block;
    min-width: 0;
    background: var(--pure-white);
    box-shadow: none;
    border-radius: var(--border-radius);

    > li {
      height: 100%;

      &:first-child {
        > a {
          height: inherit;
          border: var(--default-border);

          [class*='icon-'] {
            margin-left: auto;
            font-size: 1rem;
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
  }

  li {
    margin-left: 0;
    list-style: none;

    a, a:visited {
      display: flex;
      align-items: center;
      padding: .7rem;
      padding-top: .8rem;
      outline: none;
      border-bottom: var(--default-border);
      color: var(--text-color);
      text-decoration: none;

      &:hover, &:active, &:focus {
        background: var(--primary-color);

        span {
          color: var(--pure-white);
        }
      }

      span {
        &:first-child, &:nth-child(2) {
          border: 0;
        }
      }

      img {
        &.flag {
          margin: 0 calc(var(--default-margin) / 2) 0 0;
        }
      }
    }

    ul {
      position: absolute;
      list-style: none;
      z-index: 10;
      width: 100%;
      margin-left: 0;
      border-top: 0;
      border-bottom-right-radius: var(--border-radius);
      border-bottom-left-radius: var(--border-radius);
      background: var(--pure-white);
      border: var(--primary-border);
      border-top: 0;

      li {
        &:last-child {
          a {
            border-bottom: 0;
          }
        }
      }

      &.filter-list {
        li {
          padding: calc(var(--default-padding) / 2);
        }
      }
    }
  }

  &.error {
    > ul {
      > li {
        > a {
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
    }
  }

  &.disabled {
    > ul {
      > li {
        > a {
          @include disabled-styles;

          span {
            color: var(--disabled-color);
          }

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

  &.error, &.disabled {
    a {
      &:hover, &:focus, &:active {
        img {
          &.flag {
            border-color: var(--border-color);
          }
        }
      }
    }
  }
}
/* end cmd-fakeselect ------------------------------------------------------------------------------------------ */
</style>
