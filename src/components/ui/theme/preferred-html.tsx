/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/html-has-lang */
import { cn } from "@/utils/tailwind-utils"
import { HTMLAttributes } from "react"

export interface PreferredHTMLProps extends HTMLAttributes<HTMLElement> {}

const PreferredHTML = (props: PreferredHTMLProps) => {
  return <html {...props} className={cn("antialiased", props?.className)} suppressHydrationWarning />
}

export default PreferredHTML
