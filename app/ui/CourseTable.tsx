import React from "react";
import { Course } from "@/app/lib/definitions";

interface CourseTableProps {
  selectedCourses: Course[];
}


const CourseTable: React.FC<CourseTableProps> = ({ selectedCourses }) => {
  return (
    <table
      className="w-full"
      style={{
        fontFamily: "Arial, sans-serif",
        color: "#000", // Force black text
        backgroundColor: "#fff", // Force white background
        fontSize: "5px", // Adjust font size for PDF
      }}
    >
      <thead>
        <tr>
          <th
            style={{
              padding: "5px",
              textAlign: "left",
            }}
          >
            Course Details
          </th>
          <th
            style={{
              padding: "5px",
              textAlign: "left",
            }}
          >
            Date
          </th>
          <th
            style={{
              padding: "5px",
              textAlign: "left",
            }}
          >
            Time
          </th>
          <th
            style={{
              padding: "5px",
              textAlign: "left",
            }}
          >
            Room
          </th>
        </tr>
      </thead>
      <tbody>
        {selectedCourses.map((course, index) => (
          <tr key={index}>
            <td
              style={{
                padding: "5px",
              }}
            >
              <div><strong>{course.name}</strong></div>
              <div>{course.code}</div>
              <div>{course.teacher}</div>
              <div>{course.section}</div>
            </td>
            <td
              style={{
                padding: "5px",
              }}
            >
              {course.date}
            </td>
            <td
              style={{
                padding: "5px",
              }}
            >
              {course.time}
            </td>
            <td
              style={{
                padding: "5px",
              }}
            >
              {course.room}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CourseTable;

