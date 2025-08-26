tsParticles.load("tsparticles", {
  fpsLimit: 60,
  background: { color: "transparent" },
  detectRetina: true,
  particles: {
    number: { value: 25, density: { enable: true, area: 800 } },
    color: { value: ["#FFD700", "#FFC107", "#FFE08A"] },
    shape: { type: "circle" },
    size: { value: { min: 2, max: 4 }, animation: false },
    opacity: {
      value: { min: 0.3, max: 0.7 },
      animation: { enable: true, speed: 0.2, minimumValue: 0.3, sync: false }
    },
    shadow: { enable: true, blur: 10, color: "#FFD700" },
    links: { enable: false },
    move: {
      enable: true,
      direction: "bottom",
      speed: 0.80,
      gravity: { enable: false },
      decay: 0,
      straight: false,
      random: false,
      outModes: { default: "out" },
      wobble: { enable: true, distance: 2, speed: 0.6 },
      attract: { enable: false },
      trail: { enable: false },
      path: { enable: false },
      spin: { enable: false },
      warp: false
    }
  },
  interactivity: {
    events: {
      onHover: { enable: false },
      onClick: { enable: false },
      resize: true
    }
  },
  motion: { reduce: false }
});
