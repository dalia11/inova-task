const axios = require('axios');
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // dev code
  axios.defaults.baseURL = 'http://15.237.2.25/api/v1';
} else {
  // production code
  axios.defaults.baseURL = '/';
}
export default axios;
