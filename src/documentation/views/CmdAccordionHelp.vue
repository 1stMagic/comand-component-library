<script setup>
import CmdAccordion from "../../components/CmdAccordion"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdAccordionHelp"
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="[{name: 'View'}, {name: 'Usage'}, {name: 'Properties'}]" :useSlot="true">
        <template v-slot:tab-content-0>
            <h3>View</h3>
            <CmdAccordion headline="Accordion headline" :accordionData="2">
                <template v-slot:accordionHeadline0>
                    <h3><span class="icon-user-group"></span><span>User groups1</span></h3>
                </template>
                <template v-slot:accordionContent0>
                    <p>
                        Content1
                    </p>
                </template>
                <template v-slot:accordionHeadline1>
                    <h3><span class="icon-user-group"></span><span>User groups2</span></h3>
                </template>
                <template v-slot:accordionContent1>
                    <p>
                        Content2
                    </p>
                </template>
            </CmdAccordion>
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre><code>{{ CmdCode }}</code></pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdAccordion.props" />
        </template>
        <template v-slot:tab-content-3>
            <ComponentProperties :properties="CmdAccordion.props" />
        </template>
    </CmdTabs>
</template>