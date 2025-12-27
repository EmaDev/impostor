'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { type KnownPerson } from '@/lib/game-data';

// Import all avatar images statically
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


interface CharacterCardProps {
    character: KnownPerson;
    isFlipped: boolean;
    onToggleFlip: () => void;
}

export default function CharacterCard({ character, isFlipped, onToggleFlip }: CharacterCardProps) {
    const hasImage = character.avatar && avatarImages[character.avatar];
    const imageSrc = hasImage ? avatarImages[character.avatar] : null;

    return (
        <motion.div
            onClick={onToggleFlip}
            className="w-full aspect-square cursor-pointer rounded-lg shadow-md"
            transition={{ duration: 0.4 }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            style={{ transformStyle: 'preserve-3d' }}
        >
            {/* Front of card */}
            <div className="absolute w-full h-full backface-hidden flex flex-col items-center justify-center bg-card rounded-lg overflow-hidden border-2 border-primary/50 p-1">
                {hasImage && imageSrc ? (
                    <>
                        <div className="relative w-full h-full">
                            <Image 
                                src={imageSrc} 
                                alt={character.name} 
                                layout="fill"
                                objectFit="cover"
                                className="transition-transform duration-300 group-hover:scale-110"
                            />
                        </div>
                         <div className="absolute bottom-0 w-full bg-black/50 p-1 text-center">
                            <p className="text-white text-xs font-bold truncate">{character.name}</p>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center w-full h-full text-center">
                         <p className="text-foreground text-sm font-bold">{character.name}</p>
                    </div>
                )}
            </div>

            {/* Back of card */}
            <div 
                className="absolute w-full h-full backface-hidden flex items-center justify-center bg-destructive rounded-lg"
                style={{ transform: 'rotateY(180deg)' }}
            >
                <span className="text-4xl text-destructive-foreground">X</span>
            </div>
        </motion.div>
    );
}

// Add this CSS to your globals.css to hide the back of the card when not flipped
// @layer utilities {
//   .backface-hidden {
//     backface-visibility: hidden;
//     -webkit-backface-visibility: hidden;
//   }
// }
