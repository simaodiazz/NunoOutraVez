<script lang="ts">

import axios from 'axios';

export default {
  data() {
    return {
      cars: [],
      inputModel: "",
      inputPrice: "",
      inputYear: "",
      carId: "",
      isRenting: false,
      sucessRequest: false
    };
  },

  async created() {
    await this.getCars()

    // Apenas para apresentar 3
    this.cars = this.cars.slice(0, 3)

    for (let i = 0; i < localStorage.length; i++) {
      const key: string = localStorage.key(i);
      const value = localStorage.getItem(key);
      console.log(`Chave: ${key}, Valor: ${value}`);
    }
  },

  methods: {
    login() {
      this.$router.push('/login')
    },

    async getCars() {
      try {
        const response = await axios.get('http://192.168.56.1:3000/api/v1/cars');
        this.cars = response.data;
      } catch (error) {
        console.error('Erro ao obter a lista de carros:', error.message);
      }
    },

    async filter() {
      await this.getCars();

      let filteredCars = [...this.cars];

      if (this.inputModel !== "") {
        filteredCars = filteredCars.filter(
          (car) =>
            car.name.toLowerCase().includes(this.inputModel.toLowerCase())
        );
      }

      if (this.inputPrice !== "") {
        filteredCars = filteredCars.filter(
          (car) => parseFloat(car.price) <= parseFloat(this.inputPrice)
        );
      }

      if (this.inputYear !== "") {
        filteredCars = filteredCars.filter(
          (car) => parseInt(car.year) == parseInt(this.inputYear)
        );
      }

      this.cars = filteredCars.slice(0, 3);
    },

    all() {
      this.cars = this.getCars()
    },

    rent(carId) {
      this.isRenting = true
      this.carId = carId
      console.log(carId)
    },

    requestRent() {
      // Obter o token JWT do localStorage
      const token = localStorage.getItem('token');

      // Verificar se o token existe
      if (token) {
        // Extrair o payload do token JWT
        const tokenPayload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(tokenPayload));

        // Extrair o UUID do usuário do payload decodificado
        const userId = decodedPayload.userId;

        console.log("ID user: " + userId)
        console.log("ID car: " + this.carId)

        // Agora você pode usar o userId conforme necessário, por exemplo, enviá-lo como parte da solicitação HTTP
        axios.post('http://192.168.56.1:3000/api/v1/renteds', { UserId: userId, CarId: this.carId })
          .then(response => {
            this.isRenting = false
            this.sucessRequest = true
            setTimeout(() => {
              this.sucessRequest = false
            }, 5000);
          })
          .catch(error => {
            console.log(error)
          }
        );
      } else {
        this.$router.push('/login')
      }
    },

    cancelRent() {
      this.isRenting = false;
    }
  }
};

</script>

<template>

  <div id="overlay" class="overlay" v-if="isRenting">a <br> a <br> a a a a a </div>
  <div id="overlay" class="overlay" v-if="sucessRequest"> </div>

  <div id="modal" class="modal" v-if="isRenting">
    <div class="modal-content">
      <h2>Pedido de Aluguel</h2>
      <p>Gostaria de solicitar o aluguel deste carro?</p>
      <div class="modal-buttons">
        <button class="btn alugar" @click="requestRent">Pedir Aluguel</button>
        <button class="btn cancelar" @click="cancelRent">Cancelar Pedido</button>
      </div>
    </div>
  </div>

  <div id="modal" class="modal" v-if="sucessRequest">
    <p>Carro encomendado com sucesso.</p>
    <div class="modal-buttons">
      <button class="btn alugar" @click="sucessRequest = false">Fechar</button>
    </div>
  </div>

  <div>
    <header class="header" data-header>
      <div class="container">
        <div class="overlay" data-overlay></div>
        <a href="#" class="logo">
          <img src="./assets/images/logo.svg" alt="Ridex logo">
        </a>
        <nav class="navbar" data-navbar>
          <ul class="navbar-list">
            <li>
              <a href="#home" class="navbar-link" data-nav-link>Home</a>
            </li>
            <li>
              <a href="#featured-car" class="navbar-link" data-nav-link>Explore cars</a>
            </li>
          </ul>
        </nav>
        <div class="header-actions">
          <div class="header-contact">
            <a href="tel:88002345678" class="contact-link">8 800 234 56 78</a>
            <span class="contact-time">Mon - Sat: 9:00 am - 6:00 pm</span>
          </div>
          <a href="#featured-car" class="btn" aria-labelledby="aria-label-txt">
            <ion-icon name="car-outline"></ion-icon>
            <span id="aria-label-txt">Explore cars</span>
          </a>
          <a href="#" class="btn user-btn" @click="login()" aria-label="Profile">
            <ion-icon name="person-outline"></ion-icon>
          </a>
          <button class="nav-toggle-btn" data-nav-toggle-btn aria-label="Toggle Menu">
            <span class="one"></span>
            <span class="two"></span>
            <span class="three"></span>
          </button>
        </div>
      </div>
    </header>
    <main>
      <article>
        <section class="section hero" id="home">
          <div class="container">
            <div class="hero-content">
              <h2 class="h1 hero-title">The easy way to takeover a lease</h2>
              <p class="hero-text">
                Live in New York, New Jerset and Connecticut!
              </p>
            </div>
            <div class="hero-banner"></div>
            <form @submit.prevent="filter()" action="" class="hero-form">
              <div class="input-wrapper">
                <label for="input-1" class="input-label">Car, model, or brand</label>
                <input type="text" v-model="inputModel" name="car-model" id="input-1" class="input-field"
                  placeholder="What car are you looking?">
              </div>
              <div class="input-wrapper">
                <label for="input-2" class="input-label">Max. monthly payment</label>
                <input type="text" v-model="inputPrice" name="monthly-pay" id="input-2" class="input-field" placeholder="Add an amount in $">
              </div>
              <div class="input-wrapper">
                <label for="input-3" class="input-label">Make Year</label>
                <input type="text" v-model="inputYear" name="year" id="input-3" class="input-field" placeholder="Add a minimal make year">
              </div>
              <button type="submit" class="btn">Search</button>
            </form>
          </div>
        </section>
        <section class="section featured-car" id="featured-car">
          <div class="container">
            <div class="title-wrapper">
              <h2 class="h2 section-title">Featured cars</h2>
              <a @click="all()" class="featured-car-link">
                <span>View more</span>
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </a>
            </div>
            <ul class="featured-car-list">
              <li v-for="car in cars" :key="car.id">
                <div class="featured-car-card">
                  <figure class="card-banner">
                    <img :src="car.imageUrl" :alt="car.model" loading="lazy" width="440" height="300" class="w-100">
                  </figure>
                  <div class="card-content">
                    <div class="card-title-wrapper">
                      <h3 class="h3 card-title">
                        <a href="#">{{ car.name }}</a>
                      </h3>
                      <data class="year" :value="car.year">{{ car.year }}</data>
                    </div>
                    <ul class="card-list">
                      <li class="card-list-item">
                        <ion-icon name="people-outline"></ion-icon>
                        <span class="card-item-text">{{ car.personCapacity }}</span>
                      </li>
                      <li class="card-list-item">
                        <ion-icon name="flash-outline"></ion-icon>
                        <span class="card-item-text">{{ car.fuel }}</span>
                      </li>
                      <li class="card-list-item">
                        <ion-icon name="speedometer-outline"></ion-icon>
                        <span class="card-item-text">{{ car.km }}</span>
                      </li>
                      <li class="card-list-item">
                        <ion-icon name="hardware-chip-outline"></ion-icon>
                        <span class="card-item-text">{{ car.maxLiters }}</span>
                      </li>
                      </ul>
                    <div class="card-price-wrapper">
                      <p class="card-price">
                        <strong>{{ car.price }}€</strong> / month
                      </p>
                      <button class="btn fav-btn" aria-label="Add to favourite list">
                        <ion-icon name="heart-outline"></ion-icon>
                      </button>
                      <button @click="rent(car.id)" class="btn">Rent now</button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section class="section get-start">
          <div class="container">
            <h2 class="h2 section-title">Get started with 4 simple steps</h2>
            <ul class="get-start-list">
              <li>
                <div class="get-start-card">
                  <div class="card-icon icon-1">
                    <ion-icon name="person-add-outline"></ion-icon>
                  </div>
                  <h3 class="card-title">Create a profile</h3>
                  <p class="card-text">
                    If you are going to use a passage of Lorem Ipsum, you need to be sure.
                  </p>
                  <a href="#" class="card-link">Get started</a>
                </div>
              </li>
              <li>
                <div class="get-start-card">
                  <div class="card-icon icon-2">
                    <ion-icon name="car-outline"></ion-icon>
                  </div>
                  <h3 class="card-title">Tell us what car you want</h3>
                  <p class="card-text">
                    Various versions have evolved over the years, sometimes by accident, sometimes on purpose
                  </p>
                </div>
              </li>
              <li>
                <div class="get-start-card">
                  <div class="card-icon icon-3">
                    <ion-icon name="person-outline"></ion-icon>
                  </div>
                  <h3 class="card-title">Match with seller</h3>
                  <p class="card-text">
                    It to make a type specimen book. It has survived not only five centuries, but also the leap into
                    electronic
                  </p>
                </div>
              </li>
              <li>
                <div class="get-start-card">
                  <div class="card-icon icon-4">
                    <ion-icon name="card-outline"></ion-icon>
                  </div>
                  <h3 class="card-title">Make a deal</h3>
                  <p class="card-text">
                    There are many variations of passages of Lorem available, but the majority have suffered alteration
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </article>
    </main>

    <footer class="footer">
      <div class="container">
        <div class="footer-top">
          <div class="footer-brand">
            <a href="#" class="logo">
              <img src="./assets/images/logo.svg" alt="Ridex logo">
            </a>
            <p class="footer-text">
              Search for cheap rental cars in New York. With a diverse fleet of 19,000 vehicles, Waydex offers its
              consumers an
              attractive and fun selection.
            </p>
          </div>
          <ul class="footer-list">
            <li>
              <p class="footer-list-title">Company</p>
            </li>
            <li>
              <a href="#" class="footer-link">About us</a>
            </li>
            <li>
              <a href="#" class="footer-link">Pricing plans</a>
            </li>
            <li>
              <a href="#" class="footer-link">Our blog</a>
            </li>
            <li>
              <a href="#" class="footer-link">Contacts</a>
            </li>
          </ul>
          <ul class="footer-list">
            <li>
              <p class="footer-list-title">Support</p>
            </li>
            <li>
              <a href="#" class="footer-link">Help center</a>
            </li>
            <li>
              <a href="#" class="footer-link">Ask a question</a>
            </li>
            <li>
              <a href="#" class="footer-link">Privacy policy</a>
            </li>
            <li>
              <a href="#" class="footer-link">Terms & conditions</a>
            </li>
          </ul>

          <ul class="footer-list">
            <li>
              <p class="footer-list-title">Neighborhoods in New York</p>
            </li>
            <li>
              <a href="#" class="footer-link">Manhattan</a>
            </li>
            <li>
              <a href="#" class="footer-link">Central New York City</a>
            </li>
            <li>
              <a href="#" class="footer-link">Upper East Side</a>
            </li>
            <li>
              <a href="#" class="footer-link">Queens</a>
            </li>
            <li>
              <a href="#" class="footer-link">Theater District</a>
            </li>
            <li>
              <a href="#" class="footer-link">Midtown</a>
            </li>
            <li>
              <a href="#" class="footer-link">SoHo</a>
            </li>
            <li>
              <a href="#" class="footer-link">Chelsea</a>
            </li>
          </ul>
        </div>

        <div class="footer-bottom">
          <ul class="social-list">
            <li>
              <a href="#" class="social-link">
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
            </li>
            <li>
              <a href="#" class="social-link">
                <ion-icon name="logo-instagram"></ion-icon>
              </a>
            </li>
            <li>
              <a href="#" class="social-link">
                <ion-icon name="logo-twitter"></ion-icon>
              </a>
            </li>
            <li>
              <a href="#" class="social-link">
                <ion-icon name="logo-linkedin"></ion-icon>
              </a>
            </li>
            <li>
              <a href="#" class="social-link">
                <ion-icon name="logo-skype"></ion-icon>
              </a>
            </li>
            <li>
              <a href="#" class="social-link">
                <ion-icon name="mail-outline"></ion-icon>
              </a>
            </li>
          </ul>
          <p class="copyright">
            &copy; 2022 <a href="#">codewithsadee</a>. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>

:root {

  --pale-purple-pantone: hsl(262, 63%, 92%);
  --medium-sea-green: hsl(152, 63%, 43%);
  --lavender-blush: hsl(336, 35%, 92%);
  --carolina-blue: hsl(204, 91%, 53%);
  --columbia-blue: hsl(204, 92%, 90%);
  --alice-blue-1: hsl(216, 38%, 95%);
  --alice-blue-2: hsl(216, 75%, 97%);
  --alice-blue-3: hsl(216, 38%, 95%);
  --alice-blue-4: hsl(217, 33%, 92%);
  --independence: hsl(219, 21%, 39%);
  --deep-cerise: hsl(329, 63%, 52%);
  --eerie-black: hsl(210, 11%, 15%);
  --space-cadet: hsl(240, 22%, 25%);
  --blue-jeans: hsl(204, 80%, 63%);
  --slate-blue: hsl(262, 60%, 57%);
  --beau-blue: hsl(208, 86%, 92%);
  --honey-dew: hsl(152, 48%, 89%);
  --mimi-pink: hsl(329, 63%, 90%);
  --red-salsa: hsl(0, 79%, 63%);
  --sapphire: hsl(211, 100%, 35%);
  --manatee: hsl(219, 14%, 60%);
  --white: hsl(0, 0%, 100%);

  --gradient: linear-gradient(to top, var(--alice-blue-2), var(--alice-blue-3));

  --ff-nunito: 'Nunito', sans-serif;
  --ff-open-sans: 'Open Sans', sans-serif;

  --fs-1: 2.125rem;
  --fs-2: 1.875rem;
  --fs-3: 1.5rem;
  --fs-4: 1.375rem;
  --fs-5: 1.125rem;
  --fs-6: 0.875rem;
  --fs-7: 0.625rem;

  --fw-400: 400;
  --fw-600: 600;

  --transition: 0.5s ease;

  --section-padding: 50px;

  --radius-10: 10px;
  --radius-14: 14px;
  --radius-18: 18px;

  --shadow-1: 3px 3px 9px hsla(240, 14%, 69%, 0.2);
  --shadow-2: 3px 3px 9px hsla(204, 92%, 59%, 0.3);

}

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

li { list-style: none; }

a { text-decoration: none; }

a,
img,
span,
label,
input,
button,
ion-icon { display: block; }

button,
input {
  background: none;
  border: none;
  font: inherit;
}

button { cursor: pointer; }

input { width: 100%; }

ion-icon { pointer-events: none; }

html {
  font-family: var(--ff-open-sans);
  color: var(--eerie-black);
  font-size: 1rem;
  line-height: 1.5;
  scroll-behavior: smooth;
}

body {
  background: var(--alice-blue-1);
  overflow-x: hidden;
}

.container { padding-inline: 15px; }

button, a { transition: var(--transition); }

.btn {
  position: relative;
  background: var(--background, var(--carolina-blue));
  color: var(--color, var(--white));
  min-width: var(--width, 40px);
  min-height: var(--height, 40px);
  padding: 5px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-14);
  font-family: var(--ff-nunito);
  font-size: var(--fs-6);
  font-weight: var(--fw-600);
  overflow: hidden;
}

.btn ion-icon {
  font-size: 22px;
  --ionicon-stroke-width: 40px;
}

.btn::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, hsla(0, 0%, 100%, 0.4), transparent);
  opacity: 0;
  pointer-events: none;
  transition: var(--transition);
}

.btn:is(:hover, :focus) { box-shadow: var(--shadow-2); }

.btn:is(:hover, :focus)::before { opacity: 1; }

.section { padding-block: var(--section-padding); }

.h1,
.h2,
.h3 {
  color: var(--space-cadet);
  font-family: var(--ff-nunito);
  line-height: 1.4;
}

.h1 {
  font-size: var(--fs-1);
  text-transform: uppercase;
}

.h2,
.h3 { font-weight: var(--fw-400); }

.h2 { font-size: var(--fs-2); }

.h3 { font-size: var(--fs-4); }

.w-100 { width: 100%; }

.header-contact { display: none; }

.header {
  background: var(--alice-blue-1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  transition: var(--transition);
  z-index: 4;
}

.header.active { box-shadow: var(--shadow-1); }

.header .container {
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header-actions .btn span { display: none; }

.user-btn {
  --color: var(--independence);
  --background: var(--white);
  --shadow-2: var(--shadow-1);
  box-shadow: var(--shadow-1);
}

.nav-toggle-btn span {
  background: var(--independence);
  width: 22px;
  height: 2px;
  border-radius: 2px;
  margin-block: 8px;
  transform-origin: right;
  transition: var(--transition);
}

.nav-toggle-btn span.two { transform: scaleX(0.7); }

.nav-toggle-btn span.three { transform: scaleX(0.4); }

.nav-toggle-btn:is(:hover, :focus) span { background: var(--carolina-blue); }

.nav-toggle-btn.active span {
  transform: scaleX(1);
  background: var(--carolina-blue);
}

.navbar {
  background: var(--alice-blue-1);
  position: fixed;
  top: 70px;
  bottom: 0;
  right: -260px;
  max-width: 260px;
  width: 100%;
  padding: 20px 25px;
  border: 1px solid var(--white);
  box-shadow: var(--shadow-1);
  visibility: hidden;
  transition: 0.25s cubic-bezier(0.51, 0.03, 0.64, 0.28);
}

.navbar.active {
  visibility: visible;
  transform: translateX(-100%);
  transition: 0.5s cubic-bezier(0.33, 0.85, 0.56, 1.02);
}

.navbar-link {
  color: var(--independence);
  font-family: var(--ff-nunito);
  font-size: var(--fs-6);
  padding-block: 5px;
  margin-bottom: 15px;
}

.navbar-link:is(:hover, :focus) { color: var(--carolina-blue); }

.overlay {
  position: fixed;
  top: 70px;
  background: hsl(216, 38%, 95%);
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  pointer-events: none;
  transition: var(--transition);
}

.overlay.active {
  opacity: 0.7;
  pointer-events: all;
}

.hero { padding-top: 120px; }

.hero-title {
  max-width: 20ch;
  margin-bottom: 15px;
}

.hero-text {
  color: var(--independence);
  line-height: 1.8;
  margin-bottom: 30px;
}

.hero-banner { display: none; }

.hero-form {
  background: var(--gradient);
  border: 1px solid var(--white);
  box-shadow: var(--shadow-1);
  border-radius: var(--radius-18);
  font-family: var(--ff-nunito);
}

.input-wrapper { padding: 15px 20px; }

.input-wrapper:not(:last-of-type) { border-bottom: 1px solid hsla(0, 0%, 0%, 0.08); }

.input-label {
  color: var(--manatee);
  font-size: var(--fs-6);
  margin-bottom: 10px;
}

.input-field {
  color: var(--space-cadet);
  outline: 2px solid transparent;
  outline-offset: 5px;
  border-radius: 4px;
  transition: var(--transition);
}

.input-field:focus { outline-color: var(--carolina-blue); }

.input-field::placeholder { color: var(--independence); }

.hero-form .btn {
  --width: calc(100% - 40px);
  --height: 50px;
  margin: 20px;
  text-transform: uppercase;
}

.featured-car .title-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 10px 15px;
  margin-bottom: 30px;
}

.featured-car-link {
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--independence);
  font-size: var(--fs-6);
}

.featured-car-link span { transition: var(--transition); }

.featured-car-link:is(:hover, :focus) span { color: var(--space-cadet); }

.featured-car-link ion-icon {
  margin-top: 3px;
  transition: var(--transition);
}

.featured-car-link:is(:hover, :focus) ion-icon { color: var(--carolina-blue); }

.featured-car-list {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 30px;
}

.featured-car-card {
  background: var(--gradient);
  border: 1px solid var(--white);
  border-radius: var(--radius-18);
  padding: 10px;
  box-shadow: var(--shadow-1);
}

.featured-car-card .card-banner {
  background: hsla(0, 0%, 0%, 0.2);
  aspect-ratio: 3 / 2;
  border-radius: var(--radius-18);
  overflow: hidden;
}

.featured-car-card .card-banner > img {
  height: 100%;
  object-fit: cover;
}

.featured-car-card .card-content { padding: 20px 10px 10px; }

.featured-car-card .card-title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  margin-bottom: 15px;
}

.featured-car-card .card-title { width: calc(100% - 60px); }

.featured-car-card .card-title > a {
  color: inherit;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.featured-car-card .card-title > a:is(:hover, :focus) { color: var(--carolina-blue); }

.featured-car-card .year {
  font-family: var(--ff-nunito);
  font-size: var(--fs-6);
  font-weight: var(--fw-600);
  padding: 3px 12px;
  border: 2px dashed hsla(204, 91%, 53%, 0.4);
  border-radius: var(--radius-14);
}

.featured-car-card .card-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid hsla(0, 0%, 0%, 0.1);
  margin-bottom: 15px;
}

.featured-car-card .card-list-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.featured-car-card .card-list-item ion-icon {
  font-size: 20px;
  color: var(--carolina-blue);
  --ionicon-stroke-width: 38px;
}

.featured-car-card .card-item-text {
  color: var(--independence);
  font-size: var(--fs-6);
}

.featured-car-card .card-price-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
}

.featured-car-card .card-price {
  font-family: var(--ff-nunito);
  font-size: var(--fs-6);
  color: var(--space-cadet);
}

.featured-car-card .card-price strong {
  font-size: var(--fs-3);
  font-weight: var(--fw-400);
}

.featured-car-card .btn:last-child {
  --height: 36px;
  min-width: 100%;
}

.featured-car-card .fav-btn {
  --background: var(--beau-blue);
  --color: var(--blue-jeans);
  --height: 36px;
  --width: 36px;
  --shadow-2: none;
}

.featured-car-card .fav-btn ion-icon { font-size: 18px; }

.featured-car-card .fav-btn:is(:hover, :focus) {
  --background: var(--lavender-blush);
  --color: var(--red-salsa);
}

.get-start .section-title { margin-bottom: 25px; }

.get-start-list {
  display: grid;
  gap: 20px;
}

.get-start-card {
  background: var(--white);
  padding: 20px;
  border-radius: var(--radius-18);
  border: 1px solid var(--white);
  transition: var(--transition);
}

.get-start-card:hover {
  background: var(--alice-blue-2);
  box-shadow: var(--shadow-1);
}

.get-start-card .card-icon {
  background: var(--icon-card-bg, var(--columnia-blue));
  color: var(--icon-card-color, var(--carolina-blue));
  height: 50px;
  width: 50px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-14);
  margin-bottom: 20px;
}

.get-start-card .card-icon ion-icon {
  font-size: 26px;
  --ionicon-stroke-width: 45px;
}

.get-start-card .icon-1 {
  --icon-card-bg: var(--mimi-pink);
  --icon-card-color: var(--deep-cerise);
}

.get-start-card .icon-2 {
  --icon-card-bg: var(--columbia-blue);
  --icon-card-color: var(--carolina-blue);
}

.get-start-card .icon-3 {
  --icon-card-bg: var(--honey-dew);
  --icon-card-color: var(--medium-sea-green);
}

.get-start-card .icon-4 {
  --icon-card-bg: var(--pale-purple-pantone);
  --icon-card-color: var(--slate-blue);
}

.get-start-card .card-title {
  color: var(--space-cadet);
  font-family: var(--ff-nunito);
  font-weight: var(--fw-400);
  margin-bottom: 15px;
}

.get-start-card .card-text { color: var(--independence); }

.get-start-card .card-link {
  position: relative;
  color: var(--carolina-blue);
  width: max-content;
}

.get-start-card .card-link::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--carolina-blue);
  transition: var(--transition);
}

.get-start-card .card-link:is(:hover, :focus)::before { width: 100%; }

.blog .section-title { margin-bottom: 30px; }

.blog-card {
  background: var(--alice-blue-2);
  border-radius: var(--radius-18);
  border: 1px solid var(--white);
  box-shadow: var(--shadow-1);
  overflow: hidden;
}

.blog-card .card-banner {
  aspect-ratio: 3 / 2;
  position: relative;
  overflow: hidden;
}

.blog-card .card-banner a:first-child { height: 100%; }

.blog-card .card-banner img {
  height: 100%;
  object-fit: cover;
}

.blog-card .card-badge {
  position: absolute;
  bottom: 20px;
  left: 20px;
  --height: 30px;
  --width: 92px;
}

.blog-card .card-content { padding: 20px; }

.blog-card .card-title { margin-bottom: 20px; }

.blog-card .card-title > a { color: inherit; }

.blog-card .card-title > a:is(:hover, :focus) { color: var(--carolina-blue); }

.blog-card .card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.blog-card :is(.publish-date, .comments) {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: var(--fs-6);
  color: var(--independence);
}

.blog-card :is(.publish-date, .comments) ion-icon {
  font-size: 15px;
  --ionicon-stroke-width: 50px;
}

.blog .has-scrollbar {
  display: flex;
  gap: 20px;
  scroll-snap-type: inline mandatory;
  overflow-x: auto;
  padding-bottom: 20px;
}

.blog .has-scrollbar > li {
  flex-shrink: 0;
  max-width: 330px;
  width: 100%;
  scroll-snap-align: start;
}

.has-scrollbar::-webkit-scrollbar-track {
  background: var(--alice-blue-1);
  outline: 2px solid var(--carolina-blue);
  border-radius: 10px;
}

.has-scrollbar::-webkit-scrollbar-thumb {
  border-color: var(--alice-blue-1);
  background: var(--carolina-blue);
  border-radius: 10px;
}

.has-scrollbar::-webkit-scrollbar-button { width: calc(25% - 40px); }

.footer {
  background: var(--alice-blue-4);
  color: var(--independence);
}

.footer a { color: inherit; }

.footer-top {
  padding-block: 60px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  row-gap: 50px;
}

.footer-top .logo { margin-bottom: 20px; }

.footer-text {
  font-size: var(--fs-6);
  line-height: 1.8;
}

.footer-list { font-family: var(--ff-nunito); }

.footer-list:not(:last-of-type) { width: 50%; }

.footer-list:last-of-type {
  width: 100%;
  column-count: 2;
}

.footer-list-title {
  color: var(--space-cadet);
  font-weight: var(--fw-600);
  margin-bottom: 8px;
}

.footer-link {
  font-size: var(--fs-6);
  padding-block: 6px;
}

.footer-link:is(:hover, :focus) { color: var(--carolina-blue); }

.footer-list:last-child > li:first-child { column-span: all; }

.footer-bottom {
  background: var(--gradient);
  border: 1px solid var(--white);
  border-radius: var(--radius-18) var(--radius-18) 0 0;
  padding: 20px;
}

.social-list {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.social-link { font-size: 20px; }

.social-link ion-icon { --ionicon-stroke-width: 40px; }

.social-link:is(:hover, :focus) { color: var(--carolina-blue); }

.copyright { font-size: var(--fs-6); }

.copyright > a { display: inline-block; }

.copyright > a:is(:hover, :focus) { color: var(--carolina-blue); }

@media (min-width: 350px) {

  .featured-car-card .card-list { grid-template-columns: 1fr 1fr; }

  .featured-car-card .card-price { margin-right: auto; }

  .featured-car-card .btn:last-child {
    min-width: max-content;
    padding-inline: 15px;
  }

}

@media (min-width: 580px) {

  .container {
    max-width: 540px;
    margin-inline: auto;
  }

  .header-actions .btn span {
    display: block;
    font-weight: var(--fw-400);
    padding-inline: 15px;
  }

  .header-actions .btn:first-of-type ion-icon { display: none; }

}

@media (min-width: 768px) {

  :root {
    --fs-1: 2.625rem;
  }

  .container { max-width: 720px; }

  .header-actions { gap: 30px; }

  .header-contact {
    display: block;
    text-align: center;
  }

  .header-contact .contact-link {
    color: var(--space-cadet);
    font-family: var(--ff-nunito);
    font-size: var(--fs-5);
    line-height: 1.3;
  }

  .header-contact .contact-link:is(:hover, :focus) { color: var(--carolina-blue); }

  .header-contact .contact-time {
    color: var(--independence);
    font-size: var(--fs-7);
  }

  .hero {
    position: relative;
    min-height: 85vh;
    display: flex;
    align-items: center;
    z-index: 1;
  }

  .hero-form {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 0.8fr;
  }

  .input-wrapper:not(:last-of-type) {
    border-bottom: none;
    border-right: 1px solid hsla(0, 0%, 0%, 0.08);
  }

  .input-label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .hero-banner {
    display: block;
    background: url("../assets/hero-banner.jpg") no-repeat;
    background-size: cover;
    background-position: left;
    position: absolute;
    top: 100px;
    bottom: 40px;
    left: 60%;
    right: 60%;
    width: 500px;
    border-radius: 35px;
    z-index: -1;
  }

  .featured-car-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }

  .get-start-list { grid-template-columns: 1fr 1fr; }

  .footer-brand { width: 100%; }

  .footer-text { max-width: 400px; }

  .footer-bottom {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    padding-block: 30px;
    box-shadow: var(--shadow-1);
  }

  .social-list { margin-bottom: 0; }

}

@media (min-width: 992px) {

  .container { max-width: 960px; }

  .hero .container { width: 100%; }

  .blog .has-scrollbar { padding-bottom: 50px; }

  .blog .has-scrollbar > li { max-width: 450px; }

  .footer-list:not(:last-of-type) { width: 25%; }

  .footer-list:last-of-type { width: 50%; }

}

@media (min-width: 1200px) {

  :root {

    --fs-1: 2.875rem;
    --fs-2: 2rem;

  }

  .container { max-width: 1170px; }

  .overlay,
  .nav-toggle-btn { display: none; }

  .navbar,
  .navbar.active { all: unset; }

  .navbar-link {
    margin-bottom: 0;
    font-weight: var(--fw-600);
  }

  .navbar-list {
    display: flex;
    gap: 50px;
  }

  .hero { min-height: 100vh; }

  .hero-banner {
    left: auto;
    right: 50px;
    width: 630px;
  }

  .hero-form { max-width: 900px; }

  .hero-form .btn {
    --width: calc(100% - 40px);
    --height: 50px;
    margin: 20px;
    text-transform: uppercase;
  }

  .featured-car-list { grid-template-columns: repeat(3, minmax(0, 1fr)); }

  .get-start-list { grid-template-columns: repeat(4, 1fr); }

  .blog .has-scrollbar > li {
    max-width: 340px;
    scroll-snap-align: center;
  }

  .footer-brand { width: 33.33%; }

  .footer-text { max-width: 35ch; }

  .footer-list:not(:last-of-type) { width: 16.66%; }

  .footer-list:last-of-type { width: 33.33%; }

} 

  /* Estilo para a camada de fundo escura */
  .overlay {
    overflow: hidden;
  }

  .modal {
    overflow: hidden;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--white);
    padding: 20px;
    border-radius: var(--radius-18);
    box-shadow: var(--shadow-1);
    max-width: 400px;
    text-align: center;
    z-index: 9999;
  }

  .modal h2 {
    font-size: var(--fs-3);
    margin-bottom: 10px;
    color: var(--space-cadet);
  }

  .modal p {
    font-size: var(--fs-6);
    margin-bottom: 20px;
    color: var(--independence);
  }

  .modal-buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  .modal-buttons .btn {
    --width: 120px;
    --height: 40px;
    font-size: var(--fs-6);
    border-radius: var(--radius-14);
  }

  .modal-buttons .alugar {
    background: var(--carolina-blue);
    color: var(--white);
  }

  .modal-buttons .cancelar {
    background: var(--independence);
    color: var(--white);
  }
</style>
