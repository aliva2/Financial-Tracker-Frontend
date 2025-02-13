import axios from "axios";

export default axios.create({
  baseURL: "http://ec2-13-49-248-73.eu-north-1.compute.amazonaws.com/api",
});
