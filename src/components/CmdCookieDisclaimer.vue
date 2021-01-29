<template>
   <transition name="fade">
        <div class="cmd-cookie-disclaimer" v-if="showCookieDisclaimer">
            <h2 v-if="headline">{{ headline }}</h2>
            <slot name="cookie-options">
                <div v-if="cookieOptions.required">
                   <h6>{{ cookieOptions.required.headline }}</h6>
                   <div v-for="(cookie, index) in cookieOptions.required.cookies" :key="index">
                        <CmdFormElement
                            element="input"
                            type="checkbox"
                            :id="cookie.id"
                            :labelText="cookie.labelText"
                            v-model="cookie.checked"
                            :status="cookie.status"
                        />
                        <p>{{ cookie.description }}</p>
                   </div>
                </div>
                  <div v-if="cookieOptions.optional">
                      <h6>{{ cookieOptions.optional.headline }}</h6>
                      <div v-for="(cookie, index) in cookieOptions.optional.cookies" :key="index">
                        <CmdFormElement
                                element="input"
                                type="checkbox"
                                :id="cookie.id"
                                :labelText="cookie.labelText"
                                v-model="cookie.checked"
                                :status="cookie.status"
                        />
                        <p>{{ cookie.description }}</p>
                    </div>
                </div>
            </slot>
            <slot name="privacy-text">
            </slot>
            <button type="button" @click="acceptCookies('allCookies')" v-if="buttonLabelAcceptAllCookies">{{ buttonLabelAcceptAllCookies }}</button>
            <button type="button" @click="acceptCookies('currentSettings')" v-if="buttonLabelAcceptCurrentSettings">{{ buttonLabelAcceptCurrentSettings }}</button>
        </div>
   </transition>
</template>

<script>
import CmdFormElement from "@/components/CmdFormElement.vue";

export default {
    name: "CmdCookieDisclaimer",
    components: {
        CmdFormElement
    },
    data () {
      return {
          showCookieDisclaimer: true
      }
    },
    props: {
        headline: {
            type: String,
            required: false
        },
        cookieOptions: {
            type: Array,
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
        acceptCookies (cookies) {
            this.$emit(cookies)
            this.showCookieDislaimer = false
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-cookie-disclaimer --------------------------------------------------------------------------------------------------------------------------------------------------- */
.cmd-cookie-disclaimer {
    width: 100%;
    padding: var(--default-padding);
    padding-right: calc(var(--default-padding)* 2);
    text-align: center;
    z-index: 100; /* bring layer above logo */
    bottom: 0;
    top: auto;

    .button {
        margin: 0 auto;
    }

    #form-cookies {
        margin-bottom: var(--default-margin);
    }
}
/* end cmd-cookie-disclaimer --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>