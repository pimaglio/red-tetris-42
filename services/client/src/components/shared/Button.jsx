import React from "react";
import { useButton, useFocusRing, mergeProps } from "react-aria";
import LoadingSpinner from "./Loading/Spinner";

export function Button(props) {
    let ref = React.useRef(null);
    let { buttonProps, isPressed } = useButton(props, ref);
    let { focusProps, isFocusVisible } = useFocusRing();

    let bg = "";
    if (props.variant === "destructive") {
        bg = isPressed ? "bg-red-600 text-white" : "bg-red-500 text-white hover:bg-red-900";
    } else if (props.variant === "cta") {
        bg = isPressed ? "bg-red-800 text-white" : "bg-red-800 text-white hover:bg-red-900";
    } else {
        bg = isPressed ? "bg-gray-300 text-gray-800" : "text-gray-100 hover:bg-slate-100/5";
    }

    let focus = isFocusVisible ? "ring ring-offset-2 ring-blue-400" : "";
    let disabled = props.isLoading ? "disabled:opacity-60" : ""

    return (
        <button
            {...mergeProps(buttonProps, focusProps)}
            ref={ref}
            onKeyDown={(e) => {
                e.preventDefault()
                ref.current.blur()
            }}
            disabled={props.isLoading}
            type={props.type || 'button'}
            className={`flex items-center ${focus} text-base font-semibold py-2 px-4 rounded cursor-default focus:outline-none transition ${bg} cursor-pointer ${disabled}`}
        >
            {props.children}
            {props.isLoading ? <LoadingSpinner color={props.loadingColor} size={props.loadingSize}/> : null}
        </button>
    );
}
