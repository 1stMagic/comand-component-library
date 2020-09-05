<template>
    <div class="grid-container-create-columns pager">
        <p>
            Content: {{ currentPage }} of {{ numberOfPages }}
        </p>
        <!-- previous page -->
        <a class="page_change button" :class="{disabled: currentPage == 1}" @click.prevent="previousPage"><span class="icon-single_arrow_left"></span><span>Previous page</span></a>
        <!-- page numbers -->
        <div class="grid-container page_index">
            <div class="flex-container">
                <a class="button" :class="{disabled: currentPage == index + 1}" title="Current page" v-for="(item, index) in items" :key="index" @click.prevent="showPage(item)">{{ index + 1 }}</a>
            </div>
        </div>
        <!-- next page -->
        <a class="page_change button" :class="{disabled: currentPage == numberOfPages}" @click.prevent="nextPage"><span>Next page</span><span class="icon-single_arrow_right"></span></a>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                currentPage: 1
            }
        },
        props: {
            items: Number,
            itemsPerPage: Number
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

<style scoped lang="scss">
/* begin pager --------------------------------------------------------------------------------------------------------------------------------------------------- */
.pager {
    > p {
        grid-column: span var(--grid-columns);
        margin: 0;
        text-align: center;
    }

    button {
        float: none;
        margin: 0;
    }

    a.button {
        grid-column: span 2;

        > [class*="icon-"] {
            font-size: 1rem;
        }

        &:last-of-type {
            > [class*="icon-"] {
                margin-right: 0;
                margin-left: calc(var(--default-margin) / 2);
            }
        }
    }

    .page_index {
        grid-column: span 8;
        justify-content: center;

        .button {
            &:not(:first-child) {
                margin-left: var(--default-margin);
            }
        }
    }

    @media only screen and (max-width: 1023px) {
        a.button {
            grid-column: span 1;

            span:not([class*='icon']) {
                display: none;
            }
        }

        .page_index {
            grid-column: span 4;
        }
    }

    @media only screen and (max-width: 600px) {
        a.button {
            grid-column: span 1;
        }

        .page_index {
            grid-column: span 2;

            .flex-container {
                flex-direction: row;
            }
        }
    }
}
/* end pager --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>