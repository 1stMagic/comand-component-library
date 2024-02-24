<script>
import {findEditComponentWrapper, findEditSettingsComponentWrapper, findMainSidebar} from "../utils/editmode.js"

export default {
    inject: {
        editModeContext: {
            default: null
        }
    },
    props: {
        componentPath: {
            type: Array
        },
        editModeConfig: {
            type: Object
        }
    },
    data() {
        return {
            editing: false,
            settingsContext: false,
            mainSidebarContext: false
        }
    },
    mounted() {
        this.initializeEditMode()
    },
    methods: {
        initializeEditMode() {
            if (this.$refs.editComponentWrapper) {
                this.$refs.editComponentWrapper?.addUpdateHandlerProvider(this.updateHandlerProvider)
            } else {
                const editComponentWrapper = findEditComponentWrapper(this.$parent);
                if (editComponentWrapper) {
                    editComponentWrapper.addEditStateListener(editing => this.editing = editing)
                    editComponentWrapper.addUpdateHandlerProvider(this.updateHandlerProvider)
                    editComponentWrapper.setAddHandlerProvider(this.addHandlerProvider)
                }
            }
            this.mainSidebarContext = !!findMainSidebar(this)
            this.settingsContext = !!findEditSettingsComponentWrapper(this)
        },
        updateHandlerProvider() {
            return {}
        }
    }
}
</script>
