"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

function SplashScreen({ finishLoading }: { finishLoading: any }) {
    const [isMounted, setIsMounted] = useState(false)

    function animate() {

        finishLoading()
    }


    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsMounted(true)
            animate()
        }, 1750)

        return () => clearTimeout(timeout)
    }, [])

    return (
        <>
            
            <div className="flex fixed min-h-screen flex-col items-center justify-center p-3 w-screen h-screen" style={{ backgroundColor: "#11161a" }}>
            <img className='splash-bg-img absolute h-48 w-48 mb-12' src="bg.png"/>
            <svg viewBox="0 0 112.59 110.71" style={{height:"12rem", width:"12rem"}}>
                            <defs>
                                <clipPath className='splash-bg-logo' id="splash-clip" width="0" height="0" clipPathUnits="objectBoundingBox">
                                    <path d="M73.91,93.77c6.71,0,15.62-2.6,20.76-7.68,10.81-10.67,10-29.63-1.48-39.91a26.62,26.62,0,0,0-35.54.25A27.33,27.33,0,0,0,49.06,66 M73.91,93.77c0-6.7-2.88-15-8-20.14-10.29-10.41-29.11-10.31-39.53,0a26.5,26.5,0,0,0-.23,37.47c5.08,5.15,12.74,7.77,19.44,7.87 
                                    M73.91,93.77c-6.7,0-15.61,2.59-20.75,7.67-10.42,10.29-9.87,28.49.41,38.9a26.49,26.49,0,0,0,37.48.23,27.65,27.65,0,0,0,7.87-19 M73.91,93.77c0,6.7,2.89,15,8,20.13,10.29,10.42,29,10.17,39.38-.11a26.51,26.51,0,0,0,.23-37.48,28.11,28.11,0,0,0-19.17-7.87l0,0a26.27,26.27,0,0,1-7.61,17.62C89.53,91.17,80.62,93.75,73.91,93.77Z
                                    M73.91,93.77c6.71,0,15.62-2.6,20.76-7.68a26.27,26.27,0,0,0,7.61-17.62 M73.89,93.76c4.79,4.69,13,9.1,20.18,9.09,15.19,0,27.91-14.1,26.93-29.5A26.65,26.65,0,0,0,95.49,48.6a27.38,27.38,0,0,0-19.84,7.93 
                                    M73.89,93.76c4.68-4.79,8.45-12.71,8.44-19.94,0-14.64-13.53-27.76-28.16-27.73A26.49,26.49,0,0,0,27.72,72.64c0,7.23,3.64,14.47,8.34,19.24 M73.89,93.76c-4.79-4.68-13-9.1-20.18-9.08-14.64,0-27,13.38-27,28a26.5,26.5,0,0,0,26.56,26.44,27.57,27.57,0,0,0,18.91-8
                                    M73.89,93.76c-4.69,4.79-8.46,12.72-8.44,19.95,0,14.63,13.51,27.55,28.15,27.52a26.5,26.5,0,0,0,26.45-26.55,28.16,28.16,0,0,0-8.15-19.06h-.05a26.33,26.33,0,0,1-17.78,7.23C86.84,102.86,78.68,98.45,73.89,93.76Z M73.89,93.76c4.79,4.69,13,9.1,20.18,9.09a26.33,26.33,0,0,0,17.78-7.23" 
                                    transform="translate(-0.15087529976 -0.35484572306) scale(0.0088178, 0.0090326)"/>
                                </clipPath>
                            </defs>
                        </svg>
                <div className='splash-bg absolute'>

                    <div className="grid lg:max-w-2xl mb-12 h-48 w-48 logo-div z-20">
                        <svg id="Layer_1" className="logo logo-spin z-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112.59 110.71">
                            <defs>
                                <linearGradient id="MyGradient">
                                    <stop offset="5%" stopColor="#F60" />
                                    <stop offset="95%" stopColor="#FF6" />
                                </linearGradient>
                            </defs>

                            {/* <path className="cls-1 logo-p1" d="M73.91,93.77c6.71,0,15.62-2.6,20.76-7.68,10.81-10.67,10-29.63-1.48-39.91a26.62,26.62,0,0,0-35.54.25A27.33,27.33,0,0,0,49.06,66" transform="translate(-17.55 -38.51)" />
                            <path className="cls-1 logo-p1" d="M73.91,93.77c0-6.7-2.88-15-8-20.14-10.29-10.41-29.11-10.31-39.53,0a26.5,26.5,0,0,0-.23,37.47c5.08,5.15,12.74,7.77,19.44,7.87" transform="translate(-17.55 -38.51)" />
                            <path className="cls-1 logo-p1" d="M73.91,93.77c-6.7,0-15.61,2.59-20.75,7.67-10.42,10.29-9.87,28.49.41,38.9a26.49,26.49,0,0,0,37.48.23,27.65,27.65,0,0,0,7.87-19" transform="translate(-17.55 -38.51)" />
                            <path className="cls-1 logo-ps" d="M73.91,93.77c0,6.7,2.89,15,8,20.13,10.29,10.42,29,10.17,39.38-.11a26.51,26.51,0,0,0,.23-37.48,28.11,28.11,0,0,0-19.17-7.87l0,0a26.27,26.27,0,0,1-7.61,17.62C89.53,91.17,80.62,93.75,73.91,93.77Z" transform="translate(-17.55 -38.51)" />
                            <path className="cls-2 logo-p1" d="M73.91,93.77c6.71,0,15.62-2.6,20.76-7.68a26.27,26.27,0,0,0,7.61-17.62" transform="translate(-17.55 -38.51)" />
                            <path className="cls-1 logo-p1" d="M73.89,93.76c4.79,4.69,13,9.1,20.18,9.09,15.19,0,27.91-14.1,26.93-29.5A26.65,26.65,0,0,0,95.49,48.6a27.38,27.38,0,0,0-19.84,7.93" transform="translate(-17.55 -38.51)" />
                            <path className="cls-1 logo-p1" d="M73.89,93.76c4.68-4.79,8.45-12.71,8.44-19.94,0-14.64-13.53-27.76-28.16-27.73A26.49,26.49,0,0,0,27.72,72.64c0,7.23,3.64,14.47,8.34,19.24" transform="translate(-17.55 -38.51)" />
                            <path className="cls-1 logo-p1" d="M73.89,93.76c-4.79-4.68-13-9.1-20.18-9.08-14.64,0-27,13.38-27,28a26.5,26.5,0,0,0,26.56,26.44,27.57,27.57,0,0,0,18.91-8" transform="translate(-17.55 -38.51)" />
                            <path className="cls-1 logo-ps" d="M73.89,93.76c-4.69,4.79-8.46,12.72-8.44,19.95,0,14.63,13.51,27.55,28.15,27.52a26.5,26.5,0,0,0,26.45-26.55,28.16,28.16,0,0,0-8.15-19.06h-.05a26.33,26.33,0,0,1-17.78,7.23C86.84,102.86,78.68,98.45,73.89,93.76Z" transform="translate(-17.55 -38.51)" />
                            <path className="cls-2 logo-p1" d="M73.89,93.76c4.79,4.69,13,9.1,20.18,9.09a26.33,26.33,0,0,0,17.78-7.23" transform="translate(-17.55 -38.51)" /> */}
                            <path className="cls-1 logo-p1" d="M 204.795 58.9625 a 57.87 57.87 90 0 0 -5.58 -5.6925 a 59.895 59.895 90 0 0 -79.965 0.5625 M 51.75 112.445 a 32.5125 32.5125 90 0 0 -2.745 2.5425 A 59.58 59.58 90 0 0 48.4875 199.34 M 107.775 262.655 c 0.7425 0.8325 1.5075 1.665 2.25 2.475 a 59.625 59.625 90 0 0 84.33 0.5175 M 258.9525 208.4975 c 1.1925 -0.99 2.25 -2.025 3.42 -3.1275 a 59.58 59.58 90 0 0 0.5175 -84.3075 q -0.8775 -0.9 -1.8225 -1.755 M 155.6325 160.55 c 10.7775 10.5525 29.25 20.475 45.405 20.4525 c 34.1775 0 62.7975 -31.725 60.5925 -66.375 A 59.9625 59.9625 90 0 0 204.2325 58.94 a 61.605 61.605 90 0 0 -44.64 17.8425 M 155.6325 160.55 c 10.53 -10.7775 19.0125 -28.5975 18.99 -44.865 c 0 -32.94 -30.4425 -62.46 -63.36 -62.3925 A 59.6025 59.6025 90 0 0 51.75 113.03 c 0 16.2675 8.19 32.5575 18.765 43.29 M 155.6325 160.55 c -10.7775 -10.53 -29.25 -20.475 -45.405 -20.43 c -32.94 0 -60.75 30.105 -60.75 63 a 59.625 59.625 90 0 0 59.76 59.49 a 62.0325 62.0325 90 0 0 42.5475 -18 M 155.6325 160.55 c -10.5525 10.7775 -19.035 28.62 -18.99 44.8875 c 0 32.9175 30.3975 61.9875 63.3375 61.92 a 59.625 59.625 90 0 0 59.5125 -59.7375 a 63.36 63.36 90 0 0 -18.3375 -42.885 h -0.1125 a 59.2425 59.2425 90 0 1 -40.005 16.2675 C 184.77 181.025 166.41 171.1025 155.6325 160.55 Z M 155.6325 160.55 c 10.7775 10.5525 29.25 20.475 45.405 20.4525 a 59.2425 59.2425 90 0 0 40.005 -16.2675" 
                            transform="translate(-14 -16.58) scale(0.45)"/>
                        </svg>
                        
                    </div>
                </div>

            </div>
        </>
    )
}

export default SplashScreen