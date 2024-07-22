const search = document.getElementById("searchInput");
const image = document.getElementById("image");
const movieName = document.getElementById("movieName");
const year = document.getElementById("year");
const rating = document.getElementById("rating");
const type = document.getElementById("type");

const Genre = document.getElementById("p2");
const Writer = document.getElementById("p3");
const Actors = document.getElementById("p4");
const Plot = document.getElementById("p5");
const Language = document.getElementById("p6");
const winning = document.getElementById("p7");

const searchList = document.getElementById("searchList");

async function loadMovie(searchdata) {
	const apikey = `https://www.omdbapi.com/?s=${searchdata}&page=1&apikey=fa998a0b`;
	const result = await fetch(`${apikey}`);
	const data = await result.json();

	if (data.Response == "True") {
		DisplayData(data.Search);
	}
}

search.addEventListener("input", () => {
	let clean = search.value.trim().replace(/[<>/]/g, "");
	if (search.value == "") {
		searchList.innerHTML = "";
		searchList.style.opacity = "0";
		setTimeout(() => {
			searchList.style.display = "none";
		}, 100);
	} else {
		searchList.style.opacity = "1";
		searchList.style.display = "block";
		loadMovie(clean);
	}
});
document.body.addEventListener("click", () => {
	searchList.style.opacity = "0";
	setTimeout(() => {
		searchList.style.display = "none";
	}, 100);
});

function htmlTempelate(data) {
	return `
        <div class="search-list-item" onclick='movieDetails(${JSON.stringify(data)})'>
            <div class="search-thumbnail">
            <img src="${data.Poster !== "N/A" ? data.Poster : "imageNotFound.png"}" alt="" class="search-Image-Result" id="searchImageResult">
            </div>
            <div class="searchText">
            <p>${data.Title}</p>
            <p>${data.Year}</p>
            </div>
        </div>
    `;
}

function DisplayData(data) {
	searchList.innerHTML = "";
	for (let i = 0; i < data.length; i++) {
		data.sort((a, b) => b.Year - a.Year);
		searchList.style.opacity = "1";
		searchList.style.display = "block";
		searchList.innerHTML += htmlTempelate(data[i]);
	}
}

async function movieDetails(data) {
	let id = data.imdbID;
	let contentDiv = document.getElementById("content-div");
	search.value = "";
	const request = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=fa998a0b`);
	const result = await request.json();
	image.src = data.Poster !== "N/A" ? data.Poster : "imageNotFound.png";

    image.style.opacity = "1";
	contentDiv.style.opacity = "1";
	movieName.innerHTML = data.Title;
	year.innerHTML = `<b>Year:</b> ${data.Year}`;
	rating.innerHTML = `<b>rating: </b> ${result.Ratings[0].Value}`;
	type.innerHTML = `<b>type: </b> ${data.Type}`;

	Genre.innerHTML = `<b>Genre: </b> ${result.Genre}`;
	Writer.innerHTML = `<b>Writer: </b>${result.Director}`;
	Actors.innerHTML = `<b>Actors: </b>${result.Actors}`;
	Plot.innerHTML = `<b>Plot: </b>${result.Plot}`;
	Language.innerHTML = `<b><i>Language: </i></b>${result.Language}`;
	winning.innerHTML = `<i class="material-symbols-outlined award">military_tech</i>${result.Awards}`;
}

let dot1 = document.querySelector(".b1");
let dot2 = document.querySelector(".b2");
let dot3 = document.querySelector(".b3");

search.addEventListener("keyup", () => {
	dot1.classList.add("b11");
	dot2.classList.add("b22");
	dot3.classList.add("b33");
});

search.addEventListener("blur", () => {
	dot1.classList.remove("b11");
	dot2.classList.remove("b22");
	dot3.classList.remove("b33");
});
