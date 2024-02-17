<template>
    <div class="cmd-box-wrapper">
        <div v-if="cmdHeadline.headlineText || allowUserToToggleOrientation || allowTogglingCollapsingBoxes"
             class="flex-container headline-wrapper">
            <!-- begin CmdHeadline -->
            <CmdHeadline v-if="cmdHeadline.headlineText" v-bind="cmdHeadline" />
            <!-- end CmdHeadline -->

            <div v-if="allowUserToToggleOrientation || allowTogglingCollapsingBoxes" class="options-wrapper">
                <a v-if="allowTogglingCollapsingBoxes" href="#" @click.prevent="toggleCollapsingBoxes" :title="collapsingBoxesOpen ? collapseBoxesIcon.tooltip : expandBoxesIcon.tooltip">
                    <!-- begin CmdIcon -->
                    <CmdIcon :iconClass="collapsingBoxesOpen ? expandBoxesIcon.iconClass : collapseBoxesIcon.iconClass" :type="rowView ? iconGridView.iconType : iconRowView.iconType" />
                    <!-- end CmdIcon -->
                </a>
                <a v-if="allowUserToToggleOrientation" href="#" @click.prevent="rowView = !rowView" :title="rowView ? iconRowView.tooltip : iconGridView.tooltip">
                    <!-- begin CmdIcon -->
                    <CmdIcon :iconClass="rowView ? iconGridView.iconClass : iconRowView.iconClass" :type="rowView ? iconGridView.iconType : iconRowView.iconType" />
                    <!-- end CmdIcon -->
                </a>
            </div>
        </div>
        <div :class="[
            useFlexbox ? 'flex-container' : 'grid-container-create-columns',
            {
                'no-gap': !useGap,
                'row-view': rowView,
                'stretch-boxes-vertically': stretchBoxesVertically
            }
            ]">
            <slot
                :collapsingBoxesOpen="collapsingBoxesOpen"
                :boxToggled="boxToggled"
                :boxIsOpen="boxIsOpen"
                :rowView="rowView"
                @toggleCollapse="boxIsToggled"
            >
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "CmdBoxWrapper",
    data() {
        return {
            rowView: this.useRowViewAsDefault,
            collapsingBoxesOpen: true,
            currentOpenBox: []
        }
    },
    props: {
        /**
         * give list of box-indices that should be open by default
         *
         * allowMultipleExpandedBoxes-property must be activated if more than one box should be open by default
         */
        openBoxesByDefault: {
            type: Array,
            required: false
        },
        /**
         * activate if a gap between boxes should be used
         */
        useGap: {
            type: Boolean,
            default: false
        },
        /**
         * activate if boxes should be arranged vertically (each box is a row) by default
         */
        useRowViewAsDefault: {
            type: Boolean,
            default: false
        },
        /**
         * stretch boxes inside vertically to same height
         *
         * will not take effect on collapsable boxes
         */
        stretchBoxesVertically: {
            type: Boolean,
            default: true
        },
        /**
         * activate if user can toggle grid- and row-orientation by himself
         */
        allowUserToToggleOrientation: {
            type: Boolean,
            default: true
        },
        /**
         * activate if user can toggle grid- and row-view by himself
         */
        allowTogglingCollapsingBoxes: {
            type: Boolean,
            default: false
        },
        /**
         * icon for collapsed box
         */
        collapseBoxesIcon: {
            type: Object,
            default() {
                return {
                    iconClass: "icon-double-arrow-down",
                    tooltip: "Collapse all boxes"
                }
            }
        },
        /**
         * icon for expanded box
         */
        expandBoxesIcon: {
            type: Object,
            default() {
                return {
                    iconClass: "icon-double-arrow-up",
                    tooltip: "Expand all boxes"
                }
            }
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
         *
         * useFlexbox-property must be set to true
         * slot may not be used
         */
        boxesPerRow: {
            type: [Number, Array],
            default: 4
        },
        /**
         * set if more than one collapsible box can be expanded at a time
         */
        allowMultipleExpandedBoxes: {
            type: Boolean,
            default: true
        },
        /**
         * define icon for grid-view
         */
        iconGridView: {
            type: Object,
            default
                () {
                return {
                    iconClass: 'icon-blocks-small',
                    tooltip: 'Toggle to row view'
                }
            }
        }
        ,
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
        },
        /**
         * properties for CmdHeadline-component
         */
        cmdHeadline: {
            type: Object,
            default() {
                return {
                    headlineText: "",
                    headlineLevel: 4
                }
            }
        }
    },
    computed: {
        // if a custom grid is used, the number of boxes per row (in grid-view) can be customized
        boxesPerRowLarge() {
            return this.boxesPerRowResponsive(0, 4)
        }
        ,
        boxesPerRowMedium() {
            return this.boxesPerRowResponsive(1, 3)
        }
        ,
        boxesPerRowSmall() {
            return this.boxesPerRowResponsive(2, 1)
        }
    },
    methods: {
        boxIsOpen(index) {
            return this.currentOpenBox.includes(index)
        },
        boxIsToggled(event) {
          alert(event)
        },
        boxesPerRowResponsive(index, defaultBoxesPerRow) {
            // show only one box per row in row-view
            if (this.oneBoxPerRow) {
                return 1
            }

            // if a boxes per row is defined
            if (typeof this.boxesPerRow === 'number') {
                if (index === 0) {
                    return this.boxesPerRow
                }
                return Math.min(this.boxesPerRow, defaultBoxesPerRow)
            }

            if (this.boxesPerRow.length > index) {
                return this.boxesPerRow[index]
            }

            return defaultBoxesPerRow
        },
        toggleCollapsingBoxes() {
            this.collapsingBoxesOpen = !this.collapsingBoxesOpen
        },
        boxToggled(boxIndex, open) {
            if(this.allowMultipleExpandedBoxes) {
                if(open) {
                    this.currentOpenBox.push(boxIndex)
                } else {
                    // remove boxIndex from array to close specific box
                    let position = this.currentOpenBox.indexOf(boxIndex)
                    this.currentOpenBox.splice(position, 1)
                }
            } else {
                this.currentOpenBox  = []

                // add current boxIndex to array to open specific box
                if(open) {
                    this.currentOpenBox.push(boxIndex)
                }
            }
        }
    },
    watch: {
        openBoxesByDefault: {
            handler() {
                this.currentOpenBox = [...this.openBoxesByDefault || []]
            },
            immediate: true
        },
        useRowViewAsDefault: {
            handler() {
                this.oneBoxPerRow = this.useRowViewAsDefault
            },
            immediate: true
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-box-wrapper ---------------------------------------------------------------------------------------- */
@import '../assets/styles/variables';

.cmd-box-wrapper {
    display: flex;
    flex-direction: column;
    gap: calc(var(--default-gap) / 2);

    &:not(:first-child) {
        margin-top: calc(var(--default-margin) * 2);
    }

    > .headline-wrapper {
        align-items: center;
        justify-content: space-between;
    }

    .options-wrapper {
        flex: none;
    }

    > .flex-container {
        > .cmd-headline {
                margin: 0;
        }

        &.stretch-boxes-vertically {
            .stretch-vertically {
                align-self: stretch;
                height: auto; /* must be set to auto if inner boxes have als stretchVertically-property activated */
            }
        }
    }

    .row-view {
        flex-direction: column;

        p.cutoff-text {
            height: auto;

            &.fade-last-line::after {
                background: none;
            }
        }

        .cmd-box.user {
            flex-direction: row;
            padding: var(--default-padding);
            align-items: center;

            .box-footer {
                margin-top: 0;
            }
        }
    }

    > .grid-container-create-columns {
        grid-template-columns: repeat(v-bind(boxesPerRowLarge), minmax(0, 1fr));

        &.row-view {
            grid-template-columns: repeat(1, minmax(0, 1fr));
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