export default function Checkmark(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" {...props}>
            <g fill="none" fill-rule="evenodd">
                <path d="M0 0h18v18H0z" />
                <path fill="#3ba55c" d="M14.25 14.25H3.75V3.75h7.5v-1.5h-7.5c-.8325 0-1.5.6675-1.5 1.5v10.5c0 .8284271.67157288 1.5 1.5 1.5h10.5c.8284271 0 1.5-.6715729 1.5-1.5v-6h-1.5v6zM6.6825 7.31L5.625 8.375 9 11.75l7.5-7.5-1.0575-1.065L9 9.6275 6.6825 7.31z" />
            </g>
        </svg>
    );
}