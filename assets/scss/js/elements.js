import { createElements, addToSearching, searchHandler, keyHandler } from './main.js'

let movieContainer = ''
export let textSearch = null
export let addToSearch
export let movieList = null
export const createMarkup = () => {
  movieContainer = createElements({
    type: 'div',
    container: document.body,
    attr: { 'class': 'container' },
  })
  createElements({
    type: 'h1',
    container: movieContainer,
    inHtml: 'Поиск фильмов',
    attr: {
      'class': 'movie__header',
    },
  })
  const searchBlock = createElements({
    type: 'div',
    container: movieContainer,
    attr: {
      'class': 'search__block',
    },
  })
  const searchWrapper = createElements({
    type: 'div',
    container: searchBlock,
    attr: {
      'class': 'search__wrapper',
    },
  })
  createElements({
    type: 'label',
    container: searchWrapper,
    inHtml: 'Введите название фильма',
    attr: {
      'class': 'search__label',
      'for': 'search__input',
    },
  })

  textSearch = createElements({
    type: 'input',
    container: searchWrapper,
    listeners: { 'keyup': keyHandler },
    attr: {
      'id': 'search__input',
      'class': 'search__input',
      'type': 'text',
      'placeholder': 'поиск',
      'size': '30',
    },
  })

  createElements({
    type: 'button',
    container: searchWrapper,
    inHtml: 'Поиск',
    attr: {
      'class': 'search__btn',
      'type': 'submit',
      'id': 'search__btn',
    },
    listeners: { 'click': searchHandler },
  })
  const addWrapper = createElements({
    type: 'div',
    container: searchBlock,
    attr: {
      'class': 'add__wrapper',
    },
  })
  createElements({
    type: 'label',
    container: addWrapper,
    inHtml: 'Добавить к найденному',
    attr: {
      'class': 'add__label',
      'for': 'add_check',
    },
  })
  addToSearch = createElements({
    type: 'input',
    container: addWrapper,
    attr: {
      'type': 'checkbox',
      'class': 'add__check-box',
      'id': 'add_check',
    },
    listeners: { 'click': addToSearching },
  })

  movieList = createElements({
    type: 'div',
    container: movieContainer,
    attr: { 'class': 'movie__list' },
  })
}
export const addTolist = (movie) => {
  const movieItem = createElements({
    type: 'div',
    container: movieList,
    insertPosition: 'prepend',
    attr: { 'class': 'movie__item' },
  })
  const movieFigure = createElements({
    type: 'div',
    attr: { 'class': 'movie__content' },
    container: movieItem,
  })
  const movieLinkGroup = createElements({
    type: 'div',
    container: movieFigure,
    attr: {
      'class': 'movie__link-group',
    },
  })
  const movieLink = createElements({
    type: 'a',
    container: movieLinkGroup,
    attr: {
      'href': '#',
      'class': 'movie__link',
    },
  })
  createElements({
    type: 'img',
    container: movieLink,
    get attr() {
      if ((/^https?:\/\/([a-zA-Z0-9.\-\\@_/])*\.(jpe?g|png|gif|webp)$/gm).test(movie.Poster)) {
        return {
          'class': 'movie__img',
          'src': movie.Poster,
          'alt': movie.Title,
          'title': movie.Title,
        }
      } else {
        return {
          'class': 'movie__img',
          'src': 'assets/img/noimages.jpg',
          'alt': movie.Title,
          'title': movie.Title,
        }
      }
    },
  })
  createElements({
    type: 'div',
    container: movieLinkGroup,
    attr: { 'class': 'movie__title' },
    inHtml: movie.Title,
  })
}
