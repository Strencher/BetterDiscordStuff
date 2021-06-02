import Cake from "../components/icons/cake";
import TextScroller from "../components/textscroller";
import ApiModule from "./api";
import React from "react";
import Settings from "../Settings";
import {TooltipContainer as Tooltip} from "@discord/components";

export default class CreatedAt extends ApiModule {
   task(userId) {
      const text = this.parseTime(Settings.get("created_format", "Created At: $hour:$minute:$second, $day.$month.$year $daysago days"), this.extractDate(userId));

      return () => {
         return Settings.get("useIcons", true)
            ? <Tooltip text={text}><Cake /></Tooltip>
            : <TextScroller>{text}</TextScroller>;
      };
   }
}