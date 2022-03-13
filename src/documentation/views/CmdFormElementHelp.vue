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
            <CmdCustomHeadline pre-headline="Example #1" :headline="{text: 'Input (type text)', level: 2}"/>
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
            <CmdCustomHeadline pre-headline="Example #2" :headline="{text: 'Input (type number)', level: 2}"/>
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
            <CmdCustomHeadline pre-headline="Example #3" :headline="{text: 'Input (type color)', level: 2}"/>
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
            <CmdCustomHeadline pre-headline="Example #4" :headline="{text: 'Input (type date)', level: 2}"/>
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
            <CmdCustomHeadline pre-headline="Example #5" :headline="{text: 'Input (type datetime-local)', level: 2}"/>
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
            <CmdCustomHeadline pre-headline="Example #6" :headline="{text: 'Input (type password)', level: 2}"/>
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
            <CmdCustomHeadline pre-headline="Example #7" :headline="{text: 'Input (type file)', level: 2}"/>
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
            <CmdCustomHeadline pre-headline="Example #8" :headline="{text: 'Input (type range)', level: 2}"/>
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
            <CmdCustomHeadline pre-headline="Example #9" :headline="{text: 'Input (type submit)', level: 2}"/>
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
            <CmdCustomHeadline pre-headline="Example #10" :headline="{text: 'Input (type button)', level: 2}"/>
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
            <CmdCustomHeadline pre-headline="Example #11" :headline="{text: 'Input (type checkbox)', level: 2}"/>
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
            <CmdCustomHeadline pre-headline="Example #12" :headline="{text: 'Input (type radio)', level: 2}"/>
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
            <CmdCustomHeadline pre-headline="Example #11" :headline="{text: 'Input (type checkbox, replaced)', level: 2}"/>
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
            <CmdCustomHeadline pre-headline="Example #12" :headline="{text: 'Input (type radio, replaced)', level: 2}"/>
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
            <CmdCustomHeadline pre-headline="Example #13" :headline="{text: 'Selectbox', level: 2}"/>
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
            <CmdCustomHeadline pre-headline="Example #14" :headline="{text: 'Datalist', level: 2}"/>
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
            <CmdCustomHeadline pre-headline="Example #15" :headline="{text: 'Textarea', level: 2}"/>
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