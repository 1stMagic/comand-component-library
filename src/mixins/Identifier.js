// import utils
import {createHtmlId} from "@/utils/common";

export default {
    props: {
        /**
         * use as unique id if generated it should not be used
         */
        id: {
            type: String,
            required: false
        }
    },
    computed: {
        htmlId() {
            return this.id || createHtmlId()
        }
    },
    methods: {
        buildHtmlId(...params) {
            return params
                .map(param => {
                    return param.replace(/\s/g, "")
                })
                .join("")
        }
    }
}