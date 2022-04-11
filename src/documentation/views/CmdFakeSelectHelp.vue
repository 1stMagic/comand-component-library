<script setup>
// import functions
import {ref} from "vue"
import {tabProps, tabHandlers} from "../tabs"
import {isFrameMode} from "../../utils/common"

// import components
import CmdFakeSelect from "../../components/CmdFakeSelect"
import ComponentProperties from "../components/ComponentProperties"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"
import ExampleSectionWrapper from "../components/ExampleSectionWrapper"

// import example-data
import CmdCode from "../data/CmdFakeSelectHelp"
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
const fakeSelectCountry = ref("")
const fakeSelectColor = ref("")
</script>

<template>
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <h2>Component</h2>
            <ExampleSectionWrapper componentName="CmdFakeSelect" headlineText="Selectbox 'default'">
                <ViewCodeData :isFirstComponent="true" :code="CmdCode[0]" :data="fakeSelectOptions">
                    <teleport to="#frame-component-target" :disabled="!isFrameMode()">
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
            </ExampleSectionWrapper>
            <hr/>
            <ExampleSectionWrapper componentName="CmdFakeSelect" headlineText="Selectbox 'default' (with icons)">
                <ViewCodeData :code="CmdCode[1]">
                    <CmdFakeSelect
                        labelText="Selectbox with icons:"
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
            </ExampleSectionWrapper>
            <hr/>
            <ExampleSectionWrapper componentName="CmdFakeSelect" headlineText="Selectbox 'checkboxOptions' (shows checkboxes)">
                <ViewCodeData :code="CmdCode[2]">
                    <CmdFakeSelect
                        labelText="Selectbox with checkboxes:"
                        :status="formElementStatus"
                        :selectData="fakeSelectOptions"
                        v-model="fakeSelectCheckbox"
                        defaultOptionName="Options:"
                        :required="true"
                        id="selectbox-with-checkboxes"
                        type="checkboxOptions"
                        :useCustomTooltip="true"
                    />
                    <p>
                        fakeSelectOptions: {{ fakeSelectOptions }}
                    </p>
                    <dl class="vmodel">
                        <dt>v-model:</dt>
                        <dd>
                            <output>{{ fakeSelectCheckbox }}</output>
                        </dd>
                    </dl>
                </ViewCodeData>
            </ExampleSectionWrapper>
            <hr/>
            <ExampleSectionWrapper componentName="CmdFakeSelect" headlineText="Selectbox 'content' (content given by slot)">
                <ViewCodeData :code="CmdCode[3]">
                    <CmdFakeSelect
                        labelText="Selectbox with slot-content:"
                        :status="formElementStatus"
                        type="content"
                        defaultOptionName="HTML-Content:"
                    >
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
            </ExampleSectionWrapper>
            <hr/>
            <ExampleSectionWrapper componentName="CmdFakeSelect" headlineText="Selectbox 'country' (shows country flags)">
                <ViewCodeData :code="CmdCode[4]">
                    <CmdFakeSelect
                        labelText="Selectbox with country flags:"
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
            </ExampleSectionWrapper>
            <hr/>
            <ExampleSectionWrapper componentName="CmdFakeSelect" headlineText="Selectbox 'colors' (show squares with colors)">
                <ViewCodeData :code="CmdCode[5]">
                    <CmdFakeSelect
                        labelText="Selectbox with colors:"
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
            </ExampleSectionWrapper>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdFakeSelect.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>