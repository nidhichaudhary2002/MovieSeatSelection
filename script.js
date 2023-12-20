const moviesList = [
  { movieName: 'Flash', price: 7 },
  { movieName: 'Spiderman', price: 5 },
  { movieName: 'Batman', price: 4 },
];
const selectMovieEl = document.getElementById('selectMovie');

const allSeatCont = document.querySelectorAll('#seatCont .seat');
console.log(allSeatCont);

const selectedSeatsHolderEl = document.getElementById('selectedSeatsHolder');

const moviePriceEl = document.getElementById('moviePrice');

const cancelBtnEL = document.getElementById('cancelBtn');

const proceedBtnEl = document.getElementById('proceedBtn');

moviesList.forEach((movie) => {
  const optionEl = document.createElement('option');
  optionEl.innerHTML = `${movie.movieName} $${movie.price}`;
  selectMovieEl.appendChild(optionEl);
});

let moviePrice = 7;
let currentMovieName = `Tom and Jerry 2021`;

selectMovieEl.addEventListener('input', (e) => {
  let movieName = e.target.value.split('');
  let dollarIndex = movieName.indexOf('$');
  let movie = movieName.splice(0, dollarIndex - 1).join('');
  currentMovieName = movie;
  moviePrice = JSON.parse(movieName.splice(2, dollarIndex).join(''));

  updatMovieName(movie, moviePrice);
  updatePrice(moviePrice, takenSeats.length);
});
//
let initialSeatValue = 0;
allSeatCont.forEach((seat) => {
  const attr = document.createAttribute('data-seatid');
  attr.value = ++initialSeatValue;
  seat.setAttributeNode(attr);
});

let seatContEl = document.querySelectorAll('#seatCont .seat:not(.occupied)');
// console.log(seatContEl);
let takenSeats = [];

seatContEl.forEach((seat) => {
  seat.addEventListener(
    'click',
    (e) => {
      let isSelected = seat.classList.contains('selected');

      let seatId = JSON.parse(seat.dataset.seatid);

      if (!isSelected) {
        seat.classList.add('selected');
        takenSeats.push(seatId);
        takenSeats = [...new Set(takenSeats)];
      } else if (isSelected) {
        seat.classList.remove('selected');

        takenSeats = takenSeats.filter((seat) => {
          // console.log(seat,seatId)
          if (seat !== seatId) {
            return seat;
          }
        });
      }
      updateSeats();
      updatePrice(moviePrice, takenSeats.length);
    },
    { once: true }
  );
});

function updateSeats() {
  selectedSeatsHolderEl.innerHTML = ``;

  takenSeats.forEach((seat) => {
    const seatHolder = document.createElement('div');
    seatHolder.classList.add('selectedSeat');
    selectedSeatsHolderEl.appendChild(seatHolder);

    seatHolder.innerHTML = seat;
  });

  if (!takenSeats.length) {
    const spanEl = document.createElement('span');
    spanEl.classList.add('noSelected');
    spanEl.innerHTML = `NO SEAT SELECTED`;
    selectedSeatsHolderEl.appendChild(spanEl);
  }

  seatCount();
}

function seatCount() {
  const numberOfSeatEl = document.getElementById('numberOfSeat');
  numberOfSeatEl.innerHTML = takenSeats.length;
}

function updatMovieName(movieName, price) {
  const movieNameEl = document.getElementById('movieName');
  const moviePriceEl = document.getElementById('moviePrice');
  movieNameEl.innerHTML = movieName;
  moviePriceEl.innerHTML = `$ ${price}`;
}

function updatePrice(price, seats) {
  const totalPriceEl = document.getElementById('totalPrice');
  let total = seats * price;
  totalPriceEl.innerHTML = `$ ${total}`;
}

cancelBtn.addEventListener('click', (e) => {
  cancelSeats();
});

function cancelSeats() {
  takenSeats = [];
  seatContEl.forEach((seat) => {
    seat.classList.remove('selected');
  });
  updatePrice(0, 0);
  updateSeats();
}

proceedBtnEl.addEventListener('click', (e) => {
  if (takenSeats.length) {
    alert('Yayy! Your Seats has been booked');
    uncancelSeats();
  } else {
    alert('Oops no seat Selected');
  }
});

function uncancelSeats() {
  takenSeats = [];
  console.log(seatContEl);
  seatContEl.forEach((seat) => {
    if (seat.classList.contains('selected')) {
      console.log(seat);
      seat.classList.remove('selected');
      seat.classList.add('seat');
      seat.classList.add('occupied');
    }
  });
  updatePrice(0, 0);
  updateSeats();
}

// //Create you project here from scratch
// const moviesList = [
//   { movieName: 'Flash', price: 7 },
//   { movieName: 'Spiderman', price: 5 },
//   { movieName: 'Batman', price: 4 },
// ];

// // Get elements
// const selectMovie = document.getElementById('selectMovie');
// const movieName = document.getElementById('movieName');
// const moviePrice = document.getElementById('moviePrice');
// const seatContainer = document.getElementById('seatCont');
// const selectedSeatsHolder = document.getElementById('selectedSeatsHolder');
// const continueBtn = document.getElementById('continueBtn');
// const cancelBtn = document.getElementById('cancelBtn');

// // Populate the dropdown menu with movies
// moviesList.forEach((movie, index) => {
//   const option = document.createElement('option');
//   option.value = index;
//   option.textContent = movie.movieName;
//   selectMovie.appendChild(option);
// });

// // Set default movie values
// movieName.textContent = moviesList[0].movieName;
// moviePrice.textContent = moviesList[0].price;

// // Event listener for movie selection
// selectMovie.addEventListener('change', () => {
//   const selectedMovieIndex = selectMovie.value;
//   movieName.textContent = moviesList[selectedMovieIndex].movieName;
//   moviePrice.textContent = moviesList[selectedMovieIndex].price;
//   updateSelectedSeats(); // Call this function to update price based on seat selection
// });

// // Event listeners for seats
// const seats = document.querySelectorAll('#seatCont .seat:not(.occupied)');

// seats.forEach((seat) => {
//   seat.addEventListener('click', () => {
//     seat.classList.toggle('selected');
//     updateSelectedSeats();
//   });
// });

// // Function to update selected seats information
// function updateSelectedSeats() {
//   const selectedSeats = document.querySelectorAll('#seatCont .seat.selected');
//   const selectedSeatsArray = Array.from(selectedSeats);
//   const selectedSeatsText = selectedSeatsArray
//     .map((seat) => seat.textContent)
//     .join(', ');
//   selectedSeatsHolder.textContent = selectedSeatsText;

//   // Calculate total price based on selected seats
//   const moviePriceValue = parseInt(moviePrice.textContent);
//   const totalPrice = moviePriceValue * selectedSeatsArray.length;
//   // Update the total price element
//   // Assume you have an element with the id "totalPrice" to display the total price
//   document.getElementById('totalPrice').textContent = totalPrice;
// }

// // Event listener for continue button
// continueBtn.addEventListener('click', () => {
//   const selectedSeats = document.querySelectorAll('#seatCont .seat.selected');
//   if (selectedSeats.length === 0) {
//     alert('Oops, no seat selected!');
//   } else {
//     alert('Yayy! Your seats have been booked!');
//     selectedSeats.forEach((seat) => {
//       seat.classList.remove('selected');
//       seat.classList.add('occupied');
//     });
//     // Update the total price to 0
//     document.getElementById('totalPrice').textContent = 0;
//     // Update the selected seats holder to its default value
//     selectedSeatsHolder.textContent = 'No seat selected';
//   }
// });

// // Event listener for cancel button
// cancelBtn.addEventListener('click', () => {
//   const selectedSeats = document.querySelectorAll('#seatCont .seat.selected');
//   selectedSeats.forEach((seat) => {
//     seat.classList.remove('selected');
//   });
//   // Update the total price to 0
//   document.getElementById('totalPrice').textContent = 0;
//   // Update the selected seats holder to its default value
//   selectedSeatsHolder.textContent = 'No seat selected';
// });
