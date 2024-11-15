// keeping this helper function incase I need it later
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function selectAllLabels() {
    // It's 2am and I'm too lazy to write a proper selector, let's just select all labels
    const labels = document.querySelectorAll("label");

    labels.forEach((label) => {
        label.click();
    });
}

function answerQuestion() {
    try {
        // this is for that question type where you have to reaarange words correctly or something
        const passageOptionsDiv = document.querySelector(
            ".converse-pasage-options"
        );
        if (passageOptionsDiv) {
            const buttons = passageOptionsDiv.querySelectorAll("button");
            buttons.forEach((button) => {
                button.click();
            });
            console.log("Answered using buttons in 'converse-pasage-options'.");
            return;
        }

        // If no "converse-pasage-options" div, proceed with other answer methods
        const liElements = document.querySelectorAll("li");
        if (liElements.length > 0) {
            const hasLabels = Array.from(liElements).some((li) =>
                li.querySelector("label")
            );
            if (hasLabels) {
                selectAllLabels();
            } else {
                liElements.forEach((li) => li.click());
            }
            console.log("Answered using li elements.");
        }
    } catch (error) {
        console.error("Error selecting answer elements:", error);
    }
}

async function nextScreen() {
    return new Promise((resolve) => {
        const submitBtn = document.querySelector("#testSubmit");

        if (submitBtn && !submitBtn.classList.contains("disabledElement")) {
            submitBtn.click();

            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === "childList") {
                        console.log("Next screen loaded");
                        observer.disconnect();
                        resolve();
                    }
                });
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true,
            });
            console.log("Waiting for next screen to load");
        } else {
            console.warn("Submit button is still disabled");
            resolve();
        }
    });
}

async function main() {
    while (true) {
        const submitBtn = document.querySelector("#testSubmit");

        if (submitBtn && !submitBtn.classList.contains("disabledElement")) {
            console.log(
                "Submit button enabled, clicking to go to next screen..."
            );
            submitBtn.click();
            await nextScreen();
            continue;
        }

        if (submitBtn && submitBtn.classList.contains("disabledElement")) {
            console.log("Submit button is disabled, answering questions...");
            answerQuestion();
        }

        await sleep(2000);
    }
}

main();
