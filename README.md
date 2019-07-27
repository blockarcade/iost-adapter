# IOST External Adapter

## How to use

* Install dependencies `npm install`

* Set up [Environment variables](#environment-variables)

* *Optional:* Run tests `npm test`

* Run `createRequest()` in one of the following ways:
    * call it directly
    * use the `handler()` wrapper for AWS Lambda
    * use the `gcpservice()` wrapper for GCP

* Use one of tle method available [Availabs](#available-methods)
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

| Variable | Type |   | Description |
|----------|------|---|-------------|
| `date`   | String | *Optional* | Date for balance (current date, if skipped) |

#### Response

```json
{
   "status":true,
   "api":{
      "version":"string",
      "title":"string"
   },
   "message":"string",
   "data":{
      "available_balance":0,
      "reservations":0,
      "real_balance":0
   },
   "duration":0
}
```