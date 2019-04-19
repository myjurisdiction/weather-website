const searchLocation = document.querySelector('form')
const search = document.querySelector('input')
const err = document.querySelector('#error')
const place = document.querySelector('#place')
const summary = document.querySelector('#summary')
const temperature = document.querySelector('#temperature')
const temperatureHigh = document.querySelector('#temperatureHigh')
const timezone = document.querySelector('#timezone')

searchLocation.addEventListener('submit', (e) => {

    e.preventDefault()
    const location = search.value

    
    const url = "/weather?address=" + location

        fetch(url).then((response) => {
            response.json().then((data) => {
                if(data.error){
                    err.textContent = 'You must provide a valid location !!'
                }
                else{
                    place.textContent = data.place
                    summary.textContent = data.summary
                    temperature.textContent = data.temperature
                    temperatureHigh.textContent = data.temperatureHigh
                    timezone.textContent = data.timezone
                }
            })
        })
   
})