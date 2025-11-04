import Link from 'next/link'
import React from 'react'

const Button = ({link='/contact', text, className=''}) => {
  return (
    <Link href={link}>
      <button className={`${className} btn`}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {text}
      </button>
    </Link>
  )
}

export default Button