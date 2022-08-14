<template>
    <div class="cmd-opening-hours">
        <!-- begin cmd-custom-headline -->
        <CmdHeadline v-if="cmdHeadline" v-bind="cmdHeadline" />
        <!-- end cmd-custom-headline -->

        <!-- begin opening-status with link to detail-page -->
        <template v-if="link && link?.path && link?.show">
            <a v-if="link.type === 'href'" :href="link.path" :class="{closed: isClosed}">{{ textOpenClosed }}</a>
            <router-link v-if="link.type === 'router'"  :to="link.path" :class="{closed: isClosed}">{{ textOpenClosed }}</router-link>
            <button v-if="link.type === 'button'" :class="['button', {closed: isClosed}]">{{ textOpenClosed }}</button>
        </template>
        <!-- end opening-status with link to detail-page -->

        <!-- begin opening-status (without link) -->
        <span v-else :class="{'closed': isClosed}">{{ textOpenClosed }}</span>
        <!-- end opening-status (without link) -->

        <!-- begin opening-days and -hours -->
        <dl>
            <template v-for="day in openingHoursFormatted" :key="day.day">
                <dt>{{ day.day }}:</dt>
                <dd>{{ getTime(day.fromTime)}}&ndash;{{ getTime(day.tillTime)}}</dd>
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
import CmdHeadline from "./CmdHeadline"

export function localizedTime(language) {
    return (hour, minute) => {
        const now = new Date()
        now.setHours(hour, minute, 0, 0)
        return new Intl.DateTimeFormat(language, {timeStyle: "short"}).format(now)
    }
}

export function timeFormatting(separator, suffix1, suffix2, hoursLeadingZero = true) {
    function addLeadingZero(time, addLeadingZero) {
        if(addLeadingZero && time < 10) {
            return "0" + time
        }
        return time
    }

    return (hour, minute) => {
        if(suffix2) {
            let hour12 = hour
            let currentSuffix = suffix1
            if(hour12 > 12) {
                hour12 -= 12
                currentSuffix = suffix2
            }
            return addLeadingZero(hour12, hoursLeadingZero) + separator + addLeadingZero(minute, true) + currentSuffix
        }
        return addLeadingZero(hour, hoursLeadingZero) + separator + addLeadingZero(minute, true) + suffix1
    }
}

export default {
    name: "CmdOpeningHours",
    components: {
        CmdHeadline
    },
    props: {
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
         * text for 'open'-information
         */
        textOpen: {
            type: String,
            default: "Open right now!"
        },
        /**
         * text for 'closed'-information
         */
        textClosed: {
            type: String,
            default: "Closed right now!"
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
        },
        /**
         * properties for CmdHeadline-component
         */
        cmdHeadline: {
            type: Object,
            required: false
        },
        /**
         * option to set custom time format by function
         */
        timeFormatter: {
            type: Function,
            required: false
        },
        /**
         * activate if component should update open-/closed-status on its own
         */
        componentHandlesClosedStatus: {
            type: Boolean,
            default: true
        }
    },
    created() {
        setInterval(function () {
            this.isClosed()
        }, 5000)
    },
    computed: {
        textOpenClosed() {
            return this.isClosed ? this.textClosed : this.textOpen
        },
        openingHoursFormatted() {
            const weekdays = []
            for(let i = 0; i < this.openingHours.length; i++) {
                const openingHours = {}
                const splitFromTime = this.openingHours[i].fromTime.split(/[:.]/)
                const splitTillTime = this.openingHours[i].tillTime.split(/[:.]/)

                openingHours.day = this.openingHours[i].day
                openingHours.fromTime = {
                    hours: parseInt(splitFromTime[0]),
                    mins: parseInt(splitFromTime[1])
                }
                openingHours.tillTime = {
                    hours: parseInt(splitTillTime[0]),
                    mins: parseInt(splitTillTime[1])
                }
                weekdays.push(openingHours)
            }
            return weekdays
        },
        isClosed() {
            if(!this.componentHandlesClosedStatus) {
                return this.closed
            }

            const currentDate = new Date()
            let currentDay = currentDate.getDay()

            // fix order and check if currentDay equals 0 === sunday. Data are expected to start with monday
            if (currentDay === 0){
                currentDay = 6
            } else {
                currentDay -= 1
            }

            const openingHours = this.openingHoursFormatted[currentDay]

            if(this.openingHoursFormatted[currentDay]) {
                const openingHoursFrom = new Date()
                openingHoursFrom.setHours(openingHours.fromTime.hours, openingHours.fromTime.mins)

                const openingHoursTill = new Date()
                openingHoursTill.setHours(openingHours.tillTime.hours, openingHours.tillTime.mins)

                if (openingHoursFrom <= currentDate && currentDate <= openingHoursTill) {
                    return false
                }
            }
            return true
        }
    },
    methods: {
        getTime(time) {
            if(this.timeFormatter) {
                return this.timeFormatter(time.hours, time.mins)
            }
           return timeFormatting(":", " hrs", "", false)(time.hours, time.mins)
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