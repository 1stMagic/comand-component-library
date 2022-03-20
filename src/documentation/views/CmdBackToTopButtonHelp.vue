<script setup>
import {ref, onMounted} from "vue"
import {tabProps, tabHandlers} from "../tabs"
import CmdBackToTopButton from "../../components/CmdBackToTopButton"
import ComponentProperties from "../components/ComponentProperties"
import {isFrameMode} from "../../utils/common"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdBackToTopButtonHelp"
import propertyDescriptions from "../generated/CmdBackToTopButtonPropertyDescriptions"

const propertyStructures = {
    iconBackToTop: {
        "iconBackToTop": {
            "iconClass": "<string>",
            "tooltip": "<number>"
        }
    }
}

const backToTop = ref(null)
onMounted(() => {
    backToTop.value.windowScrollY = 1
    backToTop.value.windowInnerHeight = 0
    backToTop.value.bodyScrollHeight = 1
    window.removeEventListener('resize', backToTop.value.onViewportChange);
    window.removeEventListener('scroll', backToTop.value.onViewportChange);
})
</script>

<template>
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <h2>Component</h2>
            <ViewCodeData :isFirstComponent="true" :code="CmdCode">
                <teleport to="#frameComponentTarget" :disabled="!isFrameMode()">
                    <CmdBackToTopButton id="view-component" ref="backToTop" />
                </teleport>
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdBackToTopButton.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>

<style lang="scss">
#view-component {
    position: relative;
    bottom: auto;
    left: 0;
    right: auto;
}
</style>