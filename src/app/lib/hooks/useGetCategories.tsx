'use client'
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/app/apiFns/supportApis';
export type apiCat = {
    id: number;
    label: string;
    description: string;
    examples: string;
}
function useGetCategories() {
    const [categories, setCategories] = useState();
    const { data } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories(),
        staleTime: Infinity
    })

    useEffect(() => {
        if (data) setCategories(data);
    }, [data]);

    return categories
}

export default useGetCategories;