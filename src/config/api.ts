export const API_CONFIG = {
  // BASE_URL: 'https://hiresentry.in/api',
  BASE_URL: 'http://localhost:8000/api',
  // BASE_URL: 'http://13.233.163.230:8000/api',
  VERSION: 'v1',
  ENDPOINTS: {
    RESUMES: 'search/all/',
    UPLOAD_RESUME: 'resume/upload/',
    SEARCH: 'search/search/',
    DASHBOARD_METRICS: 'search/dashboard-metrics',
  },
} as const;

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}/${endpoint}`;
};