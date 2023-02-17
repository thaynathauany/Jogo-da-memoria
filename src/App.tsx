import * as S from './app.styles';
import { useEffect, useState } from 'react';

import logoImage from './assets/jogoDaMemoria.png';
import RestartIcon from './svgs/restart.svg'

import { InfoItem } from './components/infoItem';
import { Button } from './components/infoItem/Button';
import { GridItem } from './components/GridItem';

import { GridItemType } from './types/GridItemType'; 
import { items } from './data/items';
import { formatTimeElapsed } from './helpers/formatTimeElepsed';


const App = () => {

  const[playing, setPlaying] = useState<boolean>(false); //mostra se o jogo esta rolando
  const[timeElapsed, setTimeElapsed] = useState<number>(0); //mostra o tempo decorrido
  const[moveCount, setMoveCount] = useState<number>(0); //mostra a quantidade de movimentos que foi feito
  const[shownCount, setShownCount] = useState<number>(0); //quantidade de itens que está mostrando naquela jogada. - verifica se a segunda carta jogada é igual a primeira, senao desvira elas .
  const[gridItems, setGridItems ] = useState<GridItemType[]>([]); //o que é cada um dos itens, o que está sendo mostrado fica dentro desse state que é armazenado na memória

  useEffect(() =>  resetAndCreateGrid(), []) //assim que inicar a aplicação roda essa função que inicia o jogo

  //faz o timer funcionar
  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) {
        setTimeElapsed(timeElapsed + 1)
      }
    }, 1000);
    return () => clearInterval(timer)
  }, [playing, timeElapsed]);

  //verifica se foi virado dois itens iguais
  useEffect(() => {
    if (shownCount === 2) {
      let opened = gridItems.filter(item => item.shown === true) //verifica se o item está aberto
      if (opened.length === 2) {//se duas cartas já estivem abertas

        if(opened[0].item === opened[1].item){ //se os itens forem iguais
        // verificação 1 - se eles são iguais, torna-los permanentes 
          let tempGrid = [...gridItems]; //faço um clone de gridItems    
          for(let i in tempGrid) { //ando pelo array
            if(tempGrid[i].shown) {
              tempGrid[i].permanentShown = true;
              tempGrid[i].shown = false
            }
          }
          setGridItems(tempGrid);
          setShownCount(0);
        } else {
          //verificação 2 - se os itens não forem iguais, são fechados
          setTimeout(() => { //da um tempo maior para mostrar os cars
            let tempGrid = [...gridItems];
            for(let i in tempGrid) {
              tempGrid[i].shown = false
            }
            setGridItems(tempGrid);
            setShownCount(0);
          }, 1000)
        }

        setMoveCount(moveCount => moveCount + 1) //cada fim de jogada é um movimento
      } 
    }
  }, [shownCount, gridItems]) //sempre que meu shownCount e meu gridItems alterar, a gente verifica novamente.

  //verifica se o jogo terminou
  useEffect (() => { 
    if(moveCount > 0 && gridItems.every(item => item.permanentShown === true)) {
      setPlaying(false) //acabou o jogo e todas as funcionalidades são pausadas (Exceto o botão de reiniciar)
    } //verifica se houve algum movimento foi feito e com a função every se todos os itens do array satisfazerem essa condional, ela retorna como true
  }, [moveCount, gridItems])

  const resetAndCreateGrid = () => {
    // passo 1 - resetar o jogo
    setTimeElapsed(0);
    setMoveCount(0);
    setShownCount(0);

    //passo 2 - criar o grid e começar o jogo
    //2.1 - criar um grid vazio
    let tempGrid: GridItemType[] = [] //crio um grid temporario que nele tem um array de gridItemType e começa com um array vazio
    for (let i = 0; i < (items.length * 2); i++)  
      tempGrid.push({ //tempGrid puxa todas as informações que existe em GridItemType
        item: null,
        shown: false,
        permanentShown: false
      });  
    //2.2 - preencher o Grid
    for (let w = 0; w < 2 ; w++){ //preencho os 6 itens aleatorios 2 vezes
      for (let i = 0; i < items.length; i++) { 
        let pos = -1;
        while(pos < 0  || tempGrid[pos].item !== null) { //enquanto a  posição que foi gerada tiver algum item ou for menor do que zero
          pos = Math.floor(Math.random() * (items.length * 2)) //Gera um posição aleatória 
        }
        tempGrid[pos].item = i; //preencho a posição com o item que quero exibir
      }
    }

    //2.3 - jogar no state
    setGridItems(tempGrid);
    //passo 3 -começar o jogo
    setPlaying(true);

  }

  const handleItemClick = (index: number) => { //essa função verifica se o meu item está sendo com permanent shown, essa função não faz nada. Então ele verifica se o item não está com permanent shown e se o item não está sendo exibido, senão estiver ele mostra aquele item
    if(playing && index !== null && shownCount < 2) { //verifica se o jogo está rolando, no Index, verifica se há algo para ser exibido, e exibe ate 2 itens
      let tempGrid = [...gridItems]; //criamos um clone de gridItems 
      if(tempGrid[index].permanentShown === false && tempGrid[index].shown === false){ //verifica se permanentShow e tempGrid estão como false
        tempGrid[index].shown = true; //se estiver, eu transformo o shown em true
        setShownCount(shownCount + 1) // e assim conto o primeiro movimento
      }
      setGridItems(tempGrid) //aprensentamos o GridItems com as mudanças feitas no clone de gidItems
    }
  }

  return(
    <S.Container>
      <S.Info>
        <S.LogoLink href="">
          <img src={logoImage} width="150" alt="Imagem do Logo" />
        </S.LogoLink>
        <S.InfoArea>
          <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)}/>
          <InfoItem label="Movimentos" value={moveCount.toString()}/>
        </S.InfoArea>

        <Button label="Reiniciar" icon={RestartIcon} onClick={resetAndCreateGrid}/>
        <p>Desenvolvido por Thayná Thauany :)</p>
      </S.Info>
      <S.GridArea>
          <S.Grid>  
            {gridItems.map((item, index) =>( //exibe o array de gridItems aqui
              <GridItem 
                key={index}
                item={item}
                onClick={() => handleItemClick(index)} //este onClick é uma prop 
              />
            ))} 
          </S.Grid>
      </S.GridArea>
    </S.Container>
  )
}

export default App;