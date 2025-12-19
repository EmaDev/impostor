export function Garlands() {
  return (
    <div
      className="pointer-events-none absolute top-0 left-0 w-full z-20"
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="60"
        viewBox="0 0 1440 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMin slice"
      >
        <path
          d="M0 0.5C159.5 59 288.5 59 450 0.5"
          stroke="#E5E7EB"
          strokeWidth="2"
        />
        <path
          d="M450 0.5C609.5 59 738.5 59 900 0.5"
          stroke="#E5E7EB"
          strokeWidth="2"
        />
        <path
          d="M900 0.5C1059.5 59 1188.5 59 1350 0.5"
          stroke="#E5E7EB"
          strokeWidth="2"
        />
        <path d="M1350 0.5C1404.17 31 1440 31 1440 0.5" stroke="#E5E7EB" strokeWidth="2" />
        
        {/* Banderines */}
        <polygon points="50,23 60,2 70,23" fill="#fde68a" />
        <polygon points="100,38 110,17 120,38" fill="#d8b4fe" />
        <polygon points="150,49 160,28 170,49" fill="#a78bfa" />
        <polygon points="200,53 210,32 220,53" fill="#60a5fa" />
        <polygon points="250,49 260,28 270,49" fill="#facc15" />
        <polygon points="300,38 310,17 320,38" fill="#fde68a" />
        <polygon points="350,23 360,2 370,23" fill="#d8b4fe" />
        
        <polygon points="400,2 410,23 420,2" fill="#a78bfa" />

        {/* Repetir patrón */}
        <polygon points="500,23 510,2 520,23" fill="#fde68a" />
        <polygon points="550,38 560,17 570,38" fill="#d8b4fe" />
        <polygon points="600,49 610,28 620,49" fill="#a78bfa" />
        <polygon points="650,53 660,32 670,53" fill="#60a5fa" />
        <polygon points="700,49 710,28 720,49" fill="#facc15" />
        <polygon points="750,38 760,17 770,38" fill="#fde68a" />
        <polygon points="800,23 810,2 820,23" fill="#d8b4fe" />
        <polygon points="850,2 860,23 870,2" fill="#a78bfa" />

        <polygon points="950,23 960,2 970,23" fill="#fde68a" />
        <polygon points="1000,38 1010,17 1020,38" fill="#d8b4fe" />
        <polygon points="1050,49 1060,28 1070,49" fill="#a78bfa" />
        <polygon points="1100,53 1110,32 1120,53" fill="#60a5fa" />
        <polygon points="1150,49 1160,28 1170,49" fill="#facc15" />
        <polygon points="1200,38 1210,17 1220,38" fill="#fde68a" />
        <polygon points="1250,23 1260,2 1270,23" fill="#d8b4fe" />
        <polygon points="1300,2 1310,23 1320,2" fill="#a78bfa" />
      </svg>
    </div>
  );
}
