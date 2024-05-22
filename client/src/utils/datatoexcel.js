import { utils, write } from "xlsx";
import { saveAs } from "file-saver";
import {capitalize} from "./appLogics"
export const sessionDataToExcel = (data, fileName) => {
  // Create a new workbook
  const workbook = utils.book_new();
  const { level, semesters } = data;
  // Flatten the data and prepare headers
  const flattenedData = [];
  const title = [`${level} Academic Result`];
  const headers = ["Course", "Course Code", "Credit Load", "Grade"];
  flattenedData.push(title);

  //styles
  const titleCellStyle = {
    font: { bold: true, size: "24px" },
    align: "center",
  };
  const headersCellStyle = { font: { bold: true } };
  // Iterate over each semester
  // Iterate over each course in the semester
  semesters.forEach((semester) => {
    const sub_title =
      semester.semester === 1 ? ["First Semester"] : ["Second Semester"];
    flattenedData.push(sub_title);
    flattenedData.push(headers);

    semester.courses.forEach((course) => {
      const row = [
       capitalize(course.course), // Course
        course.course_code.toUpperCase(), // Course Code
        course.credit_load, // Credit Load
        course.grade, // Grade
      ];
      flattenedData.push(row);
    });
    const gpa = ["Grade Point Average", semester.gpa];
    flattenedData.push(gpa);
    flattenedData.push([]);
  });

  console.log(flattenedData)
  
  const merges = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 6 } }, { s: { r: 1, c: 0 }, e: { r: 1, c: 6 } }];
  // Convert flattened data to worksheet

  const worksheet = utils.aoa_to_sheet(flattenedData);
//   utils.sheet_set_range_style(worksheet, 'A1:G1', headersCellStyle)
  worksheet["!merges"] = merges;
  
  utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const excelBuffer = write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, `${fileName}.xlsx`);
};
