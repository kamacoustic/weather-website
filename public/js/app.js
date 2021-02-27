console.log('Loadeds')

// fetch('http://localhost:3000/weather?address=!').then((response) => {
//     response.json().then((data) => {
//         if(data.error){
//             console.log(`Error: ${data.error}`)
//         } else {
//             console.log(`${data.location}: ${data.forecast}`)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.innerHTML = 'Loading'
    messageTwo.innerHTML = ''

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.innerHTML = `Error: ${data.error}`
        } else {
           messageOne.innerHTML = `${data.location}`
           messageTwo.innerHTML = `${data.forecast}`
        }
    })
})

    console.log(location)
})