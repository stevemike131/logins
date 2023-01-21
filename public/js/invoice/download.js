"use strict";
var toast = 50;
let ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_1h');
var toastbitcoin = '';
var receivedFunds = parseInt(localStorage.getItem('received-funds'));
var receivedFund = receivedFunds.toLocaleString();
ws.onmessage = (event) => {
	let stockObject = JSON.parse(event.data);
	toastbitcoin = (toast / (parseFloat(stockObject.k.c))).toFixed(5);
}
var i = -1;
var $toastlast;
var getMessage = function() {
	var msgs = [`
		${toastbitcoin} Bitcoin payment not detected
		<hr>
		Send $50 to complete the download
		<hr class="to-hr">
		Cost of getting bank logs is currently high, and you have paid a total of 
		$${receivedFund}
	`];
	i++;
	if (i === msgs.length) {
		i = 0;
	}
	return msgs[i];
};

var toastbut = document.getElementById('anon-check');


$(toastbut).click(function() {
	var shortCutFunction = 'success';
	var msg = '';
	var title = '';
	toastr.options = {
		closeButton: true,
		debug: false,
		newestOnTop: true,
		progressBar: true,
		positionClass: 'toast-top-full-width',
		preventDuplicates: true,
		onclick: null
	};
	if (!msg) {
		msg = getMessage();
	}
	var $toast = toastr[shortCutFunction](msg, title);
	$toastlast = $toast;
});
