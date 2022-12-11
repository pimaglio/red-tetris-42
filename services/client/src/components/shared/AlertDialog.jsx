import React from "react";
import { useDialog } from "react-aria";
import { ExclamationIcon } from "@heroicons/react/outline";
// components
import { Button } from "./Button.jsx";


export default function AlertDialog(props) {
    let { children, onClose, onConfirm, confirmLabel, cancelLabel } = props;

    let ref = React.useRef(null);
    let { dialogProps, titleProps } = useDialog(
        {
            ...props,
            role: "alertdialog"
        },
        ref
    );

    return (
        <div {...dialogProps} ref={ref} className="outline-none">
            {props.variant === "destructive" || props.icon === 'warning' && (
                <ExclamationIcon className="w-6 h-6 text-red-500 absolute right-8 top-8" />
            )}
            <h3 {...titleProps} className="text-lg font-medium pb-2">
                {props.title}
            </h3>
            <div>
                {children}
            </div>
            <div className="pt-8 flex space-x-3 justify-end">
                <Button onPress={onClose}>{cancelLabel || 'Cancel'}</Button>
                <Button variant={props.variant || "cta"} onPress={onConfirm}>
                    {confirmLabel}
                </Button>
            </div>
        </div>
    );
}
