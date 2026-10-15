import { course } from '../../course';
import videos from '../videos/seo.json';
import howSearchWorks from './m1-how-search-works';
import keywords from './m2-keyword-research';
import onPage from './m3-on-page-and-content';
import technical from './m4-technical-and-links';

// Ahrefs' free SEO course and tutorials: how search works, keyword research, on-page SEO,
// technical SEO and link building.
export default course({
  slug: 'digital-marketer-seo',
  title: 'Search Engine Optimisation',
  description: 'How Google finds and ranks pages, keyword research, writing pages that rank, technical SEO, Search Console and earning links the safe way.',
  makeTitle: 'A keyword plan and SEO audit of a real or practice website, with the fixes made',
  skillId: 'digital-marketing',
  cover: 'DvwS7cV9GmQ',
  by: 'Ahrefs',
  videos,
}, [howSearchWorks, keywords, onPage, technical]);
