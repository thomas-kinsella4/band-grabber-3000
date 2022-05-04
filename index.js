const userInput = document.querySelector("#user-input");
const form = document.querySelector("#artist-search-form");
const body = document.querySelector("body");
const favoriteBtn = document.querySelector("#favorite-btn");
const topArtists = document.getElementsByClassName("trending-artist");

const favoritesArray = [];

const myBandObject = {
    strArtistFanart : "./bandlogo.png",
    strArtist : "ME + NOBODY",
    intBornYear : "2021",
    strBiographyEN : "HOTTEST BAND EVER, AND I MEAN EVER",
    strGenre : "HOT",
    strLabel : "SOON TO BE UNIVERSAL RECORDS AFTER RICHIE MARRIES IEVA"
}

document.addEventListener("DOMContentLoaded", () => {
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (userInput.value === "me + nobody") {
            console.log(myBandObject);
            addArtistInfo(myBandObject)
        } else {
        fetch(`https://www.theaudiodb.com/api/v1/json/2/search.php?s=${userInput.value}`)
        .then((res) => res.json())
        .then((data) => {
        addArtistInfo(data.artists[0]);
    
            });
        }
    })

    
    
    function addArtistInfo(data) {
        const artistInfo = document.querySelector("#artist-info");
        const artistImg = document.querySelector("#artist-logo");
        const artistName = document.querySelector("#artist-name");
        const artistYear = document.querySelector("#artist-year");
        const artistBio = document.querySelector("#artist-bio");
        const artistGenre = document.querySelector("#artist-genre");
        const artistLabel = document.querySelector("#record-label");
        
        favoriteBtn.style.visibility = "visible";
        artistInfo.style.visibility = "visible";
        artistImg.src = data.strArtistFanart;
        artistName.textContent = data.strArtist;
        artistYear.textContent = `  ${data.intBornYear}`;
        artistBio.textContent = data.strBiographyEN;
        artistGenre.textContent = `  ${data.strGenre}`;
        artistLabel.textContent = data.strLabel;
        
    }

    favoriteBtn.addEventListener("click", () => {
        document.querySelector("#favorites-container").style.visibility = "visible";
        const artistName = document.querySelector("#artist-name").textContent;
        let isThere = false;
        for (const artist of favoritesArray) {
            if (artist === artistName) {
                isThere = true;
            } 
        }
        if (isThere === false){
            favoritesArray.push(artistName);
            const favoritesList = document.querySelector("#favorites-list");
        const li = document.createElement("li");
        li.textContent = artistName;
        li.setAttribute("title", artistName);
        favoritesList.appendChild(li);
        li.addEventListener("click", () => {
            fetchArtist(li.title);
            console.log(favoritesArray);
        })
        }
        window.scrollTo({
            top: 2500,
            behavior: "smooth"
        })
    })

    Array.from(topArtists).forEach(artist => {
        artist.addEventListener("click", (e) => fetchArtist(e.target.title));
    })

    function fetchArtist(e){
        fetch(`https://www.theaudiodb.com/api/v1/json/2/search.php?s=${e}`)
            .then((res) => res.json())
            .then((resData) => {
                addArtistInfo(resData.artists[0]);
            })
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
    }
})







 