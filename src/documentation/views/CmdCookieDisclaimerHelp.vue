<script setup>
// import functions
import {tabProps, tabHandlers} from "../tabs"
import {isFrameMode} from "../../utils/common"

// import components
import CmdCookieDisclaimer from "../../components/CmdCookieDisclaimer"
import ComponentProperties from "../components/ComponentProperties"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"
import ExampleSectionWrapper from "../components/ExampleSectionWrapper"

// import example-data
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
            <h2>Component</h2>
            <ExampleSectionWrapper componentName="CmdCookieDisclaimer" headlineText="Cookie Disclaimer">
                <ViewCodeData :isFirstComponent="true" :code="CmdCode[0]" :data="cookieDisclaimer">
                    <teleport to="#frame-component-target" :disabled="!isFrameMode()">
                        <CmdCookieDisclaimer
                            :cmdCustomHeadline="{headlineText: 'Usage of cookies on this web site', headlineLevel: 3}"
                            :cookieOptions="cookieDisclaimer"
                            buttonLabelAcceptAllCookies="Accept all cookies"
                            buttonLabelAcceptCurrentSettings="Accept current settings"
                            @closeCookieDisclaimer="fancyBoxCookieDisclaimer = false"
                        />
                    </teleport>
                </ViewCodeData>
            </ExampleSectionWrapper>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdCookieDisclaimer.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>