<script setup>
import {ref} from "vue"
import {tabProps, tabHandlers} from "../tabs"
import CmdFormFilters from "../../components/CmdFormFilters"
import CmdFakeSelect from "../../components/CmdFakeSelect"
import ComponentProperties from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
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


const filterValues = ref(fakeSelectFilterOptions.map(option => option.value))
const fakeSelectFilters = ref([])

</script>

<template>
    <CmdTabs v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <div class="flex-container">
                <div>
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
                                   :selectData="fakeSelectFilterOptions"
                                   v-model:value="fakeSelectFilters"
                                   defaultOptionName="Filters:"
                                   id="selectbox-with-filters"
                                   type="checkboxOptions"
                                   :useCustomTooltip="true"
                    />
                </div>
                <div>
                    <h3>Code</h3>
                    <ComponentCode :code="CmdCode"/>
                </div>
                <div>
                    <h3>Data</h3>
                    <ComponentCode :code="fakeSelectFilterOptions" language="json"/>
                </div>
            </div>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdFormFilters.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>