import {getFileExtension} from "./getFileExtension.js"

function checkAndUploadFile(file, allowedFileExtensions, minImageWidth, maxFileUploadSize, imagePreview) {
    const errorMessages = []

    // check size for current file
    if (file.size > maxFileUploadSize) {
        errorMessages.push("file too large")
    }

    // check if current file has allowed file-type
    if (!allowedFileExtensions.includes(getFileExtension(file.name))) {
        errorMessages.push("disallowed file extension")
    }

    if (errorMessages.length) {
        alert(errorMessages)
        return
    }

    // check for min dimensions
    const image = new Image()

    image.onload = () => {
        if (image.width < minImageWidth) {
            // errorMessages.push("width (" + image.width + " px) too small - at least " + this.minImageWidth + " px required!")
            const confirmUpload = confirm("width (" + image.width + " px) too small - at least " + minImageWidth + " px required! Use trotzdem!")
            if (!confirmUpload) {
                alert("Cancel")
                return
            }
        }
        // revoke URL to clean memory
        URL.revokeObjectURL(image.src)

        // show preview-image by assigning image.src (containing image date (not its path) to do existing contentImage source
        if(typeof imagePreview === "function") {
            imagePreview(image.src)
        } else {
            imagePreview.src = image.src
        }

    }
    // create data-url (contains content of a file (not its path))
    image.src = URL.createObjectURL(file)
}

export { checkAndUploadFile }