<script setup>

import {tabProps, tabHandlers} from "../tabs"
import CmdUploadForm from "../../components/CmdUploadForm"
import ComponentProperties from "../components/ComponentProperties"
import {isFrameMode} from "../../utils/common"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"
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
            <ViewCodeData :isFirstComponent="true" :code="CmdCode">
                <h4>Advanced mode</h4>
                <teleport to="#frameComponentTarget" :disabled="!isFrameMode()">
                <CmdUploadForm
                    headline="Select files to upload"
                    :enableDragAndDrop="true"
                    :allowedFileExtensions="['gif','png','jpg']"
                    :allowMultipleFileUploads="true"
                    :uploadOptions="{url: 'http://localhost:8888'}"
                />
                </teleport>
            </ViewCodeData>
            <ViewCodeData :code="CmdCode">
                <h4>Simple mode</h4>
                <CmdUploadForm
                    headline="Select files to upload"
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