<template>
    <div class="cmd-opening-hours">
        <!-- begin cmd-custom-headline -->
        <CmdCustomHeadline v-if="cmdCustomHeadline" :headline="cmdCustomHeadline" />
        <!-- end cmd-custom-headline -->

        <!-- begin opening-status with link to detail-page -->
        <template v-if="link && link?.path && link?.show">
            <a v-if="link.type === 'href'" :href="link.path" :class="{closed: closed}">{{ textOpenClosed }}</a>
            <router-link v-if="link.type === 'router'"  :to="link.path" :class="{closed: closed}">{{ textOpenClosed }}</router-link>
            <button v-if="link.type === 'button'" :class="['button', {closed: closed}]">{{ textOpenClosed }}</button>
        </template>
        <!-- end opening-status with link to detail-page -->

        <!-- begin opening-status (without link) -->
        <span v-else :class="{'closed': closed}">{{ textOpenClosed }}</span>
        <!-- end opening-status (without link) -->

        <!-- begin opening-days and -hours -->
        <dl>
            <template v-for="day in openingHours" :key="day.day">
                <dt>{{ day.day }}:</dt>
                <dd>{{ day.fromTime }}&ndash;{{ day.tillTime }}</dd>
            </template>
        </dl>
        <!-- end opening-days and -hours -->

        <!-- begin holiday-closes-text and miscellaneous information -->
        <div v-if="textHolidaysClosed || textMiscInfo">
            <p v-if="textHolidaysClosed">
                <strong>{{ textHolidaysClosed }}</strong>
            </p>
            <p v-if="textMiscInfo">{{ textMiscInfo }}</p>
        </div>
        <!-- end holiday-closes-text and miscellaneous information -->
    </div>
</template>

<script>
// import components
import CmdCustomHeadline from "./CmdCustomHeadline"

export default {
    name: "CmdOpeningHours",
    components: {CmdCustomHeadline},
    props: {
        /**
         * properties for CmdCustomHeadline-component
         */
        cmdCustomHeadline: {
            type: Object,
            required: false
        },
        /**
         * set a link to a detail page
         */
        link: {
            type: Object,
            required: false
        },
        /**
         * toggles if "closed"-text will be shown
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