<template>
    <div class="cmd-box-wrapper">
        <div v-if="allowUserToToggleView" class="flex-container no-flex toggle-view">
            <a href="#" @click.prevent="oneBoxPerRow = !oneBoxPerRow" :title="oneBoxPerRow ? iconGridView.tooltip : iconRowView.tooltip">
                <span :class="oneBoxPerRow ? iconGridView.iconClass : iconRowView.iconClass"></span>
            </a>
        </div>
        <div :class="[useFlexbox ? 'flex-container' : 'grid-container-create-columns', {'one-box-per-row': oneBoxPerRow}]">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "CmdBoxWrapper",
    data() {
        return {
            oneBoxPerRow: this.useRowViewAsDefault
        }
    },
    props: {
        /**
         * activate if boxes should be arranged vertically (each box is a row) by default
         */
        useRowViewAsDefault: {
            type: Boolean,
            default: false
        },
        /**
         * activate if user can toggle grid- and row-view by himself
         */
        allowUserToToggleView: {
            type: Boolean,
            default: true
        },
        /**
         * activate if you want to use a flex-container instead of a css-grid-container
         */
        useFlexbox: {
            type: Boolean,
            default: false
        },
        /**
         * define the number of boxes per row (if view is grid-view)
         */
        boxesPerRow: {
            type: [Number, Array],
            default: 4
        },
        /**
         * define icon for grid-view
         */
        iconGridView: {
            type: Object,
            default() {
                return {
                    iconClass: 'icon-blocks-small',
                    tooltip: 'Toggle to row view'
                }
            }
        },
        /**
         * define icon for row-view
         */
        iconRowView: {
            type: Object,
            default() {
                return {
                    iconClass: 'icon-rows',
                    tooltip: 'Toggle to grid view'
                }
            }
        }
    },
    computed: {
        // if a custom grid is used, the number of boxes per row (in grid-view) can be customized
        boxesPerRowLarge() {
            return this.boxesPerRowResponsive(0, 4)
        },
        boxesPerRowMedium() {
            return this.boxesPerRowResponsive(1, 3)
        },
        boxesPerRowSmall() {
            return this.boxesPerRowResponsive(2, 1)
        }
    },
    methods: {
        boxesPerRowResponsive(index, defaultBoxesPerRow) {
            // show only one box per row in row-view
            if(this.allowUserToToggleView && this.oneBoxPerRow) {
                return 1
            }

            // if a boxes per row is defined
            if (typeof this.boxesPerRow === 'number') {
                if(index === 0) {
                    return this.boxesPerRow
                }
                return Math.min(this.boxesPerRow, defaultBoxesPerRow)
            }

            if(this.boxesPerRow.length > index) {
                return this.boxesPerRow[index]
            }

            return defaultBoxesPerRow
        }
    },
    watch: {
        useRowViewAsDefault() {
            this.oneBoxPerRow = this.useRowViewAsDefault
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-box-wrapper ---------------------------------------------------------------------------------------- */
@import '../assets/styles/variables';
.cmd-box-wrapper {
    > .toggle-view {
        justify-content: flex-end;
    }

    > .flex-container {
        &.one-box-per-row {
            flex-direction: column;
        }
    }

    > .grid-container-create-columns {
        grid-template-columns: repeat(v-bind(boxesPerRowLarge), minmax(0, 1fr));
    }

    .cmd-box {
        &.content {
            &.collapsible {
                align-self: flex-start;
            }
        }
    }

    @media only screen and (max-width: $medium-max-width) {
        > .grid-container-create-columns {
            grid-template-columns: repeat(v-bind(boxesPerRowMedium), minmax(0, 1fr));
        }
    }

    @media only screen and (max-width: $small-max-width) {
        > .grid-container-create-columns {
            grid-template-columns: repeat(v-bind(boxesPerRowSmall), minmax(0, 1fr));
        }
    }
}
/* end cmd-box-wrapper ---------------------------------------------------------------------------------------- */
</style>