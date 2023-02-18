<template>
    <div :class="['cmd-headline', {'has-pre-headline-text': preHeadlineText, 'has-icon': headlineIcon?.iconClass}, getTextAlign]">
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
</template>

<script>
// import components
import CmdIcon from "./CmdIcon"

export default {
    name: "CmdHeadline",
    components: {
        CmdIcon
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
            default: "left"
        }
    },
    computed: {
        getHeadlineTag() {
            if(this.headlineLevel) {
                return "h" + this.headlineLevel
            }
            return "h3"
        },
        getTextAlign() {
            if(this.textAlign) {
                return "text-" + this.textAlign
            }
            return ''
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-headline ------------------------------------------------------------------------------------------ */
@import '../assets/styles/variables';

.cmd-headline {
    margin-bottom: var(--default-margin);
    gap: calc(var(--default-gap) / 2);

    &.text-center > * {
        text-align: center;
    }

    &.text-right > * {
        text-align: right;
    }

    &.has-icon {
        display: flex;
        align-items: center;
    }

    &.has-pre-headline-text {
        text-align: inherit;

        [class*="icon-"] {
            font-size: 5rem;
        }
    }

    p {
        margin-bottom: 0;
    }

    h1, h2, h3, h4, h5, h6 {
        margin: 0;

        &:only-child {
            flex: none;
            width: 100%;
        }
    }

    @media only screen and ($small-max-width) {
        flex-direction: column;

        h1 {
            margin-bottom: calc(var(--default-margin) * 2);
        }
    }
}
/* end cmd-headline ------------------------------------------------------------------------------------------ */
</style>
