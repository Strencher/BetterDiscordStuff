import Cake from "../components/icons/cake";
import TextScroller from "../components/textscroller";
import {parseTime, extractDate} from "./util";
import React from "react";
import Settings from "../Settings";
import {TooltipContainer as Tooltip} from "@discord/components";

export const DEFAULT_FORMAT = "Created At: $hour:$minute:$second, $day.$month.$year $daysago days";

export default function CreatedAt({userId}) {
   const format = Settings.get("created_format", DEFAULT_FORMAT);
   const text = parseTime(format, extractDate(userId));

   return Settings.get("useIcons", true)
      ? (
         <Tooltip text={text}><Cake /></Tooltip>
      )
      : (
         <TextScroller>{text}</TextScroller>
      );
};