<template>
    <ol class="cmd-multistep-form-progress-bar">
        <li v-for="(step, index) in multisteps" :key="index" :class="{active : activeLink === index}">
            <!-- begin type === href -->
            <a v-if="step.type === 'href'"
               :href="step.path" @click.stop.prevent="clickedStep($event, index)"
               :title="step.tooltip"
            >
                <span  v-if="showStepNumber" class="number">{{ index + 1 }}</span>
                <span v-if="step.iconClass" :class="step.iconClass"></span>
                <span v-if="step.text">{{ step.text }}</span>
                <span :class="separatorIconClass"></span>
            </a>
            <!-- end type === href -->

            <!-- begin type === router -->
            <router-link
                v-if="step.type === 'router'"
                :to="getRoute(step)"
                :title="step.tooltip"
            >
                <span v-if="showStepNumber" class="number">{{ index + 1 }}</span>
                <span v-if="step.iconClass" :class="step.iconClass"></span>
                <span v-if="step.text">{{ step.text }}</span>
                <span :class="separatorIconClass"></span>
            </router-link>
            <!-- end type === router -->

            <!-- begin type === button/submit -->
            <button
                v-if="step.type === 'button' || step.type === 'submit'"
                class="button"
                :type="step.type"
                :name="step.name"
                :title="step.tooltip"
                :formaction="step.formaction"
                @click.stop.prevent="clickedStep($event, index)"
            >
                <span v-if="showStepNumber" class="number">{{ index + 1 }}</span>
                <span v-if="step.iconClass" :class="step.iconClass"></span>
                <span v-if="step.text">{{ step.text }}</span>
                <span :class="separatorIconClass"></span>
            </button>
            <!-- end type === button/submit -->
        </li>
    </ol>
</template>

<script>
// import functions
import {getRoute} from "../utilities.js"

export default {
    name: 'CmdMultistepFormProgressBar',
    data() {
        return {
            activeLink: 0
        }
    },
    props: {
        /**
         * toggle visibility of step-number in front/left of link-icon and -name
         */
        showStepNumber: {
            type: Boolean,
            default: false
        },
        /**
         * list of multisteps
         */
        multisteps: {
            type: Array,
            required: true
        },
        /**
         * icon-class for separator shown between multisteps
         */
        separatorIconClass: {
            type: String,
            default() {
                return "icon-single-arrow-right"
            }
        }
    },
    methods: {
        clickedStep(event, index) {
            this.activeLink = index;
            this.$emit('click', {event: event, index: index, stepPath: this.multisteps[index].path})
        },
        getRoute(step) {
            return getRoute(step)
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-multistep-form-progress-bar ---------------------------------------------------------------------------------------- */
@import '../assets/styles/variables';

.cmd-multistep-form-progress-bar {
    display: flex;
    justify-content: space-around;
    border: var(--default-border);

    li {
        display: flex;
        flex: 1;
        list-style-type: none;
        margin: 0;

        a {
            display: flex;
            text-decoration: none;
            padding: var(--default-padding);
            align-items: center;
            justify-content: center;
            width: 100%;
            background: var(--primary-color-reduced-opacity);

            span, span[class*="icon"] {
                color: var(--default-background-color-reduced-opacity);

                & + span[class*="icon"] {
                    &:last-child {
                        border: var(--default-border);
                        border-radius: var(--full-circle);
                        background: var(--pure-white);
                        color: var(--text-color);
                        margin: 0;
                        position: absolute;
                        right: 0;
                        transform: translateX(50%);
                        padding: calc(var(--default-padding) / 2);
                        display: flex;
                        justify-content: center;
                        z-index: 1;

                        &::before {
                            font-size: var(--font-size-small);
                        }
                    }
                }

                &:hover, &:active, &:focus {
                    span, span[class*="icon"] {
                        color: var(--pure-white);
                    }
                }
            }

            .number {
                margin-right: calc(var(--default-margin) / 2);
                line-height: 100%;
                width: 2rem;
                height: 2rem;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: var(--full-circle);
                border: var(--default-border);
                color: var(--default-background-color-reduced-opacity);
            }
        }

        &:not(:first-child) {
            border-left: .2rem solid var(--border-color);
        }

        &:last-child {
            a {
                span[class*="icon-"] {
                    &:last-of-type {
                        display: none;
                    }
                }
            }
        }

        &.active {
            a {
                background: var(--primary-color);

                span, span[class*='icon'] {
                    color: var(--pure-white);
                }
            }

            .number {
                background: var(--pure-white);
                border-color: var(--pure-white);
                color: var(--primary-color);
            }

            & ~ li {
                background: var(--default-background-color);
                border-left-color: var(--border-color);

                a {
                    background: none;
                    color: var(--color-scheme-text-color);

                    span, span[class*='color'] {
                        color: inherit;

                        & + span[class*="icon"] {
                            &:last-child {
                                border-color: var(--border-color);
                                color: var(--pure-white);
                                background: var(--secondary-color);
                            }
                        }
                    }

                    &:hover, &:active, &:focus {
                        span, span[class*="icon"] {
                            &:not(:last-child) {
                                color: var(--primary-color);
                            }
                        }
                    }
                }
            }

            & + li {
                border-left-color: var(--border-color);
            }
        }
    }
}

@media only screen and (max-width: $small-max-width) {
    .cmd-multistep-form-progress-bar {
        flex-direction: column;

        li {
            &:not(:last-child) {
                border-bottom: var(--default-border);
            }

            a {
                span, span[class*="icon"] {
                    & + span[class*="icon"] {
                        &:last-child {
                            left: auto;
                            right: auto;
                            bottom: 0;
                            transform: translateY(50%);

                            &::before {
                                transform: rotate(90deg);
                            }
                        }
                    }
                }
            }

            &.active {
                & ~ li {
                    border-left: 0;
                    border-bottom-color: var(--border-color);
                }
            }
        }
    }
}

/* end cmd-multistep-form-progress-bar ------------------------------------------------------------------------------------------ */
</style>
