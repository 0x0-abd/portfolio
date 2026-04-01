"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

// Updated array: Swapped Node to non-wordmark, added 'invert: true' for dark logos
const bits = [
  { name: "React", link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", href: "https://react.dev/" },
  { name: "NextJs", link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original-wordmark.svg", href: "https://nextjs.org/" },
  { name: "SpringBoot", link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg", href: "https://spring.io/projects/spring-boot" },
  { name: "NodeJs", link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", href: "https://nodejs.org/en" },
  { name: "AWS", link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", href: "https://aws.amazon.com/", invert: true },
  { name: "MySQL", link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-plain-wordmark.svg", href: "https://www.mysql.com/", invert: true },
  { name: "MongoDB", link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg", href: "https://www.mongodb.com/" },
  { name: "Redis", link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg", href: "https://redis.io/" },
  { name: "Docker", link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", href: "https://www.docker.com/" },
  { name: "Kubernetes", link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg", href: "https://kubernetes.io/" },
  { name: "Jenkins", link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg", href: "https://www.jenkins.io/" },
  { name: "Apache Airflow", link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apacheairflow/apacheairflow-original.svg", href: "https://airflow.apache.org/" },
]

export default function About() {
  return (
    <>
      <title>Abhyuday Shukla | About</title>

      {/* Background Mask */}
      <div id="intro">
        <svg xmlns="http://www.w3.org/2000/svg" className="fixed z-10 top-0 left-0 bottom-0 right-0 fill-none pointer-events-none h-full w-full" baseProfile="full" version="1.1">
          <defs>
            <mask id="mask-main-dark-inner" className="force-dark">
              <rect className="fill-black w-screen h-screen"></rect>
              <g className="intro-fadeout">
                <rect className="mask-main-bg w-screen h-screen fill-white"></rect>
              </g>
              <g className="intro-wrap intro-fadeout">
              </g>
            </mask>
          </defs>
          <g className="intro-masked-wrap">
            <rect className="intro-masked lght" width="100%" height="100%" mask="url(#mask-main-lght)"></rect>
            <rect className="intro-masked dark" width="100%" height="100%" mask="url(#mask-main-dark-inner)"></rect>
          </g>
        </svg>
      </div>

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-start py-20 px-6 lg:px-12">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 text-white font-figtree">

          {/* LEFT COLUMN: About Me & Experience */}
          <div className="lg:col-span-7 flex flex-col space-y-12">

            {/* About Me Section */}
            <section>
              <h2 className="font-semibold text-3xl pb-4 drop-shadow-[0_0_8px_rgba(59,130,246,0.7)] text-blue-100">
                About Me
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                Hey there! 👋 I&apos;m Abhyuday, a software developer working on various Web technologies and Cloud.
                I enjoy solving complex problems and analysing different systems. You can find me drinking chaii and listening to music often 🍵~
              </p>

              {/* Social Links */}
              <div className="flex space-x-8 pt-2">
                <Link href="https://github.com/0x0-abd" target="_blank" rel="noreferrer">
                  <FontAwesomeIcon className="h-7 text-slate-300 hover:text-white hover:scale-125 transition-all hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.7)] duration-200" icon={faGithub} />
                </Link>
                <Link href="https://www.linkedin.com/in/abhyuday-shukla-14b0b0237/" target="_blank" rel="noreferrer">
                  <FontAwesomeIcon className="h-7 text-slate-300 hover:text-white hover:scale-125 transition-all hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.7)] duration-200" icon={faLinkedin} />
                </Link>
                <Link href="https://leetcode.com/nightdesert326/" target="_blank" rel="noreferrer">
                  <svg role="img" className="h-7 text-slate-300 fill-current hover:text-white hover:scale-125 transition-all hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.7)] duration-200" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <title>LeetCode</title>
                    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                  </svg>
                </Link>
                <Link href="mailto:nightdesert326@gmail.com">
                  <FontAwesomeIcon className="h-7 text-slate-300 hover:text-white hover:scale-125 transition-all hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.7)] duration-200" icon={faEnvelope} />
                </Link>
              </div>
            </section>

            {/* Experience Section */}
            <section>
              <h2 className="font-semibold text-3xl pb-6 drop-shadow-[0_0_8px_rgba(59,130,246,0.7)] text-blue-100">
                Experience
              </h2>

              <div className="space-y-12 relative before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-700/50">

                {/* Samsung */}
                <div className="relative pl-8">
                  <span className="absolute left-0 top-2.5 h-3 w-3 rounded-full border-2 border-emerald-500 bg-slate-900"></span>
                  <h3 className="text-2xl font-bold text-white mb-6">Samsung R&D Institute - Delhi</h3>
                  
                  <div className="space-y-8">
                    {/* Full Time Role */}
                    <div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-3">
                        <h4 className="text-xl font-semibold text-emerald-400">Software Developer</h4>
                        <span className="text-base font-medium text-slate-400 mt-1 sm:mt-0 sm:ml-4 shrink-0">July 2025 – Present</span>
                      </div>
                      
                      <ul className="list-disc pl-5 space-y-2 text-base md:text-lg text-slate-300 leading-relaxed">
                        <li>Contribute to <b>agile development lifecycles</b>, driving system architecture discussions and conducting rigorous code reviews.</li>
                        <li>Architect and provision highly scalable cloud backends utilizing <b>AWS CDK</b> (Infrastructure as Code).</li>
                        <li>Implement and streamline <b>CI/CD pipelines</b> to ensure reliable, automated testing and deployment workflows.</li>
                      </ul>
                    </div>

                    {/* Intern Role */}
                    <div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-3">
                        <h4 className="text-xl font-medium text-slate-300">Software Engineering Intern</h4>
                        <span className="text-base font-medium text-slate-500 mt-1 sm:mt-0 sm:ml-4 shrink-0">Jan 2025 – July 2025</span>
                      </div>
                      
                      <ul className="list-disc pl-5 space-y-2 text-base md:text-lg text-slate-400 leading-relaxed">
                        <li>Engineered secure cloud authentication by successfully integrating <b>OAuth 2.0</b> authorization.</li>
                        <li>Assisted in the development and deployment of foundational cloud infrastructure using <b>AWS CDK</b>.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* LNMIIT */}
                <div className="relative pl-8">
                  <span className="absolute left-0 top-2.5 h-3 w-3 rounded-full border-2 border-slate-500 bg-slate-900"></span>
                  <h3 className="text-2xl font-bold text-white mb-6">The LNM Institute of Information Technology - Jaipur</h3>
                  
                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-3">
                      <h4 className="text-xl font-medium text-slate-300">Teaching Assistant</h4>
                      <span className="text-base font-medium text-slate-500 mt-1 sm:mt-0 sm:ml-4 shrink-0">Jan 2024 – April 2024</span>
                    </div>
                    
                    <ul className="list-disc pl-5 space-y-2 text-base md:text-lg text-slate-400 leading-relaxed">
                      <li>Assisted in teaching Data Structures and Algorithms during lab sessions.</li>
                      <li>Mentored students in Scripting Languages during my fifth college semester.</li>
                    </ul>
                  </div>
                </div>

              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: Skills Grid - Now Sticky! */}
          <div className="lg:col-span-5 relative pt-12 lg:pt-0">
            <div className="lg:sticky lg:top-32 flex items-start justify-center lg:justify-end">
              
              <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-2 gap-6 sm:gap-8 gap-y-8 lg:gap-y-10 place-items-center w-full max-w-md bg-slate-900/30 p-6 lg:p-8 rounded-2xl border border-slate-800/50 shadow-2xl backdrop-blur-sm">
                {bits.map((bit) => (
                  bit.name !== "NextJs" ? (
                    <Link key={bit.name} href={bit.href} target="_blank" rel="noreferrer" className="group">
                      <Image
                        // Added conditional rendering for the Tailwind 'invert' class
                        className={`w-10 h-10 lg:w-12 lg:h-12 object-contain opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:scale-125 group-hover:-translate-y-2 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] ${bit.invert ? 'invert' : ''}`}
                        src={bit.link}
                        alt={bit.name}
                        height={48}
                        width={48}
                      />
                    </Link>
                  ) : (
                    <Link key="Next Logo" href={bit.href} target="_blank" rel="noreferrer" className="group">
                      <svg className="w-10 h-10 lg:w-12 lg:h-12 opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:scale-125 group-hover:-translate-y-2 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" viewBox="0 0 128 128" fill="white">
                        <path d="M0 51.098V76.86h4.422V56.604L20.73 76.87h27.694v-4.113H30.553v-6.801h14.37v-4.113h-14.37v-6.621h17.87v-4.116H26.13v4.116h.002V76.68L5.527 51.098H0zm85.09.01v4.115h9.03v21.65h4.42v-21.65h8.847v-4.116H85.09zm-31.322.011 20.73 25.764h5.803L69.936 64.01l10.35-12.871-5.79.01-7.459 9.261-7.48-9.29h-5.79zm70.158 14.598c-.761 0-1.445.128-2.051.394-.602.263-1.078.633-1.426 1.108-.35.476-.525 1.032-.525 1.664 0 .77.258 1.384.78 1.847.517.464 1.227.809 2.124 1.036l1.24.312a7.02 7.02 0 0 1 1.026.334 1.91 1.91 0 0 1 .683.461 1.034 1.034 0 0 1 .248.697 1.25 1.25 0 0 1-.283.803 1.77 1.77 0 0 1-.76.535 3.11 3.11 0 0 1-1.132.192 3.24 3.24 0 0 1-1.116-.182 1.902 1.902 0 0 1-.804-.557 1.63 1.63 0 0 1-.352-.931h-1.941c.027.71.216 1.316.566 1.812s.836.873 1.46 1.13c.62.26 1.357.39 2.202.39.875 0 1.619-.136 2.233-.4.617-.27 1.088-.643 1.414-1.118.327-.479.488-1.028.488-1.658 0-.466-.09-.872-.266-1.217a2.726 2.726 0 0 0-.72-.887 4.227 4.227 0 0 0-1.028-.607 7.09 7.09 0 0 0-1.19-.385l-1.02-.25a6.975 6.975 0 0 1-.667-.195 2.82 2.82 0 0 1-.597-.285 1.304 1.304 0 0 1-.43-.418 1.037 1.037 0 0 1-.158-.58 1.21 1.21 0 0 1 .238-.717c.156-.21.385-.376.678-.5a2.771 2.771 0 0 1 1.056-.184c.585 0 1.062.126 1.43.383a1.424 1.424 0 0 1 .623 1.07h1.9a2.775 2.775 0 0 0-.513-1.607c-.333-.466-.792-.833-1.377-1.096-.584-.265-1.26-.394-2.033-.394zm-7.998.144v7.55c-.003.377-.062.697-.176.954a1.25 1.25 0 0 1-.506.584c-.218.133-.488.2-.803.2-.29 0-.546-.057-.771-.17a1.247 1.247 0 0 1-.522-.481 1.474 1.474 0 0 1-.195-.75h-1.963c0 .661.147 1.213.447 1.656a2.768 2.768 0 0 0 1.211 1.002 4.22 4.22 0 0 0 1.72.34c.697 0 1.311-.134 1.835-.4a2.97 2.97 0 0 0 1.236-1.149c.293-.499.444-1.093.448-1.787v-7.549h-1.961zm-53.332.059-8.844 10.982h5.805l5.937-7.38-2.898-3.602zm45.785 8.498c-.324 0-.6.112-.83.336a1.07 1.07 0 0 0-.344.807 1.082 1.082 0 0 0 .344.818c.23.225.506.336.83.336a1.105 1.105 0 0 0 .574-.156c.177-.101.318-.24.428-.416a1.115 1.115 0 0 0 .166-.582 1.097 1.097 0 0 0-.354-.807 1.133 1.133 0 0 0-.814-.336z"></path>
                      </svg>
                    </Link>
                  )
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  )
}