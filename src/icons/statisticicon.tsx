import type { FC, ReactElement ,SVGProps} from "react";

export const StatisticIcon: FC<SVGProps<SVGElement>> = (props): ReactElement => {
    return (
        <svg
            className={props.className}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M9 9L5 5M16 12H22M12 16V22"
                stroke="#69757A"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <circle
                cx="12"
                cy="12"
                r="4"
                stroke="#69757A"
                strokeWidth="1.5"
            />
            <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#69757A"
                strokeWidth="1.5"
            />
        </svg>
    );
};

