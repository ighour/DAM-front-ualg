import axios from 'axios'

export default axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: {
        'Accept': 'text/xml',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    responseType: 'text'
})