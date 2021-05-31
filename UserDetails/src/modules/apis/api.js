import Logger from "../logger";
import WaitQueue from "../queue";
import Settings from "../Settings";
import {DiscordModules} from "@zlibrary";

const {APIModule} = DiscordModules;
let cache = (window.__ud_cache ?? (window.__ud_cache = {})), queue = new WaitQueue({delay: 2500});

export default class ApiModule {
   constructor(plugin) {
      this.plugin = plugin;
      cache[this.api] = {};
   }

   extractDate(id) {
      return new Date((id / 4194304) + 1420070400000);
   }

   get api() {return "";}
   get cache() {return cache[this.api];}
   error(...message) {
      Logger.error(...message);
   }

   setCache(guildId, userId, data) {
      if (!cache[this.api]) cache[this.api] = {[guildId]: {}};
      if (!cache[this.api][guildId]) cache[this.api][guildId] = {};

      return cache[this.api][guildId][userId] = data;
   }

   getByCache(guildId, userId) {
      const chunk = cache[this.api]?.[guildId]?.[userId];
      if (!chunk || Date.now() - chunk.fetch > 600000) return null;

      return chunk.data;
   }

   get(options, guildId, userId, event) {
      if (!cache[this.api]) cache[this.api] = {[guildId]: {}};
      if (!cache[this.api][guildId]) cache[this.api][guildId] = {};
      let data;
      const userFromCache = this.getByCache(guildId, userId);
      if (userFromCache) data = userFromCache;  
      
      if (!data) {
         queue.add(() => APIModule.get(options), this.api, event);
         event
            .on("done", data => {
               this.setCache(guildId, userId, {
                  data: data,
                  fetch: Date.now()
               });
            })
            .on("error", error => {
               if (error.status === 429) {
                  queue.pause();
                  setTimeout(queue.continue, (error.body?.retry_after ?? 5) * 1000);
               } 
            });

      } else event.reply("done", data);
   }

   parseZeroPadding(zeroable) {
      return zeroable < 9 ? "0" + zeroable : zeroable;
   }

   monthsAgo(date1, date2) {
      let months;
      months = (date2.getFullYear() - date1.getFullYear()) * 12;
      months -= date1.getMonth();
      months += date2.getMonth();
      return months <= 0 ? 0 : months;
  }

  daysAgo(date1, date2) {
      return Math.floor((date1 - date2) / (1000 * 60 * 60 * 24));
  }

  yearsAgo(date1, date2) {
      return this.monthsAgo(date2, date1) / 12;
  }

   parseTime(format, date) {
      if (typeof date !== "object") date = new Date(date);
      const today = new Date(), daysago = this.daysAgo(today, date), hour12 = Settings.get("12hour", 1);
      return format
         .replace(/\$timelabel/g, date.getHours() >= 12 ? "PM" : "AM")
         .replace(/\$daysago/g, daysago)
         .replace(/\$dayname/g, date.toLocaleDateString("default", {weekday: "short", hour12}))
         .replace(/\$day/g, date.toLocaleDateString("default", {day: "2-digit", hour12}))
         .replace(/\$monthname/g, date.toLocaleDateString("default", {month: "short", hour12}))
         .replace(/\$monthsago/g, this.monthsAgo(today, date))
         .replace(/\$month/g, date.toLocaleDateString("default", {month: "2-digit", hour12}))
         .replace(/\$weeksago/g, Math.floor(daysago / 7))
         .replace(/\$yearsago/g, Math.floor(this.yearsAgo(today, date)))
         .replace(/\$year/g, date.getFullYear())
         .replace(/\$hour/g, this.parseZeroPadding(hour12 ? date.getHours() % 12 : date.getHours()))
         .replace(/\$minute/g, this.parseZeroPadding(date.getMinutes()))
         .replace(/\$second/g, this.parseZeroPadding(date.getSeconds()));
   }
}