import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2024-12-18.acacia",
});

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json({ plan: null }, { status: 200 });
  }

  try {
    // Find the Stripe customer by email
    const customers = await stripe.customers.list({ email, limit: 1 });

    if (customers.data.length === 0) {
      return NextResponse.json({ plan: null });
    }

    const customerId = customers.data[0].id;

    // Get active subscriptions for this customer
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 1,
      expand: ["data.items.data.price.product"],
    });

    // Also check trialing
    if (subscriptions.data.length === 0) {
      const trialing = await stripe.subscriptions.list({
        customer: customerId,
        status: "trialing",
        limit: 1,
        expand: ["data.items.data.price.product"],
      });

      if (trialing.data.length === 0) {
        return NextResponse.json({ plan: null });
      }

      const product = trialing.data[0].items.data[0].price
        .product as Stripe.Product;
      return NextResponse.json({
        plan: product.name.toLowerCase().replace(/\s+/g, "-"),
        status: "trialing",
      });
    }

    const product = subscriptions.data[0].items.data[0].price
      .product as Stripe.Product;

    return NextResponse.json({
      plan: product.name.toLowerCase().replace(/\s+/g, "-"),
      status: "active",
    });
  } catch (err) {
    console.error("Subscription lookup error:", err);
    return NextResponse.json({ plan: null });
  }
}
