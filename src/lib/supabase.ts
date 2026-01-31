import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface ResponseData {
  response: string;
  timestamp: string;
  type: 'meeting_response' | 'proposal_response' | 'alternative_date';
}

export const saveResponseToSupabase = async (data: ResponseData) => {
  try {
    const { data: result, error } = await supabase
      .from('valentine_responses')
      .insert([data]);

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    console.log('Response saved to Supabase successfully:', result);
    return result;
  } catch (error) {
    console.error('Error saving to Supabase:', error);
    throw error;
  }
};

// Get all responses from Supabase
export const getResponsesFromSupabase = async () => {
  try {
    const { data, error } = await supabase
      .from('valentine_responses')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching from Supabase:', error);
    return [];
  }
};

// For development, we can save to localStorage as a fallback
export const saveToLocalStorage = (data: ResponseData) => {
  try {
    const existingResponses = JSON.parse(localStorage.getItem('valentine_responses') || '[]');
    existingResponses.push(data);
    localStorage.setItem('valentine_responses', JSON.stringify(existingResponses));
    return true;
  } catch (error) {
    console.error('LocalStorage save error:', error);
    return false;
  }
};

// Get all responses from localStorage
export const getResponsesFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('valentine_responses') || '[]');
  } catch (error) {
    console.error('LocalStorage get error:', error);
    return [];
  }
};
