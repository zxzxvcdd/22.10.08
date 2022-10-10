// 숫자 생성
function makeIcons() {

     const $numbers = document.querySelector('.numbers');

     //가상의 태그
     const $virtual = document.createDocumentFragment();

     for (let i = 1; i <= 12; i++) {
          const $newDiv = document.createElement('div');
          $newDiv.textContent = i;
          $newDiv.setAttribute('id', `num${i}`);

          $virtual.appendChild($newDiv);
     }
     $numbers.appendChild($virtual);
}

function clock() {
     const digitalClock = document.querySelector(".digital-clock")
     const hourPointer = document.getElementById("hour");
     const minutePointer = document.getElementById("minute");
     const secondPointer = document.getElementById("second");
     // Date는 현제 달 시간 년도 등 나타내줌
     const currentTime = new Date();

     let second = currentTime.getSeconds();
     let secondAngle = second * 6; // 1초가 6도
     let secondAngleValue = `rotate(${secondAngle}deg)`

     let minute = currentTime.getMinutes();
     let minuteAngle = minute * 6; // 1분이 6도
     let minuteAngleValue = `rotate(${minuteAngle}deg)`

     let hour = currentTime.getHours();
     //          (논리형 조건식) ? 참일경우실행할코드 : 거짓일경우실행할코드;
     let hourAngle = (hour > 12 ? (hour - 12) * 30 : hour * 30) + (30 / 60) * minute;
     let hourAngleValue = `rotate(${hourAngle}deg)`

     secondPointer.style.transform = secondAngleValue;
     minutePointer.style.transform = minuteAngleValue;
     hourPointer.style.transform = hourAngleValue;
     /*
     digitalClock.innerText = 
     `${hour < 10 ? `오전 0${hour}`: `${hour > 12 ?`오후 0${hour - 12}` : `오전 ${hour}`}`}:${minute < 10 ? `0${minute}` : `${minute}`}:${second < 10 ? `0${second}` : `${second}`}`;
     */

     const amPm = hour < 12 ? '오전' : '오후';
     minute = minute < 10 ? '0' + minute : minute;
     second = second < 10 ? '0' + second : second;
     hour = hour > 12 ? hour - 12 : hour;

     digitalClock.textContent = `${amPm} ${hour}시 ${minute}분 ${second}초`;
/*
     if (hour < 10) {
          if (minute > 9) {
               if (second > 9) {
                    digitalClock.innerText = `오전 0${hour}시${minute}분${second}초`;
               } else if (second < 10) {
                    digitalClock.innerText = `오전 0${hour}시${minute}분0${second}초`;
               }
          } else if (minute < 10) {
               if (second > 9) {
                    digitalClock.innerText = `오전 0${hour}시0${minute}분${second}초`;
               } else if (second < 10) {
                    digitalClock.innerText = `오전 0${hour}시0${minute}분0${second}초`;
               }
          }
     } else if (hour > 9 && hour < 12) {
          if (minute > 9) {
               if (second > 9) {
                    digitalClock.innerText = `오전 ${hour}시${minute}분${second}초`;
               } else if (second < 10) {
                    digitalClock.innerText = `오전 ${hour}시${minute}분0${second}초`;
               }
          } else if (minute < 10) {
               if (second > 9) {
                    digitalClock.innerText = `오전 ${hour}시0${minute}분${second}초`;
               } else if (second < 10) {
                    digitalClock.innerText = `오전 ${hour}시0${minute}분0${second}초`;
               }
          }
     } else if (hour === 12) {
          if (minute > 9) {
               if (second > 9) {
                    digitalClock.innerText = `오후 ${hour}시${minute}분${second}초`;
               } else if (second < 10) {
                    digitalClock.innerText = `오후 ${hour}시${minute}분0${second}초`;
               }
          } else if (minute < 10) {
               if (second > 9) {
                    digitalClock.innerText = `오후 ${hour}시0${minute}분${second}초`;
               } else if (second < 10) {
                    digitalClock.innerText = `오후 ${hour}시0${minute}분0${second}초`;
               }
          }
     } else if (hour === 24) {
          if (minute > 9) {
               if (second > 9) {
                    digitalClock.innerText = `오전 ${hour-12}시${minute}분${second}초`;
               } else if (second < 10) {
                    digitalClock.innerText = `오전 ${hour-12}시${minute}분0${second}초`;
               }
          } else if (minute < 10) {
               if (second > 9) {
                    digitalClock.innerText = `오전 ${hour-12}시0${minute}분${second}초`;
               } else if (second < 10) {
                    digitalClock.innerText = `오전 ${hour-12}시0${minute}분0${second}초`;
               }
          }
     }
      else if (hour>12 && hour<24)
     if (minute > 9) {
          if (second > 9) {
               digitalClock.innerText = `오후 ${hour-12}시${minute}분${second}초`;
          } else if (second < 10) {
               digitalClock.innerText = `오후 ${hour-12}시${minute}분0${second}초`;
          }
     } else if (minute < 10) {
          if (second > 9) {
               digitalClock.innerText = `오후 ${hour-12}시0${minute}분${second}초`;
          } else if (second < 10) {
               digitalClock.innerText = `오후 ${hour-12}시0${minute}분0${second}초`;
          }
     }*/

}



setInterval(clock, 1000);
makeIcons();