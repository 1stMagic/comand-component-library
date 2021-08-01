<template>
  <transition name="fade">
    <div class="cmd-cookie-disclaimer" v-if="showCookieDisclaimer">
      <h1 v-if="headline">{{ headline }}</h1>
      <slot name="cookie-options">
        <div class="grid-container-two-fractions">
          <div v-if="cookieOptions.required">
            <h2>{{ cookieOptions.required.headline }}</h2>
            <CmdAccordion :accordion-data="cookieOptions.required.cookies.length">
              <template v-for="(cookie, index) in cookieOptions.required.cookies"
                        v-slot:[`accordion-headline-${index}`]
                        :key="index">
                <CmdSwitchButton
                    type="checkbox"
                    :id="cookie.id"
                    :labelText="cookie.labelText"
                    v-model="cookie.checked"
                    :status="cookie.status"
                    disabled="disabled"
                />
              </template>
              <template v-for="(cookie, index) in cookieOptions.required.cookies"
                        v-slot:[`accordion-content-${index}`]
                        :key="index">
                <p>{{ cookie.description }}</p>
                <p v-if="cookie.linkDataPrivacy">
                  {{ cookie.linkDataPrivacy.label }}
                  <a @click="openDataPrivacy" :href="cookie.linkDataPrivacy.link"
                     :target="cookie.linkDataPrivacy.target">{{ cookie.linkDataPrivacy.linkText }}</a>
                </p>
                <div v-if="dataPrivacyContent" v-html="dataPrivacyContent"></div>
              </template>
            </CmdAccordion>
          </div>
          <div v-if="cookieOptions.optional">
            <h2>{{ cookieOptions.optional.headline }}</h2>
            <CmdAccordion :accordion-data="cookieOptions.optional.cookies.length">
              <template v-for="(cookie, index) in cookieOptions.optional.cookies"
                        v-slot:[`accordion-headline-${index}`]
                        :key="index">
                <CmdSwitchButton
                    type="checkbox"
                    :id="cookie.id"
                    :labelText="cookie.labelText"
                    v-model="cookie.checked"
                    :status="cookie.status"
                />
              </template>
              <template v-for="(cookie, index) in cookieOptions.optional.cookies"
                        v-slot:[`accordion-content-${index}`]
                        :key="index">
                <p>{{ cookie.description }}</p>
                <p v-if="cookie.linkDataPrivacy">
                  {{ cookie.linkDataPrivacy.label }}
                  <a @click="openDataPrivacy" :href="cookie.linkDataPrivacy.link"
                     :target="cookie.linkDataPrivacy.target">{{ cookie.linkDataPrivacy.linkText }}</a>
                </p>
                <div v-if="dataPrivacyContent" v-html="dataPrivacyContent"></div>
              </template>
            </CmdAccordion>
          </div>
        </div>
      </slot>
      <slot name="privacy-text">
      </slot>
      <div class="button-wrapper align-center">
        <button type="button" @click="acceptCookies('currentSettings')" v-if="buttonLabelAcceptCurrentSettings">
          {{ buttonLabelAcceptCurrentSettings }}
        </button>
        <button type="button" class="primary" @click="acceptCookies('allCookies')"
                v-if="buttonLabelAcceptAllCookies">
          {{ buttonLabelAcceptAllCookies }}
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import CmdAccordion from "./CmdAccordion";
import CmdSwitchButton from "./CmdSwitchButton";

export default {
  name: "CmdCookieDisclaimer",
  components: {
    CmdAccordion,
    CmdSwitchButton
  },
  data() {
    return {
      showCookieDisclaimer: true,
      dataPrivacyContent: ""
    }
  },
  props: {
    headline: {
      type: String,
      required: false
    },
    cookieOptions: {
      type: Object,
      required: false
    },
    buttonLabelAcceptAllCookies: {
      type: String,
      default: "Alle Cookies akzeptieren!"
    },
    buttonLabelAcceptCurrentSettings: {
      type: String,
      default: "Aktuelle Einstellungen übernehmen!"
    }
  },
  methods: {
    acceptCookies(cookies) {
      this.$emit(cookies)
      this.showCookieDislaimer = false
    },
    openDataPrivacy(event) {
      /* first 'target' = clicked-element, second 'target' = target-attribute */
      if (!event.target.target) {
        event.preventDefault()
        fetch(event.target.href).then((response) =>
            response.text()
        ).then((content) => { /* use arrow function to get access to dataPrivacy by 'this' = vue-instance (otherwise 'this' wouldn't be vue-instance in this fethc-method */
          this.dataPrivacyContent = content
        })
      }
    }
  }
}
</script>

<style lang="scss">
/* begin cmd-cookie-disclaimer ---------------------------------------------------------------------------------------- */
.cmd-cookie-disclaimer {
  width: 100%;
  padding: var(--default-padding);
  padding-right: calc(var(--default-padding) * 2);
  z-index: 100; /* bring layer above logo */
  bottom: 0;
  top: auto;

  h1 {
    text-align: center;
  }

  .button {
    margin: 0 auto;
  }

  > p {
    text-align: center;
  }

  #form-cookies {
    margin-bottom: var(--default-margin);
  }

  .cmd-accordion {
    .accordion-headline {
      &:hover, &:active, &:focus {
        label, .label {
          span {
            color: var(--pure-white) !important;
          }
        }
      }

      .toggle-switch {
        display: flex;
      }
    }
  }

  p {
    a {
      text-decoration: underline;

      &:hover, &:active, &:focus {
        text-decoration: none;
      }
    }
  }
}
/* end cmd-cookie-disclaimer ------------------------------------------------------------------------------------------ */
</style>