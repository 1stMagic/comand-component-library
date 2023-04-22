<!--suppress HtmlUnknownTarget, NpmUsedModulesInstalled, JSUnresolvedVariable -->
<template>
    <div id="page-wrapper">
        <a id="anchor-back-to-top"></a>
        <!-- begin site-header --------------------------------------------------------------------------------------------------------------------------------------------------->
        <CmdSiteHeader :sticky="true">
            <template v-slot:top-header>
                <!-- begin list-of-links --------------------------------------------------------------------------------------------------------------------------------------------------->
                <CmdListOfLinks
                    :links="listOfLinksData"
                    orientation="horizontal"
                    align="right"
                />
                <!-- end list-of-links --------------------------------------------------------------------------------------------------------------------------------------------------->
            </template>
            <template v-slot:logo>
                <!-- begin company-logo --------------------------------------------------------------------------------------------------------------------------------------------------->
                <CmdCompanyLogo
                    :link="companyLogoData.link"
                    altText="CoManD Logo"
                    :pathDefaultLogo="companyLogoData.pathDefaultLogo"
                    :pathDarkmodeLogo="companyLogoData.pathDarkmodeLogo"
                />
                <!-- end company-logo --------------------------------------------------------------------------------------------------------------------------------------------------->
            </template>
        </CmdSiteHeader>
        <!-- end site-header --------------------------------------------------------------------------------------------------------------------------------------------------->
        <main>
            <!-- begin width-limitation-wrapper (with table of contents) --------------------------------------------------------------------------------------------------------------------------------------------------->
            <CmdWidthLimitationWrapper :cmdHeadline="{headlineText: 'Table of contents', headlineLevel: 2}">
                <div class="flex-container">
                    <ul>
                        <li><a href="#section-advanced-form-elements">Advanced Form Elements</a></li>
                        <li><a href="#section-bank-account-data">Bank Account Data</a></li>
                        <li><a href="#section-boxes">Boxes</a></li>
                        <li><a href="#section-breadcrumbs">Breadcrumbs</a></li>
                        <li><a href="#section-cookie-disclaimer">Cookie-Disclaimer</a></li>
                        <li><a href="#section-headlines">Headlines</a></li>
                        <li><a href="#section-fancybox">Fancybox</a></li>
                    </ul>
                    <ul>
                        <li><a href="#section-google-maps">Google-Maps&trade;</a></li>
                        <li><a href="#section-icons">Icons</a></li>
                        <li><a href="#section-image">Image</a></li>
                        <li><a href="#section-image-gallery">Image Gallery</a></li>
                        <li><a href="#section-image-zoom">Image-Zoom</a></li>
                        <li><a href="#section-list-of-links">List Of Links</a></li>
                        <li><a href="#section-login-form">Login Form</a></li>
                    </ul>
                    <ul>
                        <li><a href="#section-main-navigation">Main-Navigation</a></li>
                        <li><a href="#section-multistep-form-progress-bar">Multistepform-Progressbar</a></li>
                        <li><a href="#section-pager">Pager</a></li>
                        <li><a href="#section-social-networks">Social Networks</a></li>
                        <li><a href="#section-site-header">Site Header</a></li>
                        <li><a href="#section-site-search">Site Search</a></li>
                        <li><a href="#section-slideshow">Slideshow</a></li>
                    </ul>
                    <ul>
                        <li><a href="#section-system-message">System-Message</a></li>
                        <li><a href="#section-tables">Tables</a></li>
                        <li><a href="#section-tabs">Tabs</a></li>
                        <li><a href="#section-thumbnail-scroller">Thumbnail-Scroller</a></li>
                        <li><a href="#section-toggle-darkmode">ToggleDarkMode</a></li>
                        <li><a href="#section-tooltip">Tooltip</a></li>
                        <li><a href="#section-upload-form">Upload-Form</a></li>
                    </ul>
                </div>
            </CmdWidthLimitationWrapper>
            <!-- end width-limitation-wrapper (with table of contents) --------------------------------------------------------------------------------------------------------------------------------------------------->

            <!-- begin address-data ------------------------------------------------------------------------------------------------------------------------------------------------------->
            <a id="section-advanced-form-elements"></a>
            <CmdWidthLimitationWrapper>
                <h2 class="headline-demopage">Address Data</h2>
                <div class="flex-container">
                    <CmdAddressData
                        :addressData="addressData"
                        :linkGoogleMaps="false"
                        :cmdHeadline="{headlineText: 'With label texts and icons', headlineLevel: 3}"
                    />
                    <CmdAddressData
                        :addressData="addressData"
                        :linkGoogleMaps="false"
                        :show-label-texts="false"
                        :cmdHeadline="{headlineText: 'With label icons only', headlineLevel: 3}"
                    />
                    <CmdAddressData
                        :addressData="addressData"
                        :linkGoogleMaps="false"
                        :show-label-icons="false"
                        :cmdHeadline="{headlineText: 'With label texts', headlineLevel: 3}"
                    />
                    <CmdAddressData
                        :addressData="addressData"
                        :linkGoogleMaps="false"
                        :showLabels="false"
                        :cmdHeadline="{headlineText: 'Without labels', headlineLevel: 3}"
                    />
                    <CmdAddressData
                        :addressData="addressData"
                        :linkGoogleMaps="true"
                        :showIconsOnly="true"
                        :cmdHeadline="{headlineText: 'Linked icons only', headlineLevel: 3}"
                    />
                </div>
            </CmdWidthLimitationWrapper>
            <!-- end address-data ------------------------------------------------------------------------------------------------------------------------------------------------------->

            <!-- begin advanced form elements --------------------------------------------------------------------------------------------------------------------------------------------------->
            <a id="section-advanced-form-elements"></a>
            <CmdWidthLimitationWrapper>
                <a id="anchor-advanced-form-elements"></a>
                <h2 class="headline-demopage">Advanced Form Elements</h2>
                <h3>Form elements status:</h3>
                <div class="flex-container">
                    <ul class="list-status">
                        <li><a href="#" @click.prevent="setStatus('', false)" :class="{'active' : validationStatus === '' && disabledStatus === false}"
                               id="status-default">Default</a></li>
                        <li class="error">
                            <a href="#" @click.prevent="setStatus('error', false)"
                               :class="{'active' : validationStatus === 'error'}" id="status-error">Error</a></li>
                        <li><a href="#" @click.prevent="setStatus('warning', false)"
                               :class="{'active' : validationStatus === 'warning'}" id="status-warning">Warning</a></li>
                        <li><a href="#" @click.prevent="setStatus('success', false)"
                               :class="{'active' : validationStatus === 'success'}" id="status-success">Success</a></li>
                        <li><a href="#" @click.prevent="setStatus('info', false)"
                               :class="{'active' : validationStatus === 'info'}" id="status-info">Info</a></li>
                        <li><a href="#" @click.prevent="setStatus('', true)"
                               :class="{'active' : disabledStatus === true}" id="status-disabled">Disabled</a></li>
                    </ul>
                </div>

                <!-- begin cmd-form-filters -->
                <CmdFormFilters v-model="fakeSelectFilters" :selectedOptionsName="getOptionName"/>
                <!-- end cmd-form-filters -->

                <CmdForm :use-fieldset="false" id="advanced-form-elements" novalidate="novalidate">
                    <fieldset class="grid-container-create-columns">
                        <legend>Legend</legend>
                        <h2>Form Element-Component</h2>
                        <div class="flex-container">
                            <CmdFormElement labelText="Input (type text):"
                                            element="input"
                                            type="text"
                                            :status="validationStatus"
                                            :disabled="disabledStatus"
                                            placeholder="Type in text"
                                            tooltipText="This is a tooltip"
                                            v-bind="{useCustomTooltip: false}"
                            />
                            <CmdFormElement labelText="Input for selectbox:"
                                            element="select"
                                            required="required"
                                            :status="validationStatus"
                                            :disabled="disabledStatus"
                                            v-model="selectedOption"
                                            :selectOptions="selectOptionsData"
                            />
                            <CmdFormElement labelText="Input for datalist:"
                                            element="input"
                                            type="text"
                                            :status="validationStatus"
                                            :disabled="disabledStatus"
                                            placeholder="Type in option"
                                            :datalist="datalist"
                                            tooltipText="This is a tooltip"
                            />
                        </div>
                        <CmdFormElement labelText="Input (type search (without search-button)):"
                                        element="input"
                                        type="search"
                                        :status="validationStatus"
                                        :disabled="disabledStatus"
                                        :showSearchButton="false"
                                        placeholder="Search"
                                        tooltipText="This is a tooltip"
                                        v-bind="{useCustomTooltip: false}"
                        />
                        <CmdFormElement labelText="Input (type search (with search-button)):"
                                        element="input"
                                        type="search"
                                        :status="validationStatus"
                                        :disabled="disabledStatus"
                                        placeholder="Search"
                                        tooltipText="This is a tooltip"
                                        v-bind="{useCustomTooltip: false}"
                        />
                        <h2>Inputfields in Columns</h2>
                        <div class="flex-container">
                            <CmdFormElement element="input"
                                            type="text"
                                            minlength="5"
                                            id="inputfield1"
                                            placeholder="This is placeholder text"
                                            v-model="inputField1"
                                            tooltipText="This is a tooltip!"
                                            :status="validationStatus"
                                            :disabled="disabledStatus">
                                <template v-slot:labeltext>
                                    <span v-html="'Label with <a href=\'#\'>Link</a> given by slot'"></span>
                                </template>
                            </CmdFormElement>
                            <CmdFormElement element="input"
                                            labelText="Label for inputfield (required, with tooltip):"
                                            type="text"
                                            required="required"
                                            minlength="5"
                                            id="inputfield-required"
                                            placeholder="This is placeholder text"
                                            v-model="inputFieldRequired"
                                            tooltipText="This is a tooltip!"
                                            :status="validationStatus"
                                            :disabled="disabledStatus"
                            />
                            <CmdFormElement element="input"
                                            labelText="Label for inputfield (with pattern):"
                                            type="text"
                                            id="inputfield-pattern"
                                            placeholder="This is placeholder text"
                                            pattern="/\d/"
                                            v-model="inputFieldPattern"
                                            tooltipText="This is a tooltip!"
                                            :status="validationStatus"
                                            :disabled="disabledStatus"
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
                                            :status="validationStatus"
                                            :disabled="disabledStatus"
                            />
                            <CmdFormElement element="input"
                                            labelText="Label for password-field:"
                                            type="password"
                                            minlength="8"
                                            maxlength="255"
                                            id="inputfield-password"
                                            fieldIconClass="icon-security-settings"
                                            placeholder="Type in password"
                                            tooltipText="This is a tooltip!"
                                            :customRequirements="customRequirements"
                                            v-model="inputPassword"
                                            :status="validationStatus"
                                            :disabled="disabledStatus"
                            />
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
                                        :status="validationStatus"
                                        :disabled="disabledStatus"
                        />
                        <CmdFormElement element="input"
                                        labelText="Label (inline) for inputfield (date):"
                                        :displayLabelInline="true"
                                        type="date"
                                        id="inputfield-date"
                                        v-model="inputDate"
                                        :status="validationStatus"
                                        :disabled="disabledStatus"
                        />
                        <CmdFormElement element="input"
                                        labelText="Label (inline) for inputfield (search) without search-button:"
                                        :displayLabelInline="true"
                                        type="search"
                                        id="inputfield-search-without-searchbutton"
                                        placeholder="Keyword(s)"
                                        v-model="inputSearch"
                                        :showSearchButton="false"
                                        :status="validationStatus"
                                        :disabled="disabledStatus"
                        />
                        <CmdFormElement element="input"
                                        labelText="Label (inline) for inputfield (search):"
                                        :displayLabelInline="true"
                                        type="search"
                                        id="inputfield-search-with-searchbutton"
                                        placeholder="Keyword(s)"
                                        v-model="inputSearch"
                                        :status="validationStatus"
                                        :disabled="disabledStatus"
                        />
                        <CmdFormElement element="textarea"
                                        labelText="Label for textarea:"
                                        id="textarea"
                                        minlength="1"
                                        maxlength="100"
                                        placeholder="Type in your message"
                                        v-model="textarea"
                                        :status="validationStatus"
                                        :disabled="disabledStatus"
                        />
                        <hr/>
                        <h2>Fake Selects</h2>
                        <div class="flex-container">
                            <!-- type === default: normal selectbox (with optional icons) -->
                            <CmdFakeSelect labelText="Default selectbox:"
                                           :status="validationStatus"
                                           :disabled="disabledStatus"
                                           :selectData="fakeSelectOptionsData"
                                           v-model="fakeSelectDefault"
                                           :required="true"
                                           defaultOptionName="Select an option:"
                                           title="Title for FakeSelect"
                            />
                            <CmdFakeSelect labelText="Default selectbox with icons:"
                                           :status="validationStatus"
                                           :disabled="disabledStatus"
                                           :selectData="fakeSelectOptionsWithIconsData"
                                           v-model="fakeSelectDefaultWithIcons"
                                           defaultOptionName="Select an option:"
                            />
                            <!-- type === checkboxOptions: selectbox with checkboxes for each option -->
                            <CmdFakeSelect labelText="Selectbox with checkboxes:"
                                           :status="validationStatus"
                                           :disabled="disabledStatus"
                                           :selectData="fakeSelectOptionsData"
                                           v-model="fakeSelectCheckbox"
                                           defaultOptionName="Options:"
                                           :required="true"
                                           id="selectbox-with-checkboxes"
                                           type="checkboxOptions"
                                           :useCustomTooltip="true"
                            />
                            <CmdFakeSelect labelText="Selectbox with filters:"
                                           :status="validationStatus"
                                           :disabled="disabledStatus"
                                           :selectData="fakeSelectFilterOptionsData"
                                           v-model="fakeSelectFilters"
                                           defaultOptionName="Filters:"
                                           id="selectbox-with-filters"
                                           type="checkboxOptions"
                                           :useCustomTooltip="true"
                            />
                            <CmdFakeSelect labelText="Selectbox with slot-content:"
                                           :status="validationStatus"
                                           :disabled="disabledStatus"
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
                                           :status="validationStatus"
                                           :disabled="disabledStatus"
                                           :selectData="fakeSelectCountriesData"
                                           v-model="selectedCountry"
                                           defaultOptionName="Select country:"
                                           type="country"
                            />
                            <CmdFakeSelect labelText="Selectbox with colors:"
                                           :status="validationStatus"
                                           :disabled="disabledStatus"
                                           :selectData="fakeSelectColorsData"
                                           v-model="selectedColor"
                                           required="required"
                                           type="color"
                            />
                        </div>

                        <hr/>

                        <!-- begin progress bar -->
                        <h2>Progress Bar [native]</h2>
                        <CmdProgressBar labelText="Progress Bar (with optional output):" id="progress-bar2" max="100"/>
                        <!-- end progress bar -->

                        <!-- begin slider -->
                        <h2>Slider [native]</h2>
                        <div class="label" :class="validationStatus">
                            <span class="label-text">Single-Slider (with in- and output):</span>
                            <span class="flex-container no-flex">
                            <label for="range-value">
                                <span class="label-text">
                                    <span>Range Value</span>
                                </span>
                                <input
                                    type="number"
                                    :class="validationStatus"
                                    v-model="rangeValue"
                                    :disabled="disabledStatus"
                                    min="0"
                                    max="100"
                                    id="range-value"
                                />
                            </label>
                            <label for="range-slider">
                                <span class="label-text hidden">
                                    <span>Range Value</span>
                                </span>
                                <input
                                    type="range"
                                    class="range-slider"
                                    id="range-slider"
                                    v-model="rangeValue"
                                    :disabled="disabledStatus"
                                    min="0"
                                    max="100"
                                />
                            </label>
                        </span>
                        </div>
                        <!-- end slider -->

                        <hr/>

                        <!-- begin toggle-switch-radio with switch-label (colored) -->
                        <h2>Toggle-Switches</h2>
                        <CmdFormElement element="input"
                                        type="checkbox"
                                        id="toggle-switch-checkbox"
                                        v-model="switchButtonCheckboxToggleSwitch"
                                        labelText="Labeltext for Toggle-Switch without Switch-Label"
                                        :toggleSwitch="true"
                                        :status="validationStatus"
                                        :disabled="disabledStatus"
                        />
                        <CmdFormElement element="input"
                                        type="checkbox"
                                        id="toggle-switch-checkbox"
                                        v-model="switchButtonCheckbox"
                                        labelText="Labeltext for Toggle-Switch with Switch-Label"
                                        inputValue="checkbox1"
                                        onLabel="Label on"
                                        offLabel="Label off"
                                        :toggleSwitch="true"
                                        :status="validationStatus"
                                        :disabled="disabledStatus"
                        />
                        <CmdFormElement element="input"
                                        type="checkbox"
                                        id="toggle-switch-checkbox-colored"
                                        v-model="switchButtonCheckbox"
                                        inputValue="checkbox2"
                                        labelText="Labeltext for Toggle-Switch (Checkbox, colored)"
                                        onLabel="Label on"
                                        offLabel="Label off"
                                        :colored="true"
                                        :toggleSwitch="true"
                                        :status="validationStatus"
                                        :disabled="disabledStatus"
                        />
                        <CmdFormElement element="input"
                                        type="radio"
                                        name="radiogroup"
                                        id="toggle-switch-radio1"
                                        v-model="switchButtonRadio"
                                        onLabel="Label on"
                                        offLabel="Label off"
                                        :colored="true"
                                        :toggleSwitch="true"
                                        :status="validationStatus"
                                        :disabled="disabledStatus"
                                        inputValue="radio1"
                                        labelText="Labeltext for Toggle-Switch (Radio, colored) #1"
                        />
                        <CmdFormElement element="input"
                                        type="radio"
                                        name="radiogroup"
                                        id="toggle-switch-radio2"
                                        v-model="switchButtonRadio"
                                        onLabel="Label on"
                                        offLabel="Label off"
                                        :colored="true"
                                        :toggleSwitch="true"
                                        :status="validationStatus"
                                        :disabled="disabledStatus"
                                        inputValue="radio2"
                                        labelText="Labeltext for Toggle-Switch (Radio, colored) #2"
                        />
                        <!-- end toggle-switch-radio with switch-label (colored) -->

                        <!-- begin checkboxes and radiobuttons -->
                        <CmdFormElement element="input"
                                        labelText="Label for (required) checkbox with boolean"
                                        type="checkbox"
                                        required="required"
                                        id="checkbox-required-with-boolean"
                                        v-model="checkboxRequiredValue"
                                        :status="validationStatus"
                                        :disabled="disabledStatus"
                        />
                        <p>
                            checkbox (required) with boolean: {{ checkboxRequiredValue }}<br/>
                            checkbox with boolean: {{ checkboxValue }}<br/>
                            checkboxes with values: {{ checkboxValues }}
                        </p>

                        <h3>Toggle Dark-Mode</h3>
                        <a id="section-toggle-darkmode"></a>
                        <h4>Toggle Dark-Mode (with label, not styled)</h4>
                        <CmdToggleDarkMode :showLabel="true"/>
                        <h4>Toggle Dark-Mode (without label, styled)</h4>
                        <CmdToggleDarkMode :showLabel="false" :use-styled-layout="true"/>
                        <h4>Toggle Dark-Mode (styled as button)</h4>
                        <CmdToggleDarkMode :styledAsButton="true"/>

                        <h2>Checkboxes and Radiobuttons</h2>
                        <h3>Checkboxes [native]</h3>
                        <div class="label inline">
                            <span class="label-text">Label for native checkboxes:</span>
                            <div class="flex-container no-flex">
                                <CmdFormElement element="input"
                                                labelText="Label for checkbox with boolean"
                                                type="checkbox"
                                                id="checkbox-with-boolean"
                                                v-model="checkboxValue"
                                                :status="validationStatus"
                                                :disabled="disabledStatus"
                                />
                                <CmdFormElement element="input"
                                                labelText="Label for checkbox with value"
                                                v-model="checkboxValues"
                                                inputValue="checkboxValue1"
                                                type="checkbox"
                                                id="checkbox-with-value-1"
                                                :status="validationStatus"
                                                :disabled="disabledStatus"
                                />
                                <CmdFormElement element="input"
                                                labelText="Label for checkbox with value"
                                                v-model="checkboxValues"
                                                inputValue="checkboxValue2"
                                                type="checkbox"
                                                id="checkbox-with-value-2"
                                                :status="validationStatus"
                                                :disabled="disabledStatus"
                                />
                                <CmdFormElement element="input"
                                                v-model="checkboxValues"
                                                inputValue="checkboxValue3"
                                                type="checkbox"
                                                id="checkbox-with-value-3"
                                                :status="validationStatus"
                                                :disabled="disabledStatus">
                                    <template v-slot:labeltext>
                                        Labeltext with <a href="#">link</a> given by slot
                                    </template>
                                </CmdFormElement>
                            </div>
                        </div>
                        <h3>Checkboxes (replaced)</h3>
                        <div class="label inline">
                            <span class="label-text">Label for Replaced Input-Type-Checkbox:</span>
                            <div class="flex-container no-flex">
                                <CmdFormElement element="input"
                                                labelText="Label for replaced checkbox"
                                                type="checkbox"
                                                :replaceInputType="true"
                                                id="inputfield9"
                                                v-model="replacedCheckboxValue"
                                                inputValue="checkboxValue1"
                                                :status="validationStatus"
                                                :disabled="disabledStatus"
                                />
                                <CmdFormElement element="input"
                                                labelText="Label for replaced checkbox"
                                                v-model="replacedCheckboxValue"
                                                inputValue="checkboxValue2"
                                                type="checkbox"
                                                :replaceInputType="true"
                                                id="inputfield10"
                                                :status="validationStatus"
                                                :disabled="disabledStatus"
                                />
                            </div>
                        </div>
                        <h3>Radiobuttons [native]</h3>
                        <div class="label inline">
                            <span class="label-text">Label for native radiobuttons:</span>
                            <div class="flex-container no-flex">
                                <CmdFormElement element="input"
                                                labelText="Label for native radiobutton"
                                                type="radio"
                                                id="inputfield11"
                                                name="radiogroup"
                                                inputValue="radiobuttonValue1"
                                                v-model="radiobuttonValue"
                                                :status="validationStatus"
                                                :disabled="disabledStatus"
                                />
                                <CmdFormElement element="input"
                                                labelText="Label for native radiobutton"
                                                type="radio"
                                                id="inputfield12"
                                                name="radiogroup"
                                                inputValue="radiobuttonValue2"
                                                v-model="radiobuttonValue"
                                                :status="validationStatus"
                                                :disabled="disabledStatus"
                                />
                            </div>
                        </div>
                        <p>
                            Radiobuttons with values: {{ radiobuttonValue }}
                        </p>
                        <h3>Radiobuttons (replaced)</h3>
                        <div class="label inline">
                            <span class="label-text">Label for Replaced Input-Type-Radio:</span>
                            <div class="flex-container no-flex">
                                <CmdFormElement element="input"
                                                labelText="Label for replaced radiobutton"
                                                type="radio"
                                                :replaceInputType="true"
                                                id="inputfield13"
                                                name="replaced-radiogroup"
                                                inputValue="radiobuttonValue1"
                                                v-model="replacedRadiobuttonValue"
                                                :status="validationStatus"
                                                :disabled="disabledStatus"
                                />
                                <CmdFormElement element="input"
                                                labelText="Label for replaced radiobutton"
                                                type="radio"
                                                :replaceInputType="true"
                                                id="inputfield14"
                                                name="replaced-radiogroup"
                                                inputValue="radiobuttonValue2"
                                                v-model="replacedRadiobuttonValue"
                                                :status="validationStatus"
                                                :disabled="disabledStatus"
                                />
                            </div>
                        </div>
                        <!-- end checkboxes and radiobuttons -->

                        <!-- begin input-groups -->
                        <h2>Input-Groups</h2>
                        <h3>Input Group with Radiobuttons [native]</h3>
                        <CmdInputGroup
                            labelText="Group label for radio-group given by slot:"
                            :useSlot="true"
                            :status="validationStatus"
                            :disabled="disabledStatus"
                        >
                            <CmdFormElement element="input"
                                            labelText="Label for radiobutton"
                                            type="radio"
                                            id="input-group-radiobutton"
                                            name="radiogroup2"
                                            inputValue="radiobuttonValue1"
                                            v-model="inputGroupRadio"
                                            :status="validationStatus"
                                            :disabled="disabledStatus"
                            />
                            <CmdFormElement element="input"
                                            labelText="Label for radiobutton"
                                            type="radio"
                                            id="input-group-radiobutton"
                                            name="radiogroup2"
                                            inputValue="radiobuttonValue2"
                                            v-model="inputGroupRadio"
                                            :status="validationStatus"
                                            :disabled="disabledStatus"
                            />
                        </CmdInputGroup>
                        <dl>
                            <dt>Selected value(s):</dt>
                            <dd>
                                <output>{{ inputGroupRadio }}</output>
                            </dd>
                        </dl>
                        <CmdInputGroup
                            labelText="Grouplabel for radio-group given by property:"
                            :required="true"
                            :inputElements="idForReplacedInputsInInputGroup('radio-group')"
                            inputTypes="radio"
                            v-model="inputGroupCheckbox"
                            :status="validationStatus"
                            :disabled="disabledStatus"
                        />
                        <dl>
                            <dt>Selected value:</dt>
                            <dd>
                                <output>{{ inputGroupCheckbox }}</output>
                            </dd>
                        </dl>
                        <h3>Input Group with Checkboxes/Radiobuttons (replaced)</h3>
                        <CmdInputGroup
                            labelText="Grouplabel for radio-group styled as replaced-input-type:"
                            :inputElements="idForReplacedInputsInInputGroup('replaced-radio-group')"
                            inputTypes="radio"
                            v-model="inputGroupValueReplaceInputTypeRadio"
                            :replaceInputType="true"
                            :status="validationStatus"
                            :disabled="disabledStatus"
                        />
                        <dl>
                            <dt>Selected value:</dt>
                            <dd>
                                <output>{{ inputGroupValueReplaceInputTypeRadio }}</output>
                            </dd>
                        </dl>
                        <CmdInputGroup
                            labelText="Grouplabel for checkbox-group styled as replaced-input-type:"
                            :inputElements="idForReplacedInputsInInputGroup('checkbox-group')"
                            inputTypes="checkbox"
                            v-model="inputGroupValueReplaceInputTypeCheckbox"
                            :replaceInputType="true"
                            :required="true"
                            :status="validationStatus"
                            :disabled="disabledStatus"
                        />
                        <dl>
                            <dt>Selected value(s):</dt>
                            <dd>
                                <output>{{ inputGroupValueReplaceInputTypeCheckbox }}</output>
                            </dd>
                        </dl>
                        <h3>Input Groups with Checkboxes/
                            Radiobuttons (toggle-switches)</h3>
                        <CmdInputGroup
                            labelText="Grouplabel for checkbox-group styled as toggle-switches:"
                            :inputElements="idForReplacedInputsInInputGroup('checkbox-group-toggle-switch')"
                            inputTypes="checkbox"
                            v-model="inputGroupValueToggleSwitchCheckbox"
                            :toggleSwitch="true"
                            required="required"
                            :status="validationStatus"
                            :disabled="disabledStatus"
                        />
                        <dl>
                            <dt>Selected value(s):</dt>
                            <dd>
                                <output>{{ inputGroupValueToggleSwitchCheckbox }}</output>
                            </dd>
                        </dl>
                        <CmdInputGroup
                            labelText="Grouplabel for radio-group styled as toggle-switches:"
                            :inputElements="idForReplacedInputsInInputGroup('radio-group-toggle-switch')"
                            inputTypes="radio"
                            v-model="inputGroupValueToggleSwitchRadio"
                            :toggleSwitch="true"
                            required="required"
                            :status="validationStatus"
                            :disabled="disabledStatus"
                        />
                        <dl>
                            <dt>Selected value(s):</dt>
                            <dd>
                                <output>{{ inputGroupValueToggleSwitchRadio }}</output>
                            </dd>
                        </dl>
                        <CmdInputGroup
                            labelText="Grouplabel for radio-group given by property styled as multiple-switch:"
                            :inputElements="idForReplacedInputsInInputGroup('radio-group-multiple-switch')"
                            inputTypes="radio"
                            :multipleSwitch="true"
                            v-model="inputGroupValue3"
                            :status="validationStatus"
                            :disabled="disabledStatus"
                        />
                        <dl>
                            <dt>Selected value(s):</dt>
                            <dd>
                                <output>{{ inputGroupValue3 }}</output>
                            </dd>
                        </dl>
                        <CmdInputGroup
                            labelText="Grouplabel for checkbox-group styled as multiple-switch (stretched horizontally):"
                            :inputElements="inputGroupCheckboxes"
                            inputTypes="checkbox"
                            :multipleSwitch="true"
                            :required="true"
                            v-model="inputGroupValue4"
                            :stretchHorizontally="true"
                            :status="validationStatus"
                            :disabled="disabledStatus"
                        />
                        <dl>
                            <dt>Selected value(s):</dt>
                            <dd>
                                <output>{{ inputGroupValue4 }}</output>
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
                                        :disabled="disabledStatus"
                        />
                        <button type="submit" :disabled="disabledStatus">
                            <span class="icon-check"></span>
                            <span>Native submit-button</span>
                        </button>
                    </div>
                </CmdForm>
            </CmdWidthLimitationWrapper>
            <!-- end advanced form elements ----------------------------------------------------------------------------------------------------------------------------------------------------->

            <!-- begin back to top button ----------------------------------------------------------------------------------------------------------------------------------------------------->
            <CmdBackToTopButton />
            <!-- end back to top button ----------------------------------------------------------------------------------------------------------------------------------------------------->

            <!-- begin bank account data ----------------------------------------------------------------------------------------------------------------------------------------------------->
            <a id="section-bank-account-data"></a>
            <CmdWidthLimitationWrapper>
                <h2 class="headline-demopage">Bank Account Data</h2>
                <CmdBankAccountData :account-data="bankAccountData" :cmd-headline="{ headlineText: 'Bank Account', headlineLevel: 3}" :allow-copy-by-click="true"/>
            </CmdWidthLimitationWrapper>
            <!-- end bank account data ------------------------------------------------------------------------------------------------------------------------------------------------------->

            <!-- begin boxes ------------------------------------------------------------------------------------------------------------------------------------------------------->
            <a id="section-boxes"></a>
            <CmdWidthLimitationWrapper>
                <h2 class="headline-demopage">Boxes</h2>
                <CmdBoxWrapper :useFlexbox="true" :cmdHeadline="{headlineText: 'Boxes in BoxWrapper with flexbox', headlineLevel: 3}">
                    <CmdBox v-for="index in 14" :key="index" textBody="Content" :cmd-headline="{headlineText: 'Headline ' + index, headlineLevel: 4}"/>
                </CmdBoxWrapper>
                <CmdBoxWrapper :useFlexbox="true" :cmdHeadline="{headlineText: 'Different examples of content-boxes (in BoxWrapper)', headlineLevel: 3}">
                    <CmdBox
                        :stretch-vertically="false"
                        :cmdHeadline="{headlineText: 'Box with cutoff text', headlineLevel: 4}"
                        :useSlots="['body']"
                        :cutoff-text-lines="4"
                    >
                        <template v-slot:body>
                            This is a long text that is cutoff after a specific number of lines that can be defined by the property 'cutoffTextLines' and be toggled by a link below.
                        </template>
                    </CmdBox>
                    <CmdBox :useSlots="['header', 'body', 'footer']">
                        <template v-slot:header>
                            <h4>
                                Texts given by slots
                            </h4>
                        </template>
                        <template v-slot:body>
                            <div class="default-padding">
                                <p>
                                    This content with paragraphs inside is placed inside the box-body.
                                </p>
                                <p>
                                    <strong>Header, Content/Body and Footer of this box are given by slots.</strong>
                                </p>
                            </div>
                        </template>
                        <template v-slot:footer>
                            <p>
                                Footer content
                            </p>
                        </template>
                    </CmdBox>
                    <CmdBox :useSlots="['header', 'body']">
                        <template v-slot:header>
                            <h4>
                                Box with links
                            </h4>
                        </template>
                        <template v-slot:body>
                            <ul class="navigation">
                                <li><a href="#" @click.prevent="">Link name 1</a></li>
                                <li><a href="#" @click.prevent="">Link name 2</a></li>
                                <li><a href="#" @click.prevent="">Link name 3</a></li>
                                <li><a href="#" @click.prevent="">Link name 4</a></li>
                            </ul>
                        </template>
                        <!-- will not be displayed, because useSlots-property does not contain 'footer' in array -->
                        <template v-slot:footer>
                            <p>
                                footer content
                            </p>
                        </template>
                    </CmdBox>
                    <CmdBox
                        :cmdHeadline="{headlineText: 'Collapsible box', headlineLevel: 4}"
                        :image="{src: 'media/images/content-images/landscape-medium.jpg', altText: 'ALternative text'}"
                        textBody="This is some text given by property."
                        :collapsible="true"
                    />
                    <CmdBox :useSlots="['header', 'body']" :cmdHeadline="{headlineText: 'Collapsible box', headlineLevel: 4}" :collapsible="true">
                        <template v-slot:header>
                            <h4>
                                Collapsible box with image
                            </h4>
                        </template>
                        <template v-slot:body>
                            <img src="media/images/content-images/landscape-medium.jpg" alt="Alternative text"/>
                        </template>
                    </CmdBox>
                    <CmdBox :useSlots="['header', 'body', 'footer']">
                        <template v-slot:header>
                            <h4>
                                Box with image and content
                            </h4>
                        </template>
                        <template v-slot:body>
                            <img src="media/images/content-images/landscape-medium.jpg" alt="Alternative text"/>
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
                </CmdBoxWrapper>
                <h3>Product boxes</h3>
                <div class="grid-container-create-columns">
                    <div class="grid-small-item" v-for="(product, index) in boxProductData" :key="index">
                        <CmdBox boxType="product" :product="product" :cmdHeadline="{headlineLevel: 4}"/>
                    </div>
                </div>
                <h3>User boxes</h3>
                <div class="grid-container-create-columns">
                    <div class="grid-small-item" v-for="(user, index) in boxUserData" :key="index">
                        <CmdBox boxType="user" :user="user" :cmdHeadline="{headlineLevel: 4}"/>
                    </div>
                </div>
                <CmdBoxWrapper :boxesPerRow="[5, 2, 1]" :useRowViewAsDefault="true">
                    <template v-slot="slotProps">
                        <CmdBox v-for="index in boxUserData.length" :key="index" boxType="user" :user="boxUserData[index - 1]" :cmdHeadline="{headlineLevel: 5}" :rowView="slotProps.rowView"/>
                    </template>
                </CmdBoxWrapper>
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

            <!-- begin headline ------------------------------------------------------------------------------------------------------------------------------------------------------->
            <a id="section-headlines"></a>
            <CmdWidthLimitationWrapper>
                <h2 class="headline-demopage">Headlines</h2>
                <CmdHeadline :headlineIcon="{iconClass: 'icon-home'}" pre-headline-text="Pre-headline" headlineText="Headline level 1" :headlineLevel="1"/>
                <CmdHeadline headlineText="Headline level 2" :headlineLevel="2"/>
                <CmdHeadline headlineText="Headline level 3" :headlineLevel="3"/>
                <CmdHeadline headlineText="Headline level 4" :headlineLevel="4"/>
                <CmdHeadline headlineText="Headline level 5" :headlineLevel="5"/>
                <CmdHeadline headlineText="Headline level 6" :headlineLevel="6"/>
                <CmdHeadline pre-headline-text="Pre-headline" headlineText="Headline level 1 (center)" text-align="center" :headlineLevel="1"/>
                <CmdHeadline pre-headline-text="Pre-headline" headlineText="Headline level 1 (right)" text-align="right" :headlineLevel="1"/>
            </CmdWidthLimitationWrapper>
            <!-- end headline ------------------------------------------------------------------------------------------------------------------------------------------------------->

            <!-- begin fancybox ------------------------------------------------------------------------------------------------------------------------------------------------------->
            <a id="section-fancybox"></a>
            <CmdWidthLimitationWrapper>
                <h2 class="headline-demopage">Fancybox</h2>
                <h3>FancyBox with text</h3>
                <a href="#" @click.prevent="showFancyBox('text','Some text', 'FancyBox with text')">Open FancyBox with text</a>
                <h3>FancyBox with large image given by url</h3>
                <a href="#"
                   @click.prevent="showFancyBox('url', 'media/images/demo-images/large/landscape-01.jpg', 'FancyBox with large image given by url')"
                   title="Open FancyBox with large image given by url"
                   style="display: inline-flex;"
                >
                    <img src="media/images/demo-images/small/landscape-01.jpg" alt="Alternative text"/>
                </a>
                <h3>FancyBox with large image given by property</h3>
                <a href="#"
                   @click.prevent="showFancyBox('image', {large:'media/images/demo-images/large/landscape-02.jpg'}, 'FancyBox with large image given by property')"
                   title="Open FancyBox with large image given by property"
                   style="display: inline-flex;"
                >
                    <img src="media/images/demo-images/small/landscape-02.jpg" alt="Alternative text"/>
                </a>
                <h3>FancyBox with image as object give by property</h3>
                <a href="#"
                   @click.prevent="showFancyBox('image', {
                        small: 'media/images/demo-images/medium/landscape-03.jpg',
                        medium: 'media/images/demo-images/medium/landscape-03.jpg',
                        large: 'media/images/demo-images/large/landscape-03.jpg'
                   }, 'FancyBox with large image given by property')"
                   title="Open FancyBox with large image given by property"
                   style="display: inline-flex;"
                >
                    <img src="media/images/demo-images/small/landscape-03.jpg" alt="Alternative text"/>
                </a>

            </CmdWidthLimitationWrapper>
            <!-- end fancybox ------------------------------------------------------------------------------------------------------------------------------------------------------->

            <!-- begin google-maps ------------------------------------------------------------------------------------------------------------------------------------------------------->
            <a id="section-google-maps"></a>
            <CmdWidthLimitationWrapper>
                <h2 class="headline-demopage">Google Maps&trade;</h2>
                <CmdGoogleMaps :address="addressData"/>
            </CmdWidthLimitationWrapper>
            <!-- end google-maps ------------------------------------------------------------------------------------------------------------------------------------------------------->

            <!-- begin icons ------------------------------------------------------------------------------------------------------------------------------------------------------->
            <a id="section-icons"></a>
            <CmdWidthLimitationWrapper>
                <h2 class="headline-demopage">Icons</h2>
                <ul>
                    <li><span>Icon from local iconfont</span>
                        <CmdIcon iconClass="icon-home"/>
                    </li>
                    <li><span>Icon from iconify-api (icomoon-font)</span>
                        <CmdIcon iconClass="icomoon-free:home"/>
                    </li>
                    <li><span>Icon from iconify-api (bootstrap-font)</span>
                        <CmdIcon iconClass="bi:house-fill"/>
                    </li>
                    <li><span>Icon from iconify-api (material-design-font)</span>
                        <CmdIcon iconClass="mdi:home"/>
                    </li>
                    <li><span>Icon from iconify-api (font-awesome-solid-font)</span>
                        <CmdIcon iconClass="fa6-solid:house-chimney"/>
                    </li>
                </ul>
            </CmdWidthLimitationWrapper>
            <!-- end icons ------------------------------------------------------------------------------------------------------------------------------------------------------->

            <!-- begin images ------------------------------------------------------------------------------------------------------------------------------------------------------->
            <a id="section-image"></a>
            <CmdWidthLimitationWrapper>
                <h2 class="headline-demopage">Image</h2>
                <div class="flex-container">
                    <CmdImage :image="imageData[0].image" :figcaption="imageData[0].figcaption"/>
                    <CmdImage :image="imageData[1].image" :figcaption="imageData[1].figcaption"/>
                </div>
            </CmdWidthLimitationWrapper>
            <!-- end images ------------------------------------------------------------------------------------------------------------------------------------------------------->

            <!-- begin image-gallery------------------------------------------------------------------------------------------------------------------------------------------------------->
            <a id="section-image-gallery"></a>
            <CmdWidthLimitationWrapper>
                <h2 class="headline-demopage">Image-Gallery</h2>
                <CmdImageGallery :images="imageGalleryData"/>
            </CmdWidthLimitationWrapper>
            <!-- end image-gallery ------------------------------------------------------------------------------------------------------------------------------------------------------->

            <!-- begin image-zoom ------------------------------------------------------------------------------------------------------------------------------------------------------->
            <a id="section-image-zoom"></a>
            <CmdWidthLimitationWrapper>
                <h2 class="headline-demopage">Image-Zoom</h2>
                <CmdImageZoom
                    :imageSmall="imageData[2].image"
                    :imageLarge="imageData[3].image"
                />
            </CmdWidthLimitationWrapper>
            <!-- end image-zoom ------------------------------------------------------------------------------------------------------------------------------------------------------->

            <!-- begin login-form ------------------------------------------------------------------------------------------------------------------------------------------------------->
            <a id="section-login-form"></a>
            <CmdWidthLimitationWrapper>
                <h2 class="headline-demopage">Login Form</h2>
                <CmdForm :use-validation="true" :use-fieldset="false">
                    <CmdLoginForm v-model="loginData" textLegendLoginForm="Please log in"/>
                </CmdForm>
                <p>LoginData: {{ loginData }}</p>
            </CmdWidthLimitationWrapper>
            <!-- end list-of-links ------------------------------------------------------------------------------------------------------------------------------------------------------->


            <!-- begin list-of-links ------------------------------------------------------------------------------------------------------------------------------------------------------->
            <a id="section-list-of-links"></a>
            <CmdWidthLimitationWrapper>
                <h2 class="headline-demopage">List Of Links</h2>
                <h3>Vertical</h3>
                <CmdListOfLinks :links="listOfLinksData"/>
                <h3>Horizontal (aligned left, with headline)</h3>
                <CmdListOfLinks
                    orientation="horizontal"
                    align="left"
                    :links="listOfLinksData"
                    :cmdHeadline="{
                        headlineText: 'Headline',
                        headlineLevel: 5
                    }"
                />
                <h3>Horizontal (aligned center)</h3>
                <CmdListOfLinks orientation="horizontal" align="center" :links="listOfLinksData"/>
                <h3>Horizontal (aligned right)</h3>
                <CmdListOfLinks orientation="horizontal" align="right" :links="listOfLinksData" @click="clickOnListOfLinks"/>
                <h3>Large icons</h3>
                <CmdListOfLinks orientation="horizontal" :links="listOfLinksData" :largeIcons="true"/>
            </CmdWidthLimitationWrapper>
            <!-- end list-of-links ------------------------------------------------------------------------------------------------------------------------------------------------------->

            <!-- begin main-navigation ------------------------------------------------------------------------------------------------------------------------------------------------------->
            <a id="section-main-navigation"></a>
            <CmdWidthLimitationWrapper>
                <h2 class="headline-demopage">Main Navigation</h2>
                <CmdMainNavigation
                    :stretchMainItems="false"
                    :persistOnMobile="false"
                    :navigationEntries="navigationData.navigationEntries"
                />
            </CmdWidthLimitationWrapper>
            <!-- end main-navigation ------------------------------------------------------------------------------------------------------------------------------------------------------->

            <!-- begin multistep-form-progress-bar ------------------------------------------------------------------------------------------------------------------------------------------------------->
            <a id="section-multistep-form-progress-bar"></a>
            <CmdWidthLimitationWrapper>
                <h2 class="headline-demopage">Multistepform-Progressbar</h2>
                <h3>Steps with icons</h3>
                    <CmdMultistepFormProgressBar
                        :multisteps="multistepsData.withIcon"
                        separatorIconClass="icon-single-arrow-right"
                        @click="showPageMultistep = $event.index + 1"
                    />
                <div>
                    <p>Page {{ showPageMultistep }}</p>
                </div>
                <h3>Steps with number</h3>
                <CmdMultistepFormProgressBar
                    :showStepNumber="true"
                    :multisteps="multistepsData.withoutIcon"
                    separatorIconClass="icon-single-arrow-right"
                    @click="showPageMultistep = $event.index + 1"
                />
                <div>
                    <p>Page {{ showPageMultistep }}</p>
                </div>
            </CmdWidthLimitationWrapper>
            <!-- end multistep-form-progress-bar ------------------------------------------------------------------------------------------------------------------------------------------------------->

            <!-- begin newsletter-subscription ------------------------------------------------------------------------------------------------------------------------------------------------------->
            <a id="section-newsletter-subscription"></a>
            <CmdWidthLimitationWrapper>
                <h2 class="headline-demopage">Newsletter Subscription</h2>
                <CmdForm textLegend="Stay-up-to-date" :use-fieldset="false">
                    <CmdNewsletterSubscription v-model="newsletter" buttonType="submit" @buttonClick="submitNewsletterRegistration"/>
                </CmdForm>
            </CmdWidthLimitationWrapper>
            <!-- end newsletter-subscription ------------------------------------------------------------------------------------------------------------------------------------------------------->

            <!-- begin pager ------------------------------------------------------------------------------------------------------------------------------------------------------->
            <a id="section-pager"></a>
            <CmdWidthLimitationWrapper>
                <h2 class="headline-demopage">Pager</h2>
                <h3>Link-view</h3>
                <div>
                    <p>Page {{ showPagePager }}</p>
                </div>
                <CmdPager
                    :pages="4"
                    :itemsPerPage="1"
                    @click="showPagePager = $event"
                />
                <h3>Button-view</h3>
                <div>
                    <p>Page {{ showPagePager }}</p>
                </div>
                <CmdPager
                    :pages="4"
                    :itemsPerPage="1"
                    link-type="button"
                    @click="showPagePager = $event"
                />
            </CmdWidthLimitationWrapper>
            <!-- end pager ------------------------------------------------------------------------------------------------------------------------------------------------------->

            <!-- begin share-buttons ------------------------------------------------------------------------------------------------------------------------------------------------------->
            <a id="section-social-networks"></a>
            <CmdWidthLimitationWrapper>
                <h2 class="headline-demopage">Social Networks</h2>
                <h3>With user confirmation (buttons without gap)</h3>
                <CmdSocialNetworks
                    :networks="socialNetworksData"
                    :userMustAcceptDataPrivacy="true"
                    :useGap="false"
                />
                <h3>Without user confirmation (buttons with gap, text aligned left)</h3>
                <CmdSocialNetworks
                    :networks="socialNetworksData"
                    :userMustAcceptDataPrivacy="false"
                />
                <h3>Without user confirmation (buttons with gap, text aligned right)</h3>
                <CmdSocialNetworks
                    :networks="socialNetworksData"
                    :userMustAcceptDataPrivacy="false"
                    textAlign="right"
                />
            </CmdWidthLimitationWrapper>
            <!-- end share-buttons ------------------------------------------------------------------------------------------------------------------------------------------------------->

            <!-- begin site-header ------------------------------------------------------------------------------------------------------------------------------------------------------->
            <a id="section-site-header"></a>
            <CmdWidthLimitationWrapper>
                <h2 class="headline-demopage">Site Header</h2>
                <h3>Header with navigation below logo</h3>
                <CmdSiteHeader
                    :cmdMainNavigation="navigationData"
                    :cmdCompanyLogo="companyLogoData"
                    :sticky="false"
                />
                <h3>Header with navigation inline with logo</h3>
                <CmdSiteHeader
                    :cmdMainNavigation="navigationData"
                    :cmdCompanyLogo="companyLogoData"
                    :sticky="false"
                    :navigation-inline="true"
                />
                <h3>Header with top-header-links, logo and navigation given by slot</h3>
                <CmdSiteHeader :sticky="false">
                    <template v-slot:topheader>
                        <CmdListOfLinks
                            :links="listOfLinksData"
                            orientation="horizontal"
                            align="right"
                        />
                    </template>
                    <template v-slot:logo>
                        <CmdCompanyLogo
                            :link="companyLogoData.link"
                            altText="CoManD Logo"
                            :pathDefaultLogo="companyLogoData.pathDefaultLogo"
                            :pathDarkmodeLogo="companyLogoData.pathDarkmodeLogo"
                        />
                    </template>
                    <template v-slot:navigation>
                        <CmdMainNavigation
                            :stretchMainItems="false"
                            :persistOnMobile="false"
                            :navigationEntries="navigationData.navigationEntries"
                        />
                    </template>
                </CmdSiteHeader>
            </CmdWidthLimitationWrapper>
            <!-- end site-header ------------------------------------------------------------------------------------------------------------------------------------------------------->

            <!-- begin site-search ------------------------------------------------------------------------------------------------------------------------------------------------------->
            <a id="section-site-search"></a>
            <CmdWidthLimitationWrapper>
                <h2 class="headline-demopage">Site Search</h2>
                <CmdSiteSearch
                    v-model:modelValueInput1="siteSearchInput1"
                    v-model:modelValueInput2="siteSearchInput2"
                    v-model:modelValueRadius="radius"
                    v-model:modelValueSearchFilters="filters"
                    @search="siteSearchOutput"
                    textLegend="Search"
                    :cmdFakeSelect="siteSearchFilters"
                />
            </CmdWidthLimitationWrapper>
            <!-- end site-search ------------------------------------------------------------------------------------------------------------------------------------------------------->

            <!-- begin slideshow ------------------------------------------------------------------------------------------------------------------------------------------------------->
            <a id="section-slideshow"></a>
            <CmdWidthLimitationWrapper>
                <h2 class="headline-demopage">Slideshow</h2>
                <CmdSlideshow :slideshow-items="slideshowData" :showCounter="true" :autoplay="true"/>
            </CmdWidthLimitationWrapper>
            <!-- end slideshow ------------------------------------------------------------------------------------------------------------------------------------------------------->

            <!-- begin system-message ------------------------------------------------------------------------------------------------------------------------------------------------------->
            <a id="section-system-message"></a>
            <CmdWidthLimitationWrapper>
                <h2 class="headline-demopage">System Message</h2>
                <CmdSystemMessage validationStatus="error"
                                  :fullWidth="true"
                                  systemMessage="This is an error message!"
                                  :iconMessage="{iconClass: 'icon-error-circle', show: true}">
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
                                  :iconMessage="{iconClass: 'icon-check-circle', show: true}">
                    <p>This is additional text!</p>
                </CmdSystemMessage>
                <CmdSystemMessage validationStatus="info"
                                  :fullWidth="true"
                                  systemMessage="This is an info message!"
                                  :iconMessage="{iconClass: 'icon-info-circle', show: true}">
                    <p>This is additional text!</p>
                </CmdSystemMessage>
            </CmdWidthLimitationWrapper>
            <!-- end system-message ------------------------------------------------------------------------------------------------------------------------------------------------------->

            <!-- begin tables ------------------------------------------------------------------------------------------------------------------------------------------------------->
            <a id="section-tables"></a>
            <CmdWidthLimitationWrapper>
                <h2 class="headline-demopage">Tables</h2>
                <h3>Table as wide as its content (with caption)</h3>
                <CmdTable :collapsible="true" :fullWidthOnDefault="false" :userCanToggleWidth="true" :table-data="tableDataSmall"/>
                <h3>Table as wide as its content (without caption)</h3>
                <CmdTable :collapsible="true" :fullWidthOnDefault="false" :userCanToggleWidth="true" :caption="{ text: 'Hidden caption', show: false}" :table-data="tableDataSmall"/>
                <h3>Table as wide as possible</h3>
                <CmdTable :collapsible="true" :fullWidthOnDefault="false" :userCanToggleWidth="true" :table-data="tableDataLarge"/>
            </CmdWidthLimitationWrapper>
            <!-- end tables ------------------------------------------------------------------------------------------------------------------------------------------------------->

            <!-- begin tabs ------------------------------------------------------------------------------------------------------------------------------------------------------->
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
            <!-- end tabs ------------------------------------------------------------------------------------------------------------------------------------------------------->

            <!-- begin textblock ------------------------------------------------------------------------------------------------------------------------------------------------------->
            <a id="section-text-block"></a>
            <CmdWidthLimitationWrapper>
                <h2 class="headline-demopage">Text-Block</h2>
                <div class="flex-container">
                    <CmdTextBlock :cmdHeadline="{headlineText: 'Headline', headlineLevel: 3}" textContent="Text given as text only"/>
                    <CmdTextBlock :cmdHeadline="{headlineText: 'Headline', headlineLevel: 3}" htmlContent="<p>Text given as html-content</p>"/>
                </div>
            </CmdWidthLimitationWrapper>
            <!-- end textblock ------------------------------------------------------------------------------------------------------------------------------------------------------->

            <!-- begin thumbnail-scroller ------------------------------------------------------------------------------------------------------------------------------------------------------->
            <a id="section-thumbnail-scroller"></a>
            <CmdWidthLimitationWrapper>
                <h2 class="headline-demopage">Thumbnail-Scroller</h2>
                <div class="inline-size">
                    <h3>Thumbnail-Scroller with images (opens fancybox)</h3>

                    <CmdThumbnailScroller
                        :thumbnail-scroller-items="thumbnailScrollerImagesData"
                    />
                    <h3>Thumbnail-Scroller with text (opens url)</h3>
                    <CmdThumbnailScroller
                        :thumbnail-scroller-items="thumbnailScrollerTextData"
                        contentType="text"
                        executeOnClick="url"
                        :fullWidth="true"
                    />
                    <h3>Thumbnail-Scroller with text (emits click-event)</h3>
                    <CmdThumbnailScroller
                        :thumbnail-scroller-items="thumbnailScrollerTextData"
                        contentType="text"
                        executeOnClick="emit"
                        @click="onClick"
                        :largeIcons="true"
                        :fullWidth="true"
                    />
                </div>
            </CmdWidthLimitationWrapper>
            <!-- end thumbnail-scroller ------------------------------------------------------------------------------------------------------------------------------------------------------->

            <!-- begin tooltip ------------------------------------------------------------------------------------------------------------------------------------------------------->
            <a id="section-tooltip"></a>
            <CmdWidthLimitationWrapper>
                <h2 class="headline-demopage">Tooltip</h2>
                <p>
                    <a href="#" @click.prevent id="hoverme">Hover me!</a><br/>
                    <a href="#" @click.prevent id="clickme" title="Native tooltip">Click me!</a>
                </p>
                <CmdTooltip related-id="hoverme">
                    Tooltip for hover
                </CmdTooltip>
                <CmdTooltip related-id="clickme" :toggle-visibility-by-click="true">
                    Tooltip for click
                </CmdTooltip>
            </CmdWidthLimitationWrapper>
            <!-- end tooltip ------------------------------------------------------------------------------------------------------------------------------------------------------->

            <!-- begin upload-form ------------------------------------------------------------------------------------------------------------------------------------------------------->
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
                <CmdUploadForm :cmdHeadlineFieldset="{headlineText: 'Select files to upload', headlineLevel: 3}"
                               :enableDragAndDrop="true"
                               :allowedFileExtensions="['jpg', 'png']"
                               :allowMultipleFileUploads="true"
                               textLegend="Advanced upload form"
                               :uploadOptions="{url: 'http://localhost:8888'}"
                />
            </CmdWidthLimitationWrapper>
            <!-- end upload-form ------------------------------------------------------------------------------------------------------------------------------------------------------->
        </main>

        <!-- begin site-footer ------------------------------------------------------------------------------------------------------------------------------------------------------->
        <CmdSiteFooter>
            <!-- begin switch-language ------------------------------------------------------------------------------------------------------------------------------------------------------->
            <CmdSwitchLanguage :languages="languagesData" @click="doSomething"/>
            <!-- end switch-languager ------------------------------------------------------------------------------------------------------------------------------------------------------->

            <div class="flex-container">
                <!-- begin list-of-links ------------------------------------------------------------------------------------------------------------------------------------------------------->
                <CmdListOfLinks :links="listOfLinksData"
                                :cmdHeadline="{headlineText: 'List of links', headlineLevel: 6}"
                />
                <!-- end list-of-links ------------------------------------------------------------------------------------------------------------------------------------------------------->

                <!-- begin opening-hours ------------------------------------------------------------------------------------------------------------------------------------------------------->
                <CmdOpeningHours :openingHours="openingHoursData"
                                 :cmdHeadline="{headlineText: 'Opening hours', headlineLevel: 6}"
                                 textHolidaysClosed="Closed on holidays"
                                 textMiscInfo="Miscellaneous information"
                                 :checkInterval="0"
                />
                <!-- end opening-hours ------------------------------------------------------------------------------------------------------------------------------------------------------->

                <!-- begin address-data ------------------------------------------------------------------------------------------------------------------------------------------------------->
                <CmdAddressData :addressData="addressData"
                                :linkGoogleMaps="false"
                                :cmdHeadline="{headlineText: 'Address data', headlineLevel: 6}"
                />
                <!-- end address-data ------------------------------------------------------------------------------------------------------------------------------------------------------->
            </div>
        </CmdSiteFooter>
        <!-- end site-footer ------------------------------------------------------------------------------------------------------------------------------------------------------->

        <!-- begin copyright-information ------------------------------------------------------------------------------------------------------------------------------------------------------->
        <CmdCopyrightInformation/>
        <!-- end copyright-information ------------------------------------------------------------------------------------------------------------------------------------------------------->

        <!-- begin fancy-box ------------------------------------------------------------------------------------------------------------------------------------------------------->
        <CmdFancyBox
            :show="fancyBoxCookieDisclaimer"
            :fancyboxOptions="{}"
            :allowEscapeKey="false"
            :cmdHeadline="{show: true, headlineText: 'Cookie Disclaimer', headlineLevel: 2}"
            ariaLabelText="Cookie Disclaimer"
        >
            <!-- begin cookie-disclaimer ------------------------------------------------------------------------------------------------------------------------------------------------------->
            <CmdCookieDisclaimer
                :cookieOptions="cookieDisclaimerData"
                buttonLabelAcceptAllCookies="Accept all cookies"
                buttonLabelAcceptCurrentSettings="Accept current settings"
                @closeCookieDisclaimer="closeCookieDisclaimer"
                v-model="acceptedCookies"
                :cmdHeadlineCookieDisclaimer="{ show: false }">
                <template #privacy-text>
                    <p>
                        <strong>
                            By browsing this web site you accept the usage and saving of anonymous data!
                        </strong>
                    </p>
                </template>
            </CmdCookieDisclaimer>
            <!-- end cookie-disclaimer ------------------------------------------------------------------------------------------------------------------------------------------------------->
        </CmdFancyBox>
        <!-- end fancy-box ------------------------------------------------------------------------------------------------------------------------------------------------------->
    </div>
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
import imageData from '@/assets/data/image.json'
import imageGalleryData from '@/assets/data/image-gallery.json'
import inputGroupRadiobuttonsData from '@/assets/data/input-group-radiobuttons.json'
import inputGroupReplacedRadiobuttonsData from '@/assets/data/input-group-replaced-radiobuttons.json'
import inputGroupToggleSwitchRadiobuttonsData from '@/assets/data/input-group-toggle-switch-radiobuttons.json'
import listOfLinksData from '@/assets/data/list-of-links.json'
import languagesData from '@/assets/data/switch-language.json'
import multistepsData from '@/assets/data/multistep-form-progress-bar.json'
import navigationData from '@/assets/data/main-navigation.json'
import openingHoursData from '@/assets/data/opening-hours.json'
import selectOptionsData from '@/assets/data/select-options.json'
import socialNetworksData from '@/assets/data/share-buttons-page-by-json.json'
import slideshowData from '@/assets/data/slideshow.json'
import tabsData from '@/assets/data/tabs.json'
import tableDataSmall from '@/assets/data/table-small.json'
import tableDataLarge from '@/assets/data/table-large.json'
import thumbnailScrollerImagesData from '@/assets/data/thumbnail-scroller-images.json'
import thumbnailScrollerTextData from '@/assets/data/thumbnail-scroller-text.json'

import {openFancyBox} from "@/components/CmdFancyBox.vue"

// import external functions
import * as functions from "@/mixins/FieldValidation.js"

import {localizedTime} from "./components/CmdOpeningHours.vue"

export default {
    name: "App",
    data() {
        return {
            acceptedCookies: ["google-maps"],
            showTooltip: false,
            disabledStatus: undefined,
            validationStatus: "",
            loginData: {
                username: "",
                password: ""
            },
            newsletter: {
                subscription: "",
                email: ""
            },
            inputFieldPattern: "",
            inputSearch: "",
            textarea: "",
            inputGroupRadio: "radiobuttonValue1",
            inputGroupCheckbox: "website",
            inputGroupValueReplaceInputTypeRadio: "phone",
            inputGroupValueReplaceInputTypeCheckbox: ["phone"],
            inputGroupValueToggleSwitchCheckbox: ["phone"],
            inputGroupValueToggleSwitchRadio: "phone",
            inputGroupValue3: "email",
            inputGroupValue4: [],
            inputGroupCheckboxes: [
                {
                    labelText: "Website",
                    id: "checkbox-id-1",
                    name: "input-group-checkbox",
                    iconClass: "icon-globe",
                    value: "website"
                },
                {
                    labelText: "E-Mail",
                    id: "checkbox-id-2",
                    name: "input-group-checkbox",
                    iconClass: "icon-mail",
                    value: "email"
                },
                {
                    labelText: "Phone",
                    id: "checkbox-id-3",
                    name: "input-group-checkbox",
                    iconClass: "icon-phone",
                    value: "phone"
                }
            ],
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
            siteSearchFilters: {
                show: true,
                selectData: fakeSelectFilterOptionsData,
                defaultOptionName: "Select filters:",
                labelText: "Filters:",
                type: "checkboxOptions"
            },
            siteSearchInput1: "Doctor",
            siteSearchInput2: "New York",
            radius: 5,
            filters: ["2"],
            switchButtonRadio: "radio1",
            switchButtonCheckboxToggleSwitch: false,
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
            fancyBoxCookieDisclaimer: false,
            fakeSelectDefault: 3,
            fakeSelectDefaultWithIcons: 1,
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
            imageData,
            imageGalleryData,
            inputGroupReplacedRadiobuttonsData,
            inputGroupToggleSwitchRadiobuttonsData,
            languagesData,
            multistepsData,
            navigationData,
            openingHoursData,
            selectOptionsData,
            socialNetworksData,
            slideshowData,
            tableDataSmall,
            tableDataLarge,
            tabsData,
            thumbnailScrollerImagesData,
            thumbnailScrollerTextData
        }
    },
    methods: {
        navigationDataRight() {
            setTimeout(() => {
                let navigationData = {}
                navigationData = [...this.navigationData.navigationEntries]
                navigationData.offcanvasPosition = "right"
                return navigationData
            }, 1000);
        },
        clickOnListOfLinks(event) {
            event.originalEvent.preventDefault()
            console.log(event)
        },
        localizedTime(language) {
            return (h, m) => (localizedTime(language))(h, m).toLowerCase()
        },
        idForReplacedInputsInInputGroup(prefix) {
            return inputGroupRadiobuttonsData.map(item => ({...item, id: prefix + item.id}))
        },
        closeCookieDisclaimer(event) {
            this.fancyBoxCookieDisclaimer = false
            alert(event.join(", "))
        },
        setStatus(validationStatus, disabledStatus) {
            this.validationStatus = validationStatus
            this.disabledStatus = disabledStatus
        },
        onClick(event) {
            alert(event)
        },
        siteSearchOutput(event) {
            alert(JSON.stringify(event))
        },
        showError() {
            alert("Error")
        },
        showFancyBox(type, content, ariaLabelText) {
            if (type === "text") {
                openFancyBox({
                    content: content,
                    cmdHeadline: {
                        show: true,
                        headlineText: "Fancybox with text", headlineLevel: 3
                    },
                    ariaLabelText: ariaLabelText
                })
            } else if (type === "url") {
                openFancyBox({
                    url: content,
                    cmdHeadline: {
                        show: true,
                        headlineText: "Fancybox with image given by url", headlineLevel: 3
                    },
                    ariaLabelText: ariaLabelText
                })
            } else if (type === "image") {
                openFancyBox({
                    cmdHeadline: {
                        show: true,
                        headlineText: "Fancybox with image given by property",
                        headlineLevel: 3
                    },
                    cmdImage: {
                        image: {
                            src: {
                                small: content.small,
                                medium: content.medium,
                                large: content.large
                            },
                            alt: "Alternative text",
                            tooltip: "This is a tooltip"
                        },
                        figcaption: {
                            show: true,
                            text: "figcaption"
                        }
                    },
                    ariaLabelText: ariaLabelText
                })
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
        submitNewsletterRegistration(event) {
            alert(event.subscription + " " + event.email)
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
        color: var(--text-color);
        text-decoration: none;
        background: none;
    }
}

main .cmd-width-limitation-wrapper:not(:last-of-type) {
    border-bottom: var(--default-border);
    border-style: dashed;
}
</style>