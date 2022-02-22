<template>
    <div class="cmd-width-limitation-wrapper" :class="{'sticky': sticky}">
        <component v-if="innerWrapper" :is="innerComponent" :class="setInnerClass">
            <a v-if="anchorId" :id="anchorId"></a>
            <slot></slot>
        </component>
        <template v-else>
            <a v-if="anchorId" :id="anchorId"></a>
            <slot></slot>
        </template>
    </div>
</template>

<script>
export default {
    name: "CmdWidthLimitationWrapper",
    props: {
        /**
         * set a html-tag as inner tag
         *
         * @allowedValues: section, div
         */
        innerComponent: {
            type: String,
            default: "section",
            validator(value) {
                return value;
            }
        },
        /**
         * activate if the inner content should be wrapped in inner component tag (recommended)
         *
         * (if deactivated, content will be directly placed inside cmd-width-limitation-wrapper)
         *
         */
        innerWrapper: {
            type: Boolean,
            default: true
        },
        /**
         * activate if wrapper (and its content) should be sticky (=position remains the same if content below is scrolled)
         *
         * i.e. use for site-header
         *
         * keep attention that more than one sticky-element on same html-level can cause problems, if content below is scrolled
         */
        sticky: {
            type: Boolean,
            default: false
        },
        /**
         * set class to inner component
         *
         * innerWrapper-property must be true
         */
        innerClass: {
            type: String,
            required: false
        },
        /**
         * set id for (invisible) anchor to enable shortcuts
         */
        anchorId: {
            type: String,
            required: false
        }
    },
    computed: {
        setInnerClass() {
            if (this.innerClass) {
                return this.innerClass
            }
            if (this.innerComponent === "header") {
                return "grid-container-create-columns"
            }
            if (this.innerComponent === "footer") {
                return "flex-container"
            }
            return ""
        },
        setOuterId() {
            if (this.innerComponent === "header") {
                return "site-header"
            }
            if (this.innerComponent === "footer") {
                return "site-footer"
            }
            return ""
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-width-limitation-wrapper ---------------------------------------------------------------------------------------- */
.cmd-width-limitation-wrapper {
    > * {
        max-width: var(--max-width);
        margin: 0 auto;
        padding: var(--default-padding);
    }

    &.sticky {
        position: sticky;
        left: 0;
        right: 0;
        top: 0;
    }

    &#site-footer {
        padding: var(--grid-gap) 0;
        border-top: var(--default-border);
        background: var(--default-background-color);

        &.sticky {
            top: auto;
            bottom: 0;
        }

        .cmd-switch-language {
            width: 100%;
            flex: none;
        }
    }
}

/* end cmd-width-limitation-wrapper ------------------------------------------------------------------------------------------ */
</style>