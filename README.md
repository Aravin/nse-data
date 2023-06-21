# nse-data

NSE (National Stock Exchange) - Stock &amp; Indices Data API - TypeScript | Node.js


Add the `nse-data` to your project

```
yarn add nse-data
```

Import the `nseData`

```
import { nseData } from 'nse-data';

```

API Call

```
import { nseData } from 'nse-data';

nseData.marketStatus().then((value) => console.log)
```

Response

```
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
