// keeping this helper function incase I need it later
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function selectAllLabels() {
    // It's 2am and I'm too lazy to write a proper selector, let's just select all labels
    const labels = document.querySelectorAll("label");

    labels.forEach(async (label) => {
        await sleep(500);
        label.click();
    });
}

function triggerTextareaClick(textarea) {
    const mouseEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
    });

    textarea.dispatchEvent(mouseEvent);
}

async function answerQuestion() {
    try {
        // this is for that question type where you have to reaarange words correctly or something
        const passageOptionsDiv = document.querySelector(
            ".converse-pasage-options"
        );
        if (passageOptionsDiv) {
            const buttons = passageOptionsDiv.querySelectorAll("button");
            buttons.forEach(async (button) => {
                await sleep(500);
                button.click();
            });
            console.log("Answered using buttons in 'converse-pasage-options'.");
            return;
        }

        // this is for that question type where you have to type in the text area
        const textArea = document.querySelector("textarea");
        if (textArea) {
            console.log("Why did this run lol, script should've ended");
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
                await sleep(500);
                liElements.forEach((li) => li.click());
            }
            console.log("Answered using li elements.");
        }
    } catch (error) {
        console.error("Error selecting answer elements:", error);
    }
}

async function nextScreen() {
    return new Promise(async (resolve) => {
        const submitBtn = document.querySelector("#testSubmit");

        if (submitBtn && !submitBtn.classList.contains("disabledElement")) {
            await sleep(500);
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
        try {
            // check for start button
            const startButton = Array.from(
                document.querySelectorAll("button")
            ).find((button) => button.textContent.trim() === "Start");

            if (startButton) {
                console.log("Start button detected, clicking...");
                await sleep(500);
                startButton.click();
                await nextScreen();
                await sleep(2000);
                continue;
            }

            // check for continue button
            const continueButton = Array.from(
                document.querySelectorAll("button")
            ).find((button) => button.textContent.trim() === "Continue");
            if (continueButton) {
                console.log("Continue button detected, clicking...");
                await sleep(500);
                continueButton.click();
                await nextScreen();
                continue;
            }

            // check for submit button
            const submitBtn = document.querySelector("#testSubmit");

            if (submitBtn && !submitBtn.classList.contains("disabledElement")) {
                console.log(
                    "Submit button enabled, clicking to go to next screen..."
                );
                await sleep(500);
                submitBtn.click();
                await nextScreen();
                continue;
            }

            if (submitBtn && submitBtn.classList.contains("disabledElement")) {
                console.log(
                    "Submit button is disabled, answering questions..."
                );
                const textarea = document.querySelector("textarea");
                if (textarea) {
                    console.log("Textarea detected, stopping the script.");
                    alert(
                        "Typing questions need to be answered manually. Restart script once you're done."
                    );
                    return; // exit script cuz textarea is kryptonite
                }
                answerQuestion();
            }

            await sleep(2000);
        } catch (error) {
            console.error("Error in main loop, restarting script...", error);
        }
    }
}

main();
