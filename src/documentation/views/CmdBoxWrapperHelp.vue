<script setup>
// import functions
import {tabProps, tabHandlers} from "../tabs"
import {isFrameMode} from "../../utils/common"

// import components
import CmdBox from "../../components/CmdBox"
import CmdBoxWrapper from "../../components/CmdBoxWrapper"
import CmdTabs from "../../components/CmdTabs"
import ComponentProperties from "../components/ComponentProperties"
import ViewCodeData from "../components/ViewCodeData"
import ExampleSectionWrapper from "../components/ExampleSectionWrapper"

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
            <ExampleSectionWrapper componentName="CmdBoxWrapper" headlineText="Box Wrapper with Box 'content' using Flexbox">
                <ViewCodeData :isFirstComponent="true" :code="CmdCode[0]">
                    <CmdBoxWrapper :useFlexbox="true">
                        <CmdBox v-for="index in 14" :key="index" textBody="Content" :cmd-custom-headline="{headlineText: 'Headline ' + index, headlineLevel: 3}" />
                    </CmdBoxWrapper>
                </ViewCodeData>
            </ExampleSectionWrapper>
            <hr />
            <ExampleSectionWrapper componentName="CmdBoxWrapper" headlineText="Box Wrapper with Box 'content (collapsible)' using the default grid">
                <ViewCodeData :code="CmdCode[0]">
                    <CmdBoxWrapper :allowTogglingCollapsingBoxes="true" v-slot="slotprops">
                        <CmdBox v-for="index in 7"
                                :key="index"
                                textBody="Content"
                                :collapsible="true"
                                :collapsingBoxesOpen="slotprops.collapsingBoxesOpen"
                                :cmd-custom-headline="{
                                    headlineText: 'Headline ' + index,
                                    headlineLevel: 3
                                }"
                        />
                    </CmdBoxWrapper>
                </ViewCodeData>
            </ExampleSectionWrapper>
            <hr />
            <ExampleSectionWrapper componentName="CmdBoxWrapper" headlineText="Box Wrapper with single box open at once using the default grid">
                <ViewCodeData :code="CmdCode[0]">
                    <CmdBoxWrapper v-slot="slotprops">
                        <CmdBox v-for="index in 7"
                                :key="index"
                                textBody="Content"
                                :collapsible="true"
                                :collapsingBoxesOpen="slotprops.currentOpenBox === index || (slotprops.currentOpenBox === 0 && index === 1)"
                                :cmd-custom-headline="{
                                    headlineText: 'Headline ' + index,
                                    headlineLevel: 3
                                }"
                                @toggle-collapse="slotprops.boxToggled(index, $event)"
                        />
                    </CmdBoxWrapper>
                </ViewCodeData>
            </ExampleSectionWrapper>
            <hr />
            <ExampleSectionWrapper componentName="CmdBoxWrapper" headlineText="Box Wrapper with Box 'content' using a custom grid">
                <ViewCodeData :code="CmdCode[0]">
                    <CmdBoxWrapper :boxesPerRow="[5, 2, 1]">
                        <CmdBox v-for="index in 7" :key="index" textBody="Content" :cmd-custom-headline="{headlineText: 'Headline ' + index, headlineLevel: 3}" />
                    </CmdBoxWrapper>
                </ViewCodeData>
            </ExampleSectionWrapper>
            <hr />
            <ExampleSectionWrapper componentName="CmdBoxWrapper" headlineText="Box Wrapper with Box 'product' using a custom grid">
                <ViewCodeData :code="CmdCode[0]" :data="boxProduct">
                    <CmdBoxWrapper :boxesPerRow="[5, 2, 1]">
                        <CmdBox v-for="index in boxProduct.length" :key="index" boxType="product" :product="boxProduct[index - 1]" :cmdCustomHeadline="{headlineLevel: 5}" />
                    </CmdBoxWrapper>
                </ViewCodeData>
            </ExampleSectionWrapper>
            <hr />
            <ExampleSectionWrapper componentName="CmdBoxWrapper" headlineText="Box Wrapper with Box 'user' using a custom grid">
                <ViewCodeData :code="CmdCode[0]" :data="boxUser">
                    <CmdBoxWrapper :boxesPerRow="[5, 2, 1]">
                        <CmdBox v-for="index in boxUser.length" :key="index" boxType="user" :user="boxUser[index - 1]" :cmdCustomHeadline="{headlineLevel: 5}" />
                    </CmdBoxWrapper>
                </ViewCodeData>
            </ExampleSectionWrapper>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdBoxWrapper.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>