<template>
   <transition name="fade">
        <div class="cmd-cookie-disclaimer" v-if="showCookieDisclaimer">
            <h2 v-if="headline">{{ headline }}</h2>
            <slot name="cookie-options">
                <div v-if="cookieOptions.required">
                    <h2>{{ cookieOptions.required.headline }}</h2>
                    <CmdAccordion :accordion-data="cookieOptions.required.cookies.length">

                   <template v-for="(cookie, index) in cookieOptions.required.cookies" v-slot:[`accordion-headline-${index}`]>
                            <CmdFormElement
                                    element="input"
                                    type="checkbox"
                                    :id="cookie.id"
                                    :labelText="cookie.labelText"
                                    v-model="cookie.checked"
                                    :status="cookie.status"
                                    :key="index"
                            />

                   </template>
                    <template v-for="(cookie, index) in cookieOptions.required.cookies" v-slot:[`accordion-content-${index}`]>
                        <p :key="index">{{ cookie.description }}</p>
                    </template>
                    </CmdAccordion>
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
import CmdAccordion from "./CmdAccordion";

export default {
    name: "CmdCookieDisclaimer",
    components: {
        CmdAccordion,
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
        acceptCookies (cookies) {
            this.$emit(cookies)
            this.showCookieDislaimer = false
        },
        test(x) {
            return 'accordion-headline' + x
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