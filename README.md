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

-----------------
### NEW:

| Endpoint | Method | Description         |
|----------|--------|---------------------|
| /api/new | GET    | Generates a new URL |

**Query string parameters**

| Name | Data type | Required / Optional | Description         |
|------|-----------|---------------------|---------------------|
| url  | string    | required            | URL to be shortened |

**Example:**

`GET https://snipp.it/api/new?url="https://google.com"`

**Returns:**

```
{
    "id": "coI0F",                   // ID of the URL
    "url": "https://snipp.it/coI0F"  // Shortened URL
    "baseURL": "https://snipp.it"    // Base URL
}
```
---------------
