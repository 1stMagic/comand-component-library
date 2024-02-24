<template>
    <!-- begin default-view -->
    <li v-if="!editing" class="cmd-list-of-links-item">
        <!-- begin use href -->
        <a v-if="link.type === 'href' || link.type === undefined"
           :href="link.path"
           :target="link.target"
           @click="executeLink(link, $event)"
           :title="link.tooltip && link.tooltip !== undefined ? link.tooltip : undefined">
            <!-- begin CmdIcon -->
            <CmdIcon v-if="link.iconClass" :iconClass="link.iconClass" :type="link.iconType" />
            <!-- end CmdIcon -->
            <span v-if="link.text">{{ link.text }}</span>
        </a>
        <!-- end use href --->

        <!-- begin use router-link -->
        <router-link v-else-if="link.type === 'router'"
                     :to="getRoute(link)"
                     :title="link.tooltip">
            <!-- begin CmdIcon -->
            <CmdIcon v-if="link.iconClass" :iconClass="link.iconClass" :type="link.iconType" />
            <!-- end CmdIcon -->
            <span v-if="link.text">{{ link.text }}</span>
        </router-link>
        <!-- end use router-link -->
    </li>
    <!-- end default-view -->

    <!-- begin edit-mode -->
    <template v-else>
        <div class="input-wrapper">
            <CmdFormElement
                element="input"
                type="text"
                labelText="Linktext"
                :showLabel="false"
                placeholder="Linktext"
                v-model="editableText"
            />
        </div>
    </template>
    <!-- end edit-mode -->
</template>

<script>
import EditMode from "../mixins/EditMode.vue"

// import functions
//import {getRoute} from 'comand-component-library'
import {openFancyBox} from "./CmdFancyBox.vue"
import {buildComponentPath, updateHandlerProvider} from "../utils/editmode.js"
export default {
    name: "CmdListOfLinksItem",
    inheritAttrs: false,
    mixins: [EditMode],
    data() {
        return {
            editableText: this.link.text
        }
    },
    props: {
        /**
         * single link
         */
        link: {
            type: Object,
            required: false
        }
    },
    methods: {
        updateHandlerProvider() {
            const text = this.editableText
            return updateHandlerProvider(this, {
                update(props) {
                    props.text = text
                }
            })
        },
        getRoute(link) {
            return getRoute(link)
        },
        executeLink(link, event) {
            if (link.fancybox) {
                event.preventDefault()
                openFancyBox({url: link.path, showSubmitButtons: link.showSubmitButtons})
                return
            }
            this.$emit("click", {link, originalEvent: event})
        },
    }
}
</script>

<style lang="scss">

</style>
