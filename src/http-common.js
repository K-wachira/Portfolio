import axios from "axios";


export default axios.create({
    baseURL:"https://portfoliobackend-env.eba-ek73xxps.eu-west-2.elasticbeanstalk.com/api/v1/blog",
    headers: {
        "Content-type": "application/json"
      }
})