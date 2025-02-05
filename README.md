# NSE Data Project

## Overview
This project provides a set of APIs to interact with the National Stock Exchange (NSE) data, allowing users to access various market and equity information.

## Available APIs
### Market APIs
- **marketStatus**: Retrieve the current market status. [Source](./src/api/market-status/market-status.ts)  
  - **Route URL**: `/marketStatus`  
  - **HTTP Method**: GET  

- **searchSymbol**: Search for a specific stock symbol. [Source](./src/api/search-symbol/search-symbol.ts)  
  - **Route URL**: `/search/autocomplete?q=`  
  - **HTTP Method**: GET  

### Equity APIs
- **equityHistory**: Get historical data for equities. [Source](./src/api/equity-history/equity-history.ts)  
  - **Route URL**: `/historical/cm/equity?series=["EQ"]&symbol=`  
  - **HTTP Method**: GET  

- **equityInfo**: Retrieve detailed information about a specific equity. [Source](./src/api/equity-info/equity-info.ts)  
  - **Route URL**: `/equity-meta-info?symbol=`  
  - **HTTP Method**: GET  

- **equityOptionChain**: Access the options chain for equities. [Source](./src/api/equity-option-chain/equity-option-chain.ts)  
  - **Route URL**: `/option-chain-equities?symbol=`  
  - **HTTP Method**: GET  

- **equityQuote**: Get the latest quote for a specific equity. [Source](./src/api/equity-quote/equity-quote.ts)  
  - **Route URL**: `/quote-equity?symbol=`  
  - **HTTP Method**: GET  

### Index APIs
- **indexDetails**: Retrieve details about a specific index. [Source](./src/api/index-details/index-details.ts)  
  - **Route URL**: `/allIndices`  
  - **HTTP Method**: GET  

- **indexInfo**: Get information about the index. [Source](./src/api/index-info/index-info.ts)  
  - **Route URL**: `/equity-stockIndices?index=`  
  - **HTTP Method**: GET  

- **indexList**: Access a list of indices. [Source](./src/api/index-list/index-list.ts)  
  - **Route URL**: `/index-names`  
  - **HTTP Method**: GET  

- **indexOptionChain**: Retrieve the options chain for indices. [Source](./src/api/index-option-chain/index-option-chain.ts)  
  - **Route URL**: `/option-chain-indices?symbol=`  
  - **HTTP Method**: GET  

### Installation


Install using 'npm'


```shell
npm install nse-data
```

or

Install using 'yarn'



```shell
yarn add nse-data
```

### Usage

## Sample Code

```javascript
// ES5 Syntax using var and function declaration
const nseDataES5 = require('nse-data');

function fetchMarketStatusES5() {
    // Access marketStatus correctly through nseData
    nseDataES5.nseData.marketStatus(function(err, status) {
        if (err) {
            console.error('Error fetching market status (ES5):', err);
        } else {
            console.log('Market Status (ES5):', status);
        }
    });
}

fetchMarketStatusES5();

// CommonJS Syntax using require
const nseDataCJS = require('nse-data');

const fetchMarketStatusCJS = () => {
    nseDataCJS.nseData.marketStatus().then(status => {
        console.log('Market Status (CJS):', status);
    }).catch(err => {
        console.error('Error fetching market status (CJS):', err);
    });
};

fetchMarketStatusCJS();

// Anonymous Function using IIFE
(async () => {
    try {
        const status = await nseDataCJS.nseData.marketStatus();
        console.log('Market Status (Anonymous Function):', status);
    } catch (error) {
        console.error('Error fetching market status (Anonymous Function):', error);
    }
})();

// Top-Level Await (ES Module Context)
// Note: This will only work if the file is treated as an ES Module
import {nseData} from 'nse-data';
const status = await nseData.marketStatus();
console.log('Market Status (Top-Level Await):', status);
```

## Sample Output

```json
{
  "marketState": [
    {
      "market": "Capital Market",
      "marketStatus": "Closed",
      "tradeDate": "04-Feb-2025 15:30",
      "index": "NIFTY 50",
      "last": 23739.25,
      "variation": 378.2000000000007,
      "percentChange": 1.62,
      "marketStatusMessage": "Normal Market has Closed"
    },
    {
      "market": "Currency",
      "marketStatus": "Closed",
      "tradeDate": "04-Feb-2025",
      "index": "",
      "last": "",
      "variation": "",
      "percentChange": "",
      "marketStatusMessage": "Market is Closed"
    },
    {
      "market": "Commodity",
      "marketStatus": "Open",
      "tradeDate": "04-Feb-2025",
      "index": "",
      "last": "",
      "variation": "",
      "percentChange": "",
      "marketStatusMessage": "Market is Open"
    },
    {
      "market": "Debt",
      "marketStatus": "Closed",
      "tradeDate": "04-Feb-2025",
      "index": "",
      "last": "",
      "variation": "",
      "percentChange": "",
      "marketStatusMessage": "Market is Closed"
    },
    {
      "market": "currencyfuture",
      "marketStatus": "Closed",
      "tradeDate": "04-Feb-2025",
      "index": "",
      "last": "87.2475",
      "variation": "",
      "percentChange": "",
      "marketStatusMessage": "Market is Closed",
      "expiryDate": "25-Feb-2025",
      "underlying": "USDINR",
      "updated_time": "04-Feb-2025 17:00",
      "tradeDateFormatted": "04-Feb-2025 17:00",
      "slickclass": "slick-item"
    }
  ],
  "marketcap": {
    "timeStamp": "04-Feb-2025",
    "marketCapinTRDollars": 4.85,
    "marketCapinLACCRRupees": 422.59145349194324,
    "marketCapinCRRupees": 42259145.35,
    "marketCapinCRRupeesFormatted": "42,259,145.35",
    "marketCapinLACCRRupeesFormatted": "422.59",
    "underlying": "Market Cap"
  },
  "indicativenifty50": {
    "dateTime": "04-Feb-2025 15:30",
    "indicativeTime": null,
    "indexName": "NIFTY 50",
    "indexLast": null,
    "indexPercChange": null,
    "indexTimeVal": null,
    "closingValue": 23739.25,
    "finalClosingValue": 23739.25,
    "change": 378.16,
    "perChange": 1.62,
    "status": "CLOSE"
  },
  "giftnifty": {
    "INSTRUMENTTYPE": "FUTIDX",
    "SYMBOL": "NIFTY",
    "EXPIRYDATE": "27-Feb-2025",
    "OPTIONTYPE": "-",
    "STRIKEPRICE": "-",
    "LASTPRICE": 23781,
    "DAYCHANGE": "8.50",
    "PERCHANGE": "            0.04",
    "CONTRACTSTRADED": 73138,
    "TIMESTMP": "04-Feb-2025 19:43",
    "id": "4/NIFTYFUTIDX27-Feb-2025--"
  }
}
