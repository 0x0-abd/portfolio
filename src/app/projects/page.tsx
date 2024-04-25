import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Projects() {
  return (
    <>
      <title>Abhyuday Shukla | Projects</title>
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
        <div className="z-10 max-w-4xl mt-20 w-11/12 items-center justify-between font-mono text-lg lg:flex lg:flex-col">
          <div>
            <Link href="https://github.com/0x0-abd/ISDL">
              <div className="font-poppins duration-200 text-3xl relative font-extrabold md:text-4xl hover:scale-110 hover:[&>p]:opacity-0">
                <div className="text-xl font-poppins duration-200 absolute text-cyan-400 top-5 left-10 font-semibold md:text-2xl lg:text-3xl">Grocery and Fruits Shop</div>
                <p className="opacity-5">Grocery and Fruits Shop</p>
              </div>
            </Link>
            <div className='flex flex-col mt-8 space-x-6 items-center md:flex-row'>
              <div className="w-9/12 md:w-6/12 lg:w-5/12 ">
                <Link href="https://github.com/0x0-abd/ISDL">
                  <Image
                    className="duration-200 blur-[1.5px] hover:blur-[1px] rounded-xl"
                    src="/gfc.png"
                    alt="Grocery and Fruits Shop"
                    height={1200}
                    width={1200}
                  />
                </Link>
              </div>
              <div className='w-full md:w-6/12 lg:w-7/12 pt-2'>
                A full-stack grocery website created using React, Bootstrap, NodeJs and MongoDB.
                Customers can browse through products via category and order them from cart.
                Admins can confirm the order and add new products.
              </div>
            </div>
          </div>

          <div className="pt-6">
            <Link href="https://github.com/0x0-abd/Hyperspectral-Image-Analysis">
              <div className="font-poppins duration-200 text-3xl relative font-extrabold md:text-4xl hover:scale-110 hover:[&>p]:opacity-0">
                <div className="text-xl font-poppins absolute text-emerald-400 top-5 left-10 font-semibold md:text-2xl lg:text-3xl">HyperSpectral Image Analysis</div>
                <p className="opacity-5">HyperSpectral Image Analysis</p>
              </div>
            </Link>
            <div className='flex flex-col mt-8 space-x-6 items-center md:flex-row'>
              <div className="w-9/12 md:w-6/12 lg:w-5/12 ">
                <Link href="https://github.com/0x0-abd/Hyperspectral-Image-Analysis">
                  <Image
                    className="duration-200 blur-[1.5px] hover:blur-[1px] rounded-xl"
                    src="/hsi.png"
                    alt="Hyperspectral Image Analysis"
                    height={1200}
                    width={1200}
                  />
                </Link>
              </div>
              <div className='w-full md:w-6/12 lg:w-7/12 pt-2'>
                Hyperspectral Images have a huge potential in areas of Remote Sensing and Medical Diagnosis.
                We created a Rough Set based Feature Selection method to overcome high dimentionality of these datasets with promising accuracy.
              </div>
            </div>
          </div>

        </div>

      </main>
    </>
  )
}

export default Projects