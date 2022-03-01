<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdCookieDisclaimer from "../../components/CmdCookieDisclaimer"
import ComponentProperties from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
import CmdTabs from "../../components/CmdTabs"
import cookieDisclaimer from '../../assets/data/cookie-disclaimer'
import CmdCode from "../data/CmdCookieDisclaimerHelp"
import propertyDescriptions from "../generated/CmdCookieDisclaimerPropertyDescriptions"

const propertyStructures = {
    cookieOptions: {
        "required": {
            "headline": "<string>",
            "cookies": [
                {
                    "id": "<string>",
                    "description": "<string>",
                    "labelText": "<string>",
                    "checked": "<boolean>",
                    "status": "<string>",
                    "linkDataPrivacy": {
                        "label": "<string>",
                        "link": "<string>",
                        "linkText": "<string>"
                    }
                },
                {
                    "id": "<string>",
                    "description": "<string>",
                    "labelText": "<string>",
                    "checked": "<boolean>",
                    "status": "<string>",
                    "linkDataPrivacy": {
                        "label": "<string>",
                        "link": "<string>",
                        "target": "<string>",
                        "linkText": "<string>"
                    }
                }
            ]
        },
        "optional": {
            "headline": "Optional cookies",
            "cookies": [
                {
                    "id": "<string>",
                    "description": "<string>",
                    "labelText": "<string>",
                    "checked": "<boolean>",
                    "linkDataPrivacy": {
                        "label": "<string>",
                        "link": "<string>",
                        "target": "<string>",
                        "linkText": "<string>"
                    }
                },
                {
                    "id": "<string>",
                    "description": "<string>",
                    "labelText": "<string>",
                    "checked": "<boolean>",
                    "linkDataPrivacy": {
                        "label": "<string>",
                        "link": "<string>",
                        "target": "<string>",
                        "linkText": "<string>"
                    }
                }
            ]
        }
    }
}

const props = defineProps(commonProps)

const tabs = [{name: 'View'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
           <div class="flex-container">
                <div>
                    <h3>View</h3>
                    <CmdCookieDisclaimer
                         :cmdCustomHeadline="{text: 'Usage of cookies on this web site', level: '2'}"
                         :cookieOptions="cookieDisclaimer"
                         buttonLabelAcceptAllCookies="Accept all cookies"
                         buttonLabelAcceptCurrentSettings="Accept current settings"
                         @closeCookieDisclaimer="fancyBoxCookieDisclaimer = false"
                    />
                </div>
                <div>
                    <h3>Code</h3>
                    <ComponentCode :code="CmdCode"/>
                </div>
                <div>
                    <h3>Data</h3>
                    <ComponentCode :code="cookieDisclaimer" language="json"/>
                </div>
            </div>
        </template>

        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdCookieDisclaimer.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>