fetch(
    "https://raw.githubusercontent.com/Pushan2005/english-test-speedrun/refs/heads/main/speedrun.js"
)
    .then((response) => response.text())
    .then((code) => eval(code));
