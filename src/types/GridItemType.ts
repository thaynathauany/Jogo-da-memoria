export type GridItemType = {
    item: number | null;
    shown: boolean;
    permanentShown: boolean;
}

//item: number | null; - Identifica a posicao de item, que começa em 0. Primeiro eu crio um grid sem nada, e dps preencho esse item com as minhas informações, então, a primeiro momento o item não tem nada, logo é nulo.

//shown: boolean; - Identifica se a cartinha está sendo exibida ou não.

//permanentShown: boolean; - É o item que ficará sendo exibida para que você escolha a outra carta. Carta Permanente. E se acertar as duas, só desvire quando o jogo for reiniciado.

//permanetShown é superior a show, entao na verificacao se a carta está desvirada ou nao, primeiro eu verifico o permanent show 