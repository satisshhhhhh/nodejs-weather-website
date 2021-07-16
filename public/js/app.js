//This is a Client side javascript which is going to run in the browser...

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const rowp1 = document.querySelector('#row-p1')
const rowp2 = document.querySelector('#row-p2')
const rowp3 = document.querySelector('#row-p3')
// messageOne.textContent = 'Hello'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent='Loading...'
    messageTwo.textContent=''

    fetch('http://localhost:3000/weather?address='+ location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                // console.log(data.location)
                // console.log(data.forecast)
                rowp1.textContent = data.temperature+ "\u00B0 C"
                rowp2.textContent = data.wind_speed+ " km/hr"
                rowp3.textContent = data.humidity+ " %"
            }
        })
    })

})

