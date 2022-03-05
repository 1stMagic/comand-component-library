<script setup>

import {tabProps, tabHandlers} from "../tabs"
import CmdUploadForm from "../../components/CmdUploadForm"
import ComponentProperties from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
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
    <CmdTabs v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <div class="flex-container">
                <div>
                    <h3>View</h3>
                    <h4>Advanced mode</h4>
                    <CmdUploadForm
                        headline="Select files to upload"
                        :enableDragAndDrop="true"
                        :allowedFileExtensions="['gif','png','jpg']"
                        :allowMultipleFileUploads="true"
                        :uploadOptions="{url: 'http://localhost:8888'}"
                    />
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
                </div>
                <div>
                    <h3>Code</h3>
                    <ComponentCode :code="CmdCode"/>
                </div>
                <div>
                    <h3>Data</h3>
                </div>
            </div>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdUploadForm.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>