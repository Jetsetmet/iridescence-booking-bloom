import { createFileRoute, Link } from "@tanstack/react-router";
import { Triangle, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Client Reviews — Iridescence Healing, New Orleans Reiki & Sound Healing" },
      { name: "description", content: "Read client reviews for Mehtap at Iridescence Healing - Reiki, sound healing, breathwork and intuitive energy sessions in uptown New Orleans." },
      { property: "og:title", content: "Client Reviews — Iridescence Healing" },
      { property: "og:description", content: "Stories from clients who have experienced Reiki, sound healing and intuitive guidance with Mehtap in New Orleans." },
    ],
  }),
  component: Reviews,
});

const reviews: { quote: string; author: string }[] = [
  {
    quote:
      "Every time I leave a session I feel completely and utterly rejuvenated. Anytime I feel I need healing in my life, I call Met. And anytime things are going really great, I call Met to assist me with clearing even more, feeling even better than I thought I could, and taking that time to connect more deeply with myself. She is so personable and easy to talk to, but also respectful of your personal boundaries. I have been having sessions done with her for almost a year now and my experiences have all been outstanding. I would suggest Iridescence Healing to anyone interested in trying reiki for the first time. I would also suggest Iridescence Healing to anyone who regularly practices reiki, so you can experience Met's beautiful way of treating people. Met is truly a shining star and I am so glad to have her help me in my journey.",
    author: "Brittany V.",
  },
  {
    quote:
      "I went for a session with Met on my last visit to New Orleans based mainly on Yelp recommendations (thank you all!). I wanted to start my short vacation well-balanced, and scheduled with her for my first day in town. The studio is incredibly inviting and cozy. As soon as Met greeted me, her energy was warm and uplifting. I have been to a number of Reiki sessions in the past, and this was one of my best experiences. The techniques Met incorporates are holistic and fit directly for the individual. Her intuition is definitely In Tune, and she provided insights that I was able to focus on for the next few weeks. Also, my overall physical body felt absolutely electrified and elevated afterward. I highly recommend Met whether this is your first time experiencing Reiki, or, like myself, are familiar with the practice and need a recharge. Thank you thank you thank you, Met.",
    author: "Mau R.",
  },
  {
    quote:
      "I have been seeing Met for 2 to 3 years now and have found an hour session to be very beneficial in helping me get in touch with my inner voice. She has an uncanny talent for detecting what's going on, where Chakras are blocked and offers subtle recommendations for dealing with whatever is going on in life. Her approach is soft but very sincere. Her methods are soothing and non-threatening. There are no guarantees that the sessions will meet your expectations. You should go into each session with an open mind, heart and spirit and let what happens, happens. Remember, the answers and help that you are looking for lay within you, Met is your medium to help you open yourself to reveal those answers. She is very caring and dedicated to her gift. I highly recommend her to my friends and family.",
    author: "Charlie H.",
  },
  {
    quote:
      "Met is amazing. Every time she works on me, I feel like a new person. She's very intuitive and caring. The combo of oils, crystals, and healing touch is like nothing I've ever experienced. The ambiance and music choice is always soothing — in fact, I feel instantly better just walking into her space. Plus her prices are reasonable and worth it. I highly recommend her again and again!",
    author: "Tara L.",
  },
  {
    quote:
      "I made a visit to Iridescence Healing after feeling off, specifically unmotivated and disconnected. I knew that Met was special as soon as I talked to her. She has a vibe that is so pleasant to be around. My session was so relaxing and peaceful and afterwards, I felt so reconnected and my energy was pulsating. She gave me some advice on \"aftercare\" chakra work when my session was over. The feeling lasted a long time and I have since been able to reconnect to this side of myself. I have recommended her to several of my friends who are familiar with Reiki and some who are not. I would highly recommend her. I cannot wait to go back.",
    author: "Alana M.",
  },
  {
    quote:
      "From the moment I was greeted by Met, I felt a warm welcome and a feeling like I was supposed to find this place. Met takes every step to make sure you are comfortable and relaxed. Her reiki space felt absolutely clear of negative energy and had a very inviting and soothing feel to it. The music playing was relaxing and the faint smell of sage clued me in that she takes everything into consideration before a session. The session itself was about an hour long and it was very powerful for both of us. Met knew exactly what to do when it came to balancing my chakra points. In fact, at one point, she nearly had me break down into tears because my heart chakra needed a lot of work due to some emotional hurt I had experienced. She knew it and she helped me through it. That alone opened my eyes that Met truly knows her stuff when it comes to reiki. It was my first session with her and I'm already planning my next session in the next couple of weeks. Whether you are feeling down, feeling enlightened and happy, or simply need a recharge, go see Met. She is truly one of a kind and she is now my go-to crystal healer and reiki master!",
    author: "Jason K.",
  },
  {
    quote:
      "Met is professional, charming, caring and very dedicated. I've been to other reiki healers without as much success as I have had with Met. She is a natural and anyone that needs any healing should book a session with Met asap!",
    author: "Libby H.",
  },
  {
    quote:
      "I had such a relaxing session and really felt grounded and more peaceful following the session! I've done some of the suggestions to fully balance my chakras (glad to know they were all pretty much balanced) but I definitely plan on going back when I'm feeling stressed or \"just off\". If you haven't had a reiki reading I highly recommend going here! She is SO super sweet and even text me some products that I could find that may help me (didn't try to push or sell anything, it was information I asked for)! Since my reading I have been trying to meditate more and just be more present and aware — definitely a useful tool for those of us who have stressful jobs or just feel out of whack!",
    author: "Jill B.",
  },
  {
    quote:
      "I'm not sure where to begin… maybe with, that I wasn't a believer. At all. It took one session to turn that around. I couldn't believe how I felt after. Back pain was not there. Mind was calm. For the first time in a very long time for me, I felt good. Met has a special gift and I feel gratitude, above all, that she is in my life. Can't recommend enough that if you have the chance to see her, take it. She is truly amazing.",
    author: "Vincent J.",
  },
];

function Reviews() {
  return (
    <section className="mx-auto max-w-6xl px-5 sm:px-8 py-16">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Client Love</p>
        <h1 className="mt-2 font-display text-5xl sm:text-6xl text-balance">
          Reviews from the <span className="italic bg-iridescent bg-clip-text text-transparent">heart</span>
        </h1>
        <div className="mt-4 flex items-center justify-center gap-1 text-primary">
          {Array.from({ length: 5 }).map((_, i) => (
            <Triangle key={i} className="h-4 w-4 fill-current" />
          ))}
          <span className="ml-2 text-sm text-muted-foreground">5★ average · 1000+ sessions held</span>
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {reviews.map((r, i) => (
          <figure
            key={i}
            className="rounded-3xl border border-border bg-card p-7 shadow-soft flex flex-col"
          >
            <Triangle className="h-6 w-6 text-primary/60" />
            <blockquote className="mt-4 text-foreground/80 leading-relaxed text-pretty">
              {r.quote}
            </blockquote>
            <figcaption className="mt-5 text-sm font-medium text-foreground">
              — {r.author}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-14 text-center">
        <Link
          to="/book"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-soft"
        >
          Book your session <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}