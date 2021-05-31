import Cake from "./cake";
import Calendar from "./calendar";
import Error from "./error";
import TextBubble from "./textbubble";
import Chain from "./chain";
import Wrench from "./wrench";

export const Icons = {
    Cake,
    Calendar,
    Error,
    TextBubble,
    Chain,
    Wrench
};

export function noop() {return null;}

export default function Icon({name, ...props}) {
    const IconComponent = Icons[name] ?? noop;
    
    return (
        <IconComponent {...props} />
    );
}