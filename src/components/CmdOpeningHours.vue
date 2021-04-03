<template>
    <div class="cmd-opening-hours">
        <h4 v-if="headline">{{ headline }}</h4>
        <a v-if="path" :href="path" :class="{'closed': closed}">{{ textOpenClosed }}</a>
        <span v-else :class="{'closed': closed}">{{ textOpenClosed }}</span>
        <dl>
            <template v-for="day in openingHours">
                <dt :key="day.day + '_dt'">{{ day.day }}:</dt><dd :key="day.day + '_dd'">{{ day.fromTime }}&ndash;{{ day.tillTime }}</dd>
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
            headline: {
                type: String,
                required: false
            },
            path: {
                type: String,
                required: false
            },
            closed: {
                type: Boolean,
                default: false
            },
            textOpenClosed: {
                type: String,
                required: true
            },
            openingHours: {
                type: Array,
                required: true
            },
            textHolidaysClosed: {
                type: String,
                required: false
            },
            textMiscInfo: {
                type: String,
                required: false
            }
        }
    }
</script>

<style lang="scss">
/* begin cmd-opening-hours --------------------------------------------------------------------------------------------------------------------------------------------------- */
.cmd-opening-hours {
    > a, > span {
        padding: calc(var(--default-padding) / 2);
        font-weight: bold;
        display: table;
        margin-bottom: var(--default-margin);
    }

    p:last-child {
        margin: 0;
    }
}
/* end cmd-opening-hours --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>