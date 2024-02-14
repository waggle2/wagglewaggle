type Props = {
    animal: string;
};

export default function PointIcon({ animal }: Props) {
    let imageUrl = "/assets/coin.svg"; // 기본 이미지

    switch (animal) {
        case "고양이":
            imageUrl = "/assets/point_shop/coin/cat_coin.svg"; // 고양이 이미지 경로
            break;
        case "곰":
            imageUrl = "/assets/point_shop/coin/bear_coin.svg"; // 곰 이미지 경로
            break;
        case "개":
            imageUrl = "/assets/point_shop/coin/dog_coin.svg"; // 개 이미지 경로
            break;
        case "여우":
            imageUrl = "/assets/point_shop/coin/fox_coin.svg"; // 여우 이미지 경로
            break;
        default:
            // 기본 이미지는 설정된 '/assets/coin.svg'를 사용
            break;
    }

    return (
        <img src={imageUrl} alt={animal} /> // 이미지 URL과 alt 텍스트를 업데이트
    );
}