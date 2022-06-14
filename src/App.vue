<!--suppress HtmlUnknownTarget, NpmUsedModulesInstalled, JSUnresolvedVariable -->
<template>
    <a id="anchor-back-to-top"></a>
    <CmdSiteHeader :cmdMainNavigation="navigationData" :sticky="true">
        <template v-slot:top-header>
            <CmdListOfLinks
                :links="listOfLinksData"
                orientation="horizontal"
                align="right"
            />
        </template>
        <template v-slot:logo>
            <CmdCompanyLogo :link="companyLogoData.link"
                            altText="CoManD Logo"
                            :pathDefaultLogo="require('@/assets/images/logo.svg')"
                            :pathDarkmodeLogo="require('@/assets/images/logo-darkmode.svg')"
            />
        </template>
    </CmdSiteHeader>
    <main>
        <CmdWidthLimitationWrapper>
            <div class="flex-container">
                <ul>
                    <li><a href="#section-accordion">Accordion</a></li>
                    <li><a href="#section-advanced-form-elements">Advanced Form Elements</a></li>
                    <li><a href="#section-bank-account-data">Bank Account Data</a></li>
                    <li><a href="#section-boxes">Boxes</a></li>
                    <li><a href="#section-breadcrumbs">Breadcrumbs</a></li>
                    <li><a href="#section-cookie-disclaimer">Cookie-Disclaimer</a></li>
                </ul>
                <ul>
                    <li><a href="#section-custom-headline">Custom Headline</a></li>
                    <li><a href="#section-fancybox">Fancybox</a></li>
                    <li><a href="#section-google-maps-integration">Google-Maps&trade;-Integration</a></li>
                    <li><a href="#section-image-gallery">Image Gallery</a></li>
                    <li><a href="#section-image-zoom">Image-Zoom</a></li>
                    <li><a href="#section-login-form">Login Form</a></li>
                </ul>
                <ul>
                    <li><a href="#section-main-navigation">Main-Navigation</a></li>
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
                    <li class="error"><a href="#" @click.prevent="formElementStatus = 'error'"
                           :class="{'active' : formElementStatus === 'error'}" id="status-error">Error</a></li>
                    <li><a href="#" @click.prevent="formElementStatus = 'warning'"
                           :class="{'active' : formElementStatus === 'warning'}" id="status-warning">Warning</a></li>
                    <li><a href="#" @click.prevent="formElementStatus = 'success'"
                           :class="{'active' : formElementStatus === 'success'}" id="status-success">Success</a></li>
                    <li><a href="#" @click.prevent="formElementStatus = 'info'"
                           :class="{'active' : formElementStatus === 'info'}" id="status-info">Info</a></li>
                    <li><a href="#" @click.prevent="formElementStatus = 'disabled'"
                           :class="{'active' : formElementStatus === 'disabled'}" id="status-disabled">Disabled</a></li>
                </ul>
            </div>

            <!-- begin cmd-form-filters -->
            <CmdFormFilters v-model="fakeSelectFilters" :selectedOptionsName="getOptionName" />
            <!-- end cmd-form-filters -->

            <CmdForm :use-fieldset="false" id="advanced-form-elements" novalidate="novalidate">
                <fieldset class="grid-container-create-columns">
                    <legend>Legend</legend>
                    <h2>Form Element-Component</h2>
                    <CmdToggleDarkMode :showLabel="true" />
                    <div class="flex-container">
                        <CmdFormElement labelText="Input (type text):"
                                        element="input"
                                        type="text"
                                        :status="formElementStatus"
                                        placeholder="Type in text"
                                        tooltipText="This is a tooltip"
                                        v-bind="{useCustomTooltip: false}"
                        />
                        <CmdFormElement labelText="Input for selectbox:"
                                        element="select"
                                        required="required"
                                        :status="formElementStatus"
                                        v-model="selectedOption"
                                        :selectOptions="selectOptionsData"
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
                    <CmdFormElement labelText="Input (type search (without search-button)):"
                                    element="input"
                                    type="search"
                                    :status="formElementStatus"
                                    :showSearchButton="false"
                                    placeholder="Search"
                                    tooltipText="This is a tooltip"
                                    v-bind="{useCustomTooltip: false}"
                    />
                    <CmdFormElement labelText="Input (type search (with search-button)):"
                                    element="input"
                                    type="search"
                                    :status="formElementStatus"
                                    placeholder="Search"
                                    tooltipText="This is a tooltip"
                                    v-bind="{useCustomTooltip: false}"
                    />
                    <h2>Fake Selects</h2>
                    <div class="flex-container">
                        <!-- type === default: normal selectbox (with optional icons) -->
                        <CmdFakeSelect labelText="Default selectbox:"
                                        :status="formElementStatus"
                                        :selectData="fakeSelectOptionsData"
                                        v-model="fakeSelectDefault"
                                        required
                                        defaultOptionName="Select an option:"
                        />
                        <CmdFakeSelect labelText="Default selectbox with icons:"
                                       :status="formElementStatus"
                                       :selectData="fakeSelectOptionsWithIconsData"
                                       v-model="fakeSelectDefaultWithIcons"
                                       defaultOptionName="Select an option:"
                        />
                        <!-- type === checkboxOptions: selectbox with checkboxes for each option -->
                        <CmdFakeSelect labelText="Selectbox with checkboxes:"
                                       :status="formElementStatus"
                                       :selectData="fakeSelectOptionsData"
                                       v-model="fakeSelectCheckbox"
                                       defaultOptionName="Options:"
                                       :required="true"
                                       id="selectbox-with-checkboxes"
                                       type="checkboxOptions"
                                       :useCustomTooltip="true"
                        />
                        <CmdFakeSelect labelText="Selectbox with filters:"
                                       :status="formElementStatus"
                                       :selectData="fakeSelectFilterOptionsData"
                                       v-model="fakeSelectFilters"
                                       defaultOptionName="Filters:"
                                       id="selectbox-with-filters"
                                       type="checkboxOptions"
                                       :useCustomTooltip="true"
                        />
                        <CmdFakeSelect labelText="Selectbox with slot-content:"
                                       :status="formElementStatus"
                                       type="content"
                                       defaultOptionName="HTML-Content:">
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
                        <CmdFakeSelect labelText="Selectbox with country flags:"
                                       :status="formElementStatus"
                                       :selectData="fakeSelectCountriesData"
                                       v-model="selectedCountry"
                                       defaultOptionName="Select country:"
                                       type="country"
                        />
                        <CmdFakeSelect labelText="Selectbox with colors:"
                                       :status="formElementStatus"
                                       :selectData="fakeSelectColorsData"
                                       v-model="selectedColor"
                                       required="required"
                                       type="color"
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
                            <input
                                type="number"
                                :class="formElementStatus"
                                v-model="rangeValue"
                                :disabled="formElementStatus === 'disabled'"
                                min="0"
                                max="100"
                            />
                            <input
                                type="range"
                                class="range-slider"
                                :class="{'disabled': formElementStatus === 'disabled'}"
                                id="range-slider"
                                v-model="rangeValue"
                                :disabled="formElementStatus === 'disabled'"
                                min="0"
                                max="100"
                            />
                        </span>
                    </label>
                    <!-- end slider -->

                    <hr/>

                    <h2>Group of checkboxes with CmdInputGroup</h2>
                    <CmdInputGroup label-text="Group-label:" :label-inline="true">
                        <CmdFormElement
                            element="input"
                            type="checkbox"
                            id="input-group-checkbox"
                            labelText="Checkbox-label #1"
                        />
                        <CmdFormElement
                            element="input"
                            type="checkbox"
                            id="input-group-checkbox"
                            labelText="Checkbox-label #2"
                        />
                        <CmdFormElement
                            element="input"
                            type="checkbox"
                            id="input-group-checkbox"
                            labelText="Checkbox-label #3"
                        />
                    </CmdInputGroup>

                    <!-- begin toggle-switch-radio with switch-label (colored) -->
                    <h2>Toggle Switches with CmdFormElement</h2>
                    <CmdFormElement element="input"
                                    type="checkbox"
                                    id="toggle-switch-checkbox"
                                    v-model="switchButtonCheckbox"
                                    labelText="Labeltext for Switch-Button without Switch-Label"
                                    :toggleSwitch="true"
                                    :status="formElementStatus"
                    />
                    <CmdFormElement element="input"
                                    type="checkbox"
                                    id="toggle-switch-checkbox"
                                    v-model="switchButtonCheckbox"
                                    labelText="Labeltext for Switch-Button with Switch-Label"
                                    onLabel="Label on"
                                    offLabel="Label off"
                                    :toggleSwitch="true"
                                    :status="formElementStatus"
                    />
                    <CmdFormElement element="input"
                                    type="checkbox"
                                    id="toggle-switch-checkbox-colored"
                                    v-model="switchButtonCheckbox"
                                    labelText="Labeltext for Switch-Button (Checkbox, colored)"
                                    onLabel="Label on"
                                    offLabel="Label off"
                                    :colored="true"
                                    :toggleSwitch="true"
                                    :status="formElementStatus"
                    />
                    <CmdFormElement element="input"
                                    type="radio"
                                    name="radiogroup"
                                    id="toggle-switch-radio1"
                                    v-model="switchButtonCheckbox"
                                    onLabel="Label on"
                                    offLabel="Label off"
                                    :colored="true"
                                    :toggleSwitch="true"
                                    :status="formElementStatus"
                                    inputValue="radio1"
                                    labelText="Labeltext for Switch-Button (Radio, colored) #1"
                    />
                    <CmdFormElement element="input"
                                    type="radio"
                                    name="radiogroup"
                                    id="toggle-switch-radio2"
                                    v-model="switchButtonCheckbox"
                                    onLabel="Label on"
                                    offLabel="Label off"
                                    :colored="true"
                                    :toggleSwitch="true"
                                    :status="formElementStatus"
                                    inputValue="radio2"
                                    labelText="Labeltext for Switch-Button (Radio, colored) #2"
                    />
                    <!-- end toggle-switch-radio with switch-label (colored) -->

                    <h2>Inputfields in Columns</h2>
                    <div class="flex-container">
                        <CmdFormElement element="input"
                                        labelText="Label for inputfield (with tooltip):"
                                        type="text"
                                        minlength="5"
                                        id="inputfield1"
                                        placeholder="This is placeholder text"
                                        v-model="inputField1"
                                        tooltipText="This is a tooltip!"
                                        :status="formElementStatus"
                        />
                        <CmdFormElement element="input"
                                        labelText="Label for inputfield (required):"
                                        type="text"
                                        required="required"
                                        minlength="5"
                                        id="inputfield-required"
                                        placeholder="This is placeholder text"
                                        v-model="inputFieldRequired"
                                        tooltipText="This is a tooltip!"
                                        :status="formElementStatus"
                        />
                        <CmdFormElement element="input"
                                        labelText="Label for inputfield (with pattern):"
                                        type="text"
                                        id="inputfield-pattern"
                                        placeholder="This is placeholder text"
                                        pattern="/\d/"
                                        v-model="inputFieldPattern"
                                        tooltipText="This is a tooltip!"
                                        :status="formElementStatus"
                        />
                    </div>
                    <!-- begin inputfield in two columns -->
                    <div class="flex-container">
                        <CmdFormElement labelText="Label for inputfield (with icon):"
                                        element="input"
                                        type="text"
                                        id="inputfield-username"
                                        fieldIconClass="icon-user-profile"
                                        placeholder="Type in username"
                                        tooltipText="This is a tooltip!"
                                        maxlength="100"
                                        v-model="inputUsername"
                                        :status="formElementStatus"
                                        />
                        <CmdFormElement element="input"
                                        labelText="Label for passwordfield:"
                                        type="password"
                                        minlength="8"
                                        maxlength="255"
                                        id="inputfield-password"
                                        fieldIconClass="icon-security-settings"
                                        placeholder="Type in password"
                                        tooltipText="This is a tooltip!"
                                        :customRequirements="customRequirements"
                                        v-model="inputPassword"
                                        :status="formElementStatus"/>
                    </div>
                    <!-- end inputfield in two columns -->

                    <CmdFormElement element="input"
                                    labelText="Label (inline) for inputfield (number):"
                                    :displayLabelInline="true"
                                    type="number"
                                    id="inputfield-number"
                                    required="required"
                                    min="0"
                                    max="9"
                                    v-model="inputNumber"
                                    :customRequirements="[customRequirements[2]]"
                                    :status="formElementStatus"/>
                    <CmdFormElement element="input"
                                    labelText="Label (inline) for inputfield (date):"
                                    :displayLabelInline="true"
                                    type="date"
                                    id="inputfield-date"
                                    v-model="inputDate"
                                    :status="formElementStatus"/>
                    <CmdFormElement element="input"
                                    labelText="Label (inline) for inputfield (search) without search-button:"
                                    :displayLabelInline="true"
                                    type="search"
                                    id="inputfield-search-without-searchbutton"
                                    placeholder="Keyword(s)"
                                    v-model="inputSearch"
                                    :showSearchButton="false"
                                    :status="formElementStatus"/>
                    <CmdFormElement element="input"
                                    labelText="Label (inline) for inputfield (search):"
                                    :displayLabelInline="true"
                                    type="search"
                                    id="inputfield-search-with-searchbutton"
                                    placeholder="Keyword(s)"
                                    v-model="inputSearch"
                                    :status="formElementStatus"/>
                    <CmdFormElement element="textarea"
                                    labelText="Label for textarea:"
                                    id="textarea"
                                    minlength="1"
                                    maxlength="100"
                                    placeholder="Type in your message"
                                    v-model="textarea"
                                    :status="formElementStatus"/>
                    <div class="label inline">
                        <span>Label for native checkboxes:</span>
                        <div class="flex-container no-flex">
                            <CmdFormElement element="input"
                                            labelText="Label for checkbox with boolean"
                                            type="checkbox"
                                            id="checkbox-with-boolean"
                                            v-model="checkboxValue"
                                            :status="formElementStatus"/>
                            <CmdFormElement element="input"
                                            labelText="Label for checkbox with value"
                                            v-model="checkboxValues"
                                            inputValue="checkboxValue1"
                                            type="checkbox"
                                            id="checkbox-with-value-1"
                                            :status="formElementStatus"/>
                            <CmdFormElement element="input"
                                            labelText="Label for checkbox with value"
                                            v-model="checkboxValues"
                                            inputValue="checkboxValue2"
                                            type="checkbox"
                                            id="checkbox-with-value-2"
                                            :status="formElementStatus"/>
                        </div>
                    </div>
                    <CmdFormElement element="input"
                                    labelText="Label for (required) checkbox with boolean"
                                    type="checkbox"
                                    required="required"
                                    id="checkbox-required-with-boolean"
                                    v-model="checkboxRequiredValue"
                                    :status="formElementStatus"/>
                    <p>
                        checkbox (required) with boolean: {{checkboxRequiredValue}}<br />
                        checkbox with boolean: {{checkboxValue}}<br />
                        checkboxes with values: {{checkboxValues}}
                    </p>
                    <div class="label inline">
                        <span>Label for Replaced Input-Type-Checkbox:</span>
                        <div class="flex-container no-flex">
                            <CmdFormElement element="input"
                                            labelText="Label for replaced checkbox"
                                            type="checkbox"
                                            class="replace-input-type"
                                            id="inputfield9"
                                            v-model="replacedCheckboxValue"
                                            inputValue="checkboxValue1"
                                            :status="formElementStatus"/>
                            <CmdFormElement element="input"
                                            labelText="Label for replaced checkbox"
                                            v-model="replacedCheckboxValue"
                                            inputValue="checkboxValue2"
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
                                            v-model="radiobuttonValue"
                                            :status="formElementStatus"/>
                            <CmdFormElement element="input"
                                            labelText="Label for native radiobutton"
                                            type="radio"
                                            id="inputfield12"
                                            name="radiogroup"
                                            inputValue="radiobuttonValue2"
                                            v-model="radiobuttonValue"
                                            :status="formElementStatus"/>
                        </div>
                    </div>
                    <p>
                        Radiobuttons with values: {{radiobuttonValue}}
                    </p>
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
                                            v-model="replacedRadiobuttonValue"
                                            :status="formElementStatus"/>
                            <CmdFormElement element="input"
                                            labelText="Label for replaced radiobutton"
                                            type="radio"
                                            class="replace-input-type"
                                            id="inputfield14"
                                            name="replaced-radiogroup"
                                            inputValue="radiobuttonValue2"
                                            v-model="replacedRadiobuttonValue"
                                            :status="formElementStatus"/>
                        </div>
                    </div>
                    <CmdInputGroup labelText="Group label for radio group">
                        <CmdFormElement element="input"
                                        labelText="Label for radiobutton"
                                        type="radio"
                                        id="input-group-radiobutton"
                                        name="radiogroup2"
                                        inputValue="radiobuttonValue1"
                                        v-model="radiobuttonValue"
                                        :status="formElementStatus"/>
                        <CmdFormElement element="input"
                                        labelText="Label for radiobutton"
                                        type="radio"
                                        id="input-group-radiobutton"
                                        name="radiogroup2"
                                        inputValue="radiobuttonValue2"
                                        v-model="radiobuttonValue"
                                        :status="formElementStatus"/>
                    </CmdInputGroup>
                    <CmdMultipleSwitch labelText="Label for multiple-switch with checkboxes:"
                                       :multipleSwitches="multipleSwitchCheckboxData"
                                       switchTypes="checkbox"
                                       switchNames="checkboxgroup"
                                       :status="formElementStatus"
                                       v-model="multipleSwitchCheckbox"/>
                    <dl>
                        <dt>Selected value:</dt>
                        <dd>
                            <output>{{ multipleSwitchCheckbox }}</output>
                        </dd>
                    </dl>
                    <CmdMultipleSwitch labelText="Label for multiple-switch with radiobuttons:"
                                       :multipleSwitches="multipleSwitchRadioData"
                                       switchTypes="radio"
                                       switchNames="swtich-names"
                                       :status="formElementStatus"
                                       v-model="multipleSwitchRadio"/>
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
                                    :nativeButton="{text: 'Submit-button from component'}"
                                    type="submit"
                                    id="submitbutton"
                                    name="submitbutton"
                                    :status="formElementStatus"/>
                    <button type="submit" :disabled="formElementStatus === 'disabled'">
                        <span class="icon-check"></span>
                        <span>Native submit-button</span>
                    </button>
                </div>
         </CmdForm>
        </CmdWidthLimitationWrapper>
        <!-- end advanced form elements ----------------------------------------------------------------------------------------------------------------------------------------------------->

        <!-- begin back to top button ----------------------------------------------------------------------------------------------------------------------------------------------------->
        <CmdBackToTopButton/>
        <!-- end back to top button ----------------------------------------------------------------------------------------------------------------------------------------------------->

        <!-- begin bank account data ----------------------------------------------------------------------------------------------------------------------------------------------------->
        <a id="section-bank-account-data"></a>
        <CmdWidthLimitationWrapper>
            <h2 class="headline-demopage">Bank Account Data</h2>
            <CmdBankAccountData :account-data="bankAccountData" :cmd-custom-headline="{ headlineText: 'Bank Account', headlineLevel: 3}" :allow-copy-by-click="true" />
        </CmdWidthLimitationWrapper>
        <!-- end bank account data ------------------------------------------------------------------------------------------------------------------------------------------------------->

        <!-- begin boxes ------------------------------------------------------------------------------------------------------------------------------------------------------->
        <a id="section-boxes"></a>
        <CmdWidthLimitationWrapper>
            <h2 class="headline-demopage">Boxes</h2>
            <h3>Content boxes</h3>
            <div class="grid-container-create-columns">
                <div class="grid-small-item">
                    <CmdBox>
                        <template v-slot:header>
                            <h3>
                                Headline for box
                            </h3>
                        </template>
                        <template v-slot:body>
                            <p class="padding">
                                Box body with paragraph
                            </p>
                        </template>
                        <template v-slot:footer>
                            <p>
                                Footer content
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
                                <p>This is some text information i.e a short-text for a news teaser.</p>
                            </div>
                        </template>
                        <template v-slot:footer>
                            <p>
                                <a href="#">Read more&hellip;</a>
                            </p>
                        </template>
                    </CmdBox>
                </div>
            </div>
            <h3>Product boxes</h3>
            <div class="grid-container-create-columns">
                <div class="grid-small-item" v-for="(product, index) in boxProductData" :key="index">
                    <CmdBox boxType="product" :product="product" :cmdCustomHeadline="{headlineLevel: 4}" />
                </div>
            </div>
            <h3>User boxes</h3>
            <div class="grid-container-create-columns">
                <div class="grid-small-item" v-for="(user, index) in boxUserData" :key="index">
                    <CmdBox boxType="user" :user="user" :cmdCustomHeadline="{headlineLevel: 4}" />
                </div>
            </div>
            <h3>Box Site Search</h3>
            <CmdBoxSiteSearch :results="executeSearch()" @click="executeSearch($event)"/>
        </CmdWidthLimitationWrapper>
        <!-- end boxes ------------------------------------------------------------------------------------------------------------------------------------------------------->

        <!-- begin breadcrumbs ------------------------------------------------------------------------------------------------------------------------------------------------------->
        <a id="section-breadcrumbs"></a>
        <CmdWidthLimitationWrapper inner-component="div">
            <h2 class="headline-demopage">Breadcrumbs</h2>
            <CmdBreadcrumbs :breadcrumbLinks="breadcrumbData" breadcrumbLabel="You are here:"/>
        </CmdWidthLimitationWrapper>
        <!-- end breadcrumbs ------------------------------------------------------------------------------------------------------------------------------------------------------->

        <!-- begin cookie-disclaimer ------------------------------------------------------------------------------------------------------------------------------------------------------->
        <a id="section-cookie-disclaimer"></a>
        <CmdWidthLimitationWrapper>
            <h2 class="headline-demopage">Cookie Disclaimer</h2>
            <a class="button" href="#" @click.prevent="fancyBoxCookieDisclaimer = true">
                <span>Open Cookie Disclaimer</span>
            </a>
        </CmdWidthLimitationWrapper>
        <!-- end cookie-disclaimer ------------------------------------------------------------------------------------------------------------------------------------------------------->

        <!-- begin custom-headline ------------------------------------------------------------------------------------------------------------------------------------------------------->
        <a id="section-custom-headline"></a>
        <CmdWidthLimitationWrapper>
            <h2 class="headline-demopage">Custom Headline</h2>
            <CmdCustomHeadline icon-class="icon-home" pre-headline-text="Pre-headline" headlineText="Headline level 1" :headlineLevel="1"/>
            <CmdCustomHeadline headlineText="Headline level 2" :headlineLevel="2"/>
            <CmdCustomHeadline headlineText="Headline level 3" :headlineLevel="3"/>
            <CmdCustomHeadline headlineText="Headline level 4" :headlineLevel="4"/>
            <CmdCustomHeadline headlineText="Headline level 5" :headlineLevel="5"/>
            <CmdCustomHeadline headlineText="Headline level 6" :headlineLevel="6"/>
        </CmdWidthLimitationWrapper>
        <!-- end custom-headline ------------------------------------------------------------------------------------------------------------------------------------------------------->

        <!-- begin fancybox ------------------------------------------------------------------------------------------------------------------------------------------------------->
        <a id="section-fancybox"></a>
        <CmdWidthLimitationWrapper>
            <h2 class="headline-demopage">Fancybox</h2>
            <a href="#" @click.prevent="showFancyBox('text','Some text')">Open FancyBox with text</a>
            <a href="#"
               @click.prevent="showFancyBox('image', 'media/images/content-images/logo-business-edition-landscape.jpg', 'Alternative text')"
               title="Open FancyBox with large image">
                <img src="media/images/content-images/logo-business-edition-landscape.jpg" alt="Alternative text"/>
            </a>
        </CmdWidthLimitationWrapper>
        <!-- end fancybox ------------------------------------------------------------------------------------------------------------------------------------------------------->

        <a id="section-google-maps-integration"></a>
        <CmdWidthLimitationWrapper>
            <h2 class="headline-demopage">Google Maps&trade;-Integration</h2>
            <CmdGoogleMaps :address="addressData"/>
        </CmdWidthLimitationWrapper>

        <a id="section-image-gallery"></a>
        <CmdWidthLimitationWrapper>
            <h2 class="headline-demopage">Image-Gallery</h2>
            <CmdImageGallery :images="imageGalleryData"/>
        </CmdWidthLimitationWrapper>

        <a id="section-image-zoom"></a>
        <CmdWidthLimitationWrapper>
            <h2 class="headline-demopage">Image-Zoom</h2>
            <CmdImageZoom small-image-url="media/images/content-images/logo-business-edition-landscape.jpg"
                          large-image-url="media/images/content-images/logo-business-edition-landscape-large.jpg"/>
        </CmdWidthLimitationWrapper>

        <a id="section-login-form"></a>
        <CmdWidthLimitationWrapper>
            <h2 class="headline-demopage">Login Form</h2>
            <CmdLoginForm v-model="loginData" v-focus />
            <p>LoginData: {{loginData}}</p>
        </CmdWidthLimitationWrapper>

        <!-- begin list-of-links ------------------------------------------------------------------------------------------------------------------------------------------------------->
        <a id="section-list-of-links"></a>
        <CmdWidthLimitationWrapper>
            <h2 class="headline-demopage">List Of Links</h2>
            <h3>Vertical</h3>
            <CmdListOfLinks :links="listOfLinksData" />
            <h3>Horizontal (aligned left)</h3>
            <CmdListOfLinks orientation="horizontal" align="left" :links="listOfLinksData" />
            <h3>Horizontal (aligned center)</h3>
            <CmdListOfLinks orientation="horizontal" align="center" :links="listOfLinksData" />
            <h3>Horizontal (aligned right)</h3>
            <CmdListOfLinks orientation="horizontal" align="right" :links="listOfLinksData" />
        </CmdWidthLimitationWrapper>
        <!-- end list-of-links  ------------------------------------------------------------------------------------------------------------------------------------------------------->

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
                :items="4"
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
            <CmdSystemMessage validationStatus="error"
                              :fullWidth="true"
                              systemMessage="This is an error message!"
                              :iconMessage="{iconClass: 'icon-error-circle'}">
                <ul>
                    <li>Error #1</li>
                    <li>Error #2</li>
                    <li>Error #3</li>
                </ul>
            </CmdSystemMessage>
            <CmdSystemMessage validationStatus="warning"
                              :fullWidth="true"
                              systemMessage="This is a warning message!">
                <p>This is additional text!</p>
            </CmdSystemMessage>
            <CmdSystemMessage validationStatus="success"
                              :fullWidth="true"
                              systemMessage="This is a success message!"
                              :iconMessage="{iconClass: 'icon-check-circle'}">
                <p>This is additional text!</p>
            </CmdSystemMessage>
            <CmdSystemMessage validationStatus="info"
                              :fullWidth="true"
                              systemMessage="This is an info message!"
                              :iconMessage="{iconClass: 'icon-info-circle'}">
                <p>This is additional text!</p>
            </CmdSystemMessage>
        </CmdWidthLimitationWrapper>

        <a id="section-tables"></a>
        <CmdWidthLimitationWrapper>
            <h2 class="headline-demopage">Tables</h2>
            <h3>Table as wide as its content (with caption)</h3>
            <CmdTable :collapsible="true" :fullWidthOnDefault="false"  :userCanToggleWidth="true" :table-data="tableDataSmall"/>
            <h3>Table as wide as its content (without caption)</h3>
            <CmdTable :collapsible="true" :fullWidthOnDefault="false"  :userCanToggleWidth="true" :caption="{ text: 'Hidden caption', show: false}" :table-data="tableDataSmall"/>
            <h3>Table as wide as possible</h3>
            <CmdTable :collapsible="true" :fullWidthOnDefault="false" :userCanToggleWidth="true" :table-data="tableDataLarge"/>
        </CmdWidthLimitationWrapper>

        <a id="section-tabs"></a>
        <CmdWidthLimitationWrapper>
            <h2 class="headline-demopage">Tabs</h2>
            <h3>Tabs with content from json-file</h3>
            <CmdTabs :stretchTabs="false" :tabs="tabsData"/>
            <h3>Tabs with HTML-content (given by slot))</h3>
            <CmdTabs :stretchTabs="true" :tabs="[{name: 'Tab 1'}, {name: 'Tab 2'}, {name: 'Tab 3'}]" :useSlot="true">
                <template v-slot:tab-content-0>
                    <h4>Tab 1 headline</h4>
                    <p>Content</p>
                </template>
                <template v-slot:tab-content-1>
                    <h4>Tab 2</h4>
                    <p>Content</p>
                    <p>Content</p>
                </template>
                <template v-slot:tab-content-2>
                    <h4>Tab 3</h4>
                    <p>Content</p>
                    <p>Content</p>
                    <p>Content</p>
                </template>
            </CmdTabs>
        </CmdWidthLimitationWrapper>

        <a id="section-thumbnail-scroller"></a>
        <CmdWidthLimitationWrapper>
            <h2 class="headline-demopage">Thumbnail-Scroller</h2>
            <CmdThumbnailScroller :thumbnail-scroller-items="thumbnailScrollerData" />
        </CmdWidthLimitationWrapper>

        <a id="section-tooltip"></a>
        <CmdWidthLimitationWrapper>
            <h2 class="headline-demopage">Tooltip</h2>
            <p>
                <a href="#" @click.prevent id="hoverme">Hover me!</a><br />
                <a href="#" @click.prevent id="clickme" title="Native tooltip">Click me!</a>
            </p>
            <CmdTooltip related-id="hoverme">
                Tooltip for hover
            </CmdTooltip>
            <CmdTooltip related-id="clickme" :toggle-visibility-by-click="true">
                Tooltip for click
            </CmdTooltip>
        </CmdWidthLimitationWrapper>

        <a id="section-upload-form"></a>
        <CmdWidthLimitationWrapper>
            <h2 class="headline-demopage">Upload-Form</h2>
            <h3>Simple mode</h3>
            <CmdUploadForm :enableDragAndDrop="true"
                           :allowedFileExtensions="['jpg', 'png']"
                           :allowMultipleFileUploads="true"
                           :advancedMode="false"
                           textLegend="Simple upload form"
                           @error="showError"
                           :uploadOptions="{url: 'http://localhost:8888'}"
            />
            <h3>Advanced mode</h3>
            <CmdUploadForm :cmdCustomHeadlineFieldset="{headlineText: 'Select files to upload', headlineLevel: 3}"
                           :enableDragAndDrop="true"
                           :allowedFileExtensions="['jpg', 'png']"
                           :allowMultipleFileUploads="true"
                           textLegend="Advanced upload form"
                           :uploadOptions="{url: 'http://localhost:8888'}"
            />
        </CmdWidthLimitationWrapper>
    </main>

    <CmdWidthLimitationWrapper id="site-footer" inner-component="footer">
        <CmdSwitchLanguage :languages="languagesData" @click="doSomething"/>
        <CmdListOfLinks :links="listOfLinksData"
                        :cmdCustomHeadline="{headlineText: 'List of links', headlineLevel: 6}"
        />
        <CmdOpeningHours :openingHours="openingHoursData"
                         :closed="true"
                         :cmdCustomHeadline="{headlineText: 'Opening hours', headlineLevel: 6}"
                         textOpenClosed="Closed right now!"
                         textHolidaysClosed="Closed on holidays"
                         textMiscInfo="Miscellaneous information"
        />
        <CmdAddressData :addressData="addressData"
                        :linkGoogleMaps="true"
                        :cmdCustomHeadline="{headlineText: 'Address data', headlineLevel: 6}"
        />
    </CmdWidthLimitationWrapper>

    <CmdCopyrightInformation/>

    <CmdFancyBox :show="fancyBoxCookieDisclaimer" :fancyboxOptions="{}" :allowEscapeKey="false">
        <CmdCookieDisclaimer :cookieOptions="cookieDisclaimerData"
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
import addressData from '@/assets/data/address-data.json'
import bankAccountData from '@/assets/data/bank-account-data.json'
import boxUserData from '@/assets/data/box-user.json'
import boxProductData from '@/assets/data/box-product.json'
import breadcrumbData from '@/assets/data/breadcrumbs.json'
import companyLogoData from '@/assets/data/company-logo.json'
import cookieDisclaimerData from '@/assets/data/cookie-disclaimer.json'
import fakeSelectColorsData from '@/assets/data/fake-select-colors.json'
import fakeSelectCountriesData from '@/assets/data/fake-select-countries.json'
import fakeSelectFilterOptionsData from '@/assets/data/fake-select-filter-options.json'
import fakeSelectOptionsData from '@/assets/data/fake-select-options.json'
import fakeSelectOptionsWithIconsData from '@/assets/data/fake-select-options-with-icons.json'
import listOfLinksData from '@/assets/data/list-of-links.json'
import imageGalleryData from '@/assets/data/image-gallery.json'
import languagesData from '@/assets/data/switch-language.json'
import multistepsData from '@/assets/data/multistep-form-progress-bar.json'
import multipleSwitchCheckboxData from '@/assets/data/multipleswitch-checkbox.json'
import multipleSwitchRadioData from '@/assets/data/multipleswitch-radio.json'
import navigationData from '@/assets/data/main-navigation.json'
import openingHoursData from '@/assets/data/opening-hours.json'
import selectOptionsData from '@/assets/data/select-options.json'
import shareButtonsData from '@/assets/data/share-buttons-page-by-json.json'
import slideshowData from '@/assets/data/slideshow.json'
import tabsData from '@/assets/data/tabs.json'
import tableDataSmall from '@/assets/data/table-small.json'
import tableDataLarge from '@/assets/data/table-large.json'
import thumbnailScrollerData from '@/assets/data/thumbnail-scroller.json'

// import used components
import CmdAddressData from "@/components/CmdAddressData"
import CmdBackToTopButton from "@/components/CmdBackToTopButton.vue"
import CmdBankAccountData from "./components/CmdBankAccountData"
import CmdBox from "@/components/CmdBox.vue"
import CmdBoxSiteSearch from "@/components/CmdBoxSiteSearch.vue"
import CmdBreadcrumbs from "@/components/CmdBreadcrumbs.vue"
import CmdCompanyLogo from "@/components/CmdCompanyLogo.vue"
import CmdCopyrightInformation from "@/components/CmdCopyrightInformation.vue"
import CmdCookieDisclaimer from "@/components/CmdCookieDisclaimer.vue"
import CmdCustomHeadline from "@/components/CmdCustomHeadline.vue"
import CmdFakeSelect from "@/components/CmdFakeSelect.vue"
import CmdFancyBox from "@/components/CmdFancyBox.vue"
import CmdForm from "@/components/CmdForm.vue"
import CmdFormElement from "@/components/CmdFormElement.vue"
import CmdFormFilters from "@/components/CmdFormFilters.vue"
import CmdGoogleMaps from "./components/CmdGoogleMaps"
import CmdImageGallery from "@/components/CmdImageGallery.vue"
import CmdImageZoom from "@/components/CmdImageZoom.vue"
import CmdInputGroup from "./components/CmdInputGroup"
import CmdLoginForm from "@/components/CmdLoginForm.vue"
import CmdListOfLinks from "./components/CmdListOfLinks"
import CmdMainNavigation from "@/components/CmdMainNavigation.vue"
import CmdMultipleSwitch from "@/components/CmdMultipleSwitch.vue"
import CmdMultistepFormProgressBar from "@/components/CmdMultistepFormProgressBar.vue"
import CmdOpeningHours from "@/components/CmdOpeningHours"
import CmdPager from "@/components/CmdPager.vue"
import CmdProgressBar from "@/components/CmdProgressBar.vue"
import CmdShareButtons from "@/components/CmdShareButtons.vue"
import CmdSiteHeader from "./components/CmdSiteHeader"
import CmdSlideshow from "@/components/CmdSlideshow.vue"
import CmdSwitchLanguage from "@/components/CmdSwitchLanguage.vue"
import CmdSystemMessage from "@/components/CmdSystemMessage.vue"
import CmdTabs from "@/components/CmdTabs.vue"
import CmdTable from "@/components/CmdTable.vue"
import CmdThumbnailScroller from "@/components/CmdThumbnailScroller.vue"
import CmdToggleDarkMode from "@/components/CmdToggleDarkMode.vue"
import CmdTooltip from "@/components/CmdTooltip.vue"
import CmdUploadForm from "@/components/CmdUploadForm.vue"
import CmdWidthLimitationWrapper from "@/components/CmdWidthLimitationWrapper"
import {openFancyBox} from "@/components/CmdFancyBox"

// import external functions
import * as functions from "@/mixins/FieldValidation.js"

export default {
    name: "App",
    components: {
        CmdListOfLinks,
        CmdAddressData,
        CmdBackToTopButton,
        CmdBankAccountData,
        CmdBox,
        CmdBoxSiteSearch,
        CmdBreadcrumbs,
        CmdCompanyLogo,
        CmdCopyrightInformation,
        CmdCookieDisclaimer,
        CmdCustomHeadline,
        CmdFakeSelect,
        CmdFancyBox,
        CmdForm,
        CmdFormFilters,
        CmdFormElement,
        CmdGoogleMaps,
        CmdImageGallery,
        CmdImageZoom,
        CmdInputGroup,
        CmdLoginForm,
        CmdMainNavigation,
        CmdMultistepFormProgressBar,
        CmdMultipleSwitch,
        CmdOpeningHours,
        CmdPager,
        CmdProgressBar,
        CmdShareButtons,
        CmdSiteHeader,
        CmdSlideshow,
        CmdSwitchLanguage,
        CmdSystemMessage,
        CmdTabs,
        CmdTable,
        CmdThumbnailScroller,
        CmdToggleDarkMode,
        CmdTooltip,
        CmdUploadForm,
        CmdWidthLimitationWrapper
    },

    data() {
        return {
            showTooltip: false,
            inputFieldPattern: "",
            inputSearch: "",
            textarea: "",
            inputNumber: "",
            inputDate: "",
            accordionGroupOpen: false,
            showPageMultistep: 1,
            showPagePager: 1,
            selectedOption: "",
            selectedOptions: [],
            selectedCountry: "de",
            selectedColor: "",
            rangeValue: 50,
            loginData: {},
            formElementStatus: "",
            switchButtonRadio: "radio1",
            switchButtonCheckbox: ["checkbox1"],
            switchButtonCheckboxColored: false,
            inputUsername: "",
            inputPassword: "",
            inputField1: "",
            inputFieldRequired: "",
            checkboxValue: true,
            checkboxRequiredValue: false,
            checkboxValues: ["checkboxValue1"],
            replacedCheckboxValue: "checkboxValue1",
            radiobuttonValue: "radiobuttonValue1",
            replacedRadiobuttonValue: "radiobuttonValue1",
            multipleSwitchCheckbox: ['b'],
            multipleSwitchRadio: 'c',
            fancyBoxCookieDisclaimer: false,
            fakeSelectDefault: "2",
            fakeSelectDefaultWithIcons: "1",
            fakeSelectCheckbox: [1],
            fakeSelectFilters: [],
            datalist: {
                id: "datalist-id",
                options: [
                    "Option 1",
                    "Option 2",
                    "Option 3"
                ]
            },
            customRequirements: [
                functions.validateCharacters(),
                functions.validateNumbers(),
                functions.validateNumbersOnly(),
                functions.validateSpecialCharacters(),
                functions.validateCapitalLetters()
            ],

            // assign data from json files to data-properties
            accordionData,
            addressData,
            bankAccountData,
            boxProductData,
            boxUserData,
            breadcrumbData,
            companyLogoData,
            cookieDisclaimerData,
            fakeSelectColorsData,
            fakeSelectCountriesData,
            fakeSelectFilterOptionsData,
            fakeSelectOptionsData,
            fakeSelectOptionsWithIconsData,
            listOfLinksData,
            imageGalleryData,
            languagesData,
            multistepsData,
            multipleSwitchCheckboxData,
            multipleSwitchRadioData,
            navigationData,
            openingHoursData,
            selectOptionsData,
            shareButtonsData,
            slideshowData,
            tableDataSmall,
            tableDataLarge,
            tabsData,
            thumbnailScrollerData
        }
    },
    methods: {
        showError(event) {
            console.log("EventMessages", event.messages)
            alert("Error")
        },
        showFancyBox(type, content, altText) {
            if (type === 'text') {
                openFancyBox({content: content})
            } else if (type === 'image') {
                openFancyBox({url: content, altText: altText})
            }
        },
        getOptionName(option) {
            for (let i = 0; i < this.fakeSelectFilterOptionsData.length; i++) {
                if (option === this.fakeSelectFilterOptionsData[i].value) {
                    return this.fakeSelectFilterOptionsData[i].text
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
            if (this.accordionGroupOpen) {
                this.$refs.accordionGroup1.closeAll()
            } else {
                this.$refs.accordionGroup1.openAll()
            }
            this.accordionGroupOpen = !this.accordionGroupOpen
        },
        switchButtonChange() {
            alert("Changed")
        }
    }
}
</script>

<style lang="scss">
.list-status {
    .active {
        color: var(--default-color);
        text-decoration: none;
    }
}
</style>