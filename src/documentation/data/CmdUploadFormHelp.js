export default
`<CmdUploadForm 
    headline="Select files to upload"
    :enableDragAndDrop="true"
    :allowedFileExtensions="['jpg']"
    :allowMultipleFileUploads="true"
    :uploadOptions="{url: 'http://localhost:8888'}"
/>`