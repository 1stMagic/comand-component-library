<template>
    <!-- begin opening-days and -hours -->
    <template v-if="!editing">
        <dt class="cmd-opening-hours-item">{{ day.day }}</dt>
        <dd>
            <span v-if="day.am" class="am">
                <template v-if="day.am.displayText">{{ day.am.displayText }}</template>
                <template
                    v-else>{{ getTime(day.am.fromTime) }} {{ separator }} {{
                        getTime(day.am.tillTime)
                    }}</template>
            </span>
            <span v-if="day.pm" class="pm">
                <template v-if="day.pm.displayText">{{ day.pm.displayText }}</template>
                <template
                    v-else>{{ getTime(day.pm.fromTime) }} {{ separator }} {{
                        getTime(day.pm.tillTime)
                    }}</template>
            </span>
        </dd>
    </template>
    <!-- end opening-days and -hours -->

    <!-- begin edit-mode -->
    <template v-else>
        <!-- begin day -->
        <dt>
            <CmdFormElement
                element="input"
                type="text"
                class="edit-mode"
                :showLabel="false"
                labelText="Text for weekday"
                placeholder="Text for weekday"
                v-model="editableDay.day"
            />
        </dt>
        <!-- end day -->

        <!-- begin hours -->
        <dd class="flex-container no-flex">
            <!-- begin AM -->
            <div class="flex-container no-flex am-wrapper">
            <template v-if="editableDay.amClosed">
                <CmdFormElement
                    element="input"
                    type="text"
                    class="edit-mode"
                    :showLabel="false"
                    labelText="Text for 'closed'"
                    placeholder="Text for 'closed'"
                    v-model="editableDay.amDisplayText"
                />
            </template>
            <div v-if="!editableDay.amClosed" class="input-wrapper">
                <CmdFormElement
                    element="input"
                    type="time"
                    class="edit-mode"
                    :showLabel="false"
                    labelText="Text for AM from"
                    placeholder="Text for AM from"
                    v-model="editableDay.amFrom"
                />
                <CmdFormElement
                    element="input"
                    type="time"
                    :showLabel="false"
                    class="edit-mode"
                    :min="editableDay.amFrom"
                    labelText="Text for AM till"
                    placeholder="Text for AM till"
                    v-model="editableDay.amTill"
                />
            </div>
            <a href="#"
               @click.prevent="toggleClosedStatus('am')"
               :title="editableDay.amClosed ? 'Set to open' : 'Set to closed'"
               :class="editableDay.amClosed ? 'icon-clock' : 'icon-blocked'"
            ></a>
            </div>
            <!-- end AM -->

            <!-- begin PM -->
            <div class="flex-container no-flex pm-wrapper">
                <template v-if="editableDay.pmClosed">
                    <CmdFormElement
                        element="input"
                        type="text"
                        class="edit-mode"
                        :showLabel="false"
                        labelText="Text for 'closed'"
                        placeholder="Text for 'closed'"
                        v-model="editableDay.pmDisplayText"
                    />
                </template>
                <div v-if="!editableDay.pmClosed" class="input-wrapper">
                    <CmdFormElement
                        element="input"
                        type="time"
                        :showLabel="false"
                        class="edit-mode"
                        labelText="Text for PM from"
                        placeholder="Text for PM from"
                        v-model="editableDay.pmFrom"
                    />
                    <CmdFormElement
                        element="input"
                        type="time"
                        :showLabel="false"
                        class="edit-mode"
                        :min="editableDay.pmFrom"
                        labelText="Text for PM till"
                        placeholder="Text for PM till"
                        v-model="editableDay.pmTill"
                    />
                </div>
                <a href="#"
                   @click.prevent="toggleClosedStatus('pm')"
                   :title="editableDay.pmClosed ? 'Set to open' : 'Set to closed'"
                   :class="editableDay.pmClosed ? 'icon-clock' : 'icon-blocked'"
                ></a>
            </div>
            <!-- end PM -->
        </dd>
        <!-- end hours -->
    </template>
    <!-- end edit-mode -->
</template>

<script>
import EditMode from "../mixins/EditMode.vue"
import {updateHandlerProvider} from "../utils/editmode.js"

function timeFormatting(separator, suffix1, suffix2, hoursLeadingZero = true) {
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
    name: "CmdOpeningHoursItem",
    mixins: [EditMode],
    data() {
        return {
            editableDay: {}
        }
    },
    props: {
        /**
         * list of opening-hours
         */
        day: {
            type: Object,
            required: true
        },
        /**
         * separator for time-spans
         */
        separator: {
            type: String,
            default: "–"
        },
        /**
         *  abbreviation text for 'hours' (as a unit after displayed times)
         */
        abbreviationText: {
            type: String,
            default: "h"
        },
        /**
         * option to set custom time format by function
         */
        timeFormatter: {
            type: Function,
            required: false
        }
    },
    methods: {
        toggleClosedStatus(period) {
            period  === 'am' ? this.editableDay.amClosed = !this.editableDay.amClosed : this.editableDay.pmClosed = !this.editableDay.pmClosed
        },
        getTime(time) {
            if (this.timeFormatter) {
                return this.timeFormatter(time.hours, time.mins)
            }
            return timeFormatting(":", " " + this.abbreviationText, "", false)(time.hours, time.mins)
        },
        updateHandlerProvider() {
            const data = this.editableDay
            return updateHandlerProvider(this, {
                update(props) {
                    props.day = data.day
                    if (!props.am) {
                        props.am = {}
                    }
                    props.am.fromTime = data.amFrom
                    props.am.tillTime = data.amTill
                    props.am.displayText = data.amClosed ? data.amDisplayText : ""
                    if (!props.pm) {
                        props.pm = {}
                    }
                    props.pm.fromTime = data.pmFrom
                    props.pm.tillTime = data.pmTill
                    props.pm.displayText = data.pmClosed ? data.pmDisplayText : ""
                }
            })
        }
    },
    watch: {
        day: {
            handler() {
                const timeFormatter = timeFormatting(":", "", "", true)
                this.editableDay = {
                    day: this.day.day,
                    amFrom: timeFormatter(this.day.am.fromTime.hours, this.day.am.fromTime.mins),
                    amTill: timeFormatter(this.day.am.tillTime.hours, this.day.am.tillTime.mins),
                    amDisplayText: this.day.am.displayText,
                    amClosed: !!this.day.am.displayText,
                    pmFrom: timeFormatter(this.day.pm.fromTime.hours, this.day.pm.fromTime.mins),
                    pmTill: timeFormatter(this.day.pm.tillTime.hours, this.day.pm.tillTime.mins),
                    pmClosed: !!this.day.pm.displayText,
                    pmDisplayText: this.day.pm.displayText
                }
            },
            immediate: true,
            deep: true
        }
    }
}
</script>

<style lang="scss">
.edit-mode-opening-hours-item {
    .am-wrapper, .pm-wrapper {
        align-items: center;
        gap: calc(var(--default-gap) / 2);
    }

    label {
        max-width: 11rem;
    }

    .input-wrapper {
        width: 11rem;
    }
}
</style>