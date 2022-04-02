<script setup>
// import functions
import {tabProps, tabHandlers} from "../tabs"
import {isFrameMode} from "../../utils/common"

// import components
import CmdBoxWrapper from "../../components/CmdBoxWrapper"
import CmdBox from "../../components/CmdBox"
import ComponentProperties from "../components/ComponentProperties"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"
import CmdCustomHeadline from "../../components/CmdCustomHeadline"

// import example-data
import CmdCode from "../data/CmdAddressDataHelp"
import propertyDescriptions from "../generated/CmdAddressDataPropertyDescriptions"

const propertyStructures = {
    addressData: {
        "company": "<string>",
        "address": {
            "streetNo": "<string>",
            "zip": "<number>",
            "city": "<string>"
        },
        "telephone": "<string>",
        "mobilephone": "<string>",
        "fax": "<string>",
        "email": "<string>"
    }
}
</script>

<template>
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <h2>Component</h2>
            <section class="example-section">
                <a id="example1"></a>
                <CmdCustomHeadline preHeadlineText="Example #1" headlineText="Box Wrapper with Box 'content' FLEX" :headlineLevel="3" />
                <ViewCodeData :isFirstComponent="true" :code="CmdCode[0]">
                    <CmdBoxWrapper :useFlexbox="true">
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 1', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 2', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 3', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 4', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 5', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 6', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 7', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 8', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 9', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 10', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 11', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 12', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 13', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 14', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 15', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 16', headlineLevel: 3}" />
                    </CmdBoxWrapper>
                </ViewCodeData>
            </section>
            <hr />
            <section class="example-section">
                <a id="example2"></a>
                <CmdCustomHeadline preHeadlineText="Example #1" headlineText="Box Wrapper with Box 'content' DEFAULT-GRID" :headlineLevel="3" />
                <ViewCodeData :code="CmdCode[0]">
                    <CmdBoxWrapper>
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 1', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 2', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 3', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 4', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 5', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 6', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 7', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 8', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 9', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 10', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 11', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 12', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 13', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 14', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 15', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 16', headlineLevel: 3}" />
                    </CmdBoxWrapper>
                </ViewCodeData>
            </section>
            <hr />
            <section class="example-section">
                <a id="example3"></a>
                <CmdCustomHeadline preHeadlineText="Example #1" headlineText="Box Wrapper with Box 'content' CUSTOM-GRID" :headlineLevel="3" />
                <ViewCodeData :code="CmdCode[0]">
                    <CmdBoxWrapper :boxesPerRow="[5, 2, 1]">
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 1', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 2', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 3', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 4', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 5', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 6', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 7', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 8', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 9', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 10', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 11', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 12', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 13', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 14', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 15', headlineLevel: 3}" />
                        <CmdBox textBody="Content" :cmd-custom-headline="{headlineText: 'Headline 16', headlineLevel: 3}" />
                    </CmdBoxWrapper>
                </ViewCodeData>
            </section>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdBoxWrapper.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>