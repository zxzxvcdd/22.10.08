
const arr = [];

const $map = document.getElementById('map');

for (let $td of [...$map.firstElementChild.firstElementChild.children]) {
    arr.push($td);
}

// console.log(arr);
// =====================================================================
const $hang2 = document.querySelector('.hang2');
// console.log($hang2);
const $hang22 = $hang2.lastElementChild;
arr.push($hang22)

// =====================================================================
const $hang3 = document.querySelector('.hang3');

const $hang32 = $hang3.lastElementChild;
arr.push($hang32)

// =====================================================================
const $hang4 = document.querySelector('.hang4');

const $hang42 = $hang4.lastElementChild;
arr.push($hang42)

// =====================================================================
const $hang5 = document.querySelector('.hang5');

const $hang52 = $hang5.lastElementChild;
arr.push($hang52)

// =====================================================================
const $hang6 = document.querySelector('.hang6');

const $hang62 = $hang6.lastElementChild;
arr.push($hang62)

// =====================================================================
const $hang7 = document.querySelector('.hang7');

const $hang72 = $hang7.lastElementChild;
arr.push($hang72)

// =====================================================================
const $hang8 = document.querySelector('.hang8');

const $hang82 = $hang8.lastElementChild;
arr.push($hang82)

// =====================================================================
const $hang9 = document.querySelector('.hang9');

const $hang92 = $hang9.lastElementChild;
arr.push($hang92)

// =====================================================================

const $hang10 = document.querySelector('.hang10');
const $hang10Arr = $hang10.children; // 유사배열
const $hang10ArrCopy = [...$hang10Arr]; // 유사배열을 정배열로 만들고
const $hang10Reverse = $hang10ArrCopy.reverse(); // 정배열을 역배열로 만들고 

for (let $td of $hang10Reverse) {
    arr.push($td);

}

// =====================================================================

const $hang91 = $hang9.firstElementChild;
arr.push($hang91);

const $hang81 = $hang8.firstElementChild;
arr.push($hang81);

const $hang71 = $hang7.firstElementChild;
arr.push($hang71);

const $hang61 = $hang6.firstElementChild;
arr.push($hang61);

const $hang51 = $hang5.firstElementChild;
arr.push($hang51);

const $hang41 = $hang4.firstElementChild;
arr.push($hang41);

const $hang31 = $hang3.firstElementChild;
arr.push($hang31);

const $hang21 = $hang2.firstElementChild;
arr.push($hang21);

console.log(arr);



// ======================= 변수 선언, 함수 정의부 =================== //

function movingCom() {

    console.log($comCount);
    if ($comCount > arr.length) {
        // console.log('컴퓨터가 이겼습니다.!! YOU LOOSE');
        // alert(('컴퓨터가 이겼습니다.!! YOU LOSE'));
    } else if ($comCount < arr.length) {
        const $comSpan = document.createElement('span');
        $comSpan.classList.add('lnr', 'lnr-rocket');
        arr[$comCount].appendChild($comSpan);
    }

    // $userSpan.innerHTML =`<span class="lnr lnr-rocket"></span>`
}

function movingUser() {

    if ($userCount > arr.length) {
        // console.log('사용자가 이겼습니다.!! YOU WIN!!');
        // alert(('사용자가 이겼습니다.!! YOU WIN!!'));
    } else if ($userCount < arr.length) {
        const $userSpan = document.createElement('span');
        $userSpan.classList.add('lnr', 'lnr-user');
        arr[$userCount].appendChild($userSpan);
    }

    // $userSpan.innerHTML =`<span class="lnr lnr-rocket"></span>`
}

// 이전에 있던 유저 이모티콘 없애는 함수 

function removeUser() {
    for (let i of arr) {
        let $spans = [...i.children];// td안에 span 들을 배열로 만든게 $spans
        // console.log($spans);
        for (let t of $spans) {
            if (t.classList.contains('lnr') && t.classList.contains('lnr-user')) {
                t.classList.remove('lnr');
                t.classList.remove('lnr-user');
            }
        }
    }
}


// 이전에 있던 컴퓨터 이모티콘 없애는 함수 

function removeCom() {
    for (let i of arr) {
        let $spans = [...i.children];
        // console.log($spans);
        for (let t of $spans) {
            if (t.classList.contains('lnr') && t.classList.contains('lnr-rocket')) {
                t.classList.remove('lnr');
                t.classList.remove('lnr-rocket');
            }
        }
    }
}



// 주사위 던지기를 누르면 #dice 박스에 클래스(.throw)를 부여할 함수 정의.
function throwDice() {
    const $dice = document.getElementById('dice');

    if ($dice.classList.contains('throw')) {
        $dice.classList.remove('throw');
    }
    setTimeout(() => {
        $dice.classList.add('throw');
    }, 100);
}




// ========================= 실행부 =====================//


let $comCount = 0;
let $userCount = 0;
let isFinish = false; //게임종료 여부

const $h1 = document.querySelector('.main-title');

// 무인도에서 몇번 주사위를 굴렸는지 카운트할 변수.
let $islandUserCount = 0;
let $islandComCount = 0;


// 클릭이벤트 부여 
const $btn = document.getElementById('dice-button');
$btn.addEventListener('click', e => {
    // console.log(`끝?: ${isFinish}`);
    if (isFinish) {
        if (confirm('게임이 종료되었습니다. 게임을 재시작하시겠습니까?\n페이지가 새로고침됩니다.')) {
            // 새로고침 시키기. // 바로 
            window.location.reload();
        }
        return;
    }


    throwDice(); // 주사위 던지는 애니메이션 함수.

    
    // 주사위 값 랜덤 부여
    const $comNum = Math.floor(Math.random() * 5) + 1;
    const $userNum = Math.floor(Math.random() * 5) + 1;

    let printMessage = "";
    let goValue = 0;

    // console.log(typeof $comNum);// 숫자 
    // console.log(typeof $userNum);// 숫자 
    // 숫자

    // 주사위 값이 누가 큰지를 비교하고 큰 숫자에 해당하는 플레이어에게 동작.

    if ($userNum > $comNum) {

        if ($userCount === 18 && $islandUserCount < 2) {
            $h1.innerHTML = `사용자가 이겼지만 <br> 사용자는 현재 무인도에 있습니다. <br>앞으로 ${2-$islandUserCount}번 동안 주사위를 굴려도 움직일 수 없습니다.`;
            $islandUserCount++;
            return;
        } else if ($userCount === 18 && $islandUserCount === 2) {
            $h1.innerHTML = `사용자가 무인도를 탈출했습니다! <br> 다음 턴부터 정상적으로 게임이 진행됩니다.`;
            $islandUserCount++;
            return;
        }

        removeUser(); // 이전 사용자 이모티콘 지우는 함수.

        // Go/Back 처리
        if ($userCount + $userNum < arr.length) {
            if (arr[$userCount + $userNum].classList.contains('go')) {
                goValue = parseInt(arr[$userCount + $userNum].getAttribute('data-value'));
                $userCount += $userNum + goValue;
                printMessage = `사용자 : ${$userNum} 컴퓨터 : ${$comNum} 로 사용자가 이겼습니다.<br> 사용자가 앞으로 가겠습니다. <br> 럭키포인트! 앞으로 ${goValue}칸 추가 이동합니다.`;
            } else if (arr[$userCount + $userNum].classList.contains('back')) {
                goValue = parseInt(arr[$userCount + $userNum].getAttribute('data-value'));
                $userCount += $userNum + goValue * -1;
                printMessage = `사용자 : ${$userNum} 컴퓨터 : ${$comNum} 로 사용자가 이겼습니다 . <br> 사용자가 앞으로 가겠습니다. <br> 함정포인트! ${$userNum}칸 이동했지만, 뒤로 ${goValue}칸 만큼 되돌아 갑니다.`;
            } else {
                $userCount += $userNum;
                printMessage = `사용자 : ${$userNum} 컴퓨터 : ${$comNum} 로 사용자가 이겼습니다.<br> 사용자가 앞으로 가겠습니다.`;
            }
        } else {
            $userCount += $userNum;
            isFinish = true;
            printMessage = '사용자의 승리로 게임이 종료되었습니다! <br> 다시 하시려면 버튼을 클릭하세요.';
        }

        // 만약 유저가 도착한 지점이 무인도이면 무인도에 도착해버렸네 ㅠㅠ 알려주기.
        if ($userCount === 18) {
            printMessage += `<br> <br>앗! 무인도에 도착해버렸네요..<br>3회 움직임이 제한됩니다.`;
        }

        // 만약 유저가 도착한 지점이 '무인도 여행'칸이면 유를 무인도로 유배보내기
        if ($userCount === 34) { // arr[34]는 무인도 여행 벌칙이 걸린 td !!
            $userCount = 18; // arr[18]은 무인도 벌칙 td!!
            printMessage += `<br> <br>앗! 무인도로 강제 여행을 떠나게 됐습니다..<br>3회 움직임이 제한됩니다.`;
        }

        $h1.innerHTML = printMessage;
        // $h1.innerHTML = $h1.innerHTML.replace(/\n?/g, '<br/>');


        setTimeout(()=>{
           
            movingUser();

        }, 300);


    } else if ($userNum < $comNum) {

        if ($comCount === 18 && $islandComCount < 2) {
            $h1.innerHTML = `컴퓨터가 이겼지만 <br> 컴퓨터는 현재 무인도에 있습니다. <br>앞으로 ${2-$islandComCount}번 주사위를 굴려도 움직일 수 없습니다.`;
            $islandComCount++;
            return;
        } else if ($comCount === 18 && $islandComCount === 2) {
            $h1.innerHTML = `컴퓨터가 무인도를 탈출했습니다! <br> 다음 턴부터 정상적으로 게임이 진행됩니다.`;
            $islandComCount++;
            return;
        }

        removeCom(); // 이전 컴퓨터 이모티콘 지우는 함수.

        // Go/Back 처리
        if ($comCount + $comNum < arr.length) {
            if (arr[$comCount + $comNum].classList.contains('go')) {
                goValue = parseInt(arr[$comCount + $comNum].getAttribute('data-value'));
                $comCount += $comNum + goValue;
                printMessage = `사용자 : ${$userNum} 컴퓨터 : ${$comNum} 로 컴퓨터가 이겼습니다. <br> 컴퓨터가 앞으로 가겠습니다.<br> 럭키포인트! 앞으로 ${goValue}칸 추가 이동합니다.`;
            } else if (arr[$comCount + $comNum].classList.contains('back')) {
                goValue = parseInt(arr[$comCount + $comNum].getAttribute('data-value'));
                $comCount += $comNum + goValue * -1;
                printMessage = `사용자 : ${$userNum} 컴퓨터 : ${$comNum} 로 컴퓨터가 이겼습니다.<br> 컴퓨터가 앞으로 가겠습니다.<br> 함정포인트! ${$comNum}칸 이동했지만, 뒤로 ${goValue}칸 만큼 되돌아 갑니다.`;
            } else {
                $comCount += $comNum;
                printMessage = `사용자 : ${$userNum} 컴퓨터 : ${$comNum} 로 컴퓨터가 이겼습니다.<br> 컴퓨터가 앞으로 가겠습니다.`;
            }
        } else {
            $comCount += $comNum;
            isFinish = true;
            printMessage = '컴퓨터의 승리로 게임이 종료되었습니다!<br>다시 하시려면 버튼을 클릭하세요.';
        }

        // 검퓨터가 도착한 지점이 무인도이면 무인도에 도착해버렸네 ㅠㅠ 알려주기.
        if ($comCount === 18) {
            printMessage += `<br> <br> 앗! 무인도에 도착해버렸네요..<br>3회 움직임이 제한됩니다.`;
        }

        // 만약 컴퓨터가 도착한 지점이 '무인도 여행'칸이면 유를 무인도로 유배보내기
        if ($comCount === 34) { // arr[34]는 무인도 여행 벌칙이 걸린 td !!
            $comCount = 18; // arr[18]은 무인도 벌칙 td!!
            printMessage += `<br> <br>앗! 무인도로 강제 여행을 떠나게 됐습니다..<br>3회 움직임이 제한됩니다.`;
        }

        $h1.innerHTML = printMessage;
        // $h1.innerHTML = $h1.innerHTML.replace(/\n\r?/g, '<br />');

        setTimeout(()=>{
            movingCom();

        }, 300);


    } else if ($comCount === $userCount){
        $h1.textContent = ('같은 숫자가 나왔습니다. 다시눌러주세요.');
        return;
    }


    // console.log($comCount);
    // console.log($userCount);
    //    if (($comCount || $userCount) > 36){
    //     console.log('게임이 끝났습니다.');
    //    }


    // console.log($comCount);
    // console.log($userCount);



});