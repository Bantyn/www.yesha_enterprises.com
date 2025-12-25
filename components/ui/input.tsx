import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
     className={cn(
  "h-10 w-full rounded-md border-2 border-neutral-200 bg-neutral-50 px-3 text-sm font-medium",
  "focus:border-accent focus:bg-white focus:outline-none",
  "transition-colors duration-200",
  "dark:bg-neutral-900 dark:border-neutral-700 dark:text-white",
  className
)}

      {...props}
    />
  )
}

export { Input }
