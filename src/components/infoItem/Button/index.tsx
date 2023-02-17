import * as S from './styles';

type Props = {
    label: string;
    icon: string;
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

export const Button = ({label, icon, onClick}: Props) => {
    return (
        <S.Container onClick={onClick}>
            <S.IconArea>
                <S.Icon src={icon} />
            </S.IconArea>
            <S.Label>{label}</S.Label>
        </S.Container>
    )
}