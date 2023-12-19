import { useState, useEffect } from 'react';

const Offline = ({children}:any) => {
    const [isOffline, setIsOffline] = useState(typeof navigator !== 'undefined' ? !navigator.onLine : false);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const goOnline = () => setIsOffline(false);
        const goOffline = () => setIsOffline(true);

        window.addEventListener('online', goOnline);
        window.addEventListener('offline', goOffline);

        return () => {
            window.removeEventListener('online', goOnline);
            window.removeEventListener('offline', goOffline);
        };
    }, []);

    useEffect(() => {
        if (isOffline) {
            const timeoutId = setTimeout(() => setIsVisible(false), 5000);
            return () => clearTimeout(timeoutId);
        } else {
            setIsVisible(true);
        }
    }, [isOffline]);

    if (!isOffline || !isVisible) {
        return null;
    }

    return (
        <div>
            <div className='flex flex-row justify-center'>
                <p>You are offline. App might behave like shit now.</p>
            </div>
            {children}
        </div>
    );
};

export default Offline;