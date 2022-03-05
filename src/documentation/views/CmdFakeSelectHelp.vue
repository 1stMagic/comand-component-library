<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdFakeSelect from "../../components/CmdFakeSelect"
import ComponentProperties from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdFakeSelectHelp"
import fakeSelectOptions from "../../assets/data/fake-select-options"
import fakeSelectColors from '../../assets/data/fake-select-colors'
import fakeSelectCountries from '../../assets/data/fake-select-countries'
import fakeSelectFilterOptions from '../../assets/data/fake-select-filter-options'
import fakeSelectOptionsWithIcons from '../../assets/data/fake-select-options-with-icons'
import propertyDescriptions from "../generated/CmdFakeSelectPropertyDescriptions"

const propertyStructures = {
    dropdownIcon: {
        "iconClass": "<string>",
        "tooltip": "<string>"
    },
    selectData: [
        {
            "text": "<string>",
            "value": "<number>"
        }
    ]
}

const props = defineProps(commonProps)

const tabs = [{name: 'View'}, {name: 'Properties'}]

const fakeSelectDefault = ""
const fakeSelectDefaultWithIcons = "1"
const fakeSelectCheckbox = []
const fakeSelectFilters = []
const formElementStatus = ""
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
           <div class="flex-container">
                <div>
                    <h3>View</h3>
                    <CmdFakeSelect
                        labelText="Labeltext for selectbox:"
                        :status="formElementStatus"
                        :selectData="fakeSelectOptions"
                        v-model:value="fakeSelectDefault"
                        required
                        defaultOptionName="Select an option:"
                    />
                    <CmdFakeSelect labelText="Default selectbox with icons:"
                                   :status="formElementStatus"
                                   :selectData="fakeSelectOptionsWithIcons"
                                   v-model:value="fakeSelectDefaultWithIcons"
                                   defaultOptionName="Select an option:"
                    />
                    <CmdFakeSelect labelText="Selectbox with checkboxes:"
                                   :status="formElementStatus"
                                   :selectData="fakeSelectOptions"
                                   v-model:value="fakeSelectCheckbox"
                                   defaultOptionName="Options:"
                                   :required="true"
                                   id="selectbox-with-checkboxes"
                                   type="checkboxOptions"
                                   :useCustomTooltip="true"
                    />
                    <CmdFakeSelect labelText="Selectbox with filters:"
                                   :status="formElementStatus"
                                   :selectData="fakeSelectFilterOptions"
                                   v-model:value="fakeSelectFilters"
                                   defaultOptionName="Filters:"
                                   id="selectbox-with-filters"
                                   type="checkboxOptions"
                                   :useCustomTooltip="true"
                    />
                    <CmdFakeSelect labelText="Selectbox with slot-content:"
                                   :status="formElementStatus"
                                   type="content"
                                   defaultOptionName="HTML-Content:">
                        <ul class="custom-fake-select-content">
                            <li>
                                <div>
                                    <h3>Headline</h3>
                                    <p>Some content inside a paragraph</p>
                                </div>
                                <img src="media/images/thumbnail-scroller/thumbnail/logo-cmd-blue-landscape.jpg" alt="image"/>
                            </li>
                        </ul>
                    </CmdFakeSelect>
                    <CmdFakeSelect labelText="Selectbox with country flags:"
                                   :status="formElementStatus"
                                   :selectData="fakeSelectCountries"
                                   v-model:value="selectedCountry"
                                   defaultOptionName="Select country:"
                                   type="country"
                    />
                    <CmdFakeSelect labelText="Selectbox with colors:"
                                   :status="formElementStatus"
                                   :selectData="fakeSelectColors"
                                   v-model:value="selectedColor"
                                   required="required"
                                   type="color"
                    />
                </div>
                <div>
                    <h3>Code</h3>
                    <ComponentCode :code="CmdCode"/>
                </div>
                <div>
                    <h3>Data</h3>
                    <ComponentCode :code="fakeSelectOptions" language="json"/>
                </div>
            </div>
        </template>

        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdFakeSelect.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>