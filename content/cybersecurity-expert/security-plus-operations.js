import { q } from '../../src/lib/content/plan';

// Security+ SY0-701 domains 4 (security operations) and 5 (program management).

export default {
  'BWPJD9Eb9iE': {
    try: 'Download a CIS Benchmark (free) for your OS and check five of its recommendations on your own machine.',
    minutes: 15,
    questions: [
      q.single('A documented, approved secure configuration is a…', ['Secure baseline', 'Zero-day', 'Honeypot', 'Change request'], 0),
      q.single('Which free source provides hardening benchmarks?', ['CIS', 'IANA', 'ICANN', 'IEEE only'], 0),
      q.tf('Baselines should be monitored for drift and updated over time.', true),
    ],
  },
  'YQKbs0ug0XQ': {
    try: 'Pick three targets (a router, a phone, a cloud account) and list two hardening steps for each.',
    minutes: 10,
    questions: [
      q.single('Which hardens an ICS/SCADA system?', ['Network segmentation from the corporate network', 'Connecting it to the internet', 'Default passwords', 'Disabling logs'], 0),
      q.single('Which is a hardening step for workstations?', ['Removing unnecessary software and enabling auto-updates', 'Using admin accounts daily', 'Disabling antivirus', 'Enabling guest accounts'], 0),
      q.tf('Embedded and IoT devices should have default credentials changed.', true),
    ],
  },
  'iAR6SgvtezY': {
    try: 'Compare MDM deployment models: BYOD, COPE and CYOD. Choose one for a 50-person company and explain why.',
    minutes: 10,
    questions: [
      q.single('Company-owned devices that staff may also use personally are…', ['COPE', 'BYOD', 'CYOD', 'VDI'], 0),
      q.single('Staff picking from a list of approved company devices is…', ['CYOD', 'BYOD', 'COPE', 'MDM'], 0),
      q.tf('Site surveys and heat maps help place wireless access points.', true),
    ],
  },
  'KaqKoKNEKnE': {
    try: 'Check your Wi-Fi security mode and change WPA2 to WPA3 if all your devices support it.',
    minutes: 10,
    questions: [
      q.single('WPA3 replaces the PSK handshake with…', ['SAE', 'TKIP', 'WEP', 'LEAP'], 0),
      q.single('Enterprise Wi-Fi authentication typically uses…', ['RADIUS with 802.1X/EAP', 'A shared password', 'MAC filtering only', 'Open access'], 0),
      q.tf('AES-based encryption (GCMP/CCMP) is used by modern Wi-Fi security.', true),
    ],
  },
  'fFvXy3WkLpA': {
    try: 'Read the OWASP Top 10 summary and match three items to controls: input validation, secure cookies, code signing, sandboxing.',
    minutes: 15,
    questions: [
      q.single('Checking that input is the expected type and length is…', ['Input validation', 'Fuzzing', 'Sandboxing', 'Code signing'], 0),
      q.single('Analysing source code without running it is…', ['Static code analysis', 'Dynamic analysis', 'Fuzzing', 'Pen testing'], 0),
      q.single('Running an application in an isolated environment is…', ['Sandboxing', 'Tokenization', 'Hashing', 'Salting'], 0),
    ],
  },
  'BJ2UMB4a04g': {
    try: 'Create an asset inventory entry for each device you own: owner, classification, location, and how you’d dispose of it.',
    minutes: 10,
    questions: [
      q.single('Assigning each asset to a responsible person is…', ['Ownership', 'Enumeration', 'Sanitization', 'Escrow'], 0),
      q.single('Securely removing data before disposing of a drive is…', ['Sanitization', 'Classification', 'Tokenization', 'Baselining'], 0),
      q.tf('A certificate of destruction documents that media was destroyed.', true),
    ],
  },
  '9B0mtWk_AM0': {
    try: 'Run a vulnerability scan of only your own computer or VM with a free tool (e.g. Nmap with -sV, or OpenVAS in a VM).',
    minutes: 20,
    questions: [
      q.single('A scan that logs in to systems to check them in depth is…', ['Credentialed scan', 'Non-credentialed scan', 'Passive scan', 'Ping sweep'], 0),
      q.single('Running an app with random input to find crashes is…', ['Fuzzing', 'Baselining', 'Hashing', 'Pinning'], 0),
      q.tf('Static analysis can find vulnerabilities in source code before deployment.', true),
    ],
  },
  '86fruE9jkKk': {
    try: 'Browse a free threat intelligence source (CISA advisories or AlienVault OTX) and note one current campaign and its IoCs.',
    minutes: 10,
    questions: [
      q.single('Intelligence gathered from public sources is…', ['OSINT', 'Proprietary', 'Dark web only', 'Classified'], 0),
      q.single('Organizations sharing threat information through a sector group use an…', ['ISAC', 'SLA', 'MOU', 'RTO'], 0),
      q.tf('The dark web can be a source of threat intelligence.', true),
    ],
  },
  '-LevHAzXgFs': {
    try: 'Read a sample penetration test rules-of-engagement document and list what must be agreed before testing.',
    minutes: 10,
    questions: [
      q.single('A pen test where testers have full knowledge of the systems is…', ['Known environment (white box)', 'Unknown environment (black box)', 'Partially known', 'Passive'], 0),
      q.tf('A penetration test must have written authorization.', true),
      q.single('A bug bounty program…', ['Rewards outside researchers for reporting vulnerabilities', 'Fines attackers', 'Is an antivirus', 'Is a firewall'], 0),
    ],
  },
  'eyVy1gKCuAU': {
    try: 'Look up a real CVE on nvd.nist.gov. Note its CVSS score, vector string, and whether a patch exists.',
    minutes: 15,
    questions: [
      q.single('Which scores a vulnerability’s severity from 0 to 10?', ['CVSS', 'CVE', 'CWE', 'SIEM'], 0),
      q.single('A scanner reports a vulnerability that isn’t really there. This is a…', ['False positive', 'False negative', 'True positive', 'True negative'], 0),
      q.single('Which is a unique identifier for a published vulnerability?', ['CVE', 'CVSS', 'SCAP', 'SBOM'], 0),
    ],
  },
  'P9xakfmX70c': {
    try: 'For one vulnerability found in your scan, choose: patch, compensating control, segment, or accept with an exception. Write the justification.',
    minutes: 10,
    questions: [
      q.single('When a patch can’t be applied, you might use a…', ['Compensating control', 'False positive', 'Zero-day', 'Honeypot'], 0),
      q.single('After remediation, you should…', ['Rescan to validate the fix', 'Delete the logs', 'Ignore it', 'Disable the scanner'], 0),
      q.tf('Cyber insurance can transfer some financial risk.', true),
    ],
  },
  'np2WI_rM-Ok': {
    try: 'Enable and review one week of security logs (Windows Security log or a router log). Note anything you’d alert on.',
    minutes: 15,
    questions: [
      q.single('Combining logs from many systems in one place is…', ['Aggregation', 'Archiving', 'Quarantine', 'Hashing'], 0),
      q.single('Which correlates events and raises alerts?', ['SIEM', 'NAT', 'DHCP', 'CDN'], 0),
      q.tf('Alert tuning reduces false positives.', true),
    ],
  },
  'nNiNTviiacU': {
    try: 'Install Wireshark and capture a DNS query. Then look up SCAP, NetFlow and SNMP traps and say what each provides.',
    minutes: 15,
    questions: [
      q.single('Which standard automates security configuration checks?', ['SCAP', 'SNMP', 'SMTP', 'SSH'], 0),
      q.single('Which provides metadata about traffic flows?', ['NetFlow', 'Full packet capture', 'DLP', 'MFA'], 0),
      q.single('Which tool stops sensitive data leaving the organization?', ['DLP', 'SIEM', 'NetFlow', 'SNMP'], 0),
    ],
  },
  'VgNyh4HEqSU': {
    try: 'Write three firewall rules for a web server: allow 443 from anywhere, allow SSH from the admin subnet only, deny everything else.',
    minutes: 10,
    questions: [
      q.single('Firewall rules are read…', ['Top-down, first match wins', 'Bottom-up', 'Randomly', 'Alphabetically'], 0),
      q.single('What should the last rule usually be?', ['Deny all (implicit deny)', 'Allow all', 'Log all', 'NAT all'], 0),
      q.tf('A screened subnet is protected by firewall rules from both the internet and the internal network.', true),
    ],
  },
  'I_c0D49uCwQ': {
    try: 'Set up DNS filtering on your home network (e.g. a free family-safe DNS) and test that a blocked category is blocked.',
    minutes: 10,
    questions: [
      q.single('Blocking sites by category through DNS is…', ['DNS filtering', 'DNSSEC', 'DoH', 'Zone transfer'], 0),
      q.single('An agent on each device enforcing web policy anywhere is…', ['Agent-based filtering', 'Centralized proxy only', 'NAT', 'SNMP'], 0),
      q.tf('URL scanning can check reputation before a page loads.', true),
    ],
  },
  '4dpTyRM6BU8': {
    try: 'On Windows Pro, open the Local Group Policy Editor and find the password policy. On Linux, check SELinux or AppArmor status.',
    minutes: 10,
    questions: [
      q.single('Which Windows feature applies security settings across a domain?', ['Group Policy', 'Task Manager', 'Device Manager', 'Disk Cleanup'], 0),
      q.single('SELinux provides…', ['Mandatory access control on Linux', 'Wi-Fi encryption', 'Backups', 'DNS'], 0),
      q.tf('OS hardening includes disabling unneeded services.', true),
    ],
  },
  '9NAKCyOtFH0': {
    try: 'Make a table of insecure protocols and their secure replacements: Telnet→SSH, HTTP→HTTPS, FTP→SFTP, POP3→POP3S, LDAP→LDAPS.',
    minutes: 10,
    questions: [
      q.match('Match each insecure protocol to its secure replacement.', [['Telnet', 'SSH'], ['HTTP', 'HTTPS'], ['FTP', 'SFTP'], ['LDAP', 'LDAPS']]),
      q.num('Which TCP port does LDAPS use?', 636, 0),
      q.tf('Secure protocols encrypt credentials in transit.', true),
    ],
  },
  'v6ht9efsnRI': {
    try: 'Look up your domain’s (or a big company’s) SPF, DKIM and DMARC records with nslookup -type=TXT.',
    minutes: 10,
    questions: [
      q.single('Which record lists servers allowed to send mail for a domain?', ['SPF', 'DKIM', 'DMARC', 'MX'], 0),
      q.single('Which adds a digital signature to outgoing mail?', ['DKIM', 'SPF', 'DMARC', 'PTR'], 0),
      q.single('Which tells receivers what to do with mail failing checks?', ['DMARC', 'SPF', 'DKIM', 'NS'], 0),
    ],
  },
  'ZDJ-BLPLWq4': {
    try: 'Check file integrity on your system: hash an important file now and again next week, or look up File Integrity Monitoring tools.',
    minutes: 10,
    questions: [
      q.single('Which detects unauthorized changes to system files?', ['File integrity monitoring', 'DLP', 'NAC', 'VPN'], 0),
      q.single('Which stops sensitive data being emailed outside the company?', ['DLP', 'FIM', 'IDS', 'NTP'], 0),
      q.tf('DLP can work on endpoints, the network and the cloud.', true),
    ],
  },
  '83pCkSSj1IQ': {
    try: 'Check your endpoint protection: is EDR or Defender running, is the disk encrypted, does NAC or posture checking apply at work?',
    minutes: 10,
    questions: [
      q.single('Which checks device health before granting network access?', ['NAC / posture assessment', 'NAT', 'SNMP', 'DHCP'], 0),
      q.single('Which detects threats on endpoints using behaviour and can respond?', ['EDR', 'FIM only', 'Antivirus signatures only', 'Firewall'], 0),
      q.single('XDR extends EDR by…', ['Correlating data across endpoints, network and cloud', 'Encrypting disks', 'Assigning IPs', 'Backing up email'], 0),
    ],
  },
  'ZoOyyqhptik': {
    try: 'Draw the identity lifecycle for an employee: provisioning on day one, role changes, and deprovisioning when they leave.',
    minutes: 15,
    questions: [
      q.single('Removing access when an employee leaves is…', ['Deprovisioning', 'Provisioning', 'Federation', 'Attestation'], 0),
      q.single('Using one identity across several organizations’ systems is…', ['Federation', 'Escrow', 'Tokenization', 'Segmentation'], 0),
      q.single('Which standard is used for delegated authorization (e.g. "Sign in with Google" to grant API access)?', ['OAuth', 'SNMP', 'NTP', 'SMTP'], 0),
    ],
  },
  '9ANHcZwJfdQ': {
    try: 'Match an access control model to each scenario: file owner shares a document, military classification, permissions by job role, access only 9–5.',
    minutes: 10,
    questions: [
      q.match('Match each access control model to an example.', [['DAC', 'A file owner decides who can open it'], ['MAC', 'Security labels and clearances'], ['RBAC', 'Permissions by job role'], ['ABAC', 'Rules using attributes like time and location']]),
      q.single('Restricting access to working hours is a…', ['Time-of-day restriction', 'Mandatory label', 'Federation', 'Token'], 0),
      q.tf('Least privilege applies to every access control model.', true),
    ],
  },
  'MpIzA4fNWew': {
    try: 'Set up a passkey or hardware security key for an account that supports it. Note which factor it is.',
    minutes: 10,
    questions: [
      q.single('A code from an authenticator app is something you…', ['Have', 'Know', 'Are', 'Do'], 0),
      q.single('Which MFA option resists phishing best?', ['FIDO2 security key / passkey', 'SMS code', 'Email code', 'Security questions'], 0),
      q.tf('Two passwords are still single-factor authentication.', true, 'Both are something you know.'),
    ],
  },
  'eMOe-PLBy1k': {
    try: 'Set up a password manager and generate unique passwords for your three most important accounts.',
    minutes: 15,
    questions: [
      q.single('Which matters most for password strength?', ['Length', 'Using your birthday', 'Changing one character', 'Common words'], 0),
      q.single('Giving admin rights only for the moment they’re needed is…', ['Just-in-time permissions (PAM)', 'Password spraying', 'Federation', 'SSO'], 0),
      q.single('Passwordless sign-in commonly uses…', ['Passkeys or biometrics', 'Shared passwords', 'Security questions', 'Sticky notes'], 0),
    ],
  },
  'R9ojg881dLs': {
    try: 'Write (and run in a test VM) a small script that disables a test user account, or lists users who haven’t signed in for 90 days.',
    minutes: 20,
    questions: [
      q.multi('Benefits of security automation include…', ['Consistency', 'Faster response', 'Reduced human error', 'No need to test scripts'], [0, 1, 2]),
      q.single('A risk of automation is…', ['A faulty script causing widespread changes', 'Better consistency', 'Faster patching', 'Fewer tickets'], 0),
      q.tf('Automation can enforce security baselines across many systems.', true),
    ],
  },
  'X2UiMLxRdhE': {
    try: 'Write the NIST incident response phases from memory, then apply them to a phishing incident on paper.',
    minutes: 15,
    questions: [
      q.order('Put the incident response process in order.', ['Preparation', 'Detection', 'Analysis', 'Containment', 'Eradication', 'Recovery', 'Lessons learned'], 'As listed in the Security+ objectives.'),
      q.single('Isolating an infected host from the network is…', ['Containment', 'Eradication', 'Recovery', 'Preparation'], 0),
      q.single('A meeting after an incident to improve the process is…', ['Lessons learned', 'Preparation', 'Triage', 'Containment'], 0),
    ],
  },
  'CYFe16lCRMk': {
    try: 'Plan a tabletop exercise for a lost laptop: who is involved, what decisions are needed, and what to document.',
    minutes: 10,
    questions: [
      q.single('A discussion-based rehearsal of an incident is a…', ['Tabletop exercise', 'Simulation', 'Pen test', 'Audit'], 0),
      q.single('Finding the underlying cause of an incident is…', ['Root cause analysis', 'Threat hunting', 'Fuzzing', 'Baselining'], 0),
      q.tf('Threat hunting proactively searches for attackers not yet detected.', true),
    ],
  },
  'UtDWApdO8Zk': {
    try: 'Write a chain-of-custody form: item, collected by, date/time, hash, each transfer and signature.',
    minutes: 10,
    questions: [
      q.single('Which proves evidence wasn’t tampered with between handlers?', ['Chain of custody', 'Legal hold only', 'SLA', 'BIA'], 0),
      q.single('An instruction to preserve relevant data for a court case is a…', ['Legal hold', 'Retention policy', 'Purge', 'Backup'], 0),
      q.single('When collecting volatile evidence, what comes first?', ['Memory (RAM)', 'Archived backups', 'Printed reports', 'Hard disk images last'], 0, 'Collect the most volatile data first.'),
    ],
  },
  'EDru1LTYDJw': {
    try: 'Find a failed sign-in in your Windows Security log (event ID 4625) and a successful one (4624). Note what each records.',
    minutes: 15,
    questions: [
      q.single('Which Windows event ID records a failed logon?', ['4625', '4624', '1102', '4720'], 0),
      q.single('Which data source shows conversations between hosts without full content?', ['NetFlow / metadata', 'Packet capture', 'Screenshots', 'Disk images'], 0),
      q.tf('Firewall, application, endpoint and OS logs all support investigations.', true),
    ],
  },
  '5kY9kvzeWjA': {
    try: 'Find an example information security policy online and list its sections. Note how it relates to the AUP.',
    minutes: 10,
    questions: [
      q.single('Which policy tells staff what they may and may not do with company systems?', ['Acceptable use policy', 'BCP', 'Change management', 'SDLC'], 0),
      q.single('Which plan keeps the business running during a disaster?', ['Business continuity plan', 'AUP', 'Password policy', 'SLA'], 0),
      q.tf('A software development lifecycle (SDLC) policy builds security into development.', true),
    ],
  },
  'jBvdRpXaomk': {
    try: 'List the standards your organization might follow: password, access control, physical security, encryption.',
    minutes: 5,
    questions: [
      q.single('A standard is…', ['A mandatory rule supporting a policy', 'An optional suggestion', 'A type of malware', 'A firewall'], 0),
      q.single('An encryption standard might specify…', ['Approved algorithms and key lengths', 'Office opening hours', 'Printer colours', 'Wi-Fi names'], 0),
      q.tf('Standards are more specific than policies.', true),
    ],
  },
  'vJINnOZyQNg': {
    try: 'Write a short onboarding and offboarding procedure for IT access at a small company.',
    minutes: 10,
    questions: [
      q.single('Step-by-step instructions for a task are…', ['A procedure / playbook', 'A policy', 'A standard', 'A guideline only'], 0),
      q.single('Removing all access on an employee’s last day is part of…', ['Offboarding', 'Onboarding', 'Change management', 'Penetration testing'], 0),
      q.tf('Playbooks guide responders through specific incident types.', true),
    ],
  },
  '4tGFraaP48Q': {
    try: 'List regulatory, legal, industry and local considerations that might apply to a company in your country.',
    minutes: 5,
    questions: [
      q.multi('Which external considerations affect security governance?', ['Regulations', 'Industry rules', 'Local and national laws', 'Office furniture'], [0, 1, 2]),
      q.single('A governance board or committee is responsible for…', ['Oversight of security decisions', 'Fixing printers', 'Assigning IPs', 'Writing code'], 0),
      q.tf('Governance can be centralized or decentralized.', true),
    ],
  },
  'gxNi-04yP8Q': {
    try: 'Identify who would be the data owner, controller, processor and custodian for customer data at a shop you know.',
    minutes: 5,
    questions: [
      q.single('Who decides why and how personal data is processed?', ['Data controller', 'Data processor', 'Data custodian', 'Data subject'], 0),
      q.single('Who handles data on behalf of the controller?', ['Data processor', 'Data owner', 'Data subject', 'Auditor'], 0),
      q.single('Who manages day-to-day storage and protection of data?', ['Data custodian / steward', 'Data subject', 'Regulator', 'Attacker'], 0),
    ],
  },
  'cLhUMoQS1a8': {
    try: 'Start a small risk register for your home or business: risk, likelihood, impact, owner, response.',
    minutes: 10,
    questions: [
      q.single('A document tracking identified risks and their owners is a…', ['Risk register', 'SLA', 'SBOM', 'AUP'], 0),
      q.single('The level of risk an organization is willing to accept is…', ['Risk appetite', 'Risk transfer', 'Residual risk', 'Inherent risk'], 0),
      q.tf('Key risk indicators help track changes in risk.', true),
    ],
  },
  'Ykx7t54y-oo': {
    try: 'Calculate annualized loss: a laptop worth $1,500 is lost once every 2 years with total loss. Work out SLE, ARO and ALE.',
    minutes: 15,
    questions: [
      q.num('SLE is $1,500 and ARO is 0.5. What is the ALE in dollars?', 750, 0, 'ALE = SLE × ARO.'),
      q.single('SLE equals…', ['Asset value × exposure factor', 'ALE × ARO', 'ARO ÷ SLE', 'Asset value ÷ 12'], 0),
      q.single('Risk analysis using ratings like high/medium/low is…', ['Qualitative', 'Quantitative', 'Statistical only', 'Financial only'], 0),
    ],
  },
  'pmyuWY7Pbag': {
    try: 'For three risks in your register, choose a strategy: transfer, accept, avoid or mitigate, with a reason.',
    minutes: 5,
    questions: [
      q.match('Match each risk strategy to an example.', [['Transfer', 'Buying cyber insurance'], ['Avoid', 'Stopping the risky activity'], ['Mitigate', 'Adding a control'], ['Accept', 'Documenting and living with it']]),
      q.single('An approved deviation from a policy is an…', ['Exception', 'Exemption', 'Incident', 'Audit'], 0),
      q.tf('Risk can never be reduced to zero; what remains is residual risk.', true),
    ],
  },
  'myI-v3mj7Kc': {
    try: 'For a service you rely on, estimate RTO, RPO, MTTR and MTBF.',
    minutes: 5,
    questions: [
      q.single('The average time to repair a failed system is…', ['MTTR', 'MTBF', 'RPO', 'RTO'], 0),
      q.single('The average time between failures is…', ['MTBF', 'MTTR', 'RTO', 'ALE'], 0),
      q.tf('A business impact analysis identifies critical functions and recovery priorities.', true),
    ],
  },
  '13KNjPexnEI': {
    try: 'Write five questions you would ask a new software supplier about their security before signing.',
    minutes: 10,
    questions: [
      q.single('Checking a vendor’s security before engaging them is…', ['Due diligence', 'Due care', 'Penetration testing', 'Phishing'], 0),
      q.single('A clause allowing you to audit a supplier is a…', ['Right-to-audit clause', 'NDA', 'MOU', 'SLA only'], 0),
      q.tf('Supply chain analysis looks at your suppliers’ suppliers too.', true),
    ],
  },
  'HSZxjj1YAh8': {
    try: 'Match these agreements to situations: SLA, MOU, MSA, SOW, NDA, BPA.',
    minutes: 10,
    questions: [
      q.match('Match each agreement to what it does.', [['SLA', 'Sets measurable service levels'], ['NDA', 'Keeps shared information confidential'], ['SOW', 'Defines specific work and deliverables'], ['MOU', 'Informal statement of intent']]),
      q.single('A master agreement covering future work with a vendor is an…', ['MSA', 'NDA', 'SLA', 'BIA'], 0),
      q.tf('A business partners agreement (BPA) sets out how partners will work together.', true),
    ],
  },
  'IjJf4jLtONQ': {
    try: 'List compliance consequences of failing an audit: fines, sanctions, reputational damage, loss of licence.',
    minutes: 5,
    questions: [
      q.multi('Consequences of non-compliance can include…', ['Fines', 'Loss of licence', 'Reputational damage', 'Faster networks'], [0, 1, 2]),
      q.single('Reporting compliance status inside the organization is…', ['Internal reporting', 'External attestation', 'Fuzzing', 'Escrow'], 0),
      q.tf('Automation can help monitor compliance continuously.', true),
    ],
  },
  'WGXrbAh0LUI': {
    try: 'Read your country’s data protection law summary (for Nigeria, the Nigeria Data Protection Act 2023) and list three rights it gives people.',
    minutes: 15,
    questions: [
      q.single('The right to have your personal data deleted is…', ['The right to be forgotten', 'Data sovereignty', 'Data masking', 'Legal hold'], 0),
      q.single('Which EU law gives individuals rights over personal data?', ['GDPR', 'PCI DSS', 'SOX', 'HIPAA'], 0),
      q.tf('Data retention rules say how long data may or must be kept.', true),
    ],
  },
  'uo2Yw720mv4': {
    try: 'Explain the difference between an internal audit, external audit and self-assessment, with who performs each.',
    minutes: 5,
    questions: [
      q.single('An independent third party verifying security controls is…', ['External audit / attestation', 'Self-assessment', 'Internal audit', 'Tabletop'], 0),
      q.single('An organization checking its own compliance is a…', ['Self-assessment', 'External audit', 'Regulatory fine', 'Pen test'], 0),
      q.tf('Audit committees oversee audit activity.', true),
    ],
  },
  'wEMzVfwBiWY': {
    try: 'Write rules of engagement for a pen test of your own home lab: scope, timing, methods allowed and out of scope.',
    minutes: 10,
    questions: [
      q.single('A pen test where the tester knows nothing about the target is…', ['Unknown environment (black box)', 'Known environment', 'Partially known', 'Defensive'], 0),
      q.single('Gathering information without touching the target is…', ['Passive reconnaissance', 'Active reconnaissance', 'Exploitation', 'Pivoting'], 0),
      q.tf('Red teams attack; blue teams defend.', true),
    ],
  },
  'W_Npxwk4fbI': {
    try: 'Design a monthly security awareness plan for a small office: topics, phishing simulations and how you’ll measure progress.',
    minutes: 10,
    questions: [
      q.single('Sending fake phishing emails to staff to train them is…', ['A phishing campaign / simulation', 'Spear phishing attack', 'Whaling', 'Vishing'], 0),
      q.single('Staff should report a suspicious email…', ['Using the agreed reporting process', 'By replying to the sender', 'By forwarding to everyone', 'By ignoring it'], 0),
      q.tf('Recognising anomalous behaviour is part of security awareness.', true),
    ],
  },
  'WQRZMMLUkGE': {
    try: 'Write a one-page user guide covering passwords, phishing, removable media, remote working and reporting incidents.',
    minutes: 10,
    questions: [
      q.multi('User training should cover…', ['Password management', 'Removable media risks', 'Remote and hybrid work', 'How to disable antivirus'], [0, 1, 2]),
      q.single('Training is most effective when it is…', ['Ongoing and measured', 'Once at hiring only', 'Optional', 'Secret'], 0),
      q.tf('Computer-based training lets staff learn at their own pace.', true),
    ],
  },
};
