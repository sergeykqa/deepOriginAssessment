## To start with project
run `npm install` to install all dependancies

## Run the tests
There are two scripts to run tests:

`npm run cypress:open` will run tests in Cypress UI runner

`npm run cypress:run` will run tests in headless mode

## Generate a report
Once tests run is completed, run `npm run merge` script to merge all reports

After that run `npm run generate-report` to generate actual html report. The report will automatically open in your default browser and located in the reports folder.