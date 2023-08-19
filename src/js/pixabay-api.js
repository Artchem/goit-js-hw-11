import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
// axios.defaults.headers.common['key'] = '38837496-e09cca1b216ed759136fb60be';
const KEY = '38837496-e09cca1b216ed759136fb60be';

function fetchPixabay(value, page = 1) {
  return axios
    .get(
      `?key=${KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    )

    .then(response => {
      console.log(response);
      return response.data;
    });
}

// function fetchCatByBreed(breedId) {
//   return axios.get(`images/search?breed_ids=${breedId}`).then(response => {
//     return response.data;
//   });
// }

export { fetchPixabay };
// export { fetchCatByBreed };
