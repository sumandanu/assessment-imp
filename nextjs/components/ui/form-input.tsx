import { forwardRef, InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    ({ label, defaultValue, error, id, ...props }, ref) => {
        return (
            <div>
                <label htmlFor={id} className="label">
                    <span className="text-sm label-text">{label}</span>
                </label>
                <input
                    id={id}
                    type="text"
                    {...props}
                    ref={ref}
                    defaultValue={(defaultValue || '') as string}
                    className="w-full input"
                    required
                />
                {error && <p className="label">{error}</p>}
            </div>
        );
    },
);

FormInput.displayName = 'FormInput';

export { FormInput };
