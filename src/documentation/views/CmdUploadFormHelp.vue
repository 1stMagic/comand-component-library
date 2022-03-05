<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
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

const props = defineProps(commonProps)

const tabs = [{name: 'View'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
            <div class="flex-container">
                <div>
                    <h3>View</h3>
                    <h3>Advanced mode</h3>
                    <CmdUploadForm
                        headline="Select files to upload"
                        :enableDragAndDrop="true"
                        :allowedFileExtensions="['gif','png','jpg']"
                        :allowMultipleFileUploads="true"
                        :uploadOptions="{url: 'http://localhost:8888'}"
                    />
                    <h3>Simple mode</h3>
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