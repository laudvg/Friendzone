import axios from 'axios';

class AuthService {
  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/auth`,
      withCredentials: true    
    })
  }

  signup = (user) => {
    return this.instance.post('/signup', user)
    .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))
  }

  login = (user) => {
    return this.instance.post('/login', user)
    .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))
  }

  loggedInUser = () => {
    return this.instance.get('/loggedin')
    .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))
  }

  upload = (picture) => {
    return this.instance.post('/upload', picture)
    .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))
  }

  submitQuizVal = (quizValue) => {
    return this.instance.post('/quiz', quizValue)
    .then(res => Promise.resolve(res.data))
    .catch(error => console.log(error))
  }

  submitPrefVal = (gender) => {
    return this.instance.post('/preferences', {gender})
    .then(res => Promise.resolve(res.data))
    .catch(error => console.log(error))
  }

  submitAbout = (description) => {
    return this.instance.post('/description', {description})
    .then(res => Promise.resolve(res.data))
    .catch(error => console.log(error))
  }

  matches = () => {
    return this.instance.get('/matches')
    .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))
  }

}

export default AuthService;