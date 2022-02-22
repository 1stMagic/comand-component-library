<template>
    <div class="cmd-pager">
        <p>
            Content: {{ currentPage }} of {{ numberOfPages }}
        </p>
        <div class="pager">
            <!-- begin button to previous page -->
            <a class="page-change" :class="{'disabled': currentPage === 1, 'button': showLinksAsButtons}"
               @click.prevent="previousPage">
                <span :class="prevButton.iconClass"></span><span v-if="prevButton.buttonText">{{
                    prevButton.buttonText
                }}</span>
            </a>
            <!-- end button to previous page -->

            <!-- begin buttons with page numbers -->
            <div class="page-index">
                <div class="flex-container">
                    <a :class="{'disabled': currentPage === index + 1, 'button': showLinksAsButtons}"
                       v-for="(item, index) in items"
                       :key="index"
                       @click.stop.prevent="showPage(item)" aria-live="polite">
                        <span>{{ index + 1 }}</span>
                    </a>
                </div>
            </div>
            <!-- end buttons with page numbers -->

            <!-- begin button to next page -->
            <a class="page-change" :class="{'disabled': currentPage === numberOfPages, 'button': showLinksAsButtons}"
               @click.prevent="nextPage">
                <span v-if="nextButton.buttonText">{{ nextButton.buttonText }}</span><span
                :class="nextButton.iconClass"></span>
            </a>
            <!-- end button to next page -->
        </div>
    </div>
</template>

<script>
export default {
    name: "CmdPager",
    emits: ['click'],
    data() {
        return {
            currentPage: 1
        }
    },
    props: {
        /**
         * number of items displayed
         */
        items: {
            type: Number,
            required: true
        },
        /**
         * number of items shown per page
         */
        itemsPerPage: {
            type: Number,
            required: true
        },
        /**
         * show links as buttons
         */
        showLinksAsButtons: {
            type: Boolean,
            default: true
        },
        /**
         * button to switch to previous page
         *
         * @requiredForAccessibility: partial
         */
        prevButton: {
            type: Object,
            default: function() {
                return {
                    iconClass: "icon-single-arrow-left",
                    buttonText: "prev"
                }
            }
        },
        /**
         * button to switch to next page
         *
         * @requiredForAccessibility: partial
         */
        nextButton: {
            type: Object,
            default: function() {
                return {
                    iconClass: "icon-single-arrow-right",
                    buttonText: "next"
                }
            }
        }
    },
    computed: {
        numberOfPages() {
            return Math.ceil(this.items / this.itemsPerPage)
        }
    },
    methods: {
        showPage(page) {
            this.currentPage = page
            this.$emit('click', page)
        },
        nextPage() {
            if (this.currentPage < this.numberOfPages) {
                this.showPage(this.currentPage + 1)
            }

        },
        previousPage() {
            if (this.currentPage > 1) {
                this.showPage(this.currentPage - 1)
            }
        }
    }
}
</script>

<style lang="scss">
@import '../assets/styles/variables';
/* begin cmd-pager ---------------------------------------------------------------------------------------- */
.cmd-pager {
    > p {
        text-align: center;
    }

    .pager {
        display: flex;
        justify-content: space-between;

        button, .button {
            float: none;
            margin: 0;

            span {
                align-self: center;
            }
        }

        > a {
            &:last-of-type {
                > [class*="icon-"] {
                    margin-right: 0;
                }
            }

            > [class*="icon-"] {
                font-size: 1rem;
            }
        }

        a.disabled {
            opacity: var(--reduced-opacity);
        }

        .page-index {
            a:not(.button) {
                padding: calc(var(--default-padding) / 2);
                padding-top: 0;
            }
        }

        @media only screen and (max-width: $medium-max-width) {
            > a.button {
                span {
                    margin: 0;

                    &:not([class*='icon']) {
                        display: none;
                    }
                }
            }
        }

        @media only screen and (max-width: $small-max-width) {
            .button {
                width: auto; /* overwrite default settings from framework.css */
            }

            .page-index {
                .flex-container {
                    flex-direction: row; /* overwrite default settings from framework.css */
                }
            }
        }
    }
}

/* end cmd-pager ------------------------------------------------------------------------------------------ */
</style>