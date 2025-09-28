(function () {
	if (window.__foa_injected) return;
	window.__foa_injected = true;

	function createOverlayMarkup() {
		return (
			'<button id="foa-open-order" style="position:fixed;right:16px;bottom:16px;z-index:2147483000;background:#667eea;color:#fff;border:none;border-radius:24px;padding:12px 16px;font-size:14px;box-shadow:0 6px 18px rgba(0,0,0,.15);cursor:pointer">New Order</button>' +
			'<div id="foa-overlay" style="position:fixed;inset:0;z-index:2147483001;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.35)">' +
				'<div id="foa-modal" style="width:min(980px,96vw);max-height:92vh;background:#fff;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,.25);overflow:hidden;display:flex;flex-direction:column">' +
					'<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:#667eea;color:#fff">' +
						'<div style="font-weight:600">Fruit & Vegetable Order</div>' +
						'<button id="foa-close" style="background:transparent;border:none;color:#fff;font-size:18px;cursor:pointer">✕</button>' +
					'</div>' +
					'<div id="foa-tabs" style="display:flex;border-bottom:1px solid #eee">' +
						'<button data-tab="client" class="foa-tab foa-active" style="flex:1;padding:10px 12px;background:#fff;border:none;border-bottom:2px solid #667eea;color:#333;cursor:pointer">Client</button>' +
						'<button data-tab="products" class="foa-tab" style="flex:1;padding:10px 12px;background:#fff;border:none;border-bottom:2px solid transparent;color:#666;cursor:not-allowed;opacity:.6">Products</button>' +
						'<button data-tab="invoice" class="foa-tab" style="flex:1;padding:10px 12px;background:#fff;border:none;border-bottom:2px solid transparent;color:#666;cursor:not-allowed;opacity:.6">Invoice</button>' +
					'</div>' +
					'<div id="foa-content" style="padding:16px;overflow:auto;flex:1">' +
						'<section data-panel="client">' +
							'<form id="foa-client-form" style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px">' +
								'<div style="display:flex;flex-direction:column;gap:6px">' +
									'<label style="font-size:12px;color:#555">Client Name</label>' +
									'<input id="foa-client-name" type="text" required placeholder="e.g. John Doe" style="padding:10px 12px;border:1px solid #ddd;border-radius:8px">' +
								'</div>' +
								'<div style="display:flex;flex-direction:column;gap:6px">' +
									'<label style="font-size:12px;color:#555">Phone</label>' +
									'<input id="foa-client-phone" type="tel" placeholder="e.g. +1 555 123 4567" style="padding:10px 12px;border:1px solid #ddd;border-radius:8px">' +
								'</div>' +
								'<div style="grid-column:1/-1;display:flex;flex-direction:column;gap:6px">' +
									'<label style="font-size:12px;color:#555">Address</label>' +
									'<input id="foa-client-address" type="text" placeholder="Street, City" style="padding:10px 12px;border:1px solid #ddd;border-radius:8px">' +
								'</div>' +
								'<div style="grid-column:1/-1;display:flex;gap:8px;justify-content:flex-end">' +
									'<button type="reset" style="background:#f3f4f6;border:1px solid #e5e7eb;color:#374151;border-radius:8px;padding:10px 14px;cursor:pointer">Clear</button>' +
									'<button type="submit" style="background:#667eea;color:#fff;border:none;border-radius:8px;padding:10px 14px;cursor:pointer">Save Client</button>' +
								'</div>' +
							'</form>' +
						'</section>' +
						'<section data-panel="products" style="display:none">' +
							'<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">' +
								'<div style="border:1px solid #eee;border-radius:10px;padding:12px">' +
									'<div style="font-weight:600;margin-bottom:8px">Add Item</div>' +
									'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">' +
										'<select id="foa-item-type" style="padding:10px 12px;border:1px solid #ddd;border-radius:8px">' +
											'<option value="fruit">Fruit</option>' +
											'<option value="vegetable">Vegetable</option>' +
										'</select>' +
										'<input id="foa-item-name" placeholder="e.g. Apple" style="padding:10px 12px;border:1px solid #ddd;border-radius:8px">' +
										'<input id="foa-item-qty" type="number" min="1" step="1" value="1" style="padding:10px 12px;border:1px solid #ddd;border-radius:8px">' +
										'<input id="foa-item-price" type="number" min="0" step="0.01" placeholder="Price" style="padding:10px 12px;border:1px solid #ddd;border-radius:8px">' +
									'</div>' +
									'<div style="display:flex;justify-content:flex-end;margin-top:10px">' +
										'<button id="foa-add-item" style="background:#10b981;color:#fff;border:none;border-radius:8px;padding:10px 14px;cursor:pointer">Add to List</button>' +
									'</div>' +
								'</div>' +
								'<div style="border:1px solid #eee;border-radius:10px;padding:12px;display:flex;flex-direction:column">' +
									'<div style="font-weight:600;margin-bottom:8px">Current Items</div>' +
									'<div id="foa-items-empty" style="color:#6b7280">No items added yet.</div>' +
									'<div id="foa-items" style="display:flex;flex-direction:column;gap:8px"></div>' +
									'<div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px">' +
										'<div style="color:#374151;font-weight:600">Total: <span id="foa-total">0.00</span></div>' +
										'<div style="display:flex;gap:8px">' +
											'<button id="foa-clear-items" style="background:#f3f4f6;border:1px solid #e5e7eb;color:#374151;border-radius:8px;padding:8px 12px;cursor:pointer">Clear</button>' +
											'<button id="foa-go-invoice" style="background:#667eea;color:#fff;border:none;border-radius:8px;padding:8px 12px;cursor:pointer">Go to Invoice</button>' +
										'</div>' +
									'</div>' +
								'</div>' +
							'</section>' +
						'<section data-panel="invoice" style="display:none">' +
							'<div id="foa-invoice" style="border:1px solid #e5e7eb;border-radius:10px;padding:16px">' +
								'<div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:1px dashed #e5e7eb;padding-bottom:10px;margin-bottom:12px">' +
									'<div>' +
										'<div style="font-weight:700;color:#111827">Facture</div>' +
										'<div style="font-size:12px;color:#6b7280">Date: <span id="foa-invoice-date"></span></div>' +
									'</div>' +
									'<div style="text-align:right">' +
										'<div style="font-weight:600" id="foa-invoice-client"></div>' +
										'<div id="foa-invoice-phone" style="font-size:12px;color:#6b7280"></div>' +
										'<div id="foa-invoice-address" style="font-size:12px;color:#6b7280"></div>' +
									'</div>' +
								'</div>' +
								'<table style="width:100%;border-collapse:collapse;font-size:14px">' +
									'<thead>' +
										'<tr style="background:#f9fafb;text-align:left">' +
											'<th style="padding:8px;border-bottom:1px solid #e5e7eb">Type</th>' +
											'<th style="padding:8px;border-bottom:1px solid #e5e7eb">Item</th>' +
											'<th style="padding:8px;border-bottom:1px solid #e5e7eb">Qty</th>' +
											'<th style="padding:8px;border-bottom:1px solid #e5e7eb">Price</th>' +
											'<th style="padding:8px;border-bottom:1px solid #e5e7eb;text-align:right">Subtotal</th>' +
										'</tr>' +
									'</thead>' +
									'<tbody id="foa-invoice-rows"></tbody>' +
									'<tfoot>' +
										'<tr>' +
											'<td colspan="4" style="padding:8px;border-top:1px solid #e5e7eb;text-align:right;font-weight:600">Total</td>' +
											'<td style="padding:8px;border-top:1px solid #e5e7eb;text-align:right;font-weight:700" id="foa-invoice-total">0.00</td>' +
										'</tr>' +
									'</tfoot>' +
								'</table>' +
							'</div>' +
							'<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px">' +
								'<button id="foa-back-products" style="background:#f3f4f6;border:1px solid #e5e7eb;color:#374151;border-radius:8px;padding:8px 12px;cursor:pointer">Back</button>' +
								'<button id="foa-export-json" style="background:#0ea5e9;color:#fff;border:none;border-radius:8px;padding:8px 12px;cursor:pointer">Export JSON</button>' +
								'<button id="foa-print" style="background:#111827;color:#fff;border:none;border-radius:8px;padding:8px 12px;cursor:pointer">Print</button>' +
							'</div>' +
						'</section>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<style id="foa-print-style">@media print{body>*:not(#foa-overlay){display:none!important}#foa-overlay{display:block!important;background:#fff!important}#foa-modal{box-shadow:none!important;border:none!important}#foa-tabs,#foa-close,#foa-back-products,#foa-export-json,#foa-open-order{display:none!important}#foa-content{padding:0!important}}.foa-active{color:#111827!important;border-bottom-color:#667eea!important;opacity:1!important}.foa-item{display:grid;grid-template-columns:1.2fr 1fr .8fr 1fr auto;gap:8px;align-items:center;border:1px solid #f1f5f9;padding:8px;border-radius:8px}.foa-badge{background:#eef2ff;color:#4f46e5;border-radius:999px;padding:2px 8px;font-size:12px}</style>'
		);
	}

	function $(id) { return document.getElementById(id); }

	function fmt(n) { return Number(n || 0).toFixed(2); }

	var state = { clientSaved: false, client: { name: '', phone: '', address: '' }, items: [] };

	function show(tab) {
		var tabs = Array.prototype.slice.call(document.querySelectorAll('.foa-tab'));
		var panels = Array.prototype.slice.call(document.querySelectorAll('[data-panel]'));
		tabs.forEach(function (b) {
			var isActive = b.getAttribute('data-tab') === tab;
			b.classList.toggle('foa-active', isActive);
			var isGated = (b.dataset.tab !== 'client' && !state.clientSaved);
			b.style.cursor = isGated ? 'not-allowed' : 'pointer';
			if (b.dataset.tab !== 'client') b.style.opacity = isGated ? '.6' : '1';
		});
		panels.forEach(function (p) {
			p.style.display = (p.getAttribute('data-panel') === tab) ? 'block' : 'none';
		});
	}

	function updateTotals() {
		var total = state.items.reduce(function (sum, it) { return sum + (it.qty * it.price); }, 0);
		$('foa-total').textContent = fmt(total);
	}

	function renderItems() {
		var wrap = $('foa-items');
		var empty = $('foa-items-empty');
		wrap.innerHTML = '';
		if (!state.items.length) {
			empty.style.display = 'block';
			return;
		} else {
			empty.style.display = 'none';
		}
		state.items.forEach(function (it, idx) {
			var row = document.createElement('div');
			row.className = 'foa-item';
			row.innerHTML = (
				'<span class="foa-badge">' + (it.type === 'fruit' ? 'Fruit' : 'Vegetable') + '</span>' +
				'<span>' + it.name + '</span>' +
				'<span>' + it.qty + '</span>' +
				'<span>' + fmt(it.price) + '</span>' +
				'<button data-rm="' + idx + '" style="background:#fee2e2;color:#b91c1c;border:1px solid #fecaca;border-radius:8px;padding:6px 10px;cursor:pointer">Remove</button>'
			);
			wrap.appendChild(row);
		});
		wrap.querySelectorAll('[data-rm]').forEach(function (btn) {
			btn.addEventListener('click', function () {
				var idxToRemove = Number(btn.getAttribute('data-rm'));
				state.items.splice(idxToRemove, 1);
				renderItems();
				updateTotals();
			});
		});
		updateTotals();
	}

	function goInvoice() {
		$('foa-invoice-date').textContent = new Date().toLocaleString();
		$('foa-invoice-client').textContent = state.client.name || '';
		$('foa-invoice-phone').textContent = state.client.phone || '';
		$('foa-invoice-address').textContent = state.client.address || '';
		var tbody = $('foa-invoice-rows');
		tbody.innerHTML = '';
		var total = 0;
		state.items.forEach(function (it) {
			var tr = document.createElement('tr');
			var sub = it.qty * it.price;
			total += sub;
			tr.innerHTML = (
				'<td style="padding:8px;border-bottom:1px solid #f3f4f6">' + (it.type === 'fruit' ? 'Fruit' : 'Vegetable') + '</td>' +
				'<td style="padding:8px;border-bottom:1px solid #f3f4f6">' + it.name + '</td>' +
				'<td style="padding:8px;border-bottom:1px solid #f3f4f6">' + it.qty + '</td>' +
				'<td style="padding:8px;border-bottom:1px solid #f3f4f6">' + fmt(it.price) + '</td>' +
				'<td style="padding:8px;border-bottom:1px solid #f3f4f6;text-align:right">' + fmt(sub) + '</td>'
			);
			tbody.appendChild(tr);
		});
		$('foa-invoice-total').textContent = fmt(total);
		show('invoice');
	}

	function enableTabs() {
		var prod = document.querySelector('[data-tab="products"]');
		var inv = document.querySelector('[data-tab="invoice"]');
		if (prod) { prod.style.cursor = 'pointer'; prod.style.opacity = '1'; }
		if (inv) { inv.style.cursor = 'pointer'; inv.style.opacity = '1'; }
	}

	function saveToLocal() {
		try { localStorage.setItem('foa_last_order', JSON.stringify(state)); } catch (_) {}
	}
	function loadFromLocal() {
		try {
			var raw = localStorage.getItem('foa_last_order');
			if (!raw) return;
			var prev = JSON.parse(raw);
			if (prev && prev.client) {
				state = prev;
			}
		} catch (_) {}
	}

	function wireEvents() {
		document.body.insertAdjacentHTML('beforeend', createOverlayMarkup());
		var overlay = $('foa-overlay');
		var openBtn = $('foa-open-order');
		var closeBtn = $('foa-close');

		// Tabs
		Array.prototype.slice.call(document.querySelectorAll('.foa-tab')).forEach(function (btn) {
			btn.addEventListener('click', function () {
				var t = btn.getAttribute('data-tab');
				if ((t === 'products' || t === 'invoice') && !state.clientSaved) return;
				show(t);
			});
		});

		// Client form
		$('foa-client-form').addEventListener('submit', function (ev) {
			ev.preventDefault();
			var name = $('foa-client-name').value.trim();
			if (!name) { alert('Client name is required'); return; }
			state.client.name = name;
			state.client.phone = $('foa-client-phone').value.trim();
			state.client.address = $('foa-client-address').value.trim();
			state.clientSaved = true;
			enableTabs();
			saveToLocal();
			show('products');
		});

		// Product add/clear
		$('foa-add-item').addEventListener('click', function () {
			var type = $('foa-item-type').value;
			var name = $('foa-item-name').value.trim();
			var qty = Number($('foa-item-qty').value);
			var price = Number($('foa-item-price').value);
			if (!name || qty <= 0 || price < 0) { alert('Please provide valid item, qty, and price'); return; }
			state.items.push({ type: type, name: name, qty: qty, price: price });
			$('foa-item-name').value = '';
			$('foa-item-qty').value = '1';
			$('foa-item-price').value = '';
			renderItems();
			saveToLocal();
		});
		$('foa-clear-items').addEventListener('click', function () {
			if (confirm('Clear all items?')) {
				state.items = [];
				renderItems();
				saveToLocal();
			}
		});

		// Invoice
		$('foa-go-invoice').addEventListener('click', function () { goInvoice(); saveToLocal(); });
		$('foa-back-products').addEventListener('click', function () { show('products'); });
		$('foa-print').addEventListener('click', function () { window.print(); });
		$('foa-export-json').addEventListener('click', function () {
			var data = {
				client: state.client,
				items: state.items,
				date: new Date().toISOString(),
				total: state.items.reduce(function (s, i) { return s + i.qty * i.price; }, 0)
			};
			var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
			var url = URL.createObjectURL(blob);
			var a = document.createElement('a');
			a.href = url;
			a.download = 'order.json';
			document.body.appendChild(a);
			a.click();
			a.remove();
			setTimeout(function () { URL.revokeObjectURL(url); }, 0);
		});

		// Open/close
		openBtn.addEventListener('click', function () { overlay.style.display = 'flex'; show('client'); });
		closeBtn.addEventListener('click', function () { overlay.style.display = 'none'; });
		document.addEventListener('keydown', function (e) { if (e.key === 'Escape') overlay.style.display = 'none'; });

		// Restore
		loadFromLocal();
		if (state.clientSaved) {
			enableTabs();
			renderItems();
			updateTotals();
		}
	}

	// Boot when DOM ready enough
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', wireEvents);
	} else {
		wireEvents();
	}
})();

