<template>
    <div class="cmd-accordion">
        <template v-for="(accordionContent, index) in accordion">
            <h3 :key="'h' + index" class="accordion-headline" :title="tooltip" @click="toggleContentVisibility(accordionContent)">
                <span>{{ accordionContent.headline }}</span>
                <span class="toggle-icon" :class="[accordionContent.status ? openIconClass : closeIconClass]"></span>
            </h3>
            <transition name="fade" :key="'d' + index">
                <div class="accordion-content" v-if="accordionContent.status">
                    <p>{{ accordionContent.content }}</p>
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
            accordion: this.accordionData
        }
    },
    props: {
        toggleMode: {
            type: String,
            default: 'single'
        },
        accordionData: {
            type: Array,
            required: true
        },
        openIconClass: {
            type: String,
            required: true
        },
        closeIconClass: {
            type: String,
            required: true
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
    }
}
</script>

<style lang="scss">
/* begin accordion --------------------------------------------------------------------------------------------------------------------------------------------------- */
.cmd-accordion {
    .accordion-headline {
        border: var(--default-border);
        display: flex;
        align-items: center;
        border-radius: var(--border-radius);
        background: var(--pure-white);
        margin: var(--default-padding) 0 0 0;
        padding: calc(var(--default-margin) / 2) var(--default-margin);
        background: var(--default-background-color);

        & + .accordion-content {
            border: var(--default-border);
            border-top: 0;
        }

        > span {
            font-size: inherit;
        }

        > span[class*="icon-"] {
            margin-left: auto;
            font-size: 1rem;
        }

        &:hover, &:active, &:focus, &.active {
            background: var(--primary-color);
            color: var(--pure-white);
            border-color: var(--primary-color);
            cursor: pointer;

            & + .accordion-content {
                border-color: var(--primary-color);
            }

            span {
                color: var(--pure-white);
            }
        }
    }

    .accordion-content {
        padding: var(--default-padding);
        background: var(--pure-white);
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
/* end accordion --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>