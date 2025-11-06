import { useActionState, useEffect, useState } from 'react';
import { remove } from '@/actions/post';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function DeleteConfirmModal({ initialData }: { initialData?: any }) {
    const router = useRouter();
    const [state, action] = useActionState(remove, initialData);
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        if (state?.success === true) {
            setIsShow(false);
            router.push('/');
        }
    }, [state]);

    return (
        <>
            <button
                className="btn btn-sm btn-outline btn-error"
                onClick={() => setIsShow(true)}
            >
                <Trash2 className="text-red" size={18} />
            </button>
            <dialog className="modal" role="dialog" open={isShow}>
                <div className="modal-box z-[9999]">
                    <h3 className="text-lg font-bold">Delete Confirmation</h3>
                    <p className="py-4">
                        Are you sure want to delete this post?
                    </p>
                    <div className="modal-action">
                        <button
                            className="btn btn-outline w-20"
                            onClick={() => setIsShow(false)}
                        >
                            Cancel
                        </button>
                        <form action={action}>
                            <input
                                type="hidden"
                                defaultValue={state?.payload?.id}
                                name="id"
                            />
                            <button
                                type="submit"
                                className="w-20 btn btn-outline btn-error"
                            >
                                Delete
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
}
