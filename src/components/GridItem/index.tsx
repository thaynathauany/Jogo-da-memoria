import { GridItemType } from '../../types/GridItemType';
import * as S from './styles';
import capa from '../../svgs/capa.svg';
import { items } from '../../data/items';

type Props = {
    item: GridItemType, //recebe um item de GridItemType
    onClick: () => void //uma função que ñ retorna nada
}

export const GridItem = ({ item, onClick }: Props) => {
    return(
        <S.Container 
            showBackground={item.permanentShown || item.shown}     
            onClick={onClick}> 

            {item.permanentShown === false && item.shown === false && 
                <S.Icon src={capa} alt="svg" opacity={.5} /> //se permanentShown e shown estiverem como false, nao mostra o icone e mostra  capa do Mickey
            }

            {(item.permanentShown || item.shown) && item.item !== null && //se permanentShown e itemShow estiverem como true eu exibo, mas para exibir, é necessário saber se há algo dentro do meu item, então ele deve estar diferente de nulo
                <S.Icon src={items[item.item].icon} alt=""/>
            }
        </S.Container>
    );
}

//Linha12//executa o onClick da prop// 