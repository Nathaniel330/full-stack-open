# Loading the "Notes", single-page version
### *Create a diagram depicting the situation where the user goes to the single-page app version of the notes app at https://studies.cs.helsinki.fi/exampleapp/spa.*
<br>
We can make a request in our browser to go to a website using the address bar,

![Browser address bar](browser-address-bar.png)

or we can click a hyperlink

![Exercise 0.5](0.5.png)

This is what the dev tool network tab looks like after the request:

![Loading Notes, SPA](loading-notes-spa.png)

The html document is served and it is structured like this:

![Notes SPA markup](notes-spa-markup.png)

The head of the document contains link for a style sheet and for the script. Because I have an ad blocker, in-page.js was also made as a request from the extension. 

So when the stylesheet was loaded, these css rules were applied to the document.

![main.css](main-css.png)

then the JavaScript files are executed, the spa.js code includes fetching of the JSON file ```xhttp.open("GET", "exampleapp/data.json", true)``` from the server

![spa.js](spa-js.png)

when the JSON file is received, it is parsed and redrawNotes() function is called — the browser has the notes and renders them.

<br>

## Mermaid

This is the sequence diagram for the loading of Notes, single-page version. 

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    browser->>server: GET chrome-extension://fnjhmkhhmkbjkkabndcnnogagogbneec/in-page.js
    server-->>browser: JavaScript file by browser extension (ad blocker)

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```