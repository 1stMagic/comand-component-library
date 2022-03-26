export default [
`<CmdSiteHeader :mainNavigationEntries="navigationData" :sticky="true">
    <!-- begin slot:top-header -->
    <template v-slot:top-header>
        <CmdTopHeaderNavigation 
            :topHeaderNavigationData="topHeaderNavigationData"
        />
    </template>
    <!-- end slot:top-header -->
    <!-- begin slot:logo -->
    <template v-slot:logo>
        <CmdCompanyLogo 
            :link="companyLogoData.link" 
            altText="CoManD Logo" 
            :pathDefaultLogo="require('@/assets/images/logo.svg')"
            :pathDarkmodeLogo="require('@/assets/images/logo-darkmode.svg')"
        />
    </template>
    <!-- end slot:logo -->
</CmdSiteHeader>`
]