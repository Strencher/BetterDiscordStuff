import Cake from "../components/icons/cake";
import TextScroller from "../components/textscroller";
import ApiModule from "./api";
import React from "react";
import {WebpackModules} from "@zlibrary";
import Settings from "../Settings";
const {TooltipContainer: Tooltip} = WebpackModules.getByProps("TooltipContainer");

export default class CreatedAt extends ApiModule {
   task(userId) {
      const text = this.parseTime(Settings.get("created_format", "Created At: $hour:$minute:$second, $day.$month.$year $daysago days"), this.extractDate(userId));

      return React.memo(() => {
         return Settings.get("useIcons", true)
            ? <Tooltip text={text}><Cake /></Tooltip>
            : <TextScroller>{text}</TextScroller>;
      });
   }
}