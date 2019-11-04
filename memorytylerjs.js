let cardsArray = [{
    'name': 'tyler1',
    'img': 'img/tyler1.png',
  },
  {
    'name': 'tyler2',
    'img': 'img/tyler2.png',
  },
  {
    'name': 'tyler3',
    'img': 'img/tyler3.png',
  },
  {
    'name': 'tyler4',
    'img': 'img/tyler4.png',
  },
  {
    'name': 'tyler5',
    'img': 'img/tyler5.png',
  },
  {
    'name': 'tyler6',
    'img': 'img/tyler6.png',
  },
  {
    'name': 'tyler7',
    'img': 'img/tyler7.png',
  },
  {
    'name': 'tyler8',
    'img': 'img/tyler8.png',
  },
  {
    'name': 'tyler9',
    'img': 'img/tyler9.png',
  },
  {
    'name': 'tyler10',
    'img': 'img/tyler10.png',
  },
  {
    'name': 'tyler11',
    'img': 'img/tyler11.png',
  },
  {
    'name': 'tyler12',
    'img': 'img/tyler12.png',
  },
];

let gameGrid = cardsArray
  .concat(cardsArray)
  .sort(() => 0.5 - Math.random());

let tries = 0;
let xd = 0;
let triesSpan = document.getElementById('tries');

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 700;

let game = document.getElementById('game');
let grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(item => {
  let { name, img } = item;

  let card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  let front = document.createElement('div');
  front.classList.add('front');

  let back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${img})`;

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

let match = () => {
  let selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });
};

let resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
};

grid.addEventListener('click', event => {
  let clicked = event.target;

  if (
    clicked.nodeName === 'SECTION' ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains('selected') ||
    clicked.parentNode.classList.contains('match')
  ) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    } else {
    tries++;
    triesSpan.innerHTML = "Je hebt al "+tries+" x geprobeerd";
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        xd++;
        setTimeout(match, delay);
        if (xd == 12) {
          triesSpan.innerHTML += "<br> Je hebt gewonnen!<br> Klik op F5 om opnieuw te spelen";
        }
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }

});
