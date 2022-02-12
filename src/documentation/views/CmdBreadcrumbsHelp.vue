<script setup>
import CmdBreadcrumbs from "../../components/CmdBreadcrumbs"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdBreadcrumbsHelp"
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="[{name: 'View'}, {name: 'Usage'}, {name: 'Properties'}]" :useSlot="true">
        <template v-slot:tab-content-0>
            <h3>View</h3>
            <CmdBreadcrumbs />
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre><code>{{ CmdCode }}</code></pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdBreadcrumbs.props" />
        </template>
    </CmdTabs>
</template>