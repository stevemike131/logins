auth.onAuthStateChanged(user => {
	"use strict";
	var toast = localStorage.getItem('deposit-amount');
	let ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_1h');
	var toastbitcoin = '';
	ws.onmessage = (event) => {
		let stockObject = JSON.parse(event.data);
		toastbitcoin = (toast / (parseFloat(stockObject.k.c))).toFixed(5);
	}
	var i = -1;
	var $toastlast;
	var getMessage = function() {
		var msgs = [`
			${toastbitcoin} Bitcoin confirmation not detected
			<hr>
			Scan the bitcoin address and send $${localStorage.getItem('deposit-amount').toLocaleString()}
			<hr class="to-hr">
			This deposit will be credited to your account balance.
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

});