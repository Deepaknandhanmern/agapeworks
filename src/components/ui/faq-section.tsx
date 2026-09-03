import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does pricing work?",
    answer:
      "We scope every project individually rather than publish fixed rates - tell us what you're building and we'll give you a real number, usually within a day. Want a rough idea first? Try the instant AI estimate at /scope, no obligation.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Most engagements ship a first working version in 2–4 weeks, then continue in weekly releases from there - you see real progress every week, not a status report.",
  },
  {
    question: "Who actually builds my project?",
    answer:
      "The engineer who scopes your project is the same one who builds it - no bait-and-switch handoff, and no account-manager layer relaying messages between you and the people writing the code.",
  },
  {
    question: "Do I own the code afterward?",
    answer:
      "Yes - 100% code ownership, plus documentation built in from the start, so your own team can pick it up and maintain it long after we're gone.",
  },
  {
    question: "Do you work with teams outside India?",
    answer:
      "Yes - we're a remote-first team and have delivered work for clients across multiple continents and time zones.",
  },
  {
    question: "What if I'm not ready to commit to a full project yet?",
    answer:
      "Get an instant, AI-generated scope estimate in about 15 seconds at /scope - or just tell us what you're thinking through the contact form. Either way, no pressure to commit.",
  },
];

function FAQ() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <div className="w-full py-20 lg:py-32">
      {/* eslint-disable-next-line react/no-danger -- static JSON we authored above, not user input */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto w-full max-w-5xl px-4">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div>
                <Badge variant="outline">FAQ</Badge>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="max-w-xl text-left text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                  Questions before you reach out
                </h2>
                <p className="max-w-lg text-left text-lg leading-relaxed text-muted-foreground">
                  The things people usually ask before starting a project - if yours isn&apos;t
                  here, just ask.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex w-fit items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Still have questions? Reach out <ArrowRight className="size-4" />
            </Link>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export { FAQ };
