"use client"
import { inter, jetbrains } from '@/app/ui/fonts';
import CourseSelect from '@/app/ui/CourseSelect';
import { PiChair } from "react-icons/pi";
import { Course } from '@/app/lib/definitions';
import React from 'react';


export default function Home() {
  const [selectedCourses, setSelectedCourses] = React.useState<Course[]>([]);
  const handleSelection = function(course: Course) {
    if (!selectedCourses.some(item => item.name === course.name)) {
      setSelectedCourses([...selectedCourses, course]);
    }
  }
  return <div className="relative min-h-screen flex flex-col items-center text-white">
    <div className="fixed inset-0 -z-10 before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_left,_#fa7b007f_0%,_transparent_28%)] before:opacity-100"></div>

    <main className="flex-grow w-full flex flex-col items-center">
      <Hero />
      <CourseSelect updateSelectedCourses={handleSelection} />
    </main>
  </div>
}




function Hero() {
  return (
    <div className={`h-[500px] flex flex-col items-center justify-end`}>
      <div
        className={`text-8xl font-bold text-center flex  p-4 ${jetbrains.className}`}
      ><span>Sea</span> <PiChair /><span className="w-10"></span> <span>Koi</span></div>
      <div
        className={`text-2xl my-3 ${inter.className}`}
      >Exam Room finder for the students of <strong>United International University</strong>.</div>
      <div>
        <span className={`text-lg ${inter.className} flex items-center justify-center bg-orange-600 px-2 py-1 rounded-full`}>Updated Fall 2024</span>
      </div>
    </div>
  )
}
