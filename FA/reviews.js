// Initialize the review data array if it doesn't exist
if (!window.reviewData) {
  window.reviewData = [];
}

console.log(window.reviewData);

// Function to generate review cards
function generateReviewCards() {
    // Get the review container
    const reviewContainer = document.querySelector('#reviews-container');
  
    // Clear any existing review cards
    reviewContainer.innerHTML = '';
  
    // Loop through the review data and create a card for each review
    for (let i = 0; i < window.reviewData.length; i++) {  // Note the use of window.reviewData here
      // Create the card div
      const card = document.createElement('div');
      card.classList.add('card');
  
      // Create the image element
      const image = document.createElement('img');
      image.src = window.reviewData[i].image;
      image.alt = window.reviewData[i].name;
      card.appendChild(image);
  
      // Create the name element
      const name = document.createElement('h2');
      name.textContent = window.reviewData[i].name;
      card.appendChild(name);
  
      // Create the date element
      const date = document.createElement('p');
      date.classList.add('date');
      const formattedDate = new Date(window.reviewData[i].date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
      date.textContent = formattedDate;
    
      

      card.appendChild(date);
  
      // Create the rating element
      const rating = document.createElement('p');
      rating.classList.add('rating');
      for (let j = 0; j < window.reviewData[i].rating; j++) {
        const star = document.createElement('span');
        star.textContent = '★';
        rating.appendChild(star);
      }
      for (let j = window.reviewData[i].rating; j < 5; j++) {
        const star = document.createElement('span');
        star.textContent = '☆';
        rating.appendChild(star);
      }
      card.appendChild(rating);
  
      // Create the review element
      const review = document.createElement('p');
      review.textContent = window.reviewData[i].review;  // Use the 'review' property instead of 'text'
      card.appendChild(review);
  
      // Add the card to the container
      reviewContainer.appendChild(card);
    }
    console.log(window.reviewData);
  }
  
  

// Function to add a new review
function addReview(event) {
  event.preventDefault();

  // Get the form values
  const nameInput = document.querySelector('#name-input');
  console.log('name input:', nameInput.value);
  const ratingInput = document.querySelector('#rating-input');
  console.log('rating input:', ratingInput.value);
  const reviewInput = document.querySelector('#review-input');
  console.log('review input:', reviewInput.value);

  // Create a new review object
  const newReview = {
    name: nameInput.value,
    date: new Date().toISOString().slice(0, 10),
    rating: parseInt(ratingInput.value),
    review: reviewInput.value,
    image: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_960_720.png",
  };
  console.log(window.reviewData);
  console.log('new review:', newReview);
  // Add the new review to the data
  reviewData.push(newReview);
  console.log('reviewData:', reviewData);
  // Clear the form inputs
  nameInput.value = '';
  ratingInput.value = '';
  reviewInput.value = '';

  // Regenerate the review cards
  generateReviewCards();
  console.log(window.reviewData);
  console.log();
}

document.addEventListener("DOMContentLoaded", function() {
  const reviewForm = document.querySelector('#review-form');
  reviewForm.addEventListener('submit', addReview);
  console.log(window.reviewData);
  // Generate review cards using the pre-defined review data
  generateReviewCards();

});


