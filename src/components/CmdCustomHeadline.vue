<template>
    <header :class="['cmd-custom-headline', { 'has-pre-headline-text': preHeadlineText}]">
        <span v-if="iconClass" :class="iconClass"></span>
        <div v-if="preHeadlineText">
            <span class="pre-headline-text">{{ preHeadlineText }}</span>
            <component :is="getHeadlineTag">
                <slot>{{ headlineText }}</slot>
            </component>
        </div>
        <component v-else :is="getHeadlineTag">
            <slot>{{ headlineText }}</slot>
        </component>
    </header>
</template>

<script>
export default {
    name: "CmdCustomHeadline",
    props: {
        /**
         * text for headline
         */
        headlineText: {
            type: String,
            required: true
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
        iconClass: {
            type: String,
            required: false
        }
    },
    computed: {
        getHeadlineTag() {
            return "h" + this.headlineLevel
        }
    }
}
</script>

<style lang="scss">
@import '../assets/styles/variables';

/* begin cmd-custom-headline ------------------------------------------------------------------------------------------ */
.cmd-custom-headline {
    display: flex;
    align-items: center;
    margin-bottom: var(--default-margin);
    gap: calc(var(--default-gap) / 2);

    &.has-pre-headline-text {
        [class*="icon"] {
            font-size: 5rem;
        }
    }

    p {
        margin-bottom: 0;
    }

    h1, h2, h3, h4, h5 ,h6 {
        margin: 0;
        display: flex;
        align-items: center;
    }

    @media only screen and ($small-max-width) {
        flex-direction: column;

        h1 {
            margin-bottom: calc(var(--default-margin) * 2);
        }
    }
}

/* end cmd-custom-headline ------------------------------------------------------------------------------------------ */
</style>
