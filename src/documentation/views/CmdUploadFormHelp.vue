<script setup>

import {tabProps, tabHandlers} from "../tabs"
import CmdUploadForm from "../../components/CmdUploadForm"
import ComponentProperties from "../components/ComponentProperties"
import {isFrameMode} from "../../utils/common"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"
import CmdCustomHeadline from "../../components/CmdCustomHeadline"
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
            <ViewCodeData :isFirstComponent="true" :code="CmdCode">
                <teleport to="#frameComponentTarget" :disabled="!isFrameMode()">
                <CmdUploadForm
                    :cmdCustomHeadline="{headlineText: 'Select files to upload', headlineLevel: 5}"
                    :enableDragAndDrop="true"
                    :allowedFileExtensions="['gif','png','jpg']"
                    :allowMultipleFileUploads="true"
                    :uploadOptions="{url: 'http://localhost:8888'}"
                />
                </teleport>
            </ViewCodeData>
            <hr />
            <CmdCustomHeadline headlineText="Simple mode" :headlineLevel="3" preHeadlineText="Example #2" />
            <ViewCodeData :code="CmdCode">
                <CmdUploadForm
                    :advancedMode="false"
                    :maxFileUploadSize="5242880"
                    :enableDragAndDrop="true"
                    :allowedFileExtensions="['pdf']"
                    :allowMultipleFileUploads="false"
                    :uploadOptions="{url: 'http://localhost:8888'}"
                />
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdUploadForm.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>