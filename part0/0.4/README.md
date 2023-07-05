# Creating a new "note"
### *Create a diagram depicting the situation where the user creates a new note on the page https://studies.cs.helsinki.fi/exampleapp/notes by writing something into the text field and clicking the submit button.*
<br>

After [loading the Notes page](loading-the-notes-page.md), we can create a new note by writing something into the text field and clicking the submit button.

![writing something in the input field](input-field.png)

![new note created after submit](new-note.png)

We can see in its markup that the input field and the submit button are in a form.

![html markup](html.png)

When the 'save' button was clicked, a POST request was made in the 'exampleapp/new_note' route. The server processed the request with this code:

![Alt text](image.png)

Notice that following the manipulation of the notes array, the server responded by redirecting to the Notes page.

In the browser's developer tool, these are the requests after the creation of a new note.

![new note header](new-note-header.png) 

The form data within the Payload tab:

![new note payload](new-note-payload.png)

<br>

## Mermaid

The sequence diagram for this is very similar to loading the Notes page. The only difference is that we begin by creating a POST request. After this request is finished, we just load the Notes page again but now we have created a new note.

```mermaid
sequenceDiagram
    participant browser
    participant server
    Note right of browser: The browser sends the request including the form data into the server
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    Note left of server: The server did something with the form data and responds with a redirect
    server-->>browser: res.redirect('/notes')
    deactivate server

    Note right of browser: The browser requests the Notes page
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
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
    Note right of browser: The newly rendered notes include the one that we have just created
```