import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [role, setRole] = useState("resident"); // Rôle par défauts





  
  const handleLogin = async (e) => {
    e.preventDefault();


    let apiUrl = "";
    switch (role) {
      case "admin":
        apiUrl = "http://localhost:8080/api/admins/login";
        break;
      case "technicien":
        apiUrl = "http://localhost:8080/api/techniciens/login";
        break;
      case "resident":
      default:
        apiUrl = "http://localhost:8080/api/residents/login";
        break;
    }



     try {
      const response = await axios.post(apiUrl, { email, password });
      if (response.data) {
        // Stocker les informations de l'utilisateur dans le stockage local
       
        // Rediriger en fonction du rôle
        switch (role) {
          case "admin":
            navigate('/dashboard');
            break;
          case "technicien":
            localStorage.setItem("technicien", JSON.stringify(response.data));
            navigate("/profile-tech");
            break;
          case "resident":
          default:
            localStorage.setItem("resident", JSON.stringify(response.data));
        navigate("/profile");
            break;
        }
      }
    } catch (err) {
      setError("Email ou mot de passe invalide");
    }
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://localhost:8080/api/residents/login', { email, password });
  //     const resident = response.data.resident; // Supposons que l'API renvoie les infos du résident
  //     localStorage.setItem('resident', JSON.stringify(resident)); // Stockage des données
  //     window.location.href = `/profile`; // Redirige vers la page profil
  //   } catch (error) {
  //     console.error('Login error:', error);
  //   }
  // };


  return (
    <div>


<section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      {/* <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
          Flowbite    
      </a> */}
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Se connecter
              </h1>
              <form class="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@email.com" required="" />
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" 
                      
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
                  </div>
                  <div class="flex items-center justify-between">
                      <div class="flex items-start ">
                          <div class=" flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4  border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                      </div>
                      </div>
                      <div>
                  <label
                    htmlFor="role"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Sélectionnez votre rôle
                  </label>
                  <select
                    id="role"
                    name="role"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="resident">Résident</option>
                    <option value="technicien">Technicien</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                  <button type="submit" class="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  si vous n'aver pas de compte contactez votre administration pour creer votre compte
                  </p>
                  
              </form>
          </div>
      </div>
  </div>
</section>
      
    </div>
  );
};

export default Login;
