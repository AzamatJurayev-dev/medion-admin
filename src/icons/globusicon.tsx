import type { FC, ReactElement, SVGProps } from "react";


export const GlobusIcon: FC<SVGProps<SVGElement>> = (props): ReactElement => {
    return (
        <svg className={props.className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_8800_34656)">
        <circle cx="10.0001" cy="9.99984" r="8.33333" stroke="#141B34" strokeWidth="1.5"/>
        <ellipse cx="10.0001" cy="9.99984" rx="3.33333" ry="8.33333" stroke="#141B34" strokeWidth="1.5"/>
        <path d="M1.66675 10H18.3334" stroke="#141B34" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        <defs>
        <clipPath id="clip0_8800_34656">
        <rect width="20" height="20" fill="white"/>
        </clipPath>
        </defs>
        </svg>

    );
};



