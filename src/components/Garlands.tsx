import Image from 'next/image';

export function Garlands() {
  return (
    <div 
      className="pointer-events-none absolute top-0 left-0 w-full z-20" 
      aria-hidden="true"
    >
      <img 
        src="/banderines.png" 
        alt="" 
        className="w-full h-auto block object-cover"
        style={{ minHeight: '90px' }}
      />
    </div>
  );
}
