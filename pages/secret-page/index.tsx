import styles from "./secret-page.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const SecretPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/");
  } else if (status === "loading") {
    return (
      <div>
        <h1 className={styles.titleH1}>Loading...</h1>
      </div>
    );
  } else {
    return (
      <>
        <div>
          <h1 className={styles.titleH1}>
            SEJA BEM-VINDO(A) USUÁRIO(A) - {session?.user?.email}
          </h1>
          <div className={styles.infoContainer}>
            <h3>
              Um trecho de um dos poemas que mais admiro <i>Tabacaria</i>, por
              Álvaro Campos:
            </h3>
            <p>
              Não sou nada. Nunca serei nada. Não posso querer ser nada. À parte
              isso, tenho em mim todos os sonhos do mundo.
              <br />
              <br />
              <br />
              Janelas do meu quarto, Do meu quarto de um dos milhões do mundo
              que ninguém sabe quem é (E se soubessem quem é, o que saberiam?),
              Dais para o mistério de uma rua cruzada constantemente por gente,
              Para uma rua inacessível a todos os pensamentos, Real,
              impossivelmente real, certa, desconhecidamente certa, Com o
              mistério das coisas por baixo das pedras e dos seres, Com a morte
              a pôr umidade nas paredes e cabelos brancos nos homens, Com o
              Destino a conduzir a carroça de tudo pela estrada de nada.
              <br />
              <br />
              <br />
              Estou hoje vencido, como se soubesse a verdade. Estou hoje lúcido,
              como se estivesse para morrer, E não tivesse mais irmandade com as
              coisas Senão uma despedida, tornando-se esta casa e este lado da
              rua A fileira de carruagens de um comboio, e uma partida apitada
              De dentro da minha cabeça, E uma sacudidela dos meus nervos e um
              ranger de ossos na ida.
              <br />
              <br />
              <br />
              Estou hoje perplexo, como quem pensou e achou e esqueceu. Estou
              hoje dividido entre a lealdade que devo À Tabacaria do outro lado
              da rua, como coisa real por fora, E à sensação de que tudo é
              sonho, como coisa real por dentro.
              <br />
              <br />
              <br />
              Falhei em tudo. Como não fiz propósito nenhum, talvez tudo fosse
              nada. A aprendizagem que me deram, Desci dela pela janela das
              traseiras da casa. Fui até ao campo com grandes propósitos. Mas lá
              encontrei só ervas e árvores, E quando havia gente era igual à
              outra. Saio da janela, sento-me numa cadeira. Em que hei de
              pensar? .........
            </p>
          </div>
        </div>
      </>
    );
  }
};

export default SecretPage;
