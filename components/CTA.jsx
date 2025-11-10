import Link from "next/link"


const CTA = ({link, text}) => {
  return (
    <Link href={link} className="py-2 px-4 bg-black text-white">
      {text}
    </Link>
  )
}

export default CTA