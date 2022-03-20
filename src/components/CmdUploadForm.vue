<template>
    <!-- begin advanced mode -->
    <fieldset v-if="advancedMode" :class="['cmd-upload-form flex-container', { 'upload-initiated': uploadInitiated }]">
        <!-- begin CmdCustomHeadline -->
        <CmdCustomHeadline v-if="cmdCustomHeadline"
                           v-bind="cmdCustomHeadline" />
        <!-- end CmdCustomHeadline -->

        <!-- begin CmdSystemMessage -->
        <CmdSystemMessage
            v-if="systemMessageStatus && allSystemMessages.length"
            :iconClose="{ show: false }"
            :validationStatus="systemMessageStatus"
            :systemMessage="allSystemMessages.length === 1 ? allSystemMessages[0] : getMessage('cmduploadform.system_message.the_following_errors_occurred')"
        >
            <ul v-if="allSystemMessages.length > 1">
                <li v-for="(systemMessage, index) in allSystemMessages" :key="index">
                    {{ systemMessage }}
                </li>
            </ul>
        </CmdSystemMessage>
        <!-- end CmdSystemMessage -->

        <div :class="['box drop-area', { 'allow-drop': allowDrop }]" v-on="dragAndDropHandler">
            <template v-if="!listOfFiles.length">
                <h4 v-if="allowMultipleFileUploads">
                    {{ getMessage("cmduploadform.no_files_to_upload") }}
                </h4>
                <h4 v-else>
                    {{ getMessage("cmduploadform.no_file_to_upload") }}
                </h4>
            </template>

            <!-- begin total-upload information -->
            <template v-else>
                <template v-if="showTotalUpload && listOfFiles.length !== 1">
                    <h4>{{ getMessage("cmduploadform.headline.summary_of_all_files") }}</h4>
                    <ul v-if="showTotalUpload && listOfFiles.length !== 1" class="list-of-files">
                        <li class="flex-container no-flex">
                            <a
                                href="#"
                                :title="getMessage('cmduploadform.labeltext.remove_all_files_from_list')"
                                @click.prevent="cancelUpload"
                            >
                                <span :class="deleteIconClass"></span>
                            </a>
                            <span>
                                <strong>{{ listOfFiles.length }}
                                  <template v-if="!allowMultipleFileUploads">
                                    {{ getMessage("cmduploadform.labeltext.file_uploading") }}
                                  </template>
                                  <template v-else>
                                    {{ getMessage("cmduploadform.labeltext.files_uploading") }}
                                  </template>
                                  <span
                                      :class="[
                                      'text-align-right',
                                      { error: maxTotalUploadSize > 0 && totalSize > maxTotalUploadSize }
                                    ]">({{ formatSize(totalSize) }})</span>
                                </strong>
                            </span>
                            <span class="progressbar" v-if="uploadInitiated">
                                <span>{{ getPercentage(totalUploadProgress) }}</span>
                                <progress
                                    max="100"
                                    :value="totalUploadProgress"
                                    :title="totalBytesUploaded"
                                ></progress>
                            </span>
                        </li>
                    </ul>
                    <hr/>
                </template>
                <!-- end total-upload information -->

                <!-- begin list of selected files -->
                <h4>{{ getMessage("cmduploadform.headline.list_of_selected_files") }}</h4>
                <ul class="list-of-files">
                    <li
                        v-for="(uploadFile, index) in listOfFiles"
                        :key="index"
                        class="flex-container no-flex"
                    >
                        <a
                            href="#"
                            :title="getMessage('cmduploadform.labeltext.remove_file_from_list')"
                            @click.prevent="removeFile(index)"
                        ><span :class="deleteIconClass"></span>
                        </a>
                        <span
                            :class="[
                'text-align-right',
                uploadFile.allowedType ? 'allowed' : 'not-allowed',
                { error: uploadFile.error }
              ]"
                        >
              {{ uploadFile.file.name }} ({{ formatSize(uploadFile.file.size) }})
            </span>
                        <template v-if="uploadInitiated && !uploadFile.error">
                        <span class="progressbar">
                            <span>{{ getPercentage(uploadFile.progress) }}</span>
                            <!-- do not place inside progress-tag (will not be displayed then) -->
                            <progress
                                max="100"
                                :value="uploadFile.progress"
                                :title="
                                formatSize(uploadFile.uploadedBytes) + '/' + formatSize(uploadFile.file.size)
                              "
                            ></progress>
                          </span>
                        </template>
                    </li>
                </ul>
                <a
                    v-if="failedUpload"
                    href="#"
                    @click.prevent="cancel"
                    :title="getMessage('cmduploadform.all_files_will_be_removed')">
                    {{ getMessage("cmduploadform.reset_upload") }}
                </a>
                <hr/>
            </template>
            <!-- end list of selected files -->

            <!-- begin upload conditions -->
            <h4 v-if="allowMultipleFileUploads && listOfFiles.length">
                {{ getMessage("cmduploadform.headline.select_additional_files") }}
            </h4>
            <h4 v-if="!allowMultipleFileUploads && listOfFiles.length">
                {{ getMessage("cmduploadform.headline.select_new_file") }}
            </h4>
            <dl class="small">
                <template v-if="maxTotalUploadSize > 0">
                    <dt :class="{ error: totalSize > maxTotalUploadSize }">
                        {{ getMessage("cmduploadform.max_total_upload_size") }}
                    </dt>
                    <dd :class="['text-align-right', { error: totalSize > maxTotalUploadSize }]">
                        {{ formatSize(maxTotalUploadSize) }}
                    </dd>
                </template>
                <dt :class="{ error: errors.fileSize }">
                    {{ getMessage("cmduploadform.max_file_upload_size") }}
                </dt>
                <dd :class="['text-align-right', { error: errors.fileSize }]">
                    {{ formatSize(maxFileUploadSize) }}
                </dd>
                <dt :class="{ error: errors.fileType }">
                    {{ getMessage("cmduploadform.allowed_file_types") }}
                </dt>
                <dd>
                    <a
                        :class="showListOfFileExtensions ? 'icon-not-visible' : 'icon-visible'"
                        href="#"
                        @click.prevent="showListOfFileExtensions = !showListOfFileExtensions"
                        :title="getMessage('cmduploadform.tooltip.toggle_list_of_allowed_file_types')"
                    ></a>
                    <transition name="fade">
                        <ul v-if="showListOfFileExtensions" class="list-of-file-extensions">
                            <li
                                v-for="(fileExtension, index) in allowedFileExtensions"
                                :key="index"
                                :class="{ error: errors.fileType }"
                            >
                                {{ fileExtension }}
                            </li>
                        </ul>
                    </transition>
                </dd>
            </dl>
            <!-- end upload conditions -->
            <button
                type="button"
                :class="['button upload primary', { disabled: uploadInitiated }]"
                :disabled="uploadInitiated"
                @click="selectFiles()"
            >
                <span class="icon-file-upload"></span>
                <span v-if="allowMultipleFileUploads">{{
                        getMessage("cmduploadform.labeltext.select_files")
                    }}</span>
                <span v-else>{{ getMessage("cmduploadform.labeltext.select_file") }}</span>
            </button>
            <p v-if="enableDragAndDrop" :class="['text-drag-and-drop', { disabled: uploadInitiated }]">
                <span>{{ getMessage("cmduploadform.or") }}</span>
                <strong>
                    {{ getMessage("cmduploadform.drag_and_drop") }}
                    <template v-if="allowMultipleFileUploads && listOfFiles.length">
                        {{ getMessage("cmduploadform.additional") }}
                    </template>
                    <template v-if="!allowMultipleFileUploads && listOfFiles.length">
                        {{ getMessage("cmduploadform.new") }}
                    </template>
                    {{ getMessage("cmduploadform.files_to_this_area") }}
                </strong>
            </p>
        </div>
        <!-- begin CmdFormElement -->
        <CmdFormElement
            v-if="enableComment"
            element="textarea"
            :labelText="getMessage('cmduploadform.labeltext.comment')"
            v-model="comment"
            :required="commentRequired"
            :statusMessage="commentStatusMessage"
            :placeholder="getMessage('cmduploadform.placeholder.comment')"
            :status="commentStatusMessage ? 'error' : ''"
        />
        <!-- end CmdFormElement -->

        <div class="button-wrapper no-flex">
            <button
                :class="[
                    'button primary',
                    {
                        disabled:
                        listOfFiles.length === 0 ||
                        (maxTotalUploadSize > 0 && totalSize > maxTotalUploadSize) ||
                        uploadInitiated
                    }
                ]"
                :disabled="
                    listOfFiles.length === 0 ||
                    (maxTotalUploadSize > 0 && totalSize > maxTotalUploadSize) ||
                    uploadInitiated
                "
                @click="uploadFiles"
            >
                <span class="icon-upload"></span>
                <span v-if="listOfFiles.length === 1 || !allowMultipleFileUploads">
                    {{ getMessage("cmduploadform.buttontext.upload_file") }}
                </span>
                <span v-else>{{ getMessage("cmduploadform.buttontext.upload_files") }}</span>
            </button>
            <button :class="['button', { disabled: listOfFiles.length === 0 }]" @click="cancel">
                <span class="icon-cancel"></span>
                <span>{{ getMessage("cmduploadform.buttontext.cancel") }}</span>
            </button>
        </div>
    </fieldset>
    <!-- end advanced mode -->

    <!-- begin simple mode -->
    <a v-else href="#" @click.prevent="selectFiles" :class="['cmd-upload-form  drop-area', {'allow-drop': allowDrop }]" v-on="dragAndDropHandler">
        <span class="progressbar" v-if="uploadInitiated">
            <span>{{ getPercentage(totalUploadProgress) }}</span>
            <progress
                max="100"
                :value="totalUploadProgress"
                :title="totalBytesUploaded">
            </progress>
        </span>

        <!-- begin slot-content -->
        <slot>
            <template v-if="enableDragAndDrop">
                <template v-if="fileTypeImage">
                    <span>{{ getMessage("cmduploadform.select_image") }}</span>
                    <span class="icon-image"></span>
                </template>
                <template v-else>
                    <span>{{ getMessage("cmduploadform.select_file") }}</span>
                    <span class="icon-file"></span>
                </template>
            </template>
            <template v-else>
                <span>{{ getMessage("cmduploadform.drag_and_drop_file_here") }}</span>
                <span class="icon-drag-and-drop"></span>
            </template>
            <small>{{ getMessage("cmduploadform.max_upload_size") }} {{ formatSize(maxFileUploadSize) }}</small>
            <small>{{ getMessage("cmduploadform.allowed_file_types") }} {{ allowedFileExtensions }}</small>
        </slot>
        <!-- end slot-content -->
    </a>
    <!-- end simple mode -->

    <!-- begin CmdFormElement -->
    <CmdFormElement
        element="input"
        type="file"
        :labelText="getMessage('cmduploadform.labeltext.select_files')"
        :disabled="uploadInitiated"
        :multiple="allowMultipleFileUploads"
        @change="filesSelected"
        ref="formElement"
    />
    <!-- end CmdFormElement -->
</template>

<script>
// import mixins
import I18n from "../mixins/I18n"
import DefaultMessageProperties from "../mixins/CmdUploadForm/DefaultMessageProperties"

import {getFileExtension} from "../utils/GetFileExtension.js"
import axios from "axios"

// import components
import CmdCustomHeadline from "./CmdCustomHeadline"
import CmdFormElement from "./CmdFormElement"
import CmdSystemMessage from "./CmdSystemMessage"

export default {
    name: "CmdUploadForm",
    emits: ["click", "error", "upload-complete", "upload-file-success"],
    mixins: [I18n, DefaultMessageProperties],
    components: {
        CmdCustomHeadline,
        CmdFormElement,
        CmdSystemMessage,
    },
    data() {
        return {
            comment: "",
            allowDrop: false,
            listOfFiles: [],
            systemMessages: [],
            defaultSystemMessageStatus: "",
            showListOfFileExtensions: false,
            resetForm: {},
            uploadInitiated: false,
            errors: {}
        }
    },
    created() {
        // Set initial data for resetForm.
        this.resetForm.comment = this.presetComment
        this.resetForm.allowDrop = this.allowDrop
        this.resetForm.listOfFiles = JSON.parse(JSON.stringify(this.listOfFiles))
        this.resetForm.systemMessages = this.systemMessages
        this.resetForm.systemMessageStatus = this.systemMessageStatus
    },
    props: {
        /**
         * set icon class for delete-icons
         */
        deleteIconClass: {
            type: String,
            default: "icon-delete"
        },
        /**
         * toggle visibility of total upload (number of files, total size, total progress
         */
        showTotalUpload: {
            type: Boolean,
            default: true
        },
        /**
         * toggle if upload is handled by component itself or by outer component
         */
        componentHandlesUpload: {
            type: Boolean,
            default: true
        },
        /**
         * list of allowed file extensions to upload (all can be selected)
         */
        allowedFileExtensions: {
            type: Array,
            required: true
        },
        /**
         * activate if the comment given by the user should be mandatory
         *
         * enableComment-property must be set to true
         */
        commentRequired: {
            type: Boolean,
            default: true
        },
        /**
         * show a message if mandatory comment-textarea is not filled
         *
         * enableComment-property and commentRequired-property must be set to true
         */
        commentStatusMessage: {
            type: String,
            default: ""
        },
        /**
         * properties for CmdCustomHeadline-component
         */
        cmdCustomHeadline: {
            type: Object,
            required: false
        },
        /**
         * enable if files can also be dragged (and dropped) into upload-area
         */
        enableDragAndDrop: {
            type: Boolean,
            default: false
        },
        /**
         * enable if a comment should be possible to left by the user
         */
        enableComment: {
            type: Boolean,
            default: true
        },
        /**
         * preset the comment-textarea
         *
         * enableComment-property must be set to true
         */
        presetComment: {
            type: String,
            default: ""
        },
        /**
         * set to 0 if no maximum for total upload size should be set
         */
        maxTotalUploadSize: {
            type: Number,
            default: 5242880
        },
        /**
         * max file size (in bytes) for each single file
         */
        maxFileUploadSize: {
            type: Number,
            default: 10485760
        },
        /**
         * enable if more than file should be enabled to be selected for upload
         */
        allowMultipleFileUploads: {
            type: Boolean,
            default: false
        },
        /**
         * defines upload options if component handles upload itself
         *
         * componentHandlesUpload-property must be true
         */
        uploadOptions: {
            type: Object,
            required: false
        },
        /**
         * activate to use full upload-form-style and -functionality
         *
         * @affectsStyling: true
         */
        advancedMode: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        fileTypeImage() {
            return this.allowedFileExtensions.some(extension => extension.includes('jpg'));

        },
        failedUpload() {
            return this.listOfFiles.some(file => file.error)
        },
        totalBytesUploaded() {
            const bytes = this.listOfFiles
                .map(uploadFile => [
                    uploadFile.file.size,
                    ((uploadFile.progress || 0) * uploadFile.file.size) / 100
                ])
                .reduce((a, b) => [a[0] + b[0], a[1] + b[1]])
            return this.formatSize(bytes[1]) + "/" + this.formatSize(bytes[0])
        },
        totalSize() {
            let totalSize = 0
            for (let i = 0; i < this.listOfFiles.length; i++) {
                totalSize = totalSize + this.listOfFiles[i].file.size
            }
            return totalSize
        },
        allSystemMessages() {
            if (this.maxTotalUploadSize > 0 && this.totalSize > this.maxTotalUploadSize) {
                return [
                    this.getMessage("cmduploadform.system_message_total_size_of_files_too_large"),
                    ...this.systemMessages
                ]
            }
            return this.systemMessages
        },
        systemMessageStatus() {
            return this.defaultSystemMessageStatus || (this.allSystemMessages.length ? "error" : "")
        },
        dragAndDropHandler() {
            // register handlers only if drag-and-drop is enabled
            if (this.enableDragAndDrop) {
                return {
                    dragenter: this.dragEnter,
                    dragover: this.dragOver,
                    dragleave: this.dragLeave,
                    drop: this.drop
                }
            }
            return {}
        },
        totalUploadProgress() {
            const progress = this.listOfFiles
                .map(uploadFile => [
                    uploadFile.file.size,
                    ((uploadFile.progress || 0) * uploadFile.file.size) / 100
                ])
                .reduce((a, b) => [a[0] + b[0], a[1] + b[1]])
            return (progress[1] / progress[0]) * 100
        }
    },
    watch: {
        presetComment: {
            handler(newValue) {
                this.comment = newValue
            },
            immediate: true
        }
    },
    methods: {
        getPercentage(percentage) {
            if (percentage) {
                return percentage.toFixed(2) + "%"
            }
            return "0.00%"
        },
        // use imported function as method (to use in template)
        getFileExtension(filename) {
            return getFileExtension(filename)
        },
        selectFiles() {
            let inputFile = this.$refs.formElement.getDomElement().querySelector("input[type='file']")
            inputFile.click()
        },
        dragEnter(event) {
            this.dragOver(event)
        },
        dragOver(event) {
            if (event.dataTransfer && event.dataTransfer.items && event.dataTransfer.items.length > 0) {
                event.dataTransfer.dropEffect = "none"
                let allowed = true
                for (let i = 0, c = event.dataTransfer.items.length; i < c; ++i) {
                    let item = event.dataTransfer.items[i]
                    if (item.kind !== "file" /*|| !this._allowedTypes[item.type]*/) {
                        allowed = false
                        break
                    }
                }
                if (allowed) {
                    event.preventDefault()
                    event.dataTransfer.dropEffect = "copy"
                    this.allowDrop = true
                    // this._handle_dragover(event)
                }
            }
        },
        dragLeave() {
            this.allowDrop = false
        },
        /*
        drag(event) {
          alert("dropped")
          event.dataTransfer.setData("text", event.target.id)
        },
      */
        drop(event) {
            this.allowDrop = false
            if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length > 0) {
                event.preventDefault()
                this.checkFiles(event.dataTransfer.files)
            }
        },
        cancelUpload() {
            // cancel upload for each file
            this.listOfFiles.forEach(file => {
                if (file.abortController) {
                    file.abortController.abort()
                }
            })

            // clear list of files, remove error-highlighting and hide all system-messages afterwards
            this.errors = {}
            this.listOfFiles = []
            this.hideAllSystemMessages()

            // set uploadInitiated to false to enable all disabled buttons
            this.uploadInitiated = false
        },
        cancel() {
            this.cancelUpload()

            // emit click event with argument "cancel" to react in outer component
            this.$emit("click", "cancel")
        },
        filesSelected(event) {
            this.checkFiles(event.target.files)
        },
        checkFiles(files) {
            if (!files.length) {
                return
            }

            this.defaultSystemMessageStatus = ""; // hide systemMessage if already is shown
            this.systemMessages = [] // hide systemMessage if already is shown
            this.errors = {}

            for (let i = 0; i < files.length; i++) {
                // define file-object which will be pushed in listOfFiles
                const uploadFile = {
                    file: files[i],
                    progress: null,
                    uploadedBytes: 0
                }

                // check size for current file
                if (files[i].size > this.maxFileUploadSize) {
                    this.errors.fileSize = true
                    this.systemMessages.push(
                        this.getMessage(
                            "cmduploadform.system_message.file_size_too_large",
                            files[i].name,
                            files[i].size
                        )
                    )
                    continue
                }

                // check if current file has allowed file-type (else continue with next file)
                if (!this.allowedFileExtensions.includes(getFileExtension(files[i].name))) {
                    this.showListOfFileExtensions = true
                    this.errors.fileType = true
                    this.systemMessages.push(
                        this.getMessage(
                            "cmduploadform.system_message.not_allowed_file_type",
                            files[i].name,
                            getFileExtension(files[i].name)
                        )
                    )
                    continue
                }

                // check (if multiple files can be selected) if current file already exists in listOfFiles
                if (
                    this.allowMultipleFileUploads &&
                    this.listOfFiles.some(listOfFilesEntry =>
                        this.compareFiles(listOfFilesEntry.file, files[i])
                    )
                ) {
                    this.systemMessages.push(
                        this.getMessage(
                            "cmduploadform.system_message.duplicate_file",
                            files[i].name,
                            getFileExtension(files[i].name)
                        )
                    )
                    continue
                }

                if (this.allowMultipleFileUploads) {
                    // push file-object (for each valid file) to listOfFiles-array
                    this.listOfFiles.push(uploadFile)
                } else {
                    if (files.length > 1) {
                        this.systemMessages.push(
                            this.getMessage("cmduploadform.system_message.only_one_file_allowed")
                        )
                    }
                    // assign uploadFile-object (which contains current (and valid) file to listOfFiles-array
                    this.listOfFiles = [uploadFile]
                    break
                }
            }

            if (!this.advancedMode) {
                if (this.systemMessages.length) {
                    this.$emit("error", {messages: this.systemMessages})
                    return
                }
                if (this.listOfFiles.length) {
                    this.uploadFiles()
                }
            }
        },
        compareFiles(file1, file2) {
            return (
                file1.name === file2.name &&
                file1.lastModified === file2.lastModified &&
                file1.size === file2.size
            )
        },
        removeFile(index) {
            /* remove specific file from list */
            this.listOfFiles.splice(index, 1)
            if (!this.listOfFiles.length) {
                this.uploadInitiated = false
            }
            this.hideAllSystemMessages()
        },
        hideAllSystemMessages() {
            // hide all system-messages if all files are removed from list
            if (!this.listOfFiles.length) {
                this.systemMessages = []
            }
        },
        formatSize(size) {
            if (size < 1024) {
                return size
            } else if (size < 1048576) {
                return (size = Math.round((size / 1024) * 100) / 100 + " KB")
            } else {
                return (size = Math.round((size / 1048576) * 100) / 100 + " MB")
            }
        },
        uploadFiles() {
            this.systemMessages = []
            this.errors = {}
            this.defaultSystemMessageStatus = ""

            if (
                this.enableComment &&
                !this.comment &&
                this.commentRequired &&
                this.commentStatusMessage
            ) {
                this.defaultSystemMessageStatus = "error"
                this.systemMessages.push(this.getMessage("cmduploadform.system_message.fill_required"))
            } else {
                this.uploadInitiated = true

                if (this.componentHandlesUpload && this.uploadOptions && this.uploadOptions.url) {
                    const url = new URL(this.uploadOptions.url, location.href)
                    const formData = new FormData()

                    // // append information about files to formData-object
                    // formData.append(
                    //   this.uploadOptions.filesParam ? this.uploadOptions.filesParam : "files",
                    //   this.listOfFiles.map(uploadFile => uploadFile.file)
                    // )

                    // iterate over additionalParams-object and append to formData-object
                    Object.entries(this.uploadOptions.additionalParams || {}).forEach(([key, value]) =>
                        formData.append(key, value)
                    )

                    // append comment to formData-object
                    if (this.enableComment) {
                        formData.append("comment", this.comment)
                    }

                    const requests = []

                    // iterate over list-of-files to send upload request for each file individually
                    this.listOfFiles.forEach(file => {
                        requests.push(this.uploadSingleFile(url, file, formData))
                    })

                    // check upload-status for each file individually
                    Promise.allSettled(requests).then(results => {
                        // if status equals "rejected" the upload was not successful and the file will not be deleted from list
                        const rejectedFiles = results.filter(result => result.status === "rejected")
                        this.uploadInitiated = false

                        if (rejectedFiles.length) {
                            this.defaultSystemMessageStatus = "error"
                            this.systemMessages.push(
                                this.getMessage(
                                    "cmduploadform.system_message.some_files_are_not_uploaded_successfully"
                                )
                            )
                        } else {
                            this.defaultSystemMessageStatus = "success"
                            this.systemMessages.push(
                                this.getMessage("cmduploadform.system_message.all_files_are_uploaded_successfully")
                            )
                        }

                        this.$emit("upload-complete", {success: !rejectedFiles.length})
                    })
                } else {
                    let uploadObj = {}
                    uploadObj.listOfFiles = this.listOfFiles
                    uploadObj.type = "upload"
                    uploadObj.comment = this.comment

                    // emit uploadObj to handle upload by outer component
                    this.$emit("click", uploadObj, this.showMessage)
                }
            }
        },
        onUploadProgress(event, uploadFile) {
            if (event.lengthComputable) {
                uploadFile.progress = (event.loaded / event.total) * 100
                uploadFile.uploadedBytes = event.loaded
            } else {
                uploadFile.progress = null
                uploadFile.uploadedBytes = 0
            }
            this.$forceUpdate()
        },
        uploadSingleFile(url, file, formData) {
            file.abortController = new AbortController()

            // append information about given file to formData-object
            formData.set(
                this.uploadOptions.filesParam ? this.uploadOptions.filesParam : "files",
                file.file
            )

            return (
                axios
                    .post(url, formData, {
                        signal: file.abortController.signal,
                        onUploadProgress: event => this.onUploadProgress(event, file)
                    })
                    // emit information about successful-upload + file
                    .then(response => {
                        this.$emit("upload-file-success", file)
                        return response
                    })
                    // delete uploaded file from list-of-files-array
                    .then(response => {
                        const positionOfFile = this.listOfFiles.indexOf(file)
                        if (positionOfFile !== -1) {
                            this.listOfFiles.splice(positionOfFile, 1)
                        }
                        return response
                    })
                    .catch(error => {
                        this.defaultSystemMessageStatus = "error"
                        this.systemMessages.push(error)
                        file.error = true
                        throw new Error()
                    })
            )
        },
        showMessage(result) {
            if (result === true) {
                this.defaultSystemMessageStatus = "success"
                this.systemMessages.push(this.getMessage("cmduploadform.system_message.upload_success"))
            } else if (result === false) {
                this.defaultSystemMessageStatus = "error"
                this.systemMessages.push(this.getMessage("cmduploadform.system_message.upload_failed"))
            }
        },
        resetFields() {
            if (typeof this.resetForm === "object") {
                const resetArr = Object.keys(this.resetForm)
                for (let key of resetArr) {
                    if (typeof this.resetForm[key] === "object") {
                        this[key] = JSON.parse(JSON.stringify(this.resetForm[key]))
                    } else {
                        this[key] = this.resetForm[key]
                    }
                }
            }
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-upload-form -------------------------------------------------------------------------------------------- */
.cmd-upload-form {
    .box {
        background: var(--pure-white-reduced-opacity);

        dl {
            justify-content: center;
            text-align: left;

            .list-of-file-extensions {
                display: table;

                > li:only-child {
                    list-style-type: none;
                    margin: 0;
                }
            }
        }
    }

    [class*="list-of-file"] {
        max-height: 10rem;
        overflow-x: hidden;
        overflow-y: auto;
        border: var(--default-border);
        padding: calc(var(--default-padding) / 2);
        margin: 0;

        > li {
            flex-wrap: nowrap;
            margin-right: var(--default-margin); /* avoids text to be placed below scrollbar */

            .progressbar {
                display: table;
                align-self: center;

                progress {
                    &[value] {
                        background: var(--pure-white);

                        &::-moz-progress-bar {
                            border-top-left-radius: var(--border-radius);
                            border-bottom-left-radius: var(--border-radius);
                            background: var(--primary-color);
                        }
                    }
                }

                & > span {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 1;
                    font-size: 1.2rem;
                    display: table;
                    top: 0.2rem;
                    padding: 0.1rem 0.2rem;
                    line-height: 100%;
                    background: var(--pure-white);
                }
            }
        }
    }

    .list-of-files {
        display: inline-flex;
        flex-direction: column;
        gap: calc(var(--default-gap) / 2);

        &:last-of-type {
            margin-bottom: var(--default-margin);
        }

        li {
            list-style-type: none;
            margin-left: 0;
            gap: calc(var(--default-gap) / 2);
        }

        & + a {
            display: table;
            margin: 0 auto;
        }
    }

    p {
        &.text-drag-and-drop {
            &.disabled {
                background: none !important; /* overwrite default styling for .disabled */
            }
        }
    }

    .button.upload {
        align-self: center;

        & ~ p {
            & > * {
                display: block;
            }
        }
    }

    .error {
        color: var(--error-color);
    }

    & + .cmd-form-element {
        display: none;
    }
}

.drop-area {
    border: var(--default-border);
    border-style: dashed;
    background: var(--pure-white);
    padding: (var(--default-padding));
    text-align: center;

    &.allow-drop {
        border-style: solid;
    }

    > span[class*="icon"] {
        font-size: 5rem;
    }
}

a.drop-area {
    display: inline-flex;
    flex-direction: column;
    text-decoration: none;
    background: var(--default-background-color);

    span {
        margin: 0;
    }
}
/* end cmd-upload-form ---------------------------------------------------------------------------------------------- */
</style>
