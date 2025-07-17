import type { FC, ReactElement, SVGProps } from "react";


export const HelpIcon: FC<SVGProps<SVGElement>> = (props): ReactElement => {
    return (
        <svg className={props.className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_8800_34650)">
        <circle cx="10.0001" cy="9.99984" r="8.33333" stroke="#171429" strokeWidth="1.5"/>
        <path d="M8.3335 7.49967C8.3335 6.5792 9.07969 5.83301 10.0002 5.83301C10.9206 5.83301 11.6668 6.5792 11.6668 7.49967C11.6668 7.83147 11.5699 8.14061 11.4028 8.40033C10.9047 9.1744 10.0002 9.91253 10.0002 10.833V11.2497" stroke="#171429" strokeWidth="1.5" strokeLinecap="round"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M9.99349 14.1665H10.001H9.99349Z" fill="#F8FAFB"/>
        <path d="M9.99349 14.1665H10.001" stroke="#171429" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        <defs>
        <clipPath id="clip0_8800_34650">
        <rect width="20" height="20" fill="white"/>
        </clipPath>
        </defs>
        </svg>        
    );
};






