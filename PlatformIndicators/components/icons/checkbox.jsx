import React from "react";

function CheckboxEnabled(props) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" {...props}>
            <path fillRule="evenodd" clipRule="evenodd" fill={props.color ?? "currentColor"} d="M5.37499 3H18.625C19.9197 3 21.0056 4.08803 21 5.375V18.625C21 19.936 19.9359 21 18.625 21H5.37499C4.06518 21 3 19.936 3 18.625V5.375C3 4.06519 4.06518 3 5.37499 3Z" />
            <path fill="#fff" d="M9.58473 14.8636L6.04944 11.4051L4.50003 12.9978L9.58473 18L19.5 8.26174L17.9656 6.64795L9.58473 14.8636Z" />
        </svg>
    )
}

function CheckboxDisabled(props) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" {...props}>
            <path fillRule="evenodd" clipRule="evenodd" fill="currentColor" d="M18.625 3H5.375C4.06519 3 3 4.06519 3 5.375V18.625C3 19.936 4.06519 21 5.375 21H18.625C19.936 21 21 19.936 21 18.625V5.375C21.0057 4.08803 19.9197 3 18.625 3ZM19 19V5H4.99999V19H19Z" />
        </svg>
    );
}

export function Checkbox({checked, ...props}) {
    return checked ? <CheckboxEnabled {...props} /> : <CheckboxDisabled {...props} />;
}
