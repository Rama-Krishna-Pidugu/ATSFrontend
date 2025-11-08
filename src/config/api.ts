export const API_CONFIG = {
  // BASE_URL: 'https://hiresentry.in/api',
  // BASE_URL: 'https://main.dibr3rch5hdjx.amplifyapp.com/api',
  // BASE_URL: 'http://localhost:8000/api',
  BASE_URL: 'http://13.233.116.7:8000/api',
  
  VERSION: 'v1',
  ENDPOINTS: {
    RESUMES: 'search/all/',
    UPLOAD_RESUME: 'resume/upload/',
    SEARCH: 'search/search/',
    DASHBOARD_METRICS: 'search/dashboard-metrics',
    SCREENING_QUESTIONS: 'search/resume/',
    GENERATE_EMAIL: 'search/resume/',
    SEND_EMAIL: 'search/resume/',
  },
} as const;

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}/${endpoint}`;
};