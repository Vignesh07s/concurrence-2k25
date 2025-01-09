const puppeteer = require('puppeteer');
const fs = require('fs');

async function createHtmlToPdf() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const content = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .header { background-color: #4a90e2; color: white; padding: 10px; font-size: 24px; }
          .section { margin-top: 20px; }
          .details-table { width: 100%; border-collapse: collapse; }
          .details-table td { padding: 8px; border: 1px solid #ddd; }
          .footer { margin-top: 30px; font-size: 16px; color: #555; }
        </style>
      </head>
      <body>
        <div class="header">Payment Receipt</div>
        <div class="section">
          <table class="details-table">
            <tr><td><b>Receipt Number:</b></td><td>REC-2025-0001</td></tr>
            <tr><td><b>Date:</b></td><td>January 5, 2025</td></tr>
            <tr><td><b>Payer Name:</b></td><td>John Doe</td></tr>
            <tr><td><b>Payment Amount:</b></td><td>$150.00</td></tr>
            <tr><td><b>Payment Method:</b></td><td>Credit Card</td></tr>
            <tr><td><b>Transaction ID:</b></td><td>TXN123456789</td></tr>
          </table>
        </div>
        <div class="footer">Thank you for your payment!</div>
      </body>
    </html>
  `;

  await page.setContent(content);
  await page.pdf({ path: 'puppeteer_payment_receipt.pdf', format: 'A4' });
  await browser.close();
  console.log('PDF created with Puppeteer!');
}

createHtmlToPdf().catch(console.error);
