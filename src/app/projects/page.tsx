"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

const projects = [
  {
    id: 1,
    title: "Digital Yearbook",
    description:
      "A platform for students to share quotes and connect with peers. Features image uploads, Firebase auth, user onboarding, a friends system, and comments on quotes.",
    stack: ["React", "Firebase", "Node.js", "MongoDB", "Cloudinary", "Tailwind"],
    github: "https://github.com/0x0-abd/yearbook",
    live: "https://digitalyearbook.vercel.app",
    image: "/yearbook.png",
    accent: "cyan",
    accentClass: "text-cyan-400",
    borderClass: "border-cyan-500",
    glowClass: "drop-shadow-[0_0_15px_rgba(34,211,238,0.25)]",
    badgeClass: "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20",
  },
  {
    id: 2,
    title: "Movie Explorer",
    description:
      "Browse movies and discover detailed info and trailers in a clean, mobile-friendly interface. Powered by the TMDB API with embedded YouTube trailer playback.",
    stack: ["React", "TMDB API", "Flask", "Tailwind"],
    github: "https://github.com/0x0-abd/movie-explorer",
    live: "https://movie-explorer-weld.vercel.app",
    image: "/movie-explorer.png",
    
    accent: "violet",
    accentClass: "text-violet-400",
    borderClass: "border-violet-500",
    glowClass: "drop-shadow-[0_0_15px_rgba(167,139,250,0.25)]",
    badgeClass: "bg-violet-500/10 text-violet-300 border border-violet-500/20",
  },
  {
    id: 3,
    title: "Grocery & Fruits Shop",
    description:
      "A full-stack grocery website where customers can browse products by category and order from cart. Admins can confirm orders and manage inventory.",
    stack: ["React", "Bootstrap", "Node.js", "MongoDB"],
    github: "https://github.com/0x0-abd/ISDL",
    live: "https://grocery-store-kohl.vercel.app/browse",
    image: "/gfc.png",
    accent: "emerald",
    accentClass: "text-emerald-400",
    borderClass: "border-emerald-500",
    glowClass: "drop-shadow-[0_0_15px_rgba(52,211,153,0.25)]",
    badgeClass: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20",
  },
  {
    id: 4,
    title: "Hyperspectral Image Analysis",
    description:
      "A Rough Set based Feature Selection method to overcome high dimensionality of hyperspectral datasets. Applied in Remote Sensing and Medical Diagnosis with promising classification accuracy.",
    stack: ["Python", "Scikit-learn", "NumPy", "Rough Sets"],
    github: "https://github.com/0x0-abd/Hyperspectral-Image-Analysis",
    live: null,
    image: "/hsi.png",
    accent: "rose",
    accentClass: "text-rose-400",
    borderClass: "border-rose-500",
    glowClass: "drop-shadow-[0_0_15px_rgba(251,113,133,0.25)]",
    badgeClass: "bg-rose-500/10 text-rose-300 border border-rose-500/20",
  },
  {
    id: 5,
    title: "Chat Application",
    description:
      "A real-time common chatroom where users can send messages and share images. Built with WebSockets for live communication without page reloads.",
    stack: ["Next.js", "Socket.io", "Node.js", "Tailwind"],
    github: "https://github.com/0x0-abd/uc-frontend",
    live: null,
    image: "/chatroom.png",
    accent: "blue",
    accentClass: "text-blue-400",
    borderClass: "border-blue-500",
    glowClass: "drop-shadow-[0_0_15px_rgba(96,165,250,0.25)]",
    badgeClass: "bg-blue-500/10 text-blue-300 border border-blue-500/20",
  },
]

export default function Projects() {
  return (
    <>
      <title>Abhyuday Shukla | Projects</title>

      {/* Background Mask — same as About page */}
      <div id="intro">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="fixed z-10 top-0 left-0 bottom-0 right-0 fill-none pointer-events-none h-full w-full"
          baseProfile="full"
          version="1.1"
        >
          <defs>
            <mask id="mask-main-dark-inner" className="force-dark">
              <rect className="fill-black w-screen h-screen"></rect>
              <g className="intro-fadeout">
                <rect className="mask-main-bg w-screen h-screen fill-white"></rect>
              </g>
              <g className="intro-wrap intro-fadeout"></g>
            </mask>
          </defs>
          <g className="intro-masked-wrap">
            <rect className="intro-masked lght" width="100%" height="100%" mask="url(#mask-main-lght)"></rect>
            <rect className="intro-masked dark" width="100%" height="100%" mask="url(#mask-main-dark-inner)"></rect>
          </g>
        </svg>
      </div>

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-start py-20 px-6 lg:px-12">
        <div className="w-full max-w-7xl font-figtree text-white">

          {/* Page Header */}
          <h2 className="font-semibold text-3xl pb-2 drop-shadow-[0_0_8px_rgba(59,130,246,0.7)] text-blue-100 mb-4">
            Projects
          </h2>
          {/* Two-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative flex flex-col rounded-2xl border border-slate-800/60 bg-slate-900/40 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-slate-700/80 hover:bg-slate-900/60 shadow-2xl"
              >
                {/* Image or Placeholder */}
                <div className="relative w-full h-52 overflow-hidden bg-slate-800/50">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top opacity-70 group-hover:opacity-90 transition-all duration-500 group-hover:scale-105"
                    />
                  ) : (
                    /* Decorative placeholder when no image */
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`absolute inset-0 opacity-5 bg-gradient-to-br from-slate-600 to-slate-900`}></div>
                      <div className={`relative text-6xl font-bold tracking-widest opacity-10 ${project.accentClass} select-none`}>
                        {project.title.split(" ").map(w => w[0]).join("").slice(0, 3)}
                      </div>
                      {/* Subtle grid lines */}
                      <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id={`grid-${project.id}`} width="32" height="32" patternUnits="userSpaceOnUse">
                            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#grid-${project.id})`} />
                      </svg>
                    </div>
                  )}

                  {/* Gradient overlay at bottom of image */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6 pt-5">
                  {/* Title + Links row */}
                  <div className="flex items-start justify-between mb-3 gap-4">
                    <h3 className={`text-xl font-bold leading-tight ${project.accentClass} drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]`}>
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-3 shrink-0 pt-0.5">
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-white hover:scale-110 transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.7)]"
                        aria-label={`GitHub for ${project.title}`}
                      >
                        <FontAwesomeIcon className="h-5 w-5" icon={faGithub} />
                      </Link>
                      {project.live && (
                        <Link
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-400 hover:text-white hover:scale-110 transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.7)]"
                          aria-label={`Live demo for ${project.title}`}
                        >
                          <FontAwesomeIcon className="h-4 w-4" icon={faArrowUpRightFromSquare} />
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className={`w-10 h-[2px] mb-4 rounded-full bg-current ${project.accentClass} opacity-60`}></div>

                  {/* Description */}
                  <p className="text-slate-300 text-base leading-relaxed flex-1 mb-5">
                    {project.description}
                  </p>

                  {/* Stack Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className={`text-xs font-medium px-2.5 py-1 rounded-md ${project.badgeClass}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Subtle left accent border on hover */}
                <div className={`absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-60 transition-opacity duration-300 bg-current ${project.accentClass}`}></div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}