<!--suppress HtmlUnknownTarget, NpmUsedModulesInstalled, JSUnresolvedVariable -->
<template>
  <div id="app">
    <div class="section-wrapper">
      <section>
        <h2 class="headline-demopage">Accordion</h2>
        <h3>Single mode</h3>
        <Accordion :accordionData="accordionData.accordionData1"
                   toggleMode="single"
                   tooltip="Click to toggle content"
                   openIconClass="icon-single_arrow_up"
                   closeIconClass="icon-single_arrow_down"
        />
        <h3>Multiple mode</h3>
        <Accordion :accordionData="accordionData.accordionData2"
                   toggleMode="multiple"
                   tooltip="Click to toggle content"
                   openIconClass="icon-single_arrow_up"
                   closeIconClass="icon-single_arrow_down"
        />
      </section>
    </div>

    <BackToTopButton href="#anchor-back-to-top" iconClass="icon-arrow_up" tooltip="Back to top" />

    <div class="section-wrapper">
      <section>
        <h2 class="headline-demopage">Boxes</h2>
        <h3>Content boxes</h3>
        <div class="grid-container-create-columns">
          <div class="grid-small-item">
            <BoxContent>
              <h3 slot="header">
                Box with text
              </h3>
              <p slot="body" class="padding">
                box body with paragraph
              </p>
              <p slot="footer">
                footer content
              </p>
            </BoxContent>
          </div>
          <div class="grid-small-item">
            <BoxContent>
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
            </BoxContent>
          </div>
          <div class="grid-small-item">
            <BoxContent>
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
            </BoxContent>
          </div>
          <div class="grid-small-item">
            <BoxContent>
              <h3 slot="header">
                Box with image
              </h3>
              <img src="media/images/content_images/logo_business_edition_landscape.jpg" alt="Alternative text" slot="body" />
              <p slot="footer">
                footer content
              </p>
            </BoxContent>
          </div>
        </div>
        <h3>User boxes</h3>
        <div class="grid-container-create-columns">
          <div class="grid-small-item" v-for="(user, index) in boxUserData" :key="index">
            <BoxUser :user="user" />
          </div>
        </div>
        <h3>Product boxes</h3>
        <div class="grid-container-create-columns">
          <div class="grid-small-item" v-for="(product, index) in boxProductData" :key="index">
            <BoxProduct :product="product" />
          </div>
        </div>
      </section>
    </div>

    <div class="section-wrapper">
      <section>
        <h2 class="headline-demopage">Fancybox</h2>
        <a href="#" @click.prevent="showFancyBox('text','Some text')">Open FancyBox with text</a>
        <a href="#" @click.prevent="showFancyBox('image', 'media/images/content_images/logo_business_edition_landscape.jpg')" title="Open FancyBox with large image">
            <img src="media/images/content_images/logo_business_edition_landscape.jpg" alt="Alternative text" />
        </a>
      </section>
    </div>

    <!-- begin advanced form elements --------------------------------------------------------------------------------------------------------------------------------------------------->
    <div class="section-wrapper">
      <section data-title="Section Title">
        <a id="anchor_advanced_form_elements"></a>
        <h2 class="headline-demopage">Advanced Form Elements</h2>
        <div class="flex-container">
          <ul class="list-status">
            <li>Form elements status:</li>
            <li><a href="#" @click.prevent="formElementStatus = ''" :class="{'active' : formElementStatus === ''}" id="status_default">Default</a></li>
            <li><a href="#" @click.prevent="formElementStatus = 'error'" :class="{'active' : formElementStatus === 'error'}" id="status_error">Error</a></li>
            <li><a href="#" @click.prevent="formElementStatus = 'disabled'" :class="{'active' : formElementStatus === 'disabled'}" id="status_disabled">Disabled</a></li>
          </ul>
        </div>

        <!-- begin formfilters -->
        <FormFilters :selectedOptions="selectedOptions"
                     :selectedOptionsName="getOptionName"
                     labelDeleteAllFilters="Alle Filter löschen"
                     iconClassDeleteAllFilters="icon-delete"
                     iconClassDeleteFilter="icon-cancel" />
        <!-- end formfilters -->

        <form method="get" novalidate="novalidate" id="advanced_form_elements">
          <div class="fieldset grid-container-create-columns">
            <h2>Fake Selects</h2>
            <div class="flex-container-with-gap">
              <FakeSelect :status="formElementStatus"
                          :selectData="fakeSelectOptionsData"
                          v-model="selectedOptions"
                          defaultOptionName="Filters:"
                          type="filterList"
                          iconClass="icon-single_arrow_down" />
              <FakeSelect :status="formElementStatus" defaultOptionName="HTML-Content:" iconClass="icon-single_arrow_down">
                <ul>
                  <li>
                    <div>
                      <h3>Headline</h3>
                      <p>Some content inside a paragraph</p>
                    </div>
                    <div>
                      <img src="images/thumbnail_scroller/thumbnail/logo_cmd_blue_landscape.jpg" alt="image" />
                    </div>
                  </li>
                </ul>
              </FakeSelect>
              <FakeSelect :status="formElementStatus"
                          :selectData="fakeSelectCountriesData"
                          v-model="selectedCountry"
                          defaultOptionName="Select country:"
                          type="country" iconClass="icon-single_arrow_down" />
              <FakeSelect :status="formElementStatus"
                          :selectData="fakeSelectColorsData"
                          v-model="selectedColor"
                          defaultOptionName="Select color:"
                          type="color"
                          iconClass="icon-single_arrow_down" />
            </div>

            <!-- begin progress bar -->
            <h2>Progress Bar [native]</h2>
            <ProgressBar labelText="Progress Bar (with optional output):" id="progress-bar2" max="100" />
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
            <label class="inline switch-button">
              <span>Label for Toggle-Switch-Checkbox with Switch-Button:</span>
              <SwitchButton
                      type="checkbox"
                      id="checkbox1"
                      name="checkbox1"
                      onLabel="Label on"
                      offLabel="Label off"
                      inputValue="checkbox1"
                      :disabled="formElementStatus === 'disabled'"
                      v-model="switchButtonCheckbox" />

              <SwitchButton
                      type="checkbox"
                      id="checkbox2"
                      name="checkbox2"
                      onLabel="Label on"
                      offLabel="Label off"
                      inputValue="checkbox2"
                      :disabled="formElementStatus === 'disabled'"
                      v-model="switchButtonCheckbox" />
            </label>
            <!-- end toggle-switch-radio with switch-button -->

            <label class="inline switch-button">
              <span>Label for Toggle-Switch-Checkbox with Switch-Button (colored):</span>
              <SwitchButton
                      type="checkbox"
                      id="checkbox3"
                      name="checkbox3"
                      onLabel="Label on"
                      offLabel="Label off"
                      :colored="true"
                      inputValue="checkbox3"
                      :disabled="formElementStatus === 'disabled'"
                      v-model="switchButtonCheckbox" />

              <SwitchButton
                      type="checkbox"
                      id="checkbox4"
                      name="checkbox4"
                      onLabel="Label on"
                      offLabel="Label off"
                      :colored="true"
                      inputValue="checkbox4"
                      :disabled="formElementStatus === 'disabled'"
                      v-model="switchButtonCheckbox" />
            </label>
            <!-- end toggle-switch-radio with switch-button -->

            <!-- begin toggle-switch-radio with switch-button (colored) -->
            <label class="inline switch-button">
              <span>Label for Toggle-Switch-Radio with switch-button (colored):</span>
              <SwitchButton
                      type="radio"
                      id="radio1"
                      name="radiogroup"
                      onLabel="Label on"
                      offLabel="Label off"
                      :colored="true"
                      inputValue="radio1"
                      :disabled="formElementStatus === 'disabled'"
                      v-model="switchButtonRadio" />

              <SwitchButton
                      type="radio"
                      id="radio2"
                      name="radiogroup"
                      onLabel="Label on"
                      offLabel="Label off"
                      :colored="true"
                      inputValue="radio2"
                      :disabled="formElementStatus === 'disabled'"
                      v-model="switchButtonRadio" />
            </label>
            <!-- end toggle-switch-radio with switch-button (colored) -->

            <h2>Inputfields in Columns</h2>
            <FormElement element="input"
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
              <FormElement labelText="Label for inputfield (with icon):"
                           element="input"
                           type="text"
                          id="inputfield2"
                          iconClass="icon-user_profile"
                          placeholder="Type in username"
                          tooltipText="This is a tooltip!"
                          :status="formElementStatus" />
              <FormElement element="input"
                           labelText="Label for inputfield (with icon):"
                          type="password"
                          id="inputfield3"
                          iconClass="icon-security_settings"
                          placeholder="Type in password"
                          tooltipText="This is a tooltip!"
                          :status="formElementStatus" />
            </div>
            <!-- end inputfield in two columns -->
            <FormElement element="input"
                         labelText="Label (inline) for inputfield (number):"
                         :displayinline="true"
                         type="number"
                         id="inputfield4"
                         autofocus="autofocus"
                         :status="formElementStatus" />

            <FormElement element="input"
                         labelText="Label (inline) for inputfield (date):"
                         :displayinline="true"
                         type="date"
                         id="inputfield5"
                         autofocus="autofocus"
                         :status="formElementStatus" />

            <FormElement  element="input"
                          labelText="Label for checkbox with boolean"
                          type="checkbox"
                          id="inputfield6"
                          required="required"
                          v-model="checkboxStatus"
                          :status="formElementStatus" />
            <FormElement  element="input"
                          labelText="Label for checkbox with value"
                          v-model="checkboxValues"
                          inputValue="checkboxValue"
                          type="checkbox"
                          id="inputfield7"
                          required="required"
                          :status="formElementStatus" />
              <div class="input-wrapper">
                <FormElement  element="input"
                              labelText="Label for replaced checkbox"
                              type="checkbox"
                              htmlClass="replace-input-type"
                              id="inputfield8"
                              required="required"
                              v-model="replacedCheckboxStatus1"
                              :status="formElementStatus" />
                <FormElement  element="input"
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
              <FormElement  element="input"
                            labelText="Label for native radiobutton"
                            type="radio"
                            id="inputfield10"
                            name="radiogroup"
                            inputValue="radiobuttonValue1"
                            v-model="radiobuttonStatus"
                            :status="formElementStatus" />
              <FormElement  element="input"
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
              <FormElement  element="input"
                            labelText="Label for replaced radiobutton"
                            type="radio"
                            htmlClass="replace-input-type"
                            id="inputfield12"
                            name="replaced-radiogroup"
                            inputValue="radiobuttonValue1"
                            v-model="replacedRadiobuttonStatus"
                            :status="formElementStatus" />
              <FormElement  element="input"
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

            <MultipleSwitch labelText="Label for multiple-switch with checkboxes:" :multipleSwitches="multipleSwitchCheckboxData" switchTypes="checkbox" switchNames="checkboxgroup" />
            <MultipleSwitch labelText="Label for multiple-switch with radiobuttons:" :multipleSwitches="multipleSwitchRadioData" switchTypes="radio" switchNames="radiogroup" />
          </div><!-- end .fieldset -->
          <div class="button-wrapper">
            <small><sup>*</sup>values will not be submitted with the form!</small>
            <button type="submit" :disabled="formElementStatus === 'disabled'">Submit form</button>
          </div>
        </form>
      </section>
    </div>
    <!-- end advanced form elements ----------------------------------------------------------------------------------------------------------------------------------------------------->

    <div class="section-wrapper">
      <a id="anchor-section6"></a>
      <section>
        <h2 class="headline-demopage">Image-Gallery</h2>
        <ImageGallery :images="imageGalleryData"  />
      </section>
    </div>

    <div class="section-wrapper">
      <a id="anchor-section7"></a>
      <section>
        <a id="anchor_image-zoom"></a>
        <h2 class="headline-demopage">Image-Zoom</h2>
        <ImageZoom small-image-url="media/images/content_images/logo_business_edition_landscape.jpg" large-image-url="media/images/content_images/logo_business_edition_landscape_large.jpg"/>
      </section>
    </div>

    <div class="section-wrapper">
      <section>
        <h2 class="headline-demopage">Main Navigation</h2>
        <MainNavigation :stretchMainItems="false"
                        :persistOnMobile="false"
                        :navigationEntries="navigationData"
                        :closeOffcanvas="{'text': 'Close navigation', 'iconClass': 'icon-cancel'}"
        />
      </section>
    </div>

    <div class="section-wrapper">
      <section>
        <h2 class="headline-demopage">MultistepFormProgressBar</h2>
        <MultistepFormProgressBar :multisteps="multistepsData" separatorIconClass="icon-single_arrow_right" @click="showPageMultistep = $event.index + 1" />
        <div>
          <p>Page {{ showPageMultistep }}</p>
        </div>
      </section>
    </div>

    <div class="section-wrapper">
      <a id="anchor-section10"></a>
      <section>
        <h2 class="headline-demopage">Pager</h2>
        <div>
          <p>Page {{ showPagePager }}</p>
        </div>
        <Pager
                :items="pagerData.length"
                :itemsPerPage="1"
                @click="showPagePager = $event"
                :showLinksAsButtons="true"
                :prevButton="{'iconClass': 'icon-single_arrow_left', 'buttonText': 'prev' }"
                :nextButton="{'iconClass': 'icon-single_arrow_right', 'buttonText': 'next' }"
        />
      </section>
    </div>

    <div class="section-wrapper">
      <section>
        <h2 class="headline-demopage">Slideshow</h2>
        <Slideshow :slideshow-items="slideshowData" />
      </section>
    </div>

    <div class="section-wrapper">
      <section>
        <h2 class="headline-demopage">System Message</h2>
        <SystemMessage messageStatus="error" :fullWidth="true" systemMessage="This is an error message!">
          <ul>
            <li>Error #1</li>
            <li>Error #2</li>
            <li>Error #3</li>
          </ul>
        </SystemMessage>
        <SystemMessage messageStatus="warning" :fullWidth="true" systemMessage="This is a warning message!">
          <p>This is additional text!</p>
        </SystemMessage>
        <SystemMessage messageStatus="success" :fullWidth="true" systemMessage="This is a success message!">
          <p>This is additional text!</p>
        </SystemMessage>
        <SystemMessage messageStatus="information" :fullWidth="true" systemMessage="This is an information message!">
          <p>This is additional text!</p>
        </SystemMessage>
      </section>
    </div>

    <div class="section-wrapper">
      <section>
        <h2 class="headline-demopage">Tables</h2>
        <TableWrapper :collapsible="true" closeIconClass="icon-single_arrow_up" openIconClass="icon-single_arrow_down" />
      </section>
    </div>

    <div class="section-wrapper">
      <section>
        <h2 class="headline-demopage">Tabs</h2>
        <h3>Tabs with content from json-file</h3>
        <Tabs :stretchTabs="false" :tabs="tabsData" />
        <h3>Tabs with HTML-content from used component</h3>
        <Tabs :stretchTabs="true" :tabs="[{name: 'Tab 1'}, {name: 'Tab 2'}, {name: 'Tab 3'}]" :useComponent="true">
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
        </Tabs>
      </section>
    </div>

    <div class="section-wrapper">
      <section>
        <h2 class="headline-demopage">Thumbnail-Scroller</h2>
        <ThumbnailScroller :thumbnail-scroller-items="thumbnailScrollerData"  />
      </section>
    </div>
  </div>
</template>

<script>
    // import used example data
    import accordionData from '@/assets/pages/data/accordion_data.json'
    import boxUserData from '@/assets/pages/data/box_user_data.json'
    import boxProductData from '@/assets/pages/data/box_product_data.json'
    import fakeSelectOptionsData from '@/assets/pages/data/fake_select_options_data.json'
    import fakeSelectCountriesData from '@/assets/pages/data/fake_select_countries_data.json'
    import fakeSelectColorsData from '@/assets/pages/data/fake_select_colors_data.json'
    import imageGalleryData from '@/assets/pages/data/image_gallery_data.json'
    import multistepsData from '@/assets/pages/data/multisteps_data.json'
    import multipleSwitchCheckboxData from '@/assets/pages/data/multipleswitch_checkbox_data.json'
    import multipleSwitchRadioData from '@/assets/pages/data/multipleswitch_radio_data.json'
    import navigationData from '@/assets/pages/data/navigation_data.json'
    import pagerData from '@/assets/pages/data/pager_data.json'
    import slideshowData from '@/assets/pages/data/slideshow_data.json'
    import tabsData from '@/assets/pages/data/tabs_data.json'
    import thumbnailScrollerData from '@/assets/pages/data/thumbnail_scroller_data.json'

    // import used components
    import Accordion from '@/components/Accordion.vue'
    import BackToTopButton from '@/components/BackToTopButton.vue'
    import BoxContent from '@/components/BoxContent.vue'
    import BoxProduct from '@/components/BoxProduct.vue'
    import BoxUser from '@/components/BoxUser.vue'
    import FakeSelect from '@/components/FakeSelect.vue'
    import FormFilters from '@/components/FormFilters.vue'
    import FormElement from '@/components/FormElement.vue'
    import ImageGallery from '@/components/ImageGallery.vue'
    import ImageZoom from '@/components/ImageZoom.vue'
    import MainNavigation from '@/components/MainNavigation.vue'
    import MultistepFormProgressBar from '@/components/MultistepFormProgressBar.vue'
    import MultipleSwitch from '@/components/MultipleSwitch.vue'
    import Pager from '@/components/Pager.vue'
    import ProgressBar from '@/components/ProgressBar.vue'
    import Slideshow from '@/components/Slideshow.vue'
    import SwitchButton from '@/components/SwitchButton.vue'
    import SystemMessage from '@/components/SystemMessage.vue'
    import Tabs from '@/components/Tabs.vue'
    import TableWrapper from '@/components/TableWrapper.vue'
    import ThumbnailScroller from '@/components/ThumbnailScroller.vue'
    import { openFancyBox } from "@/components/FancyBox"

    export default {
      name: 'App',
      components: {
        Accordion,
        BackToTopButton, // short form of 'BackToTop': BackToTop
        BoxContent,
        BoxProduct,
        BoxUser,
        FakeSelect,
        FormFilters,
        FormElement,
        ImageGallery,
        ImageZoom,
        MainNavigation,
        MultistepFormProgressBar,
        MultipleSwitch,
        Pager,
        ProgressBar,
        Slideshow,
        SwitchButton,
        SystemMessage,
        Tabs,
        TableWrapper,
        ThumbnailScroller
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

          // assign data from json files to data-properties
          accordionData,
          boxProductData,
          boxUserData,
          fakeSelectOptionsData,
          fakeSelectCountriesData,
          fakeSelectColorsData,
          imageGalleryData,
          multistepsData,
          multipleSwitchCheckboxData,
          multipleSwitchRadioData,
          navigationData,
          pagerData,
          slideshowData,
          tabsData,
          thumbnailScrollerData
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
        }
      }
    }
</script>