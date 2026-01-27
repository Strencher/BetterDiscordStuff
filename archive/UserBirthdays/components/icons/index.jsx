import Github from "./github";
import Discord from "./discord";
import Twitter from "./twitter";
import Cake from "./cake";

export const Icons = {Cake, Github, Discord, Twitter};

export default function Icon({name, ...props}) {
    if (!Icons[name]) return null;

    const IconComponent = Icons[name];

    return (
        <IconComponent {...props} />
    );
};