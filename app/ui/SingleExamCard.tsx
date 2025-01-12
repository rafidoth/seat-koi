"use client"
import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { inter } from "@/app/ui/fonts"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Course, Data } from "@/app/lib/definitions"
import { data } from '@/app/lib/data';

interface SingleExamCardProps {
  ExamData: Course
  updateSelection: (course: Course) => void
  removeCourse: (course: Course) => void
}
const getSectionList = function(data: Data[], course: Course) {
  const sectionList = new Set<string>();
  const filteredBasedOnCourse = data.filter(item => item['Course Title'] === course.name);
  filteredBasedOnCourse.forEach(item => sectionList.add(item.Section));
  return Array.from(sectionList);
}

const checkAllFields = function(course: Course) {
  return Object.values(course).every(value => value !== "");
}

export default function SingleExamCard({ ExamData, updateSelection, removeCourse }: SingleExamCardProps) {
  const [selected, setSelected] = React.useState<boolean>(false);
  const [exam, setExam] = React.useState<Course>({
    dept: ExamData.dept,
    name: ExamData.name,
    code: ExamData.code,
    section: "",
    teacher: "",
    date: "",
    time: "",
    room: "",
  });
  const [section, setSection] = React.useState<string>("");
  React.useEffect(() => {
    const filteredData = data.filter(item => item['Course Title'] === exam.name && item.Section === section);
    if (filteredData.length > 0) {
      setExam({
        dept: exam.dept,
        name: exam.name,
        code: exam.code,
        section: section,
        teacher: filteredData[0].Teacher,
        date: filteredData[0]['Exam Date'],
        time: filteredData[0]['Exam Time'],
        room: filteredData[0].Room,
      });
    }
  }, [section]);
  return (
    <Card className={`${inter.className} w-1/4`}>
      <CardHeader>
        <p className={`text-xl flex justify-between`}>
          <span><strong> {exam.name} </strong></span>
          <span>{exam.code}</span>
        </p>
        <div className={`text-lg flex justify-between`}>
          {exam.teacher !== "" &&
            <span>Course Teacher <strong>{exam.teacher}</strong></span>
          }
          <span>
            <Select value={section} onValueChange={setSection}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Section" />
              </SelectTrigger>
              <SelectContent>
                {getSectionList(data, ExamData).map(
                  (section, index) => <SelectItem
                    key={index}
                    value={section}
                  >{section}</SelectItem>)}
              </SelectContent>
            </Select>
          </span>

        </div>
        <CardDescription ></CardDescription>
      </CardHeader>
      <CardContent>
        {exam.date !== "" &&
          <p className={`text-lg flex items-center gap-x-4 my-2`}> Exam Date<span className={`bg-orange-600 px-1 rounded`}><strong>{exam.date}</strong></span></p>
        }
        {exam.time !== "" &&
          <p className={`text-lg flex items-center gap-x-4 my-2`}> Exam Time <span className={`bg-orange-600 px-1 rounded`}><strong>{exam.time}</strong></span></p>
        }
        {
          exam.room !== "" &&
          <p className={`text-lg flex items-center gap-x-4`}> Room Range with Id<span className={`px-1 rounded`}><strong>{exam.room}</strong></span></p>
        }
      </CardContent>
      <CardFooter>
        {checkAllFields(exam) && !selected &&
          < Button className={``} variant={`outline`} size={`lg`} onClick={() => {
            updateSelection(exam)
            setSelected(true)
          }}>Add Course</Button>
        }

        {selected &&
          <Button className={``} variant={`destructive`} size={`lg`} onClick={() => {
            removeCourse(exam)
            setSelected(false)
          }}>Remove Course</Button>
        }
      </CardFooter>
    </Card >
  );
}
