export default {
    // el = real dom-element
    mounted(el) {
        // check if element is native input-element
        if(el.tagName === "INPUT" || el.tagName === "SELECT" || el.tagName === "TEXTAREA") {
            el.focus()
        } else {
            // check if component is used, which contains a native input-element
            const innerInputElement = el.querySelector("input, select, textarea")
            if(innerInputElement) {
                innerInputElement.focus()
            }
            // no input-element found
            else {
                console.warn("No input-element for focus-directive on element " + el.tagName + " found!")
            }
        }
    }
}