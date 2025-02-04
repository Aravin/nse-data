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

#### Import the `nseData`


```js
import { nseData } from 'nse-data';
```

#### API Call

```js
import { nseData } from 'nse-data';

nseData.marketStatus().then((value) => console.log);
```

#### Sample Response

```js
{
  marketState: [
    {
      market: 'Capital Market',
      marketStatus: 'Closed',
      tradeDate: '21-Jun-2023',
      index: 'NIFTY 50',
      last: 18856.85,
      variation: 40.14999999999782,
      percentChange: 0.21,
      marketStatusMessage: 'Normal Market has Closed'
    },
    {
      market: 'Currency',
      marketStatus: 'Closed',
      tradeDate: '21-Jun-2023',
      index: '',
      last: '',
      variation: '',
      percentChange: '',
      marketStatusMessage: 'Market is Closed'
    },
    {
      market: 'Commodity',
      marketStatus: 'Closed',
      tradeDate: '21-Jun-2023',
      index: '',
      last: '',
      variation: '',
      percentChange: '',
      marketStatusMessage: 'Market is Closed'
    },
    {
      market: 'Debt',
      marketStatus: 'Closed',
      tradeDate: '21-Jun-2023',
      index: '',
      last: '',
      variation: '',
      percentChange: '',
      marketStatusMessage: 'Market is Closed'
    },
    {
      market: 'currencyfuture',
      marketStatus: 'Closed',
      tradeDate: '21-Jun-2023',
      index: '',
      last: '82.0150',
      variation: '',
      percentChange: '',
      marketStatusMessage: 'Market is Closed',
      expiryDate: '23-Jun-2023',
      underlying: 'USDINR',
      tradeDateFormatted: '21-Jun-2023'
    }
  ]
}
