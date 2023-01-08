const searchRes = document.querySelector(".anime__results");
const animeHTML = document.querySelector(".anime__container");

async function renderAnime(title) {
  animeHTML.innerHTML = '<i class="fa-solid fa-spinner"></i>';
  try {
    let animes = await getData(title);
    {
      animes["data"].sort((a, b) => b.score - a.score);
    }
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
          <h3 class="movie__title">${anime.title} ${getAnimeYear(
          anime.year
        )}<br> <a href="${
          anime.url
        }" class="anime__link" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i></a></h3>
          <div class="anime__rating">
          ${getAnimeRating(anime.score)}${getRatingRemainder(anime.score)}
          </div>
          </div>
          </div>`;
      })
      .join("");
    setTimeout(() => {
      searchRes.innerHTML = `<h2 class="anime__results">Search Results For: <span class="search__results-text">${title.replace(
        /(?<= )[^\s]|^./g,
        (a) => a.toUpperCase()
      )}</span></h2>`;
      animeHTML.innerHTML = anime;
    }, 1000);
  } catch (error) {
    console.error(error);
    animeHTML.innerHTML = "An error occurred while fetching data.";
  }
}

function getAnimeYear(year) {
  if (year === null) {
    return ``;
  }
  return `(${year})`;
}

function getAnimeRating(rating) {
  if (rating === null) {
    return "";
  }
  let ratingHTML = "";
  for (let i = 0; i < rating; ++i) {
    ratingHTML += '<i class="fa-solid fa-star"></i>';
  }
  if (!Number.isInteger(rating)) {
    ratingHTML += '<i class="fa-regular fa-star-half-stroke"></i>';
  }
  return ratingHTML;
}

function getRatingRemainder(rating) {
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

// Example of how to call the renderAnime function
// renderAnime("Naruto", "ASCENDING_YEAR");

// https://api.jikan.moe/v4/anime
