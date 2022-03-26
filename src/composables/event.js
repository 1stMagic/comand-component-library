import {onMounted, onUnmounted} from "vue"

function useEventListener(target, event, listener) {
    onMounted(() => target.addEventListener(event, listener))
    onUnmounted(() => target.removeEventListener(event, listener))
}

export {useEventListener}
