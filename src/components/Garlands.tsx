export function Garlands() {
  return (
    <div
      className="pointer-events-none absolute top-0 left-0 w-full overflow-hidden z-20"
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="auto"
        viewBox="0 0 1440 30"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
      >
        <path
          d="M0 15 C 180 35, 360 -5, 540 15 S 900 -5, 1080 15 S 1440 -5, 1440 15"
          fill="none"
          stroke="#4a4a4a"
          strokeWidth="2"
        />
        <defs>
          <path id="flag" d="M 0 0 L 15 20 L 30 0 Z" />
        </defs>

        <use href="#flag" fill="#EAB308" transform="translate(100 19) rotate(-8)" />
        <use href="#flag" fill="#8B5CF6" transform="translate(180 23) rotate(5)" />
        <use href="#flag" fill="#3B82F6" transform="translate(260 21) rotate(-3)" />
        <use href="#flag" fill="#EC4899" transform="translate(340 13) rotate(-12)" />
        <use href="#flag" fill="#10B981" transform="translate(420 8) rotate(5)" />
        <use href="#flag" fill="#F97316" transform="translate(500 13) rotate(15)" />

        <use href="#flag" fill="#EAB308" transform="translate(600 18) rotate(-5)" />
        <use href="#flag" fill="#8B5CF6" transform="translate(680 14) rotate(12)" />
        <use href="#flag" fill="#3B82F6" transform="translate(760 10) rotate(-3)" />
        <use href="#flag" fill="#EC4899" transform="translate(840 14) rotate(-10)" />
        <use href="#flag" fill="#10B981" transform="translate(920 20) rotate(2)" />
        <use href="#flag" fill="#F97316" transform="translate(1000 23) rotate(10)" />
        
        <use href="#flag" fill="#EAB308" transform="translate(1100 19) rotate(-8)" />
        <use href="#flag" fill="#8B5CF6" transform="translate(1180 12) rotate(5)" />
        <use href="#flag" fill="#3B82F6" transform="translate(1260 8) rotate(-3)" />
        <use href="#flag" fill="#EC4899" transform="translate(1340 15) rotate(-12)" />
      </svg>
    </div>
  );
}
