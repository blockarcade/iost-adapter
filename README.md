# IOST External Adapter

## How to use

* Install dependencies `npm install`

* Set up [Environment variables](#environment-variables)

* *Optional:* Run tests `npm test`

* Run `createRequest()` in one of the following ways:
    * call it directly (by running `node app.js`).
    * use the `handler()` wrapper for AWS Lambda
    * use the `gcpservice()` wrapper for GCP

* Use one of the [available methods.](#available-methods)
    * Set method name in `data.method`, along with method-specific parameters

To create a ZIP file to upload to AWS/GCP, run:

```bash
zip -r cl-ea.zip .
```

## Environment variables

| Variable      |               | Description | Example |
|---------------|:-------------:|------------- |:---------:|
| `ACCOUNT_NAME`     | **Required**  | Account name of IOST user. | `octalmage` |
| `PRIVATE_KEY`  | **Required**  | Private key for IOST user | `2a8f2e4e3b7e541` |
| `API_HOST`  | **Required**  | IOST Node to use for API requests | `api.iost.io` |

## Available methods

### callAbi

Use callAbi to submit a transaction to a smart contract.

#### Request

| Variable | Type | Description |
|----------|------|-------------|
| `contract` | String | The ID of the contract |
| `action` | String | The name of the method to call |
| `args` | String | Stringified array of arguments for smart contract |

## Support

Got questions or feedback? [Stop by our Telegram room!](https://t.me/blockarcade)

## License

MIT
