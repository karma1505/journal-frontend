// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://journal-backend-beta.vercel.app';

export const API_ENDPOINTS = {
  ENTRIES: `${API_BASE_URL}/entries`,
  ENTRY_BY_ID: (id: number) => `${API_BASE_URL}/entries/${id}`,
  IMAGE_URL: (imagePath: string) => {
    // If imagePath is already a full URL (from Supabase Storage), return it as is
    if (imagePath && (imagePath.startsWith('http://') || imagePath.startsWith('https://'))) {
      return imagePath;
    }
    // Otherwise, construct URL with backend (for local development)
    return `${API_BASE_URL}/${imagePath}`;
  },
} as const;
