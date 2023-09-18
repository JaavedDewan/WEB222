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
console.log({ artists, songs }, "App Data");

// Create a function that takes an artist object and displays their name and links in the DOM
const displayArtist = (artist) => {
  // Get the HTML tag where the artist name will be displayed
  const artistNameTag = document.querySelector("h2");
  // Destructure the name and links attributes from the artist object
  const { name, links } = artist;
  // Map the links to an array of HTML anchor tags and join them together with commas
  const linksHtml = links.map((link) => `<a href="${link.url}">${link.name}</a>`).join(", ");
  // Set the innerHTML of the artistNameTag to display the name and links
  artistNameTag.innerHTML = `${name} (${linksHtml})`;
};

// This function displays the songs for a given artist
const displaySongs = (artist) => {
  // Filter the songs array to only include songs that belong to the given artist and are not flagged
  const artistSongs = songs.filter((song) => song.artistId === artist.id && !song.flagged);

  // Get a reference to the table body
  const tbody = document.querySelector("tbody");

  // Clear the table body
  tbody.innerHTML = "";

  // Iterate through each song in the artistSongs array
  artistSongs.forEach((song) => {
    // Destructure the song object to get the title, year, and duration properties
    const { title, year, duration } = song;

    // Create a new row element and three new cell elements
    const tr = document.createElement("tr");
    const tdTitle = document.createElement("td");
    const tdYear = document.createElement("td");
    const tdDuration = document.createElement("td");

    // Set the text content of the cell elements to the title, year, and duration of the song
    tdTitle.textContent = title;
    tdYear.textContent = year;
    tdDuration.textContent = `${Math.floor(duration / 60)}:${duration % 60}`;

    // Append the cell elements to the row element
    tr.appendChild(tdTitle);
    tr.appendChild(tdYear);
    tr.appendChild(tdDuration);

    // Append the row element to the table body
    tbody.appendChild(tr);

    // Add an event listener to the row element that logs the song title to the console when clicked
    tr.addEventListener("click", function () {
      console.log(title);
    });
  });
};

// This event listener fires when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Set the innerHTML of the thead element to include the headers for the song table
  document.querySelector(
    "thead"
  ).innerHTML = `<th>Song Name</th><th>Year Recorded</th><th>Duration (mm:ss)</th>`;
  // Iterate through each artist in the artists array
  artists.forEach((artist) => {
    // Create a new button element for the artist and set its ID and text content
    const button = document.createElement("button");
    button.id = artist.id;
    button.textContent = artist.name;
    // Get a reference to the menu navigation element and append the button to it
    const menuNav = document.querySelector("#menu");
    menuNav.appendChild(button);
    // Get the first artist in the artists array and display their information and songs
    const Artist1st = artists[0];
    displayArtist(Artist1st);
    displaySongs(Artist1st);
  });
  // Add event listeners to all buttons in the menu
  document.querySelectorAll("button").forEach((button) => {
    // When a button is clicked, get the artist id from its id attribute
    button.addEventListener("click", function (click) {
      const artistId = click.target.id;
      // Find the artist object in the artists array that matches the id
      const ArtistInfo = artists.find((artist) => artist.id === artistId);
      // Set the heading to display the artist's name
      document.querySelector("h2").textContent = ArtistInfo.name;
      // Display the artist's information and songs
      displayArtist(ArtistInfo);
      displaySongs(ArtistInfo);
    });
  });
});
