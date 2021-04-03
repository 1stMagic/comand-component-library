<template>
  <fieldset class="grid-container-create-columns cmd-upload-form">
    <h3 v-if="headline">{{ headline }}</h3>
    <p v-if="uploadSize > maxUploadSize">Summe der Dateigrößen zu groß!</p>
    <dl>
      <dt>Uploadgröße:</dt><dd>{{ formatSize(uploadSize) }}</dd>
      <dt>Erlaubte Größe</dt><dd>{{ formatSize(maxUploadSize) }}</dd>
    </dl>
    <CmdFormElement
            element="input"
            type="file"
            multiple="multiple"
            labelText="Choose file to upload:"
            @change="filesSelected"
    />
    <template v-if="enableDragAndDrop">
      <span>or</span>
      <div :class="['box', {'allow-drop': allowDrop}]" @dragenter="dragEnter" @dragover="dragOver" @dragleave="dragLeave" @drop="drop($event)">
        <span>Drop file(s) for upload here</span>
      </div>
    </template>
    <ul v-if="listOfFiles.length">
      <li v-for="(uploadFile, index) in listOfFiles" :key="index">
        <a href="#" class="icon-delete" title="Remove from list" @click.prevent="removeFile(index)"></a>
        <span>
          {{ uploadFile.file.name }} ({{ uploadFile.file.type}}, {{ formatSize(uploadFile.file.size) }}<template v-if="uploadFile.width && uploadFile.height">, {{ uploadFile.width }} px x {{ uploadFile.height }} px</template>)
        </span>
        <span v-if="uploadFile.allowedType" class="icon-check" style="color: green;"></span>
        <span v-else><span class="icon-cancel" style="color: red;"></span><span>File type not allowed</span></span>
      </li>
    </ul>
    <CmdFormElement
      v-if="enableComment"
      element="textarea"
      labelText="Comment:"
      v-model="comment"
    />
    <p v-if="listOfFiles.length">
      {{ getNumberAllowedFiles }} of {{ listOfFiles.length }} ready to upload!
    </p>
    <div class="button-wrapper no-flex">
      <button class="button primary" @click="uploadFiles">
        <span class="icon-upload"></span><span>Upload file(s)</span>
      </button>
      <button class="button" @click="cancelUpload">
        <span class="icon-cancel"></span><span>Cancel</span>
      </button>
    </div>
  </fieldset>
</template>

<script>
import CmdFormElement from "./CmdFormElement"

export default {
  name: "CmdUploadForm",
  data () {
    return {
      comment: "",
      allowDrop: false,
      listOfFiles: []
    }
  },
  components: {
    CmdFormElement
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
    }
  }
}
</script>

<style lang="scss">
.cmd-upload-form {
  .box {
    padding: (var(--default-padding));
    text-align: center;
    border-style: dashed;

    &.allow-drop {
      border-style: solid;
    }
  }
}
</style>
