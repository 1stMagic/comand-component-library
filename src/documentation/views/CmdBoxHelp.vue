<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdBox from "../../components/CmdBox"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdBoxHelp"

const props = defineProps(commonProps)
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="[{name: 'View'}, {name: 'Usage'}, {name: 'Properties'}]" :useSlot="true" :activeTab="props.activeTab">
        <template v-slot:tab-content-0>
            <h3>View</h3>
            <CmdBox :cmdCustomHeadline="{ headline: {text: 'Headline given by property', level: '3'}}" textBody="Content given by property" />
            <CmdBox :useSlot="true">
                <template v-slot:header>
                    <h3>
                        Headline given by slot
                    </h3>
                </template>
                <template v-slot:body>
                    <p class="padding">
                        Content given by slot
                    </p>
                </template>
                <template v-slot:footer>
                    <p>
                        Footer given by slot
                    </p>
                </template>
            </CmdBox>
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre><code>{{ CmdCode }}</code></pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdBox.props" />
        </template>
    </CmdTabs>
</template>