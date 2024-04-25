"use client"

import Link from 'next/link'
import React, { useState } from 'react'

function Links() {
  const [ isHidden, setIsHidden ]  = useState<boolean>(true)

  const handleClick = () => {
    if(isHidden === false) return;
    setIsHidden(false);
  }

  return (
    <>
    <title>Abhyuday Shukla | Links</title>
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
      <div className="z-10 max-w-4xl mt-20 w-11/12 justify-between font-mono text-lg md:flex md:flex-col">
        <p className="mt-5 mb-12 text-blue-400 text-xl md:mb-4"><Link href="https://www.linkedin.com/in/abhyuday-shukla-14b0b0237/">🔗 Linkedin</Link></p>
        <p className="mt-12 mb-12 text-blue-400 text-xl md:mt-4 md:mb-4"><Link href="https://github.com/0x0-abd">🔗 GitHub</Link></p>
        <p className="mt-12 mb-12 text-blue-400 text-xl md:mt-4 md:mb-4"><Link href="https://leetcode.com/nightdesert326/">🔗 LeetCode</Link></p>
        <p className="mt-12 mb-12 text-blue-400 block text-xl md:mt-4 md:mb-4"><Link href="mailto:nightdesert326@gmail.com">🔗 Email</Link><span className=" text-white float-right overflow-hidden">nightdesert326@gmail.com</span></p>
        <p className="mt-12 mb-12 text-blue-400 block text-xl md:mt-4 md:mb-4 ">📞 Phone
        <span className="float-right text-white duration-300 opacity-1" onClick={() => handleClick()}>{isHidden ? "Click to reveal" : "+91 8604841869"}</span>
        </p>
        
      </div>

    </main>
    </>
  )
}

export default Links