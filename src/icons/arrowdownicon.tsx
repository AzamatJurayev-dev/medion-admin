import type { FC, ReactElement, SVGProps } from "react";


export const ArrowDownIcon: FC<SVGProps<SVGElement>> = (props): ReactElement => {
    return (      
    <svg className={props.className} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 4.50002C9 4.50002 6.79053 7.49999 5.99998 7.5C5.20942 7.50001 3 4.5 3 4.5" stroke="#171429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    );
};
