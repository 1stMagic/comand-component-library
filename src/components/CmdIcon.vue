<template>
    <!-- begin iconify-icon -->
    <Icon v-if="isIconify" :icon="iconClass" :title="tooltip" :class="$attrs.class"></Icon>
    <!-- end iconify-icon -->

    <!-- begin icon from local iconfont -->
    <span v-else :class="[iconClass, $attrs.class]" :title="tooltip"></span>
    <!-- end icon from local iconfont -->
</template>

<script>
// import components
import {Icon} from "@iconify/vue"

export default {
    name: "CmdIcon",
    components: {
        Icon
    },
    props: {
        /**
         * type that defines where the icon is loaded from
         * 'auto' is for letting the component check (by classname) if the icon should be loaded from the local iconfont (class="icon-'iconname'")
         *  or if the icon should be loaded form iconify-api (class='fontprefix':'iconname') (https://iconify.design/)
         * 'iconify' forces the component to load an iconify icon (without api) from a local source (which must be defined)
         *
         * @allowedValues: 'auto', 'iconify'
         */
        type: {
            type: String,
            default: "auto"
        },
        /**
         * icon-class for icon from local iconfont
         *
         * type-property must be set to auto and classname must include icon-'iconname'
         */
        iconClass: {
            type: String,
            required: true
        },
        /**
         * tooltip text for icon
         *
         * @requiredForAccessibility: true
         */
        tooltip: {
            type: String,
            required: false
        }
    },
    computed: {
        isIconify() {
            if (this.type === "iconify") {
                return true
            }
            if (this.type === "auto") {
                return this.iconClass.includes(":")
            }
            return false
        }
    }
}
</script>

<style lang="scss">
.iconify {
    font-size: var(--icon-size);
    vertical-align: text-bottom;

    & + span, span + &  {
        margin-left: calc(var(--default-margin) / 2);
    }
}
</style>