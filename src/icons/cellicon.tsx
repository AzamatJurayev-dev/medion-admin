import type { FC, ReactElement, SVGProps } from "react";

 
export const CellIcon: FC<SVGProps<SVGElement>> = (props): ReactElement => {
    return (
        <svg className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.5 16.5L21.5 12.5L19.5 8.50017L14.5 8.50017L12.5 12.5L14.5 16.5H19.5Z" stroke="#69757A" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9.5 10.5L11.5 6.5L9.5 2.50017L4.5 2.50017L2.5 6.5L4.5 10.5L9.5 10.5Z" stroke="#69757A" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9.5 21.5L11.5 17.5L9.5 13.5002L4.5 13.5002L2.5 17.5L4.5 21.5H9.5Z" stroke="#69757A" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        
    );
};

