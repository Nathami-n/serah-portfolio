import axios from 'axios'
const channelId = 'UCAcgtXABddtNc2GySosdT4A'
const BASE_URL = 'https://youtube-v31.p.rapidapi.com/search'
const options = {
    method: 'GET',
    url: BASE_URL,
    params: {
    //   q: 'serahKe',
      part: 'snippet,id',
      channelId: channelId,
      maxResults: '20',
      order: 'date'
    },
    headers: {
      'X-RapidAPI-Key': 'f4aea82808msh7fd63be2a047731p110d27jsn915ea4bef91c',
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
  };
  
 export const getSerahData = async () => {
    const {data} = await axios.get(`${BASE_URL}`, options);
    // console.log(data);
    return data;
}
