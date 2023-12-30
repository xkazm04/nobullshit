import { useState, useEffect } from 'react';

function useGetUser() {
    // const [user, setUser] = useState(() => {
    //     const storedUser = localStorage.getItem('user');
    //     return storedUser ? JSON.parse(storedUser) : '1';
    // });

    // useEffect(() => {
    //     const storedUser = localStorage.getItem('user');
    //     if (storedUser) {
    //         setUser(JSON.parse(storedUser));
    //     } else {
    //         setUser('1');
    //     }
    // }, []);

    return 1;
}

export default useGetUser;