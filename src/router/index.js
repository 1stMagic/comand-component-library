import { createRouter, createWebHistory } from 'vue-router'
import ContainerPage from "../documentation/views/ContainerPage"

const routes = [
    {
        path: "/CmdAccordion",
        name: "CmdAccordion",
        component: ContainerPage, props: { componentName: "CmdAccordion" }
    },
    {
        path: "/CmdAddressData",
        name: "CmdAddressData",
        component: ContainerPage, props: { componentName: "CmdAddressData" }
    },
    {
        path: "/CmdBackToTopButton",
        name: "CmdBackToTopButton",
        component: ContainerPage, props: { componentName: "CmdBackToTopButton" }
    },
    {
        path: "/CmdBankAccountData",
        name: "CmdBankAccountData",
        component: ContainerPage, props: { componentName: "CmdBankAccountData" }
    },
    {
        path: "/CmdBox",
        name: "CmdBox",
        component: ContainerPage, props: { componentName: "CmdBox" }
    },
    {
        path: "/CmdBoxSiteSearch",
        name: "CmdBoxSiteSearch",
        component: ContainerPage, props: { componentName: "CmdBoxSiteSearch" }
    },
    {
        path: "/CmdBreadcrumbs",
        name: "CmdBreadcrumbs",
        component: ContainerPage, props: { componentName: "CmdBreadcrumbs" }
    },
    {
        path: "/CmdCompanyLogo",
        name: "CmdCompanyLogo",
        component: ContainerPage, props: { componentName: "CmdCompanyLogo" }
    },
    {
        path: "/CmdCookieDisclaimer",
        name: "CmdCookieDisclaimer",
        component: ContainerPage, props: { componentName: "CmdCookieDisclaimer" }
    },
    {
        path: "/CmdCopyrightInformation",
        name: "CmdCopyrightInformation",
        component: ContainerPage, props: { componentName: "CmdCopyrightInformation" }
    },
    {
        path: "/CmdCustomHeadline",
        name: "CmdCustomHeadline",
        component: ContainerPage, props: { componentName: "CmdCustomHeadline" }
    },
    {
        path: "/CmdFakeSelect",
        name: "CmdFakeSelect",
        component: ContainerPage, props: { componentName: "CmdFakeSelect" }
    },
    {
        path: "/CmdFancyBox",
        name: "CmdFancyBox",
        component: ContainerPage, props: { componentName: "CmdFancyBox" }
    },
    {
        path: "/CmdFooterNavigation",
        name: "CmdFooterNavigation",
        component: ContainerPage, props: { componentName: "CmdFooterNavigation" }
    },
    {
        path: "/CmdForm",
        name: "CmdForm",
        component: ContainerPage, props: { componentName: "CmdForm" }
    },
    {
        path: "/CmdFormElement",
        name: "CmdFormElement",
        component: ContainerPage, props: { componentName: "CmdFormElement" }
    },
    {
        path: "/CmdFormFilters",
        name: "CmdFormFilters",
        component: ContainerPage, props: { componentName: "CmdFormFilters" }
    },
    {
        path: "/CmdGoogleMaps",
        name: "CmdGoogleMaps",
        component: ContainerPage, props: { componentName: "CmdGoogleMaps" }
    },
    {
        path: "/CmdImageGallery",
        name: "CmdImageGallery",
        component: ContainerPage, props: { componentName: "CmdImageGallery" }
    },
    {
        path: "/CmdImageZoom",
        name: "CmdImageZoom",
        component: ContainerPage, props: { componentName: "CmdImageZoom" }
    },
    {
        path: "/CmdLoginForm",
        name: "CmdLoginForm",
        component: ContainerPage, props: { componentName: "CmdLoginForm" }
    },
    {
        path: "/CmdMainNavigation",
        name: "CmdMainNavigation",
        component: ContainerPage, props: { componentName: "CmdMainNavigation" }
    },
    {
        path: "/CmdMultipleSwitch",
        name: "CmdMultipleSwitch",
        component: ContainerPage, props: { componentName: "CmdMultipleSwitch" }
    },
    {
        path: "/CmdMultipleFormProgressBar",
        name: "CmdMultipleFormProgressBar",
        component: ContainerPage, props: { componentName: "CmdMultipleFormProgressBar" }
    },
    {
        path: "/CmdOpeningHours",
        name: "CmdOpeningHours",
        component: ContainerPage, props: { componentName: "CmdOpeningHours" }
    },
    {
        path: "/CmdPager",
        name: "CmdPager",
        component: ContainerPage, props: { componentName: "CmdPager" }
    },
    {
        path: "/CmdProgressBar",
        name: "CmdProgressBar",
        component: ContainerPage, props: { componentName: "CmdProgressBar" }
    },
    {
        path: "/CmdShareButtons",
        name: "CmdShareButtons",
        component: ContainerPage, props: { componentName: "CmdShareButtons" }
    },
    {
        path: "/CmdSiteHeader",
        name: "CmdSiteHeader",
        component: ContainerPage, props: { componentName: "CmdSiteHeader" }
    },
    {
        path: "/CmdSlideButton",
        name: "CmdSlideButton",
        component: ContainerPage, props: { componentName: "CmdSlideButton" }
    },
    {
        path: "/CmdSlideshow",
        name: "CmdSlideshow",
        component: ContainerPage, props: { componentName: "CmdSlideshow" }
    },
    {
        path: "/CmdSwitchButton",
        name: "CmdSwitchButton",
        component: ContainerPage, props: { componentName: "CmdSwitchButton" }
    },
    {
        path: "/CmdSwitchLanguage",
        name: "CmdSwitchLanguage",
        component: ContainerPage, props: { componentName: "CmdSwitchLanguage" }
    },
    {
        path: "/CmdSystemMessage",
        name: "CmdSystemMessage",
        component: ContainerPage, props: { componentName: "CmdSystemMessage" }
    },
    {
        path: "/CmdTable",
        name: "CmdTable",
        component: ContainerPage, props: { componentName: "CmdTable" }
    },
    {
        path: "/CmdTabs",
        name: "CmdTabs",
        component: ContainerPage, props: { componentName: "CmdTabs" }
    },
    {
        path: "/CmdThumbnailScroller",
        name: "CmdThumbnailScroller",
        component: ContainerPage, props: { componentName: "CmdThumbnailScroller" }
    },
    {
        path: "/CmdTooltip",
        name: "CmdTooltip",
        component: ContainerPage, props: { componentName: "CmdTooltip" }
    },
    {
        path: "/CmdTopHeaderNavigation",
        name: "CmdTopHeaderNavigation",
        component: ContainerPage, props: { componentName: "CmdTopHeaderNavigation" }
    },
    {
        path: "/CmdUploadForm",
        name: "CmdUploadForm",
        component: ContainerPage, props: { componentName: "CmdUploadForm" }
    },
    {
        path: "/CmdWidthLimitationWrapper",
        name: "CmdWidthLimitationWrapper",
        component: ContainerPage, props: { componentName: "CmdWidthLimitationWrapper" }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router