export default {
    mounted(el) {
        const heightHeader = el.outerHeight
        document.documentElement.style.scrollPaddingTop = (heightHeader / 10) + "rem"
    }
}