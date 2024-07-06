// Variáveis
const geralbtn = document.getElementById("geral");
const economiabtn = document.getElementById("economia");
const esportebtn = document.getElementById("esporte");
const tecnologiabtn = document.getElementById("tecnologia");
const entretenimentobtn = document.getElementById("entretenimento");
const pesquisabtn = document.getElementById("pesquisa");

const newsQuery = document.getElementById("newsQuery");
const tiposdenoticia = document.getElementById("tiposdenoticia");
const detalhesdanoticia = document.getElementById("detalhesdanoticia");

var newsDataArr = [];

// API Key
const API_KEY = "5a30d258b3e84762a3b8db594602d280";
const BASE_URL = "https://newsapi.org/v2/top-headlines?country=us&apiKey=" + API_KEY;

// Função para carregar as manchetes
const fetchHeadLines = async () => {
    const response = await fetch(BASE_URL);
    newsDataArr = [];

    if (response.ok) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
    }

    MostreNoticia();
};

// Funções para carregar notícias específicas
const fetchNoticiaGeral = async () => await fetchNoticias('geral');
const fetchNoticiaEconomia = async () => await fetchNoticias('economia');
const fetchNoticiaEsporte = async () => await fetchNoticias('esporte');
const fetchNoticiaTecnologia = async () => await fetchNoticias('tecnologia');
const fetchNoticiaEntretenimento = async () => await fetchNoticias('entretenimento');

const fetchNoticias = async (categoria) => {
    const response = await fetch(`${BASE_URL}&category=${categoria}`);
    newsDataArr = [];

    if (response.ok) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
    }

    MostreNoticia();
};

// Função para carregar notícias baseadas em pesquisa
const fetchQueryNews = async () => {
    if (!newsQuery.value) return;

    const response = await fetch(`${BASE_URL}&q=${encodeURIComponent(newsQuery.value)}`);
    newsDataArr = [];

    if (response.ok) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
    }

    MostreNoticia();
};

// Função para exibir as notícias
function MostreNoticia() {
    detalhesdanoticia.innerHTML = "";

    if (newsDataArr.length === 0) {
        detalhesdanoticia.innerHTML = "<h5>Sem dados disponíveis</h5>";
        return;
    }

    newsDataArr.forEach(news => {
        const date = news.publishedAt.split("T");

        const col = document.createElement('div');
        col.className = "col-sm-12 col-md-4 col-lg-3 p-2 card";

        const card = document.createElement('div');
        card.className = "p-2";

        const image = document.createElement('img');
        image.setAttribute("height", "matchparent");
        image.setAttribute("width", "100%");
        image.src = news.urlToImage;

        const cardBody = document.createElement('div');

        const newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        const dateHeading = document.createElement('h6');
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date[0];

        const description = document.createElement('p');
        description.className = "text-muted";
        description.innerHTML = news.description;

        const link = document.createElement('a');
        link.className = "btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML = "Leia mais";

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(description);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        detalhesdanoticia.appendChild(col);
    });
}

// Adiciona eventos aos botões
window.onload = fetchHeadLines;
geralbtn.addEventListener("click", fetchNoticiaGeral);
economiabtn.addEventListener("click", fetchNoticiaEconomia);
esportebtn.addEventListener("click", fetchNoticiaEsporte);
tecnologiabtn.addEventListener("click", fetchNoticiaTecnologia);
entretenimentobtn.addEventListener("click", fetchNoticiaEntretenimento);
pesquisabtn.addEventListener("click", fetchQueryNews);
