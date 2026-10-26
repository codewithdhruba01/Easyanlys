import React from 'react';
import { Link } from 'react-router-dom';

export function ServiceSection() {
  const steps = [
    {
      number: "01",
      title: "Follower Analytics",
      description: "Track your GitHub followers in real-time and discover who isn't following you back.",
      href: "/follower-counter"
    },
    {
      number: "02",
      title: "README Designer",
      description: "Create stunning GitHub profile READMEs with skills, stats, and social icons.",
      href: "/readme-designer"
    },
    {
      number: "03",
      title: "Text to README",
      description: "Convert unstructured notes, text drafts, and project specs into clean README.md files.",
      href: "/text-to-readme"
    },
    {
      number: "04",
      title: "Profile Compare",
      description: "Compare GitHub profiles head-to-head and get actionable insights.",
      href: "/profile-compare"
    }
  ];

  return (
    <section className="bg-background text-foreground px-6 my-12">
      <div className="max-w-4xl mx-auto border-t border-b border-border py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Link to={step.href} key={index} className="flex flex-col group cursor-pointer">
              <span className="text-sm font-medium text-muted-foreground mb-5">{step.number}</span>
              <h3 className="text-[15px] font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-[13px] pr-2 group-hover:text-foreground transition-colors">
                {step.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
