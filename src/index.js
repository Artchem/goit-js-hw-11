// import * as API from './js/cat-api';
// import SlimSelect from 'slim-select';
// import Notiflix from 'notiflix';

// const refs = {
//   breedSelect: document.querySelector('.breed-select'),
//   catInfo: document.querySelector('.cat-info'),
//   loader: document.querySelector('.loader'),
//   error: document.querySelector('.error'),
// };

// API.fetchBreeds()
//   .then(data => {
//     console.log(data);

//     refs.breedSelect.innerHTML = pushDataInSelect(data);

//     refs.breedSelect.classList.remove('is-hidden');
//     refs.loader.classList.add('is-hidden');

//     new SlimSelect({
//       select: refs.breedSelect,
//     });
//   })
//   .catch(error => {
//     console.log(error.message);
//     Notiflix.Notify.failure(`Oops! ${error.message}! Try reloading the page!`, {
//       width: '380px',
//       position: 'center-center',
//       timeout: 6000,
//       clickToClose: true,
//     });

//     refs.loader.classList.add('is-hidden');
//   });

// function pushDataInSelect(array) {
//   return array
//     .map(({ id, name }) => `<option  value="${id}">${name}</option>`)
//     .join('');
// }

// refs.breedSelect.addEventListener('change', onBreedClick);

// function onBreedClick(evt) {
//   const searchBread = evt.target.value;

//   refs.loader.classList.remove('is-hidden');

//   refs.catInfo.innerHTML = '';

//   API.fetchCatByBreed(searchBread)
//     .then(data => {
//       if (data.length === 0) {
//         Notiflix.Notify.failure(
//           `Sorry, there are no images matching your search query. Please try again.`,
//           {
//             width: '380px',
//             position: 'center-center',
//           }
//         );
//         console.log('Такого кота немає');
//       }
//       refs.catInfo.innerHTML = createMarkup(data);
//       refs.loader.classList.add('is-hidden');
//     })
//     .catch(error => {
//       console.dir(error.message);
//       Notiflix.Notify.failure(
//         `Oops! ${error.message}! Try reloading the page!`,
//         {
//           width: '380px',
//           position: 'center-center',
//           timeout: 6000,
//           clickToClose: true,
//         }
//       );
//       // refs.error.classList.remove('is-hidden');
//       refs.loader.classList.add('is-hidden');
//       // refs.breedSelect.classList.add('is-hidden');
//     });
// }

// function createMarkup(arr) {
//   return arr
//     .map(
//       ({ breeds: [{ name, description, temperament }], url }) =>
//         `<li class="card-info">
//         <img src="${url}" alt="" width="350">
//         <div class="info">
//           <h2>${name}</h2>
//           <p>${description}</p>
//           <p><span class="temperament">Temperament:</span> ${temperament}</p>
//         </div>

//       </li>`
//     )
//     .join('');
// }
