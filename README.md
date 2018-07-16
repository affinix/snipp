# snipp
Dead simple, bare bones URL shortener, using MongoDB.

## Installing & Running
```
$ git clone https://github.com/Affinix/snipp.git
$ cd snipp
$ npm install
$ node .
```

(Don't forget to change .env-example)

## API Reference
It's pretty simple, GET ${BaseURL}/api/new?url="URL_GOES_HERE".

Returns:
```
{
    "id": "coI0F",                   // ID of the URL
    "url": "https://snipp.it/coI0F"  // Shortened URL
    "baseURL": "https://snipp.it"    // Base URL
}
```