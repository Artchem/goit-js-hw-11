import * as API from './js/pixabay-api';
// import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
  //   error: document.querySelector('.error'),
};

refs.searchForm.addEventListener('submit', onSearchSubmit);
refs.loadMore.addEventListener('click', onLoadMoreClick);
refs.loadMore.disabled = true;

function onLoadMoreClick() {}

function onSearchSubmit(evt) {
  evt.preventDefault();
  const searchQuery = evt.currentTarget.elements.searchQuery.value;
  console.log(searchQuery);

  API.fetchPixabay(searchQuery)
    .then(data => {
      console.log(data);
      refs.gallery.innerHTML = createMarkup(data.hits);

      if (data.hits.length === 0) {
        Notiflix.Notify.failure(
          `Sorry, there are no images matching your search query. Please try again.`
        );
      }
      refs.loadMore.disabled = false;
      // refs.breedSelect.classList.remove('is-hidden');
      // refs.loader.classList.add('is-hidden');
      // new SlimSelect({
      //   select: refs.breedSelect,
      // });
    })
    .catch(error => {
      console.log(error.message);
      // Notiflix.Notify.failure(`Oops! ${error.message}! Try reloading the page!`, {
      //   width: '380px',
      //   position: 'center-center',
      //   timeout: 6000,
      //   clickToClose: true,
      // });

      // refs.loader.classList.add('is-hidden');
    });
}

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

// webformatURL -  посилання на маленьке зображення для списку карток.
// largeImageURL - посилання на велике зображення.
// tags -          рядок з описом зображення. Підійде для атрибуту alt.
// likes -        кількість лайків.
// views -       кількість переглядів.
// comments -   кількість коментарів.
// downloads -    кількість завантажень.

function createMarkup(arr) {
  return arr
    .map(
      ({ webformatURL, tags, likes, views, comments, downloads }) =>
        `<div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" width="300" />
             <div class="info">
                <p class="info-item">
                  <b>Likes</b>${likes}
                </p>
                <p class="info-item">
                   <b>Views</b>${views}
                </p>
                <p class="info-item">
                  <b>Comments</b>${comments}
                </p>
                <p class="info-item">
                  <b>Downloads</b>${downloads}
                </p>
              </div>
          </div>`
    )
    .join('');
}
