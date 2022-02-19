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
        if(propertyDescriptions[propertyName]?.comments?.length) {
            return propertyDescriptions[propertyName].comments.join("<br />")
        }
    }
    return ""
}

function getAnnotation(propertyDescriptions, propertyName, annotationName) {
    if(propertyDescriptions) {
        if(propertyDescriptions[propertyName]?.annotations?.[annotationName]?.length) {
            return propertyDescriptions[propertyName].annotations[annotationName].join("").split(/\s*,\s*/)
        }
    }
    return []
}

function getPropertyStructure(propertyStructures, propertyName) {
    if(propertyStructures?.[propertyName]) {
        return JSON.stringify(propertyStructures?.[propertyName], null, 2)
    }
    return "-"
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
import componentsDescription from "../data/componentsDescription.json"

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

function resolveComponentName(name) {
    if (name.slice(0, 3) === "cmd" && name.length > 3) {
        const componentName = capitalize(name)
        if (componentsDescription[componentName]) {
            return componentName
        }
        const componentNameParts = componentName.split(/(?<=[a-z])(?=[A-Z])/)
        for (let i = componentNameParts.length - 2; i > 2; i--) {
            const componentNameCandidate = componentNameParts.slice(0, i).join("")
            if (componentsDescription[componentNameCandidate]) {
                return componentNameCandidate
            }
        }
    }
    return null
}

function createComponentLink(name) {
    // check if property.name starts with cmd-namespace-prefix
    return !!resolveComponentName(name)
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
    <table class="table-properties">
        <thead>
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Default</th>
                <th>Required</th>
                <th>Structure</th>
                <th>Description</th>
                <th>Allowed Values</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="([propertyName, property]) in sortedProperties" :key="propertyName">
                <td>
                    <template v-if="createComponentLink(propertyName)">
                        <router-link :to="{name: resolveComponentName(propertyName), params: { tab: 'properties'}}" title="Open help page for this component">{{ propertyName }}</router-link>
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
                    <pre v-if="getPropertyDefault(property.default)">{{getPropertyDefault(property.default) }}</pre>
                    <template v-else>
                        <em>(none)</em>
                    </template>
                </td>
                <td class="required">
                    <span :class="getIcon(property.required)" :title="getTooltip(property.required)"></span>
                </td>
                <td>
                    <pre v-if="getPropertyStructure(props.propertyStructures, propertyName)">{{ getPropertyStructure(props.propertyStructures, propertyName) }}</pre>
                </td>
                <td v-html="getPropertyDescription(props.propertyDescriptions, propertyName)">
                </td>
                <td>
                    <ul v-if="getAnnotation(props.propertyDescriptions, propertyName, 'allowedValues').length">
                        <li v-for="value in getAnnotation(props.propertyDescriptions, propertyName, 'allowedValues')" :key="value">{{ value }}</li>
                    </ul>
                    <em v-else>
                       (all)
                    </em>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style lang="scss">
    .table-properties {
        td {
            text-align: left;

            &.required {
                text-align: center;
            }
        }
    }
</style>