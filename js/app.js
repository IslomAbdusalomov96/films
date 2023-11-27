'use strict';
let elForm = document.querySelector('.form');
let elSelect = document.querySelector('.select');
let elInput = document.querySelector('.input');
let elList = document.querySelector('.films__list');
let elResult = document.querySelector('.films__search-result');

elResult.textContent = films.length;
elSelect.innerHTML = null;

const generateGenres = function(film) {
    const uniqueGenres = []
    uniqueGenres.push('All');
    film.forEach(object => {
        object.genres.forEach(genre => {
            if(!uniqueGenres.includes(genre)) {
                uniqueGenres.push(genre);
            }
        })
    })
    uniqueGenres.forEach(genre => {
        let newOption = document.createElement('option');
        newOption.value = genre;
        newOption.textContent = genre;
        elSelect.appendChild(newOption);
    })
}

const renderFilms = function(filmsArray, element) {
    filmsArray.forEach(movie => {
        // Create
        let newItem = document.createElement('li');
        let newCard = document.createElement('div');
        let newImg = document.createElement('img');
        let newCardBody = document.createElement('div');
        let newCardTitle = document.createElement('h5');
        let newCardGeneresList = document.createElement('ul');

        movie.genres.forEach(genre => {
            let newCardGenres = document.createElement('li');
            newCardGenres.setAttribute('class', 'films__genres-item')
            newCardGenres.textContent = genre;
            newCardGeneresList.appendChild(newCardGenres);
        })

        // Set attribute
        newItem.setAttribute('class', 'films__item');
        newCard.setAttribute('class', 'card films__card');
        newImg.setAttribute('class', 'films__img');
        newImg.setAttribute('src', movie.poster);
        newCardBody.setAttribute('class', 'films__card-body');
        newCardTitle.setAttribute('class', 'films__title');
        newCardGeneresList.setAttribute('class', 'films__genres');

        // Text content
        newCardTitle.textContent = movie.title;

        // Append child
        element.appendChild(newItem);
        newItem.appendChild(newCard);
        newCard.appendChild(newImg);
        newCard.appendChild(newCardBody);
        newCardBody.appendChild(newCardTitle);
        newCardBody.appendChild(newCardGeneresList);
    })
}
generateGenres(films);
renderFilms(films, elList);

elForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    let selectValue = elSelect.value;
    let inputValue = elInput.value;
    let filterFilms = films.filter(film => {
        if (film.genres.includes(selectValue) || selectValue === 'All') {
            return film;
        } else if (film.title === inputValue) {
            return film;
        }
    })
    elResult.textContent = filterFilms.length;
    elList.innerHTML = null;
    elInput.value = null;
    renderFilms(filterFilms, elList);
})