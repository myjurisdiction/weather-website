const celcius = ((farenhite) => {
    const temperature = (farenhite - 32)*(5/9)
    return temperature.toFixed(2)
})

module.exports = celcius