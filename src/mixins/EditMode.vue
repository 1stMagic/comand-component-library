<script>
import {findEditComponentWrapper} from "../utils/editmode.js"

export default {
    inject: {
        editModeContext: {
            default: null
        }
    },
    data() {
        return {
            editing: false
        }
    },
    created() {
        const editComponentWrapper = findEditComponentWrapper(this.$parent)
        if (editComponentWrapper) {
            editComponentWrapper.addEditStateListener(editing => this.editing = editing)
            editComponentWrapper.addUpdateHandlerProvider(this.updateHandlerProvider)
            editComponentWrapper.setAddHandlerProvider(this.addHandlerProvider)
        }
    },
    methods: {
        updateHandlerProvider() {
            return {}
        }
    }
}
</script>
