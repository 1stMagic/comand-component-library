<script setup>
import {ref} from "vue"
import {tabProps, tabHandlers} from "../tabs"
import CmdSlideButton from "../../components/CmdSlideButton"
import ComponentProperties from "../components/ComponentProperties"
import {isFrameMode} from "../../utils/common"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdSlideButtonHelp"
import propertyDescriptions from "../generated/CmdSlideButtonPropertyDescriptions"

const propertyStructures = {
    slideButtons: {
        prev: {
            iconClass: "<string>",
            tooltip: "<string>"
        },
        next: {
            iconClass: "<string>",
            tooltip: "<string>"
        }
    }
}

const currentItem = ref(1)
const totalItems = 4

function showPrevItem() {
    if(currentItem.value === 1) {
        currentItem.value = totalItems
    } else {
        currentItem.value--
    }
}

function showNextItem() {
    if(currentItem.value === totalItems) {
        currentItem.value = 1
    } else {
        currentItem.value++
    }
}
</script>

<template>
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <ViewCodeData :isFirstComponent="true" :code="CmdCode">
                <teleport to="#frameComponentTarget" :disabled="!isFrameMode()">
                    <div class="flex-container" id="slider">
                        <CmdSlideButton @click.prevent="showPrevItem" slideButtonType="prev"/>
                        <p>Content {{ currentItem }}</p>
                        <CmdSlideButton @click.prevent="showNextItem" slideButtonType="next"/>
                    </div>
                </teleport>
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdSlideButton.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>

<style lang="scss" scoped>
.cmd-slide-button {
    &.button {
        position: relative;
    }
}

#slider {
    align-items: center;
    border: var(--default-border);
    border-style: dotted;

    p {
        margin: 0;
        text-align: center;
    }
}
</style>