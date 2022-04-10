<template>
    <section class="example-section">
        <a :id="getExampleId()"></a>
        <!-- begin cmd-custom-headline -->
        <CmdCustomHeadline
            :preHeadlineText="getPreHeadlineText()"
            :headlineText="headlineText"
            :headlineLevel="3"
        />
        <!-- end cmd-custom-headline -->
        <slot></slot>
    </section>
</template>

<script>
// import functions
import {currentSequenceValue, nextSequenceValue} from "../../utils/globalSequence";

// import components
import CmdCustomHeadline from "../../components/CmdCustomHeadline"

export default {
    name: "ExampleSectionWrapper",
    components: {
        CmdCustomHeadline
    },
    props: {
        componentName: {
            type: String,
            required: true
        },
        headlineText: {
            type: String,
            required: true
        }
    },
    methods: {
         getExampleId() {
            return "example" + nextSequenceValue(this.componentName)
        },
         getPreHeadlineText() {
            return "Example #" + currentSequenceValue(this.componentName)
        }
    }
}
</script>