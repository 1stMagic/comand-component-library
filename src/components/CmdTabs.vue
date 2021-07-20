<template>
    <div class="cmd-tabs">
        <ul :class="{'stretch-tabs' : stretchTabs}">
            <li :class="{active : showTab === index}" v-for="(tab, index) in tabs" :key="index" role="tab">
                <a @click.prevent="showTab = index">{{ tab.name }}</a>
            </li>
        </ul>
        <template v-if="useComponent">
            <div v-show="showTab === index" v-for="(tab, index) in tabs" :key="index">
                <slot :name="'tab-content-' + index"></slot>
            </div>
        </template>
        <div v-else>
            <h3 class="headline">{{ tabs[showTab].headline }}</h3>
            <div v-html="tabs[showTab].htmlContent"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CmdTabs",
    data() {
        return {
            showTab: 0
        }
    },
    props: {
        stretchTabs: {
            type: Boolean,
            default: false
        },
        tabs: {
            type: Array,
            required: true,
        },
        useComponent: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-tabs --------------------------------------------------------------------------------------------------------------------------------------------------- */
.cmd-tabs {
    > ul {
        margin-bottom: 0;
        display: -webkit-flex; /* Safari 6-8 */
        display: flex;

        > li {
            z-index: 10;
            margin-left: 0;
            border-bottom: 0;
            border-top-left-radius: var(--border-radius);
            border-top-right-radius: var(--border-radius);
            list-style-type: none;

            &.active {
                border-bottom: 0;
                top: .1rem;
            }

            a  {
                padding: var(--default-padding);
                display: block;

                &:hover, &:active, &:focus {
                    cursor: pointer;
                }
            }
        }

        &.stretch-tabs {
            > li {
                flex: 1;
                text-align: center;
            }

            > div {
                border-top-right-radius: 0;
            }
        }
    }

    .headline {
        margin-top: 0;
    }

    > div {
        padding: var(--default-padding);
        border-radius: var(--border-radius);
        border-top-left-radius: 0;

        > div {
            *:last-child {
                margin-bottom: 0;
            }
        }
    }
}
/* end cmd-tabs --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>