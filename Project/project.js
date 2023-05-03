const movieData = {
    title: "Uncharted",
    runTime: 109,
    imdbScore: 7.4,
    releaseDate: "2022-02-10",
    cast: ["person1","Person2","Person3","Person4"],
    description: 'The standard Lorem Ipsum passage, used since the 1500s "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
    video: "tgbNymZ7vqY",
    poster: "https://m.media-amazon.com/images/M/MV5BMWEwNjhkYzYtNjgzYy00YTY2LThjYWYtYzViMGJkZTI4Y2MyXkEyXkFqcGdeQXVyNTM0OTY1OQ@@._V1_.jpg",
    inList: false
}


//function turns an array of string into a single string where each element is comma separated
const listIntoString = (list) => {
    let listString = "empty"
    
    if (list.length > 0) {
        listString = list[0]

        for (let i = 1; i < list.length; i++) {
            listString = listString + ", " + list[i]
        }
    }
    return listString
}

//function converts movie object into html elements and appends them to the DOM
const makeMovie = (movie) => {
    //create the full movie unit container
    const movieContainer = document.createElement("div");
    movieContainer.classList.add('fullContainer');

    //add movie poster
    const poster = document.createElement("img");
    poster.src = movie.poster
    poster.alt = "No Poster Found :/"
    poster.height = "260"
    poster.width = "176"
    movieContainer.appendChild(poster)

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
    const imdbScoreString = document.createTextNode(movie.imdbScore + " / 10");
    imdbScore.appendChild(imdbScoreString);
    imdbDiv.appendChild(imdbScore)

    statsContainer.appendChild(imdbDiv) 

    //create and append divs for runtime and release date
    const runtime = document.createElement("div");
    const runtimeNode = document.createTextNode(movie.runTime + " Minutes");
    runtime.appendChild(runtimeNode);
    statsContainer.appendChild(runtime) 

    const releaseDate = document.createElement("div");
    const releaseDateNode = document.createTextNode(movie.releaseDate);
    releaseDate.appendChild(releaseDateNode);
    statsContainer.appendChild(releaseDate) 

    infoContainer.appendChild(statsContainer) 

    //create and append div that contains cast

    castString = listIntoString(movie.cast)

    const castContainer = document.createElement("div");
    castContainer.classList.add('cast');
    const cast = document.createTextNode("Cast: " + castString);
    castContainer.appendChild(cast);
    infoContainer.appendChild(castContainer) 

    //add movie description
    const description = document.createElement("div");
    const descriptionNode = document.createTextNode(movie.description);
    description.appendChild(descriptionNode);
    infoContainer.appendChild(description) 

    //add video Trailer

    const vidContainer = document.createElement("div");
    vidContainer.classList.add('video');

    const video = document.createElement("iframe");
    video.width = "420"
    video.height = "250"
    video.src = "https://www.youtube.com/embed/" + movie.video
    vidContainer.appendChild(video) 

    infoContainer.appendChild(vidContainer) 

    movieContainer.appendChild(infoContainer)
    
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add('buttonContainer');


    if (movie.inList) {
        const removeMovieButton = document.createElement("input")
        removeMovieButton.classList.add('appButton');
        removeMovieButton.id = "addMovieButton"
        removeMovieButton.type = "button"
        removeMovieButton.value = "-"
        removeMovieButton.onclick = () => console.log("Movie removed from list")
    
        buttonContainer.appendChild(removeMovieButton)
    }else{
        const addMovieButton = document.createElement("input")
        addMovieButton.classList.add('appButton');
        addMovieButton.id = "addMovieButton"
        addMovieButton.type = "button"
        addMovieButton.value = "+"
        addMovieButton.onclick = () => console.log("Movie Added to list")
    
        buttonContainer.appendChild(addMovieButton)
    }


    movieContainer.appendChild(buttonContainer)


    const element = document.getElementById("moviePage");
    element.appendChild(movieContainer);
    
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
    loginButton.type = "submit"
    loginButton.value = "Login >>"

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
    passwordInput.id = "signinPassword"
    passwordInput.name = "signinPassword"
    passwordInput.placeholder = "Password"

    formDiv.appendChild(passwordInput);

    //create Confirm Password Input
    const confirmPasswordInput = document.createElement("input")
    confirmPasswordInput.classList.add('textBar');
    confirmPasswordInput.type = "password"
    confirmPasswordInput.id = "signinConfirmPassword"
    confirmPasswordInput.name = "signinConfirmPassword"
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
    signupButton.type = "submit"
    signupButton.value = "SignUp >>"

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

//function initiated menu sidebar content on load
const menuBarInit = () => {

    let loggedIn = true
    const menuElement = document.getElementById("Menu");

       
    if (loggedIn){

        const accountName = "Fady"
        
        //Add Welcome text
        const welcome = document.createElement("div")
        welcome.classList.add('welcome');
        const welcomeText = document.createTextNode("Welcome " + accountName);
        welcome.appendChild(welcomeText);
        menuElement.appendChild(welcome);

        const myListDiv = document.createElement("div")
        myListDiv.classList.add('myListDiv');
        myListDiv.onclick = () => console.log("MyList")

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
        logoutButton.onclick = () => console.log("logout")
        logoutButton.style = "margin: 40px 100px"

        menuElement.appendChild(logoutButton);


    }else{
        createLoginForm()
    }

}





makeMovie(movieData)
menuBarInit()

