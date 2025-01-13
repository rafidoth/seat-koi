import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";

import { inter } from "@/app/ui/fonts"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import Link from "next/link";

export default function BuiltBy() {
  return (<HoverCard>
    <HoverCardTrigger asChild>
      <Button className={`${inter.className} font-bold  mx-1`} variant="link">made by @rafidoth</Button>
    </HoverCardTrigger>
    <HoverCardContent className="w-80">
      <div className={`flex justify-between space-x-4 ${inter.className}`}>
        <Avatar>
          <AvatarImage src="https://raw.githubusercontent.com/rafidoth/linux-dots/refs/heads/main/rafidoth.png" />
          <AvatarFallback>rafidoth</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">@rafidoth</h4>
          <p className="text-sm">
            Thanks for using this app! I hope it helps you plan your exams. If you have any feedback or suggestions, feel free to reach out to me on socials.
          </p>
          <div className="flex items-center pt-2">
            <span className="flex gap-x-2 text-xs text-muted-foreground">
              <Link href="mailto:rafiulhasan803@gmail.com?subject=Feedback%20regarding%20Seat-koi" target="_blank">
                <BiLogoGmail />
              </Link>
              <Link href="https://github.com/rafidoth" target="_blank"><FaGithub /></Link>
              <Link href="https://www.linkedin.com/in/rafidoth/" target="_blank"><FaLinkedin /></Link>
              <Link href=""></Link>
            </span>
          </div>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>)
}
