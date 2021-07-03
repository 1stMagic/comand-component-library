<template>
    <div class="cmd-width-limitation-wrapper" :class="{'sticky': sticky}">
        <component :is="innerComponent" :class="setInnerClass" v-if="innerWrapper">
            <a :id="anchorId" v-if="anchorId"></a>
            <slot></slot>
        </component>
        <template v-else>
            <a :id="anchorId" v-if="anchorId"></a>
            <slot></slot>
        </template>
    </div>
</template>

<script>
export default {
    name: "CmdWidthLimitationWrapper",
    props: {
        innerComponent: {
            type: String,
            default: "section",
            validator (value) {
                if(!value) {
                    return false
                }
                return true
            }
        },
        innerWrapper: {
            type: Boolean,
            default: true
        },
        sticky: {
          type: Boolean,
          default: false
        },
        innerClass: {
            type: String,
            required: false
        },
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
/* begin cmd-width-limitation-wrapper --------------------------------------------------------------------------------------------------------------------------------------------------- */
.cmd-width-limitation-wrapper {
    > * {
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
/* end cmd-width-limitation-wrapper --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>