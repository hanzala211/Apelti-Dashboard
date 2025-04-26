

const EXCEL_MIME_TYPES = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
];

export const handleFileChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  mode: "image" | "excel"
) => {
  const files = event.target.files;
  if (!files || files.length === 0) return null;

  const file = files[0];

  if (mode === "image") {
    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      return { label: file.name, value: url };
    } else {
      alert("Please select a valid image file (e.g. .png, .jpg).");
      return null;
    }
  }

  if (mode === "excel") {
    if (EXCEL_MIME_TYPES.includes(file.type)) {
      return file;
    } else {
      alert("Please select a valid Excel file (.xls or .xlsx).");
      return null;
    }
  }

  // (shouldn't happen)
  return null;
}