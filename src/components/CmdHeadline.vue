<template>
    <div v-if="!editModeContext?.editing" :class="['cmd-headline', getTextAlign]">
        <!-- begin CmdIcon -->
        <CmdIcon v-if="headlineIcon" :iconClass="headlineIcon?.iconClass" :type="headlineIcon?.iconType" />
        <!-- end CmdIcon -->

        <div v-if="preHeadlineText">
            <span class="pre-headline-text">{{ preHeadlineText }}</span>
            <component :is="getHeadlineTag">
                <!-- being slot -->
                <slot>{{ headlineText }}</slot>
                <!-- end slot -->
            </component>
        </div>
        <component v-else :is="getHeadlineTag">
            <!-- being slot -->
            <slot>{{ headlineText }}</slot>
            <!-- end slot -->
        </component>
    </div>
    <!-- begin edit-mode -->
    <input v-else type="text" :class="['edit-mode', 'headline', 'h'+ headlineLevel]" v-model="editableHeadlineText" />
    <!-- end edit-mode -->
</template>

<script>
export default {
    name: "CmdHeadline",
    inject: {
        editModeContext: {
            default: null
        }
    },
    data() {
        return {
            editableHeadlineText: this.headlineText
        }
    },
    props: {
        /**
         * text for headline
         */
        headlineText: {
            type: String,
            required: false
        },
        /**
         * level for headline
         */
        headlineLevel: {
            type: [String, Number],
            required: true
        },
        /**
         * small pre-headline-text above main-headline
         */
        preHeadlineText: {
            type: String,
            required: false
        },
        /**
         * icon-class for icon shown left/before headline
         */
        headlineIcon: {
            type: Object,
            required: false
        },
        /**
         * text-alignment
         *
         * @allowedValues: "left", "center", "right"
         */
        textAlign: {
            type: String,
            default: null
        },
        editModeContextData: {
            type: Object
        }
    },
    mounted() {
        this.editModeContext?.addSaveHandler(this.onSave)
    },
    computed: {
        getHeadlineTag() {
            if(this.headlineLevel) {
                return "h" + this.headlineLevel
            }
            return ""
        },
        getTextAlign() {
            if(this.textAlign) {
                return "text-" + this.textAlign
            }
            return ""
        }
    },
    methods: {
        onSave() {
            const headlineText = this.editableHeadlineText
            return {
                editModeContextData: {
                    ...(this.editModeContextData || {})
                },
                headlineText,
                update(props) {
                    props.headlineText = headlineText
                }
            }
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-headline ------------------------------------------------------------------------------------------ */
//@import '../assets/styles/variables';

.cmd-headline {
    margin-bottom: var(--default-margin);
    gap: calc(var(--default-gap) / 2);

    &.text-center > * {
        text-align: center;
    }

    &.text-right > * {
        text-align: right;
    }

    &:has(span[class*="icon"]) {
        display: flex;
        align-items: center;
    }

    &:has(h1) span[class*="icon"] {
        font-size: calc(var(--headline-font-size-h1) * 1.6);
    }

    &:has(h2) span[class*="icon"] {
        font-size: calc(var(--headline-font-size-h2) * 1.8);
    }

    &:has(h3) span[class*="icon"] {
        font-size: calc(var(--headline-font-size-h3) * 1.9);
    }

    &:has(h4) span[class*="icon"] {
        font-size: calc(var(--headline-font-size-h4) * 2);
    }

    &:has(h5) span[class*="icon"] {
        font-size: calc(var(--headline-font-size-h5) * 2.1);
    }

    &:has(h6) span[class*="icon"] {
        font-size: calc(var(--headline-font-size-h6) * 2.2);
    }

    &:has(h4, h5, h6) .pre-headline-text {
        font-size: var(--font-size-small);
    }

    .pre-headline-text {
        line-height: 1;
    }

    h1, h2, h3, h4, h5, h6 {
        margin: 0;

        &:only-child {
            flex: none;
            width: 100%;
        }
    }
}
/* end cmd-headline ------------------------------------------------------------------------------------------ */
</style>
