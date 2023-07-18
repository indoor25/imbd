/* eslint-disable no-restricted-syntax */

import {
  createMarkup,
  textSearch,
  addToSearch,
  movieList,
  addTolist,
} from './elements.js'

let lastSearch = ''
let addSearch = false

const getData = async url => {
  const dataArr = await fetch(url)
    .then(data => data.json())
  return dataArr
}

export const createElements = ({
  type,
  attr = {},
  container = null,
  inHtml = null,
  listeners = {},
  insertPosition = 'append',
}) => {
  const elem = document.createElement(type)
  if (inHtml) elem.innerHTML = inHtml
  for (const elemKey in attr) {
    if (Object.hasOwn(attr, elemKey)) {
      elem.setAttribute(elemKey, attr[elemKey])
    }
  }
  if (container) {
    switch (insertPosition) {
      case 'append':
        container.append(elem)
        break
      case 'prepend':
        container.prepend(elem)
        break
      case 'after':
        container.after(elem)
        break
      case 'before':
        container.before(elem)
        break
    }
  }
  if (Object.keys(listeners).length !== 0) {
    for (const elemKey in listeners) {
      if (Object.hasOwn(listeners, elemKey)) {
        elem.addEventListener(elemKey, listeners[elemKey])
      }
    }
  }
  return elem
}

export const addToSearching = () => {
  addSearch = addToSearch.checked
}
export const keyHandler = e => {
  if (e.code === 'Enter' && textSearch.value.length > 2) searchHandler()
}
export const searchHandler = () => {
  if (textSearch.value.length > 2) {
    if (lastSearch === textSearch.value) return
    lastSearch = textSearch.value
    if (!addSearch) movieList.innerHTML = ''
    getData(`http://www.omdbapi.com/?apikey=6be33cc&s=${textSearch.value}`)
      .then(data => data.Search)
      .then(movies => movies.forEach(movie => addTolist(movie)))
      .catch(err => console.log(err.message))
  }
}

const init = () => {
  createMarkup()
}

init()
