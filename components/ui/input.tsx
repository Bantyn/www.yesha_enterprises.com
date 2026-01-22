import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full rounded-md border border-gray-200 bg-gray-50 px-3 text-sm font-medium",
        "focus:border-purple-600 focus:ring-1 focus:ring-purple-600 focus:bg-white focus:outline-none",
        "transition-all duration-200",
        "dark:bg-[#140A35] dark:border-white/10 dark:text-white dark:focus:border-purple-500",
        className
      )}

      {...props}
    />
  )
}

export { Input }
