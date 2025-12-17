"use client";

import Image from 'next/image';

const iconStyles = 'absolute opacity-20';

export function FloatingIcons() {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(15deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .float-1 { animation: float 6s ease-in-out infinite; }
        .float-2 { animation: float 7s ease-in-out infinite 1s; }
        .float-3 { animation: float 5s ease-in-out infinite 0.5s; }
        .float-4 { animation: float 8s ease-in-out infinite 1.5s; }
      `}</style>

      <div className={`${iconStyles} float-1 w-16 h-16 top-[10%] left-[5%]`}>
          <Image src="/icons/birrete.png" alt="" width={64} height={64} />
      </div>
      <div className={`${iconStyles} float-2 w-12 h-12 top-[20%] right-[10%]`}>
          <Image src="/icons/diploma.png" alt="" width={48} height={48} />
      </div>
      <div className={`${iconStyles} float-3 w-20 h-20 bottom-[15%] right-[15%]`}>
          <Image src="/icons/birrete.png" alt="" width={80} height={80} />
      </div>
      <div className={`${iconStyles} float-4 w-14 h-14 bottom-[25%] left-[12%]`}>
          <Image src="/icons/diploma.png" alt="" width={56} height={56} />
      </div>
      <div className={`${iconStyles} float-2 w-10 h-10 top-[50%] left-[20%]`}>
          <Image src="/icons/birrete.png" alt="" width={40} height={40} />
      </div>
       <div className={`${iconStyles} float-1 w-16 h-16 top-[60%] right-[8%]`}>
          <Image src="/icons/diploma.png" alt="" width={64} height={64} />
       </div>
    </div>
  );
}
