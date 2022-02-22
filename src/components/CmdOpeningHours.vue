<template>
    <div class="cmd-opening-hours">
        <!-- begin headline -->
        <CmdCustomHeadline v-if="cmdCustomHeadline" :headline="cmdCustomHeadline" />
        <!-- end headline -->

        <a v-if="pathToDetails" :href="pathToDetails" :class="{closed: closed}">{{ textOpenClosed }}</a>
        <span v-else :class="{'closed': closed}">{{ textOpenClosed }}</span>
        <dl>
            <template v-for="day in openingHours" :key="day.day">
                <dt>{{ day.day }}:</dt>
                <dd>{{ day.fromTime }}&ndash;{{ day.tillTime }}</dd>
            </template>
        </dl>
        <div>
            <p v-if="textHolidaysClosed"><strong>{{ textHolidaysClosed }}</strong></p>
            <p v-if="textMiscInfo">{{ textMiscInfo }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "CmdOpeningHours",
    props: {
        /**
         * properties for CmdCustomHeadline-component
         */
        cmdCustomHeadline: {
            type: Object,
            required: false
        },
        /**
         * set a path to a detail page
         */
        pathToDetails: {
            type: String,
            required: false
        },
        /**
         * toggles if "closed"-text will be shown (and styled)
         *
         * @affectsStyling: true
         */
        closed: {
            type: Boolean,
            default: false
        },
        /**
         * text for open/closed-information
         */
        textOpenClosed: {
            type: String,
            required: true
        },
        /**
         * list of opening-hours
         */
        openingHours: {
            type: Array,
            required: true
        },
        /**
         * text to show if holidays closed (shown below opening-hours)
         */
        textHolidaysClosed: {
            type: String,
            required: false
        },
        /**
         * additional/miscellaneous text (shown below holiday-closed-text/opening hours)
         */
        textMiscInfo: {
            type: String,
            required: false
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-opening-hours ------------------------------------------------------------------------------------------ */
.cmd-opening-hours {
    > a, > span {
        padding: calc(var(--default-padding) / 2);
        font-weight: bold;
        display: table;
        margin-bottom: var(--default-margin);
        color: var(--pure-white);
        background: #0b0;

        &.closed {
            background: #b00;
        }
    }

    > a {
        &:hover, &:active, &:focus {
            text-decoration: underline;
            color: var(--pure-white);
        }
    }

    p:last-child {
        margin: 0;
    }
}

/* end cmd-opening-hours ------------------------------------------------------------------------------------------ */
</style>