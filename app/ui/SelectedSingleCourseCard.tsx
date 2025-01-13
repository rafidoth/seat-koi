import { inter } from "@/app/ui/fonts"
import { Button } from "@/components/ui/button"

import { Course } from "@/app/lib/definitions"

interface SelectedSingleCourseCardProps {
  exam: Course
  removeCourse: (course: Course) => void
}

export default function SelectedSingleCourseCard({ exam, removeCourse }: SelectedSingleCourseCardProps) {
  return (
    <div className={`${inter.className} flex flex-col gap-y-3 my-4`}>
      <div>
        <strong>{exam.name} ({exam.code})</strong>
      </div>
      <div>
        {exam.teacher} (exam.section)
      </div>
      <div>
        {exam.date} {exam.time}
      </div>
      <div>
        {exam.room}
      </div>
      <div className={`flex justify-center`}>
        <Button className={``} variant={`destructive`} size={`lg`} onClick={() => {
          removeCourse(exam)
        }}>Remove Course</Button>
      </div>
    </div>
  )
}
