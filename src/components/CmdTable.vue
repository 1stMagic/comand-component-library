<template>
    <div class="cmd-table-wrapper">
        <table :class="{'full-width': fullWidth}">
            <thead>
                <tr>
                    <th v-for="tablehead in 10" :key="tablehead">Table head {{ tablehead }}</th>
                    <th>Table head 11
                        <a v-if="collapsible === true"
                           href="#" @click.prevent="showTableData = !showTableData"
                           :class="[showTableData ? closeIconClass : openIconClass]">
                        </a>
                    </th>
                </tr>
            </thead>
            <transition name="fade">
                <tbody v-show="showTableData === true">
                    <tr v-for="tablerows in 10" :key="tablerows">
                        <td v-for="tabledata in 10" :key="tabledata">Table data {{ tabledata + 1 }}</td>
                        <td>Table data 11</td>
                    </tr>
                </tbody>
            </transition>
        </table>
    </div>
</template>

<script>
export default {
    name: "CmdTableWrapper",
    data () {
        return {
            showTableData: true
        }
    },
    props: {
        collapsible: {
            type: Boolean,
            default: false
        },
        fullWidth: {
            type: Boolean,
            default: false
        },
        openIconClass: {
            type: String,
            required: true
        },
        closeIconClass: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-table-wrapper --------------------------------------------------------------------------------------------------------------------------------------------------- */
.cmd-table-wrapper {
    max-width: 100%;
    overflow-x: auto;

    table {
        table-layout: fixed;
    }
}
/* end cmd-table-wrapper --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>