<template>
    <component
        :is="componentTag || 'div'"
        :class="['edit-component-wrapper', {active}]"
        tabindex="0"
        @click.stop="showActionButtons"
        ref="editComponent"
        :title="!active ? 'Click to select this element' : 'Select an action from the buttons in the top-left corner'"
        :data-identifier="componentIdentifier">
        <li v-if="componentTag === 'ul'" class="action-buttons-wrapper">
            <!-- begin action-buttons -->
            <ul v-show="active" class="flex-container no-flex action-buttons" :data-component="componentName">
                <!-- begin add -->
                <li>
                    <a :class="['icon-hexagon button confirm', {disabled: !addHandlerProvider && !itemProvider && !allowAddComponent}]"
                       href="#"
                       @click.prevent="addEntry($event)"
                       :title="!isOuterComponent ? 'Add new item/entry' : 'Add new component'">
                        <CmdIcon :iconClass="!isOuterComponent ? 'icon-plus' : 'icon-plus'"/>
                    </a>
                </li>
                <!-- end add -->

                <!-- begin settings -->
                <li>
                    <a :class="['icon-hexagon button primary', {disabled: editing || !hasSettings}]"
                       :href="editing ? null : '#'"
                       @click.prevent="editSettings"
                       title="Edit settings of this component">
                        <CmdIcon :iconClass="!isOuterComponent ? 'icon-cog' : 'icon-cogs'"/>
                    </a>
                </li>
                <!-- end settings -->

                <!-- begin delete -->
                <li>
                    <a class="icon-hexagon button-delete"
                       href="#"
                       @click.prevent="deleteComponent"
                       title="Delete this component (and its content)">
                        <CmdIcon iconClass="icon-trash"/>
                    </a>
                </li>
                <!-- end delete -->

                <!-- begin cancel -->
                <li v-if="!isOuterComponent">
                    <a :class="['icon-hexagon button-cancel', {disabled: !editing}]"
                       href="#"
                       @click.prevent="cancelComponent"
                       title="Cancel editing (changes will not be saved)">
                        <CmdIcon iconClass="icon-cancel"/>
                    </a>
                </li>
                <!-- end cancel -->

                <!-- begin edit/save -->
                <li v-if="!isOuterComponent">
                    <a v-if="editing"
                       class="icon-hexagon button-save"
                       href="#"
                       @click.prevent="saveComponent"
                       title="Save changes of this component">
                        <CmdIcon iconClass="icon-check"/>
                    </a>
                    <a v-else
                       :class="['icon-hexagon button', {disabled: editModeContext.settings.isEditing(componentIdentifier)}]"
                       href="#"
                       @click.prevent="editComponent"
                       title="Edit content of this component">
                        <CmdIcon iconClass="icon-edit"/>
                    </a>
                </li>
                <!-- end edit/save -->
            </ul>
            <!-- end action buttons -->
        </li>
        <template v-else>
            <!-- begin action-buttons -->
            <p v-if="isOuterComponent" class="component-name">{{ componentName }}</p>
            <ul v-show="active"
                class="flex-container no-flex action-buttons"
                :data-component="componentName"
                @mouseenter="addHighlightRelatedComponent"
                @mouseleave="removeHighlightRelatedComponent">
                <!-- begin add -->
                <li>
                    <a :class="['icon-hexagon use-icon-as-background button confirm', {disabled: !addHandlerProvider && !itemProvider && !allowAddComponent}]"
                       href="#"
                       @click.prevent="addEntry"
                       :title="!isOuterComponent ? 'Add new item/entry' : 'Add new component'">
                       <CmdIcon :iconClass="!isOuterComponent ? 'icon-plus' : 'icon-plus'"/>
                    </a>
                </li>
                <!-- end add -->

                <!-- begin settings -->
                <li>
                    <a :class="['icon-hexagon use-icon-as-background button primary', {disabled: editing || !hasSettings}]"
                       :href="editing ? null : '#'"
                       @click.prevent="editSettings"
                       :title="'Edit settings for ' + componentName">
                        <CmdIcon :iconClass="!isOuterComponent ? 'icon-cog' : 'icon-cogs'"/>
                    </a>
                </li>
                <!-- end settings -->

                <!-- begin delete -->
                <li>
                    <a :class="['icon-hexagon use-icon-as-background button button-delete', {disabled: editing || !allowDeleteComponent}]"
                       href="#"
                       @click.prevent="deleteComponent"
                       :title="'Delete ' + componentName + ' (and its content)'">
                       <CmdIcon iconClass="icon-trash"/>
                    </a>
                </li>
                <!-- end delete -->

                <!-- begin edit/save -->
                <li v-if="!isOuterComponent">
                    <a :class="['icon-hexagon use-icon-as-background button cancel', {disabled: !editing}]"
                       href="#"
                       @click.prevent="cancelComponent"
                       title="Cancel editing (changes will not be saved)">
                       <CmdIcon iconClass="icon-cancel"/>
                    </a>
                </li>
                <li v-if="!isOuterComponent">
                    <a v-if="editing"
                       class="icon-hexagon use-icon-as-background button confirm" href="#"
                       @click.prevent="saveComponent"
                       :title="'Save changes of ' + componentName">
                       <CmdIcon iconClass="icon-check"/>
                    </a>
                    <a v-else
                       :class="['icon-hexagon use-icon-as-background button confirm', {disabled: editModeContext.settings.isEditing(componentIdentifier)}]"
                       href="#"
                       @click.prevent="editComponent"
                       :title="'Edit content for ' + componentName">
                        <CmdIcon iconClass="icon-edit"/>
                    </a>
                </li>
                <!-- end edit/save -->
            </ul>
            <!-- end action buttons -->
        </template>
        <!-- begin slot -->
        <slot :editing="editing"></slot>
        <!-- end slot -->
    </component>
</template>

<script>
import componentStructure from "../assets/data/component-structure.json"

import {componentPathAsString, findEditComponentWrapper} from "../utils/editmode.js"
import {getCurrentInstance} from "vue"

export default {
    name: "EditComponentWrapper",
    inject: {
        editModeContext: {
            default: null
        }
    },
    props: {
        allowedComponentTypes: {
            type: Array
        },
        componentName: {
            type: String
        },
        componentProps: {
            type: Object
        },
        componentPath: {
            type: Array,
            required: true
        },
        allowAddComponent: {
            type: Boolean
        },
        allowDeleteComponent: {
            type: Boolean,
            default: true
        },
        showComponentName: {
            type: Boolean,
            default: true
        },
        componentTag: {
            type: String
        },
        itemProvider: {
            type: Function
        }
    },
    data() {
        return {
            componentIdentifier: "",
            editStateListeners: [],
            updateHandlerProviders: [],
            addHandlerProvider: null,
            showComponentSelection: false,
            showAddComponentButtons: false,
            addComponentLevel: ""
        }
    },
    computed: {
        isOuterComponent() {
            return !findEditComponentWrapper(this.$parent, component => component?.componentName !== "CmdContainer")
        },
        active() {
            if (!this.editModeContext) {
                return false
            }
            const parentEditComponentWrapper = findEditComponentWrapper(this.$parent, component => component?.componentName !== "CmdContainer");
            if (parentEditComponentWrapper) {
                return !!this.editModeContext.system.isActiveChildComponent(buildComponentPath(this))
            }
            return !!this.editModeContext.system.isActiveComponent(buildComponentPath(this))
        },
        editing() {
            return this.editModeContext?.content.isEditing(this.componentIdentifier)
        },
        hasSettings() {
            const settingsComponentName = `${this.componentName}Settings`
            return !!getCurrentInstance().appContext.components[settingsComponentName]
        }
    },
    methods: {
        addHighlightRelatedComponent(event) {
            const currentElement = event.target
            currentElement.parentNode.classList.add("highlight")
        },
        removeHighlightRelatedComponent(event) {
            const currentElement = event.target
            currentElement.parentNode.classList.remove("highlight")
        },
        // provide actions from store as methods inside this component
        showActionButtons() {
            const parentEditComponentWrapper = findEditComponentWrapper(this.$parent, component => component?.componentName !== "CmdContainer")
            this.editModeContext.system.setActiveComponent(buildComponentPath(parentEditComponentWrapper), buildComponentPath(this))
        },
        deleteComponent() {
            if (!this.editing && this.allowDeleteComponent && confirm("Delete this component and its content?")) {
                this.editModeContext?.store.deleteContent(buildComponentPath(this))
                // close settings sidebar if component is deleted
                this.editModeContext.settings.stopEditing()
            }
        },
        deleteInnerComponent() {
            this.editModeContext.store.deleteContent(buildComponentPath(this))
            // stop editing to close settings-sidebar
            this.editModeContext.settings.stopEditing()
        },
        cancelComponent(event) {
            if (this.editing) {
                event.stopPropagation()
                this.editModeContext.content.stopEditing()
            }
        },
        editComponent(event) {
            event?.stopPropagation()

            // avoid component from resetting editing-flag
            if (!event) {
                this.showActionButtons()
            }

            const component = this.$refs.editComponent;
            this.editModeContext.content.startEditing(this.componentIdentifier)
            // wait until input in inserted into DOM on next tick
            this.$nextTick(() => component.querySelector("input")?.focus())
        },
        saveComponent() {
            this.editModeContext.store.updateContent(
                buildComponentPath(this),
                this.updateHandlerProviders.map(provider => provider()))
            this.editModeContext.content.stopEditing()
        },
        editSettings(event, action) {
            event.stopPropagation()

            if (!this.editing && this.hasSettings) {
                this.editModeContext.settings.startEditing(
                    this.componentIdentifier,
                    this.componentName,
                    this.componentProps,
                    this.allowedComponentTypes,
                    buildComponentPath(this),
                    this.saveSettings,
                    this.deleteInnerComponent,
                    action || 'edit'
                )
            }
        },
        addEntry(event) {
            if (this.itemProvider) {
                // if related element is inner component (add item/entry)
                this.editModeContext.content.addContent(buildComponentPath(this), this.itemProvider)
            } else {
                // if related element is outer component (open settings)
                this.editSettings(event, 'add')
            }
        },
        saveSettings(updateCallback) {
            this.editModeContext.store.updateSettings(
                buildComponentPath(this),
                updateCallback)
            this.editModeContext.settings.stopEditing()
        },
        addEditStateListener(listener) {
            this.editStateListeners.push(listener)
            listener(this.editing)
        },
        addUpdateHandlerProvider(updateHandlerProvider) {
            this.updateHandlerProviders.push(updateHandlerProvider)
        },
        setAddHandlerProvider(addHandlerProvider) {
            // assign given function to data-property
            if (addHandlerProvider) {
                this.addHandlerProvider = addHandlerProvider
            }
        }
    },
    watch: {
        componentPath: {
            handler() {
                this.componentIdentifier = componentPathAsString(buildComponentPath(this))
            },
            immediate: true,
            deep: true
        },
        editing(value) {
            this.editStateListeners.forEach(listener => listener(value))
        }
    }
}

function buildComponentPath(component) {
    const path = []
    for (let parent = component; parent; parent = findEditComponentWrapper(parent.$parent)) {
        if (parent.componentPath) {
            path.unshift(...parent.componentPath)
        }
    }
    return path
}
</script>

<style lang="scss">
@mixin edit-border {
    border: .1rem dashed transparent;
    transition: var(--default-transition);

    &:hover, &:active, &:focus {
        border-color: var(--primary-color);
        background: hsla(0, 0%, 100%, 0.1);
        transition: var(--default-transition);
    }

    &:focus, &.active {
        border-style: solid;
        border-color: var(--primary-color);

        .action-buttons {
            opacity: 1;
            transition: var(--default-transition);
        }
    }
}

.edit-component-wrapper {
    @include edit-border;

    display: block;

    &.highlight {
        border-color: var(--hyperlink-color-highlighted);
        border-style: dotted;
    }

    .cmd-headline {
        margin: 0;
    }

    .component-name {
        display: none;
        position: absolute;
        left: auto;
        right: 10rem;
        font-style: italic;
        z-index: 10;
        padding: .2rem;
        background: var(--primary-color);
    }

    &.active {
        .component-name {
            display: block;
        }
    }

    .action-buttons {
        --action-buttons-size: 3.6rem;

        transition: var(--default-transition);
        gap: 0;
        position: absolute;
        top: -1.8rem;
        right: 0.8rem;
        z-index: 1;
        margin: 0;

        li {
            &:nth-child(odd) {
                top: 0;
            }

            &:nth-child(even) {
                top: -1.6rem;
            }

            &:nth-child(5) {
                right: 0;
            }

            &:nth-child(4) {
                right: calc(var(--action-buttons-size) * -0.25);
            }

            &:nth-child(3) {
                right: calc(var(--action-buttons-size) * -0.5);
            }

            &:nth-child(2) {
                right: calc(var(--action-buttons-size) * -0.75);
            }

            &:nth-child(1) {
                right: calc(var(--action-buttons-size) * -1);
            }
        }
    }

    .edit-items {
        .action-buttons {
            gap: var(--default-gap-third);
            top: -2.3rem;
            left: 0;
            right: auto; /* avoids container to be stretched */
            flex-wrap: nowrap;
            border-bottom: 0;
            backdrop-filter: grayscale(1) brightness(1.5) blur(2rem) opacity(85%);
            border-radius: .5rem;

            li {
                top: 0;
                right: 0;
                left: auto;

                &:nth-child(5) {
                    right: 0;
                }

                &:nth-child(4) {
                    right: var(--icon-font-size);
                }

                &:nth-child(3) {
                    right: calc(var(--icon-font-size) * 2);
                }

                &:nth-child(2) {
                    right: calc(var(--icon-font-size) * 3);
                }

                &:nth-child(1) {
                    right: calc(var(--icon-font-size) * 4);
                }

                a.button {
                    border-radius: var(--full-circle);
                    font-size: 1rem;
                    display: block;
                    padding: 0.5rem;
                    background: var(--button-background-color);

                    &:before {
                        content: "";
                        font-size: 1rem;

                    }

                    span[class*="icon-"] {
                        font-size: var(--icon-size-small);
                        position: relative;
                        top: 0;
                        left: 0;
                        transform: none;
                    }

                    &.primary {
                        background: var(--primary-color);
                    }
                }
            }
        }

        &.active {
            //width: 100%; /* stretch inside flex-container */
            background: var(--pure-white);
        }
    }

    // begin component-level only
    &:not(.edit-items) {
        > ul {
            > li {
                a.button {
                    background: none !important;
                }
            }
        }
    }
    // end component-level only
}

ul.edit-component-wrapper {
    border: 0;

    > li {
        list-style-type: none;
        margin: 0;

        &.action-buttons-wrapper {
            display: flex;
            justify-content: flex-end;
            padding-top: .1rem;

            .action-buttons {
                position: relative;
                top: auto;
            }
        }

        &.item-wrapper {
            @include edit-border;
        }
    }
}
</style>
