const movieData = {
    title: "Uncharted",
    runTime: 109,
    imdbScore: 7.4,
    releaseDate: "2022-02-10",
    cast: ["person1","Person2","Person3","Person4"],
    description: 'The standard Lorem Ipsum passage, used since the 1500s "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
    video: "tgbNymZ7vqY",
    poster: "https://m.media-amazon.com/images/M/MV5BMWEwNjhkYzYtNjgzYy00YTY2LThjYWYtYzViMGJkZTI4Y2MyXkEyXkFqcGdeQXVyNTM0OTY1OQ@@._V1_.jpg"
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

    const button1 = document.createElement("img");
    button1.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Circle_-_black_simple.svg/1280px-Circle_-_black_simple.svg.png"
    button1.alt = "No Poster Found :/"
    button1.height = "70"
    button1.width = "70"
    buttonContainer.appendChild(button1)


    movieContainer.appendChild(buttonContainer)


    const element = document.getElementById("moviePage");
    element.appendChild(movieContainer);
    
}

const accountSettings = () => {

    let loggedIn = false
    
    const menuElement = document.getElementById("Menu");
    
    if (loggedIn){

        const accountName = "Fady"
        
        //Add Welcome text
        const welcome = document.createElement("div")
        welcome.classList.add('welcome');
        const welcomeText = document.createTextNode("Welcome " + accountName);
        welcome.appendChild(welcomeText);
        menuElement.appendChild(welcome);

    }else{
        console.log("logged out")

        //Add Login text
        const loginTitle = document.createElement("div")
        loginTitle.classList.add('welcome');
        const loginTitleText = document.createTextNode("Login");
        loginTitle.appendChild(loginTitleText);
        menuElement.appendChild(loginTitle);

        //create the login form
        const loginForm = document.createElement("form")

        const formDiv = document.createElement("div")
        formDiv.classList.add('formDiv');

        const usernameInput = document.createElement("input")
        usernameInput.classList.add('textBar');
        usernameInput.type = "text"
        usernameInput.id = "loginUsername"
        usernameInput.name = "loginUsername"
        usernameInput.placeholder = "Username"

        formDiv.appendChild(usernameInput);

        const passwordInput = document.createElement("input")
        passwordInput.classList.add('textBar');
        passwordInput.type = "password"
        passwordInput.id = "passwordUsername"
        passwordInput.name = "passwordUsername"
        passwordInput.placeholder = "Password"

        formDiv.appendChild(passwordInput);

        const buttonDiv = document.createElement("div")
        buttonDiv.classList.add('buttonDiv');

        const signupButton = document.createElement("input")
        signupButton.classList.add('appButton');
        signupButton.type = "button"
        signupButton.value = "<< SignUp"

        buttonDiv.appendChild(signupButton);

        const loginButton = document.createElement("input")
        loginButton.classList.add('appButton');
        loginButton.type = "submit"
        loginButton.value = "Login >>"

        buttonDiv.appendChild(loginButton);


        formDiv.appendChild(buttonDiv);

        loginForm.appendChild(formDiv);

        menuElement.appendChild(loginForm);

    }


}


makeMovie(movieData)
accountSettings()

