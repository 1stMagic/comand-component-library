<!--suppress HtmlUnknownTarget, NpmUsedModulesInstalled, JSUnresolvedVariable -->
<template>
  <a id="anchor-back-to-top"></a>
  <CmdSiteHeader :mainNavigationEntries="navigationData" :sticky="true">
    <template v-slot:top-header>
      <CmdTopHeaderNavigation :topHeaderNavigationData="topHeaderNavigationData" v-if="topHeaderNavigationData"/>
    </template>
    <template v-slot:logo>
      <CmdCompanyLogo :link="companyLogoData.link" altText="CoManD Logo" :pathDefaultLogo="require('@/assets/images/logo.svg')"
               :pathDarkmodeLogo="require('@/assets/images/logo-darkmode.svg')"/>
    </template>
  </CmdSiteHeader>
  <main>
    <CmdWidthLimitationWrapper>
      <div class="flex-container">
        <ul>
          <li><a href="#section-accordion">Accordion</a></li>
          <li><a href="#section-advanced-form-elements">Advanced Form Elements</a></li>
          <li><a href="#section-boxes">Boxes</a></li>
          <li><a href="#section-breadcrumbs">Breadcrumbs</a></li>
          <li><a href="#section-cookie-disclaimer">Cookie-Disclaimer</a></li>
        </ul>
        <ul>
          <li><a href="#section-fancybox">Fancybox</a></li>
          <li><a href="#section-google-maps-integration">Google-Maps&trade;-Integration</a></li>
          <li><a href="#section-image-gallery">Image Gallery</a></li>
          <li><a href="#section-image-zoom">Image-Zoom</a></li>
          <li><a href="#section-main-navigation">Main-Navigation</a></li>
        </ul>
        <ul>
          <li><a href="#section-multistep-form-progress-bar">Multistepform-Progressbar</a></li>
          <li><a href="#section-pager">Pager</a></li>
          <li><a href="#section-share-buttons">Share Buttons</a></li>
          <li><a href="#section-slideshow">Slideshow</a></li>
          <li><a href="#section-system-message">System-Message</a></li>
        </ul>
        <ul>
          <li><a href="#section-tables">Tables</a></li>
          <li><a href="#section-tabs">Tabs</a></li>
          <li><a href="#section-thumbnail-scroller">Thumbnail-Scroller</a></li>
          <li><a href="#section-upload-form">Upload-Form</a></li>
        </ul>
      </div>
      <hr/>
    </CmdWidthLimitationWrapper>

    <a id="section-accordion"></a>
    <CmdWidthLimitationWrapper>
      <h2 class="headline-demopage">Accordion</h2>
      <h3>Single mode (only one can be opened)</h3>
        <a href="#" @click.prevent="toggleAllAccordions()">Toggle all accordions</a>
      <CmdAccordion :accordionData="accordionData.accordionData1"
                    toggleMode="single"
                    tooltip="Click to toggle content"
                    openIconClass="icon-single-arrow-up"
                    closeIconClass="icon-single-arrow-down"
                    ref="accordionGroup1"
      />
      <h3>Multiple mode (all can be opened)</h3>
      <CmdAccordion :accordionData="accordionData.accordionData2"
                    toggleMode="multiple"
                    tooltip="Click to toggle content"
                    openIconClass="icon-single-arrow-up"
                    closeIconClass="icon-single-arrow-down"
                    ref="accordionGroup2"
      />
      <h3>Customized headline-level (without transition of content)</h3>
      <CmdAccordion :accordionData="accordionData.accordionData2"
                    toggleMode="multiple"
                    tooltip="Click to toggle content"
                    openIconClass="icon-single-arrow-up"
                    closeIconClass="icon-single-arrow-down"
                    accordion-headline-level="h4"
                    :use-transition="false"
      />
      <h3>Data given by slots</h3>
      <CmdAccordion :accordionData="1">
        <template v-slot:accordionHeadline0>
          <h3><span class="icon-user-group"></span><span>User groups</span></h3>
        </template>
        <template v-slot:accordionContent0>
          <p>
            Content
          </p>
        </template>
      </CmdAccordion>
        <CmdAccordion :accordionData="1" :useCustomHeader="true">
            <template v-slot:customHeadline0>
                <h4>Some headline</h4>
            </template>
            <template v-slot:accordionContent0>
                <p>
                    Content
                </p>
            </template>
        </CmdAccordion>
    </CmdWidthLimitationWrapper>

    <!-- begin advanced form elements --------------------------------------------------------------------------------------------------------------------------------------------------->
    <a id="section-advanced-form-elements"></a>
    <CmdWidthLimitationWrapper>
      <a id="anchor-advanced-form-elements"></a>
      <h2 class="headline-demopage">Advanced Form Elements</h2>
      <h3>Form elements status:</h3>
      <div class="flex-container">
        <ul class="list-status">
          <li><a href="#" @click.prevent="formElementStatus = ''" :class="{'active' : formElementStatus === ''}"
                 id="status-default">Default</a></li>
          <li><a href="#" @click.prevent="formElementStatus = 'error'"
                 :class="{'active' : formElementStatus === 'error'}" id="status-error">Error</a></li>
          <li><a href="#" @click.prevent="formElementStatus = 'disabled'"
                 :class="{'active' : formElementStatus === 'disabled'}" id="status-disabled">Disabled</a></li>
        </ul>
      </div>

      <!-- begin formfilters -->
      <CmdFormFilters v-model:selectedOptions="selectedOptions"
                      :selectedOptionsName="getOptionName"
                      labelDeleteAllFilters="Delete all filters"
                      iconClassDeleteAllFilters="icon-delete"
                      iconClassDeleteFilter="icon-cancel"
      />
      <!-- end formfilters -->

      <form method="get" novalidate="novalidate" id="advanced-form-elements">
        <fieldset class="grid-container-create-columns">
          <legend>Legend</legend>
          <h2>Form Element-Component</h2>
          <div class="flex-container">
            <CmdFormElement labelText="Input (type text):"
                            element="input"
                            type="text"
                            :status="formElementStatus"
                            placeholder="Type in text"
                            tooltipText="This is a tooltip"
            />
            <CmdFormElement labelText="Input for selectbox:"
                            element="select"
                            :status="formElementStatus"
                            v-model:value="selectedOption"
                            :selectOptions="selectOptions"
            />
            <CmdFormElement labelText="Input for datalist:"
                            element="input"
                            type="text"
                            :status="formElementStatus"
                            placeholder="Type in option"
                            :datalist="datalist"
                            tooltipText="This is a tooltip"
            />
          </div>
          <h2>Fake Selects</h2>
          <div class="flex-container">
            <CmdFakeSelect :status="formElementStatus"
                           :selectData="fakeSelectOptionsData"
                           v-model:value="selectedOptions"
                           defaultOptionName="Filters:"
                           type="filterList"
                           iconClass="icon-single-arrow-down"
            />
            <CmdFakeSelect :status="formElementStatus"
                           defaultOptionName="HTML-Content:"
                           iconClass="icon-single-arrow-down">
              <ul class="custom-fake-select-content">
                <li>
                  <div>
                    <h3>Headline</h3>
                    <p>Some content inside a paragraph</p>
                  </div>
                  <img src="media/images/thumbnail-scroller/thumbnail/logo-cmd-blue-landscape.jpg" alt="image"/>
                </li>
              </ul>
            </CmdFakeSelect>
            <CmdFakeSelect :status="formElementStatus"
                           :selectData="fakeSelectCountriesData"
                           v-model:value="selectedCountry"
                           defaultOptionName="Select country:"
                           type="country" iconClass="icon-single-arrow-down"
            />
            <CmdFakeSelect :status="formElementStatus"
                           :selectData="fakeSelectColorsData"
                           v-model:value="selectedColor"
                           defaultOptionName="Select color:"
                           type="color"
                           iconClass="icon-single-arrow-down"
            />
          </div>

          <!-- begin progress bar -->
          <h2>Progress Bar [native]</h2>
          <CmdProgressBar labelText="Progress Bar (with optional output):" id="progress-bar2" max="100"/>
          <!-- end progress bar -->

          <!-- begin slider -->
          <h2>Slider [native]</h2>
          <label for="range-slider" :class="formElementStatus">
            <span>Single-Slider (with in- and output):</span>
            <span class="flex-container no-flex">
                  <input type="number" :class="formElementStatus" v-model="rangeValue"
                         :disabled="formElementStatus === 'disabled'" min="0" max="100"/>
                  <input type="range"
                         class="range-slider"
                         :class="{'disabled': formElementStatus === 'disabled'}"
                         id="range-slider"
                         v-model="rangeValue"
                         :disabled="formElementStatus === 'disabled'"
                         min="0"
                         max="100"/>
                </span>
          </label>
          <!-- end slider -->

          <hr/>

          <!-- begin toggle-switch-radio with switch-label -->
          <h2>Toggle-Switches (Radio and Checkbox) with Switch-Label</h2>
          <div class="label inline">
            <span>Label for Toggle-Switch-Checkbox with Switch-Label:</span>
            <span class="flex-container no-flex">
                  <CmdSwitchButton
                      type="checkbox"
                      id="checkbox1"
                      name="checkbox1"
                      onLabel="Label on"
                      offLabel="Label off"
                      inputValue="checkbox1"
                      :disabled="formElementStatus === 'disabled'"
                      v-model:value="switchButtonCheckbox"/>
                  <CmdSwitchButton
                      type="checkbox"
                      id="checkbox2"
                      name="checkbox2"
                      onLabel="Label on"
                      offLabel="Label off"
                      labelText="Labeltext"
                      inputValue="checkbox2"
                      :disabled="formElementStatus === 'disabled'"
                      v-model:value="switchButtonCheckbox"/>
                    <CmdSwitchButton
                        type="checkbox"
                        id="checkbox30"
                        name="checkbox30"
                        inputValue="checkbox30"
                        labelText="Labeltext"
                        :disabled="formElementStatus === 'disabled'"
                        v-model:value="switchButtonCheckbox"/>
                </span>
          </div>
          <!-- end toggle-switch-radio with switch-label -->

          <div class="label inline">
            <span>Label for Toggle-Switch-Checkbox with Switch-Label (colored):</span>
            <span class="flex-container no-flex">
                  <CmdSwitchButton
                      type="checkbox"
                      id="checkbox3"
                      name="checkbox3"
                      onLabel="Label on"
                      offLabel="Label off"
                      :colored="true"
                      inputValue="checkbox3"
                      :disabled="formElementStatus === 'disabled'"
                      v-model:value="switchButtonCheckbox"/>
                  <CmdSwitchButton
                      type="checkbox"
                      id="checkbox4"
                      name="checkbox4"
                      onLabel="Label on"
                      offLabel="Label off"
                      :colored="true"
                      inputValue="checkbox4"
                      :disabled="formElementStatus === 'disabled'"
                      v-model:value="switchButtonCheckbox"/>
                </span>
          </div>
          <!-- end toggle-switch-radio with switch-label -->

          <!-- begin toggle-switch-radio with switch-label (colored) -->
          <div class="label inline">
            <span>Label for Toggle-Switch-Radio with Switch-Label (colored):</span>
            <span class="flex-container no-flex">
                  <CmdSwitchButton
                      type="radio"
                      id="radio1"
                      name="radiogroup"
                      onLabel="Label on"
                      offLabel="Label off"
                      :colored="true"
                      inputValue="radio1"
                      :disabled="formElementStatus === 'disabled'"
                      v-model:value="switchButtonRadio"/>
                  <CmdSwitchButton
                      type="radio"
                      id="radio2"
                      name="radiogroup"
                      onLabel="Label on"
                      offLabel="Label off"
                      :colored="true"
                      inputValue="radio2"
                      :disabled="formElementStatus === 'disabled'"
                      v-model:value="switchButtonRadio"/>
                </span>
          </div>
          <!-- end toggle-switch-radio with switch-label (colored) -->

          <h2>Inputfields in Columns</h2>
          <CmdFormElement element="input"
                          required="required"
                          labelText="Label for inputfield (with tooltip):"
                          type="text"
                          id="inputfield1"
                          autofocus="autofocus"
                          placeholder="This is placeholder text"
                          v-model:value="inputField1"
                          tooltipText="This is a tooltip!"
                          :status="formElementStatus" />

          <!-- begin inputfield in two columns -->
          <div class="flex-container">
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
                            :status="formElementStatus"/>
          </div>
          <!-- end inputfield in two columns -->

          <CmdFormElement element="input"
                          labelText="Label (inline) for inputfield (number):"
                          :displayinline="true"
                          type="number"
                          id="inputfield4"
                          autofocus="autofocus"
                          :status="formElementStatus"/>
          <CmdFormElement element="input"
                          labelText="Label (inline) for inputfield (date):"
                          :displayinline="true"
                          type="date"
                          id="inputfield5"
                          autofocus="autofocus"
                          :status="formElementStatus"/>
          <CmdFormElement element="input"
                          labelText="Label (inline) for inputfield (search):"
                          :displayinline="true"
                          type="search"
                          id="inputfield6"
                          placeholder="Keyword(s)"
                          :status="formElementStatus"/>
          <div class="label inline">
            <span>Label for native checkboxes:</span>
            <div class="flex-container no-flex">
              <CmdFormElement element="input"
                              labelText="Label for checkbox with boolean"
                              type="checkbox"
                              id="inputfield7"
                              v-model:value="checkboxStatus"
                              :status="formElementStatus"/>
              <CmdFormElement element="input"
                              labelText="Label for checkbox with value"
                              v-model:value="checkboxValues"
                              inputValue="checkboxValue"
                              type="checkbox"
                              id="inputfield8"
                              :status="formElementStatus"/>
            </div>
          </div>
          <div class="label inline">
            <span>Label for Replaced Input-Type-Checkbox:</span>
            <div class="flex-container no-flex">
              <CmdFormElement element="input"
                              labelText="Label for replaced checkbox"
                              type="checkbox"
                              class="replace-input-type"
                              id="inputfield9"
                              v-model:value="replacedCheckboxStatus1"
                              :status="formElementStatus"/>
              <CmdFormElement element="input"
                              labelText="Label for replaced checkbox"
                              v-model:value="replacedCheckboxStatus2"
                              inputValue="checkboxValue"
                              type="checkbox"
                              class="replace-input-type"
                              id="inputfield10"
                              :status="formElementStatus"/>
            </div>
          </div>
          <div class="label inline">
            <span>Label for native radiobuttons:</span>
            <div class="flex-container no-flex">
              <CmdFormElement element="input"
                              labelText="Label for native radiobutton"
                              type="radio"
                              id="inputfield11"
                              name="radiogroup"
                              inputValue="radiobuttonValue1"
                              v-model:value="radiobuttonStatus"
                              :status="formElementStatus"/>
              <CmdFormElement element="input"
                              labelText="Label for native radiobutton"
                              type="radio"
                              id="inputfield12"
                              name="radiogroup"
                              inputValue="radiobuttonValue2"
                              v-model:value="radiobuttonStatus"
                              checked="checked"
                              :status="formElementStatus"/>
            </div>
          </div>
          <div class="label inline">
            <span>Label for Replaced Input-Type-Radio:</span>
            <div class="flex-container no-flex">
              <CmdFormElement element="input"
                              labelText="Label for replaced radiobutton"
                              type="radio"
                              class="replace-input-type"
                              id="inputfield13"
                              name="replaced-radiogroup"
                              inputValue="radiobuttonValue1"
                              v-model:value="replacedRadiobuttonStatus"
                              :status="formElementStatus"/>
              <CmdFormElement element="input"
                              labelText="Label for replaced radiobutton"
                              type="radio"
                              class="replace-input-type"
                              id="inputfield14"
                              name="replaced-radiogroup"
                              inputValue="radiobuttonValue2"
                              v-model:value="replacedRadiobuttonStatus"
                              checked="checked"
                              :status="formElementStatus"/>
            </div>
          </div>
          <CmdMultipleSwitch labelText="Label for multiple-switch with checkboxes:"
                             :multipleSwitches="multipleSwitchCheckboxData"
                             switchTypes="checkbox"
                             switchNames="checkboxgroup"
                             :status="formElementStatus"
                             v-model:value="multipleSwitchCheckbox"/>
          <dl>
            <dt>Selected value:</dt>
            <dd>
              <output>{{ multipleSwitchCheckbox }}</output>
            </dd>
          </dl>
          <CmdMultipleSwitch labelText="Label for multiple-switch with radiobuttons:"
                             :multipleSwitches="multipleSwitchRadioData"
                             switchTypes="radio"
                             switchNames="radiogroup"
                             :status="formElementStatus"
                             v-model:value="multipleSwitchRadio"/>
          <dl>
            <dt>Selected value:</dt>
            <dd>
              <output>{{ multipleSwitchRadio }}</output>
            </dd>
          </dl>
        </fieldset><!-- end fieldset -->
        <div class="button-wrapper">
          <small><sup>*</sup>values will not be submitted with the form!</small>
          <CmdFormElement element="button"
                          buttonText="Submit form"
                          type="button"
                          id="submitbutton"
                          name="submitbutton"
                          :status="formElementStatus"/>
          <button type="submit" :disabled="formElementStatus === 'disabled'"><span class="icon-check"></span><span>Submit form</span>
          </button>
        </div>
      </form>
    </CmdWidthLimitationWrapper>
    <!-- end advanced form elements ----------------------------------------------------------------------------------------------------------------------------------------------------->

    <CmdBackToTopButton />

    <a id="section-boxes"></a>
    <CmdWidthLimitationWrapper>
      <h2 class="headline-demopage">Boxes</h2>
      <h3>Content boxes</h3>
      <div class="grid-container-create-columns">
        <div class="grid-small-item">
          <CmdBox>
            <template v-slot:header>
              <h3>
                Box with text
              </h3>
            </template>
            <template v-slot:body>
              <p class="padding">
                box body with paragraph
              </p>
            </template>
            <template v-slot:footer>
              <p>
                footer content
              </p>
            </template>
          </CmdBox>
        </div>
        <div class="grid-small-item">
          <CmdBox>
            <template v-slot:header>
              <h3>
                Box with links
              </h3>
            </template>
            <template v-slot:body>
              <ul class="navigation">
                <li><a href="#" @click.prevent="">Link name 1</a></li>
                <li><a href="#" @click.prevent="">Link name 2</a></li>
                <li><a href="#" @click.prevent="">Link name 3</a></li>
                <li><a href="#" @click.prevent="">Link name 4</a></li>
              </ul>
            </template>
            <template v-slot:footer>
              <p>
                footer content
              </p>
            </template>
          </CmdBox>
        </div>
        <div class="grid-small-item">
          <CmdBox>
            <template v-slot:header>
              <h3>
                Box with image
              </h3>
            </template>
            <template v-slot:body>
              <img src="media/images/content-images/logo-business-edition-landscape.jpg" alt="Alternative text"/>
            </template>
            <template v-slot:footer>
              <p>
                footer content
              </p>
            </template>
          </CmdBox>
        </div>
        <div class="grid-small-item">
          <CmdBox>
            <template v-slot:header>
              <h3>
                Box with image and content
              </h3>
            </template>
            <template v-slot:body>
              <img src="media/images/content-images/logo-business-edition-landscape.jpg" alt="Alternative text"/>
              <div class="default-padding">
                <h4>Headline</h4>
                <p>This some text i.e a short-text for news.</p>
              </div>
            </template>
            <template v-slot:footer>
              <p>
                <a href="#">Mehr erfahren&hellip;</a>
              </p>
            </template>
          </CmdBox>
        </div>
      </div>
      <h3>Product boxes</h3>
      <div class="grid-container-create-columns">
        <div class="grid-small-item" v-for="(product, index) in boxProductData" :key="index">
          <CmdBox boxType="product" :product="product" />
        </div>
      </div>
      <h3>User boxes</h3>
      <div class="grid-container-create-columns">
        <div class="grid-small-item" v-for="(user, index) in boxUserData" :key="index">
          <CmdBox boxType="user" :user="user" />
        </div>
      </div>
      <h3>Box Site Search</h3>
      <CmdBoxSiteSearch :results="executeSearch()" @click="executeSearch($event)"/>
    </CmdWidthLimitationWrapper>

    <a id="section-breadcrumbs"></a>
    <CmdWidthLimitationWrapper inner-component="div">
      <h2 class="headline-demopage">Breadcrumbs</h2>
      <CmdBreadcrumbs :breadcrumbLinks="breadcrumbData" breadcrumbLabel="You are here:"/>
    </CmdWidthLimitationWrapper>

    <a id="section-cookie-disclaimer"></a>
    <CmdWidthLimitationWrapper>
      <h2 class="headline-demopage">Cookie Disclaimer</h2>
      <a class="button" href="#" @click.prevent="fancyBoxCookieDisclaimer = true">
        <span>Open Cookie Disclaimer</span>
      </a>
    </CmdWidthLimitationWrapper>

    <a id="section-fancybox"></a>
    <CmdWidthLimitationWrapper>
      <h2 class="headline-demopage">Fancybox</h2>
      <a href="#" @click.prevent="showFancyBox('text','Some text')">Open FancyBox with text</a>
      <a href="#"
         @click.prevent="showFancyBox('image', 'media/images/content-images/logo-business-edition-landscape.jpg')"
         title="Open FancyBox with large image">
        <img src="media/images/content-images/logo-business-edition-landscape.jpg" alt="Alternative text"/>
      </a>
    </CmdWidthLimitationWrapper>

    <a id="section-google-maps-integration"></a>
    <CmdWidthLimitationWrapper>
      <h2 class="headline-demopage">Google Maps&trade;-Integration</h2>
      <CmdGoogleMaps :addressData="addressData"/>
    </CmdWidthLimitationWrapper>

    <a id="section-image-gallery"></a>
    <CmdWidthLimitationWrapper>
      <h2 class="headline-demopage">Image-Gallery</h2>
      <CmdImageGallery :images="imageGalleryData"/>
    </CmdWidthLimitationWrapper>

    <a id="section-image-zoom"></a>
    <CmdWidthLimitationWrapper>
      <a id="anchor-image-zoom"></a>
      <h2 class="headline-demopage">Image-Zoom</h2>
      <CmdImageZoom small-image-url="media/images/content-images/logo-business-edition-landscape.jpg"
                    large-image-url="media/images/content-images/logo-business-edition-landscape-large.jpg"/>
    </CmdWidthLimitationWrapper>

    <a id="section-main-headline"></a>
    <CmdWidthLimitationWrapper :inner-wrapper="false">
      <CmdMainHeadline icon-class="icon-home" pre-headline="Pre-headline" main-headline="Main headline"/>
    </CmdWidthLimitationWrapper>

    <a id="section-main-navigation"></a>
    <CmdWidthLimitationWrapper>
      <h2 class="headline-demopage">Main Navigation</h2>
      <CmdMainNavigation :stretchMainItems="false"
                         :persistOnMobile="false"
                         :navigationEntries="navigationData"
      />
    </CmdWidthLimitationWrapper>

    <a id="section-multistep-form-progress-bar"></a>
    <CmdWidthLimitationWrapper>
      <h2 class="headline-demopage">Multistepform-Progressbar</h2>
      <CmdMultistepFormProgressBar :multisteps="multistepsData" separatorIconClass="icon-single-arrow-right"
                                   @click="showPageMultistep = $event.index + 1"/>
      <div>
        <p>Page {{ showPageMultistep }}</p>
      </div>
    </CmdWidthLimitationWrapper>

    <a id="section-pager"></a>
    <CmdWidthLimitationWrapper>
      <h2 class="headline-demopage">Pager</h2>
      <div>
        <p>Page {{ showPagePager }}</p>
      </div>
      <CmdPager
          :items="pagerData.length"
          :itemsPerPage="1"
          @click="showPagePager = $event"
      />
    </CmdWidthLimitationWrapper>

    <a id="section-share-buttons"></a>
    <CmdWidthLimitationWrapper>
      <h2 class="headline-demopage">Share buttons</h2>
      <CmdShareButtons :share-buttons="shareButtonsData"/>
    </CmdWidthLimitationWrapper>

    <a id="section-slideshow"></a>
    <CmdWidthLimitationWrapper>
      <h2 class="headline-demopage">Slideshow</h2>
      <CmdSlideshow :slideshow-items="slideshowData" :showCounter="true" :autoplay="true"/>
    </CmdWidthLimitationWrapper>

    <a id="section-system-message"></a>
    <CmdWidthLimitationWrapper>
      <h2 class="headline-demopage">System Message</h2>
      <CmdSystemMessage status="error" :fullWidth="true" message="This is an error message!"
                        iconClass="icon-cancel">
        <ul>
          <li>Error #1</li>
          <li>Error #2</li>
          <li>Error #3</li>
        </ul>
      </CmdSystemMessage>
      <CmdSystemMessage status="warning" :fullWidth="true" message="This is a warning message!">
        <p>This is additional text!</p>
      </CmdSystemMessage>
      <CmdSystemMessage status="success" :fullWidth="true" message="This is a success message!"
                        iconClass="icon-check">
        <p>This is additional text!</p>
      </CmdSystemMessage>
      <CmdSystemMessage status="info" :fullWidth="true" message="This is an info message!"
                        iconClass="icon-info">
        <p>This is additional text!</p>
      </CmdSystemMessage>
    </CmdWidthLimitationWrapper>

    <a id="section-tables"></a>
    <CmdWidthLimitationWrapper>
      <h2 class="headline-demopage">Tables</h2>
        <h3>Table as wide as its content</h3>
        <CmdTable :collapsible="true" :fullWidthOnDefault="false" :userCanToggleWidth="true" :table-data="tableDataSmall" />
        <h3>Table as wide as possible</h3>
        <CmdTable :collapsible="true" :fullWidthOnDefault="false" :userCanToggleWidth="true" :table-data="tableDataLarge" />
    </CmdWidthLimitationWrapper>

    <a id="section-tabs"></a>
    <CmdWidthLimitationWrapper>
      <h2 class="headline-demopage">Tabs</h2>
      <h3>Tabs with content from json-file</h3>
      <CmdTabs :stretchTabs="false" :tabs="tabsData"/>
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

    <a id="section-thumbnail-scroller"></a>
    <CmdWidthLimitationWrapper>
      <h2 class="headline-demopage">Thumbnail-Scroller</h2>
      <CmdThumbnailScroller :thumbnail-scroller-items="thumbnailScrollerData"/>
    </CmdWidthLimitationWrapper>

    <a id="section-upload-form"></a>
    <CmdWidthLimitationWrapper>
      <h2 class="headline-demopage">Upload-Form</h2>
      <CmdUploadForm headline="Select files to upload" :enableDragAndDrop="true" :allowedFileTypes="['image/jpeg']"/>
    </CmdWidthLimitationWrapper>
  </main>

  <CmdWidthLimitationWrapper id="site-footer" inner-component="footer">
    <CmdSwitchLanguage :languages="languagesData" @click="doSomething"/>
    <CmdFooterNavigation :footerNavigation="footerNavigationData" headline="Links"/>
    <CmdOpeningHours :openingHours="openingHoursData" :closed="true" headline="Opening hours"
                     textOpenClosed="Closed right now!" textHolidaysClosed="Closed on holidays"
                     textMiscInfo="Miscellaneous information"/>
    <CmdAddressData :addressData="addressData" :linkGoogleMaps="true" headline="Contact"/>
  </CmdWidthLimitationWrapper>

  <CmdCopyrightInformation/>

  <CmdFancyBox :show="fancyBoxCookieDisclaimer" :fancyboxOptions="{}" :allowEscapeKey="false">
    <CmdCookieDisclaimer headline="Usage of cookies on this web site"
                         :cookieOptions="cookieDisclaimerData"
                         buttonLabelAcceptAllCookies="Accept all cookies"
                         buttonLabelAcceptCurrentSettings="Accept current settings"
                         @closeCookieDisclaimer="fancyBoxCookieDisclaimer = false"
    >
      <template #privacy-text>
        <p>
          <strong>
            By browsing ths web site yo accept the usage and saving of anonymous data!
          </strong>
        </p>
      </template>
    </CmdCookieDisclaimer>
  </CmdFancyBox>
</template>

<script>
// import used example data
import accordionData from '@/assets/data/accordion.json'
import addressData from '@/assets/data/address.json'
import boxUserData from '@/assets/data/box-user.json'
import boxProductData from '@/assets/data/box-product.json'
import breadcrumbData from '@/assets/data/breadcrumbs.json'
import companyLogoData from '@/assets/data/company-logo.json'
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
import tableDataSmall from '@/assets/data/table-small.json'
import tableDataLarge from '@/assets/data/table-large.json'
import thumbnailScrollerData from '@/assets/data/thumbnail-scroller.json'
import topHeaderNavigationData from '@/assets/data/top-header-navigation.json'

// import used components
import CmdAccordion from "@/components/CmdAccordion.vue"
import CmdAddressData from "@/components/CmdAddressData"
import CmdBackToTopButton from "@/components/CmdBackToTopButton.vue"
import CmdBox from "@/components/CmdBox.vue"
import CmdBoxSiteSearch from "@/components/CmdBoxSiteSearch.vue"
import CmdBreadcrumbs from "@/components/CmdBreadcrumbs.vue"
import CmdCompanyLogo from "@/components/CmdCompanyLogo.vue"
import CmdCopyrightInformation from "@/components/CmdCopyrightInformation.vue"
import CmdCookieDisclaimer from "@/components/CmdCookieDisclaimer.vue"
import CmdFakeSelect from "@/components/CmdFakeSelect.vue"
import CmdFancyBox from "@/components/CmdFancyBox.vue"
import CmdFooterNavigation from "@/components/CmdFooterNavigation.vue"
import CmdFormElement from "@/components/CmdFormElement.vue"
import CmdFormFilters from "@/components/CmdFormFilters.vue"
import CmdGoogleMaps from "./components/CmdGoogleMaps"
import CmdImageGallery from "@/components/CmdImageGallery.vue"
import CmdImageZoom from "@/components/CmdImageZoom.vue"
import CmdMainHeadline from "@/components/CmdMainHeadline.vue"
import CmdMainNavigation from "@/components/CmdMainNavigation.vue"
import CmdMultipleSwitch from "@/components/CmdMultipleSwitch.vue"
import CmdMultistepFormProgressBar from "@/components/CmdMultistepFormProgressBar.vue"
import CmdOpeningHours from "@/components/CmdOpeningHours"
import CmdPager from "@/components/CmdPager.vue"
import CmdProgressBar from "@/components/CmdProgressBar.vue"
import CmdShareButtons from "@/components/CmdShareButtons.vue"
import CmdSiteHeader from "./components/CmdSiteHeader"
import CmdSlideshow from "@/components/CmdSlideshow.vue"
import CmdSwitchButton from "@/components/CmdSwitchButton.vue"
import CmdSwitchLanguage from "@/components/CmdSwitchLanguage.vue"
import CmdSystemMessage from "@/components/CmdSystemMessage.vue"
import CmdTabs from "@/components/CmdTabs.vue"
import CmdTable from "@/components/CmdTable.vue"
import CmdThumbnailScroller from "@/components/CmdThumbnailScroller.vue"
import CmdTopHeaderNavigation from "@/components/CmdTopHeaderNavigation.vue"
import CmdUploadForm from "@/components/CmdUploadForm.vue"
import CmdWidthLimitationWrapper from "@/components/CmdWidthLimitationWrapper"
import {openFancyBox} from "@/components/CmdFancyBox"

export default {
  name: "App",
  components: {
    CmdAccordion, // short form of 'CmdAccordion': CmdAccordion
    CmdAddressData,
    CmdBackToTopButton,
    CmdBox,
    CmdBoxSiteSearch,
    CmdBreadcrumbs,
    CmdCompanyLogo,
    CmdCopyrightInformation,
    CmdCookieDisclaimer,
    CmdFakeSelect,
    CmdFancyBox,
    CmdFooterNavigation,
    CmdFormFilters,
    CmdFormElement,
    CmdGoogleMaps,
    CmdImageGallery,
    CmdImageZoom,
    CmdMainHeadline,
    CmdMainNavigation,
    CmdMultistepFormProgressBar,
    CmdMultipleSwitch,
    CmdOpeningHours,
    CmdPager,
    CmdProgressBar,
    CmdShareButtons,
    CmdSiteHeader,
    CmdSlideshow,
    CmdSwitchButton,
    CmdSwitchLanguage,
    CmdSystemMessage,
    CmdTabs,
    CmdTable,
    CmdThumbnailScroller,
    CmdTopHeaderNavigation,
    CmdUploadForm,
    CmdWidthLimitationWrapper
  },

  data() {
    return {
      accordionGroupOpen: false,
      showPageMultistep: 1,
      showPagePager: 1,
      selectedOptions: [],
      selectedCountry: "de",
      selectedColor: "",
      rangeValue: 50,
      formElementStatus: "",
      switchButtonRadio: "radio1",
      switchButtonCheckbox: ["checkbox1"],
      inputField1: "",
      checkboxStatus: true,
      replacedCheckboxStatus1: false,
      replacedCheckboxStatus2: false,
      checkboxValues: [],
      radiobuttonStatus: "radiobuttonValue1",
      replacedRadiobuttonStatus: "radiobuttonValue1",
      multipleSwitchCheckbox: ['b'],
      multipleSwitchRadio: 'c',
      fancyBoxCookieDisclaimer: false,
      selectedOption: "2",
      selectOptions: [
          {
              text: "Option 1",
              value: "1"
          },
          {
              text: "Option 2",
              value: "2"
          },
          {
              text: "Option 3",
              value: "3"
          }
      ],
      datalist: {
        id: "datalist-id",
        options: [
          "Option 1",
          "Option 2",
          "Option 3"
        ]
      },

      // assign data from json files to data-properties
      accordionData,
      addressData,
      boxProductData,
      boxUserData,
      breadcrumbData,
      companyLogoData,
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
      tableDataSmall,
      tableDataLarge,
      tabsData,
      thumbnailScrollerData,
      topHeaderNavigationData
    }
  },
  methods: {
    showFancyBox(type, content) {
      if (type === 'text') {
        openFancyBox({content: content})
      } else if (type === 'image') {
        openFancyBox({url: content})
      }
    },
    getOptionName(option) {
      for (let i = 0; i < this.fakeSelectOptionsData.length; i++) {
        if (option === this.fakeSelectOptionsData[i].optionValue) {
          return this.fakeSelectOptionsData[i].optionName
        }
      }
      return null
    },
    doSomething(event) {
      event.preventDefault()
      alert("Language changed!")
    },
    executeSearch() {
      return Math.floor(Math.random() * 100)
    },
    toggleAllAccordions() {
        if(this.accordionGroupOpen) {
            this.$refs.accordionGroup1.closeAll()
        } else{
            this.$refs.accordionGroup1.openAll()
        }
        this.accordionGroupOpen = !this.accordionGroupOpen
    }
  }
}
</script>