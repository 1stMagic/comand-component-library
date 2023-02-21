<template>
    <div :class="['cmd-table-wrapper', {'collapsed': !showTableData, 'full-width': fullWidth, 'has-caption': hasCaption}]">
        <div v-if="collapsible || userCanToggleWidth" class="button-wrapper">
            <a v-if="userCanToggleWidth" class="button"
               href="#" @click.prevent="fullWidth = !fullWidth"
               :title="iconToggleWidth.tooltip"
            >
                <!-- begin CmdIcon -->
                <CmdIcon :iconClass="iconToggleWidth.iconClass" :type="iconToggleWidth.iconType" />
                <!-- end CmdIcon -->
            </a>
            <a v-if="collapsible" class="button"
               href="#" @click.prevent="showTableData = !showTableData"
               :title="showTableData ? iconCollapse.tooltip : iconExpand.tooltip"
            >
                <!-- begin CmdIcon -->
                <CmdIcon :iconClass="showTableData ? iconCollapse.iconClass : iconExpand.iconClass" :type="showTableData ? iconCollapse.iconType : iconExpand.iconType" />
                <!-- end CmdIcon -->
            </a>
        </div>
        <div class="inner-wrapper">
            <table :class="{'full-width': fullWidth}">
                <caption v-if="tableData.caption?.text || caption?.text" :class="{ hidden: hideCaption }">
                    {{ caption?.text || tableData.caption?.text }}
                </caption>
                <thead>
                <tr>
                    <th v-for="(tablehead, indexHead) in tableData.thead" :key="indexHead">
                        {{ tablehead }}
                    </th>
                </tr>
                </thead>
                <transition name="fade">
                    <tbody v-show="showTableData" aria-expanded="true">
                    <tr :class="{'highlighted' : tableData.rowIndexHighlighted === indexRows}" v-for="(tablerows, indexRows) in tableData.tbody" :key="indexRows">
                        <td :class="{'highlighted' : tableData.columnIndexHighlighted === indexData}" v-for="(tabledata, indexData) in tablerows" :key="indexData">
                            {{ tabledata }}
                        </td>
                    </tr>
                    </tbody>
                </transition>
                <transition name="fade">
                    <tfoot v-if="tableData.tfoot && tableData.tfoot.length && showTableData" aria-expanded="true">
                    <tr>
                        <td :class="{'highlighted' : tableData.columnIndexHighlighted === indexFoot}" v-for="(tablefoot, indexFoot) in tableData.tfoot" :key="indexFoot">
                            {{ tablefoot }}
                        </td>
                    </tr>
                    </tfoot>
                </transition>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: "CmdTable",
    data() {
        return {
            showTableData: true,
            fullWidth: this.fullWidthOnDefault
        }
    },
    props: {
        /**
         * table data (incl. caption, thead, tbody)
         */
        tableData: {
            type: Object,
            required: true
        },
        /**
         * caption for table (shown above table)
         *
         * @requiredForAccessibility: true
         */
        caption: {
            type: Object,
            required: false
        },
        /**
         * activate if table should be collapsible
         */
        collapsible: {
            type: Boolean,
            default: false
        },
        /**
         * activate if table should be stretched to full width of its parent-container (else table will be as wide as its content)
         */
        fullWidthOnDefault: {
            type: Boolean,
            default: false
        },
        /**
         * user can toggle width (full-width (=100% of parent container or as wide as table content) with button above table)
         */
        userCanToggleWidth: {
            type: Boolean,
            default: true
        },
        /**
         * icon to expand table (vertically)
         *
         * @requiredForAccessibility: partial
         */
        iconExpand: {
            type: Object,
            default: function () {
                return {
                    iconClass: "icon-single-arrow-down",
                    tooltip: "Expand table"
                }
            }
        },
        /**
         * icon to collapse table (vertically)
         *
         * @requiredForAccessibility: partial
         */
        iconCollapse: {
            type: Object,
            default: function () {
                return {
                    iconClass: "icon-single-arrow-up",
                    tooltip: "Collapse table"
                }
            }
        },
        /**
         * icon to shrink table (horizontally)
         *
         * @requiredForAccessibility: partial
         */
        iconToggleWidth: {
            type: Object,
            default: function () {
                return {
                    iconClass: "icon-toggle-table-width",
                    tooltip: "Toggle table width"
                }
            }
        },
        /**
         * icon to stretch table (horizontally)
         *
         * @requiredForAccessibility: partial
         */
        iconStretch: {
            type: Object,
            default: function () {
                return {
                    iconClass: "icon-single-arrow-right",
                    tooltip: "Stretch table"
                }
            }
        }
    },
    computed: {
        hasCaption() {
            if (this.hideCaption) {
                return false
            }

            // check is a caption-text is defined
            return this.tableData.caption?.text || this.caption?.text
        },
        hideCaption() {
            return this.caption?.show === false || (this.caption?.show !== true && !this.tableData.caption?.show)
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-table-wrapper ---------------------------------------------------------------------------------------- */
.cmd-table-wrapper {
    display: inline-flex;
    flex-direction: column;
    max-width: 100%;
    margin-bottom: var(--default-margin);
    gap: calc(var(--default-margin) / 2);

    &.collapsed, &.full-width {
        overflow: hidden;

        table {
            th {
                white-space: normal;
            }
        }
    }

    > .button-wrapper {
        right: 0;
        z-index: 100;
        gap: calc(var(--default-gap) / 2);

        .button {
            padding: 0;
            min-width: 2rem;
            min-height: 2rem;

            [class*="icon-"] {
                font-size: var(--icon-size-small);
            }
        }
    }

    .inner-wrapper {
        overflow-x: auto;
        width: 100%;

        table {
            table-layout: fixed;
            margin: 0;

            th {
                a[class*='icon-'] {
                    &, &:hover, &:active, &:focus {
                        font-size: var(--icon-size-small);
                        color: var(--pure-white);
                    }
                }
            }
        }
    }

    &.has-caption {
        flex-direction: row;

        .button-wrapper {
            position: absolute;
        }

        table {
            margin-top: calc(var(--default-margin) / 2);
        }
    }

}

/* end cmd-table-wrapper ------------------------------------------------------------------------------------------ */
</style>