# Node Express App for OpenAlpr plate recognition

## Install

Because I never successed with using [node-openalpr](No https://github.com/netPark/node-openalpr) this express app use the `alpr` command instead.

* Install [OpenAlpr](https://github.com/openalpr/openalpr) on the computer/host where you will be running this app.
* Download / clone repo and run `npm install`

## Run

* `npm start` or 'pm2 start processes.json'

## Docker support

In the root of the project build and run the project:

* `docker build -t gerhardsletten/plate-reader-server .`
* `docker run -p 4500:4500 gerhardsletten/plate-reader-server`

## Routes

```

POST /plates` with json:
{
	image: (base64 encoded data),
	country_code: 'eu',
	pattern_code: 'no'
}

returns 
{
	plate: 'DP49829',
	confidence: 79.758995,
	matches_template: 1,
	plate_index: 0,
	region: 'no',
	region_confidence: 0,
	processing_time_ms: 66.374001,
	requested_topn: 10,
	coordinates : {
		...
	},
	candidates : [
		{ plate: 'DP498Z9', confidence: 87.328056, matches_template: 0 },
		{ plate: 'DP98Z9', confidence: 83.397873, matches_template: 0 },
		...
	]

```

## Test

* `npm test` to test the express app
* 'node ./test/docker.js' to test the running docker, but you will need to adjust the url/port to your running docker
