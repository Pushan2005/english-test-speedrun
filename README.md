# Speedrun.js

## Overview

If you stumbled across this project, I'd assume that you have STEP-English as your english course. If you are confident in your ability to speak English then the ungraded activities are a waste of time.

**Speedrun.js** is a script that automates (most of) the STEP English course by fulfilling answer requirements and submitting each question for you.

Of course the answers won't be correct since there's no LLM to process the question and spit out the right answer. But the point is to attain 100% completion since the actual grade you receive will be based on the written test as part of your college examination series.

## Disclaimer:

-   **Educational Purpose Only**: This script was created as a learning exercise in browser-task automation. Use it responsibly.
-   **No Correct Answers**: The script does not provide accurate answers. If your grades depend on these activities, do **NOT** use this script. Complete the activities yourself to learn effectively.
-   **Follow College Policies**: If your institution prohibits the use of automation or other unfair means, refrain from using this tool.

# How to use it?

1.  **Login**: Go to the STEP-English course website: `english[dot]steptest[dot]in`.
2.  **Start a Module**: Begin any module and proceed to the questions section.
3.  **Access Browser Console**:

    -   Open your browser's developer tools (commonly accessed via F12 or Ctrl+Shift+I).
    -   Navigate to the Console tab.

4.  **Run the Script**: Copy and paste the following code into the console:

    ```js
    fetch(
        "https://raw.githubusercontent.com/Pushan2005/step-english-speedrun/refs/heads/main/speedrun.js"
    )
        .then((response) => response.text())
        .then((code) => eval(code));
    ```

5.  **Troubleshooting**: If you encounter issues, manually copy the code from `run-in-browser.js` in the repository and paste it directly into the console.

---

## Limitations:

-   Text area based questions cannot be automated due to proctoring, i've tried bypassing with global click events and keystroke events. Spending anymore time to bypass this is no longer efficient use of my time. I may come back to this sometime in the future but no promises.
-   Speech based questions can't be automated, so just say "English 123" or something for it to detect english words and move to next question.
-   There exists a anti-cheat function in the backend which cleans up external javascript code that is running every time we go to the next module.The script needs to be run again inside the console.
![image](https://github.com/user-attachments/assets/3dc8a4f2-3eaa-4848-823b-fc4ca5ef4516)

-   There's a chance that the anti-cheat may ask you to retake the test but you can just run the script again every time this happens.

---

## Feedback & Contributions

If you found this script helpful or interesting, please consider giving the repository a ⭐ on GitHub.
