import { useEffect, useState } from 'react';
import axios from 'axios';

export const useLabComponents = (projectId) => {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await axios.get(`/api/lab/${projectId}`);
        setComponents(response.data.components);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load components');
      } finally {
        setLoading(false);
      }
    };

    fetchComponents();
  }, [projectId]);

  return { components, loading, error };
};
