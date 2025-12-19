'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCheck, UserX } from 'lucide-react';
import { type SecretWord, type KnownPerson } from '@/lib/game-data';
import Image from 'next/image';

import dylan_rodriguez from '@/lib/images/dylan_rodriguez.png';
import eze_raggio from '@/lib/images/eze_raggio.png';
import javi_alberio from '@/lib/images/javi_alberio.png';
import lucas_vasco from '@/lib/images/lucas_vasco.png';
import marcos_corona from '@/lib/images/marcos_corona.png';
import mauro_fredes from '@/lib/images/mauro_fredes.png';
import nico_marenzi from '@/lib/images/nico_marenzi.png';
import seba_gauto from '@/lib/images/seba_gauto.png';
import yago_taboada from '@/lib/images/yago_taboada.png';
import ema_cisterna from '@/lib/images/ema_cisterna.png';
import martin_motta from '@/lib/images/martin_motta.png';
import agus_carranza from '@/lib/images/agus_carranza.png';
import josue_ferreiro from '@/lib/images/josue_ferreiro.png';
import magui_carretto from '@/lib/images/magui_carretto.png';
import lucas_dema from '@/lib/images/lucas_dema.png';
import fede_rodriguez from '@/lib/images/fede_rodriguez.png';
import lucas_diaz from '@/lib/images/lucas_diaz.png';
import fede_miraglia from '@/lib/images/fede_miraglia.png';
import lucas_hassan from '@/lib/images/lucas_hassan.png';
import lauti_montanes from '@/lib/images/lauti_montanes.png';
import more_escudero from '@/lib/images/more_escudero.png';
import thiago_valenti from '@/lib/images/thiago_valenti.png';
import adrian_ledesma from '@/lib/images/adrian_ledesma.png';
import gonza_pose from '@/lib/images/gonza_pose.png';
import caro_taboada from '@/lib/images/caro_taboada.png';
import naza_maciel from '@/lib/images/naza_maciel.png';
import dafne from '@/lib/images/dafne.png';
import cami_santillo from '@/lib/images/cami_santillo.png';
import vico_santiago from '@/lib/images/vico_santiago.png';
import mai_ibarra from '@/lib/images/mai_ibarra.png';
import rocio_lopez from '@/lib/images/rocio_lopez.png';
import sofi_fernandez from '@/lib/images/sofi_fernandez.png';
import danilo_bonino from '@/lib/images/danilo_bonino.png';
import mati_carrizo from '@/lib/images/mati_carrizo.png';
import coni_gatica from '@/lib/images/coni_gatica.png';
import micalzado from '@/lib/images/micalzado.png';
import lucia_perri from '@/lib/images/lucia_perri.png';
import camila_puy from '@/lib/images/camila_puy.png';
import lucas_perri from '@/lib/images/lucas_perri.png';
import guido_perri from '@/lib/images/guido_perri.png';

const avatarImages: { [key: string]: any } = {
  'dylan_rodriguez.png': dylan_rodriguez,
  'eze_raggio.png': eze_raggio,
  'javi_alberio.png': javi_alberio,
  'lucas_vasco.png': lucas_vasco,
  'marcos_corona.png': marcos_corona,
  'mauro_fredes.png': mauro_fredes,
  'nico_marenzi.png': nico_marenzi,
  'seba_gauto.png': seba_gauto,
  'yago_taboada.png': yago_taboada,
  'ema_cisterna.png': ema_cisterna,
  'martin_motta.png': martin_motta,
  'agus_carranza.png': agus_carranza,
  'josue_ferreiro.png': josue_ferreiro,
  'magui_carretto.png': magui_carretto,
  'lucas_dema.png': lucas_dema,
  'fede_rodriguez.png': fede_rodriguez,
  'lucas_diaz.png': lucas_diaz,
  'fede_miraglia.png': fede_miraglia,
  'lucas_hassan.png': lucas_hassan,
  'lauti_montanes.png': lauti_montanes,
  'more_escudero.png': more_escudero,
  'thiago_valenti.png': thiago_valenti,
  'adrian_ledesma.png': adrian_ledesma,
  'gonza_pose.png': gonza_pose,
  'caro_taboada.png': caro_taboada,
  'naza_maciel.png': naza_maciel,
  'dafne.png': dafne,
  'cami_santillo.png': cami_santillo,
  'vico_santiago.png': vico_santiago,
  'mai_ibarra.png': mai_ibarra,
  'rocio_lopez.png': rocio_lopez,
  'sofi_fernandez.png': sofi_fernandez,
  'danilo_bonino.png': danilo_bonino,
  'mati_carrizo.png': mati_carrizo,
  'coni_gatica.png': coni_gatica,
  'micalzado.png': micalzado,
  'lucia_perri.png': lucia_perri,
  'camila_puy.png': camila_puy,
  'lucas_perri.png': lucas_perri,
  'guido_perri.png': guido_perri
};

interface RoleCardProps {
  role: SecretWord | 'Impostor';
  onReveal: () => void;
}

export function RoleCard({ role, onReveal }: RoleCardProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const isImpostor = role === 'Impostor';

  const handleReveal = () => {
    if (!isRevealed) {
      setIsRevealed(true);
      onReveal();
    }
  };

  const handleConceal = () => {
    setIsRevealed(false);
  };
  
  const content = () => {
    if (isImpostor) {
      return (
        <>
          <UserX className="h-16 w-16" />
          <h3 className="mt-4 text-2xl font-black">
            Eres el
          </h3>
          <p className="mt-2 text-4xl font-bold">IMPOSTOR</p>
        </>
      );
    }

    if (typeof role === 'string') {
      return (
        <>
          <UserCheck className="h-16 w-16" />
          <h3 className="mt-4 text-2xl font-black">
            La palabra es:
          </h3>
          <p className="mt-2 text-4xl font-bold">{`"${role}"`}</p>
        </>
      );
    }
    
    // It's a KnownPerson object
    const knownPerson = role as KnownPerson;
    return (
        <div className="flex flex-col items-center justify-center text-center">
            <h3 className="text-2xl font-black">El personaje es:</h3>
            <div className="relative mt-4 h-32 w-32 rounded-full overflow-hidden border-4 border-primary-foreground/50">
                <Image src={avatarImages[knownPerson.avatar]} alt={knownPerson.name} layout="fill" objectFit="cover" />
            </div>
            <p className="mt-4 text-4xl font-bold">{knownPerson.name}</p>
        </div>
    );
  };


  return (
    <div
      className="relative h-80 w-64 cursor-pointer select-none rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-105"
      onMouseDown={handleReveal}
      onMouseUp={handleConceal}
      onTouchStart={handleReveal}
      onTouchEnd={handleConceal}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleReveal()}
      onKeyUp={(e) => (e.key === 'Enter' || e.key === ' ') && handleConceal()}
      role="button"
      tabIndex={0}
      aria-label="Mantén presionado para ver tu rol"
    >
      <AnimatePresence>
        {!isRevealed ? (
          <motion.div
            key="back"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-card p-4"
          >
            <div className="text-center">
              <p className="text-lg font-bold">Mantén presionado</p>
              <p className="text-muted-foreground">para ver tu rol</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="front"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`absolute inset-0 flex flex-col items-center justify-center rounded-2xl p-6 ${
              isImpostor ? 'bg-destructive text-destructive-foreground' : 'bg-primary text-primary-foreground'
            }`}
          >
            {content()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
