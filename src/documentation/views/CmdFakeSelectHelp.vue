<script setup>
// import functions
import {ref} from "vue"
import {tabProps, tabHandlers} from "../tabs"
import {isFrameMode} from "../../utils/common"

// import components
import CmdCustomHeadline from "../../components/CmdCustomHeadline"
import CmdFakeSelect from "../../components/CmdFakeSelect"
import ComponentProperties from "../components/ComponentProperties"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdFakeSelectHelp"

// import example-data
import fakeSelectOptions from "../../assets/data/fake-select-options"
import fakeSelectColors from '../../assets/data/fake-select-colors'
import fakeSelectCountries from '../../assets/data/fake-select-countries'
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

// set consts for v-models
const fakeSelectDefault = ref("")
const fakeSelectDefaultWithIcons = ref("2")
const fakeSelectCheckbox = ref([])
const formElementStatus = ref("")
const fakeSelectCountry= ref("")
const fakeSelectColor = ref("")
</script>

<template>
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <h2>Component</h2>
            <CmdCustomHeadline preHeadlineText="Example #1" headlineText="Selectbox 'default'" :headlineLevel="3" />
            <ViewCodeData :isFirstComponent="true" :code="CmdCode" :data="fakeSelectOptions">
                <teleport to="#frameComponentTarget" :disabled="!isFrameMode()">
                    <CmdFakeSelect
                        labelText="Labeltext for default selectbox:"
                        :status="formElementStatus"
                        :selectData="fakeSelectOptions"
                        v-model="fakeSelectDefault"
                        required
                        defaultOptionName="Select an option:"
                    />
                    <dl class="vmodel">
                        <dt>v-model:</dt>
                        <dd>
                            <output>{{ fakeSelectDefault }}</output>
                        </dd>
                    </dl>
                </teleport>
            </ViewCodeData>
            <hr />
            <CmdCustomHeadline preHeadlineText="Example #2" headlineText="Selectbox 'default' (with icons)" :headlineLevel="3" />
            <ViewCodeData :code="CmdCode">
                <CmdFakeSelect labelText="Selectbox with icons:"
                               :status="formElementStatus"
                               :selectData="fakeSelectOptionsWithIcons"
                               v-model="fakeSelectDefaultWithIcons"
                               defaultOptionName="Select an option:"
                />
                <dl class="vmodel">
                    <dt>v-model:</dt>
                    <dd>
                        <output>{{ fakeSelectDefaultWithIcons }}</output>
                    </dd>
                </dl>
            </ViewCodeData>
            <hr />
            <CmdCustomHeadline preHeadlineText="Example #3" headlineText="Selectbox 'checkboxOptions' (shows checkboxes)" :headlineLevel="3" />
            <ViewCodeData :code="CmdCode">
                <CmdFakeSelect labelText="Selectbox with checkboxes:"
                               :status="formElementStatus"
                               :selectData="fakeSelectOptions"
                               v-model="fakeSelectCheckbox"
                               defaultOptionName="Options:"
                               :required="true"
                               id="selectbox-with-checkboxes"
                               type="checkboxOptions"
                               :useCustomTooltip="true"
                />
                <dl class="vmodel">
                    <dt>v-model:</dt>
                    <dd>
                        <output>{{ fakeSelectCheckbox }}</output>
                    </dd>
                </dl>
            </ViewCodeData>
            <hr />
            <CmdCustomHeadline preHeadlineText="Example #4" headlineText="Selectbox 'content' (content given by slot)" :headlineLevel="3" />
            <ViewCodeData :code="CmdCode">
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
            </ViewCodeData>
            <hr />
            <CmdCustomHeadline preHeadlineText="Example #5" headlineText="Selectbox 'country' (shows country flags)" :headlineLevel="3" />
            <ViewCodeData :code="CmdCode">
                <CmdFakeSelect labelText="Selectbox with country flags:"
                               :status="formElementStatus"
                               :selectData="fakeSelectCountries"
                               v-model="fakeSelectCountry"
                               defaultOptionName="Select country:"
                               type="country"
                />
                <dl class="vmodel">
                    <dt>v-model:</dt>
                    <dd>
                        <output>{{ fakeSelectCountry }}</output>
                    </dd>
                </dl>
            </ViewCodeData>
            <hr />
            <CmdCustomHeadline preHeadlineText="Example #6" headlineText="Selectbox 'colors' (show squares with colors)" :headlineLevel="3" />
            <ViewCodeData :code="CmdCode">
                <CmdFakeSelect labelText="Selectbox with colors:"
                               :status="formElementStatus"
                               :selectData="fakeSelectColors"
                               v-model="fakeSelectColor"
                               required="required"
                               type="color"
                />
                <dl class="vmodel">
                    <dt>v-model:</dt>
                    <dd>
                        <output>{{ fakeSelectColor }}</output>
                    </dd>
                </dl>
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdFakeSelect.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>