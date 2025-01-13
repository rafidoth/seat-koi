"use client"
import { inter, jetbrains } from '@/app/ui/fonts';
import CourseSelect from '@/app/ui/CourseSelect';
import CourseTable from '@/app/ui/CourseTable';
import { PiChair } from "react-icons/pi";
import { Course } from '@/app/lib/definitions';
import React from 'react';
import { TbPackageExport } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import jsPDF from 'jspdf';
import BuiltBy from '@/app/ui/BuiltBy';


import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import SelectedSingleCourseCard from './ui/SelectedSingleCourseCard';

const TableKeys = ["Dept", "Course", "Code", "Section", "Teacher", "Date", "Time", "Room"];

export default function Home() {
  const [selectedCourses, setSelectedCourses] = React.useState<Course[]>([]);
  const [searching, setSearching] = React.useState<boolean>(false);
  const tableRef = React.useRef<HTMLDivElement>(null);
  const handleSelection = function(course: Course) {
    if (!selectedCourses.some(item => item.name === course.name)) {
      setSelectedCourses([...selectedCourses, course]);
    }
  }

  const removeCourse = function(course: Course) {
    setSelectedCourses(selectedCourses.filter(item => item.name !== course.name));
  }
  const exportPDF = () => {
    if (tableRef.current) {
      const doc = new jsPDF("p", "mm", "a4");
      doc.html(tableRef.current, {
        callback: function(doc) {
          doc.save("fall24_mid.pdf");
        },
        x: 10,
        y: 10,
      });
    }
  };
  return (
    <div className="relative min-h-screen flex flex-col items-center text-white">
      <div className="fixed inset-0 -z-10 before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_left,_#fa7b007f_0%,_transparent_28%)] before:opacity-100 "></div>
      <div className="hidden">
        <div ref={tableRef}>
          <CourseTable selectedCourses={selectedCourses} />
        </div>
      </div>
      <main className="flex-grow w-full flex flex-col items-center">
        <div className={`w-full h-[100px] sticky top-0 flex flex-col items-center`}>
          <div className={` h-full relative w-full mx-2 md:w-1/2 flex justify-between items-center `}>
            <div className={inter.className}>
              <BuiltBy />
            </div>

            <Drawer>
              <DrawerTrigger>
                <button
                  className={`flex justify-center items-center mx-4`}>
                  <span><TbPackageExport size={"40px"} /></span>
                  {selectedCourses.length !== 0 &&
                    <span className={`bg-orange-600 w-5 h-5 rounded-full ${inter.className} flex justify-center items-center `}><strong>{selectedCourses.length}</strong></span>
                  }
                </button>
              </DrawerTrigger>
              <DrawerContent >
                <DrawerHeader className={`w-full flex justify-center`}>
                  <div className={`flex flex-col items-center`}>
                    <DrawerTitle className={`text-2xl`}>Fall 2024 Mid Term Exam</DrawerTitle>
                    <DrawerDescription className={`text-xl`}>United International University</DrawerDescription>
                    <div className={`hidden lg:block`}>
                      <Table >
                        <TableHeader>
                          <TableRow>
                            {TableKeys.map((heading, index) => {
                              return <TableHead key={index} className={`${inter.className} text-xl`}>{heading}</TableHead>
                            })}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedCourses.map((course, index) => {
                            return <TableRow key={index} className={`${inter.className} text-xl`}>
                              <TableCell>{course.dept}</TableCell>
                              <TableCell>{course.name}</TableCell>
                              <TableCell>{course.code}</TableCell>
                              <TableCell>{course.section}</TableCell>
                              <TableCell>{course.teacher}</TableCell>
                              <TableCell>{course.date}</TableCell>
                              <TableCell>{course.time}</TableCell>
                              <TableCell>{course.room}</TableCell>
                            </TableRow>
                          })}
                        </TableBody>
                      </Table>
                    </div>
                    <div className={`block lg:hidden`}>
                      {selectedCourses.map((course, index) => {
                        return <SelectedSingleCourseCard key={index} removeCourse={removeCourse} exam={course} />
                      })}
                    </div>
                  </div>
                </DrawerHeader>
                <DrawerFooter >
                  <div className={`${inter.className} w-full md:text-lg gap-y-10 flex flex-col justify-center items-center`}>
                    <Button variant="secondary" onClick={exportPDF}>Export As PDF</Button>
                    <p className={`md:w-1/4  text-center`}><strong>
                      This app is in its early stages and may have errors. Please verify information independently. Use with caution.
                    </strong></p>
                    <DrawerClose>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </div>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>

          </div>
        </div>
        <Hero searching={searching} />
        <CourseSelect searching={searching} setSearching={setSearching} updateSelectedCourses={handleSelection} removeCourse={removeCourse} />
      </main >
    </div >)
}


interface HeroProps {
  searching: boolean;
}

function Hero({ searching }: HeroProps) {
  return (
    <div
      className={clsx(
        " flex flex-col items-center justify-end",
        {
          'md:h-[200px]': searching,
          'md:h-[500px]': !searching,
        }
      )}
    >

      <div
        className={`text-6xl md:text-8xl font-bold text-center flex  p-4 ${jetbrains.className}`}
      ><span>Sea</span> <PiChair color={"#ea580c"} /> <span>Koi</span></div>
      <div
        className={`text-sm text-center mx-2 md:text-2xl my-3 ${inter.className}`}
      >Exam Room finder for the students of <strong>United International University</strong>.</div>
      <div>
        <span className={`text-[10px] md:text-lg font-bold ${inter.className} flex items-center justify-center bg-orange-600 px-2 py-1 rounded-full`}>Updated Fall 2024</span>
      </div>
    </div>
  )
}
