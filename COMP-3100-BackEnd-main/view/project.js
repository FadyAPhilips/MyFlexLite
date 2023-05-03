
let HOME_MOVIES
let MYLIST_MOVIES = []

const goToHome = () => {

    const element1 = document.getElementById("moviePage");
    element1.remove();

    const movieDiv = document.createElement("div");
    movieDiv.id = "moviePage"
    movieDiv.style = "padding-left: 350px; width: 100%;"

    const element = document.getElementById("Page");
    element.appendChild(movieDiv);

    
    generateMovies(HOME_MOVIES)
}

const goToList = async ()  => {

    const element1 = document.getElementById("moviePage");
    element1.remove();

    const movieDiv = document.createElement("div");
    movieDiv.id = "moviePage"
    movieDiv.style = "padding-left: 350px; width: 100%;"

    const element = document.getElementById("Page");
    element.appendChild(movieDiv);

    const transformedMovie = await movieTransformer(MYLIST_MOVIES)

    generateMovies(transformedMovie)
}

//function turns an array of string into a single string where each element is comma separated
const listIntoString = (list) => {
    let listString = "empty"
    
    if (list.length > 0) {
        listString = list[0].name

        for (let i = 1; i < 5; i++) {
            listString = listString + ", " + list[i].name
        }
    }
    return listString
}

const signUpFunction = async() => {
    const username =  document.getElementById("signUpUsername").value;
    const email =  document.getElementById("signUpEmail").value;
    const password =  document.getElementById("signupPassword").value;
    const confirmPassword =  document.getElementById("signunConfirmPassword").value;

    await API.signUp(username, email, password)
    location.reload();

}

const loginFunction = async () => {
    const username =  document.getElementById("loginUsername").value;
    const password =  document.getElementById("loginPassword").value;

    await API.login(username, password)
        location.reload();
}

const isLoggedIn = async() => {
    const token = localStorage.getItem("token")

    return (!(token === null) && (!(token === "undefined")))

}

const logoutFunction = async() => {
    await API.logout()
    location.reload();
}

const getMovies = async() => {
    const movies = await API.getRecommendations(1);
    const t = await movieTransformer(movies.data)
    HOME_MOVIES = t
    return t
}

const movieTransformer = async (movieList) => {
    let FullMovieList = []

    for (let i = 0; i < movieList.length; i++) {
        let movieDetails = await API.movieDetails(movieList[i].id)
        FullMovieList.push(movieDetails.data)
    }
    return FullMovieList
}

const generateMovies = async (movieList) => {
    let moviesArr = await movieList

    for (let i = 0; i < moviesArr.length; i++) {
        makeMovie(moviesArr[i])
    }
}

//function converts movie object into html elements and appends them to the DOM
const makeMovie = (movie) => {

    //create the full movie unit container
    const movieContainer = document.createElement("div");
    movieContainer.classList.add('fullContainer');

    //add movie poster

    const posterContainer = document.createElement("div");
    posterContainer.classList.add('buttonContainer');

    const poster = document.createElement("img");
    poster.src = "https://image.tmdb.org/t/p/original/" + movie.poster_path
    poster.alt = "No Poster Found :/"
    poster.height = "400"
    poster.width = "267" 
    posterContainer.appendChild(poster)

    movieContainer.appendChild(posterContainer)


    //create middle container that has all of the information
    const infoContainer = document.createElement("div");
    infoContainer.classList.add('infoContainer');

    //add movie title
    const movieTitle = document.createElement("div");
    movieTitle.classList.add('movieTitle');
    const movieTitleString = document.createTextNode(movie.title);
    movieTitle.appendChild(movieTitleString);

    infoContainer.appendChild(movieTitle)

    //create div that contains imdb rating, runtime and release date
    const statsContainer = document.createElement("div");
    statsContainer.classList.add('statsContainer');

    //add imdblogo and score
    const imdbDiv = document.createElement("div");
    imdbDiv.style = "display:flex;";

    const imdbLogo = document.createElement("img");
    imdbLogo.src = "https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
    imdbLogo.alt = "No Poster Found :/"
    imdbLogo.width = "50"
    imdbLogo.height = "25"
    imdbDiv.appendChild(imdbLogo)

    const imdbScore = document.createElement("div");
    imdbScore.classList.add('imdbScore');
    const imdbScoreString = document.createTextNode(movie.vote_average + " / 10");
    imdbScore.appendChild(imdbScoreString);
    imdbDiv.appendChild(imdbScore)

    statsContainer.appendChild(imdbDiv) 

    //create and append divs for runtime and release date
    const runtime = document.createElement("div");
    const runtimeNode = document.createTextNode(movie.runtime + " Minutes");
    runtime.appendChild(runtimeNode);
    statsContainer.appendChild(runtime) 

    const release_date = document.createElement("div");
    const release_dateNode = document.createTextNode(movie.release_date);
    release_date.appendChild(release_dateNode);
    statsContainer.appendChild(release_date) 

    infoContainer.appendChild(statsContainer) 

    //create and append div that contains cast

    castString = listIntoString(movie.credits.cast)

    const castContainer = document.createElement("div");
    castContainer.classList.add('cast');
    const cast = document.createTextNode("Cast: " + castString);
    castContainer.appendChild(cast);
    infoContainer.appendChild(castContainer) 

    //add movie description
    const description = document.createElement("div");
    const descriptionNode = document.createTextNode(movie.overview);
    description.appendChild(descriptionNode);
    infoContainer.appendChild(description) 

    //add video Trailer

    const vidContainer = document.createElement("div");
    vidContainer.classList.add('video');

    const video = document.createElement("iframe");
    video.width = "420"
    video.height = "250"
    video.src = "https://www.youtube.com/embed/" + movie.videos.results[0].key
    vidContainer.appendChild(video) 

    infoContainer.appendChild(vidContainer) 

    movieContainer.appendChild(infoContainer)
    
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add('buttonContainer');


    const movieInList = isInList(movie.id)

    if (movieInList) {
        const removeMovieButton = document.createElement("input")
        removeMovieButton.classList.add('appButton');
        removeMovieButton.id = "addMovieButton"
        removeMovieButton.type = "button"
        removeMovieButton.value = "-"
        removeMovieButton.onclick = () => removeMovieFunction(movie.id)
    
        buttonContainer.appendChild(removeMovieButton)
    }else{
        const addMovieButton = document.createElement("input")
        addMovieButton.classList.add('appButton');
        addMovieButton.id = "addMovieButton"
        addMovieButton.type = "button"
        addMovieButton.value = "+"
        addMovieButton.onclick = () => addMovieFunction(movie.id)
    
        buttonContainer.appendChild(addMovieButton)
    }


    movieContainer.appendChild(buttonContainer)


    const element = document.getElementById("moviePage");
    element.appendChild(movieContainer);
    
}

const isInList = (id) => {

    let x = false

    MYLIST_MOVIES.forEach(movie => {
        if (movie.id == id) {

            x = true
        }
    });

    return x
}

const addMovieFunction = async (movieID) => {
    await API.addMovieToMyList(movieID)
    location.reload();

}

const removeMovieFunction = async (movieID) => {
    await API.removeMovieFromMyList(movieID)
    location.reload();

}

//Function Creates and appends Login Form to Menu Side Bar (sign up form must be cleared first)
const createLoginForm = () => {

    const menuElement = document.getElementById("Menu");

    //Add Login text
    const loginTitle = document.createElement("div")
    loginTitle.classList.add('welcome');
    loginTitle.id = "loginTitle"
    const loginTitleText = document.createTextNode("Login");
    loginTitle.appendChild(loginTitleText);
    menuElement.appendChild(loginTitle);

    //create the login form
    const loginForm = document.createElement("form")
    loginForm.id = "loginForm"


    const formDiv = document.createElement("div")
    formDiv.classList.add('formDiv');
    formDiv.id = "formDiv"

    //create Username Input
    const usernameInput = document.createElement("input")
    usernameInput.classList.add('textBar');
    usernameInput.type = "text"
    usernameInput.id = "loginUsername"
    usernameInput.name = "loginUsername"
    usernameInput.placeholder = "Username"

    formDiv.appendChild(usernameInput);

    //create Password Input
    const passwordInput = document.createElement("input")
    passwordInput.classList.add('textBar');
    passwordInput.type = "password"
    passwordInput.id = "loginPassword"
    passwordInput.name = "loginPassword"
    passwordInput.placeholder = "Password"

    formDiv.appendChild(passwordInput);

    //create div for buttons
    const buttonDiv = document.createElement("div")
    buttonDiv.classList.add('buttonDiv');
    buttonDiv.id = ('buttonDiv')

    //create signUp button to change form
    const signupButton = document.createElement("input")
    signupButton.classList.add('appButton');
    signupButton.id = "signupButton"
    signupButton.type = "button"
    signupButton.value = "<< SignUp"
    signupButton.onclick = () => switchToSignup()
    
    buttonDiv.appendChild(signupButton);
    
    //create login button for form submission 
    const loginButton = document.createElement("input")
    loginButton.classList.add('appButton');
    signupButton.id = "loginButton"
    loginButton.type = "button"
    loginButton.value = "Login >>"
    loginButton.onclick = () => loginFunction()

    buttonDiv.appendChild(loginButton);

    formDiv.appendChild(buttonDiv);

    loginForm.appendChild(formDiv);

    menuElement.appendChild(loginForm);
}

//function to clear forms to prepare to add a different form
const removeLoginForm = () => {

    const element1 = document.getElementById("loginTitle");
    element1.remove();

    const element2 = document.getElementById("loginForm");
    element2.remove();


}

//function creates and appends signup form into the menu side bar (login form must be cleared first)
const createSignupForm = () => {

    const menuElement = document.getElementById("Menu");

    //Add Sign Up text
    const signUp = document.createElement("div")

    signUp.classList.add('welcome');
    signUp.id = "loginTitle"
    const signUpText = document.createTextNode("Sign Up");
    signUp.appendChild(signUpText);

    menuElement.appendChild(signUp);


    //create the signUp form
    const signUpForm = document.createElement("form")
    signUpForm.id = "loginForm"

    const formDiv = document.createElement("div")
    formDiv.classList.add('formDiv');
    formDiv.id = "formDiv"

    //create Username Input
    const usernameInput = document.createElement("input")
    usernameInput.classList.add('textBar');
    usernameInput.type = "text"
    usernameInput.id = "signUpUsername"
    usernameInput.name = "signUpUsername"
    usernameInput.placeholder = "Username"

    formDiv.appendChild(usernameInput);

    //create Username Input
    const emailInput = document.createElement("input")
    emailInput.classList.add('textBar');
    emailInput.type = "text"
    emailInput.id = "signUpEmail"
    emailInput.name = "signUpEmail"
    emailInput.placeholder = "email"

    formDiv.appendChild(emailInput);
    
    //create Password Input
    const passwordInput = document.createElement("input")
    passwordInput.classList.add('textBar');
    passwordInput.type = "password"
    passwordInput.id = "signupPassword"
    passwordInput.name = "signupPassword"
    passwordInput.placeholder = "Password"

    formDiv.appendChild(passwordInput);

    //create Confirm Password Input
    const confirmPasswordInput = document.createElement("input")
    confirmPasswordInput.classList.add('textBar');
    confirmPasswordInput.type = "password"
    confirmPasswordInput.id = "signunConfirmPassword"
    confirmPasswordInput.name = "signunConfirmPassword"
    confirmPasswordInput.placeholder = "Confirm Password"

    formDiv.appendChild(confirmPasswordInput);

    //create div for buttons
    const buttonDiv = document.createElement("div")
    buttonDiv.classList.add('buttonDiv');
    buttonDiv.id = ('buttonDiv')

    //create Login button to change form
    const loginButton = document.createElement("input")
    loginButton.classList.add('appButton');
    loginButton.id = "loginButton"
    loginButton.type = "button"
    loginButton.value = "<< Login"
    loginButton.onclick = () => switchToLogin()
    
    buttonDiv.appendChild(loginButton);
    
    //create sign up button for form submission 
    const signupButton = document.createElement("input")
    signupButton.classList.add('appButton');
    signupButton.id = "signupButton"
    signupButton.type = "button"
    signupButton.value = "SignUp >>"
    signupButton.onclick = () => signUpFunction()

    buttonDiv.appendChild(signupButton);

    formDiv.appendChild(buttonDiv);

    signUpForm.appendChild(formDiv);

    menuElement.appendChild(signUpForm);
}

//function removes from sign up form to login form
const switchToLogin = () => {
    removeLoginForm()
    createLoginForm()
}

//function removes from login form to sign up form
const switchToSignup = () => {
    removeLoginForm()
    createSignupForm()
}


const searchFunction =  async() => {

    const searchValue = document.getElementById("search").value;
    if(searchValue.length > 0){
        let result = await API.search(searchValue)

        const element1 = document.getElementById("moviePage");
        element1.remove();

        const movieDiv = document.createElement("div");
        movieDiv.id = "moviePage"
        movieDiv.style = "padding-left: 350px; width: 100%;"

        const element = document.getElementById("Page");
        element.appendChild(movieDiv);

        
        const t = await movieTransformer(result.data)

        generateMovies(t)
    }


}

//function initiated menu sidebar content on load
const Init = async() => {

    
    let loggedIn = await isLoggedIn()
    const menuElement = document.getElementById("Menu");


    if (loggedIn){

        let getMyList = await API.getMyList()
        MYLIST_MOVIES = getMyList.data.myMovies

        const user = localStorage.getItem("user")
        const accountName = JSON.parse(user).username
       
        
        //Add Welcome text
        const welcome = document.createElement("div")
        welcome.classList.add('welcome');
        const welcomeText = document.createTextNode("Welcome " + accountName);
        welcome.appendChild(welcomeText);
        menuElement.appendChild(welcome);

        const myListDiv = document.createElement("div")
        myListDiv.classList.add('myListDiv');
        myListDiv.onclick = () => goToList()

        const heart = document.createElement("img");
        heart.src = "https://www.seekpng.com/png/full/978-9785412_white-heart-transparent-background-heart-icon-white.png"
        heart.alt = "heart"
        heart.height = "40"
        heart.width = "40"
        heart.style = "margin-right: 10px"
        myListDiv.appendChild(heart)

        const myList = document.createTextNode("My List");
        myListDiv.appendChild(myList);

        menuElement.appendChild(myListDiv);

        const logoutButton = document.createElement("input")
        logoutButton.classList.add('appButton');
        logoutButton.id = "logoutButton"
        logoutButton.type = "button"
        logoutButton.value = "<< Logout"
        logoutButton.onclick = () => logoutFunction()
        logoutButton.style = "margin: 40px 100px"

        menuElement.appendChild(logoutButton);





    }else{
        createLoginForm()

        const loginMessage = document.createElement("div")
        loginMessage.classList.add('loginMessage');
        const loginMessagesText = document.createTextNode("Login To Use Website");
        loginMessage.appendChild(loginMessagesText);
    

        const element = document.getElementById("moviePage");
        element.appendChild(loginMessage);

    }

}




Init()
generateMovies(getMovies())
