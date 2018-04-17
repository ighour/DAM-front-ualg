import axios from 'axios'

export default axios.create({
    baseURL: 'https://dam-movie-backend.herokuapp.com/api/',
    headers: {
        'Accept': 'text/xml',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    responseType: 'text'
})