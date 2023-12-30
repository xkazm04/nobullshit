'use client'
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMe } from '@/app/apiFns/userApis';

function useGetUser() {
    const email = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    const [userId, setUserId] = useState(typeof window !== 'undefined' ? localStorage.getItem('userId') : null);
    const {data } = useQuery({
        queryKey: ['user'],
        queryFn: () => getMe(email || '')
    })

    useEffect(() => {
        if (data) {
            localStorage.setItem('userId', data.id);
            setUserId(data.id);
        }
    }, [data]); 

    return userId
}

export default useGetUser;