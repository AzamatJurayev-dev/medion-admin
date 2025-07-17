import type { FC, ReactElement, SVGProps } from "react";


export const ArrowUpIcon: FC<SVGProps<SVGElement>> = (props): ReactElement => {
    return (      
        <svg className={props.className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 10L7.29289 6.70711C7.62623 6.37377 7.79289 6.20711 8 6.20711C8.20711 6.20711 8.37377 6.37377 8.70711 6.70711L12 10" stroke="#171429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
};


