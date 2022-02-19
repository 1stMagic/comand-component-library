<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdUploadForm from "../../components/CmdUploadForm"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdUploadFormHelp"

const propertyDescriptions = {
    advancedMode: "Description for property",
    allowedFileExtensions: "Description for property",
    allowMultipleFileUploads: "Description for property",
    commentRequired: "Description for property",
    commentStatusMessage: "Description for property",
    componentHandlesUpload: "Description for property",
    deleteIconClass: "Description for property",
    enableComment: "Description for property",
    enableDragAndDrop: "Description for property",
    headline: "Description for property",
    maxFileUploadSize: "Description for property",
    maxTotalUploadSize: "Description for property",
    presetComment: "Description for property",
    showTotalUpload: "Description for property",
    uploadOptions: "Description for property"
}
const propertyStructures = {
    advancedMode: "-",
    allowedFileExtensions: "-",
    allowMultipleFileUploads: "-",
    commentRequired: "-",
    commentStatusMessage: "-",
    componentHandlesUpload: "-",
    deleteIconClass: "-",
    enableComment: "-",
    enableDragAndDrop: "-",
    headline: "-",
    maxFileUploadSize: "-",
    maxTotalUploadSize: "-",
    presetComment: "-",
    showTotalUpload: "-",
    uploadOptions: "-"
}

const props = defineProps(commonProps)

const tabs = [{name: 'View'}, {name: 'Usage'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
            <h3>View</h3>
            <h3>Advanced mode</h3>
            <CmdUploadForm
                headline="Select files to upload"
               :enableDragAndDrop="true"
               :allowedFileExtensions="['jpg']"
               :allowMultipleFileUploads="true"
               :uploadOptions="{url: 'http://localhost:8888'}"
            />
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre>{{ CmdCode }}</pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdUploadForm.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>