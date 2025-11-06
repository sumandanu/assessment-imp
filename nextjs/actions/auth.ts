'use server';

import { authAPI } from '@/lib/api';
import { removeToken, setToken } from '@/lib/auth';
import {
    FormState,
    SigninFormSchema,
    SignupFormSchema,
} from '@/lib/definitions';
import { LoginCredentials, RegisterCredentials } from '@/types';

type ActionState = {
    success?: boolean;
    errors?: any;
    payload?: any; // Include payload to store form data on failure
};

export async function signin(state: FormState, formData: FormData) {
    try {
        const payload = {
            email: formData.get('email'),
            password: formData.get('password'),
        } as LoginCredentials;

        // Validate
        const validatedFields = SigninFormSchema.safeParse(payload);

        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
            };
        }

        const response = await authAPI.login(payload);

        const { access_token, user } = response.data;
        setToken(access_token);

        return { success: true };
    } catch (err: any) {
        return {
            success: false,
            errors: err.response?.data?.message || 'Failed to submit data',
        };
    }
}

export const signup = async (
    state: FormState,
    formData: FormData,
): Promise<ActionState> => {
    const payload = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation'),
    } as RegisterCredentials;

    // Validate
    const validatedFields = SignupFormSchema.safeParse(payload);

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            payload,
        };
    }

    try {
        const response = await authAPI.register(payload);
        const { access_token, user } = response.data;
        setToken(access_token);
        return { success: true };
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

export async function signout() {
    try {
        await authAPI.logout();
        return { success: true };
    } catch (err: any) {
        return {
            success: false,
            errors: err.response?.data?.message || 'Failed to submit data',
        };
    } finally {
        removeToken();
    }
}
