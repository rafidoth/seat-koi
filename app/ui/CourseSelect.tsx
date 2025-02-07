"use client"

import { useDebounce } from "@/app/lib/useDebounce"
import { data } from "@/app/lib/data"
import React from "react"
import { Input } from "@/components/ui/input"
import { inter } from "@/app/ui/fonts"
import SingleExamCard from "@/app/ui/SingleExamCard"
import { Course } from "@/app/lib/definitions"

interface CourseSelectionProps {
  updateSelectedCourses: (course: Course) => void
  setSearching: (searching: boolean) => void
  removeCourse: (course: Course) => void
  searching: boolean
}

export default function CourseSelect({ updateSelectedCourses, searching, setSearching, removeCourse }: CourseSelectionProps) {
  const [search, setSearch] = React.useState<string>("");
  const [searchedCourses, setSearchedCourses] = React.useState<Course[]>([]);
  const debouncedSearch = useDebounce(search, 500);
  React.useEffect(() => {
    if (debouncedSearch === "") {
      setSearchedCourses([]);
      return;
    }
    const searchedData: Course[] = [];
    const uniqueNames = new Set<string>();
    data.some((item) => {
      if (
        (item["Course Title"]
          .trim()
          .toLowerCase()
          .includes(debouncedSearch.trim().toLowerCase()) ||
          item["Course Code"]
            .trim()
            .toLowerCase()
            .includes(debouncedSearch.trim().toLowerCase()))
        && !uniqueNames.has(item["Course Title"])
      ) {
        uniqueNames.add(item["Course Title"]);
        searchedData.push({
          dept: item["Dept."],
          name: item["Course Title"],
          code: item["Course Code"],
          section: item["Section"],
          teacher: item["Teacher"],
          date: item["Exam Date"],
          time: item["Exam Time"],
          room: item["Room"],
        });
        setSearching(true);
      }
    });
    setSearchedCourses(searchedData)
  }, [debouncedSearch, searching])



  return (
    <>
      <div
        className={`w-5/6 lg:w-4/12`}
      >
        <Input
          type="text"
          className={`w-full md:text-xl h-12 my-10 ${inter.className} `}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search to add courses"
        />
        {searchedCourses.length !== 0 &&
          <div className="text-lg font-semibold my-5">
            Search Results
          </div>}

      </div>
      <div className="w-full flex justify-center">
        <div className={` grid gap-3 m-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3`}>
          {searchedCourses.map(item => <SingleExamCard key={item.name} removeCourse={removeCourse} updateSelection={updateSelectedCourses} ExamData={item} />)}
        </div>
      </div>
    </>
  )

}
