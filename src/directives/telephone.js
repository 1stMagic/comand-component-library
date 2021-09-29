export default {
    // el = real dom-element
    // binding.value = value of v-directive
    mounted(el, binding) {
        let regex = /[^\d]/g // match everything except all digits (and continue (/g) after first match is found)
        let phonenumber = binding.value.replace(/^\s*\+/, "00")
        el.href = "tel:" + phonenumber.replace(regex, "")
    }
}