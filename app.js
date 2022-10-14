
//////////////////////////// global variable ////////////////////////////

// 드래그시 가져올 x,y 좌표
let newPosX = 0,
    newPosY = 0,
    startPosX = 0,
    startPosY = 0;


const userName = "admin",
    userPw = "123456";




const noteData = [
    {
        h1: "제목",
        pageNum: 1,
        text: "내용을 입력하세요",
        tags: [],

    }
];




//////////////////////////// 함수 ////////////////////////////

// 드랍다운 안에 있는 아이콘 클릭 이벤트
// has to be fa-regular :)

function eventListenerIcon($iconName) {
    const $listenIcon = document.querySelector(
        `.dropdown-content>.drop-wrapper> .${$iconName}`
    );
    $listenIcon.addEventListener("click", (e) => {
        // 아이콘을 페이지에 추가하기 위해 createElement 하기
        const $newDiv = document.createElement("div");
        $newDiv.classList.add("image");
        $newDiv.innerHTML = `<i class="fa-regular ${$iconName} fa-2x"></i>`;

        const $page = document.querySelector("#txtContent");
        console.log($newDiv);
        $page.appendChild($newDiv);
        console.log($newDiv);
        console.log("testA");

        // 드래그 함수 콜
        moveIcon();
        // console.log($page);

        eventClickRemove();
    });
}


// 사용자 정보
function userSection() {

    const $uName = document.querySelector("#user > .name > span");

    $uName.textContent = userName;

    // 소개글 수정
    function modifyIntro(){

    const $modify = document.querySelector(".intro button");

    // intro 수정 
    $modify.addEventListener("click", (e) => {
        if (introCnt === 0) {

            const $introSpan = document.querySelector(".introText > span");

            userIntro = $introSpan.textContent;

            const $newInput = document.createElement("input");

            $newInput.setAttribute('value', userIntro);



            $introSpan.parentElement.appendChild($newInput);
            $introSpan.parentElement.removeChild($introSpan);


            introCnt = 1;

        } else {

            const $introInput = document.querySelector(".introText > input");


            console.log("인트로인풋 :" + $introInput.value)
            console.log("인풋 텍스트 :" + $introInput.textContent)

            userIntro = $introInput.value;

            const $newSpan = document.createElement("span");

            console.log("유저 인트로 :" + userIntro);

            $newSpan.textContent = userIntro;

            console.log($newSpan)

            $introInput.parentElement.appendChild($newSpan);
            $introInput.parentElement.removeChild($introInput);


            introCnt = 0;

        };


    });



    }
    
    // 로그아웃
    function logout() {

    const $logout = document.querySelector(".logoutBtn");

    $logout.addEventListener("click", (e) => {

        window.location.reload()

    });



    }

    let userIntro = "소개글을 입력해주세요.";
    let introCnt = 0;



    modifyIntro();

    logout();
}





// 페이지에 추가된 아이콘을 움직이기 위한 함수
function moveIcon() {
    // list of added icons
    const elList = document.querySelectorAll(".image");

    // when the user clicks down on the element
    elList.forEach((el) =>
        el.addEventListener("mousedown", function (e) {
            e.preventDefault();

            // get the starting position of the cursor
            startPosX = e.clientX;
            startPosY = e.clientY;

            document.addEventListener("mousemove", mouseMove);

            document.addEventListener("mouseup", function () {
                document.removeEventListener("mousemove", mouseMove);
            });

            function mouseMove(e) {
                // calculate the new position
                newPosX = startPosX - e.clientX;
                newPosY = startPosY - e.clientY;

                // with each move we also want to update the start X and Y
                startPosX = e.clientX;
                startPosY = e.clientY;

                // set the element's new position:
                el.style.top = el.offsetTop - newPosY + "px";
                el.style.left = el.offsetLeft - newPosX + "px";
            }
        })
    );
}

// login id and password validation
function validateLogin() {
    const $id = document.getElementById("id");
    const $pwd = document.getElementById("password");

    // if the id is different or empty, login failed
    if ($id.value != userName || $id.value.trim() === "") {
        $id.style.background = "#dcdcdc";
        $id.setAttribute("placeholder", "아이디가 틀렸습니다. 다시 입력해주세요");
        $id.value = "";
        return false;
    }

    // if the password is different or empty, login failed
    if ($pwd.value != userPw || $pwd.value.trim() === "") {
        $pwd.style.background = "lightgrey";
        $pwd.setAttribute(
            "placeholder",
            "비밀번호가 틀렸습니다. 다시 입력해주세요"
        );
        $pwd.value = "";
        $id.style.background = "";
        return false;
    }

    // if all matches, reset background and return true
    $id.style.background = "";
    $pwd.style.background = "";
    return true;
}

// 로그인 성공시 다음 페이지로 넘어가기
function eventLogin() {
    const $login = document.getElementById("loginBtn");
    $login.addEventListener("click", (e) => {
        e.preventDefault();

        if (!validateLogin()) {
            return;
        } else {
            const $loginSection = document.querySelector(".wrapper > .loginSection");
            const $main = document.querySelector(".main");


            $loginSection.style.display = "none";
            $main.style.display = "block";

        }
        // const $loginFlip = document.querySelector('.loginSection');

        // $loginFlip.classList.add('page');
        // $loginFlip.classList.add('page1');
    });
}
// 드랍다운 박스 나오기/들어가기 이벤트
function eventDropDown() {
    const $iconBtn = document.querySelector(".iconDropdown");
    const $dropDown = document.querySelector(".dropdown-content");

    // select icon mouseover, dropdown
    $iconBtn.addEventListener("mouseover", (e) => {
        $dropDown.style.display = "block";
        // select icon mouseleave, dropdown disappears
        // $iconBtn.addEventListener("mouseleave", (e) => {
        //   $dropDown.style.display = "none";
        // });
    });
}

// 아이콘 더블클릭 시 삭제
function eventClickRemove() {
    // list of added icons
    const trashList = document.querySelectorAll(".image");

    // when the user clicks down on the element
    trashList.forEach((el) =>
        el.addEventListener("dblclick", function (e) {
            e.preventDefault();

            el.parentElement.removeChild(el);
        })
    );
}

// login initially, and open note
function initialize() {
    const $main = document.querySelector(".main");


    // 로그인 페이지만,,,
    $main.style.display = 'none';

}

// Page 구현
function ShowMeThePage() {


    /* 태그 삭제 */
    function clearTags($txtContent) {
        const $page = $txtContent.parentElement;
        while ($page.children.length > 1) {
            $page.removeChild($page.lastElementChild);
        }
    }

    /* 태그 추가 */
    function AddTags($txtContent) {
        let tagList = [];
        const $page = $txtContent.parentElement;
        for (let i = 1; i < $page.children.length; i++) {
            tagList.push($page.children[i]);
        }
        return tagList;
    }

    /* 페이지 저장 함수 */
    function SavePage($txtContent) {
        noteData[pageCount - 1].text = $txtContent.innerHTML;
        console.log(noteData[pageCount - 1].text);
        if ($txtContent.nextElementSibling) {
            noteData[pageCount - 1].tags = AddTags($txtContent);
            clearTags($txtContent);
        }

        console.log("SavePage : ", noteData[pageCount - 1]);
    }

    /* 새 페이지 추가 함수 */
    function AddNewPage($pageNum, $txtContent) {
        const defalutNoteData = {
            pageNum: pageCount,
            h1: "제목",
            text: "내용을 입력하세요",
            tags: [],
        };

        noteData.push(defalutNoteData);

        const $newTitle = document.createElement("h1");
        $newTitle.classList.add("title");
        $newTitle.innerHTML = "제목";



        $pageNum.textContent = `- ${noteData[pageCount - 1].pageNum} -`;
        $txtContent.innerHTML = noteData[pageCount - 1].text;
        $txtContent.insertBefore($newTitle, $txtContent.firstChild);
        $txtContent.prepend($newTitle);


        console.log("AddNewPageObject :", noteData);
    }

    /* 선택한 페이지 보여주는 함수 */
    function ShowPage($next, $txtContent, $pageNum) {
        const plus = "fa-plus";
        const next = "fa-angle-right";


        $pageNum.textContent = `- ${noteData[pageCount - 1].pageNum} -`;
        $txtContent.innerHTML = noteData[pageCount - 1].text;


        for (node of noteData[pageCount - 1].tags) { // 태그 추가
            $txtContent.parentElement.appendChild(node);
        }

        if (noteData.length === pageCount) { // 마지막페이지는 next = + 모양
            $next.classList.add(plus);
            $next.classList.remove(next);
            return;
        }
        $next.classList.add(next); // 나머지 next = > 모양
        $next.classList.remove(plus);

        console.log("ShowPage :", noteData[pageCount - 1]);
    }

    let pageCount = 1;

    const $btnList = document.querySelector(".pageBtn");

    /* next , prev 클릭 시 이벤트 */
    $btnList.addEventListener("click", function (e) {
        const plus = "fa-plus";
        const prev = "fa-angle-left";
        const $target = e.target;

        const $txtContent = document.querySelector("#txtContent");
        const $next = document.querySelector(".next-page");
        const $pageNum = document.querySelector("#pageNum");

        // console.log("h1 : "+$txtContent.firstChild);
        SavePage($txtContent);
        $next.previousElementSibling.classList.add(prev);

        if ($target.classList.contains("prev-page")) {
            pageCount--;
            if (pageCount === 1) {
                // 첫번째 페이지에서는 prev 삭제
                {
                    document.querySelector(".prev-page").classList.remove(prev);
                }
            }
            ShowPage($next, $txtContent, $pageNum);
        } else {
            pageCount++;
            $next.classList.contains(plus)
                ? AddNewPage($pageNum, $txtContent)
                : ShowPage($next, $txtContent, $pageNum);
        }
    });
}


// function ShowMeTheTable()
// {
//   let TnewPosX = 0,
//   TnewPosY = 0,
//   TstartPosX = 0,
//   TstartPosY = 0;

//   /* table 가상 돔 리턴 */
//   function MakeTableDom(columsCount,rowsCount)
//   {
//     const $virtual = document.createDocumentFragment();
//       const $newDiv = document.createElement('div');
//       const $newTable = document.createElement('table');
//       const $newTh = document.createElement('th');

//       $newDiv.classList.add('tableBox')
//       $newTable.classList.add('table');
//       $newTh.colSpan = rowsCount;
//       $newTh.contentEditable = true;
//       $newDiv.appendChild($newTable);
//       $newTable.appendChild($newTh);

//       for (let y = 0; y < columsCount; y++) {
//         const $newTr = document.createElement('tr');
//         $newTable.appendChild($newTr);

//         for (let x = 0; x < rowsCount; x++) {
//           const $newTd = document.createElement('td');
//           $newTd.contentEditable = true;
//           $newTr.appendChild($newTd);
//         }
//       }

//       $virtual.appendChild($newDiv);
//       return $virtual;
//   }


//     const $btnAddTable = document.querySelector('.btnAddTable');

//     /* 표만들기 클릭 시  */
//     $btnAddTable.addEventListener('click', function (e) {

//     const $page = document.querySelector('.page');
//     const columsCount = +prompt('열 숫자입력');
//     const rowsCount = +prompt('행 숫자입력');

//     $page.appendChild(MakeTableDom(columsCount,rowsCount));

//     MoveTable();
//     RemoveTable();

//     /* 표 움직이기 */
//     function MoveTable() {

//       const $TboxList = document.querySelectorAll(".tableBox");

//       $TboxList.forEach((Tbox) =>
//       Tbox.addEventListener("mousedown", function (e) {
//         if (!e.target.matches('.tableBox')) return;  

//         e.preventDefault();

//           TstartPosX = e.clientX;
//           TstartPosY = e.clientY;

//           document.addEventListener("mousemove", mouseTableMove);

//           document.addEventListener("mouseup", function () {
//             document.removeEventListener("mousemove", mouseTableMove);
//           });


//           function mouseTableMove(e) {
//             // calculate the new position
//             TnewPosX = TstartPosX - e.clientX;
//             TnewPosY = TstartPosY - e.clientY;
//             // with each move we also want to update the start X and Y
//             TstartPosX = e.clientX;
//             TstartPosY = e.clientY;

//             // set the element's new position:Z
//             Tbox.style.top = Tbox.offsetTop - TnewPosY + "px";
//             Tbox.style.left = Tbox.offsetLeft - TnewPosX + "px";
//           }
//         })
//       );
//     }

//     /* 표 삭제 */
//     function RemoveTable() {
//       const trashList = document.querySelectorAll(".tableBox");

//       trashList.forEach((el) =>
//         el.addEventListener("dblclick", function (e) {
//           if (!e.target.matches('.tableBox')) return;  

//           console.log(e);

//           e.preventDefault();

//           el.parentElement.removeChild(el);
//         })
//       );
//     }
//   })
// }





(function () {



    initialize();


    const $loginSection = document.querySelector(".wrapper > .loginSection");


    if ($loginSection != null) {
        eventLogin();
        //   usersection 추가
        userSection();
    }

    // // hover to show dropdown menu
    eventDropDown();

    // add event listener for each iconsㅋ
    eventListenerIcon("fa-address-card");
    eventListenerIcon("fa-credit-card");
    eventListenerIcon("fa-bell");
    eventListenerIcon("fa-hand-point-up");
    eventListenerIcon("fa-heart");
    eventListenerIcon("fa-hospital");
    eventListenerIcon("fa-square-check");

    ShowMeThePage();
    // ShowMeTheTable();

})();


