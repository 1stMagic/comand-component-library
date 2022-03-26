<script setup>
// import functions
import {ref} from "vue"
import {tabProps, tabHandlers} from "../tabs"
import {isFrameMode} from "../../utils/common"

// import components
import CmdPager from "../../components/CmdPager"
import ComponentProperties from "../components/ComponentProperties"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"

// import example-data
import CmdCode from "../data/CmdPagerHelp"
import propertyDescriptions from "../generated/CmdPagerPropertyDescriptions"

const propertyStructures = {
    prevButton: {
        iconClass: "<string>",
        buttonText: "<string>"
    },
    nextButton: {
        iconClass: "<string>",
        buttonText: "<string>"
    }
}

const showPagePager = ref(1)
const totalNumberOfPages = 4

function changePage(event) {
    showPagePager.value = event
}
</script>

<template>
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <h2>Component</h2>
            <ViewCodeData :isFirstComponent="true" :code="CmdCode[0]">
                <teleport to="#frame-component-target" :disabled="!isFrameMode()">
                    <p>
                        Content: {{ showPagePager }} of {{ totalNumberOfPages }}
                    </p>
                    <CmdPager
                        :items="totalNumberOfPages"
                        :itemsPerPage="1"
                        @click="changePage"
                    />
                </teleport>
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdPager.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>