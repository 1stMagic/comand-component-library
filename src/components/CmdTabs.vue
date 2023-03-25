<template>
    <div class="cmd-tabs">
        <ul :class="{'stretch-tabs' : stretchTabs}" role="tablist">
            <li v-for="(tab, index) in tabs" :key="index" role="tab">
                <a :class="{active : showTab === index}" @click.prevent="setActiveTab(index)" :title="!tab.name ? tab.tooltip : undefined" href="#">
                    <!-- begin CmdIcon -->
                    <CmdIcon v-if="tab.iconClass" :iconClass="tab.iconClass" :type="tab.iconType" />
                    <!-- end CmdIcon -->
                    <span v-if="tab.name">{{ tab.name }}</span>
                </a>
            </li>
        </ul>

        <!-- begin slot -->
        <template v-if="useSlot">
            <div v-show="showTab === index - 1" v-for="index in tabs.length" :key="index" aria-live="assertive">
                <!-- begin slot-content -->
                <slot :name="'tab-content-' + (index - 1)"></slot>
                <!-- end slot-content -->
            </div>
        </template>
        <!-- end slot -->

        <div v-else aria-live="assertive">
            <!-- begin CmdHeadline -->
            <CmdHeadline
               v-if="cmdHeadline"
               v-bind="cmdHeadline"
               :headlineText="tabs[showTab].headlineText"
               :headlineLevel="tabs[showTab].headlineLevel"
            />
            <!-- end CmdHeadline -->
            <div v-html="tabs[showTab].htmlContent"></div>
        </div>
    </div>
</template>

<script>
// import functions
import {addCollection} from "@iconify/vue"

// import data
import IconData from '@/assets/data/icon.json'

addCollection(IconData)

export default {
    name: "CmdTabs",
    data() {
        return {
            showTab: this.activeTab
        }
    },
    emits: ["active-tab"],
    props: {
        /**
         * properties for CmdHeadline-component
         */
        cmdHeadline: {
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
            border-top-left-radius: var(--border-radius);
            border-top-right-radius: var(--border-radius);
            list-style-type: none;
            background: var(--color-scheme-background-color);

            a {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: var(--default-padding);
                border: var(--default-border);
                border-bottom: 0;
                border-top-left-radius: var(--border-radius);
                border-top-right-radius: var(--border-radius);
                text-decoration: none;

                span, [class*="icon-"] {
                    line-height: 100%;
                }

                &:hover, &:active, &:focus {
                    cursor: pointer;
                    color: var(--hyperlink-color-highlighted);
                    border-color: var(--hyperlink-color);

                    span, [class*="icon-"] {
                        color: inherit;
                    }
                }

                &.active {
                    span, [class*="icon-"] {
                        color: var(--pure-white);
                    }

                    &:hover, &:active, &:focus {
                        color: var(--hyperlink-color);
                        background: var(--pure-white);

                        span, [class*="icon-"] {
                            color: var(--hyperlink-color-highlighted);
                        }
                    }
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
        background: var(--color-scheme-background-color);
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