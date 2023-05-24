let currentQuestion = 0;
let correctAnswers = 0;
let ref = false;
let prox = false;
let botao = document.querySelector('.button');

showQuestion();

// Functions 

function showQuestion(){

    if(questions[currentQuestion]){

        let q = questions[currentQuestion];
        let pct = Math.floor((currentQuestion / questions.length) * 100);

        document.querySelector('.progress--bar').style.width = `${pct}%`

        document.querySelector('.questionArea').style.display = 'block';
        document.querySelector('.scoreArea').style.display = 'none';

        document.querySelector('.question').innerHTML = q.question;
        let optionsHtml = '';

        for (let i in q.options){

            optionsHtml += `<div data-op="${i}" class='option'><span>${Number(i) + 1}</span>${q.options[i]}</div>`;
            document.querySelector('.options').innerHTML = optionsHtml;
        }
        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        })
        let botao = document.querySelector('.button');
        botao.innerHTML = '<button class="add">Próxima questão</button>';
        botao.addEventListener('click', ()=>{
            if(prox === true){
                ref = false
                currentQuestion++;
                prox = false
                showQuestion()
            }
        });
        
    } else {
        botao.innerHTML = '';
        let porcent = Math.floor((correctAnswers / questions.length) * 100);
        let score = document.querySelector('.scoreText1');
        document.querySelector('.questionArea').style.display = 'none';
        document.querySelector('.scoreArea').style.display = 'block';
        document.querySelector('.progress--bar').style.width = '100%';
        let pctShow = document.querySelector('.scorePct')
        pctShow.innerHTML = `Acertou ${porcent}%`;
        document.querySelector('.scoreText2').innerHTML = `Você respondeu ${currentQuestion} questões e acertou ${correctAnswers}`
        document.querySelector('button').addEventListener('click', reset)
        if(porcent > 0){
            score.innerHTML = 'Pode melhorar';
            pctShow.style.color = 'red';
        }
        if(porcent > 33){
            score.innerHTML = 'Quase lá';
            pctShow.style.color = 'yellow';
        }
        if(porcent > 66){
            score.innerHTML = 'Parabéns';
            pctShow.style.color = 'green';
        }
    }

} 

function optionClickEvent(e){
    let clickedOption = parseInt(e.target.getAttribute('data-op'));
    let ok = questions[currentQuestion].answer

    if(ref !== true && questions[currentQuestion].answer === clickedOption){
        correctAnswers++;
        e.target.style.background = 'green';
        ref = true
        prox = true
    } 
    if(ref !== true){
        e.target.style.background = 'red';
        ref = true
        prox = true
    }
    

}

function reset(){

    currentQuestion = 0;
    correctAnswers = 0;
    document.querySelector('.questionArea').style.display = 'block';
    document.querySelector('.scoreArea').style.display = 'none';
    showQuestion()
}