# WebFetch Explorer

**WebFetch Explorer** is a lightweight, web-based utility designed to help developers easily test, explore, and analyze API endpoints. Whether you need to make standard HTTP requests or evaluate server latency under simulated stress, this tool provides a clean and intuitive interface.

## Features

* **Standard API Fetching:** Easily make `GET`, `POST`, `PUT`, and `DELETE` requests to any API endpoint.
* **Read-Only Mode:** A quick safety toggle that locks the request method to `GET` for safe exploration without modifying server data.
* **Stress Mode (Latency Tester):** Test the reliability and speed of an endpoint. This feature sends 50 consecutive requests, visually tracks the progress in real-time, and calculates the average server response delay (in milliseconds).
* **JSON Export:** Download the API response directly as a `.json` file with a single click for offline inspection.
* **Interactive UI:** Built with Bootstrap 5, featuring a clean layout, dynamic state badges, and contextual color feedback based on request success or failure.

## Getting Started

### Prerequisites
Since this is a vanilla front-end application, you don't need Node.js or any complex package managers. You just need a modern web browser.

### Installation
1. Clone the repository to your local machine:
   ```bash
   git clone [https://github.com/cristopherpydev/webfetchhelper.git](https://github.com/cristopherpydev/webfetchhelper.git)

2. Open the project folder.

3. Open index.html in your browser.

(Note: Using a local server extension like Live Server in VS Code is highly recommended to avoid local CORS restrictions).

## How to Use 

### Regular API Testing

1. Ensure the Stress mode toggle is unchecked.

2. Enter your target URL in the endpoint input field.

2. If you need to change the HTTP method or add a request body, uncheck the Read-only? toggle.

4. Click Fetch to see the response payload and the execution time.

### Latency Testing (Stress Mode)

1. Check the Stress mode toggle to switch the UI.

2. Enter your target URL.

3. Click Test.

3. Watch the progress bar complete its 50 iterations.

4. Once finished, the app will display the average network latency in milliseconds.

## Built With 

- HTML5 & CSS3

- Vanilla JavaScript (ES6+ with Async/Await)

- Bootstrap 5.3

- Bootstrap Icons

## Problems faced

- FOUC (Flash of Unstyled Content).

## Author
cristopherpydev

GitHub: @cristopherpydev