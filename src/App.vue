<template>
  <div id="app">
    <div class="section_wrapper">
      <section>
        <h2 class="headline_demopage">Accordion</h2>
        <h3>Single mode</h3>
        <Accordion :accordionData="accordionData.accordionData1" toggleMode="single" />
        <h3>Multiple mode</h3>
        <Accordion :accordionData="accordionData.accordionData2" toggleMode="multiple" />
      </section>
    </div>

    <BackToTop />

    <div class="section_wrapper">
      <section>
        <h2 class="headline_demopage">Fancybox</h2>
        <a href="#" @click.prevent="showFancyBox('text','Some text')">Open FancyBox with text</a>
        <a href="#" @click.prevent="showFancyBox('image', 'media/images/content_images/logo_business_edition_landscape.jpg')" title="Open FancyBox with large image">
            <img src="media/images/content_images/logo_business_edition_landscape.jpg" alt="Alternative text" />
        </a>
      </section>
    </div>

    <!-- begin advanced form elements --------------------------------------------------------------------------------------------------------------------------------------------------->
    <div class="section_wrapper">
      <section data-title="Section Title">
        <a id="anchor_advanced_form_elements"></a>
        <h2 class="headline_demopage">Advanced Form Elements</h2>
        <div class="flex-container">
          <ul class="list_status">
            <li>Form elements status:</li>
            <li><a href="#" @click.prevent="formElementStatus = ''" :class="{'active' : formElementStatus == ''}" id="status_default">Default</a></li>
            <li><a href="#" @click.prevent="formElementStatus = 'error'" :class="{'active' : formElementStatus == 'error'}" id="status_error">Error</a></li>
            <li><a href="#" @click.prevent="formElementStatus = 'disabled'" :class="{'active' : formElementStatus == 'disabled'}" id="status_disabled">Disabled</a></li>
          </ul>
        </div>
        <ul class="form-filters">
          <li v-if="selectedOptions.length > 1">
            <a href="#" @click.prevent="selectedOptions = []" class="delete_all_filters">
              <span class="icon-delete"></span><span>Alle Filter löschen</span>
            </a>
          </li>
          <li v-for="(option, index) in selectedOptions" :key="index">
            <a href="#" @click.prevent="selectedOptions.splice(index, 1)">
              <span class="icon-cancel"></span>
              <span>{{ getOptionName(option) }}</span>
            </a>
          </li>
        </ul>
        <form method="get" data-enable-ui-tooltip="true" novalidate="novalidate" id="advanced_form_elements">
          <div class="fieldset grid-container-create-columns">
            <h2>Fake Selects</h2>
            <div class="grid-container-create-columns" data-columns-large="4">
              <FakeSelect :status="formElementStatus" :selectData="fakeSelectOptionsData" v-model="selectedOptions" defaultOptionName="Filters:" type="filterList" />
              <FakeSelect :status="formElementStatus" defaultOptionName="HTML-Content:">
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
              <FakeSelect :status="formElementStatus" :selectData="fakeSelectCountriesData" v-model="selectedCountry" defaultOptionName="Select country:" type="country"  />
              <FakeSelect :status="formElementStatus" :selectData="fakeSelectColorsData" v-model="selectedColor" defaultOptionName="Select color:" type="color" />
            </div>
            <!-- Progress-bar -->
            <h2>Progress-bar [native]</h2>
            <label>
              <span>Progress-bar (with optional output):</span>
              <div class="input_wrapper progress_wrapper">
                <span class="value">{{ loadingStatus }}%</span>
                <progress class="progress_bar" max="100" :value="loadingStatus"></progress>
              </div>
            </label>

            <!-- Slider -->
            <h2>Slider [native]</h2>
            <label for="range_slider">
              <span>Single-Slider (with in- and output):</span>
              <div class="input_wrapper">
                <input type="number" data-for="range_slider" v-model="rangeValue" min="0" max="100" />
                <input type="range" class="range_slider" id="range_slider" v-model="rangeValue" min="0" max="100" />
              </div>
            </label>

            <hr />

            <!-- begin toggle-switch-radio with switch-label -->
            <h2>Toggle-Switches (Radio and Checkbox) with Switch-Label (colored)</h2>
            <label class="inline switch-label">
              <span>Label for Toggle-Switch-Checkbox with Switch-Label (colored):</span>
              <SwitchButton
                      type="checkbox"
                      id="checkbox1"
                      name="checkbox1"
                      onLabel="Label on"
                      offLabel="Label off"
                      :colored="true"
                      inputValue="checkbox1"
                      v-model="switchButtonCheckbox" />

              <SwitchButton
                      type="checkbox"
                      id="checkbox2"
                      name="checkbox2"
                      onLabel="Label on"
                      offLabel="Label off"
                      :colored="true"
                      inputValue="checkbox2"
                      v-model="switchButtonCheckbox" />
            </label>
            <!-- end toggle-switch-radio with switch-label -->

            <!-- begin toggle-switch-radio with switch-label (colored) -->
            <label class="inline switch-label">
              <span>Label for Toggle-Switch-Radio with Switch-Label (colored):</span>
              <SwitchButton
                      type="radio"
                      id="radio1"
                      name="radiogroup"
                      onLabel="Label on"
                      offLabel="Label off"
                      :colored="true"
                      inputValue="radio1"
                      v-model="switchButtonRadio" />

              <SwitchButton
                      type="radio"
                      id="radio2"
                      name="radiogroup"
                      onLabel="Label on"
                      offLabel="Label off"
                      :colored="true"
                      inputValue="radio2"
                      v-model="switchButtonRadio" />
            </label>
            <!-- end toggle-switch-radio with switch-label (colored) -->

            <h2>Inputfields in Columns</h2>
            <InputField labelText="Label for inputfield (with tooltip):"
                        type="text"
                        id="inputfield1"
                        autofocus="autofocus"
                        placeholder="This is placeholder text"
                        v-model="inputField1"
                        tooltipText="This is a tooltip!"
                        :status="formElementStatus" />

            <!-- begin inputfield in two columns -->
            <div class="grid-container-create-columns" data-columns-large="2">
              <InputField labelText="Label for inputfield (with icon):"
                          type="text"
                          id="inputfield2"
                          iconClass="icon-user_profile"
                          placeholder="Type in username"
                          tooltipText="This is a tooltip!"
                          :status="formElementStatus" />
              <InputField labelText="Label for inputfield (with icon):"
                          type="password"
                          id="inputfield3"
                          iconClass="icon-security_settings"
                          placeholder="Type in password"
                          tooltipText="This is a tooltip!"
                          :status="formElementStatus" />
            </div>
            <!-- end inputfield in two columns -->
            <InputField labelText="Label (inline) for inputfield (number):"
                        :displayinline="true"
                        type="number"
                        id="inputfield4"
                        autofocus="autofocus"
                        :status="formElementStatus" />

            <InputField labelText="Label (inline) for inputfield (date):"
                        :displayinline="true"
                        type="date"
                        id="inputfield5"
                        autofocus="autofocus"
                        :status="formElementStatus" />
          </div><!-- end .fieldset -->
          <div class="button_wrapper">
            <small>*values will not be submitted with the form!</small>
            <button type="submit">Submit form</button>
          </div>
        </form>
      </section>
    </div>
    <!-- end advanced form elements ----------------------------------------------------------------------------------------------------------------------------------------------------->

    <div class="section_wrapper">
      <a id="anchor_section6"></a>
      <section>
        <h2 class="headline_demopage">Image-Gallery</h2>
        <ImageGallery :images="imageGalleryData"  />
      </section>
    </div>

    <div class="section_wrapper">
      <a id="anchor_section7"></a>
      <section>
        <a id="anchor_image-zoom"></a>
        <h2 class="headline_demopage">Image-Zoom</h2>
        <ImageZoom small-image-url="media/images/content_images/logo_business_edition_landscape.jpg" large-image-url="media/images/content_images/logo_business_edition_landscape_large.jpg"/>
      </section>
    </div>

    <div class="section_wrapper">
      <section>
        <h2 class="headline_demopage">Main Navigation</h2>
        <MainNavigation :stretchMainItems="false" :persistOnMobile="false" :navigationEntries="navigationData" />
      </section>
    </div>

    <div class="section_wrapper">
      <section>
        <h2 class="headline_demopage">MultistepFormProgressBar</h2>
        <MultistepFormProgressBar :multisteps="multistepsData" @click="showPageMultistep = $event.index + 1" />
        <div>
          <p>Page {{ showPageMultistep }}</p>
        </div>
      </section>
    </div>

    <div class="section_wrapper">
      <a id="anchor_section10"></a>
      <section>
        <h2 class="headline_demopage">Pager</h2>
        <div>
          <p>Page {{ showPagePager }}</p>
        </div>
        <Pager :items="pagerData.length" :itemsPerPage="1" @click="showPagePager = $event" />
      </section>
    </div>

    <div class="section_wrapper">
      <section>
        <h2 class="headline_demopage">Slideshow</h2>
        <SlideshowWrapper :slideshow-items="slideshowData" />
      </section>
    </div>

    <div class="section_wrapper">
      <section>
        <h2 class="headline_demopage">System Message</h2>
        <SystemMessage messageStatus="error" :fullWidth="true" systemMessage="This is an error message!">
          <p>This is additional text!</p>
        </SystemMessage>
        <SystemMessage messageStatus="warning" :fullWidth="true" systemMessage="This is a warning message!">
          <p>This is additional text!</p>
        </SystemMessage>
        <SystemMessage messageStatus="success" :fullWidth="true" systemMessage="This is a success message!">
          <p>This is additional text!</p>
        </SystemMessage>
        <SystemMessage messageStatus="information" :fullWidth="true" systemMessage="This is a information message!">
          <p>This is additional text!</p>
        </SystemMessage>
      </section>
    </div>

    <div class="section_wrapper">
      <section>
        <h2 class="headline_demopage">Tables</h2>
        <TableWrapper :collapsible="true" />
      </section>
    </div>

    <div class="section_wrapper">
      <section>
        <h2 class="headline_demopage">Tabs</h2>
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

    <div class="section_wrapper">
      <section>
        <h2 class="headline_demopage">Thumbnail-Scroller</h2>
        <ThumbnailScroller :thumbnail-scroller-items="thumbnailScrollerData"  />
      </section>
    </div>
  </div>
</template>

<script>
    // import used example data
    import accordionData from '@/assets/pages/data/accordion_data.json'
    import fakeSelectOptionsData from '@/assets/pages/data/fake_select_options_data.json'
    import fakeSelectCountriesData from '@/assets/pages/data/fake_select_countries_data.json'
    import fakeSelectColorsData from '@/assets/pages/data/fake_select_colors_data.json'
    import imageGalleryData from '@/assets/pages/data/image_gallery_data.json'
    import multistepsData from '@/assets/pages/data/multisteps_data.json'
    import navigationData from '@/assets/pages/data/navigation_data.json'
    import pagerData from '@/assets/pages/data/pager_data.json'
    import slideshowData from '@/assets/pages/data/slideshow_data.json'
    import tabsData from '@/assets/pages/data/tabs_data.json'
    import thumbnailScrollerData from '@/assets/pages/data/thumbnail_scroller_data.json'

    // import used components
    import Accordion  from '@/components/Accordion.vue'
    import BackToTop  from '@/components/BackToTop.vue'
    import FakeSelect  from '@/components/FakeSelect.vue'
    import InputField  from '@/components/InputField.vue'
    import ImageGallery  from '@/components/ImageGallery.vue'
    import ImageZoom  from '@/components/ImageZoom.vue'
    import MainNavigation  from '@/components/MainNavigation.vue'
    import MultistepFormProgressBar  from '@/components/MultistepFormProgressBar.vue'
    import Pager  from '@/components/Pager.vue'
    import SlideshowWrapper  from '@/components/SlideshowWrapper.vue'
    import SwitchButton  from '@/components/SwitchButton.vue'
    import SystemMessage  from '@/components/SystemMessage.vue'
    import Tabs  from '@/components/Tabs.vue'
    import TableWrapper  from '@/components/TableWrapper.vue'
    import ThumbnailScroller  from '@/components/ThumbnailScroller.vue'
    import { openFancyBox } from "@/components/FancyBox"

    export default {
      name: 'App',
      components: {
        Accordion,
        BackToTop, // short form of 'BackToTop': BackToTop
        FakeSelect,
        //FancyBox,
        InputField,
        ImageGallery,
        ImageZoom,
        MainNavigation,
        MultistepFormProgressBar,
        Pager,
        SlideshowWrapper,
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
          loadingStatus: 50,
          rangeValue: 50,
          formElementStatus: '',
          switchButtonRadio: 'radio1',
          switchButtonCheckbox: ['checkbox1'],
          inputField1: '',

          // assign data from json files to data-properties
          accordionData,
          fakeSelectOptionsData,
          fakeSelectCountriesData,
          fakeSelectColorsData,
          imageGalleryData,
          multistepsData,
          navigationData,
          pagerData,
          slideshowData,
          tabsData,
          thumbnailScrollerData
        }
      },
      methods: {
        removeSelectOption(selectedOption) {
          console.log("sO:" + selectedOption);
          this.fakeSelectOptions = this.fakeSelectOptions.filter(v => v !== selectedOption);
        },
        showFancyBox(type, content) {
          if(type == 'text') {
            openFancyBox({content: content})
          } else if(type == 'image') {
            openFancyBox({url: content})
          }
        },

        getOptionName (option) {
          for(let i = 0 ; i < this.fakeSelectOptionsData.length ; i++) {
            if (option == this.fakeSelectOptionsData[i].optionValue) {
              return this.fakeSelectOptionsData[i].optionName
            }
          }
          return null
        }
      }
    }
</script>