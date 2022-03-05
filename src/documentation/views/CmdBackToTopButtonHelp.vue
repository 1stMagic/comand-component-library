<script setup>
import {ref, onMounted} from "vue"
import {tabProps, tabHandlers} from "../tabs"
import CmdBackToTopButton from "../../components/CmdBackToTopButton"
import ComponentProperties from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
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
    <CmdTabs v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
           <div class="flex-container">
                <div>
                    <h3>View</h3>
                    <CmdBackToTopButton id="view-component" ref="backToTop" />
                </div>
                <div>
                    <h3>Code</h3>
                    <ComponentCode :code="CmdCode" />
                </div>
                <div>
                    <h3>Data</h3>

                </div>
            </div>
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