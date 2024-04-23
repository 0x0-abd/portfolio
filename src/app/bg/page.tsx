import React from 'react'
import Link from 'next/link'

function BackgroundPage() {
    return (
        <div className="m-3 stroke-gray-700 absolute hover:scale-125 hover:stroke-gray-800 transform transition duration-200">
            <Link href="/">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-left" width="58" height="58" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 12l14 0" />
                    <path d="M5 12l6 6" />
                    <path d="M5 12l6 -6" />
                </svg>
            </Link>
        </div>
    )
}

export default BackgroundPage