<template>
    <div class="pager-wrapper">
        <p>
            Content: {{ currentPage }} of {{ numberOfPages }}
        </p>
        <div class="pager">
            <!-- begin button to previous page -->
            <a class="page-change" :class="{'disabled': currentPage === 1, 'button': showLinksAsButtons}" @click.prevent="previousPage">
                <span :class="prevButton.iconClass"></span><span v-if="prevButton.buttonText">{{prevButton.buttonText}}</span>
            </a>
            <!-- end button to previous page -->

            <!-- begin buttons with page numbers -->
            <div class="page-index">
                <div class="flex-container">
                    <a :class="{'disabled': currentPage === index + 1, 'button': showLinksAsButtons}"
                       v-for="(item, index) in items"
                       :key="index"
                       @click.prevent="showPage(item)">
                        {{ index + 1 }}
                    </a>
                </div>
            </div>
            <!-- end buttons with page numbers -->

            <!-- begin button to next page -->
            <a class="page-change" :class="{'disabled': currentPage === numberOfPages, 'button': showLinksAsButtons}" @click.prevent="nextPage">
                <span v-if="nextButton.buttonText">{{nextButton.buttonText}}</span><span :class="nextButton.iconClass"></span>
            </a>
            <!-- end button to next page -->
        </div>
    </div>
</template>

<script>
export default {
    name: "Pager",
    data() {
        return {
            currentPage: 1
        }
    },
    props: {
        items: {
            type: Number,
            required: true
        },
        itemsPerPage: {
            type: Number,
            required: true
        },
        showLinksAsButtons: {
            type: Boolean,
            default: true
        },
        prevButton: {
            type: Object,
            required: false
        },
        nextButton: {
            type: Object,
            required: false
        }
    },
    computed: {
        numberOfPages () {
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
/* begin pager --------------------------------------------------------------------------------------------------------------------------------------------------- */
.pager-wrapper {
    > p {
        text-align: center;
    }

    .pager {
        display: flex;
        justify-content: space-between;

        button {
            float: none;
            margin: 0;
        }

        > a {
            > [class*="icon-"] {
                font-size: 1rem;
            }

            &:last-of-type {
                > [class*="icon-"] {
                    margin-right: 0;
                }
            }
        }

        a.disabled {
            opacity: .5;
        }

        .page-index {
            .button {
                &:not(:first-child) {
                    margin-left: var(--default-margin);
                }
            }

            a:not(.button) {
                padding: calc(var(--default-padding) / 2);
                padding-top: 0;
            }
        }

        @media only screen and (max-width: $medium-max-width) {
            a.button {
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
/* end pager --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>