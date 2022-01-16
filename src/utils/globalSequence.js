const sequences = {}

function nextSequenceValue(sequenceName = "defaultSequence") {
    const currentValue = sequences[sequenceName] || 0 // get currentValue for specific sequence (else set value to 0)
    sequences[sequenceName] = currentValue + 1 // raise currentValue by 1
    return sequences[sequenceName]
}

export {nextSequenceValue}