const BASE = "https://swapi.dev/api";

const btnPlanet = document.querySelector(".btn-planet");
const btnHero = document.querySelector(".btn-hero");
const btnStarship = document.querySelector(".btn-starship");
let btnPlanetActive = false;
let btnHeroActive = false;
let btnStarshipActive = false;

class Hero {
  constructor(name) {
    this.name = name;
  }
}

class newHero extends Hero {
  constructor(name, birth_year, height) {
    super(name);
    this.birth_year = birth_year;
    this.height = height;
  }
  addInfo = () => {
    const heroInfo = document.querySelector(".hero-info");
    heroInfo.innerHTML = `
    <h3>${this.name}</h3>
    <p>Birth year: ${this.birth_year}</p>
    <p>Height: ${this.height}</p>
    `;
  };
}

function getInfo(url) {
  return new Promise((resolve, reject) => {
    fetch(`${BASE}/${url}`)
      .then((res) => {
        if (res.status < 400) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then((res) => resolve(res))
      .catch((res) => res.json().then((error) => reject(error)));
  });
}

function btnPlanetHandler() {
  getInfo("planets/1")
    .then((res) => {
      if (btnPlanetActive) {
        const planetInfo = document.querySelector(".planet-info");
        planetInfo.innerHTML = "";
        btnPlanetActive = false;
      } else {
        const planetInfo = document.querySelector(".planet-info");
        planetInfo.innerHTML = `
            <h3>${res.name}</h3>
            <p>Diameter: ${res.diameter}</p>
            <p>Climate: ${res.climate}</p>
        `;
        btnPlanetActive = true;
      }
    })
    .catch((err) => console.log(err));
}

function btnHeroHandler() {
  getInfo("people/4")
    .then((res) => {
      if (btnHeroActive) {
        const heroInfo = document.querySelector(".hero-info");
        heroInfo.innerHTML = "";
        btnHeroActive = false;
      } else {
        const { name, birth_year, height } = res;
        const hero = new newHero(name, birth_year, height);
        hero.addInfo(); //closure: inner: {heroInfo: node}, outer: {name, birth_year, height: String}
        btnHeroActive = true;
      }
    })
    .catch((err) => console.log(err));
}

function btnStarshipHandler() {
  getInfo("starships/2")
    .then((res) => {
      if (btnStarshipActive) {
        const starshipInfo = document.querySelector(".starship-info");
        starshipInfo.innerHTML = "";
        btnStarshipActive = false;
      } else {
        const starshipInfo = document.querySelector(".starship-info");
        starshipInfo.innerHTML = `
          <h3>${res.name}</h3>
          <p>Starship class: ${res.starship_class}</p>
          <p>Length: ${res.length}</p>
      `;
        btnStarshipActive = true;
      }
    })
    .catch((err) => console.log(err));
}

btnPlanet.addEventListener("click", btnPlanetHandler);
btnHero.addEventListener("click", btnHeroHandler);
btnStarship.addEventListener("click", btnStarshipHandler);
