const hourHand = document.querySelector(".hourhand");
const minuteHand = document.querySelector(".minute");

// svg要素用のXML名前空間
const secondHand = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "line"
);
secondHand.setAttribute("class", "secondhand");
secondHand.setAttribute("x1", "50");
secondHand.setAttribute("y1", "50");
secondHand.setAttribute("x2", "50");
secondHand.setAttribute("y2", "15");
secondHand.setAttribute("stroke", "red");
secondHand.setAttribute("stroke-width", "1.5");
secondHand.setAttribute("stroke-linecap", "round");

document.querySelector(".hands").appendChild(secondHand);

function updateClock() {
  const now = new Date();
  const hours = now.getHours() % 12; //12時間の時計なので
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const hourAngle = (hours + minutes / 60) * 30; // 360÷12
  const minuteAngle = (minutes + seconds / 60) * 6; // 360÷60
  const secondAngle = seconds * 6; // 360÷60

  hourHand.setAttribute("transform", `rotate(${hourAngle} 50 50)`);
  minuteHand.setAttribute("transform", `rotate(${minuteAngle} 50 50)`);
  secondHand.setAttribute("transform", `rotate(${secondAngle} 50 50)`);
}

setInterval(updateClock, 1000);
updateClock();
