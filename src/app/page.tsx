"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  AiFillFileText,
  AiFillBulb,
  AiFillAudio,
} from "react-icons/ai";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { BiCrown } from "react-icons/bi";
import { RiLeafLine } from "react-icons/ri";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { openAuthModal } from "@/store/slices/uiSlice";
import { signOut } from "@/lib/auth";

export default function Home() {
  const dispatch = useAppDispatch();
  const [activeIndex, setActiveIndex] = useState(0);
  const { isLoggedIn } = useAppSelector((s) => s.user);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(timer);
  }, []);
  return (
    <>
      <nav className="nav">
        <div className="nav__wrapper">
          <figure className="nav__img--mask">
            <Image
              className="nav__img"
              src="/assets/logo.png"
              alt="logo"
              width={200}
              height={50}
            />
          </figure>
          <ul className="nav__list--wrapper">
            {isLoggedIn ? (
              <li
                className="nav__list nav__list--login"
                onClick={async () => { await signOut(); }}
              >
                Logout
              </li>
            ) : (
              <li
                className="nav__list nav__list--login"
                onClick={() => dispatch(openAuthModal())}
              >
                Login
              </li>
            )}
            <li className="nav__list nav__list--mobile">About</li>
            <li className="nav__list nav__list--mobile">Contact</li>
            <li className="nav__list nav__list--mobile">Help</li>
          </ul>
        </div>
      </nav>

      <section id="landing">
        <div className="container">
          <div className="row">
            <div className="landing__wrapper">
              <div className="landing__content">
                <div className="landing__content__title">
                  Gain more knowledge <br className="remove--tablet" />
                  in less time
                </div>
                <div className="landing__content__subtitle">
                  Great summaries for busy people,
                  <br className="remove--tablet" />
                  individuals who barely have time to read,
                  <br className="remove--tablet" />
                  and even people who don&apos;t like to read.
                </div>
                <button className="btn home__cta--btn" onClick={() => !isLoggedIn && dispatch(openAuthModal())}>
                  {isLoggedIn ? "Go to Library" : "Login"}
                </button>
              </div>
              <figure className="landing__image--mask">
                <Image
                  src="/assets/landing.png"
                  alt="landing"
                  width={400}
                  height={400}
                />
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section id="features">
        <div className="container">
          <div className="row">
            <div className="section__title">Understand books in few minutes</div>
            <div className="features__wrapper">
              <div className="features">
                <div className="features__icon">
                  <AiFillFileText />
                </div>
                <div className="features__title">Read or listen</div>
                <div className="features__sub--title">
                  Save time by getting the core ideas from the best books.
                </div>
              </div>
              <div className="features">
                <div className="features__icon">
                  <AiFillBulb />
                </div>
                <div className="features__title">Find your next read</div>
                <div className="features__sub--title">
                  Explore book lists and personalized recommendations.
                </div>
              </div>
              <div className="features">
                <div className="features__icon">
                  <AiFillAudio />
                </div>
                <div className="features__title">Briefcasts</div>
                <div className="features__sub--title">
                  Gain valuable insights from briefcasts
                </div>
              </div>
            </div>

            <div className="statistics__wrapper">
              <div className="statistics__content--header">
                {["Enhance your knowledge", "Achieve greater success", "Improve your health", "Develop better parenting skills", "Increase happiness", "Be the best version of yourself!"].map((text, i) => (
                  <div key={text} className={`statistics__heading${activeIndex === i ? " statistics__heading--active" : ""}`}>{text}</div>
                ))}
              </div>
              <div className="statistics__content--details">
                <div className="statistics__data">
                  <div className="statistics__data--number">93%</div>
                  <div className="statistics__data--title">
                    of Summarist members <b>significantly increase</b> reading frequency.
                  </div>
                </div>
                <div className="statistics__data">
                  <div className="statistics__data--number">96%</div>
                  <div className="statistics__data--title">
                    of Summarist members <b>establish better</b> habits.
                  </div>
                </div>
                <div className="statistics__data">
                  <div className="statistics__data--number">90%</div>
                  <div className="statistics__data--title">
                    have made <b>significant positive</b> change to their lives.
                  </div>
                </div>
              </div>
            </div>

            <div className="statistics__wrapper">
              <div className="statistics__content--details statistics__content--details-second">
                <div className="statistics__data">
                  <div className="statistics__data--number">91%</div>
                  <div className="statistics__data--title">
                    of Summarist members <b>report feeling more productive</b>{" "}
                    after incorporating the service into their daily routine.
                  </div>
                </div>
                <div className="statistics__data">
                  <div className="statistics__data--number">94%</div>
                  <div className="statistics__data--title">
                    of Summarist members have <b>noticed an improvement</b> in
                    their overall comprehension and retention of information.
                  </div>
                </div>
                <div className="statistics__data">
                  <div className="statistics__data--number">88%</div>
                  <div className="statistics__data--title">
                    of Summarist members <b>feel more informed</b> about current
                    events and industry trends since using the platform.
                  </div>
                </div>
              </div>
              <div className="statistics__content--header statistics__content--header-second">
                {["Expand your learning", "Accomplish your goals", "Strengthen your vitality", "Become a better caregiver", "Improve your mood", "Maximize your abilities"].map((text, i) => (
                  <div key={text} className={`statistics__heading${activeIndex === i ? " statistics__heading--active" : ""}`}>{text}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews">
        <div className="row">
          <div className="container">
            <div className="section__title">What our members say</div>
            <div className="reviews__wrapper">
              {[
                {
                  name: "Hanna M.",
                  body: (
                    <>
                      This app has been a <b>game-changer</b> for me! It&apos;s saved me so
                      much time and effort in reading and comprehending books. Highly
                      recommend it to all book lovers.
                    </>
                  ),
                },
                {
                  name: "David B.",
                  body: (
                    <>
                      I love this app! It provides{" "}
                      <b>concise and accurate summaries</b> of books in a way that is
                      easy to understand. It&apos;s also very user-friendly and intuitive.
                    </>
                  ),
                },
                {
                  name: "Nathan S.",
                  body: (
                    <>
                      This app is a great way to get the main takeaways from a book
                      without having to read the entire thing.{" "}
                      <b>The summaries are well-written and informative.</b>{" "}
                      Definitely worth downloading.
                    </>
                  ),
                },
                {
                  name: "Ryan R.",
                  body: (
                    <>
                      If you&apos;re a busy person who{" "}
                      <b>loves reading but doesn&apos;t have the time</b> to read every
                      book in full, this app is for you! The summaries are thorough
                      and provide a great overview of the book&apos;s content.
                    </>
                  ),
                },
              ].map((review) => (
                <div key={review.name} className="review">
                  <div className="review__header">
                    <div className="review__name">{review.name}</div>
                    <div className="review__stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <BsStarFill key={i} />
                      ))}
                    </div>
                  </div>
                  <div className="review__body">{review.body}</div>
                </div>
              ))}
            </div>
            <div className="reviews__btn--wrapper">
              <button className="btn home__cta--btn" onClick={() => !isLoggedIn && dispatch(openAuthModal())}>
                {isLoggedIn ? "Go to Library" : "Login"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="numbers">
        <div className="container">
          <div className="row">
            <div className="section__title">Start growing with Summarist now</div>
            <div className="numbers__wrapper">
              <div className="numbers">
                <div className="numbers__icon">
                  <BiCrown />
                </div>
                <div className="numbers__title">3 Million</div>
                <div className="numbers__sub--title">Downloads on all platforms</div>
              </div>
              <div className="numbers">
                <div className="numbers__icon numbers__star--icon">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <BsStarFill key={i} />
                  ))}
                  <BsStarHalf />
                </div>
                <div className="numbers__title">4.5 Stars</div>
                <div className="numbers__sub--title">
                  Average ratings on iOS and Google Play
                </div>
              </div>
              <div className="numbers">
                <div className="numbers__icon">
                  <RiLeafLine />
                </div>
                <div className="numbers__title">97%</div>
                <div className="numbers__sub--title">
                  Of Summarist members create a better reading habit
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="footer">
        <div className="container">
          <div className="row">
            <div className="footer__top--wrapper">
              {[
                {
                  title: "Actions",
                  links: ["Summarist Magazine", "Cancel Subscription", "Help", "Contact us"],
                },
                {
                  title: "Useful Links",
                  links: ["Pricing", "Summarist Business", "Gift Cards", "Authors & Publishers"],
                },
                {
                  title: "Company",
                  links: ["About", "Careers", "Partners", "Code of Conduct"],
                },
                {
                  title: "Other",
                  links: ["Sitemap", "Legal Notice", "Terms of Service", "Privacy Policies"],
                },
              ].map((block) => (
                <div key={block.title} className="footer__block">
                  <div className="footer__link--title">{block.title}</div>
                  <div>
                    {block.links.map((link) => (
                      <div key={link} className="footer__link--wrapper">
                        <a className="footer__link">{link}</a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="footer__copyright--wrapper">
              <div className="footer__copyright">
                Copyright &copy; 2026 Summarist.
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
