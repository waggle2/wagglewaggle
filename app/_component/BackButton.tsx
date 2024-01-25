'use client'
import { useRouter } from 'next/navigation';


export default function BackButton() {
    const router = useRouter();

    const goBack = () => {
        router.back();
    }

    return (
        <button
            onClick={goBack}>
            <img src="/ico_search_back.svg" alt="" />
        </button>
    )
}

