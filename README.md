# Express IP

An Express middleware for getting IP geolocation information using geoip-lite. Automatically attaches IP details to the request object for easy access in your route handlers.

## Installation

```bash
npm install express-ip
```

## Usage

### Quick Start (Middleware)

```javascript
const express = require('express');
const app = express();
const expressip = require('express-ip');

app.use(expressip().getIpInfoMiddleware);

app.get('/', function (req, res) {
    res.send(req.ipInfo);
});

app.listen(3000);
```

### Full Example

```javascript
const express = require('express');
const app = express();
const expressip = require('express-ip');
const PORT = process.env.PORT || 7000;

app.use(expressip().getIpInfoMiddleware);

app.set("PORT", PORT);

app.get('/', function (req, res) {
    res.send(req.ipInfo);
});

app.listen(app.get('PORT'), function () {
    console.log('Express started on http://localhost:' +
        app.get('PORT') + '; press Ctrl-C to terminate.');
});
```

### Direct IP Lookup (Without Middleware)

```javascript
const expressip = require('express-ip');
const ipInfo = expressip().getIpInfo('8.8.8.8');
console.log(ipInfo);
```

## API Reference

### `getIpInfoMiddleware`

Express middleware that attaches IP information to `req.ipInfo`.

**Features:**
- Automatically extracts IP from `x-forwarded-for` header or `req.connection.remoteAddress`
- Handles IPv6 addresses with embedded IPv4 (e.g., `::ffff:86.3.182.58`)
- Strips port numbers from forwarded IPs

### `getIpInfo(ip)`

Returns geolocation information for a given IP address.

**Parameters:**
- `ip` (string): IP address to lookup

**Returns:**
Object with geolocation data or error message.

## Response Format

### Successful Response

```javascript
{
  ip: "8.8.8.8",
  range: [134744064, 134744071],
  country: "US",
  region: "",
  eu: "0",
  timezone: "America/Chicago",
  city: "",
  ll: [37.751, -97.822],
  metro: 0,
  area: 1000
}
```

### Error Responses

**Localhost:**
```javascript
{
  ip: "127.0.0.1",
  error: "This won't work on localhost"
}
```

**Invalid/Unknown IP:**
```javascript
{
  ip: "invalid.ip",
  error: "Error occured while trying to process the information"
}
```

## Features

- 🌍 Geolocation data including country, region, city, timezone
- 🔄 Automatic IPv6 to IPv4 conversion
- 🛡️ Handles `x-forwarded-for` headers (useful behind proxies)
- ⚡ Lightweight and fast (uses geoip-lite)
- 🎯 Works as middleware or standalone function

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Author

Oyetoke Toby <oyetoketoby80@gmail.com> (http://patreon.com/oyetoketoby)