import React from "react";

export function useOnMount(onMount: () => void) {
    React.useEffect(() => {
        onMount()
    })
}

export function useOnUnmount(onUnmount: () => void) {
    React.useEffect(() => {
        return onUnmount()
    })
}
