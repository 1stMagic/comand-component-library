<template>
    <div class="cmd-box-wrapper">
        <div v-if="allowUserToToggleView" class="flex-container no-flex toggle-view">
            <a href="#" @click.prevent="oneBoxPerRow = !oneBoxPerRow" :title="oneBoxPerRow ? iconGrid.tooltip : iconRows.tooltip">
                <span :class="oneBoxPerRow ? iconGrid.iconClass : iconRows.iconClass"></span>
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
        useRowViewAsDefault: {
            type: Boolean,
            default: false
        },
        allowUserToToggleView: {
            type: Boolean,
            default: true
        },
        useFlexbox: {
            type: Boolean,
            default: false
        },
        boxesPerRow: {
            type: [Number, Array],
            default: 4
        },
        iconGrid: {
            type: Object,
            default() {
                return {
                    iconClass: 'icon-blocks-small',
                    tooltip: 'Toggle to row view'
                }
            }
        },
        iconRows: {
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
            if(this.allowUserToToggleView && this.oneBoxPerRow) {
                return 1
            }

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