const cinema = document.querySelector('.cinema');
const seats = document.querySelectorAll('.cinema__seat');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.cinema__seat--selected');
  
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Movie select event
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
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
})

