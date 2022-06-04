<template>
    <div class="cmd-tabs">
        <ul :class="{'stretch-tabs' : stretchTabs}" role="tablist">
            <li :class="{active : showTab === index}" v-for="(tab, index) in tabs" :key="index" role="tab">
                <a @click.prevent="setActiveTab(index)" :title="!tab.name ? tab.tooltip : false">
                    <span v-if="tab.iconClass">{{ tab.iconClass }}</span>
                    <span v-if="tab.name">{{ tab.name }}</span>
                </a>
            </li>
        </ul>
        <template v-if="useSlot">
            <div v-show="showTab === index - 1" v-for="index in tabs.length" :key="index" aria-live="assertive">
                <!-- begin slot-content -->
                <slot :name="'tab-content-' + (index - 1)"></slot>
                <!-- end slot-content -->
            </div>
        </template>
        <div v-else aria-live="assertive">
            <!-- begin CmdCustomHeadline -->
            <CmdCustomHeadline
               v-bind="cmdCustomHeadline"
               :headlineText="tabs[showTab].headlineText"
               :headlineLevel="tabs[showTab].headlineLevel"
            />
            <!-- end CmdCustomHeadline -->
            <div v-html="tabs[showTab].htmlContent"></div>
        </div>
    </div>
</template>

<script>
// import components
import CmdCustomHeadline from "./CmdCustomHeadline"

export default {
    name: "CmdTabs",
    components: {
        CmdCustomHeadline
    },
    data() {
        return {
            showTab: this.activeTab
        }
    },
    emits: ["active-tab"],
    props: {
        /**
         * properties for CmdCustomHeadline-component
         */
        cmdCustomHeadline: {
            type: Object,
            required: false
        },
        /**
         * activate if tabs should be (equally) stretched horizontally over full width of tab-content
         */
        stretchTabs: {
            type: Boolean,
            default: false
        },
        /**
         * list of tabs (incl. tab-name and tab-content (optional))
         */
        tabs: {
            type: Array,
            required: true
        },
        /**
         * activate if content should be given by slot
         */
        useSlot: {
            type: Boolean,
            default: false
        },
        /**
         * set default active/shown tab
         */
        activeTab: {
            type: Number,
            default: 0
        }
    },
    methods: {
      setActiveTab(index) {
          this.showTab = index
          this.$emit("active-tab", index)
      }
    },
    watch: {
        activeTab() {
            this.showTab = this.activeTab
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-tabs ------------------------------------------------------------------------------------------ */
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
            background: var(--pure-white);
            border: var(--default-border);

            &.active {
                border-bottom: 0;
                border-color: var(--primary-color);
                top: .1rem;

                a {
                    color: var(--primary-color);
                }
            }

            a {
                display: block;
                padding: var(--default-padding);
                color: var(--text-color);

                &:hover, &:active, &:focus {
                    cursor: pointer;
                    color: var(--primary-color);
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
        border: var(--primary-border);
        border-radius: var(--border-radius);
        background: var(--pure-white);
        border-top-left-radius: 0;

        > div {
            *:last-child {
                margin-bottom: 0;
            }
        }
    }
}

/* end cmd-tabs ------------------------------------------------------------------------------------------ */
</style>