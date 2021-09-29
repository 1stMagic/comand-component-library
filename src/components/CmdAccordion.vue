<template>
    <div :class="['cmd-accordion flex-container vertical', {'no-gap' : !gapBetween, 'active' : active}]">
        <div v-for="(accordionContent, index) in accordion" :key="index">
            <a v-if="!useCustomHeader" href="#" :title="accordionContent.status ? iconOpen.icon.tooltip : iconClosed.icon.tooltip" @click.prevent="toggleContentVisibility(accordionContent)">
                <slot :name="'accordionHeadline' + index">
                    <component :is="accordionHeadlineLevel">
                        <span v-if="accordionContent.icon && accordionContent.icon.iconClass" :class="accordionContent.icon.iconClass" :title="accordionContent.icon.tooltip"></span>
                        <span v-if="accordionContent.headline">{{ accordionContent.headline }}</span>
                    </component>
                </slot>
                <span class="toggle-icon" :class="[accordionContent.status ? iconOpen.icon.iconClass : iconClosed.icon.iconClass]"></span>
            </a>
            <a v-else href="#" :title="tooltip" @click.prevent="toggleContentVisibility(accordionContent)">
                <slot :name="'customHeadline' + index"><p>{{ accordionContent.headline }}</p></slot>
                <span class="toggle-icon" :class="[accordionContent.status ?  iconOpen.icon.iconClass : iconClosed.icon.iconClass]"></span>
            </a>
            <transition :name="toggleTransition">
                <div class="accordion-content" v-if="accordionContent.status" aria-expanded="true">
                    <slot :name="'accordionContent' + index">
                        <p>{{ accordionContent.content }}</p>
                    </slot>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    name: "CmdAccordion",
    data() {
        return {
            accordion: [],
            active: false
        }
    },
    props: {
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
         * values: single, multiple
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
         * set if a gap is shown between multiple accordions
         */
        gapBetween: {
            type: Boolean,
            default: true
        },
        /**
         * headline for accordion-box that is also visible is accordion is collapsed
         */
        accordionHeadlineLevel: {
            type: String,
            default: "h3",
            validator(value) {
                const allowedTags = ["h2", "h3", "h4", "h5", "h6"]

                // check if allowedTags includes given value for this property (if not output warning in console)
                if (!allowedTags.includes(value)) {
                    console.warn("Not allowed tag (" + value + ") used for accordionHeadline-property! Allowed tags are: " + allowedTags)
                    return false
                }
                return true
            }
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
         */
        iconOpen: {
            type: Object,
            default: function() {
                return {
                    icon: {
                        iconClass: "icon-single-arrow-up",
                        tooltip: "Close content"
                    }
                }
            },
        },
        /**
         * icon to collapse an accordion
         */
        iconClosed: {
            type: Object,
            default: function() {
                return {
                    icon: {
                        iconClass: "icon-single-arrow-down",
                        tooltip: "Show content"
                    }
                }
            }
        }
    },
    computed: {
        toggleTransition() {
            return this.useTransition && 'fade'
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
    margin-bottom: var(--default-margin);

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

                > * {
                    color: var(--pure-white);
                }
            }

            &:first-child {
                margin: 0;
            }

            > h2, > h3, > h4, > h5, > h6 {
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