# Cypress test for GoPuff Search

## Instructions

Install NodeJS from https://nodejs.org/ 

(or verify existing version is > 8)

`node --version`

pull down code from git

At the highest level folder, install cypress:

`npm install cypress`

To run test in the cypress UI:

`npx cypress open` or `npm run cypress`

**Notes about the Project**
The biggest thing is I struggled with the location services. I tried a few different methods trying to mock/control this (setting cookies, turning on and off location from the browser, mocking the location API calls), but I must be missing something. I also was unable to navigate directly to the #categories hash to start the test at search because of the re-direct.

So because I never successfully mastered these factors, unfortunately all the tests have to go through the steps of going through the landing page and selecting an address to use (which definitely slows down the tests). I run the test with allowing location access on in the browser, so it picks up whatever that address is and uses that. This also for now means I have to run with the cypress UI because I was unable to set that setting in the electron headless browser.

Once I get through this point - it doesn't matter what the address is that is chosen through this process (as long as it is in Philadelphia delivery area (code 6) or an out-of-delivery area (-1). If for some reason the person running it is in a different area, devtools can be used to simulate a different geolocation (https://developers.google.com/web/tools/chrome-devtools/device-mode/geolocation).
Then for the rest of the tests, I mock the service calls (for both delivery areas) using cy.server/cy.route for the search results so I know what will be coming back. I am fairly pleased with the tests once they gets past the whole location set up parts.
So to be clear what I wanted to do was:

1) Be able to definitively set up location for the test (worked around by usingbrowser-providedlocations and handling locations in Philadelphia or out-of-delivery area... I know this is not ideal at all, and I really wish I could have resolved this)

2) Start the test from the search page (was not able to do)

3) Return canned search results for predictable API results (which I **was** able to do)

As a note: I sometimes get a popup from location about requiring a zip code despite the data being the same as the last address that was entered. This seems to happen randomly and I can get it to happen when I run the site on my own outside of the tests, so I haven't dealt with it in the test. It seems to be an issue to me? If this occurs, please try to run again.

