document.addEventListener('DOMContentLoaded', function () {
    // Fetch invoice data from API
    fetch('/api/invoice')
        .then(resp => resp.json())
        .then(data => {
            // Display customer information
            document.getElementById('customer-info').innerHTML =
                `<p><strong>Customer:</strong> ${data.customerName}</p>
                 <p><strong>Invoice ID:</strong> ${data.invoiceID}</p>`;

            // Display invoice items
            let html = '';
            data.items.forEach(item => {
                html += `<tr>
                    <td>${item.name}</td>
                    <td>$${item.price.toFixed(2)}</td>
                </tr>`;
            });
            document.getElementById('items-list').innerHTML = html;

            // Display total
            document.getElementById('total').innerHTML =
                `<h2>Total: $${data.total.toFixed(2)}</h2>`;
        })
        .catch(error => {
            console.error('Error fetching invoice:', error);
            document.getElementById('invoice-container').innerHTML =
                `<p class="error">Error loading invoice. Please check if the API is running.</p>`;
        });
});
