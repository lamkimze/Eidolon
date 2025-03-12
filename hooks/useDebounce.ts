import { useEffect, useState } from "react";

function useDebounce<T>(value:T, delay?:number):T{
    // set state
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    // create timer with timeout or delay default of 500ms or input value
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay || 500);

        // clear timeout to prevent overflow
        return () => {
            clearTimeout(timer);
        }
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;