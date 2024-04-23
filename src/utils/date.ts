export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-GB", options);

  // Match the date parts using regular expression
  const matchResult = formattedDate.match(/(\d{1,2}) (\w+) (\d{4})/);

  if (matchResult) {
    const [, day, month, year] = matchResult; // Corrected the index here

    // Convert day to ordinal format
    const dayWithOrdinal = `${day}${getOrdinalSuffix(parseInt(day))}`;

    return `${dayWithOrdinal} ${month} ${year}`;
  } else {
    return "Invalid Date";
  }
}

export function getOrdinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
