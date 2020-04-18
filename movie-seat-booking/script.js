const cinema = document.querySelector('.cinema');
const seats = document.querySelectorAll('.cinema__seat');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const screen = document.querySelector('.cinema__pic');

const movieScreens = [
  'img/frozen2.png',
  'img/joker.png',
  'img/mortalengines.png',
  'img/topgun.png'
];

populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index & price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMovieprice', moviePrice);
}
// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.cinema__seat--selected');
  
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat)); //map works like forEach but return array
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// get data from local storage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if(selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if(selectedSeats.indexOf(index) > -1) {
        seat.classList.add('cinema__seat--selected');
      }
    })
  }

  selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if(selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener('change', ({target}) => {
  const selectedOption = target.selectedOptions[0];
  ticketPrice = +target.value;
  setMovieData(target.selectedIndex, target.value);
  screen.setAttribute('src', movieScreens[selectedOption.id - 1]);
  updateSelectedCount();
})

// Seat click event
cinema.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('cinema__seat') && 
    !e.target.classList.contains('cinema__seat--occupied')
  ) {
    e.target.classList.toggle('cinema__seat--selected');

    updateSelectedCount();
  }
});

//Initial cound and total set
updateSelectedCount(); 