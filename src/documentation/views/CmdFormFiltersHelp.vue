<script setup>
import {ref} from "vue"
import {tabProps, tabHandlers} from "../tabs"
import CmdFormFilters from "../../components/CmdFormFilters"
import CmdFakeSelect from "../../components/CmdFakeSelect"
import ComponentProperties from "../components/ComponentProperties"
import {isFrameMode} from "../../utils/common"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdFormFiltersHelp"
import fakeSelectFilterOptions from '../../assets/data/fake-select-filter-options'
import propertyDescriptions from "../generated/CmdFormFiltersPropertyDescriptions"

function getOptionName(option) {
    for (let i = 0; i < fakeSelectFilterOptions.length; i++) {
        if (option === fakeSelectFilterOptions[i].value) {
            return fakeSelectFilterOptions[i].text
        }
    }
    return null
}

const propertyStructures = {
    selectedOptions: [
        {
            "text": "<string>",
            "value": "<string>"
        }
    ]
}

const fakeSelectFilters = ref([])
</script>

<template>
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <ViewCodeData :isFirstComponent="true" :code="CmdCode">
                <teleport to="#frameComponentTarget" :disabled="!isFrameMode()">
                    <CmdFormFilters
                        v-model="fakeSelectFilters"
                        :selectedOptionsName="getOptionName"
                    />
                    <CmdFakeSelect labelText="Selectbox with filters:"
                                   :selectData="fakeSelectFilterOptions"
                                   v-model="fakeSelectFilters"
                                   defaultOptionName="Filters:"
                                   id="selectbox-with-filters"
                                   type="checkboxOptions"
                                   :useCustomTooltip="true"
                    />
                </teleport>
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdFormFilters.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>