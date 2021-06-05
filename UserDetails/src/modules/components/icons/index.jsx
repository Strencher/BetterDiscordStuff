import Cake from "./cake";
import Calendar from "./calendar";
import Error from "./error";
import TextBubble from "./textbubble";
import Chain from "./chain";
import Wrench from "./wrench";
import Flowerstar from "./flowerstar";
import Spotify from "./spotify";
import Twitch from "./twitch";
import Valorant from "./valorant";
import YouTube from "./youtube";
import GamePad from "./gamepad";
import GoogleChrome from "./googleChrome";
import Headphones from "./headphones";

export const Icons = {
    Cake,
    Calendar,
    Error,
    TextBubble,
    Chain,
    Wrench,
    Flowerstar,
    Spotify,
    Twitch,
    Valorant,
    YouTube,
    GamePad,
    GoogleChrome,
    Headphones
};

export function noop() {return null;}

export default function Icon({name, ...props}) {
    const IconComponent = Icons[name] ?? noop;
    
    return (
        <IconComponent {...props} />
    );
}