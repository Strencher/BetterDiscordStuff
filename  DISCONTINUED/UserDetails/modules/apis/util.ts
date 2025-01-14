import {useStateFromStores} from "@discord/flux";
import Settings from "../Settings";

export function useSettings<T>(settings: T | {[setting: string]: boolean}): T {
   return useStateFromStores([Settings], () => {
      return Object.fromEntries(
      Object.keys(settings).map(key => [
            key,
            Settings.get(key, settings[key])
         ])
      );
   });
};

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

export function dynamicAgo(date1, date2) {
   const months = monthsAgo(date1, date2);
   if (months > 12) {
      const years = yearsAgo(date1, date2);
      const years_floored = Math.floor(years)
      return `${years_floored}${(years - years_floored > .5) ? ' and a half' : ''} year${years > 1 ? 's' : ''}`;
   }
   else if (months >= 1) {
      const months_floored = Math.floor(months);
      return `${months_floored}${(months - months_floored > .5) ? ' and a half' : ''} month${months > 1 ? 's' : ''}`;
   }
   else {
      const days = daysAgo(date1, date2);
      if (days > 7) {
         const weeks = days / 7.0;
         const weeks_floored = Math.floor(weeks);
         return `${weeks_floored}${(weeks - weeks_floored > .5) ? ' and a half' : ''} week${weeks > 1 ? 's' : ''}`;
      }
      else if (days > 0) {
         return `${Math.floor(days)} day${days > 1 ? 's' : ''}`;
      }
      else {
         const seconds = date2.getSeconds() - date1.getSeconds();
         const minutes = Math.floor(seconds / 60.0);
         const hours = Math.floor(minutes / 60.0);
         if (hours > 1) {
            return `${hours} hours`;
         }
         else if (hours == 1) {
            return 'an hour';
         }
         else if (minutes > 1) {
            return `${minutes} minutes`;
         }
         else if (minutes == 1) { 
            return 'a minute';
         }
         else if (seconds > 1) {
            return `${seconds} seconds`;
         }
         else {
            return 'less than a second'
         }
      }
   }
}

export function parseTime(format: string, date: Date | string) {
   if (typeof date !== "object") date = new Date(date);
   const today = new Date(), daysago = daysAgo(today, date), hour12 = Settings.get<number>("12hour", 1) === 0;
   
   return format
      .replace(/\$timelabel/g, date.getHours() >= 12 ? "PM" : "AM")
      .replace(/\$ago/g, dynamicAgo(today, date))
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