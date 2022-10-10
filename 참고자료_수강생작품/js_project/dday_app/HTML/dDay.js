/*
    얻어야하는값
    입력값 - 타이틀
    입력값 - 시작일
    입력값 - 종료일
    계산값 - 디데이 계산값

    *입력값은 다 따로 받음
    쇼쇼속 객체값 뽑아서 함수 넘기기
*/

//id 받을 배열
const ddayArray = [];

function makeNewId() {
    //생성한 태그값 받기
    return ddayArray.length > 0 ? ddayArray[ddayArray.length - 1].id + 1 : 1;
}
// console.log(ddayArray.length);

// 입력한 디데이데이터 추출해서 리턴
function makeDDay() {
    const dateBox = document.querySelector('div.dateInputdiv');
    const [$dDayName, $startDate, $endDate] = [...dateBox.children];

    const DateObject = {
        id: makeNewId(),
        dayName: $dDayName.value,
        start: $startDate.value,
        end: $endDate.value,
    }
    //return DateObject;
    // console.log(DateObject);
    return DateObject;

};

// 디데이 계산 함수
function getDday() {

    const DateObject = makeDDay();

    //Day는 날짜 계산을 위해 날짜 시간값로 변환
    const startDate = Object.values(DateObject)[2];
    const startDay = Date.parse(startDate);

    const endDate = Object.values(DateObject)[3];
    const endDay = Date.parse(endDate);

    const calDate = endDay - startDay;
    const DdayDate = Math.abs(calDate / (1000 * 3600 * 24));
    console.log(Math.abs(calDate / (1000 * 3600 * 24)));
    return DdayDate;
};


//계산한 객체합쳐서 출력하기?
function addDday() {
    const dDayObj = makeDDay();
    dDayObj.dday = getDday();

    // console.log(dDayobj.dday);
    // console.log('완성객체:', dDayObj);
    //객체 배열 추가 (선생님)
    ddayArray.push(dDayObj);
    // console.log('zz',dDayObj.dday);
    return dDayObj;
}

// 입력 빈문자열 필터 함수
function isValidate() {

    const $dDayText = document.getElementById('dDayTitle');

    // trim(): 문자열의 앞뒤 공백 제거
    if ($dDayText.value.trim() === '') {
        $dDayText.style.background = 'orangered';
        $dDayText.setAttribute('placeholder', '필수 입력사항입니다!');
        $dDayText.value = '';
        return false;
    } else if ($dDayText.value.length > 15) {
        $dDayText.style.background = 'orangered';
        $dDayText.setAttribute('placeholder', '10글자 이내로 작성하세요!');
        $dDayText.value = '';
        return false;
    
    } 
    else {
        $dDayText.style.background = '';
        $dDayText.setAttribute('placeholder', 'd-Day 명을 입력하세요.');
        return true;
    }
}

// 입력되어 있는 텍스트 화면에서 삭제 
function deltext() {
    const $init = document.getElementById('dDayTitle');
    $init.value = '';
    const startDay = document.getElementById('startDay');
    const endDay = document.getElementById('endDay');
    startDay.value = '';
    endDay.value = '';
}

//==========================================================================

const remainTime = document.querySelector("#remain-time");
let dDay = document.querySelector(".d-day");
const $dDayContainer = document.querySelector('.d-day-container');

// 새로운 할 일을 화면에 랜더링하는 함수
function renderNewToDo(dateObj) {
    const $newDiv = document.createElement('div');
    $newDiv.dataset.id = dateObj.id;
    $newDiv.classList.add('container');

    $newDiv.innerHTML = `
        <h1 id="remain-time">D-${dateObj.dday}</h1>
        <h2 id="dday-title">${dateObj.dayName}</h2>
        <p class="d-day">${dateObj.end}</p>
        <div class="remove">
            <span class="lnr lnr-cross-circle"></span>
        </div>
    `;

    const $dDayContainer = document.querySelector('.d-day-container');
    $dDayContainer.appendChild($newDiv)
}

// data-id가 주어지면 해당 id와 일치하는 객체의 인덱스를 리턴
function findIndexById(dataId) {

    for (let i = 0; i < ddayArray.length; i++) {
        // console.log(`todos[i].id: ${typeof todos[i].id}`);
        // console.log(`dataId: ${typeof dataId}`);
        // console.log('=======================');
        if (+dataId === ddayArray[i].id) {
            return i;
        }
    }
    return null; // 못찾았다
}

// 삭제 처리
function removeDday($targetdiv) {
    //1. 화면처리 : 삭제버튼이 선택된 container태그를 d-day-container에서 제거
    $dDayContainer.removeChild($targetdiv)

    //2. 데이터 처리: 배열에서 제거된 container에 매칭하는 객체를 삭제
    const delIndex = findIndexById($targetdiv.dataset.id);
    ddayArray.splice(delIndex, 1);
    // console.log(object);
}


//================================== 실행부=========================
const $addbtn = document.getElementById('addDate');

$addbtn.addEventListener('click', e => {
    e.preventDefault();

    // console.log(isValidate());

    if (isValidate()) {
        const dateObj = addDday();

        renderNewToDo(dateObj); // 입력된 데이터 랜더링
        deltext(); // 입력 값 초기화
    }

});


$dDayContainer.addEventListener('click', e => {
    if (e.target.matches('.remove span')) {
        if (confirm('정말로 삭제할까요')) {
            removeDday(e.target.parentElement.parentElement);
            // changeCheckState(e.target);
        }
    }
})