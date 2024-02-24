<template>
    <div class="cmd-opening-hours">
        <!-- begin cmd-headline -->
        <CmdHeadline
            v-if="cmdHeadline?.headlineText || editModeContext"
            v-bind="cmdHeadline"
        />
        <!-- end cmd-headline -->

        <!-- begin opening-status with link to detail-page -->
        <template v-if="!editing">
            <template v-if="link && link?.path && link?.show">
                <a v-if="link.type === 'href'" :href="link.path" :class="{closed: isClosed}">{{ textOpenClosed }}</a>
                <router-link v-if="link.type === 'router'" :to="link.path" :class="{closed: isClosed}">{{
                        textOpenClosed
                    }}
                </router-link>
                <button v-if="link.type === 'button'" :class="['button', {closed: isClosed}]">{{
                        textOpenClosed
                    }}
                </button>
            </template>
            <!-- end opening-status with link to detail-page -->

            <!-- begin opening-status (without link) -->
            <span v-else :class="{'closed': isClosed}">{{ textOpenClosed }}</span>
            <!-- end opening-status (without link) -->
        </template>

        <!-- begin edit-mode -->
        <div v-else class="flex-container">
            <CmdFormElement
                element="input"
                type="text"
                :showLabel="false"
                labelText="Text for 'open'"
                placeholder="Text for 'open'"
                v-model="textOpenModel"
            />
            <CmdFormElement
                element="input"
                type="text"
                :showLabel="false"
                labelText="Text for 'closed'"
                placeholder="Text for 'closed'"
                v-model="textClosedModel"
            />
        </div>
        <!-- end edit-mode -->

        <!-- begin default view -->
        <dl v-if="!editModeContext">
            <CmdOpeningHoursItem
                v-for="(day, index) in openingHoursFormatted"
                :key="index"
                :day="day"
                :separator="separator"
                :abbreviationText="abbreviationText"
            />
        </dl>
        <!-- end default view -->

        <!-- begin edit-mode -->
        <button v-if="openingHoursFormatted.length === 0" type="button" class="button confirm small" @click="onAddItem">
            <span class="icon-plus"></span>
            <span>Add new entry</span>
        </button>

        <EditComponentWrapper
            v-else
            v-for="(day, index) in openingHoursFormatted"
            :key="'x' + index"
            class="edit-items"
            :showComponentName="false"
            componentName="CmdOpeningHoursItem"
            :componentProps="day"
            :allowedComponentTypes="[]"
            :componentPath="['props', 'openingHours', index]"
            :itemProvider="itemProvider"
        >
            <dl class="edit-mode-opening-hours-item">
                <CmdOpeningHoursItem
                    :day="day"
                    :separator="separator"
                    :abbreviationText="abbreviationText"
                />
            </dl>
        </EditComponentWrapper>
        <!-- end edit-mode -->

        <!-- begin holiday-closes-text and miscellaneous information -->
        <div v-if="!editing && (textHolidays || textMiscInfo)">
            <p v-if="textHolidays">
                <strong>{{ textHolidays }}</strong>
            </p>
            <p v-if="textMiscInfo">{{ textMiscInfo }}</p>
        </div>
        <!-- end holiday-closes-text and miscellaneous information -->

        <!-- begin edit-mode -->
        <div v-if="editing" class="flex-container vertical">
            <CmdFormElement
                element="input"
                type="text"
                :showLabel="false"
                labelText="Text for 'holidays'"
                placeholder="Text for 'holidays'"
                v-model="textHolidaysModel"
            />
            <CmdFormElement
                element="input"
                type="text"
                :showLabel="false"
                labelText="Miscellaneous information"
                placeholder="Miscellaneous information"
                v-model="textMiscInfoModel"
            />
        </div>
        <!-- end edit-mode -->
    </div>
</template>

<script>
import EditMode from "../mixins/EditMode.vue"
import {buildComponentPath, updateHandlerProvider} from "../utils/editmode.js"

export function localizedTime(language) {
    return (hour, minute) => {
        const now = new Date()
        now.setHours(hour, minute, 0, 0)
        return new Intl.DateTimeFormat(language, {timeStyle: "short"}).format(now)
    }
}

export function timeFormatting(separator, suffix1, suffix2, hoursLeadingZero = true) {
    function addLeadingZero(time, addLeadingZero) {
        if (addLeadingZero && time < 10) {
            return "0" + time
        }
        return time
    }

    return (hour, minute) => {
        if (suffix2) {
            let hour12 = hour
            let currentSuffix = suffix1
            if (hour12 > 12) {
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
    mixins: [EditMode],
    data() {
        return {
            currentTime: new Date(),
            editableOpeningHours: [],
            editableTextOpen: null,
            editableTextClosed: null,
            editableTextHolidays: null,
            editableTextMiscInfo: null
        }
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
        separator: {
            type: String,
            default: "–"
        },
        abbreviationText: {
            type: String,
            default: "h"
        },
        /**
         * list of opening-hours
         */
        openingHours: {
            type: Array,
            required: true
        },
        /**
         * text to show for holidays (shown below opening-hours)
         */
        textHolidays: {
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
        },
        /**
         * set the interval (in milliseconds) when the open-/closed-status should be checked (and updated)
         */
        checkInterval: {
            type: Number,
            default: 5000
        }
    },
    mounted() {
        if (this.componentHandlesClosedStatus && this.checkInterval > 0) {
            // create new property on component by 'this.property-name' and assign value (id) from setInterval (so it can be cleared in unmount)
            this.$_CmdOpeningHours_intervalId = setInterval(() => {
                // use arrow-function to assure that 'this' is the component
                this.currentTime = new Date()
            }, this.checkInterval)
        }
    },
    beforeUnmount() {
        if (this.$_CmdOpeningHours_intervalId) {
            // remove interval
            clearInterval(this.$_CmdOpeningHours_intervalId)

            // clear interval-id
            this.$_CmdOpeningHours_intervalId = null
        }
    },
    computed: {
        openingHoursFormatted() {
            const weekdays = []
            for (let i = 0; i < this.openingHours.length; i++) {
                const openingHours = {}
                const splitAmFromTime = this.openingHours[i].am.fromTime.split(/[:.]/)
                const splitAmTillTime = this.openingHours[i].am.tillTime.split(/[:.]/)
                const splitPmFromTime = this.openingHours[i].pm.fromTime.split(/[:.]/)
                const splitPmTillTime = this.openingHours[i].pm.tillTime.split(/[:.]/)

                openingHours.day = this.openingHours[i].day

                openingHours.am = {...this.openingHours[i].am}
                openingHours.am.fromTime = {
                    hours: parseInt(splitAmFromTime[0]),
                    mins: parseInt(splitAmFromTime[1])
                }
                openingHours.am.tillTime = {
                    hours: parseInt(splitAmTillTime[0]),
                    mins: parseInt(splitAmTillTime[1])
                }

                openingHours.pm = {...this.openingHours[i].pm}
                openingHours.pm.fromTime = {
                    hours: parseInt(splitPmFromTime[0]),
                    mins: parseInt(splitPmFromTime[1])
                }
                openingHours.pm.tillTime = {
                    hours: parseInt(splitPmTillTime[0]),
                    mins: parseInt(splitPmTillTime[1])
                }

                weekdays.push(openingHours)
            }
            return weekdays
        },
        textOpenModel: {
            get() {
                return this.editableTextOpen == null ? this.textOpen : this.editableTextOpen
            },
            set(value) {
                this.editableTextOpen = value
            }
        },
        textClosedModel: {
            get() {
                return this.editableTextClosed == null ? this.textClosed : this.editableTextClosed
            },
            set(value) {
                this.editableTextClosed = value
            }
        },
        textHolidaysModel: {
            get() {
                return this.editableTextHolidays == null ? this.textHolidays : this.editableTextHolidays
            },
            set(value) {
                this.editableTextHolidays = value
            }
        },
        textMiscInfoModel: {
            get() {
                return this.editableTextMiscInfo == null ? this.textMiscInfo : this.editableTextMiscInfo
            },
            set(value) {
                this.editableTextMiscInfo = value
            }
        },
        textOpenClosed() {
            return this.isClosed ? this.textClosed : this.textOpen
        },
        isClosed() {
            if (!this.componentHandlesClosedStatus) {
                return this.closed
            }

            let currentDay = this.currentTime.getDay()

            // fix order and check if currentDay equals 0 === sunday. Data are expected to start with monday
            if (currentDay === 0) {
                currentDay = 6
            } else {
                currentDay -= 1
            }

            const openingHours = this.openingHoursFormatted[currentDay]

            if (this.openingHoursFormatted[currentDay]) {
                // set hours for AM
                const openingHoursAmFrom = new Date()
                openingHoursAmFrom.setHours(openingHours.am.fromTime.hours, openingHours.am.fromTime.mins)

                const openingHoursAmTill = new Date()
                openingHoursAmTill.setHours(openingHours.am.tillTime.hours, openingHours.am.tillTime.mins)

                // set hours for PM
                const openingHoursPmFrom = new Date()
                openingHoursPmFrom.setHours(openingHours.pm.fromTime.hours, openingHours.pm.fromTime.mins)

                const openingHoursPmTill = new Date()
                openingHoursPmTill.setHours(openingHours.pm.tillTime.hours, openingHours.pm.tillTime.mins)

                // compare am/pm times with current time to determine if closed/open-text will be displayed
                if ((openingHoursAmFrom <= this.currentTime && this.currentTime <= openingHoursAmTill) && (openingHoursPmFrom <= this.currentTime && this.currentTime <= openingHoursPmTill)) {
                    return false
                }
            }
            return true
        }
    },
    methods: {
        onAddItem() {
            this.editModeContext.content.addContent(
                buildComponentPath(this, 'props', 'openingHours', -1),
                this.itemProvider)
        },
        itemProvider() {
            return {
                "day": "Weekday",
                "am": {
                    "fromTime": "00:00",
                    "tillTime": "00:00"
                },
                "pm": {
                    "fromTime": "00:00",
                    "tillTime": "00:00"
                }
            }
        },
        getTime(time) {
            if (this.timeFormatter) {
                return this.timeFormatter(time.hours, time.mins)
            }
            return timeFormatting(":", " hrs", "", false)(time.hours, time.mins)
        },
        updateHandlerProvider() {
            const openingHours = this.editableOpeningHours
            const textOpen = this.editableTextOpen
            const textClosed = this.editableTextClosed
            const textHolidays = this.editableTextHolidays
            const textMiscInfo = this.editableTextMiscInfo
            return updateHandlerProvider(this, {
                update(props, childUpdateHandlers) {
                    props.openingHours = openingHours
                    props.textOpen = textOpen
                    props.textClosed = textClosed
                    props.textHolidays = textHolidays
                    props.textMiscInfo = textMiscInfo
                    const cmdHeadlineUpdateHandler = childUpdateHandlers?.find(handler => handler.name === "CmdHeadline")
                    if (cmdHeadlineUpdateHandler) {
                        props.cmdHeadline = props.cmdHeadline || {}
                        cmdHeadlineUpdateHandler.update(props.cmdHeadline)
                    }
                }
            })
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
        background: var(--success-color);

        &.closed {
            background: var(--error-color);
        }
    }

    > a {
        &:hover, &:active, &:focus {
            text-decoration: underline;
            color: var(--pure-white);
        }
    }

    span.pm {
        margin-left: var(--default-margin);
    }

    p:last-child {
        margin: 0;
    }

    .edit-component-wrapper {
        dl {
            margin-bottom: 0;
        }
    }
}

.edit-component-wrapper .cmd-opening-hours {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: calc(var(--default-gap) / 2);

    dt {
        min-width: 2.5rem;
    }
}

/* end cmd-opening-hours ------------------------------------------------------------------------------------------ */
</style>