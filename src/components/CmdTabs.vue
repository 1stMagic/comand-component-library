<template>
    <div class="cmd-tabs">
        <ul :class="{'stretch-tabs' : stretchTabs}">
            <li :class="{active : showTab === index}" v-for="(tab, index) in tabs" :key="index"><a @click.prevent="showTab = index">{{ tab.name }}</a></li>
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
        stretchTabs: Boolean,
        tabs: Array,
        useComponent: Boolean
    }
}
</script>

<style lang="scss">
/* begin tabs --------------------------------------------------------------------------------------------------------------------------------------------------- */
.cmd-tabs {
    > ul {
        margin-bottom: 0;
        display: -webkit-flex; /* Safari 6-8 */
        display: flex;

        > li {
            border: var(--primary-border);
            background: var(--pure-white);
            z-index: 10;
            margin-left: 0;
            border: var(--default-border);
            border-bottom: 0;
            border-top-left-radius: var(--border-radius);
            border-top-right-radius: var(--border-radius);
            list-style-type: none;

            &.active {
                border-color: var(--primary-color);
                border-bottom: 0;
                top: .1rem;

                a {
                    color: var(--primary-color);
                }
            }

            a  {
                color: var(--text-color);
                padding: var(--default-padding);
                display: block;

                &:hover, &:active, &:focus {
                    cursor: pointer;
                    color: var(--primary-color);
                }
            }
        }
    }

    .headline {
        margin-top: 0;
    }

    > div {
        padding: var(--default-padding);
        border: var(--primary-border);
        border-radius: var(--border-radius);
        border-top-left-radius: 0;
    }

    /* stretch tabs with display-flex */
    &.stretch-tabs {
        > li {
            flex: 1;
        }

        > div {
            border-top-right-radius: 0;
        }
    }
}
/* end cmd-tabs --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>