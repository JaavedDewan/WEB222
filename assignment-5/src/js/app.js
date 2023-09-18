/**
 * WEB222 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       Jaaved Dewan
 *      Student ID: 126045178
 *      Date:       03/23/23
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;

// For debugging, display all of our data in the console. You can remove this later.
console.log(
  {
    artists,
    songs
  },
  "App Data"
);

function createSongCards(songs) {
  // Get the container where song cards will be added
  const songCardsContainer = document.querySelector("#song");

  // Clear any existing content in the container
  songCardsContainer.innerHTML = "";

  // Loop through each song in the list and create a song card for each
  songs.forEach((song) => {
    const { imageUrl, artistId, title, year, duration } = song;

    // Create a div element for the song card and add the 'song-card' class to it
    const songCard = document.createElement("div");
    songCard.classList.add("song-card");

    // Create an image element for the song card, set its attributes, and append it to the song card
    const cardImg = document.createElement("img");
    cardImg.setAttribute("src", imageUrl);
    cardImg.setAttribute("alt", artistId);
    cardImg.setAttribute("width", "200px");
    songCard.appendChild(cardImg);

    // Create a div element for the song details and add the 'card-details' class to it
    const cardDetailsContainer = document.createElement("div");
    cardDetailsContainer.classList.add("card-details");

    // Create a span element for the song year and add it to the song details container
    const songYear = document.createElement("span");
    songYear.innerHTML = `<time>${year}</time>`;
    cardDetailsContainer.appendChild(songYear);

    // Create a span element for the song length and add it to the song details container
    const songLength = document.createElement("span");
    songLength.textContent = `${Math.floor(duration / 60)}:${duration % 60 < 10 ? "0" : ""}${
      duration % 60
    }`;
    cardDetailsContainer.appendChild(songLength);

    // Create a div element for the song title and add the 'name' class to it
    const cardTitleContainer = document.createElement("div");
    cardTitleContainer.textContent = title;
    cardTitleContainer.classList.add("name");

    // Append the song details and title to the song card
    songCard.appendChild(cardDetailsContainer);
    cardDetailsContainer.appendChild(cardTitleContainer);

    // Add the song card to the container
    songCardsContainer.appendChild(songCard);

    // Add a click event listener to the song card that logs the song's details to the console
    songCard.addEventListener("click", () => {
      const durationInSeconds = duration % 60;
      const durationInMinutes = Math.floor(duration / 60);
      const formattedDuration = `${durationInMinutes}:${
        durationInSeconds < 10 ? "0" : ""
      }${durationInSeconds}`;
      console.log([title, year, formattedDuration].join(", "));
    });
  });
}

//Function to show update the h2 according to the artist selected
const showSelectedArtistDetails = (artist) => {
  //Declare a variable to refer to the h2 node
  const artistNameTag = document.querySelector("h2");
  //Populate the first of the h2 tag content with the name and '( '
  artistNameTag.innerHTML = `${artist.name} (`;

  //Append the links to the h2 tag in a formatted manner using an anchor tag
  artist.links.forEach((link, index) => {
    const linkTag = document.createElement("a");
    //Use the link being currently iterated through to provide details to the anchor tag
    linkTag.href = link.url;
    linkTag.textContent = link.name;
    artistNameTag.appendChild(linkTag);

    //Add a comma if the last link has not been reached
    if (index !== artist.links.length - 1) {
      artistNameTag.innerHTML += ", ";
    }
  });
  artistNameTag.innerHTML += ")";
};

//Upon an artist being selected show the corresponding songs
const showSelectedSongs = (artist) => {
  //Filter the master song array with only the selected artist of those not being flagged
  const artistSongs = songs.filter((song) => song.artistId === artist.id && song.flagged === false);
  createSongCards(artistSongs);
};

// Upon initial page load up
document.addEventListener("DOMContentLoaded", function () {
  //Iterate through each artist element and create a button
  artists.forEach((artist) => {
    const artistBtn = document.createElement("button");
    //Populate button with its details
    artistBtn.id = artist.id;
    artistBtn.textContent = artist.name;
    //Add event listener such that upon the button being clicked, the cards for the chosen artist displays
    artistBtn.addEventListener("click", function () {
      console.log(`Clicked on button for artist ${artist.name}`);
      //Also display details
      showSelectedArtistDetails(artist);
      showSelectedSongs(artist);
    });
    const menuNav = document.querySelector("#menu");
    menuNav.appendChild(artistBtn);

    document.querySelector("#menu button").click();
  });
});
