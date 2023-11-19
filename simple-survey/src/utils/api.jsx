export const fetchData = async () => {
    try {
      const response = await fetch('/surveyData.json');
  
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      return response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  