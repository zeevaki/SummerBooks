"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineCheck } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useAppSelector } from "@/store/hooks";
import styles from "./page.module.css";

const PLANS = {
  monthly: {
    label: "Monthly",
    price: "$9.99",
    period: "/ month",
    priceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID ?? "",
    trial: false,
    description: "Billed monthly. Cancel anytime.",
  },
  yearly: {
    label: "Yearly",
    price: "$99.99",
    period: "/ year",
    priceId: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID ?? "",
    trial: true,
    description: "Includes 7-day free trial. Cancel anytime.",
  },
};

const FEATURES = [
  "Unlimited access to all summaries",
  "Read and listen to all books",
  "New titles added every week",
  "Offline listening",
  "Ad-free experience",
  "High-quality audio narration",
  "Cancel anytime",
];

const FAQ = [
  {
    question: "How does the free trial work?",
    answer:
      "The 7-day free trial is only available on the yearly plan. You will not be charged during the trial period. After 7 days, your subscription begins and you are billed annually.",
  },
  {
    question: "Can I switch between plans?",
    answer:
      "Yes! You can switch between monthly and yearly plans at any time from your account settings. Changes take effect at the start of your next billing cycle.",
  },
  {
    question: "What is Summarist Premium?",
    answer:
      "Summarist Premium gives you unlimited access to all book summaries in text and audio format, new titles every week, offline listening, and an ad-free experience.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "You can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period.",
  },
  {
    question: "What happens after my free trial?",
    answer:
      "After your 7-day free trial ends, your yearly subscription starts automatically and you will be charged $99.99. You can cancel before the trial ends to avoid being charged.",
  },
];

export default function ChoosePlanContent() {
  const router = useRouter();
  const { uid, email } = useAppSelector((s) => s.user);
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("yearly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubscribe() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: PLANS[selectedPlan].priceId,
          uid,
          email,
          trial: PLANS[selectedPlan].trial,
        }),
      });
      const data = await res.json();
      if (data.url) {
        router.push(data.url);
      } else {
        alert("Could not start checkout. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const plan = PLANS[selectedPlan];

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Get unlimited access to many amazing books to read
        </h1>
        <p className={styles.heroSubtitle}>
          Turn ordinary moments into amazing learning opportunities
        </p>
      </section>

      {/* Features + Plan card */}
      <section className={styles.plansSection}>
        <div className={styles.features}>
          <h2 className={styles.featuresTitle}>What you get with Summarist Premium</h2>
          <ul className={styles.featureList}>
            {FEATURES.map((f) => (
              <li key={f} className={styles.featureItem}>
                <AiOutlineCheck className={styles.checkIcon} />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.planCard}>
          {/* Plan toggle */}
          <div className={styles.toggle}>
            {(["monthly", "yearly"] as const).map((key) => (
              <button
                key={key}
                className={`${styles.toggleBtn} ${selectedPlan === key ? styles.toggleActive : ""}`}
                onClick={() => setSelectedPlan(key)}
              >
                {PLANS[key].label}
                {key === "yearly" && (
                  <span className={styles.trialBadge}>7-day free trial</span>
                )}
              </button>
            ))}
          </div>

          {/* Price */}
          <div className={styles.priceBox}>
            {plan.trial && (
              <p className={styles.trialNote}>Start your 7-day free trial</p>
            )}
            <div className={styles.priceRow}>
              <span className={styles.price}>{plan.price}</span>
              <span className={styles.period}>{plan.period}</span>
            </div>
            <p className={styles.priceDesc}>{plan.description}</p>
          </div>

          <button
            className={styles.subscribeBtn}
            onClick={handleSubscribe}
            disabled={loading}
          >
            {loading ? "Loading..." : plan.trial ? "Start free trial" : "Get started"}
          </button>

          <p className={styles.cancelNote}>
            <AiOutlineCheck className={styles.smallCheck} />
            Cancel anytime. No commitment required.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className={styles.faqSection}>
        <h2 className={styles.faqTitle}>Frequently asked questions</h2>
        <div className={styles.accordion}>
          {FAQ.map((item, i) => (
            <div key={i} className={styles.accordionItem}>
              <button
                className={styles.accordionHeader}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span>{item.question}</span>
                <BsChevronDown
                  className={`${styles.chevron} ${openFaq === i ? styles.chevronOpen : ""}`}
                />
              </button>
              {openFaq === i && (
                <div className={styles.accordionBody}>{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className={styles.bottomCta}>
        <h2 className={styles.ctaTitle}>Get started with Summarist Premium</h2>
        <button
          className={styles.subscribeBtn}
          onClick={handleSubscribe}
          disabled={loading}
        >
          {loading ? "Loading..." : plan.trial ? "Start free trial" : "Get started"}
        </button>
      </section>
    </div>
  );
}
