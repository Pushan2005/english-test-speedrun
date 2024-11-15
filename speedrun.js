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
        // this is for that question type where you have to rearrange words correctly or something
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

async function handleQuestions() {
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

            // checking for retake test button
            const retakeButton = Array.from(
                document.querySelectorAll("button")
            ).find(
                (button) =>
                    button.textContent.trim() === "Please retake the test."
            ); // couldn't find a better selector for this
            if (retakeButton) {
                console.log("Retake test button detected, clicking...");
                await sleep(500);
                retakeButton.click();
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

                const recordingButton = document.querySelector(
                    'button[aria-label="start-recording"]'
                );
                if (recordingButton) {
                    console.log(
                        "Speech based questions detected, stopping the script."
                    );
                    alert(
                        "Speech based questions need to be done manually. Restart script once you're done."
                    );
                    return; // exit script cuz recording can't be automated
                }

                answerQuestion();
            }

            await sleep(2000);
        } catch (error) {
            console.error("Error in main loop, restarting script...", error);
        }
    }
}

async function handleHomeScreen() {
    try {
        // units don't load immediately, so wait for them to load
        const loaded = await waitForElement(".progpercenttext");
        if (!loaded) {
            console.log("Activities didn't load..."); // not sure if this will ever run
            return;
        }

        // units have loaded
        const units = document.querySelectorAll(".progpercenttext");
        const nextUnit = Array.from(units).find((unit) => {
            return unit.innerHTML.trim() !== "100%";
        });
        await sleep(500);
        nextUnit.click();
    } catch (err) {
        console.error("Error in handleHomeScreen function:", err);
    }
}

// helper function for handleHomeScreen()
function waitForElement(selector) {
    return new Promise((resolve) => {
        function check() {
            const element = document.querySelector(selector);
            if (element) {
                resolve(element);
            } else {
                setTimeout(check, 100);
            }
        }
        check();
    });
}

async function main() {
    try {
        const dashboardPage = document.querySelector(".dashboard-page");
        if (dashboardPage) {
            console.log("Dashboard page detected, starting script...");
            await handleHomeScreen();
            return;
        }

        // assume we're not on the home page
        await handleQuestions();
    } catch (err) {
        console.error("Error in main function:", err);
    }
}

main();
