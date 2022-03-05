<script setup>

import {tabProps, tabHandlers} from "../tabs"
import CmdWidthLimitationWrapper from "../../components/CmdWidthLimitationWrapper"
import ComponentProperties from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdWidthLimitationWrapperHelp"
import propertyDescriptions from "../generated/CmdWidthLimitationWrapperPropertyDescriptions"




</script>

<template>
    <CmdTabs v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <div class="flex-container">
                <div>
                    <h3>View</h3>
                    <CmdWidthLimitationWrapper>
                        <!-- begin slot-content -->
                        Content
                        <!-- end slot-content -->
                    </CmdWidthLimitationWrapper>
                </div>
                <div>
                    <h3>Code</h3>
                    <ComponentCode :code="CmdCode"/>
                </div>
                <div>
                    <h3>Data</h3>
                </div>
            </div>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdWidthLimitationWrapper.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>

<style lang="scss">
.cmd-width-limitation-wrapper {
    border: var(--default-border);
    border-style: dotted;

    > section {
        border: inherit;
    }
}
</style>