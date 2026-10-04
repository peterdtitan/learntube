import aPlusCore1Videos from './videos/a-plus-core-1.json';
import aPlusCore2Videos from './videos/a-plus-core-2.json';
import networkPlusVideos from './videos/network-plus.json';
import securityPlusVideos from './videos/security-plus.json';
import aPlusCore1 from './a-plus-core-1';
import aPlusCore2 from './a-plus-core-2';
import networkPlus from './network-plus';
import securityPlus from './security-plus';
import { core1, core2 } from './checkpoints-a-plus';
import netCheck from './checkpoints-network-plus';
import secCheck from './checkpoints-security-plus';

// "Cybersecurity Expert": a track of three courses taken in order, each preparing for a
// CompTIA certification, built on Professor Messer's free objective-by-objective videos.
// Every lesson is 10 minutes or less (long videos are split); see src/lib/content/plan.js.

const checkpoint = (title, questions) => ({ title, minutes: 15, questions });

export default {
  slug: 'cybersecurity-expert',
  title: 'Cybersecurity Expert',
  description: 'Go from how computers work to defending networks, in three courses: IT Foundations, Networking and Security Operations. Short lessons, hands-on practice, and everything you need for CompTIA A+, Network+ and Security+.',
  makeTitle: 'Build and defend your own home lab, and be ready for the A+, Network+ and Security+ exams',
  skillId: 'cybersecurity',
  courses: [
    {
      slug: 'cybersecurity-expert-it-foundations',
      title: 'IT Foundations',
      certification: 'CompTIA A+ (220-1201 and 220-1202)',
      description: 'How computers, phones, operating systems and small networks work, how to fix them, and how to keep them secure.',
      makeTitle: 'A virtual lab with Windows and Linux machines you installed, configured and hardened yourself',
      skillId: 'cybersecurity',
      stages: [
        {
          exam: 'CompTIA A+ Core 1 (220-1201)',
          videos: aPlusCore1Videos.videos,
          lessons: aPlusCore1,
          modules: [
            { title: 'Core 1 · Mobile devices', objectives: ['1.1', '1.3'], checkpoint: checkpoint('Mobile devices checkpoint', core1.mobile) },
            { title: 'Core 1 · Networking', objectives: ['2.1', '2.8'], checkpoint: checkpoint('Networking checkpoint', core1.networking) },
            { title: 'Core 1 · Cables, memory and storage', objectives: ['3.1', '3.4'], checkpoint: checkpoint('Cables, memory and storage checkpoint', core1.hardware1) },
            { title: 'Core 1 · Motherboards, power and printers', objectives: ['3.5', '3.8'], checkpoint: checkpoint('Motherboards and printers checkpoint', core1.hardware2) },
            { title: 'Core 1 · Virtualization, cloud and troubleshooting', objectives: ['4.1', '5.6'], checkpoint: checkpoint('Cloud and troubleshooting checkpoint', core1.cloud) },
          ],
        },
        {
          exam: 'CompTIA A+ Core 2 (220-1202)',
          videos: aPlusCore2Videos.videos,
          lessons: aPlusCore2,
          modules: [
            { title: 'Core 2 · Windows: installing, tools and the command line', objectives: ['1.1', '1.6'], checkpoint: checkpoint('Windows checkpoint', core2.os1) },
            { title: 'Core 2 · Networking Windows, macOS and Linux', objectives: ['1.7', '1.11'], checkpoint: checkpoint('Windows networking, macOS and Linux checkpoint', core2.os2) },
            { title: 'Core 2 · Security controls, access and malware', objectives: ['2.1', '2.4'], checkpoint: checkpoint('Security controls checkpoint', core2.security1) },
            { title: 'Core 2 · Attacks and hardening', objectives: ['2.5', '2.11'], checkpoint: checkpoint('Attacks and hardening checkpoint', core2.security2) },
            { title: 'Core 2 · Troubleshooting and operational procedures', objectives: ['3.1', '4.10'], checkpoint: checkpoint('Operations checkpoint', core2.operations) },
          ],
        },
      ],
    },
    {
      slug: 'cybersecurity-expert-networking',
      title: 'Networking',
      certification: 'CompTIA Network+ (N10-009)',
      description: 'How networks are designed, built, run, secured and fixed, from the OSI model and subnetting to routing, wireless and the cloud.',
      makeTitle: 'A simulated office network with VLANs, routing, DHCP and DNS that you designed and troubleshot',
      skillId: 'cybersecurity',
      stages: [
        {
          exam: 'CompTIA Network+ (N10-009)',
          videos: networkPlusVideos.videos,
          lessons: networkPlus,
          modules: [
            { title: 'Networking concepts, protocols and cabling', objectives: ['1.1', '1.6'], checkpoint: checkpoint('Networking concepts checkpoint', netCheck.concepts) },
            { title: 'IP addressing, subnetting and modern networks', objectives: ['1.7', '1.8'], checkpoint: checkpoint('Addressing checkpoint', netCheck.addressing) },
            { title: 'Routing, switching and wireless', objectives: ['2.1', '2.4'], checkpoint: checkpoint('Implementation checkpoint', netCheck.implementation) },
            { title: 'Network operations and services', objectives: ['3.1', '3.5'], checkpoint: checkpoint('Operations checkpoint', netCheck.operations) },
            { title: 'Network security', objectives: ['4.1', '4.3'], checkpoint: checkpoint('Network security checkpoint', netCheck.security) },
            { title: 'Network troubleshooting', objectives: ['5.1', '5.5'], checkpoint: checkpoint('Troubleshooting checkpoint', netCheck.troubleshooting) },
          ],
        },
      ],
    },
    {
      slug: 'cybersecurity-expert-security-operations',
      title: 'Security Operations',
      certification: 'CompTIA Security+ (SY0-701)',
      description: 'Threats, architecture, operations and risk: how organizations defend themselves and how security analysts work day to day.',
      makeTitle: 'A hardened, monitored home lab with an incident response plan you wrote and tested',
      skillId: 'cybersecurity',
      stages: [
        {
          exam: 'CompTIA Security+ (SY0-701)',
          videos: securityPlusVideos.videos,
          lessons: securityPlus,
          modules: [
            { title: 'General security concepts', objectives: ['1.1', '1.4'], checkpoint: checkpoint('Security concepts checkpoint', secCheck.concepts) },
            { title: 'Threat actors, vectors and vulnerabilities', objectives: ['2.1', '2.3'], checkpoint: checkpoint('Threats and vulnerabilities checkpoint', secCheck.threats1) },
            { title: 'Attacks, indicators and mitigations', objectives: ['2.4', '2.5'], checkpoint: checkpoint('Attacks and mitigations checkpoint', secCheck.threats2) },
            { title: 'Security architecture', objectives: ['3.1', '3.4'], checkpoint: checkpoint('Architecture checkpoint', secCheck.architecture) },
            { title: 'Security operations: hardening, assets and vulnerabilities', objectives: ['4.1', '4.4'], checkpoint: checkpoint('Operations checkpoint', secCheck.operations1) },
            { title: 'Security operations: defences, identity and incidents', objectives: ['4.5', '4.9'], checkpoint: checkpoint('Defences and incident response checkpoint', secCheck.operations2) },
            { title: 'Security program management', objectives: ['5.1', '5.6'], checkpoint: checkpoint('Program management checkpoint', secCheck.program) },
          ],
        },
      ],
    },
  ],
};
