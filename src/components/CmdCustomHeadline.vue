<template>
    <header :class="['cmd-custom-headline', { 'pre-headline': preHeadline}]">
        <span v-if="iconClass" :class="iconClass"></span>
        <div v-if="preHeadline">
            <p>{{ preHeadline }}</p>
            <component :is="getHeadlineTag">
                <slot>{{ headline.text }}</slot>
            </component>
        </div>
        <component v-else :is="getHeadlineTag">
            <slot>{{ headline.text }}</slot>
        </component>
    </header>
</template>

<script>
export default {
    name: "CmdCustomHeadline",
    props: {
        /**
         * headline-text and headline-level
         */
        headline: {
            type: Object,
            default() {
                return {
                    text: "",
                    level: 2
                }
            }
        },
        /**
         * small pre-headline above main-headline
         */
        preHeadline: {
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
            return "h" + this.headline.level
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

    &.pre-headline {
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
