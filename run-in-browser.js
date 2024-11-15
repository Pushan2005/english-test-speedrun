fetch("https://path-to-your-file.js")
    .then((response) => response.text())
    .then((code) => eval(code));
