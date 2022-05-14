import {onBeforeUpdate} from "vue"

export function useSequence() {
    const sequences = {}

    onBeforeUpdate(resetSequence)

    function nextSequenceValue(sequenceName = "defaultSequence") {
        const currentValue = sequences[sequenceName] || 0 // get currentValue for specific sequence (else set value to 0)
        sequences[sequenceName] = currentValue + 1 // raise currentValue by 1
        return sequences[sequenceName]
    }

    function currentSequenceValue(sequenceName = "defaultSequence") {
        return sequences[sequenceName] || 0 // get currentValue for specific sequence (else set value to 0)
    }

    function resetSequence(sequenceName = "defaultSequence") {
        if (sequences[sequenceName]) {
            sequences[sequenceName] = 0
        }
    }

    return {nextSequenceValue, currentSequenceValue, resetSequence}
}
