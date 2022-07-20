<template>
    <div class="cmd-list-of-requirements">
        <!-- begin cmd-custom-headline -->
        <CmdHeadline :headline-level="CmdHeadline.headlineLevel">
            <!-- {{ getMessage("cmdfakeselect.headline.requirements_for_input") }}<br/>"{{ labelText }}" -->
        </CmdHeadline>
        <!-- end cmd-custom-headline -->

        <!-- begin list of requirements -->
        <dl>
            <template v-for="(requirement, index) in inputRequirements" :key="index">
                <dt aria-live="assertive" :class="requirement.valid(inputModelValue, inputAttributes) ? 'success' : 'error'">{{ requirement.message }}:</dt>
                <dd :class="requirement.valid(inputModelValue, inputAttributes) ? 'success' : 'error'">
                    <span
                        aria-live="assertive"
                        :class="requirement.valid(inputModelValue, inputAttributes) ? 'icon-check-circle' : 'icon-error-circle'"
                        :title="requirement.valid(inputModelValue, inputAttributes) ? 'success' : 'error'"
                    >
                    </span>
                </dd>
            </template>
        </dl>
        <!-- end list of requirements -->

        <!-- begin helplink -->
        <template v-if="helplink && helplink.show">
            <hr />
            <a
                v-if="helplink.url"
                :href="helplink.url"
                :target="helplink.target"
                @click.prevent
            >
                <span v-if="helplink.icon?.iconClass"
                      :class="helplink.icon?.iconClass"
                      :title="helplink.icon?.tooltip">
                </span>
                <span v-if="helplink.text">
                    {{ helplink.text }}
                </span>
            </a>
        </template>
        <!-- end helplink -->
    </div>
</template>

<script>
// import components
import CmdHeadline from "./CmdHeadline"

export default {
    name: "CmdListOfRequirements",
    components: {
        CmdHeadline
    },
    props: {
        /**
        * property to check validity of given modelValue
        */
        inputModelValue: {
            type: [String, Boolean, Array, Number],
            default: ""
        },
        /**
         * property to check validity of given attributes
         */
        inputAttributes: {
            type: Object,
            required: true
        },
        /**
         * text for label
         */
        labelText: {
            type: String,
            required: false
        },
        /**
         * list of all requirements
         */
        inputRequirements: {
            type: Array,
            required: true
        },
        /**
         * set a helplink to a different page for further support
         */
        helplink: {
            type: String,
            required: false
        },
        /**
         * properties of CmdHeadline-component
         */
        CmdHeadline: {
            type: Object,
            default() {
                return {
                    headlineLevel: 4
                }
            }
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-list-of-requirements ------------------------------------------------------------------------------------------ */
.cmd-list-of-requirements {
    dl {
        .error {
            --status-color: var(--error-color);
        }

        .warning {
            --status-color: var(--warning-color);
        }

        .success {
            --status-color: var(--success-color);
        }

        .info {
            --status-color: var(--info-color);
        }

        dt {
            color: var(--status-color);
        }

        span[class*="icon"] {
            font-size: 1.2rem;
            color: var(--status-color);
        }

        & ~ a {
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            text-decoration: none;

            span[class*="icon"] {
                font-size: 1.2rem;
            }
        }
    }
}
/* end cmd-list-of-requirements ------------------------------------------------------------------------------------------ */
</style>