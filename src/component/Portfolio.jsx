import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Portfolio.css";

gsap.registerPlugin(ScrollTrigger);

const skills = ["React", "Next.js", "Node.js", "PostgreSQL", "Redis", "MUI"];

const projects = [
  {
    title: "CRM Platform",
    description:
      "A customer management dashboard with account pipelines, analytics, role-based access, and fast search.",
    stack: "Next.js, Node.js, PostgreSQL, Redis",
  },
  {
    title: "Booking Portal",
    description:
      "A responsive reservation flow with protected admin tools, calendar logic, and payment-ready architecture.",
    stack: "React, Express, MUI",
  },
  {
    title: "Analytics Suite",
    description:
      "A reporting workspace for teams to compare KPIs, export insights, and monitor activity in real time.",
    stack: "React, Recharts, Zustand",
  },
];

const experience = [
  {
    role: "Full Stack Developer",
    period: "2024 - Present",
    detail:
      "Building polished web applications with reliable APIs, reusable UI systems, and practical deployment workflows.",
  },
  {
    role: "React Developer",
    period: "2022 - 2024",
    detail:
      "Delivered responsive interfaces, dashboards, and animation-heavy experiences for product teams.",
  },
  {
    role: "Frontend Developer",
    period: "2021 - 2022",
    detail:
      "Created accessible components, landing experiences, and client-facing project pages.",
  },
];

export default function Portfolio() {
  const rootRef = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        y: 44,
        opacity: 0,
        stagger: 0.14,
        duration: 0.85,
        ease: "power3.out",
      });

      gsap.from(aboutRef.current, {
        y: 44,
        opacity: 0,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.to(".parallax-image", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: ".parallax-wrapper",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.7,
        },
      });

      gsap.utils.toArray(".reveal-item").forEach((item) => {
        gsap.from(item, {
          y: 32,
          opacity: 0,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={rootRef} className="portfolio-page">
      <section className="portfolio-hero">
        <div className="portfolio-hero-media">
          <img
            className="portfolio-hero-image"
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1920&auto=format&fit=crop"
            alt="Computer circuit board close up"
          />
          <div className="portfolio-hero-overlay" />
        </div>

        <div className="portfolio-hero-content">
          <p className="hero-line portfolio-eyebrow">
            Portfolio
          </p>
          <h1 className="hero-line portfolio-title">
            Muhammad Faizullah
          </h1>
          <h2 className="hero-line portfolio-subtitle">
            Full Stack Developer
          </h2>
          <p className="hero-line portfolio-copy">
            I build fast, scalable web applications with clean interfaces,
            strong architecture, and smooth user experiences.
          </p>
          <div className="hero-line portfolio-actions">
            <a
              className="portfolio-button portfolio-button-primary"
              href="mailto:hello@example.com"
            >
              Contact Me
            </a>
            <a
              className="portfolio-button portfolio-button-secondary"
              href="#projects"
            >
              View Projects
            </a>
          </div>
        </div>
      </section>

      <section
        ref={aboutRef}
        className="portfolio-section portfolio-about"
      >
        <div>
          <p className="portfolio-eyebrow">
            About
          </p>
          <h2 className="portfolio-section-title">
            Practical engineering with a sharp eye for product detail.
          </h2>
        </div>
        <div className="portfolio-about-copy">
          <p>
            I work across frontend and backend systems, turning product ideas
            into reliable applications that are easy to use and maintain.
          </p>
          <div className="portfolio-skills">
            {skills.map((skill) => (
              <span
                key={skill}
                className="portfolio-skill"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="parallax-wrapper portfolio-parallax">
        <img
          className="parallax-image portfolio-parallax-image"
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1920&auto=format&fit=crop"
          alt="Code editor on a developer workstation"
        />
        <div className="portfolio-parallax-content">
          <h2>
            Clean code. Clear interfaces. Useful products.
          </h2>
        </div>
      </section>

      <section
        id="featured"
        className="portfolio-section portfolio-featured"
      >
        <article className="reveal-item project-card portfolio-featured-card">
          <p className="portfolio-card-eyebrow">
            Featured Project
          </p>
          <h2>CRM Platform</h2>
          <p>
            A full stack customer management system built for tracking leads,
            team activity, reporting, and operational workflows.
          </p>
          <p className="portfolio-card-stack">
            Next.js / Node.js / PostgreSQL / Redis
          </p>
        </article>
      </section>

      <section id="projects" className="portfolio-section portfolio-projects">
        <div className="portfolio-section-header">
          <div>
            <p className="portfolio-eyebrow">
              Work
            </p>
            <h2 className="portfolio-section-title">Projects</h2>
          </div>
          <p>
            Selected builds focused on responsive UI, dependable APIs, and
            maintainable application structure.
          </p>
        </div>

        <div className="portfolio-project-grid">
          {projects.map((project) => (
            <article
              key={project.title}
              className="reveal-item portfolio-project-card"
            >
              <h3>{project.title}</h3>
              <p>
                {project.description}
              </p>
              <p className="portfolio-project-stack">
                {project.stack}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-section portfolio-experience">
        <p className="portfolio-eyebrow portfolio-center">
          Experience
        </p>
        <h2 className="portfolio-section-title portfolio-center">
          Recent Roles
        </h2>

        <div className="portfolio-timeline">
          {experience.map((item) => (
            <article
              key={item.role}
              className="reveal-item portfolio-timeline-item"
            >
              <div>
                <h3>{item.role}</h3>
                <p className="portfolio-period">
                  {item.period}
                </p>
              </div>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-contact">
        <p className="portfolio-eyebrow">
          Contact
        </p>
        <h2>
          Let&apos;s build something useful together.
        </h2>
        <a
          className="portfolio-button portfolio-button-accent"
          href="mailto:hello@example.com"
        >
          Start a Conversation
        </a>
      </section>
    </main>
  );
}
