import * as API from './js/pixabay-api';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
};
let pageCurrent = 1;
let searchQuery = '';
let gallery = new SimpleLightbox('.gallery-link');

refs.searchForm.addEventListener('submit', onSearchSubmit);
refs.loadMore.addEventListener('click', onLoadMoreClick);

function onLoadMoreClick(evt) {
  console.dir(refs.searchForm.elements.searchQuery.value);
  pageCurrent += 1;

  refs.loadMore.disabled = true;
  refs.loadMore.textContent = 'Loading...';

  API.fetchPixabay(searchQuery, pageCurrent)
    .then(data => {
      console.log(data);

      refs.gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));

      gallery.refresh();

      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight,
        behavior: 'smooth',
      });

      refs.loadMore.disabled = false;
      refs.loadMore.textContent = 'Load more';

      console.log(pageCurrent * data.hits.length);
      if (pageCurrent * data.hits.length >= data.totalHits) {
        refs.loadMore.hidden = true;
      }

      if (data.hits.length === 0) {
        Notiflix.Notify.failure(
          `Sorry, there are no images matching your search query. Please try again.`
        );
      }
    })
    .catch(error => {
      console.log(error.message);
    });
}

function onSearchSubmit(evt) {
  evt.preventDefault();
  searchQuery = evt.currentTarget.elements.searchQuery.value;
  console.log(searchQuery);

  refs.gallery.innerHTML = '';
  pageCurrent = 1;

  API.fetchPixabay(searchQuery, pageCurrent)
    .then(data => {
      console.log(data.hits);

      refs.gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));

      gallery = new SimpleLightbox('.gallery-link');

      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        behavior: 'smooth',
      });

      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

      if (data.hits.length !== data.totalHits) {
        refs.loadMore.hidden = false;
      }

      if (data.hits.length === 0) {
        Notiflix.Notify.failure(
          `Sorry, there are no images matching your search query. Please try again.`
        );
      }
      // refs.loadMore.disabled = false;
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
    })
    .finally(evt.currentTarget.reset());
}

function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        largeImageURL,
      }) =>
        `<div class="photo-card">
            <a class = "gallery-link" href= "${largeImageURL}">
            <img class="cover" src="${webformatURL}" alt="${tags}" loading="lazy" width="300" height="200"/>
            </a> 
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
