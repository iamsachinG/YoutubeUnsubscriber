# YoutubeUnsubscriber
This code help you unsubscribe Youtube channels by running a code in your browser dev tools.

# YouTube Subscription Cleaner

A simple JavaScript automation script that helps you quickly unsubscribe
from multiple YouTube channels using your browser's Developer Console.

## Features

- Automatically detects subscribed channels
- Opens the subscription menu
- Selects the unsubscribe option
- Confirms the unsubscribe action
- Processes multiple channels automatically
- No installation or external dependencies required

---

## Usage Instructions

### 1. Navigate to Your Subscriptions

Go to the [YouTube Subscriptions page](https://www.youtube.com/feed/channels)
while logged into your YouTube account.

This page displays the channels you are currently subscribed to.

### 2. Load Your Subscribed Channels

Scroll down the page and make sure the channels you want to unsubscribe
from are loaded and visible.

> **Note:** The script can only interact with subscription buttons that
> are loaded on the page.

### 3. Open Developer Tools

Open your browser's Developer Tools.

You can use:

- **Chrome / Edge / Firefox:** Press `Ctrl + Shift + I`
- **Mac:** Press `Cmd + Option + I`

Alternatively, right-click anywhere on the page and select
**Inspect**.

### 4. Switch to the Console Tab

Inside Developer Tools, select the **Console** tab.

This is where the JavaScript code will be executed.

### 5. Copy the JavaScript Code

Open the [`unsubscribe.js`](./unsubscribe.js) file from this repository
and copy the complete code.

Paste it into the browser console.

If your browser displays a warning about pasting code, follow the browser's
instructions to enable pasting.

Press **Enter** to execute the script.

### 6. Let the Script Run

The script will automatically:

1. Find the loaded subscription buttons.
2. Open each subscription menu.
3. Select the unsubscribe option.
4. Confirm the unsubscribe action.
5. Continue with the next channel.

You can monitor the browser while the script is running.

---

## Important Notes

- The script performs **real unsubscribe actions** on your YouTube account.
- Make sure you understand what the script does before running it.
- Test it with a small number of channels first.
- YouTube may change its website structure, which can cause the script to
  stop working.
- You may need to reload the page if the script behaves unexpectedly.

## Requirements

- A YouTube account
- A modern web browser
- Access to the YouTube Subscriptions page
- No additional software or dependencies

## Project Structure

```text
youtube-subscription-cleaner/
│
├── README.md
├── unsubscribe.js
└── LICENSE
