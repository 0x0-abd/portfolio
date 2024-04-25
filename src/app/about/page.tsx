"use client"

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

let bits = [
  { name: "Java", link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg", href: "https://www.oracle.com/in/java/" },
  { name: "Python", link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", href: "https://www.python.org/" },
  { name: "JS", link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  // { name: "Bootstrap", link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg"},
  { name: "React", link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", href: "https://react.dev/" },
  { name: "Tailwind", link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", href: "https://tailwindcss.com/" },
  { name: "NextJs", link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original-wordmark.svg", href: "https://nextjs.org/" },
  { name: "NodeJs", link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg", href: "https://nodejs.org/en" },
  { name: "MongoDB", link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg", href: "https://www.mongodb.com/" },
  { name: "WebGPU", link: "https://www.w3.org/2023/02/webgpu-logos/webgpu-responsive.svg", href: "https://www.w3.org/TR/webgpu/" },
]

function About() {
  const gridRef = useRef([])


  useEffect(() => {
    // gridRef.current = itemsRef.current.slice(0, props.items.length);
  })

  return (
    <>
      <title>Abhyuday Shukla | About</title>
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

      <main className="home-main flex min-h-screen flex-col items-center justify-start space-y-20 p-8">
        <div className="z-10 max-w-4xl mt-20 w-11/12 items-center justify-between font-mono text-lg lg:flex">

          Hey there! 👋 I'm Abhyuday, a Computer Science student deeply passionate about Web Development with Artificial Intelligence.
          Driven by curiosity and a thirst for innovation, I love crafting intuitive web applications and exploring the latest advancements in AI tech.

          <br />
          <br />

          Let's collaborate and explore the endless possibilities at the intersection of tech and creativity!

        </div>

        <div className="grid z-10 grid-cols-3 gap-10 lg:gap-x-36">


          {bits.map((bit) => (
            (`${bit.name}` !== "NextJs") ? (
              <Link key={bit.name} className='z-10' href={bit.href}>
                <Image
                  className='z-10 opacity-1 duration-200 hover:scale-125'
                  // loading='lazy'
                  src={bit.link}
                  alt={bit.name}
                  height={50}
                  width={50}
                />
              </Link>
            ) : (
              <Link key="Next Logo" className='z-10' href={bit.href}>
                <svg className="z-10 opacity-1 duration-200 hover:scale-125" viewBox="0 0 128 128" fill='white'>
                  <path d="M0 51.098V76.86h4.422V56.604L20.73 76.87h27.694v-4.113H30.553v-6.801h14.37v-4.113h-14.37v-6.621h17.87v-4.116H26.13v4.116h.002V76.68L5.527 51.098H0zm85.09.01v4.115h9.03v21.65h4.42v-21.65h8.847v-4.116H85.09zm-31.322.011 20.73 25.764h5.803L69.936 64.01l10.35-12.871-5.79.01-7.459 9.261-7.48-9.29h-5.79zm70.158 14.598c-.761 0-1.445.128-2.051.394-.602.263-1.078.633-1.426 1.108-.35.476-.525 1.032-.525 1.664 0 .77.258 1.384.78 1.847.517.464 1.227.809 2.124 1.036l1.24.312a7.02 7.02 0 0 1 1.026.334 1.91 1.91 0 0 1 .683.461 1.034 1.034 0 0 1 .248.697 1.25 1.25 0 0 1-.283.803 1.77 1.77 0 0 1-.76.535 3.11 3.11 0 0 1-1.132.192 3.24 3.24 0 0 1-1.116-.182 1.902 1.902 0 0 1-.804-.557 1.63 1.63 0 0 1-.352-.931h-1.941c.027.71.216 1.316.566 1.812s.836.873 1.46 1.13c.62.26 1.357.39 2.202.39.875 0 1.619-.136 2.233-.4.617-.27 1.088-.643 1.414-1.118.327-.479.488-1.028.488-1.658 0-.466-.09-.872-.266-1.217a2.726 2.726 0 0 0-.72-.887 4.227 4.227 0 0 0-1.028-.607 7.09 7.09 0 0 0-1.19-.385l-1.02-.25a6.975 6.975 0 0 1-.667-.195 2.82 2.82 0 0 1-.597-.285 1.304 1.304 0 0 1-.43-.418 1.037 1.037 0 0 1-.158-.58 1.21 1.21 0 0 1 .238-.717c.156-.21.385-.376.678-.5a2.771 2.771 0 0 1 1.056-.184c.585 0 1.062.126 1.43.383a1.424 1.424 0 0 1 .623 1.07h1.9a2.775 2.775 0 0 0-.513-1.607c-.333-.466-.792-.833-1.377-1.096-.584-.265-1.26-.394-2.033-.394zm-7.998.144v7.55c-.003.377-.062.697-.176.954a1.25 1.25 0 0 1-.506.584c-.218.133-.488.2-.803.2-.29 0-.546-.057-.771-.17a1.247 1.247 0 0 1-.522-.481 1.474 1.474 0 0 1-.195-.75h-1.963c0 .661.147 1.213.447 1.656a2.768 2.768 0 0 0 1.211 1.002 4.22 4.22 0 0 0 1.72.34c.697 0 1.311-.134 1.835-.4a2.97 2.97 0 0 0 1.236-1.149c.293-.499.444-1.093.448-1.787v-7.549h-1.961zm-53.332.059-8.844 10.982h5.805l5.937-7.38-2.898-3.602zm45.785 8.498c-.324 0-.6.112-.83.336a1.07 1.07 0 0 0-.344.807 1.082 1.082 0 0 0 .344.818c.23.225.506.336.83.336a1.105 1.105 0 0 0 .574-.156c.177-.101.318-.24.428-.416a1.115 1.115 0 0 0 .166-.582 1.097 1.097 0 0 0-.354-.807 1.133 1.133 0 0 0-.814-.336z"></path>
                </svg>
              </Link>
            )
          ))}
        </div>
      </main>
    </>
  )
}

export default About