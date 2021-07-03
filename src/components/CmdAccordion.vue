<template>
    <div class="cmd-accordion">
        <template v-for="(accordionContent, index) in accordion" :key="index">
            <a href="#" :title="tooltip" @click.prevent="toggleContentVisibility(accordionContent)">
                <h3>
                    <slot :name="'accordion-headline-' + index">
                        <span>{{ accordionContent.headline }}</span>
                    </slot>
                </h3>
                <span class="toggle-icon" :class="[accordionContent.status ? openIconClass : closeIconClass]"></span>
            </a>
            <transition name="fade">
                <div class="accordion-content" v-if="accordionContent.status" aria-expanded="true">
                    <slot :name="'accordion-content-' + index">
                        <p>{{ accordionContent.content }}</p>
                    </slot>
                </div>
            </transition>
        </template>
    </div>
</template>


<script>
export default {
    name: "CmdAccordion",
    data() {
        return {
            accordion: []
        }
    },
    props: {
        toggleMode: {
            type: String,
            default: 'single'
        },
        accordionData: {
            type: [Array, Number],
            required: true
        },
        openIconClass: {
            type: String,
            default: "icon-single-arrow-up"
        },
        closeIconClass: {
            type: String,
            default: "icon-single-arrow-down"
        },
        tooltip: {
          type: String,
          required: false
        }
    },
    methods: {
        toggleContentVisibility (accordionContent) {
            accordionContent.status = !accordionContent.status

            if(this.toggleMode === 'single' || this.toggleMode === '') {
                for(let i = 0 ; i < this.accordion.length; i++) {
                    if (this.accordion[i] !== accordionContent) {
                        this.accordion[i].status = false;
                    }
                }
            }
        }
    },
    watch: {
        accordionData: {
            handler() {
                if(typeof this.accordionData === 'number') {
                    this.accordion = []
                    for(let i = 0; i < this.accordionData; i++) {
                        this.accordion.push({ status: false })
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
/* begin cmd-accordion --------------------------------------------------------------------------------------------------------------------------------------------------- */
.cmd-accordion {
    margin-bottom: var(--default-margin);

    > a {
        display: flex;
        align-items: center;
        gap: var(--grid-gap);
        border-radius: var(--border-radius);
        margin: var(--default-margin) 0 0 0;
        padding: calc(var(--default-padding) / 2) var(--default-padding);

        label, .label {
            margin-top: 0;
        }

        & + .accordion-content {
            border-top: 0;
        }

        > span {
            font-size: inherit;
        }

        > span[class*="icon-"] {
            margin-left: auto;
        }
    }

    .accordion-content {
        padding: var(--default-padding);
        border-bottom-left-radius: var(--border-radius);
        border-bottom-right-radius: var(--border-radius);

        &.active {
             border-bottom-left-radius: 0;
             border-bottom-right-radius: 0;
         }

        > *:last-child {
            margin-bottom: 0;
        }
    }

    .fade-enter-active, .fade-leave-active {
        height: auto;
    }

    .fade-enter, .fade-leave-to {
        height: 0;
        padding-top: 0;
        padding-bottom: 0;
        overflow: hidden;
    }
}
/* end cmd-accordion --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>