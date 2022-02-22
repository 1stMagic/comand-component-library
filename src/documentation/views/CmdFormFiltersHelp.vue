<script setup>
import {defineProps, ref} from "vue"
import commonProps from "../commonProps"
import CmdFormFilters from "../../components/CmdFormFilters"
import CmdFakeSelect from "../../components/CmdFakeSelect"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdFormFiltersHelp"
import fakeSelectFilterOptionsData from '../../assets/data/fake-select-filter-options'
import propertyDescriptions from "../generated/CmdFormFiltersPropertyDescriptions"

function getOptionName(option) {
    for (let i = 0; i < fakeSelectFilterOptionsData.length; i++) {
        if (option === fakeSelectFilterOptionsData[i].value) {
            return fakeSelectFilterOptionsData[i].text
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

const props = defineProps(commonProps)
const filterValues = ref(fakeSelectFilterOptionsData.map(option => option.value ))
const fakeSelectFilters = ref([])
const tabs = [{name: 'View'}, {name: 'Usage'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
            <h3>View</h3>
            <CmdFormFilters
                v-model:selectedOptions="filterValues"
                :selectedOptionsName="getOptionName"
            />
            <CmdFormFilters
                v-model:selectedOptions="fakeSelectFilters"
                :selectedOptionsName="getOptionName"
            />
            <CmdFakeSelect labelText="Selectbox with filters:"
                           :selectData="fakeSelectFilterOptionsData"
                           v-model:value="fakeSelectFilters"
                           defaultOptionName="Filters:"
                           id="selectbox-with-filters"
                           type="checkboxOptions"
                           :useCustomTooltip="true"
            />
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre>{{ CmdCode }}</pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdFormFilters.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>