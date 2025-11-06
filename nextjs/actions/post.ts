'use server';

import { postsAPI } from '@/lib/api';
import { FormState, PostFormSchema } from '@/lib/definitions';
import { PostCredentials } from '@/types';

type ActionState = {
    success?: boolean;
    errors?: any;
    payload?: any; // Include payload to store form data on failure
};

export const save = async (
    state: FormState,
    formData: FormData,
): Promise<ActionState> => {
    const payload = {
        title: formData.get('title'),
        content: formData.get('content'),
        category: formData.get('category'),
    } as PostCredentials;

    // Validate
    const validatedFields = PostFormSchema.safeParse(payload);

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            payload,
        };
    }
    try {
        const response = formData.get('id')
            ? await postsAPI.update(Number(formData.get('id')), payload)
            : await postsAPI.create(payload);
        return { success: true, payload: response.data };
    } catch (error: any) {
        // Handle error
        if (error.response) {
            if (error.response.status === 422) {
                // Handle 422 Unprocessable Entity error
                console.error('Validation Error:', error.response.data);
            } else {
                // Handle other HTTP errors (e.g., 400, 401, 500)
                console.error('Server Error:', error.response.data);
            }
            return {
                success: false,
                errors: error.response.data.errors,
                payload,
            };
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
            return { success: false, errors: error.request, payload };
        } else {
            // Something else happened while setting up the request
            console.error('Request setup error:', error.message);
            return { success: false, errors: error.message, payload };
        }
    }
};

export const remove = async (
    state: FormState,
    formData: FormData,
): Promise<ActionState> => {
    try {
        if (!formData.get('id')) {
            return {
                success: false,
                errors: 'Id is required',
            };
        }
        const response = await postsAPI.delete(Number(formData.get('id')));
        return { success: true, payload: response.data };
    } catch (error: any) {
        // Handle error
        if (error.response) {
            if (error.response.status === 422) {
                // Handle 422 Unprocessable Entity error
                console.error('Validation Error:', error.response.data);
            } else {
                // Handle other HTTP errors (e.g., 400, 401, 500)
                console.error('Server Error:', error.response.data);
            }
            return {
                success: false,
                errors: error.response.data.errors,
            };
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
            return { success: false, errors: error.request };
        } else {
            // Something else happened while setting up the request
            console.error('Request setup error:', error.message);
            return { success: false, errors: error.message };
        }
    }
};
