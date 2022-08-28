"use strict";

/**
 * This example shows how to use the Alpaca Data V2 websocket to subscribe to events.
 * The socket is available under the `data_steam_v2` property on an Alpaca instance.
 * There are separate functions for subscribing (and unsubscribing) to trades, quotes and bars as seen below.
 */

const Alpaca = require("@alpacahq/alpaca-trade-api");
const API_KEY = "PK1T5914JYUM0QIOPSB";
const API_SECRET = "hxFq9ZgUPfWDk1YFZH87MVkVRy98xKKElYfwQHAB";

class DataStream {
  constructor({ API_KEY, API_SECRET, feed }) {
    this.alpaca = new Alpaca({
      keyId: API_KEY,
      API_SECRET,
      feed,
    });

    const socket = this.alpaca.data_stream_v2;

    socket.onConnect(function () {
      console.log("Connected");
      socket.subscribeForQuotes(["AAPL"]);
      socket.subscribeForTrades(["FB"]);
      socket.subscribeForBars(["SPY"]);
      socket.subscribeForStatuses(["*"]);
    });

    socket.onError((err) => {
      console.log(err);
    });

    socket.onStockTrade((trade) => {
      console.log(trade);
    });

    socket.onStockQuote((quote) => {
      console.log(quote);
    });

    socket.onStockBar((bar) => {
      console.log(bar);
    });

    socket.onStatuses((s) => {
      console.log(s);
    });

    socket.onStateChange((state) => {
      console.log(state);
    });

    socket.onDisconnect(() => {
      console.log("Disconnected");
    });

    socket.connect();

    // unsubscribe from FB after a second
    setTimeout(() => {
      socket.unsubscribeFromTrades(["FB"]);
    }, 1000);
  }
}

let stream = new DataStream({
  apiKey: API_KEY,
  secretKey: API_SECRET,
  feed: "sip",
  paper: true,
});
