<script setup>

import {tabProps, tabHandlers} from "../tabs"
import CmdCookieDisclaimer from "../../components/CmdCookieDisclaimer"
import ComponentProperties from "../components/ComponentProperties"
import {isFrameMode} from "../../utils/common"
import ViewCodeData from "../components/ViewCodeData"
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
</script>

<template>
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <ViewCodeData :isFirstComponent="true" :code="CmdCode" :data="cookieDisclaimer">
                <teleport to="#frameComponentTarget" :disabled="!isFrameMode()">
                    <CmdCookieDisclaimer
                         :cmdCustomHeadline="{text: 'Usage of cookies on this web site', level: '2'}"
                         :cookieOptions="cookieDisclaimer"
                         buttonLabelAcceptAllCookies="Accept all cookies"
                         buttonLabelAcceptCurrentSettings="Accept current settings"
                         @closeCookieDisclaimer="fancyBoxCookieDisclaimer = false"
                    />
                </teleport>
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdCookieDisclaimer.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>