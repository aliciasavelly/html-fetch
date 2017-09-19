# fetchHTML

[fetchHTML live](https://html-fetch.herokuapp.com/)

fetchHTML is a web application which allows users to view HTML content from searched websites. Users can toggle tag names that occur within the web page in order to see those tags highlighted in the source code view.

## Features & Implementation

React.js was used to create this application (specifically [Create React App](https://github.com/facebookincubator/create-react-app)). When users type a website into the search bar, ```axios``` makes a get request to that page, and the HTML is identified and presented to the user. Users are able to toggle buttons referencing tags within the web page they are interested in. Regex is used to search through the source code and highlight the selected tags.

## Tests

Look in the ```src/components/__tests__``` folder to view tests for the ```WebsiteSearch``` and ```TagInfo``` components.
