'use client'
import { useRouter } from 'next/navigation';
import Back from '../../public/ico_search_back.svg'
export default function BackButton() {
    const router = useRouter();

    const goBack = () => {
        router.back();
    }

    return (
        <button
            onClick={goBack}>
            <Back />
        </button>
    )
}

