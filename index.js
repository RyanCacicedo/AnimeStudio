const searchRes = document.querySelector(".anime__results");
const animeHTML = document.querySelector(".anime__container");

async function renderAnime(title) {
  animeHTML.innerHTML = '<i class="fa-solid fa-spinner"></i>';
  const animes = await getData(title);
  animes["data"].sort((a, b) => b.score - a.score);
  const anime = animes["data"]
    .slice(0, 9)
    .map((anime) => {
      return `<div class="movie">
        <figure class="movie__img--wrapper">
        <img src="${
          anime.images.jpg.large_image_url
        }" alt="" class="movie__img">
        <a href="${anime.url}" class="img__link" target="_blank"></a>
        </figure>
        <div class= "anime__organizer">
        <h3 class="movie__title">${anime.title} ${animeYear(
        anime.year
      )}<br> <a href="${
        anime.url
      }" class="anime__link" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i></a></h3>
        <div class="anime__rating">
        ${animeRating(anime.score)}${ratingremainder(anime.score)}
        </div>
        </div>
        </div>`;
    })
    .join("");
  setTimeout(() => {
    searchRes.innerHTML = `<h2 class="anime__results">Search Results For: <br> <br> <span class="text__orange">${title.replace(
      /(?<= )[^\s]|^./g,
      (a) => a.toUpperCase()
    )}</span></h2>`;
    animeHTML.innerHTML = anime;
  }, 1000);
}

function animeYear(year) {
  if (year === null) {
    return ``;
  }
  return `(${year})`;
}

function animeRating(rating) {
  let ratingHTML = "";
  for (let i = 0; i < rating; ++i)
    if (i < Math.floor(rating)) {
      ratingHTML += '<i class="fa-solid fa-star"></i>';
    }
  if (!Number.isInteger(rating)) {
    ratingHTML += '<i class="fa-regular fa-star-half-stroke"></i>';
  }
  if (rating === null) {
    return "";
  }
  return ratingHTML;
}
function ratingremainder(rating) {
  let ratingHTML10 = "";
  for (let i = 1; i < rating; ++i)
    if (i < 10 - rating) {
      ratingHTML10 += '<i class="fa-regular fa-star"></i>';
    }
  return ratingHTML10;
}

async function getData(title) {
  const fetchAnime = await fetch(`https://api.jikan.moe/v4/anime?q=${title}`);
  const animeData = await fetchAnime.json();
  return animeData;
}

if (filter === "ASCENDING_YEAR") {
  renderAnime(animeData.sort((a, b) => a.animeYear - b.animeYear));
} else if (filter === "DESCENDING_YEAR") {
  renderAnime(animeData.sort((a, b) => b.year - a.year));
} else if (filter === "RATING") {
  renderAnime(animeData.sort((a, b) => b.rating - a.rating));
}

// https://api.jikan.moe/v4/anime
