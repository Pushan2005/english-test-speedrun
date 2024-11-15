fetch(
    "https://raw.githubusercontent.com/Pushan2005/step-english-speedrun/refs/heads/main/speedrun.js"
)
    .then((response) => response.text())
    .then((code) => eval(code));
