"use client";

import React from 'react'

const Bio = ({ content }: { content: string }) => {
  return (
    <div className='mt-2'>
        <p>
            { content }
        </p>
    </div>
  )
}

export default Bio;