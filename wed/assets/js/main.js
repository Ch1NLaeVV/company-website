const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = [...document.querySelectorAll(".site-nav a")];

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    document.body.classList.toggle("nav-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (header) {
  const syncHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });
}

const syncActiveNav = () => {
  const offset = (header?.offsetHeight || 0) + 36;
  const targets = navLinks
    .map((link) => {
      const id = link.getAttribute("href")?.replace("#", "");
      const target = id ? document.getElementById(id) : null;
      return target ? { id, link, top: target.offsetTop } : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.top - b.top);

  let active = targets[0];
  const marker = window.scrollY + offset;

  for (const target of targets) {
    if (target.top <= marker) {
      active = target;
    }
  }

  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) {
    active = targets[targets.length - 1];
  }

  navLinks.forEach((link) => {
    const isActive = link === active?.link;
    link.classList.toggle("is-active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

syncActiveNav();
window.addEventListener("scroll", syncActiveNav, { passive: true });
window.addEventListener("resize", syncActiveNav);
window.addEventListener("hashchange", syncActiveNav);

const solutionContent = {
  network: {
    title: "Network",
    body:
      "เราคือผู้เชี่ยวชาญด้านการออกแบบระบบ Network Infrastructure ที่ตอบโจทย์องค์กรยุคใหม่ วางโครงสร้างตั้งแต่ระดับ Core จนถึง Access Layer ครอบคลุม Router, Switch, Firewall, Load Balancer, Access Point และ Internet Link เพื่อสร้างระบบที่เสถียร ปลอดภัย และพร้อมรองรับการเติบโตของธุรกิจในระยะยาว"
  },
  cyber: {
    title: "Cyber Security",
    body:
      "ออกแบบและยกระดับระบบความปลอดภัยทางไซเบอร์แบบครบวงจร เพื่อปกป้ององค์กรจากภัยคุกคามทุกรูปแบบในยุคดิจิทัล ไม่ว่าจะเป็นการโจมตีจากภายนอกหรือความเสี่ยงภายในระบบ เราใช้เทคโนโลยี Security ชั้นนำเพื่อช่วยตรวจจับ วิเคราะห์ และตอบสนองต่อเหตุการณ์แบบ Real-time อย่างมีประสิทธิภาพสูงสุด"
  },
  cloud: {
    title: "Cloud",
    body:
      "ย้ายระบบขึ้น Cloud อย่างปลอดภัยและคุ้มค่า ด้วยโซลูชันแบบครบวงจร ตั้งแต่ Cloud Infrastructure, VM as a Service, Backup as a Service, ไปจนถึง Disaster Recovery Site และ Database as a Service เพื่อให้ธุรกิจของคุณทำงานได้ต่อเนื่อง ลดความเสี่ยงจากระบบล่ม เพิ่มความยืดหยุ่นในการขยายระบบ และควบคุมต้นทุนได้อย่างมีประสิทธิภาพ"
  },
  endpoint: {
    title: "Endpoint",
    body:
      "Endpoint Security ที่ออกแบบมาเพื่อรับมือภัยคุกคามยุคใหม่อย่างรอบด้าน ไม่ว่าจะเป็นแล็ปท็อป คอมพิวเตอร์ หรืออุปกรณ์ที่เชื่อมต่อเครือข่าย ระบบ Endpoint ช่วยตรวจจับ ป้องกัน และตอบสนองต่อมัลแวร์ แรนซัมแวร์ และการโจมตีทางไซเบอร์ได้แบบเรียลไทม์ ลดความเสี่ยงของการรั่วไหลของข้อมูล"
  },
  data: {
    title: "Data Security",
    body:
      "Data Security ที่ออกแบบมาเพื่อรักษาความลับ ความถูกต้อง และความพร้อมใช้งานของข้อมูลในทุกระดับ ตั้งแต่การจัดเก็บ การรับส่ง ไปจนถึงการเข้าถึงข้อมูล ช่วยลดความเสี่ยงจากการรั่วไหล การโจมตีทางไซเบอร์ และการเข้าถึงโดยไม่ได้รับอนุญาต"
  },
  design: {
    title: "Design & Solution",
    body:
      "ออกแบบระบบโครงสร้างพื้นฐานสำหรับองค์กรแบบครบวงจรตั้งแต่ CCTV เพื่อความปลอดภัยและการเฝ้าระวังตลอด 24 ชั่วโมง, War Room สำหรับการบริหารจัดการเหตุการณ์แบบเรียลไทม์, Server Room ที่รองรับระบบไอทีอย่างมีเสถียรภาพ, Meeting Room ที่พร้อมสำหรับการสื่อสารและการทำงานร่วมกันอย่างมีประสิทธิภาพ ไปจนถึงการวางระบบ Fiber Optic & UTP ที่ช่วยให้การส่งข้อมูลมีความเร็วสูงและเสถียร"
  }
};

const dialog = document.querySelector("[data-solution-dialog]");
const dialogTitle = document.querySelector("[data-dialog-title]");
const dialogBody = document.querySelector("[data-dialog-body]");

document.querySelectorAll("[data-open-solution]").forEach((button) => {
  button.addEventListener("click", () => {
    const solution = solutionContent[button.dataset.openSolution];
    if (!solution || !dialog) return;

    dialogTitle.textContent = solution.title;
    dialogBody.textContent = solution.body;

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
  });
});

document.querySelector("[data-dialog-close]")?.addEventListener("click", () => {
  dialog?.close();
});

dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});

document.querySelector("[data-contact-form]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const status = event.currentTarget.querySelector("[data-form-status]");
  if (status) {
    status.textContent = "รับข้อมูลแล้ว ทีม ALPHA TECHNO SOFT จะติดต่อกลับตามช่องทางที่ระบุ";
  }
  event.currentTarget.reset();
});

const canvas = document.getElementById("network-canvas");
const ctx = canvas?.getContext("2d");
let points = [];
let frameId = 0;

const createPoints = () => {
  if (!canvas) return;

  const count = Math.max(42, Math.floor((canvas.width * canvas.height) / 32000));
  points = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35
  }));
};

const resizeCanvas = () => {
  if (!canvas) return;

  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.floor(rect.width * ratio);
  canvas.height = Math.floor(rect.height * ratio);
  createPoints();
};

const animateNetwork = () => {
  if (!canvas || !ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(55, 216, 255, 0.82)";
  ctx.strokeStyle = "rgba(55, 216, 255, 0.18)";
  ctx.lineWidth = window.devicePixelRatio || 1;

  points.forEach((point, index) => {
    point.x += point.vx;
    point.y += point.vy;

    if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
    if (point.y < 0 || point.y > canvas.height) point.vy *= -1;

    ctx.beginPath();
    ctx.arc(point.x, point.y, 2.2, 0, Math.PI * 2);
    ctx.fill();

    for (let nextIndex = index + 1; nextIndex < points.length; nextIndex += 1) {
      const next = points[nextIndex];
      const dx = point.x - next.x;
      const dy = point.y - next.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 170) {
        ctx.globalAlpha = 1 - distance / 170;
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(next.x, next.y);
        ctx.stroke();
      }
    }

    ctx.globalAlpha = 1;
  });

  frameId = requestAnimationFrame(animateNetwork);
};

if (canvas && ctx) {
  resizeCanvas();
  animateNetwork();
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("beforeunload", () => cancelAnimationFrame(frameId));
}
