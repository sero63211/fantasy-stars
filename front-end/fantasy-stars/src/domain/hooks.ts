import { useState, useEffect } from 'react';

const useFootballers = () => {
    type FetchState = 'initial' | 'loading' | 'success' | 'error';

    const [footballers, setFootballers] = useState<any[]>([]);
    const [state, setState] = useState<FetchState>('initial');
    const [error, setError] = useState<Error | null>(null);

    const fetchFootballers = async () => {
        try {
            setState('loading');
            const response = await fetch('http://localhost:3001/footballer/getAllFootballers');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setFootballers(data);
            setState('success');
        } catch (err) {
            console.error("Error fetching footballers:", err);
            if (err instanceof Error) {
                setError(err);
            } else {
                setError(new Error('An unexpected error occurred'));
            }
            setState('error');
            
        }
    };

    useEffect(() => {
        fetchFootballers();

        const interval = setInterval(() => {
            fetchFootballers();
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const refresh = () => {
        fetchFootballers();
    };

    return { footballers, state, error, refresh };
};

export default useFootballers;
