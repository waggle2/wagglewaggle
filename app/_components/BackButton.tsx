'use client'
import { useRouter } from 'next/navigation';
import Back from '../../public/assets/ico_search_back.svg'
import Image from 'next/image';
export default function BackButton() {
    const router = useRouter();

    const goBack = () => {
        router.back();
    }

    return (
        <button
            onClick={goBack}>
            <Image src={'/assets/ico_search_back.svg'} width={14} height={14} alt='' />
            {/* <Back /> */}
        </button>
    )
}

