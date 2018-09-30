#Adobe Audience Manager Bulk Uploader

I started this project to make it quicker and easier to bulk upload traits into Adobe Audience Manager. Feel free to test by using the csv in the repo. You will need to reach out to your Adobe rep however to get you setup with an authorization number. 

## How it works
The AAM API does not have a route supporting buk uploads, so the algorithm in this application uses the following work flow:

- react-csv-reader parses the csv immediately upon selecting the file
- Algorithm in TraitsOutput.js puts the data in the correct format: One large "options" array containing a "trait" array for each new trait
- async function postTraits individually posts each trait, awaiting the response whether it was successfully posted or not. A successful addition will turn the row green; unsuccessful will turn the row red. 