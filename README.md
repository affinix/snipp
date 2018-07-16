# ✂️ snipp
Dead simple, bare bones URL shortener using MongoDB. (No UI)

## Installing & Running
```
$ git clone https://github.com/Affinix/snipp.git
$ cd snipp
$ npm install
$ node .
```

(Don't forget to change .env-example)

## API Reference

### NEW:

| Endpoint | Method | Description         |
|----------|--------|---------------------|
| /api/new | GET    | Generates a new URL |

**Query string parameters**

| Name | Data type | Required / Optional | Description                      |
|------|-----------|---------------------|----------------------------------|
| url  | string    | required            | URL to be shortened              |
| id   | string    | optional            | ID which the URL is accessed by  |

**Example:**

`GET https://snipp.it/api/new?url=https://google.com`
`GET https://snipp.it/api/new?url=https://google.com&id="google"`

**Returns:**

```
{
    "id": "coI0F",                   // ID of the URL
    "url": "https://snipp.it/coI0F"  // Shortened URL
    "baseURL": "https://snipp.it"    // Base URL
}
```
---------------
