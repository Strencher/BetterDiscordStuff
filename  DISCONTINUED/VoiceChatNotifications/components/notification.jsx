import {Button} from "@discord/components";
import {joinClassNames} from "@discord/utils";
import {useState, useMemo} from "react";
import {useSpring, animated} from "react-spring";
import styles from "./notification.scss";

export const RemoveIcon = props => (
    <svg width="12" height="12" viewBox="0 0 24 24" {...props}>
        <path fill="currentColor" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z" />
    </svg>
);

export default function Notification(props) {
    const [closing, setClosing] = useState(false);
    const timeout = useMemo(() => props.timeout || 5000, []);
    const spring = useSpring({
        from: {
            progress: 0,
            backdrop: closing ? 10 : 0,
        },
        to: {
            progress: 100,
            backdrop: closing ? 0 : 10,
        },
        config: key => {
            switch(key) {
                case "progress": return {duration: timeout};
                default: return {duration: 250};
            }
        }
    });

    return (
        <animated.div 
            style={
                {
                    backdropFilter: spring.backdrop.to(e => {
                        if (closing && e === 0 && typeof props.onClose === "function") {
                            props.onClose();
                        }

                        return `blur(${e}px)`;
                    }),
                }
            }
            onMouseEnter={() => spring.progress.pause()}
            onMouseLeave={() => spring.progress.resume()}
            className={joinClassNames(styles.container, {closing: closing})}
        >
            <div className={styles.content}>
                {props.content}
            </div>
            <Button
                look={Button.Looks.BLANK}
                size={Button.Sizes.NONE}
                className={styles.closeButton}
                onClick={() => setClosing(true)}
            >
                <RemoveIcon />
            </Button>
            <div className={styles.progress}>
                <animated.div
                    className={styles.progressBar}
                    style={
                        {
                            width: spring.progress.to(e => {
                                if (e > 97 && props.timeout !== 0 && !closing) {
                                    setClosing(true);
                                }

                                return `${e}%`;
                            }),
                            backgroundColor: props.color
                        }
                    }
                />
            </div>
        </animated.div>
    );
};