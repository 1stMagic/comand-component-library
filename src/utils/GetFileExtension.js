/**
 * @param filename
 * @returns {string} file extension of given filename or empty string if filename is empty/undefined
 */
function getFileExtension(filename) {
  if (filename) {
    const positionOfLastDot = filename.lastIndexOf(".")
    if (positionOfLastDot > -1) {
      return filename.substring(positionOfLastDot + 1)
    }
  }
  return ""
}

export { getFileExtension }
