<script setup>
import {ref} from "vue"
import {tabProps, tabHandlers} from "../tabs"
import CmdFormElement from "../../components/CmdFormElement"
import ComponentProperties from "../components/ComponentProperties"
import {isFrameMode} from "../../utils/common"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdFormElementHelp"
import selectOptions from '../../assets/data/select-options'
import propertyDescriptions from "../generated/CmdFormElementPropertyDescriptions"
import CmdCustomHeadline from "../../components/CmdCustomHeadline"

const propertyStructures = {
    datalist: {
        "id": "<string>",
        "options": "<array>"
    },
    nativeButton: {
        "text": "<string>",
        "icon": {
            "show": "<boolean>",
            "iconClass": "<string>",
            "position": "<string>",
            "tooltip": "<string>"
        }
    },
    selectOptions: [
        {
            "text": "<string>",
            "value": "<string>"
        }
    ]
}

const datalist = {
    id: "datalist-id",
    options: [
        "Option 1",
        "Option 2",
        "Option 3"
    ]
}

// set consts for v-models
const checkbox = ref(false)
const radio = ref("Radiobutton1")
const range = ref(50)
const select = ref("2")
const textarea = ref("")
</script>

<template>
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <h2>Component</h2>
            <CmdCustomHeadline preHeadlineText="Example #1" headlineText="Input (type text)" :headlineLevel="2" />
            <ViewCodeData :isFirstComponent="true" :code="CmdCode">
                <teleport to="#frameComponentTarget" :disabled="!isFrameMode()">
                    <CmdFormElement
                        labelText="Input (type text):"
                        element="input"
                        type="text"
                        :status="formElementStatus"
                        placeholder="Type in text"
                        tooltipText="This is a tooltip"
                        :useCustomTooltip="false"
                    />
                </teleport>
            </ViewCodeData>
            <hr/>
            <CmdCustomHeadline preHeadlineText="Example #2" headlineText="Input (type number)" :headlineLevel="2" />
            <ViewCodeData :code="CmdCode">
                <CmdFormElement
                    labelText="Input (type number):"
                    element="input"
                    type="number"
                    :status="formElementStatus"
                    placeholder="Type in number"
                    tooltipText="This is a tooltip"
                    :useCustomTooltip="false"
                />
            </ViewCodeData>
            <hr/>
            <CmdCustomHeadline preHeadlineText="Example #3" headlineText="Input (type color)" :headlineLevel="2" />
            <ViewCodeData :code="CmdCode">
                <CmdFormElement
                    labelText="Input (type color):"
                    element="input"
                    type="color"
                    :status="formElementStatus"
                    tooltipText="This is a tooltip"
                    :useCustomTooltip="false"
                />
            </ViewCodeData>
            <hr/>
            <CmdCustomHeadline preHeadlineText="Example #4" headlineText="Input (type date)" :headlineLevel="2" />
            <ViewCodeData :code="CmdCode">
                <CmdFormElement
                    labelText="Input (type date):"
                    element="input"
                    type="date"
                    :status="formElementStatus"
                    tooltipText="This is a tooltip"
                    :useCustomTooltip="false"
                />
            </ViewCodeData>
            <hr/>
            <CmdCustomHeadline preHeadlineText="Example #5" headlineText="Input (type datetime-local)" :headlineLevel="2" />
            <ViewCodeData :code="CmdCode">
                <CmdFormElement
                    labelText="Input (type datetime-local):"
                    element="input"
                    type="datetime-local"
                    :status="formElementStatus"
                    tooltipText="This is a tooltip"
                    :useCustomTooltip="false"
                />
            </ViewCodeData>
            <hr/>
            <CmdCustomHeadline preHeadlineText="Example #6" headlineText="Input (type password)" :headlineLevel="2" />
            <ViewCodeData :code="CmdCode">
                <CmdFormElement
                    labelText="Input (type password):"
                    element="input"
                    type="password"
                    :status="formElementStatus"
                    placeholder="Type in password"
                    tooltipText="This is a tooltip"
                    :useCustomTooltip="false"
                />
            </ViewCodeData>
            <hr/>
            <CmdCustomHeadline preHeadlineText="Example #7" headlineText="Input (type file)" :headlineLevel="2" />
            <ViewCodeData :code="CmdCode">
                <CmdFormElement
                    labelText="Input (type file):"
                    element="input"
                    type="file"
                    :status="formElementStatus"
                    tooltipText="This is a tooltip"
                    :useCustomTooltip="false"
                />
            </ViewCodeData>
            <hr/>
            <CmdCustomHeadline preHeadlineText="Example #8" headlineText="Input (type range)" :headlineLevel="2" />
            <ViewCodeData :code="CmdCode">
                <CmdFormElement
                    labelText="Input (type range):"
                    element="input"
                    type="range"
                    :status="formElementStatus"
                    :useCustomTooltip="false"
                    v-model="range"
                />
                <dl class="vmodel">
                    <dt>v-model:</dt>
                    <dd>
                        <output>{{ range }}</output>
                    </dd>
                </dl>
            </ViewCodeData>
            <hr/>
            <CmdCustomHeadline preHeadlineText="Example #9" headlineText="Input (type submit)" :headlineLevel="2" />
            <ViewCodeData :code="CmdCode">
                <CmdFormElement
                    :nativeButton="{ text: 'Submit', icon: {iconClass: 'icon-edit', show: true}}"
                    element="button"
                    type="submit"
                    :status="formElementStatus"
                    :useCustomTooltip="false"
                />
            </ViewCodeData>
            <hr/>
            <CmdCustomHeadline preHeadlineText="Example #10" headlineText="Input (type button)" :headlineLevel="2" />
            <ViewCodeData :code="CmdCode">
                <CmdFormElement
                    :nativeButton="{ icon: {iconClass: 'icon-edit', show: true, tooltip: 'I am a tooltip'}}"
                    element="button"
                    type="button"
                    :status="formElementStatus"
                    :useCustomTooltip="false"
                />
            </ViewCodeData>
            <hr/>
            <CmdCustomHeadline preHeadlineText="Example #11" headlineText="Input (type checkbox)" :headlineLevel="2" />
            <ViewCodeData :code="CmdCode">
                <CmdFormElement
                    labelText="Input (type checkbox)"
                    element="input"
                    type="checkbox"
                    :status="formElementStatus"
                    tooltipText="This is a tooltip"
                    :useCustomTooltip="false"
                    v-model="checkbox"
                />
                <dl class="vmodel">
                    <dt>v-model:</dt>
                    <dd>
                        <output>{{ checkbox }}</output>
                    </dd>
                </dl>
            </ViewCodeData>
            <hr/>
            <CmdCustomHeadline preHeadlineText="Example #12" headlineText="Input (type radio)" :headlineLevel="2" />
            <ViewCodeData :code="CmdCode">
                <CmdFormElement
                    labelText="Input #1 (type radio)"
                    element="input"
                    type="radio"
                    name="radio-group"
                    id="example-radio1"
                    :status="formElementStatus"
                    tooltipText="This is a tooltip"
                    :useCustomTooltip="false"
                    v-model="radio"
                    inputValue="Radiobutton1"
                />
                <CmdFormElement
                    labelText="Input #2 (type radio)"
                    element="input"
                    type="radio"
                    name="radio-group"
                    id="example-radio2"
                    :status="formElementStatus"
                    tooltipText="This is a tooltip"
                    :useCustomTooltip="false"
                    v-model="radio"
                    inputValue="Radiobutton2"
                />
                <dl class="vmodel">
                    <dt>v-model:</dt>
                    <dd>
                        <output>{{ radio }}</output>
                    </dd>
                </dl>
            </ViewCodeData>
            <hr/>
            <CmdCustomHeadline preHeadlineText="Example #13" headlineText="Input (type checkbox, replaced)" :headlineLevel="2" />
            <ViewCodeData :code="CmdCode">
                <CmdFormElement
                    labelText="Input (type checkbox)"
                    element="input"
                    type="checkbox"
                    :replace-input-type="true"
                    :status="formElementStatus"
                    tooltipText="This is a tooltip"
                    :useCustomTooltip="false"
                    v-model="checkbox"
                />
                <dl class="vmodel">
                    <dt>v-model:</dt>
                    <dd>
                        <output>{{ checkbox }}</output>
                    </dd>
                </dl>
            </ViewCodeData>
            <hr/>
            <CmdCustomHeadline preHeadlineText="Example #14" headlineText="Input (type radio, replaced)" :headlineLevel="2" />
            <ViewCodeData :code="CmdCode">
                <CmdFormElement
                    labelText="Input #1 (type radio)"
                    element="input"
                    type="radio"
                    :replace-input-type="true"
                    name="radio-group"
                    id="example-radio1"
                    :status="formElementStatus"
                    tooltipText="This is a tooltip"
                    :useCustomTooltip="false"
                    v-model="radio"
                    inputValue="Radiobutton1"
                />
                <CmdFormElement
                    labelText="Input #2 (type radio)"
                    element="input"
                    type="radio"
                    name="radio-group"
                    :replace-input-type="true"
                    id="example-radio2"
                    :status="formElementStatus"
                    tooltipText="This is a tooltip"
                    :useCustomTooltip="false"
                    v-model="radio"
                    inputValue="Radiobutton2"
                />
                <dl class="vmodel">
                    <dt>v-model:</dt>
                    <dd>
                        <output>{{ radio }}</output>
                    </dd>
                </dl>
            </ViewCodeData>
            <hr/>
            <CmdCustomHeadline preHeadlineText="Example #15" headlineText="Select" :headlineLevel="2" />
            <ViewCodeData :code="CmdCode">
                <CmdFormElement
                    labelText="Selectbox"
                    element="select"
                    required="required"
                    :status="formElementStatus"
                    v-model="select"
                    :selectOptions="selectOptions"
                />
                <dl>
                    <dt>v-model:</dt>
                    <dd>
                        <output>{{ select }}</output>
                    </dd>
                </dl>
            </ViewCodeData>
            <hr/>
            <CmdCustomHeadline preHeadlineText="Example #16" headlineText="Datalist" :headlineLevel="2" />
            <ViewCodeData :code="CmdCode">
                <CmdFormElement
                    labelText="Datalist:"
                    element="input"
                    type="text"
                    :status="formElementStatus"
                    placeholder="Type in option"
                    :datalist="datalist"
                    tooltipText="This is a tooltip"
                />
            </ViewCodeData>
            <hr/>
            <CmdCustomHeadline preHeadlineText="Example #16" headlineText="Textarea" :headlineLevel="2" />
            <ViewCodeData :code="CmdCode">
                <CmdFormElement
                    labelText="Textarea:"
                    element="textarea"
                    :status="formElementStatus"
                    placeholder="Type in text"
                    tooltipText="This is a tooltip"
                    v-model="textarea"
                />
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdFormElement.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>