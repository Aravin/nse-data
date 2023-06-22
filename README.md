# nse-data - NSE (National Stock Exchange) - Stock &amp; Indices Data API

This package will help to get realtime & historical data from NSE

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

```

### All APIs

1. marketStatus
2. searchSymbol
3. equityHistory
4. equityInfo
5. equityOptionChain
6. equityQuote
7. indexDetails
8. indexInfo
9. indexList
10. indexOptionChain
