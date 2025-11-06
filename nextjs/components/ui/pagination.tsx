import { useRouter } from 'next/navigation';
import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
    const router = useRouter();
    const pages = [...Array(totalPages).keys()].map((i) => i + 1);

    return (
        <div className="join">
            <button
                className="join-item btn"
                onClick={() => router.push(`?page=${currentPage - 1}`)}
                disabled={currentPage === 1}
            >
                «
            </button>
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => router.push(`?page=${page}`)}
                    className={`join-item btn ${currentPage === page ? 'btn-active' : ''}`}
                >
                    {page}
                </button>
            ))}
            <button
                className="join-item btn"
                onClick={() => router.push(`?page=${currentPage + 1}`)}
                disabled={currentPage === totalPages}
            >
                »
            </button>
        </div>
    );
};

export default Pagination;
