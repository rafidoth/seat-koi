import fs from "fs"; // For reading files
import path from "path"; // For joining paths
import { read, utils } from "xlsx"; // From xlsx package

export const getParsedJsonFromExcel = function(fileName: string) {
  const filePath = path.join(process.cwd(), "public/uploads", `${fileName}.xlsx`);
  const workbook = read(fs.readFileSync(filePath));
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const parsedJson = utils.sheet_to_json(worksheet);
  console.log(parsedJson);
  return parsedJson;
}

