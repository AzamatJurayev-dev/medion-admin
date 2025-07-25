import type { FC, ReactElement, SVGProps } from "react";


export const MenuIcon: FC<SVGProps<SVGElement>> = (props): ReactElement => {
    return (
        
        <svg  className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 7H17M7 7H8M7 12H8M7 17H8M11 12H17M11 17H17M2.5 12C2.5 7.522 2.5 5.282 3.891 3.891C5.282 2.5 7.521 2.5 12 2.5C16.478 2.5 18.718 2.5 20.109 3.891C21.5 5.282 21.5 7.521 21.5 12C21.5 16.478 21.5 18.718 20.109 20.109C18.718 21.5 16.479 21.5 12 21.5C7.522 21.5 5.282 21.5 3.891 20.109C2.5 18.718 2.5 16.479 2.5 12Z" stroke="#69757A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        
    );
};
