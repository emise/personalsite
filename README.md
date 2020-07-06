# personalsite

### Angela Liu's personal website

This website is built using React (ES6 with React Router) and a Python Flask server.


This app was designed to be as dynamic as possible; content updates can be made via:
- uploading photos to the right bucket in S3
- adding text to the `allWords.js` file


The React app should update the UI automatically.


## Setup
`pip install -r requirements.txt`

`npm install -g webpack`

`npm install`

## Run app
Start python server: `npm run start`

Start webpack: `npm run dev`

Testing across multiple devices in same network: `flask run --host=<host ip>`

## Productionizing
Build js: `npm run build`
