import { useActionState, useEffect, useRef, useState } from 'react';
import { save } from '@/actions/post';
import { Pencil, Plus } from 'lucide-react';
import { FormInput } from '../ui/form-input';
import { useRouter } from 'next/navigation';
import { Textarea } from '../ui/textarea';

export function PostFormModal({ initialData }: { initialData?: any }) {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
    const [state, action, pending] = useActionState(save, initialData);
    const [formData, setFormData] = useState(initialData);
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    useEffect(() => {
        if (state?.success === true) {
            if (formRef.current) {
                formRef.current.reset();
            }
            setFormData(null);
            setIsShow(false);
            router.push('/');
        }
    }, [state]);

    return (
        <>
            <button
                className="btn btn-sm btn-outline btn-info"
                onClick={() => setIsShow(true)}
            >
                {initialData ? (
                    <Pencil className="text-blue" size={18} />
                ) : (
                    <span className="flex gap-4">
                        <Plus className="text-blue" size={18} /> New Post
                    </span>
                )}
            </button>
            <dialog className="modal" role="dialog" open={isShow}>
                <div className="modal-box z-[9999]">
                    <h3 className="text-lg font-bold">
                        {!formData?.payload?.id
                            ? 'Add New Post'
                            : 'Update Post'}
                    </h3>
                    <form
                        ref={formRef}
                        className="space-y-4 w-full"
                        action={action}
                    >
                        <input
                            type="hidden"
                            name="id"
                            defaultValue={formData?.payload?.id}
                        />
                        <FormInput
                            label="Title"
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Title"
                            defaultValue={
                                (formData?.payload?.title || '') as string
                            }
                            error={formData?.errors?.title}
                        />
                        <div>
                            <label className="label">
                                <span className="text-sm label-text">
                                    Content
                                </span>
                            </label>
                            <Textarea
                                id="content"
                                name="content"
                                className="w-full textarea"
                                placeholder="Content"
                                defaultValue={
                                    (formData?.payload?.content || '') as string
                                }
                            ></Textarea>
                            {formData?.errors?.content && (
                                <p className="label">{state.errors.content}</p>
                            )}
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-sm label-text">
                                    Category
                                </span>
                            </label>
                            <select
                                id="category"
                                name="category"
                                className="w-full select"
                                defaultValue={
                                    (formData?.payload?.category ||
                                        '') as string
                                }
                            >
                                <option>Food & Cooking</option>
                                <option>Health & Fitness</option>
                                <option>Travel</option>
                                <option>Technology</option>
                            </select>
                            {formData?.errors?.category && (
                                <p className="label">{state.errors.category}</p>
                            )}
                        </div>
                        <div className="modal-action">
                            <button
                                className="btn btn-outline w-20"
                                onClick={() => setIsShow(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="w-20 btn btn-outline btn-primary "
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
}
