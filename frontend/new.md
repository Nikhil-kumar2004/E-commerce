Stripe always expects amounts in the smallest currency unit
✅ For USD: it must be in cents.
✅ For INR: it must be in paise.
✅ For EUR: it must be in cents.

👉 Stripe does this to avoid floating‑point errors with money.

Stripe needs a very specific format for each product you’re charging the customer for.

When creating a Stripe Checkout Session (e.g., using stripe.checkout.sessions.create()), you must tell Stripe exactly:

✅ What products are being purchased
✅ Their name, price, and quantity
✅ Currency
✅ Any additional charges (like delivery)