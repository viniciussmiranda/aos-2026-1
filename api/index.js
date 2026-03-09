import "dotenv/config";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Servidor rodando!\n" + process.env.MESSAGE);
});

// 1. GET /random
app.get("/random", (req, res) => {
  const numero = Math.floor(Math.random() * 100) + 1;
  res.send(`Número aleatório: ${numero}`);
});

// 2. GET /dado 
app.get("/dado", (req, res) => {
  const dado = Math.floor(Math.random() * 6) + 1;
  res.send(`Você tirou: ${dado}`);
});

// 3. GET /citacoes
const citacoes = [
  { autor: "Ada Lovelace", citacao: "A Máquina Analítica não tem pretensão alguma de originar qualquer coisa. Ela pode fazer tudo aquilo que soubermos como ordenar que ela faça." },
  { autor: "Ada Lovelace", citacao: "A imaginação é a faculdade da descoberta por excelência. É aquela que penetra nos mundos invisíveis ao nosso redor." },
  { autor: "Grace Hopper", citacao: "A frase mais prejudicial na língua é: sempre fizemos assim." },
  { autor: "Grace Hopper", citacao: "Em ciência da computação, é mais fácil pedir perdão do que pedir permissão." },
  { autor: "Grace Hopper", citacao: "Um navio no porto é seguro, mas não é para isso que os navios são construídos." },
  { autor: "Katherine Johnson", citacao: "Faça seu trabalho tão bem que eles não consigam tirar os olhos de você." },
  { autor: "Katherine Johnson", citacao: "Eu contava tudo. Os passos, as distâncias até a escola, as estrelas no céu." },
  { autor: "Margaret Hamilton", citacao: "Não havia termo para o que eu fazia. Então eu chamei de engenharia de software." },
  { autor: "Margaret Hamilton", citacao: "Erros de software não eram levados a sério antes. Eu queria que fossem tratados com o mesmo rigor da engenharia tradicional." },
  { autor: "Alan Turing", citacao: "Uma máquina que tem a pretensão de pensar deve também ter a pretensão de sentir." },
  { autor: "Alan Turing", citacao: "Às vezes são as pessoas que ninguém imagina capazes de nada que fazem as coisas que ninguém consegue imaginar." },
  { autor: "Alan Turing", citacao: "Podemos ver apenas um pouco do futuro, mas o suficiente para perceber que há muito a fazer." },
  { autor: "Tim Berners-Lee", citacao: "A Web não é uma tecnologia — é um espaço social." },
  { autor: "Tim Berners-Lee", citacao: "Os dados são uma coisa preciosa e durarão mais do que os próprios sistemas." },
  { autor: "Linus Torvalds", citacao: "O software é como o sexo: é melhor quando é livre." },
  { autor: "Linus Torvalds", citacao: "A maioria dos bons programadores programa não porque esperam ser pagos, mas porque é divertido programar." },
  { autor: "Claude Shannon", citacao: "Eu visualizo um dia em que poderemos criar máquinas que aprenderão com as suas próprias experiências." },
  { autor: "Claude Shannon", citacao: "A informação é a resolução da incerteza." },
  { autor: "Radia Perlman", citacao: "A internet não foi projetada para um único ponto de falha. Essa é sua maior força." },
  { autor: "Radia Perlman", citacao: "Tecnologia deveria ser invisível — quando funciona bem, você nem percebe que ela está lá." },
  { autor: "John von Neumann", citacao: "Em matemática, você não entende as coisas. Você simplesmente se acostuma com elas." },
  { autor: "John von Neumann", citacao: "Se as pessoas não acreditam que a matemática é simples, é apenas porque não percebem o quão complicada é a vida." },
  { autor: "Dennis Ritchie", citacao: "O único modo de aprender uma nova linguagem de programação é escrever programas nela." },
  { autor: "Dennis Ritchie", citacao: "Unix é basicamente um sistema operacional simples, mas você precisa ser um gênio para entender a simplicidade." },
  { autor: "Barbara Liskov", citacao: "Bom design significa que quando algo muda, apenas uma coisa precisa mudar com ele." },
  { autor: "Barbara Liskov", citacao: "Abstrações são o coração da programação. Elas nos permitem esconder complexidade e focar no essencial." },
  { autor: "Vint Cerf", citacao: "A internet é um reflexo da nossa sociedade e esse espelho vai mostrar o que projetarmos nele." },
  { autor: "Vint Cerf", citacao: "Se não estiver quebrado, não conserte — mas se não for monitorado, você não saberá se está quebrado." },
  { autor: "Fran Allen", citacao: "Minha maior esperança é que a computação se torne algo que todo mundo possa usar para realizar coisas extraordinárias." },
  { autor: "Fran Allen", citacao: "A otimização de compiladores é uma arte — você precisa entender tanto o hardware quanto o programador." },
];

app.get("/citacoes", (req, res) => {
  const indice = Math.floor(Math.random() * citacoes.length);
  res.send(citacoes[indice]);
});

export default app;