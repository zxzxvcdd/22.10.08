//=============== 전역변수, 함수 정의부분 =============//
const gameData = [{
        id: 1,
        answerLetter: '웃',
        questionLetter: '훗'
    },
    {
        id: 2,
        answerLetter: '웃',
        questionLetter: '욧'
    },
    {
        id: 3,
        answerLetter: '웃',
        questionLetter: '윳'
    },
    {
        id: 4,
        answerLetter: '웃',
        questionLetter: '읏'
    },
    {
        id: 5,
        answerLetter: '웃',
        questionLetter: '옷'
    }
];



//자식 요소 지우는 함수
function removeAllChild($parentNode) {
    //풀이 2. 자식이 있으면(길이가 1 이상이면) 계속 첫째를 삭제하라/
    while (!!$parentNode.children.length) {
        $parentNode.removeChild($parentNode.firstElementChild)
    }
}

// 10초마다 clickHere에 hint 클래스 부여하는 함수
function clickhint(target) {
    const $hint = document.querySelector('.clickHere')
    $hint.classList.toggle('hint');
}

//글자 level개 깔기 함수
function gameBord(maxNum, idxNum) {
    const $letterBord = document.getElementById('letterBord');

    //gameDataIndex
    const $answer = gameData[idxNum].answerLetter;
    const $question = gameData[idxNum].questionLetter;
    const $randomNum = Math.floor(Math.random() * maxNum) + 1;
    const $virtual = document.createDocumentFragment();

    for (let i = 1; i <= maxNum; i++) {
        // console.log(`i: ${i}, random: ${$randomNum}`);
        //가상에 밀어넣을 숫자 div
        const $newDiv = document.createElement('div');

        // level개의 숫자중 정답 만들기
        if (i === $randomNum) {
            $newDiv.textContent = $answer;
            $newDiv.classList.add('clickHere')
            //   console.log(`answer i: ${i}`);
        } else if (i !== $randomNum) {
            $newDiv.textContent = $question;
        }
        //가상의 태그
        $virtual.appendChild($newDiv);
        // 가상의 태그를 보드 판에 넣기
        $letterBord.appendChild($virtual);
    }
    // console.log('-------');
}

// 타이머 작동 시키는 함수
let tim = null; // setInterval 들어갈 변수
function timer() {

    let min = 0;
    let sec = 0;
    let time = 0;

    tim = setInterval(function () {
        const $clock = document.getElementById("clock");
        time++

        sec = Math.floor(time / 60);
        min = Math.floor(sec / 60);
        milsec = time % 100;
        sec = sec % 100;

        // console.log(sec);
        // console.log(min);

        var tm = min;
        var ts = sec;
        var tms = milsec;
        if (tm < 10) {
            tm = "0" + min;
        }
        if (ts < 10) {
            ts = "0" + sec;
        }
        if (tms < 10) {
            tms = "0" + milsec;
        }

        $clock.innerHTML = tm + ":" + ts + ":" + tms;
    }, 10);


}




// 게임판 level개의 숫자로 만들기
function playgame(level) {
    // 몇번째 판인지 구별하는 함수
    let idx = 1;
    // console.log(`idx: ${idx}, lev: ${level}`);

    // 첫판 깔기
    gameBord(level, 0);

    // level별 css적용
    const $letterBord = document.getElementById('letterBord');
    if (level === 9) {
        $letterBord.classList.add('level9')
        // console.log($letterBord.classList);
    } else if (level === 49) {
        $letterBord.classList.add('level49')
        // console.log($letterBord.classList);
    } else if (level === 100) {
        $letterBord.classList.add('level100')
        // console.log($letterBord.classList);
    }

    // 정답 글자에 애니메이션 클래스 부여
    function answerLetterClass() {
        const $answerLetter = document.getElementById('answerLetter');
        const $answerLetterChild = [...$answerLetter.children]
        $answerLetterChild[0].classList.add('animate__infinite', 'animate__animated', 'animate__bounce')
        $answerLetterChild[1].classList.add('animate__infinite', 'animate__animated', 'animate__rubberBand')
        $answerLetterChild[2].classList.add('animate__infinite', 'animate__animated', 'animate__swing')
        $answerLetterChild[3].classList.add('animate__infinite', 'animate__animated', 'animate__jello')
        $answerLetterChild[4].classList.add('animate__infinite', 'animate__animated', 'animate__wobble')
        $answerLetterChild[5].classList.add('animate__infinite', 'animate__animated', 'animate__heartBeat')
    }


    // 정답을 클릭했을 때 새로운 판 깔기
    $letterBord.addEventListener('click', e => {
        if (e.target.matches('#letterBord > .clickHere')) {
            // 5번째의 판이 끝이 났을때 판 지우기
            if (idx === 5) {
                removeAllChild($letterBord);
                // 다음 난이도 도전 알람 이후 다음 난이도 열기
                if (level === 9) {
                    if (confirm('초급 클리어!\n중급에 도전하시겠습니까?')) {
                        idx = 1;
                        $letterBord.classList.replace('level9', 'level49')
                        level = 49;
                        playgame(level);
                    } else {
                        const $answerLetter = document.getElementById('answerLetter')
                        $answerLetter.classList.add('finished')
                        $letterBord.style.display = 'none';
                        answerLetterClass();

                        clearInterval(tim);
                        tim = null;
                    }
                } else if (level === 49) {
                    if (confirm('중급 클리어!\n상급에 도전하시겠습니까?')) {
                        idx = 1;
                        $letterBord.classList.replace('level49', 'level100')
                        level = 100;
                        playgame(level);
                    } else {
                        const $answerLetter = document.getElementById('answerLetter')
                        $answerLetter.classList.add('finished')
                        $letterBord.style.display = 'none';
                        answerLetterClass();

                        clearInterval(tim);
                        tim = null;
                    }
                } else if (level === 100) {
                    alert('게임 클리어!')
                    // window.location.reload()
                    const $answerLetter = document.getElementById('answerLetter')
                    $answerLetter.classList.add('finished')
                    $letterBord.style.display = 'none';
                    answerLetterClass();

                    clearInterval(tim);
                    tim = null;
                }

                return;
            }

            // letterBord의 자식 지우기
            removeAllChild($letterBord);
            // 새로운 판 깔기
            gameBord(level, idx++);
            // console.log(`idx: ${idx}, lev: ${level}==`);
        }

    })
}



// body h1 section에 부여돼 있던 컬러모드 클래스 제거하고 새로 부여
//target: 클릭한 버튼
//colorclass: 부여할 클래스 이름
function removeAddMode(target, colorclass) {
    const $body = document.querySelector('body');
    const $h1 = document.querySelector('header h1');
    const $section = document.querySelector('section');

    //색을 변환할 노드 배열
    const nodeArr = [$body, $h1, $section];
    //색 변환용 클래스 배열
    const classArr = ['sliverMode', 'blackMode', 'greenMode', 'purpleMode'];

    for (let $n of nodeArr) {
        // target에 colorclass가 있다 > 삭제 (똑같은 버튼 두 번 눌렀을 때)
        if ($n.classList.contains(colorclass)) {
            $n.classList.remove(colorclass);
            // target에 colorclass가 없다면 
        } else {
            for (let $c of classArr) {
                // target에 classArr의 클래스가 있으면 삭제
                if ($n.classList.contains($c)) {
                    $n.classList.remove($c);
                }
                $n.classList.add(colorclass);
            }
        }
    }
}


// body h1 section에 부여돼 있던 컬러모드 클래스 추가
function addMode(colorMode) {
    $body.classList.add(colorMode)
    $h1.classList.add(colorMode)
    $section.classList.add(colorMode)
}

// 처음으로를 클릭하면 새로고침하는 함수
function windowReset() {
    window.location.reload();
}

//=============== 메인 코드 실행부분 ===============//
(function () {

    // 난이도 선택 설정
    // 변수 지정
    const $levelWrap = document.querySelector('.level-wrap');
    const $startBtn = document.querySelector('.startBtn');

    $levelWrap.addEventListener('click', e => {
        const $explain = document.getElementById('explain');
        // const $levelWrap = document.querySelector('levelWrap');
        // console.log($levelWrap);
        // console.log(e.target);
        if (e.target.matches('.easy')) {
            // console.log('쉬움');
            // 설명창 사라지기
            $explain.classList.add('disappear')
            // 숫자 9개 보드판 깔기
            playgame(9);
        } else if (e.target.matches('.nomal')) {
            // console.log('중간');
            // 설명창 사라지기
            $explain.classList.add('disappear')
            // 숫자 49개 보드판 깔기
            playgame(49);
        } else if (e.target.matches('.hard')) {
            // console.log('어려움');
            // 설명창 사라지기
            $explain.classList.add('disappear')
            // 숫자 100개 보드판 깔기
            playgame(100);
        } else {
            return;
        }

        // 난의도 선택 후 시작하고 클리어했을때 멈추는 타이머
        timer();
    })

    //힌트 버튼을 클릭하면 정답이 굵어졌다 돌아가는 이벤트
    const $checkboxHint = document.querySelector('.lnrmagnifie');
    $checkboxHint.addEventListener('click', e => {
        clickhint(e.target);
        setTimeout(clickhint, 100);
    })

    //colorBtn 클릭 이벤트 > body h1 section 에 클래스 부여
    const $colorBtn = document.getElementById('colorBtn');
    $colorBtn.addEventListener('click', e => {
        // 버블링 범위 제한
        if (e.target.matches('.silverBtn')) {
            //모든 컬러모드 클랙스 삭제
            removeAddMode(e.target, 'sliverMode');

        } else if (e.target.matches('.blackBtn')) {
            removeAddMode(e.target, 'blackMode');

        } else if (e.target.matches('.greenBtn')) {
            removeAddMode(e.target, 'greenMode');

        } else if (e.target.matches('.purpleBtn')) {
            removeAddMode(e.target, 'purpleMode');
        }
    })


    // 처음으로 버튼을 클릭하면 새로고침하는 이벤트
    const $lnrRedo = document.querySelector('.lnrredo');
    $lnrRedo.addEventListener('click', e => {
        windowReset();
        console.log(e.target);
    })



})() // end 전체 익명함수