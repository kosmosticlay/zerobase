const $container = document.querySelector(".analog-clock");

const AnalogClock = ($container) => {
  const $hours = $container.querySelector(".hour");
  const $minutes = $container.querySelector(".minute");
  const $seconds = $container.querySelector(".second");
  const handleClock = () => {
    const time = new Date();
    let hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    if (hours >= 12) {
      hours -= 12;
    }
    console.log(hours, minutes, seconds);
    $hours.style.setProperty("--deg", hours * 30 + minutes * 0.5);
    $minutes.style.setProperty("--deg", minutes * 6);
    $seconds.style.setProperty("--deg", seconds * 6);
  };

  setInterval(handleClock, 1000);
};

export default AnalogClock;
