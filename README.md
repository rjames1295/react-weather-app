## React weather app

### Installing dependencies
* `cd /path/to/project`
* `yarn`

### Running the app locally
* `cd /path/to/project`
* Add your Open Weather Map API key as an environment variable
  * `export OWMAPI_KEY="{your_api_key_here}"`
  * To remove the api key `unset OWMAPI_KEY`
* `yarn start`


### Deploying on github-pages
* `cd /path/to/project`
* `yarn deploy`
  * Runs a script to automagically build and push the code


## Weather API

Weather API provided by [Open weather map](https://openweathermap.org/)

* API keys can be obtained by creating an account on the website


## TODOS

* Google Maps API
* Places auto-complete


## Useful references
* [GH-pages and react-route](https://github.com/gitname/react-gh-pages/issues/3)