<template>
  <fieldset class="grid-container-create-columns cmd-upload-form">
    <h2 v-if="headline">{{ headline }}</h2>
    <CmdFormElement
            element="input"
            type="file"
            multiple="multiple"
            labelText="Choose file(s) with file-explorer:"
            @change="filesSelected"
    />
    <template v-if="enableDragAndDrop">
      <span>or</span>
      <div :class="['box', {'allow-drop': allowDrop}]" @dragenter="dragEnter" @dragover="dragOver" @dragleave="dragLeave" @drop="drop($event)">
        <span>Drag & drop file(s) here</span>
      </div>
    </template>
    <hr />
    <h2>List of files to upload</h2>
    <ul v-if="listOfFiles.length" class="list-of-files">
      <li v-for="(uploadFile, index) in listOfFiles" :key="index">
        <a href="#" class="icon-delete" title="Remove from list" @click.prevent="removeFile(index)"></a>
        <span :class="[uploadFile.allowedType ? 'allowed' : 'not-allowed']">
          <strong>{{ uploadFile.file.name }}</strong> ({{ uploadFile.file.type}}, {{ formatSize(uploadFile.file.size) }}<template v-if="uploadFile.width && uploadFile.height">, {{ uploadFile.width }} px x {{ uploadFile.height }} px</template>)
          <span v-if="uploadFile.allowedType" class="icon-check allowed" title="File ready to upload!"></span>
          <span v-else class="icon-cancel not-allowed" title="File type not allowed (file will not be uploaded)!"></span>
        </span>
      </li>
    </ul>
    <CmdSystemMessage v-if="!listOfFiles.length" messageStatus="warning" :fullWidth="true" systemMessage="No files selected for upload!">
    </CmdSystemMessage>
    <CmdSystemMessage v-else :messageStatus="messageStatusUploadSize()" :fullWidth="true">
      <p>Current upload size is {{ formatSize(uploadSize) }} (of max. {{ formatSize(maxUploadSize) }}).</p>
    </CmdSystemMessage>
    <CmdSystemMessage v-if="uploadSize > maxUploadSize" messageStatus="error" :fullWidth="true" systemMessage="Total file size to large!">
    </CmdSystemMessage>
    <CmdFormElement
      v-if="enableComment"
      element="textarea"
      labelText="Comment:"
      v-model:value="comment"
    />
    <div class="button-wrapper no-flex">
      <button :class="['button', 'primary', {disabled: getNumberAllowedFiles < 1}]" @click="uploadFiles">
        <span class="icon-upload"></span>
        <span v-if="getNumberAllowedFiles < 1">Nothing to upload</span>
        <span v-else>Upload {{ getNumberAllowedFiles }} of {{ listOfFiles.length }} files</span>
      </button>
      <button class="button" @click="cancelUpload">
        <span class="icon-cancel"></span><span>Cancel</span>
      </button>
    </div>
  </fieldset>
</template>

<script>
import CmdFormElement from "./CmdFormElement"
import CmdSystemMessage from "./CmdSystemMessage"

export default {
  name: "CmdUploadForm",
  emits: ["click"],
  data () {
    return {
      comment: "",
      allowDrop: false,
      listOfFiles: []
    }
  },
  components: {
    CmdFormElement,
    CmdSystemMessage
  },
  props: {
    headline: {
      type: String,
      required: false
    },
    uploadURL: {
      type: String,
      required: false
    },
    enableDragAndDrop: {
      type: Boolean,
      default: false
    },
    enableComment: {
      type: Boolean,
      default: true
    },
    uploadOptions: {
      type: Object,
      required: false
    },
    allowedFileTypes: {
      type: Array,
      required: true
    },
    maxUploadSize: {
      type: Number,
      default: 10485760
    }
  },
  computed: {
    uploadSize() {
      let uploadSize = 0
      for(let i = 0; i < this.listOfFiles.length; i++) {
        if(this.listOfFiles[i].allowedType) {
          uploadSize = uploadSize + this.listOfFiles[i].file.size
        }
      }
      return uploadSize
    },
    getNumberAllowedFiles() {
      let numberAllowedFiles = 0
      for(let i = 0; i < this.listOfFiles.length; i++) {
        if(this.listOfFiles[i].allowedType) {
          numberAllowedFiles++
        }
      }
      return numberAllowedFiles
    }
  },
  methods: {
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
      this.listOfFiles = []
      this.comment = ""
      this.$emit('click', 'cancel')
    },
    filesSelected(event) {
      this.checkFiles(event.target.files)
    },
    checkFiles(files) {
      for(let i = 0; i < files.length; i++) {
        let uploadFile = {
          "file": files[i],
          "allowedType": false,
          width: 0,
          height: 0
        }

        if(this.allowedFileTypes.includes(files[i].type)) {
          uploadFile.allowedType = true
        }

        if(files[i].type.slice(0, 6) == "image/" && files[i].size < this.maxUploadSize) {
          // get dimensions if image
          const reader = new FileReader()

          reader.addEventListener('load', function () {
            const img = new Image()
            img.src = this.result
            img.addEventListener('load', () => {
              uploadFile.width = img.width
              uploadFile.height = img.height
            })
          })
          reader.readAsDataURL(files[i])
        }
        this.listOfFiles.push(uploadFile)
      }
    },
    removeFile(index) {
      /* remove file from list */
      this.listOfFiles.splice(index, 1)
    },
    formatSize(size) {
      if(size < 1024) {
        return size
      } else if(size < 1048576) {
        return size = (Math.round(size/1024*100)/100) + " KB"
      } else {
        return size = (Math.round(size/1048576*100)/100) + " MB"
      }
    },
    uploadFiles() {
      if(this.uploadURL) {
        let formData = new FormData()
        for(let i; i < this.listOfFiles.length; i++) {
          if(this.listOfFiles[i].allowedType) {
            formData.append("uploadedFiles", this.listOfFiles[i].file)
          }
        }

        if(formData.has("uploadedFiles")) {
         fetch(this.uploadURL, {method: "POST", body: formData})
        }
      } else {
        this.$emit('click', 'upload')
      }
    },
    messageStatusUploadSize() {
      if(this.uploadSize > this.maxUploadSize || this.uploadSize === 0) {
        return "error"
      }
      return "success"
    }
  }
}
</script>

<style lang="scss">
.cmd-upload-form {
  .box {
    padding: calc(var(--default-padding) * 3);
    text-align: center;
  }

  .list-of-files {
    li {
      list-style-type: none;
      margin-left: 0;

      > span {
        span[class*="icon"]:last-child {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: calc(var(--default-padding) / 2);
        }
      }
    }
  }
}
</style>
