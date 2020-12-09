import axios from 'axios';
import { xmlRequestTemplate } from './template';

export default function({  data}) {
  const template = xmlRequestTemplate({  data });

  return axios({
    method: "post",
    url: process.env.VUE_APP_WPS_URL,
    data: template,
    headers: { "Content-Type": "application/xml" },
  }).then(({ data }) => {
    return typeof data === "object" ? data : JSON.parse(data);
  });
}
