<!--suppress HtmlUnknownTarget, NpmUsedModulesInstalled, JSUnresolvedVariable -->
<template>
  <div id="app">
    <CmdWidthLimitationWrapper inner-component="header" :sticky="true">
        <CmdTopHeaderNavigation :topHeaderNavigationData="topHeaderNavigationData" v-if="topHeaderNavigationData" />
        <CmdLogo altText="CoManD Logo" :pathLogo="require('@/assets/images/logo.svg')" />
    </CmdWidthLimitationWrapper>

    <CmdWidthLimitationWrapper inner-component="div">
        <CmdBreadcrumbs :breadcrumbLinks="breadcrumbData" breadcrumbLabel="You are here:" />
    </CmdWidthLimitationWrapper>

    <CmdWidthLimitationWrapper>
        <h2 class="headline-demopage">Accordion</h2>
        <h3>Single mode</h3>
        <CmdAccordion :accordionData="accordionData.accordionData1"
                   toggleMode="single"
                   tooltip="Click to toggle content"
                   openIconClass="icon-single-arrow-up"
                   closeIconClass="icon-single-arrow-down"
        />
        <h3>Multiple mode</h3>
        <CmdAccordion :accordionData="accordionData.accordionData2"
                   toggleMode="multiple"
                   tooltip="Click to toggle content"
                   openIconClass="icon-single-arrow-up"
                   closeIconClass="icon-single-arrow-down"
        />
    </CmdWidthLimitationWrapper>

    <CmdBackToTopButton href="#anchor-back-to-top" iconClass="icon-single-arrow-up" tooltip="Back to top" />

    <CmdWidthLimitationWrapper>
        <h2 class="headline-demopage">Boxes</h2>
        <h3>Content boxes</h3>
        <div class="grid-container-create-columns">
          <div class="grid-small-item">
            <CmdBoxContent>
              <h3 slot="header">
                Box with text
              </h3>
              <p slot="body" class="padding">
                box body with paragraph
              </p>
              <p slot="footer">
                footer content
              </p>
            </CmdBoxContent>
          </div>
          <div class="grid-small-item">
            <CmdBoxContent>
              <h3 slot="header">
                Box with list
              </h3>
              <ul slot="body" class="padding">
                <li>list item</li>
                <li>list item</li>
                <li>list item</li>
                <li>list item</li>
              </ul>
              <p slot="footer">
                footer content
              </p>
            </CmdBoxContent>
          </div>
          <div class="grid-small-item">
            <CmdBoxContent>
              <h3 slot="header">
                Box with links
              </h3>
              <ul slot="body" class="navigation">
                <li><a href="#" @click.prevent="">Link name 1</a></li>
                <li><a href="#" @click.prevent="">Link name 2</a></li>
                <li><a href="#" @click.prevent="">Link name 3</a></li>
                <li><a href="#" @click.prevent="">Link name 4</a></li>
              </ul>
              <p slot="footer">
                footer content
              </p>
            </CmdBoxContent>
          </div>
          <div class="grid-small-item">
            <CmdBoxContent>
              <h3 slot="header">
                Box with image
              </h3>
              <img src="media/images/content-images/logo-business-edition-landscape.jpg" alt="Alternative text" slot="body" />
              <p slot="footer">
                footer content
              </p>
            </CmdBoxContent>
          </div>
        </div>
        <h3>User boxes</h3>
        <div class="grid-container-create-columns">
          <div class="grid-small-item" v-for="(user, index) in boxUserData" :key="index">
            <CmdBoxUser :user="user" />
          </div>
        </div>
        <h3>Product boxes</h3>
        <div class="grid-container-create-columns">
          <div class="grid-small-item" v-for="(product, index) in boxProductData" :key="index">
            <CmdBoxProduct :product="product" />
          </div>
        </div>
        </CmdWidthLimitationWrapper>

    <CmdWidthLimitationWrapper>
        <h2 class="headline-demopage">Fancybox</h2>
        <a href="#" @click.prevent="showFancyBox('text','Some text')">Open FancyBox with text</a>
        <a href="#" @click.prevent="showFancyBox('image', 'media/images/content-images/logo-business-edition-landscape.jpg')" title="Open FancyBox with large image">
            <img src="media/images/content-images/logo-business-edition-landscape.jpg" alt="Alternative text" />
        </a>
      </CmdWidthLimitationWrapper>

    <!-- begin advanced form elements --------------------------------------------------------------------------------------------------------------------------------------------------->
    <CmdWidthLimitationWrapper>
        <a id="anchor-advanced-form-elements"></a>
        <h2 class="headline-demopage">Advanced Form Elements</h2>
        <div class="flex-container">
          <ul class="list-status">
            <li>Form elements status:</li>
            <li><a href="#" @click.prevent="formElementStatus = ''" :class="{'active' : formElementStatus === ''}" id="status-default">Default</a></li>
            <li><a href="#" @click.prevent="formElementStatus = 'error'" :class="{'active' : formElementStatus === 'error'}" id="status-error">Error</a></li>
            <li><a href="#" @click.prevent="formElementStatus = 'disabled'" :class="{'active' : formElementStatus === 'disabled'}" id="status-disabled">Disabled</a></li>
          </ul>
        </div>

        <!-- begin formfilters -->
        <CmdFormFilters :selectedOptions="selectedOptions"
                     :selectedOptionsName="getOptionName"
                     labelDeleteAllFilters="Alle Filter löschen"
                     iconClassDeleteAllFilters="icon-delete"
                     iconClassDeleteFilter="icon-cancel" />
        <!-- end formfilters -->

        <form method="get" novalidate="novalidate" id="advanced-form-elements">
          <div class="fieldset grid-container-create-columns">
            <h2>Fake Selects</h2>
            <div class="flex-container-with-gap">
              <CmdFakeSelect :status="formElementStatus"
                          :selectData="fakeSelectOptionsData"
                          v-model="selectedOptions"
                          defaultOptionName="Filters:"
                          type="filterList"
                          iconClass="icon-single-arrow-down" />
              <CmdFakeSelect :status="formElementStatus" defaultOptionName="HTML-Content:" iconClass="icon-single-arrow-down">
                <ul>
                  <li>
                    <div>
                      <h3>Headline</h3>
                      <p>Some content inside a paragraph</p>
                    </div>
                    <div>
                      <img src="media/images/thumbnail-scroller/thumbnail/logo-cmd-blue-landscape.jpg" alt="image" />
                    </div>
                  </li>
                </ul>
              </CmdFakeSelect>
              <CmdFakeSelect :status="formElementStatus"
                          :selectData="fakeSelectCountriesData"
                          v-model="selectedCountry"
                          defaultOptionName="Select country:"
                          type="country" iconClass="icon-single-arrow-down" />
              <CmdFakeSelect :status="formElementStatus"
                          :selectData="fakeSelectColorsData"
                          v-model="selectedColor"
                          defaultOptionName="Select color:"
                          type="color"
                          iconClass="icon-single-arrow-down" />
            </div>

            <!-- begin progress bar -->
            <h2>Progress Bar [native]</h2>
            <CmdProgressBar labelText="Progress Bar (with optional output):" id="progress-bar2" max="100" />
            <!-- end progress bar -->

            <!-- begin slider -->
            <h2>Slider [native]</h2>
            <label for="range-slider" :class="formElementStatus">
              <span>Single-Slider (with in- and output):</span>
              <span class="input-wrapper">
                <input type="number" :class="formElementStatus" v-model="rangeValue" :disabled="formElementStatus === 'disabled'" min="0" max="100" />
                <input type="range"
                       class="range-slider"
                       :class="{'disabled': formElementStatus === 'disabled'}"
                       id="range-slider"
                       v-model="rangeValue"
                       :disabled="formElementStatus === 'disabled'"
                       min="0"
                       max="100" />
              </span>
            </label>
            <!-- end slider -->

            <hr />

            <!-- begin toggle-switch-radio with switch-button -->
            <h2>Toggle-Switches (Radio and Checkbox) with Switch-Button</h2>
            <label class="inline">
              <span>Label for Toggle-Switch-Checkbox with Switch-Button:</span>
              <span class="input-wrapper">
                <CmdSwitchButton
                        type="checkbox"
                        id="checkbox1"
                        name="checkbox1"
                        onLabel="Label on"
                        offLabel="Label off"
                        inputValue="checkbox1"
                        :disabled="formElementStatus === 'disabled'"
                        v-model="switchButtonCheckbox" />

                <CmdSwitchButton
                        type="checkbox"
                        id="checkbox2"
                        name="checkbox2"
                        onLabel="Label on"
                        offLabel="Label off"
                        inputValue="checkbox2"
                        :disabled="formElementStatus === 'disabled'"
                        v-model="switchButtonCheckbox" />
              </span>
            </label>
            <!-- end toggle-switch-radio with switch-button -->

            <label class="inline">
              <span>Label for Toggle-Switch-Checkbox with Switch-Button (colored):</span>
              <span class="input-wrapper">
                <CmdSwitchButton
                        type="checkbox"
                        id="checkbox3"
                        name="checkbox3"
                        onLabel="Label on"
                        offLabel="Label off"
                        :colored="true"
                        inputValue="checkbox3"
                        :disabled="formElementStatus === 'disabled'"
                        v-model="switchButtonCheckbox" />

                <CmdSwitchButton
                        type="checkbox"
                        id="checkbox4"
                        name="checkbox4"
                        onLabel="Label on"
                        offLabel="Label off"
                        :colored="true"
                        inputValue="checkbox4"
                        :disabled="formElementStatus === 'disabled'"
                        v-model="switchButtonCheckbox" />
              </span>
            </label>
            <!-- end toggle-switch-radio with switch-button -->

            <!-- begin toggle-switch-radio with switch-button (colored) -->
            <label class="inline">
              <span>Label for Toggle-Switch-Radio with switch-button (colored):</span>
              <span class="input-wrapper">
                <CmdSwitchButton
                        type="radio"
                        id="radio1"
                        name="radiogroup"
                        onLabel="Label on"
                        offLabel="Label off"
                        :colored="true"
                        inputValue="radio1"
                        :disabled="formElementStatus === 'disabled'"
                        v-model="switchButtonRadio" />

                <CmdSwitchButton
                        type="radio"
                        id="radio2"
                        name="radiogroup"
                        onLabel="Label on"
                        offLabel="Label off"
                        :colored="true"
                        inputValue="radio2"
                        :disabled="formElementStatus === 'disabled'"
                        v-model="switchButtonRadio" />
              </span>
            </label>
            <!-- end toggle-switch-radio with switch-button (colored) -->

            <h2>Inputfields in Columns</h2>
            <CmdFormElement element="input"
                        required="required"
                        labelText="Label for inputfield (with tooltip):"
                        type="text"
                        id="inputfield1"
                        autofocus="autofocus"
                        placeholder="This is placeholder text"
                        v-model="inputField1"
                        tooltipText="This is a tooltip!"
                        :status="formElementStatus" />

            <!-- begin inputfield in two columns -->
            <div class="flex-container-with-gap">
              <CmdFormElement labelText="Label for inputfield (with icon):"
                           element="input"
                           type="text"
                          id="inputfield2"
                          iconClass="icon-user-profile"
                          placeholder="Type in username"
                          tooltipText="This is a tooltip!"
                          :status="formElementStatus" />
              <CmdFormElement element="input"
                           labelText="Label for inputfield (with icon):"
                          type="password"
                          id="inputfield3"
                          iconClass="icon-security-settings"
                          placeholder="Type in password"
                          tooltipText="This is a tooltip!"
                          :status="formElementStatus" />
            </div>
            <!-- end inputfield in two columns -->
            <CmdFormElement element="input"
                         labelText="Label (inline) for inputfield (number):"
                         :displayinline="true"
                         type="number"
                         id="inputfield4"
                         autofocus="autofocus"
                         :status="formElementStatus" />

            <CmdFormElement element="input"
                         labelText="Label (inline) for inputfield (date):"
                         :displayinline="true"
                         type="date"
                         id="inputfield5"
                         autofocus="autofocus"
                         :status="formElementStatus" />

            <CmdFormElement element="input"
                         labelText="Label for checkbox with boolean"
                         type="checkbox"
                         id="inputfield6"
                         required="required"
                         v-model="checkboxStatus"
                         :status="formElementStatus" />
            <CmdFormElement element="input"
                         labelText="Label for checkbox with value"
                         v-model="checkboxValues"
                         inputValue="checkboxValue"
                         type="checkbox"
                         id="inputfield7"
                         required="required"
                         :status="formElementStatus" />
              <div class="input-wrapper">
                <CmdFormElement element="input"
                             labelText="Label for replaced checkbox"
                             type="checkbox"
                             htmlClass="replace-input-type"
                             id="inputfield8"
                             required="required"
                             v-model="replacedCheckboxStatus1"
                             :status="formElementStatus" />
                <CmdFormElement element="input"
                             labelText="Label for replaced checkbox"
                             v-model="replacedCheckboxStatus2"
                             inputValue="checkboxValue"
                             type="checkbox"
                             htmlClass="replace-input-type"
                             id="inputfield9"
                             required="required"
                             :status="formElementStatus" />
              </div>
            <div class="input-wrapper">
              <CmdFormElement element="input"
                           labelText="Label for native radiobutton"
                           type="radio"
                           id="inputfield10"
                           name="radiogroup"
                           inputValue="radiobuttonValue1"
                           v-model="radiobuttonStatus"
                           :status="formElementStatus" />
              <CmdFormElement element="input"
                           labelText="Label for native radiobutton"
                           type="radio"
                           id="inputfield11"
                           name="radiogroup"
                           inputValue="radiobuttonValue2"
                           v-model="radiobuttonStatus"
                           checked="checked"
                           :status="formElementStatus" />
            </div>

            <div class="input-wrapper">
              <CmdFormElement element="input"
                           labelText="Label for replaced radiobutton"
                           type="radio"
                           htmlClass="replace-input-type"
                           id="inputfield12"
                           name="replaced-radiogroup"
                           inputValue="radiobuttonValue1"
                           v-model="replacedRadiobuttonStatus"
                           :status="formElementStatus" />
              <CmdFormElement element="input"
                           labelText="Label for replaced radiobutton"
                           type="radio"
                           htmlClass="replace-input-type"
                           id="inputfield13"
                           name="replaced-radiogroup"
                           inputValue="radiobuttonValue2"
                           v-model="replacedRadiobuttonStatus"
                           checked="checked"
                           :status="formElementStatus" />
            </div>

            <CmdMultipleSwitch labelText="Label for multiple-switch with checkboxes:"
                            :multipleSwitches="multipleSwitchCheckboxData"
                            switchTypes="checkbox"
                            switchNames="checkboxgroup"
                            v-model="multipleSwitchCheckbox" />
            <dl>
              <dt>Selected value:</dt>
              <dd><output>{{ multipleSwitchCheckbox }}</output></dd>
            </dl>
            <CmdMultipleSwitch labelText="Label for multiple-switch with radiobuttons:"
                            :multipleSwitches="multipleSwitchRadioData"
                            switchTypes="radio"
                            switchNames="radiogroup"
                            v-model="multipleSwitchRadio" />
            <dl>
              <dt>Selected value:</dt>
              <dd><output>{{ multipleSwitchRadio }}</output></dd>
            </dl>
          </div><!-- end .fieldset -->
          <div class="button-wrapper">
            <small><sup>*</sup>values will not be submitted with the form!</small>
            <button type="submit" :disabled="formElementStatus === 'disabled'">Submit form</button>
          </div>
        </form>
     </CmdWidthLimitationWrapper>
    <!-- end advanced form elements ----------------------------------------------------------------------------------------------------------------------------------------------------->

    <CmdWidthLimitationWrapper>
        <h2 class="headline-demopage">Image-Gallery</h2>
        <CmdImageGallery :images="imageGalleryData"  />
    </CmdWidthLimitationWrapper>

    <CmdWidthLimitationWrapper>
        <a id="anchor-image-zoom"></a>
        <h2 class="headline-demopage">Image-Zoom</h2>
        <CmdImageZoom small-image-url="media/images/content-images/logo-business-edition-landscape.jpg" large-image-url="media/images/content-images/logo-business-edition-landscape-large.jpg" />
    </CmdWidthLimitationWrapper>

    <CmdWidthLimitationWrapper>
        <h2 class="headline-demopage">Main Navigation</h2>
        <CmdMainNavigation :stretchMainItems="false"
                        :persistOnMobile="false"
                        :navigationEntries="navigationData"
                        :closeOffcanvas="{'text': 'Close navigation', 'iconClass': 'icon-cancel'}"
        />
    </CmdWidthLimitationWrapper>

    <CmdWidthLimitationWrapper>
        <h2 class="headline-demopage">MultistepFormProgressBar</h2>
        <CmdMultistepFormProgressBar :multisteps="multistepsData" separatorIconClass="icon-single-arrow-right" @click="showPageMultistep = $event.index + 1" />
        <div>
          <p>Page {{ showPageMultistep }}</p>
        </div>
    </CmdWidthLimitationWrapper>

    <CmdWidthLimitationWrapper>
        <h2 class="headline-demopage">Pager</h2>
        <div>
          <p>Page {{ showPagePager }}</p>
        </div>
        <CmdPager
                :items="pagerData.length"
                :itemsPerPage="1"
                @click="showPagePager = $event"
                :showLinksAsButtons="true"
                :prevButton="{'iconClass': 'icon-single-arrow-left', 'buttonText': 'prev' }"
                :nextButton="{'iconClass': 'icon-single-arrow-right', 'buttonText': 'next' }"
        />
    </CmdWidthLimitationWrapper>

    <CmdWidthLimitationWrapper>
      <h2 class="headline-demopage">Share buttons</h2>
      <CmdShareButtons :share-buttons="shareButtonsData" />
    </CmdWidthLimitationWrapper>

    <CmdWidthLimitationWrapper>
        <h2 class="headline-demopage">Slideshow</h2>
        <CmdSlideshow :slideshow-items="slideshowData" :autoplay="true" />
    </CmdWidthLimitationWrapper>

    <CmdWidthLimitationWrapper>
        <h2 class="headline-demopage">System Message</h2>
        <CmdSystemMessage messageStatus="error" :fullWidth="true" systemMessage="This is an error message!" iconClass="icon-cancel">
          <ul>
            <li>Error #1</li>
            <li>Error #2</li>
            <li>Error #3</li>
          </ul>
        </CmdSystemMessage>
        <CmdSystemMessage messageStatus="warning" :fullWidth="true" systemMessage="This is a warning message!">
          <p>This is additional text!</p>
        </CmdSystemMessage>
        <CmdSystemMessage messageStatus="success" :fullWidth="true" systemMessage="This is a success message!" iconClass="icon-check">
          <p>This is additional text!</p>
        </CmdSystemMessage>
        <CmdSystemMessage messageStatus="information" :fullWidth="true" systemMessage="This is an information message!" iconClass="icon-info">
          <p>This is additional text!</p>
        </CmdSystemMessage>
    </CmdWidthLimitationWrapper>

    <CmdWidthLimitationWrapper>
        <h2 class="headline-demopage">Tables</h2>
        <CmdTableWrapper :collapsible="true" closeIconClass="icon-single-arrow-up" openIconClass="icon-single-arrow-down" />
     </CmdWidthLimitationWrapper>

    <CmdWidthLimitationWrapper>
        <h2 class="headline-demopage">Tabs</h2>
        <h3>Tabs with content from json-file</h3>
        <CmdTabs :stretchTabs="false" :tabs="tabsData" />
        <h3>Tabs with HTML-content from used component</h3>
        <CmdTabs :stretchTabs="true" :tabs="[{name: 'Tab 1'}, {name: 'Tab 2'}, {name: 'Tab 3'}]" :useComponent="true">
          <template v-slot:tab-content-0>
            <h3>Tab 1</h3>
            <p>Content</p>
          </template>
          <template v-slot:tab-content-1>
            <h3>Tab 2</h3>
            <p>Content</p>
            <p>Content</p>
          </template>
          <template v-slot:tab-content-2>
            <h3>Tab 3</h3>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
          </template>
        </CmdTabs>
    </CmdWidthLimitationWrapper>

    <CmdWidthLimitationWrapper>
        <h2 class="headline-demopage">Thumbnail-Scroller</h2>
        <CmdThumbnailScroller :thumbnail-scroller-items="thumbnailScrollerData" />
    </CmdWidthLimitationWrapper>

    <CmdWidthLimitationWrapper>
        <h2 class="headline-demopage">Cookie Disclaimer</h2>
        <a class="button" href="#" @click.prevent="fancyBoxCookieDisclaimer = true">Open Cookie Disclaimer</a>
    </CmdWidthLimitationWrapper>

    <CmdWidthLimitationWrapper id="site-footer" inner-component="footer">
        <CmdSwitchLanguage :languages="languagesData" @click="doSomething" />
        <CmdFooterNavigation :footerNavigation="footerNavigationData" headline="Links" />
        <CmdOpeningHours :openingHours="openingHoursData" :closed="true" headline="Opening hours" textOpenClosed="Closed right now!" textHolidaysClosed="Closed on holidays" textMiscInfo="Miscellaneous information" />
        <CmdAddressData :addressData="addressData" headline="Contact" />
    </CmdWidthLimitationWrapper>

    <CmdFancyBox :show="fancyBoxCookieDisclaimer" :fancyboxOptions="{}" :allowEscapeKey="false">
      <CmdCookieDisclaimer headline="Einsatz von Cookies"
                           :cookieOptions="cookieDisclaimerData"
                           buttonLabelAcceptAllCookies="Alle Cookies akzeptieren!"
                           buttonLabelAcceptCurrentSettings="Aktuelle Cookies übernehmen!"
                           @allCookies="fancyBoxCookieDisclaimer = false"
                           @currentSettings="fancyBoxCookieDisclaimer = false"
      >
        <template #privacy-text>
          <p>
            <strong>
              Durch die Nutzung der Website stimmen Sie der Verwendung und Speicherung anonymisierter Daten zu! <br>
              Für mehr Details lesen Sie bitte die <a href="#">Datenschutzerklärung</a>.
            </strong>
          </p>
        </template>
      </CmdCookieDisclaimer>
    </CmdFancyBox>
  </div><!-- end #app -->
</template>

<script>
    // import used example data
    import accordionData from '@/assets/data/accordion.json'
    import addressData from '@/assets/data/address.json'
    import boxUserData from '@/assets/data/box-user.json'
    import boxProductData from '@/assets/data/box-product.json'
    import breadcrumbData from '@/assets/data/breadcrumbs.json'
    import cookieDisclaimerData from '@/assets/data/cookie-disclaimer.json'
    import fakeSelectOptionsData from '@/assets/data/fake-select-options.json'
    import fakeSelectCountriesData from '@/assets/data/fake-select-countries.json'
    import footerNavigationData from '@/assets/data/footer-navigation.json'
    import fakeSelectColorsData from '@/assets/data/fake-select-colors.json'
    import imageGalleryData from '@/assets/data/image-gallery.json'
    import languagesData from '@/assets/data/languages.json'
    import multistepsData from '@/assets/data/multisteps.json'
    import multipleSwitchCheckboxData from '@/assets/data/multipleswitch-checkbox.json'
    import multipleSwitchRadioData from '@/assets/data/multipleswitch-radio.json'
    import navigationData from '@/assets/data/navigation.json'
    import openingHoursData from '@/assets/data/opening-hours.json'
    import pagerData from '@/assets/data/pager.json'
    import shareButtonsData from '@/assets/data/share-buttons.json'
    import slideshowData from '@/assets/data/slideshow.json'
    import tabsData from '@/assets/data/tabs.json'
    import thumbnailScrollerData from '@/assets/data/thumbnail-scroller.json'
    import topHeaderNavigationData from '@/assets/data/top-header-navigation.json'

    // import used components
    import CmdAccordion from '@/components/CmdAccordion.vue'
    import CmdAddressData from "@/components/CmdAddressData"
    import CmdBackToTopButton from '@/components/CmdBackToTopButton.vue'
    import CmdBoxContent from '@/components/CmdBoxContent.vue'
    import CmdBoxProduct from '@/components/CmdBoxProduct.vue'
    import CmdBreadcrumbs from "@/components/CmdBreadcrumbs.vue"
    import CmdBoxUser from '@/components/CmdBoxUser.vue'
    import CmdCookieDisclaimer from '@/components/CmdCookieDisclaimer.vue'
    import CmdFakeSelect from '@/components/CmdFakeSelect.vue'
    import CmdFancyBox from '@/components/CmdFancyBox.vue'
    import CmdFooterNavigation from '@/components/CmdFooterNavigation.vue'
    import CmdFormElement from '@/components/CmdFormElement.vue'
    import CmdFormFilters from '@/components/CmdFormFilters.vue'
    import CmdImageGallery from '@/components/CmdImageGallery.vue'
    import CmdImageZoom from '@/components/CmdImageZoom.vue'
    import CmdLogo from '@/components/CmdLogo.vue'
    import CmdMainNavigation from '@/components/CmdMainNavigation.vue'
    import CmdMultipleSwitch from '@/components/CmdMultipleSwitch.vue'
    import CmdMultistepFormProgressBar from '@/components/CmdMultistepFormProgressBar.vue'
    import CmdOpeningHours from "@/components/CmdOpeningHours"
    import CmdPager from '@/components/CmdPager.vue'
    import CmdProgressBar from '@/components/CmdProgressBar.vue'
    import CmdShareButtons from '@/components/CmdShareButtons.vue'
    import CmdSlideshow from '@/components/CmdSlideshow.vue'
    import CmdSwitchButton from '@/components/CmdSwitchButton.vue'
    import CmdSwitchLanguage from '@/components/CmdSwitchLanguage.vue'
    import CmdSystemMessage from '@/components/CmdSystemMessage.vue'
    import CmdTabs from '@/components/CmdTabs.vue'
    import CmdTableWrapper from '@/components/CmdTableWrapper.vue'
    import CmdThumbnailScroller from '@/components/CmdThumbnailScroller.vue'
    import CmdTopHeaderNavigation from '@/components/CmdTopHeaderNavigation.vue'
    import CmdWidthLimitationWrapper from "@/components/CmdWidthLimitationWrapper"
    import { openFancyBox } from "@/components/CmdFancyBox"

    export default {
      name: 'App',
      components: {
        CmdAccordion, // short form of 'CmdAccordion': CmdAccordion
        CmdAddressData,
        CmdBackToTopButton,
        CmdBoxContent,
        CmdBoxProduct,
        CmdBoxUser,
        CmdBreadcrumbs,
        CmdCookieDisclaimer,
        CmdFakeSelect,
        CmdFancyBox,
        CmdFooterNavigation,
        CmdFormFilters,
        CmdFormElement,
        CmdImageGallery,
        CmdImageZoom,
        CmdLogo,
        CmdMainNavigation,
        CmdMultistepFormProgressBar,
        CmdMultipleSwitch,
        CmdOpeningHours,
        CmdPager,
        CmdProgressBar,
        CmdShareButtons,
        CmdSlideshow,
        CmdSwitchButton,
        CmdSwitchLanguage,
        CmdSystemMessage,
        CmdTabs,
        CmdTableWrapper,
        CmdThumbnailScroller,
        CmdTopHeaderNavigation,
        CmdWidthLimitationWrapper
      },

      data () {
        return {
          showPageMultistep: 1,
          showPagePager: 1,
          selectedOptions: [],
          selectedCountry: 'de',
          selectedColor: '',
          rangeValue: 50,
          formElementStatus: '',
          switchButtonRadio: 'radio1',
          switchButtonCheckbox: ['checkbox1'],
          inputField1: '',
          checkboxStatus: true,
          replacedCheckboxStatus1: false,
          replacedCheckboxStatus2: false,
          checkboxValues: [],
          radiobuttonStatus: "radiobuttonValue1",
          replacedRadiobuttonStatus: "radiobuttonValue1",
          multipleSwitchCheckbox: ['b'],
          multipleSwitchRadio: 'c',
          fancyBoxCookieDisclaimer: false,

          // assign data from json files to data-properties
          accordionData,
          addressData,
          boxProductData,
          boxUserData,
          breadcrumbData,
          cookieDisclaimerData,
          fakeSelectOptionsData,
          fakeSelectCountriesData,
          fakeSelectColorsData,
          footerNavigationData,
          imageGalleryData,
          languagesData,
          multistepsData,
          multipleSwitchCheckboxData,
          multipleSwitchRadioData,
          navigationData,
          openingHoursData,
          pagerData,
          shareButtonsData,
          slideshowData,
          tabsData,
          thumbnailScrollerData,
          topHeaderNavigationData
        }
      },
      methods: {
        showFancyBox(type, content) {
          if(type === 'text') {
            openFancyBox({content: content})
          } else if(type === 'image') {
            openFancyBox({url: content})
          }
        },
        getOptionName (option) {
          for(let i = 0 ; i < this.fakeSelectOptionsData.length ; i++) {
            if (option === this.fakeSelectOptionsData[i].optionValue) {
              return this.fakeSelectOptionsData[i].optionName
            }
          }
          return null
        },
        doSomething (event) {
          event.preventDefault()
          alert("Language changed!")
        }
      }
    }
</script>