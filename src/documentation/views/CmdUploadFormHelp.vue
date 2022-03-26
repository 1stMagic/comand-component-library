<script setup>
// import functions
import {tabProps, tabHandlers} from "../tabs"
import {isFrameMode} from "../../utils/common"

// import components
import CmdUploadForm from "../../components/CmdUploadForm"
import ComponentProperties from "../components/ComponentProperties"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"
import CmdCustomHeadline from "../../components/CmdCustomHeadline"

// import example-data
import CmdCode from "../data/CmdUploadFormHelp"
import propertyDescriptions from "../generated/CmdUploadFormPropertyDescriptions"

const propertyStructures = {
    uploadOptions: {
        url: "<string>",
        filesParam: "<string>",
        additionalParams: "<object>",
    }
}
</script>

<template>
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <h2>Component</h2>
            <CmdCustomHeadline headlineText="Advanced mode" :headlineLevel="3" preHeadlineText="Example #1" />
            <ViewCodeData :isFirstComponent="true" :code="CmdCode[0]">
                <teleport to="#frame-component-target" :disabled="!isFrameMode()">
                <CmdUploadForm
                    :cmdCustomHeadline="{headlineText: 'Select files to upload', headlineLevel: 5}"
                    :enableDragAndDrop="true"
                    :allowedFileExtensions="['gif','png','jpg']"
                    :allowMultipleFileUploads="true"
                    :uploadOptions="{url: 'some url'}"
                />
                </teleport>
            </ViewCodeData>
            <hr />
            <CmdCustomHeadline headlineText="Simple mode" :headlineLevel="3" preHeadlineText="Example #2" />
            <ViewCodeData :code="CmdCode[1]">
                <CmdUploadForm
                    :advancedMode="false"
                    :maxFileUploadSize="5242880"
                    :enableDragAndDrop="true"
                    :allowedFileExtensions="['pdf']"
                    :allowMultipleFileUploads="false"
                    :uploadOptions="{url: 'some url'}"
                />
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdUploadForm.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>