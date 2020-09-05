<template>
    <div class="accordion">
        <template v-for="(accordionContent, index) in accordion">
            <h3  :key="'h' + index" class="accordion_headline" title="Click to show information" @click="toggleContentVisibility(accordionContent)">
                <span>{{ accordionContent.headline }}</span>
                <span class="toggle_icon" :class="[accordionContent.status ? 'icon-single_arrow_down' : 'icon-single_arrow_up']"></span>
            </h3>
            <transition name="fade" :key="'d' + index">
                <div class="accordion_content" v-if="accordionContent.status">
                    <p>{{ accordionContent.content }}</p>
                </div>
            </transition>
        </template>
    </div>
</template>


<script>
export default {
    data() {
        return {
            accordion: this.accordionData
        }
    },
    props: {
        toggleMode: String,
        accordionData: Array
    },
    methods: {
        toggleContentVisibility (accordionContent) {
            accordionContent.status = !accordionContent.status

            if(this.toggleMode == 'single' || this.toggleMode == '') {
                for(let i = 0 ; i < this.accordion.length; i++) {
                    if (this.accordion[i] != accordionContent) {
                        this.accordion[i].status = false;
                    }
                }
            }
        }
    }
}
</script>

<style scoped lang="scss">
/* begin accordion --------------------------------------------------------------------------------------------------------------------------------------------------- */
.accordion {
    .accordion_headline {
        display: flex;
        align-items: center;
        border-radius: var(--border-radius);
        background: var(--blank-color);
        margin: var(--default-padding) 0 0 0;
        padding: calc(var(--default-margin) / 2) var(--default-margin);
        background: var(--default-background-color);

        & + .accordion_content {
            border: var(--default-border);
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
            color: var(--blank-color);
            border-color: var(--primary-color);
            cursor: pointer;

            span {
                color: var(--pure-white);
            }
        }
    }

    .accordion_content {
        padding: var(--default-padding);
        background: var(--blank-color);
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
        transition: all .3s linear;
        height: auto;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
        height: 0;
        padding-top: 0;
        padding-bottom: 0;
        overflow: hidden;
    }
}
/* end accordion --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>