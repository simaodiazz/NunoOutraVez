<script lang="ts">
import axios from 'axios'

export default {
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      showError: false,
      equalsPassword: false
    };
  },
  methods: {
    async create() {
      // Verificar se as senhas coincidem
      if (this.password !== this.confirmPassword) {
        this.equalsPassword = true;
        setTimeout(() => {
          this.equalsPassword = false;
        }, 3000);
        return;
      }

      // Enviar os dados para o servidor para criar a conta
      const data = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        password: this.password
      };

      try {
        // Fazer a requisição para criar a conta
        // Substitua a URL pelo endpoint correto do seu servidor
        const response = await axios.post('http://192.168.56.1:3000/api/v1/users', data);
        console.log('Conta criada com sucesso!');

        const token = response.data.token;
        // Armazenar o token no localStorage
        localStorage.setItem('token', token);

        this.$router.push('/');
      } catch (error) {
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 3000);
      }
    }
  }
};
</script>

<template>
  <body>
    <div id="back">
      <div class="backRight"></div>
      <div class="backLeft"></div>
    </div>
  
    <div id="slideBox">
      <div class="topLayer">
        <div class="right">
          <div class="content">
            <h2>Criar conta</h2>
            <form @submit.prevent="create()" method="post" onsubmit="return false;">
              <div class="form-group">
                <input type="text" v-model="name" placeholder="Nome" required/>
                <input type="email" v-model="email" placeholder="Email" required/>
                <input type="text" v-model="phone" placeholder="Phone" required/>
                <input type="password" v-model="password" placeholder="Password" required/>
                <input type="password" v-model="confirmPassword" placeholder="Confirmar Password" required/>
              </div>
              <br>
              <button id="login" type="submit">Criar conta</button>
            </form>
            <router-link to="/login">Já possuí uma conta?</router-link>
          </div>

          <!-- Adicionando a mensagem de erro -->
          <div v-if="equalsPassword" class="error-message">
            As duas passwords não são iguais
          </div>

          <div v-if="showError" class="error-message">
            Credenciais incorretas
          </div>
        </div>
      </div>
    </div>
  </body>
</template>
  
  <style scoped>
  
  body {
    height: 100%;
    overflow: hidden;
    width: 100% !important;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
  
  .backRight {
    position: absolute;
    right: 0;
    width: 50%;
    height: 100%;
    background-color: hsl(216, 38%, 95%);
    background: #3498db url("../assets/register-banner.jpg");
    background-size: cover;
    background-position: 50% 50%;
  }
  
  .backLeft {
    position: absolute;
    left: 0;
    width: 50%;
    height: 100%;
    background: #e74c3c url("../assets/register-banner.jpg");
    background-size: cover;
    background-position: 30%;
  }
  
  #back {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -999;
  }
  
  #slideBox {
    width: 50%;
    max-height: 100%;
    height: 100%;
    overflow: hidden;
    margin-left: 50%;
    position: absolute;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
  .topLayer {
    width: 200%;
    height: 100%;
    position: relative;
    left: 0;
    left: -100%;
  }
  
  .left {
    width: 50%;
    height: 100%;
    background: #2C3034;
    left: 0;
    position: absolute;
  }
  
  .right {
    width: 50%;
    height: 100%;
    background-color: hsl(216, 38%, 95%);
    right: 0;
    position: absolute;
  }
  
  .content {
    width: 250px;
    margin: 0 auto;
    top: 30%;
    position: absolute;
    left: 50%;
    margin-left: -125px;
  }
  
  .content h2 {
    color: hsl(240, 22%, 25%, 1);
    font-weight: 300;
    font-size: 35px;
  }
  
  button {
    position: relative;
    background: var(--background, var(--carolina-blue));
    color: var(--color, var(--white));
    min-width: var(--width, 40px);
    min-height: var(--height, 40px);
    padding: 5px;
    width: 150px;
    display: grid;
    place-items: center;
    border-radius: var(--radius-14);
    font-family: var(--ff-nunito);
    font-size: var(--fs-6);
    font-weight: var(--fw-600);
    overflow: hidden;
    margin: 0px 0px 20px 0px;
    transition: 0.5s ease-in-out; 
  }
  
  button:hover {
    background: #0288D1;
    box-shadow: 0 4px 7px rgba(0,0,0,0.1), 0 3px 6px rgba(0,0,0,0.1);
  }
  .off {
    background: none;
    color: #03A9F4;
    box-shadow: none;
  }
  
  .right .off:hover {
    background: #eee;
    color: #03A9F4;
    box-shadow: none;
  }
  .left .off:hover {
    box-shadow: none;
    color: #03A9F4;
    background: #363A3D;
  }
  input {
    background: transparent;
    border: 0;
    outline: 0;
    border-bottom: 1px solid #45494C;
    font-size: 14px;
    color: #959595;
    padding: 8px 0;
    margin-top: 20px;
  }

  .error-message {
    background-color: red;
    color: white;
    padding: 10px;
    text-align: center;
  }
</style>