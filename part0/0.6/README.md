# Creating a new "note" in single-page app
### *Create a diagram depicting the situation where the user creates a new note using the single-page version of the app.*
<br>

Once the [Notes (single-page version) has loaded](/part0/0.5/README.md), we will have this browser and dev tool window:

![Notes single-page / dev tool](notes-single-page-dev-tool.png)

We will now be able to create a new note. But before doing so, let us clear the console. We do this to see what requests are sent for creating a new note in a single-page app. The browser window now looks like this:

![Before creating new note](before.png)

After pressing the save button, the new note is added to the list. We can also see that only a single request was made 

![After creating new note](after.png)

This single-page application example shows that unlike traditional web pages, it doesn't require a page refresh to render the updated notes.

Here, we receive the status code 201 Created instead of a 302 Found:

![New note header](new-note-header.png)

<br>

## Mermaid

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: {"message":"note created"}
    deactivate server

    Note right of browser: After a note has been created, I think the JavaScript code updates the web page
    Note right of browser: The page did not need to be reloaded for the changes to appear
```