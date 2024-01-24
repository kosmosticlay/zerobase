const AnalogClock = () => {
  const $containers = document.querySelectorAll(".analog-clock");
  $containers.forEach((container) => {
    const $fragment = document.createDocumentFragment();

    // 시, 분, 초 구조 생성
    const $hour = document.createElement("div");
    $hour.className = "hand hour";
    $fragment.appendChild($hour);

    const $minute = document.createElement("div");
    $minute.className = "hand minute";
    $fragment.appendChild($minute);

    const $second = document.createElement("div");
    $second.className = "hand second";
    $fragment.appendChild($second);

    // 분 구분선 구조 생성
    for (let i = 1; i <= 12; i++) {
      const $line = document.createElement("div");
      $line.className = `time time${i}`;
      $line.textContent = "|";
      $fragment.appendChild($line);
    }

    container.appendChild($fragment);

    // 시계의 시침, 분침, 초침을 각각 저장
    const handleClock = () => {
      const time = new Date();
      let hours = time.getHours();
      const minutes = time.getMinutes();
      const seconds = time.getSeconds();

      if (hours >= 12) {
        hours -= 12;
      }

      $hour.style.setProperty("--deg", hours * 30 + minutes * 0.5);
      $minute.style.setProperty("--deg", minutes * 6);
      $second.style.setProperty("--deg", seconds * 6);
    };

    handleClock();
    setInterval(handleClock, 1000);
  });
};

export default AnalogClock;
