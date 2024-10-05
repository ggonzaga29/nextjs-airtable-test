"use client";

import { motion } from "framer-motion";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";

const links = [
  {
    href: "/",
    label: "Applicants",
  },
  {
    href: "/accepted-applicants",
    label: "Accepted",
  },
  {
    href: "/rejected-applicants",
    label: "Rejected",
  },
];

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="flex gap-16">
      {links.map(({ href, label }) => {
        const isActive = pathname === href;

        return (
          <Link key={href} href={href} className={cn("relative transition-colors pb-3", isActive
            ? 'text-foreground'
            : 'text-muted-foreground')}>
            {label}

            {
              isActive && <motion.span layoutId="underline" className="w-[150%] bg-primary shadow-xl h-1 block absolute -bottom-[1px] left-[-25%]" />
            }
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
