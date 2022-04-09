<template>
    <div :class="['cmd-accordion flex-container vertical', {'no-gap' : !gapBetween, 'active' : active}]">
        <div v-for="(accordionContent, index) in accordion" :key="index">
            <a v-if="!useCustomHeader" href="#" :title="accordionContent.status ? iconOpen.tooltip : iconClosed.tooltip" @click.prevent="toggleContentVisibility(accordionContent)">
                <!-- begin slot for headline -->
                <slot :name="'accordionHeadline' + index">
                    <!-- begin CmdCustomHeadline -->
                    <CmdCustomHeadline
                        v-if="accordionContent.headlineText && accordionContent.headlineLevel"
                        :headlineText="accordionContent.headlineText"
                        :headlineLevel="accordionContent.headlineLevel"
                        :iconClass="accordionContent.iconClass"
                    />
                    <!-- end CmdCustomHeadline -->
                </slot>
                <!-- end slot for headline -->
                <span class="toggle-icon" :class="[accordionContent.status ? iconOpen.iconClass : iconClosed.iconClass]"></span>
            </a>
            <!-- begin accordion-content -->
            <transition :name="toggleTransition">
                <div class="accordion-content" v-if="accordionContent.status" aria-expanded="true">
                    <slot :name="'accordionContent' + index">
                        <p>{{ accordionContent.content }}</p>
                    </slot>
                </div>
            </transition>
            <!-- end accordion-content -->
        </div>
    </div>
</template>

<script>
// import components
import CmdCustomHeadline from "./CmdCustomHeadline"

export default {
    name: "CmdAccordion",
    components: {
        CmdCustomHeadline
    },
    data() {
        return {
            accordion: [],
            active: false
        }
    },
    props: {
        /**
         * properties for CmdCustomHeadline-component
         */
        cmdCustomHeadline: {
            type: Object,
            required: false
        },
        /**
         * use transition to expand accordion-content
         */
        useTransition: {
            type: Boolean,
            default: true
        },
        /**
         * toggle if mode if only one accordion can be opened (or multiple ones)
         *
         * @allowedValues: single, multiple
         */
        toggleMode: {
            type: String,
            default: "single"
        },
        /**
         * activate if you want to use a customized header
         */
        useCustomHeader: {
            type: Boolean,
            default: false
        },
        /**
         * set if a gap should be shown between multiple accordions
         */
        gapBetween: {
            type: Boolean,
            default: true
        },
        /**
         * all information about the contents in all shown accordions
         */
        accordionData: {
            type: [Array, Number],
            required: true
        },
        /**
         * icon to expand an accordion
         *
         * @requiredForAccessibility: partial
         */
        iconOpen: {
            type: Object,
            default: function() {
                return {
                    iconClass: "icon-single-arrow-up",
                    tooltip: "Close content"
                }
            },
        },
        /**
         * icon to collapse an accordion
         *
         * @requiredForAccessibility: partial
         */
        iconClosed: {
            type: Object,
            default: function() {
                return {
                    iconClass: "icon-single-arrow-down",
                    tooltip: "Show content"
                }
            }
        }
    },
    computed: {
        toggleTransition() {
            if(this.useTransition) {
                return "fade"
            }
            return ""
        }
    },
    methods: {
        toggleContentVisibility(accordionContent) {
            accordionContent.status = !accordionContent.status
            this.active = !this.active

            if (this.toggleMode === 'single' || this.toggleMode === '') {
                for (let i = 0; i < this.accordion.length; i++) {
                    if (this.accordion[i] !== accordionContent) {
                        this.accordion[i].status = false;
                    }
                }
            }
        },
        /**
         * method will be called from outside by $refs
         */
        openAll() {
            for (let i = 0; i < this.accordion.length; i++) {
                    this.accordion[i].status = true;
            }
        },
        /**
         * method will be called from outside by $refs
         */
        closeAll() {
            for (let i = 0; i < this.accordion.length; i++) {
                this.accordion[i].status = false;
            }
        }
    },
    watch: {
        accordionData: {
            handler() {
                if (typeof this.accordionData === 'number') {
                    this.accordion = []
                    for (let i = 0; i < this.accordionData; i++) {
                        this.accordion.push({status: false})
                    }
                } else {
                    // create copy of given data and assign to data-property
                    this.accordion = JSON.parse(JSON.stringify(this.accordionData))
                }
            },
            immediate: true
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-accordion ---------------------------------------------------------------------------------------- */
.cmd-accordion {
    > div {
        > a, > div:first-child {
            display: flex;
            align-items: center;
            gap: var(--grid-gap);
            border-radius: var(--border-radius);
            padding: calc(var(--default-padding) / 2) var(--default-padding);
            border: var(--default-border);
            background: var(--default-background-color);
            text-decoration: none;

            &:hover, &:active, &:focus, &.active {
                background: var(--primary-color);
                border-color: var(--primary-color);

                & + .accordion-content {
                    border-color: var(--primary-color);
                }

                * {
                    color: var(--pure-white);
                }
            }

            &:first-child {
                margin: 0;
            }

            > h2, > h3, > h4, > h5, > h6, .cmd-custom-headline {
                margin-bottom: 0;
                display: flex;
                align-items: center;
            }

            label, .label {
                margin-top: 0;
            }

            & + .accordion-content {
                border-top: 0;
            }

            > span, > a {
                font-size: inherit;

                &[class*="icon-"] {
                    margin-left: auto;
                    font-size: 1rem;
                }
            }
        }

        .accordion-content {
            padding: var(--default-padding);
            border: var(--default-border);
            border-bottom-left-radius: var(--border-radius);
            border-bottom-right-radius: var(--border-radius);
            background: var(--pure-white);

            &.active {
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
            }

            > *:last-child {
                margin-bottom: 0;
            }
        }
    }
}

/* end cmd-accordion ------------------------------------------------------------------------------------------ */
</style>