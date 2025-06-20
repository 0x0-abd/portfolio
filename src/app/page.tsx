"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [logoHover, setLogoHover] = useState(false);
  const [logoClicked, setLogoClicked] = useState(false);
  return (
    <>
      {logoClicked &&
        <div className="m-3 stroke-gray-700 absolute hover:scale-125 hover:stroke-gray-800 transform transition duration-200 z-10">
          <div className="fixed block cursor-pointer" onClick={() => setLogoClicked(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-left" width="58" height="58" viewBox="0 0 24 24" stroke-width="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 12l14 0" />
              <path d="M5 12l6 6" />
              <path d="M5 12l6 -6" />
            </svg>
          </div>
          <title>Abhyuday Shukla | Background</title>
        </div>
      }
      {!logoClicked && (
        <div
          className="intro-nav-logo fixed block origin-center cursor-pointer"
          onMouseEnter={() => setLogoHover(true)}
          onMouseLeave={() => setLogoHover(false)}
          onClick={() => setLogoClicked(true)}
        // href="/bg" 
        />
      )}
      <div id="intro" className='intro-home'>
        <svg xmlns="http://www.w3.org/2000/svg" className="fixed z-10 top-0 left-0 bottom-0 right-0 fill-none pointer-events-none h-full w-full" baseProfile="full" version="1.1">
          <defs>
            <clipPath id="clip-logo">
              <circle cx="150" cy="150" r="150.5" style={{ strokeWidth: "0" }}></circle>
            </clipPath>
            {/* <path id="path-logo" d="M73.91,93.77c6.71,0,15.62-2.6,20.76-7.68,10.81-10.67,10-29.63-1.48-39.91a26.62,26.62,0,0,0-35.54.25A27.33,27.33,0,0,0,49.06,66 M73.91,93.77c0-6.7-2.88-15-8-20.14-10.29-10.41-29.11-10.31-39.53,0a26.5,26.5,0,0,0-.23,37.47c5.08,5.15,12.74,7.77,19.44,7.87 M73.91,93.77c-6.7,0-15.61,2.59-20.75,7.67-10.42,10.29-9.87,28.49.41,38.9a26.49,26.49,0,0,0,37.48.23,27.65,27.65,0,0,0,7.87-19 M73.91,93.77c0,6.7,2.89,15,8,20.13,10.29,10.42,29,10.17,39.38-.11a26.51,26.51,0,0,0,.23-37.48,28.11,28.11,0,0,0-19.17-7.87l0,0a26.27,26.27,0,0,1-7.61,17.62C89.53,91.17,80.62,93.75,73.91,93.77Z" transform="translate()" />
                    <path id="path-logo " d="M73.91,93.77c6.71,0,15.62-2.6,20.76-7.68a26.27,26.27,0,0,0,7.61-17.62" transform="translate(-17.55 -38.51)" />
                    <path id="path-logo " d="M73.89,93.76c4.79,4.69,13,9.1,20.18,9.09,15.19,0,27.91-14.1,26.93-29.5A26.65,26.65,0,0,0,95.49,48.6a27.38,27.38,0,0,0-19.84,7.93" transform="translate(-17.55 -38.51)" />
                    <path id="path-logo " d="M73.89,93.76c4.68-4.79,8.45-12.71,8.44-19.94,0-14.64-13.53-27.76-28.16-27.73A26.49,26.49,0,0,0,27.72,72.64c0,7.23,3.64,14.47,8.34,19.24" transform="translate(-17.55 -38.51)" />
                    <path id="path-logo " d="M73.89,93.76c-4.79-4.68-13-9.1-20.18-9.08-14.64,0-27,13.38-27,28a26.5,26.5,0,0,0,26.56,26.44,27.57,27.57,0,0,0,18.91-8" transform="translate(-17.55 -38.51)" />
                    <path id="path-logo " d="M73.89,93.76c-4.69,4.79-8.46,12.72-8.44,19.95,0,14.63,13.51,27.55,28.15,27.52a26.5,26.5,0,0,0,26.45-26.55,28.16,28.16,0,0,0-8.15-19.06h-.05a26.33,26.33,0,0,1-17.78,7.23C86.84,102.86,78.68,98.45,73.89,93.76Z" transform="translate(-17.55 -38.51)" />
                    <path id="path-logo " d="M73.89,93.76c4.79,4.69,13,9.1,20.18,9.09a26.33,26.33,0,0,0,17.78-7.23 " transform="translate(-17.55 -38.51)" /> */}
            <path id="path-logo" d="M 204.795 58.9625 a 57.87 57.87 90 0 0 -5.58 -5.6925 a 59.895 59.895 90 0 0 -79.965 0.5625 M 51.75 112.445 a 32.5125 32.5125 90 0 0 -2.745 2.5425 A 59.58 59.58 90 0 0 48.4875 199.34 M 107.775 262.655 c 0.7425 0.8325 1.5075 1.665 2.25 2.475 a 59.625 59.625 90 0 0 84.33 0.5175 M 258.9525 208.4975 c 1.1925 -0.99 2.25 -2.025 3.42 -3.1275 a 59.58 59.58 90 0 0 0.5175 -84.3075 q -0.8775 -0.9 -1.8225 -1.755 M 155.6325 160.55 c 10.7775 10.5525 29.25 20.475 45.405 20.4525 c 34.1775 0 62.7975 -31.725 60.5925 -66.375 A 59.9625 59.9625 90 0 0 204.2325 58.94 a 61.605 61.605 90 0 0 -44.64 17.8425 M 155.6325 160.55 c 10.53 -10.7775 19.0125 -28.5975 18.99 -44.865 c 0 -32.94 -30.4425 -62.46 -63.36 -62.3925 A 59.6025 59.6025 90 0 0 51.75 113.03 c 0 16.2675 8.19 32.5575 18.765 43.29 M 155.6325 160.55 c -10.7775 -10.53 -29.25 -20.475 -45.405 -20.43 c -32.94 0 -60.75 30.105 -60.75 63 a 59.625 59.625 90 0 0 59.76 59.49 a 62.0325 62.0325 90 0 0 42.5475 -18 M 155.6325 160.55 c -10.5525 10.7775 -19.035 28.62 -18.99 44.8875 c 0 32.9175 30.3975 61.9875 63.3375 61.92 a 59.625 59.625 90 0 0 59.5125 -59.7375 a 63.36 63.36 90 0 0 -18.3375 -42.885 h -0.1125 a 59.2425 59.2425 90 0 1 -40.005 16.2675 C 184.77 181.025 166.41 171.1025 155.6325 160.55 Z M 155.6325 160.55 c 10.7775 10.5525 29.25 20.475 45.405 20.4525 a 59.2425 59.2425 90 0 0 40.005 -16.2675"
              transform-origin="155.6325 160.55"
              style={{
                scale: logoHover ? '1.1' : '1',
                opacity: logoClicked ? 0 : 1,
                transition: 'scale 0.4s ease-in-out, opacity 0.4s ease-in-out'
              }}
            />
            <g id="def-starcircle">
              <path id="path-logo-2" d="M 95.8333 -0 C 98.9824 -0.1312 102.0497 2.8863 105.1971 3.055 c 3.1473 0.1687 6.5196 -2.5036 9.6367 -2.0365 c 3.117 0.4671 5.5578 4.0106 8.6164 4.7719 c 3.0585 0.7613 6.8756 -1.2245 9.8479 -0.1759 c 2.9723 1.0486 4.6984 4.99 7.5576 6.3164 c 2.8592 1.3264 6.9831 0.0989 9.7033 1.691 c 2.7201 1.5922 3.6691 5.789 6.2256 7.6325 c 2.5565 1.8435 6.8382 1.4186 9.2079 3.4968 c 2.3697 2.0782 2.5072 6.3787 4.6686 8.6728 c 2.1614 2.294 6.4462 2.6871 8.3797 5.1762 c 1.9335 2.4891 1.2547 6.738 2.9429 9.3996 c 1.6882 2.6616 5.8211 3.8585 7.2487 6.6685 c 1.4275 2.81 -0.0431 6.8537 1.1109 9.7867 c 1.154 2.933 4.9857 4.8904 5.8556 7.9199 c 0.8699 3.0294 -1.3394 6.7217 -0.7613 9.82 c 0.578 3.0984 3.9701 5.7456 4.251 8.8849 c 0.2809 3.1393 -2.5873 6.3467 -2.606 9.4985 c -0.0187 3.1518 2.811 6.3931 2.4927 9.5289 c -0.3183 3.1357 -3.7416 5.7424 -4.3565 8.8336 c -0.6149 3.0913 1.5503 6.8096 0.6443 9.8284 c -0.906 3.0188 -4.7608 4.9305 -5.9496 7.8495 c -1.1888 2.919 0.2335 6.9799 -1.2274 9.7727 c -1.4609 2.7928 -5.6078 3.9404 -7.3276 6.5817 c -1.7198 2.6413 -1.0917 6.898 -3.0547 9.3638 c -1.9631 2.4659 -6.2522 2.8079 -8.4408 5.076 c -2.1886 2.2681 -2.3774 6.5667 -4.7716 8.6165 c -2.3943 2.0498 -6.6706 1.5739 -9.2489 3.3869 c -2.5783 1.8129 -3.5772 5.9981 -6.3161 7.5578 c -2.7389 1.5596 -6.848 0.2831 -9.7227 1.5753 c -2.8748 1.2922 -4.6477 5.2128 -7.6323 6.2259 c -2.9846 1.0131 -6.7778 -1.018 -9.8451 -0.2932 c -3.0674 0.7248 -5.5502 4.239 -8.6726 4.6689 c -3.1224 0.43 -6.4626 -2.2823 -9.6117 -2.1511 c -3.1491 0.1312 -6.2521 3.112 -9.3995 2.9433 c -3.1473 -0.1687 -5.9139 -3.4642 -9.0309 -3.9313 c -3.117 -0.4671 -6.7281 1.8725 -9.7866 1.1112 c -3.0585 -0.7613 -5.1514 -4.5208 -8.1237 -5.5694 c -2.9723 -1.0486 -6.9609 0.5654 -9.8201 -0.761 c -2.8592 -1.3264 -4.2028 -5.414 -6.9229 -7.0061 C 48.2378 182.1945 44.0158 183.0245 41.4593 181.181 C 38.9028 179.3375 38.3571 175.0694 35.9874 172.9913 C 33.6178 170.9131 29.315 170.929 27.1536 168.635 C 24.9922 166.341 25.2641 162.0468 23.3305 159.5578 C 21.397 157.0687 17.169 156.27 15.4808 153.6084 C 13.7926 150.9468 14.8722 146.7817 13.4447 143.9717 C 12.0171 141.1617 8.0167 139.5773 6.8627 136.6443 C 5.7087 133.7113 7.5571 129.8258 6.6871 126.7964 C 5.8172 123.7669 2.1889 121.4541 1.6108 118.3557 C 1.0328 115.2574 3.5831 111.7918 3.3022 108.6525 C 3.0213 105.5132 -0.1038 102.5555 -0.085 99.4038 C -0.0662 96.252 3.0938 93.3317 3.4121 90.196 C 3.7304 87.0603 1.2216 83.5646 1.8365 80.4733 C 2.4514 77.382 6.107 75.1126 7.013 72.0938 C 7.919 69.075 6.1171 65.1677 7.3059 62.2486 C 8.4947 59.3296 12.5138 57.793 13.9747 55.0002 C 15.4356 52.2074 14.4057 48.0297 16.1255 45.3884 C 17.8453 42.7471 22.0825 41.9989 24.0456 39.533 C 26.0086 37.0671 25.788 32.77 27.9765 30.5019 C 30.1651 28.2338 34.4674 28.301 36.8616 26.2512 C 39.2559 24.2014 39.8524 19.9402 42.4307 18.1273 C 45.009 16.3144 49.2207 17.1946 51.9597 15.635 C 54.6986 14.0753 56.0908 10.004 58.9656 8.7118 C 61.8403 7.4196 65.8094 9.081 68.794 8.0678 C 71.7786 7.0547 73.9161 3.3205 76.9835 2.5957 C 80.0509 1.8709 83.6338 4.2534 86.7562 3.8234 C 89.8786 3.3934 92.6842 0.1312 95.8333 -0 Z
              " transform-origin="100 100"
                style={{
                  scale: logoClicked ? '10' : logoHover ? '1.05' : '1',
                  transition: logoClicked
                    ? 'scale 0.5s ease-in-out'   // longer transition for click
                    : 'scale 0.4s ease-in-out',
                }}
              ></path>
            </g>
            <mask id="mask-main-dark-inner" className="force-dark">
              <rect className="fill-black w-screen h-screen"></rect>
              <g className="intro-fadeout">
                <rect className="mask-main-bg w-screen h-screen fill-white"></rect>
              </g>
              <g className="intro-wrap intro-fadeout">
                <g className="introicon-wrap1 ">
                  <g className="introicon-wrap2">
                    <g className="introicon-bg">
                      <g className="introicon-sub1">
                        <use xlinkHref="#def-starcircle" className="introicon-sub2 main fill-white stroke-black"></use>
                      </g>
                    </g>
                  </g>
                  <g className="logo-intro stroke-black logo-rotation-origin" style={{ transform: "scale(0.8)", strokeWidth: "10" }}>
                    <use xlinkHref="#path-logo" className="introicon-main stroke-white" transform-origin="166.252 210.96" clipPath="url(#clip-logo)"></use>
                  </g>
                </g>
                <g className="intropart-wrap">
                  <g className="intropart introtexts">
                    <text className="header">Abhyuday Shukla</text>
                    {/* <text className="header">Abhyuday Shukla</text> */}
                    <text className="subheader">Creative Full-Stack Developer & Designer </text>
                  </g>
                </g>

              </g>
            </mask>


          </defs>
          <g className="intro-masked-wrap">
            <rect className="intro-masked lght" width="100%" height="100%" mask="url(#mask-main-lght)"></rect>
            <rect className="intro-masked dark" width="100%" height="100%" mask="url(#mask-main-dark-inner)"></rect>
          </g>
        </svg>
      </div>

      <main className="home-main flex min-h-screen flex-col items-center justify-end p-2">
        {/* <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            Get started by editing&nbsp;
            <code className="font-mono font-bold">src/app/page.tsx</code>
          </p>

          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <a
              className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
              href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{" "}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className="dark:invert"
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div> */}
        {/* <div className="grid text-center mb-12 lg:max-w-2xl lg:grid-cols-2 lg:text-left">
          <h2 className="mb-3 fixed z-10 text-white font-poppins content-center text-5xl"><Link href="/bg">0x0abd</Link></h2>
          <div className="logo-div h-48 w-48">

            <svg id="Layer_1" className="logo logo-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112.59 110.71">
              <defs>
                <linearGradient id="MyGradient">
                  <stop offset="5%" stopColor="#F60" />
                  <stop offset="95%" stopColor="#FF6" />
                </linearGradient>
              </defs>
              <path className="cls-1" d="M73.91,93.77c6.71,0,15.62-2.6,20.76-7.68,10.81-10.67,10-29.63-1.48-39.91a26.62,26.62,0,0,0-35.54.25A27.33,27.33,0,0,0,49.06,66" transform="translate(-17.55 -38.51)" />
              <path className="cls-1 " d="M73.91,93.77c0-6.7-2.88-15-8-20.14-10.29-10.41-29.11-10.31-39.53,0a26.5,26.5,0,0,0-.23,37.47c5.08,5.15,12.74,7.77,19.44,7.87" transform="translate(-17.55 -38.51)" />
              <path className="cls-1 " d="M73.91,93.77c-6.7,0-15.61,2.59-20.75,7.67-10.42,10.29-9.87,28.49.41,38.9a26.49,26.49,0,0,0,37.48.23,27.65,27.65,0,0,0,7.87-19" transform="translate(-17.55 -38.51)" />
              <path className="cls-1 " d="M73.91,93.77c0,6.7,2.89,15,8,20.13,10.29,10.42,29,10.17,39.38-.11a26.51,26.51,0,0,0,.23-37.48,28.11,28.11,0,0,0-19.17-7.87l0,0a26.27,26.27,0,0,1-7.61,17.62C89.53,91.17,80.62,93.75,73.91,93.77Z" transform="translate(-17.55 -38.51)" />
              <path className="cls-2 " d="M73.91,93.77c6.71,0,15.62-2.6,20.76-7.68a26.27,26.27,0,0,0,7.61-17.62" transform="translate(-17.55 -38.51)" />
              <path className="cls-1 " d="M73.89,93.76c4.79,4.69,13,9.1,20.18,9.09,15.19,0,27.91-14.1,26.93-29.5A26.65,26.65,0,0,0,95.49,48.6a27.38,27.38,0,0,0-19.84,7.93" transform="translate(-17.55 -38.51)" />
              <path className="cls-1 " d="M73.89,93.76c4.68-4.79,8.45-12.71,8.44-19.94,0-14.64-13.53-27.76-28.16-27.73A26.49,26.49,0,0,0,27.72,72.64c0,7.23,3.64,14.47,8.34,19.24" transform="translate(-17.55 -38.51)" />
              <path className="cls-1 " d="M73.89,93.76c-4.79-4.68-13-9.1-20.18-9.08-14.64,0-27,13.38-27,28a26.5,26.5,0,0,0,26.56,26.44,27.57,27.57,0,0,0,18.91-8" transform="translate(-17.55 -38.51)" />
              <path className="cls-1 " d="M73.89,93.76c-4.69,4.79-8.46,12.72-8.44,19.95,0,14.63,13.51,27.55,28.15,27.52a26.5,26.5,0,0,0,26.45-26.55,28.16,28.16,0,0,0-8.15-19.06h-.05a26.33,26.33,0,0,1-17.78,7.23C86.84,102.86,78.68,98.45,73.89,93.76Z" transform="translate(-17.55 -38.51)" />
              <path className="cls-2 " d="M73.89,93.76c4.79,4.69,13,9.1,20.18,9.09a26.33,26.33,0,0,0,17.78-7.23" transform="translate(-17.55 -38.51)" />
            </svg>
          </div>

        </div> */}
      </main>
    </>
  );
}
