<template>
    <div :class="['cmd-table-wrapper', {'collapsed': !showTableData, 'full-width': fullWidth}]">
        <div v-if="collapsible || userCanToggleWidth" class="button-wrapper">
            <a v-if="userCanToggleWidth" class="button"
               href="#" @click.prevent="fullWidth = !fullWidth"
               :title="fullWidth ? iconStretch.tooltip : iconShrink.tooltip"
            >
                <span :class="fullWidth ? iconStretch.iconClass : iconShrink.iconClass"></span>
            </a>
            <a v-if="collapsible" class="button"
               href="#" @click.prevent="showTableData = !showTableData"
               :title="showTableData ? iconCollapse.tooltip : iconExpand.tooltip"
            >
                <span :class="showTableData ? iconCollapse.iconClass : iconExpand.iconClass"></span>
            </a>
        </div>
        <table :class="{'full-width': fullWidth}">
            <caption :class="{hidden: tableData.caption.hide}">{{ tableData.caption.text }}</caption>
            <thead>
                <tr>
                    <th v-for="(tablehead, indexHead) in tableData.thead" :key="indexHead">
                        {{ tablehead }}
                    </th>
                </tr>
            </thead>
            <transition-group name="fade">
                    <tbody v-show="showTableData" aria-expanded="true">
                        <tr :class="{'highlighted' : tableData.rowIndexHighlighted === indexRows}" v-for="(tablerows, indexRows) in tableData.tbody" :key="indexRows">
                            <td :class="{'highlighted' : tableData.columnIndexHighlighted === indexData}" v-for="(tabledata, indexData) in tablerows" :key="indexData">
                                {{ tabledata }}
                            </td>
                        </tr>
                    </tbody>
                    <tfoot v-if="tableData.tfoot && tableData.tfoot.length">
                        <tr>
                            <td :class="{'highlighted' : tableData.columnIndexHighlighted === indexFoot}" v-for="(tablefoot, indexFoot) in tableData.tfoot" :key="indexFoot">
                                {{ tablefoot }}
                            </td>
                        </tr>
                    </tfoot>
            </transition-group>
        </table>
    </div>
</template>

<script>
export default {
    name: "CmdTableWrapper",
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
         */
        iconShrink: {
            type: Object,
            default: function () {
                return {
                    iconClass: "icon-single-arrow-left",
                    tooltip: "Shrink table"
                }
            }
        },
        /**
         * icon to stretch table (horizontally)
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
    }
}
</script>

<style lang="scss">
/* begin cmd-table-wrapper ---------------------------------------------------------------------------------------- */
.cmd-table-wrapper {
    display: inline-flex;
    max-width: 100%;
    overflow-x: auto;
    margin-bottom: var(--default-margin);

    &.collapsed, &.full-width {
        overflow: hidden;

        table {
            th {
                white-space: normal;
            }
        }
    }

    > .button-wrapper {
        position: absolute;
        right: 0;
        z-index: 100;
        gap: calc(var(--default-gap) / 2);

        .button {
            background: none;
            padding: 0;
            min-width: 2rem;
            min-height: 2rem;

            span[class*="icon"] {
                color: var(--primary-color);
                font-size: 1rem;

                &:hover, &:active, &:focus {
                    color: var(--hyperlink-color-highlighted);
                }
            }
        }

        & + table {
            margin-top: calc(var(--default-margin) / 2);
        }
    }

    table {
        table-layout: fixed;
        margin: 0;

        th {
            a[class*='icon-'] {
                &, &:hover, &:active, &:focus {
                    font-size: 1rem;
                    color: var(--pure-white);
                }
            }
        }
    }
}

/* end cmd-table-wrapper ------------------------------------------------------------------------------------------ */
</style>