import Settings from "../Settings";

export function extractDate(id: string | number): Date {
   return new Date(((id as number) / 4194304) + 1420070400000);
};

export function parseZeroPadding(zeroable: number): string | number {
   return zeroable <= 9 ? "0" + zeroable : zeroable;
};

export function monthsAgo(date1: Date, date2: Date): number {
   let months: number;
   months = (date2.getFullYear() - date1.getFullYear()) * 12;
   months -= date1.getMonth();
   months += date2.getMonth();
   months = Math.abs(months);
   return months <= 0 ? 0 : months;
};

export function daysAgo(date1: Date, date2: Date): number {
   return Math.floor((date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24));
}

export function yearsAgo(date1: Date, date2: Date): number {
   return monthsAgo(date2, date1) / 12;
}

export function parseTime(format: string, date: Date | string) {
   if (typeof date !== "object") date = new Date(date);
   const today = new Date(), daysago = daysAgo(today, date), hour12 = Settings.get<number>("12hour", 1) === 0;
   
   return format
      .replace(/\$timelabel/g, date.getHours() >= 12 ? "PM" : "AM")
      .replace(/\$daysago/g, daysago.toString())
      .replace(/\$dayname/g, date.toLocaleDateString("default", {weekday: "short", hour12}))
      .replace(/\$day/g, date.toLocaleDateString("default", {day: "2-digit", hour12}))
      .replace(/\$monthname/g, date.toLocaleDateString("default", {month: "short", hour12}))
      .replace(/\$monthsago/g, monthsAgo(today, date).toString())
      .replace(/\$month/g, date.toLocaleDateString("default", {month: "2-digit", hour12}))
      .replace(/\$weeksago/g, Math.floor(daysago / 7).toString())
      .replace(/\$yearsago/g, Math.floor(yearsAgo(today, date)).toString())
      .replace(/\$year/g, date.getFullYear().toString())
      .replace(/\$hour/g, parseZeroPadding(hour12 ? date.getHours() % 12 : date.getHours()).toString())
      .replace(/\$minute/g, parseZeroPadding(date.getMinutes()).toString())
      .replace(/\$second/g, parseZeroPadding(date.getSeconds()).toString());
}