<script>
function getPropertyTypeName(type) {
    if(Array.isArray(type)) {
        return type.map(t => t.name).join(", ")
    }
    return type.name
}

function getPropertyDefault(defaultValue) {
    if(typeof defaultValue === "function") {
        return defaultValue()
    }
    return defaultValue
}

function getIcon(required) {
    return required ? "icon-check" : "icon-cancel"
}

function getTooltip(required) {
    return required ? "Property is required" : "Property is not required"
}

function getPropertyDescription(propertyDescriptions, propertyName) {
    if(propertyDescriptions) {
        if(propertyDescriptions[propertyName]) {
            return propertyDescriptions[propertyName]
        }
    }
    return ""
}

function getPropertyStructure(propertyStructures, propertyName) {
    return JSON.stringify(propertyStructures?.[propertyName], null, 2)
}

export {
    getPropertyTypeName,
    getPropertyDefault,
    getIcon,
    getTooltip,
    getPropertyDescription,
    getPropertyStructure
}
</script>

<script setup>
import { defineProps, computed } from "vue"
import {capitalize} from "../../utils/string"

const props = defineProps(
    {
        properties: {
            type: Object,
            required: true
        },
        propertyDescriptions: {
            type: Object,
            required: false
        },
        propertyStructures: {
            type: Object,
            required: false
        }
    }
)

const sortedProperties = computed(
    function() {
        return Object.entries(props.properties).sort((a, b) => a[0].localeCompare(b[0]))
    }
)

function createComponentLink(name) {
    // check if property.name start with cmd-namespace-prefix
    return name.slice(0, 3) === "cmd" && name.length > 3
}

function createDetailLink(type) {
    // check if property-type is array or object
    if(Array.isArray(type)) {
        return type.some(t => t.name === "Array" || t.name === "Object")
    }
    return type.name === "Array" || type.name === "Object"
}
</script>

<template>
    <h3>Properties</h3>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Default</th>
                <th>Required</th>
                <th>Structure</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="([propertyName, property]) in sortedProperties" :key="propertyName">
                <td>
                    <template v-if="createComponentLink(propertyName)">
                        <router-link :to="{name: capitalize(propertyName), params: { tab: 'properties'}}" title="Open help page for this component">{{ propertyName }}</router-link>
                    </template>
                    <template v-else-if="createDetailLink(property.type)">
                        <a :href="'#' + propertyName">{{ propertyName }}</a>
                    </template>
                    <template v-else>
                        {{ propertyName }}
                    </template>
                </td>
                <td>
                    {{ getPropertyTypeName(property.type) }}
                </td>
                <td>
                    <template v-if="getPropertyDefault(property.default)">
                        {{getPropertyDefault(property.default) }}
                    </template>
                    <template v-else>
                        <em>(none)</em>
                    </template>
                </td>
                <td>
                    <span :class="getIcon(property.required)" :title="getTooltip(property.required)"></span>
                </td>
                <td style="text-align: left;">
                    <pre v-if="getPropertyStructure(props.propertyStructures, propertyName)">{{ getPropertyStructure(props.propertyStructures, propertyName) }}</pre>
                </td>
                <td>
                    {{  getPropertyDescription(props.propertyDescriptions, propertyName) }}
                </td>
            </tr>
        </tbody>
    </table>
</template>