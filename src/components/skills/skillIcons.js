import {
  BarChart3, Camera, ChefHat, Code2, Guitar, Megaphone, Music, Pencil, Scissors, ShieldCheck, Shirt,
  Sparkles,
} from 'lucide-react';

// An icon for each skill category, used by the welcome survey.
const ICONS = {
  cooking: ChefHat,
  knitting: Shirt,
  sewing: Scissors,
  drawing: Pencil,
  guitar: Guitar,
  photography: Camera,
  'software-engineering': Code2,
  data: BarChart3,
  'digital-marketing': Megaphone,
  'music-production': Music,
  cybersecurity: ShieldCheck,
};

export default function skillIcon(id) {
  return ICONS[id] || Sparkles;
}
