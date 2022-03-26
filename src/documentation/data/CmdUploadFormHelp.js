export default [
`<CmdUploadForm
    :cmdCustomHeadline="{headlineText: 'Select files to upload', headlineLevel: 5}"
    :enableDragAndDrop="true"
    :allowedFileExtensions="['gif','png','jpg']"
    :allowMultipleFileUploads="true"
    :uploadOptions="{url: 'some url'}"
/>`,
`<CmdUploadForm
    :advancedMode="false"
    :maxFileUploadSize="5242880"
    :enableDragAndDrop="true"
    :allowedFileExtensions="['pdf']"
    :allowMultipleFileUploads="false"
    :uploadOptions="{url: 'some url'}"
/>`
]