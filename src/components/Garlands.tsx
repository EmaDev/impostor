export function Garlands() {
  return (
    <div
      className="pointer-events-none absolute top-0 left-0 w-full overflow-hidden z-20"
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="auto"
        viewBox="0 0 1440 60"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
      >
        <path
          d="M0 30 C 180 70, 360 -10, 540 30 S 900 -10, 1080 30 S 1440 -10, 1440 30"
          fill="none"
          stroke="#4a4a4a"
          strokeWidth="2"
        />
        <defs>
          <path id="flag" d="M 0 0 L 15 20 L 30 0 Z" />
        </defs>

        <use href="#flag" fill="#EAB308" transform="translate(100, 38) rotate(-8)" />
        <use href="#flag" fill="#8B5CF6" transform="translate(180, 48) rotate(5)" />
        <use href="#flag" fill="#3B82F6" transform="translate(260, 44) rotate(-3)" />
        <use href="#flag" fill="#EC4899" transform="translate(340, 26) rotate(-12)" />
        <use href="#flag" fill="#10B981" transform="translate(420, 14) rotate(5)" />
        <use href="#flag" fill="#F97316" transform="translate(500, 26) rotate(15)" />

        <use href="#flag" fill="#EAB308" transform="translate(600, 36) rotate(-5)" />
        <use href="#flag" fill="#8B5CF6" transform="translate(680, 28) rotate(12)" />
        <use href="#flag" fill="#3B82F6" transform="translate(760, 19) rotate(-3)" />
        <use href="#flag" fill="#EC4899" transform="translate(840, 28) rotate(-10)" />
        <use href="#flag" fill="#10B981" transform="translate(920, 41) rotate(2)" />
        <use href="#flag" fill="#F97316" transform="translate(1000, 48) rotate(10)" />
        
        <use href="#flag" fill="#EAB308" transform="translate(1100, 38) rotate(-8)" />
        <use href="#flag" fill="#8B5CF6" transform="translate(1180, 24) rotate(5)" />
        <use href="#flag" fill="#3B82F6" transform="translate(1260, 15) rotate(-3)" />
        <use href="#flag" fill="#EC4899" transform="translate(1340, 30) rotate(-12)" />
      </svg>
    </div>
  );
}
