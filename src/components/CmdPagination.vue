<template>
    <div class="cmd-pager">
        <!-- begin button/link to previous page -->
        <a
            :href="getPreviousHref"
            :class="['page-change', {'disabled': currentPage === 1, 'button': linkType === 'button'}]"
            @click.prevent="previousPage"
            :title="!prevLink.showText ? prevLink.text : null"
        >
            <!-- begin CmdIcon -->
            <CmdIcon :iconClass="prevLink.iconClass" :type="prevLink.iconType"/>
            <!-- end CmdIcon -->
            <span v-if="prevLink.showText">{{ prevLink.text }}</span>
        </a>
        <!-- end button/link to previous page -->

        <!-- begin buttons/link with page numbers -->
        <div class="page-index">
            <div class="flex-container">
                <a :href="getHref(page)"
                   :class="{'disabled': currentPage === index + 1, 'button': linkType === 'button'}"
                   :title="currentPage !== index + 1 ? getMessage('cmdpager.tooltip.go_to_page', index + 1) : getMessage('cmdpager.tooltip.not_possible')"
                   v-for="(page, index) in pages"
                   :key="index"
                   @click.stop.prevent="showPage(page)" aria-live="polite">
                   <span :class="{hidden: !showPageNumbers}">{{ index + 1 }}</span>
                </a>
            </div>
        </div>
        <!-- end buttons/link with page numbers -->

        <!-- begin button/link to next page -->
        <a :href="getNextHref"
           :class="['page-change', {'disabled': currentPage === numberOfPages, 'button': linkType === 'button'}]"
           @click.prevent="nextPage"
           :title="!nextLink.showText ? nextLink.text : null"
        >
            <span v-if="nextLink.showText">{{ nextLink.text }}</span>
            <!-- begin CmdIcon -->
            <CmdIcon :iconClass="nextLink.iconClass" :type="nextLink.iconType"/>
            <!-- end CmdIcon -->
        </a>
        <!-- end button/link to next page -->
    </div>
</template>

<script>
// import mixins
import I18n from "../mixins/I18n"
import DefaultMessageProperties from "../mixins/CmdPager/DefaultMessageProperties"
export default {
    name: "CmdPager",
    mixins: [
      I18n,
      DefaultMessageProperties
    ],
    emits: ['click'],
    data() {
        return {
            currentPage: 1
        }
    },
    props: {
        /**
         * number of pages displayed
         */
        pages: {
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
         * toggle page-numbers on buttons
         */
        showPageNumbers: {
            type: Boolean,
            default: true
        },
        /**
         * set type of links
         *
         * @allowedValues: "href", "button"
         */
        linkType: {
            type: String,
            default: "href"
        },
        /**
         * link to switch to previous page
         *
         * @requiredForAccessibility: partial
         */
        prevLink: {
            type: Object,
            default: function () {
                return {
                    iconClass: "icon-single-arrow-left",
                    text: "prev",
                    showText: true
                }
            }
        },
        /**
         * link to switch to next page
         *
         * @requiredForAccessibility: partial
         */
        nextLink: {
            type: Object,
            default: function () {
                return {
                    iconClass: "icon-single-arrow-right",
                    text: "next",
                    showText: true
                }
            }
        }
    },
    computed: {
        numberOfPages() {
            return Math.ceil(this.pages / this.itemsPerPage)
        },
        getPreviousHref() {
            if (this.currentPage === 1) {
                return null
            }
            return "#"
        },
        getNextHref() {
            if (this.currentPage === this.numberOfPages) {
                return null
            }
            return "#"
        }
    },
    methods: {
        getHref(page) {
            if (this.linkType !== "href" || this.currentPage === page) {
                return null
            }
            return "#"
        },
        showPage(page) {
            this.currentPage = page
            this.$emit("click", page)
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
/* begin cmd-pagination ---------------------------------------------------------------------------------------- */
@import '../assets/styles/variables';

.cmd-pager {
    display: flex;
    justify-content: space-between;

    button, .button {
        float: none;
        margin: 0;

        span {
            align-self: center;
        }
    }

    a {
        display: flex;
        align-items: center;
        text-decoration: none;

        &:hover, &:active, &:focus {
            cursor: pointer;
        }

        &:last-of-type {
            > [class*="icon-"] {
                margin-right: 0;
            }
        }

        > [class*="icon-"] {
            font-size: var(--icon-size-small);
        }
    }

    .page-index {
        a:not(.button) {
            padding: 0 calc(var(--default-padding) / 2);
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

/* end cmd-pagination ------------------------------------------------------------------------------------------ */
</style>