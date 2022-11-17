
const proverbContainer = document.getElementById('proverb-container')
const proverbText = document.getElementById('proverb')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newProverbBtn = document.getElementById('new-proverb')
const loader = document.getElementById('loader')


function showLoading(){
    loader.hidden = false;
    proverbContainer.hidden = true;
}

function hideLoading(){
    proverbContainer.hidden = false;
    loader.hidden = true;
}

let apiProverbs = [];

function showProverb(apiProverbs){
    showLoading()
    const proverb = apiProverbs[Math.floor(Math.random() * apiProverbs.length)]

    if(!proverb.author){
        authorText.textContent = "Unknown"
    }else{
        authorText.textContent = proverb.author;
    }
    
    if(proverb.text.length > 50){
        proverbText.classList.add('long-proverb')
    }else{
        proverbText.classList.remove('long-proverb')
    }

    proverbText.textContent = proverb.text;
    hideLoading()
}
// Get Provebs From API
async function getProverbs(){
    showLoading()
    const apiUrl='https://type.fit/api/quotes'

    try{
        const response = await fetch(apiUrl);
        apiProverbs = await response.json();

        showProverb(apiProverbs)
    }catch(error){
            
    }
}

//Tweet Proverb
function tweetProverb(){
  const twitterUrl = `https://twitter.com/intent/tweet?text=${proverbText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank')
}

//Event Listner
newProverbBtn.addEventListener('click', getProverbs);
twitterBtn.addEventListener('click', tweetProverb)
// On Load
getProverbs()

