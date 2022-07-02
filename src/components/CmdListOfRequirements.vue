<template>
    <div class="cmd-list-of-requirements">
        <!-- begin cmd-custom-headline -->
        <CmdCustomHeadline :headline-level="cmdCustomHeadline.headlineLevel">
            <!--         {{ getMessage("cmdfakeselect.headline.requirements_for_input") }}<br/>"{{ labelText }}"-->
        </CmdCustomHeadline>
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
        <template v-if="helplink">
            <hr v-if="helplink.show"/>
            <a
                v-if="helplink.show && helplink.url"
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
import CmdCustomHeadline from "./CmdCustomHeadline"

export default {
    name: "CmdListOfRequirements.vue",
    components: {CmdCustomHeadline},
    props: {
        inputModelValue: {
            type: [String, Boolean, Array, Number],
            default: ""
        },
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
        inputRequirements: {
            type: Array,
            required: true
        },
        helplink: {
            type: String,
            required: false
        },
        cmdCustomHeadline: {
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
/* begin cmd-list-of-requiremnets ------------------------------------------------------------------------------------------ */
.cmd-list-of-requirements {
    dl {
        .error {
            color: var(--error-color);
        }

        .warning {
            color: var(--warning-color);
        }

        .success {
            color: var(--success-color);
        }

        .info {
            color: var(--info-color);
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