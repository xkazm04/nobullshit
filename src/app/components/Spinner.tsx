import { useState, useEffect } from 'react';

const Spinner = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(timeoutId);
    }, []);

    if (!visible) {
        return null;
    }

    return (
        <svg className="animate-spin h-8 w-8 mr-3 ..." viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8 ..." />
        </svg>
    );
}

export default Spinner;