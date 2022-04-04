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
import boxProduct from '../../assets/data/box-product'
import boxUser from '../../assets/data/box-user'
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
                <CmdCustomHeadline preHeadlineText="Example #1" headlineText="Box Wrapper with Box 'content' using Flexbox" :headlineLevel="3" />
                <ViewCodeData :isFirstComponent="true" :code="CmdCode[0]">
                    <CmdBoxWrapper :useFlexbox="true">
                        <CmdBox v-for="index in 14" :key="index" textBody="Content" :cmd-custom-headline="{headlineText: 'Headline ' + index, headlineLevel: 3}" />
                    </CmdBoxWrapper>
                </ViewCodeData>
            </section>
            <hr />
            <section class="example-section">
                <a id="example2"></a>
                <CmdCustomHeadline preHeadlineText="Example #2" headlineText="Box Wrapper with Box 'content (collapsible)' using the default grid" :headlineLevel="3" />
                <ViewCodeData :code="CmdCode[0]">
                    <CmdBoxWrapper>
                        <CmdBox v-for="index in 7" :key="index" textBody="Content" :collapsible="true" :cmd-custom-headline="{headlineText: 'Headline ' + index, headlineLevel: 3}" />
                    </CmdBoxWrapper>
                </ViewCodeData>
            </section>
            <hr />
            <section class="example-section">
                <a id="example3"></a>
                <CmdCustomHeadline preHeadlineText="Example #3" headlineText="Box Wrapper with Box 'content' using a custom grid" :headlineLevel="3" />
                <ViewCodeData :code="CmdCode[0]">
                    <CmdBoxWrapper :boxesPerRow="[5, 2, 1]">
                        <CmdBox v-for="index in 7" :key="index" textBody="Content" :cmd-custom-headline="{headlineText: 'Headline ' + index, headlineLevel: 3}" />
                    </CmdBoxWrapper>
                </ViewCodeData>
            </section>
            <hr />
            <section class="example-section">
                <a id="example4"></a>
                <CmdCustomHeadline preHeadlineText="Example #4" headlineText="Box Wrapper with Box 'product' using a custom grid" :headlineLevel="3" />
                <ViewCodeData :code="CmdCode[0]" :data="boxProduct">
                    <CmdBoxWrapper :boxesPerRow="[5, 2, 1]">
                        <CmdBox v-for="index in boxProduct.length" :key="index" boxType="product" :product="boxProduct[index - 1]" :cmdCustomHeadline="{headlineLevel: 5}" />
                    </CmdBoxWrapper>
                </ViewCodeData>
            </section>
            <hr />
            <section class="example-section">
                <a id="example5"></a>
                <CmdCustomHeadline preHeadlineText="Example #5" headlineText="Box Wrapper with Box 'user' using a custom grid" :headlineLevel="3" />
                <ViewCodeData :code="CmdCode[0]" :data="boxUser">
                    <CmdBoxWrapper :boxesPerRow="[5, 2, 1]">
                        <CmdBox v-for="index in boxUser.length" :key="index" boxType="user" :product="boxUser[index - 1]" :cmdCustomHeadline="{headlineLevel: 5}" />
                    </CmdBoxWrapper>
                </ViewCodeData>
            </section>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdBoxWrapper.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>