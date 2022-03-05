<script setup>

import {tabProps, tabHandlers} from "../tabs"
import CmdImageZoom from "../../components/CmdImageZoom"
import ComponentProperties from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdImageZoomHelp"
import propertyDescriptions from "../generated/CmdImageZoomPropertyDescriptions"




</script>

<template>
    <CmdTabs v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
           <div class="flex-container">
                <div>
                    <h3>View</h3>
                    <CmdImageZoom
                        small-image-url="media/images/content-images/logo-business-edition-landscape.jpg"
                        large-image-url="media/images/content-images/logo-business-edition-landscape-large.jpg"
                    />
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
            <ComponentProperties :properties="CmdImageZoom.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>