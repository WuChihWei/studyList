import { Router } from 'express';
import express from 'express';
// import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
}

// 代替使用类型声明（如果需要类型但不实际使用 Stripe）
type Stripe = any;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-01-27.acacia'
});

const router = Router();

// Stripe webhook handling
router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'];

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.error('STRIPE_WEBHOOK_SECRET is not defined');
      return res.status(500).send('Webhook secret not configured');
    }

    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig!,
        process.env.STRIPE_WEBHOOK_SECRET
      );

      // Handle different event types
      switch (event.type) {
        case 'checkout.session.completed':
          const session = event.data.object as Stripe.Checkout.Session;
          console.log(`Payment successful for: ${session.customer_email}`);
          // Add your payment success logic here
          break;
          
        case 'payment_intent.succeeded':
          const paymentIntent = event.data.object as Stripe.PaymentIntent;
          console.log(`PaymentIntent success: ${paymentIntent.id}`);
          break;

        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      res.json({ received: true });
    } catch (error) {
      if (error instanceof Error) {
        console.error('Webhook Error:', error.message);
        return res.status(400).send(`Webhook Error: ${error.message}`);
      }
      console.error('Unknown webhook error');
      return res.status(400).send('Webhook Error: Unknown error occurred');
    }
  }
);

export default router;