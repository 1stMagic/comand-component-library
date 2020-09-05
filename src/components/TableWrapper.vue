<template>
    <div class="table_wrapper">
        <table>
            <thead>
                <tr>
                    <th  v-for="(tablehead, index) in 10" :key="index">Table head {{ index }}</th>
                    <th>Table head {{ index }}
                        <a v-if="collapsible == true" href="#" @click.prevent="showTableData = !showTableData" :class="{'icon-single_arrow_down' : showTableData, 'icon-single_arrow_up' : !showTableData}"></a>
                    </th>
                </tr>
            </thead>
            <transition name="fade">
                <tbody v-show="showTableData == true">
                    <tr v-for="(tablerows, index) in 10" :key="index">
                        <td v-for="(tabledata, subindex) in 10" :key="subindex">Table data {{ subindex + 1 }}</td>
                        <td>Table data 11</td>
                    </tr>
                </tbody>
            </transition>
        </table>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                showTableData: true
            }
        },
        props: {
            collapsible: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style scoped lang="scss">
.table_wrapper {
    max-width: 100%;
    overflow-x: auto;

    table {
        th {
            [class*='icon-'] {
                font-size: 1rem;
                color: var(--pure-white);
            }
        }

        .fade-enter-active, .fade-leave-active {
            transition: all 1s linear;
            opacity: 1;
        }

        .fade-enter, .fade-leave-to {
            opacity: 0;
        }
    }
}
</style>