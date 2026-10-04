import { q } from '../../src/lib/content/plan';
import operations from './security-plus-operations';

// CompTIA Security+ (SY0-701): a Try task and quick-check questions per video, keyed by
// YouTube id. Videos: ./videos/security-plus.json (Professor Messer's free course).
// Domains 1–3 are here; domains 4–5 are in ./security-plus-operations.js.
// Only ever test systems you own or are explicitly allowed to test (e.g. scanme.nmap.org).

export default {
  'KiEptGbnEBc': {
    try: 'Download the SY0-701 exam objectives from comptia.org and rate yourself 1–5 on each of the five domains. Note: SY0-701 retires on 11 June 2027.',
    minutes: 15,
    questions: [
      q.single('Which Security+ domain carries the most weight on SY0-701?', ['General security concepts', 'Security operations', 'Security architecture', 'Program management'], 1, 'Security operations is about 28% of the exam.'),
      q.tf('Security+ includes performance-based questions.', true),
      q.single('What is the passing score for Security+ on its 100–900 scale?', ['650', '750', '800', '700'], 1),
    ],
  },
  'STM3EUvL7wg': {
    try: 'Classify ten controls you see at work or home (locks, MFA, policies, cameras, backups, firewalls) by category and type.',
    minutes: 10,
    questions: [
      q.match('Match each control category to an example.', [['Technical', 'Firewall rules'], ['Managerial', 'Security policy'], ['Operational', 'Security guard patrols'], ['Physical', 'Door lock']]),
      q.match('Match each control type to an example.', [['Preventive', 'Locked door'], ['Detective', 'Log review'], ['Corrective', 'Restoring from backup'], ['Deterrent', 'Warning sign']]),
      q.single('A temporary control used when the main one isn’t possible is…', ['Compensating', 'Directive', 'Preventive', 'Detective'], 0),
    ],
  },
  'SBcDGb9l6yo': {
    try: 'Give one attack against each part of the CIA triad and one control that protects it.',
    minutes: 5,
    questions: [
      q.single('Ransomware encrypting a hospital’s systems mainly attacks…', ['Availability', 'Confidentiality only', 'Integrity only', 'Non-repudiation'], 0),
      q.single('Hashing a file to detect changes protects…', ['Integrity', 'Availability', 'Confidentiality', 'Accounting'], 0),
      q.single('Encryption mainly protects…', ['Confidentiality', 'Availability', 'Integrity', 'Accounting'], 0),
    ],
  },
  'XxnCxPEllMg': {
    try: 'Sign a file with GPG or openssl and verify the signature. Write why a signature proves who sent it.',
    minutes: 15,
    questions: [
      q.single('Non-repudiation means…', ['A sender can’t deny sending a message', 'Data is encrypted', 'A system is always available', 'Passwords are strong'], 0),
      q.single('Which provides non-repudiation?', ['Digital signatures', 'Symmetric encryption alone', 'Hashing alone', 'Compression'], 0),
      q.single('A digital signature is created with the sender’s…', ['Private key', 'Public key', 'Shared key', 'Session key'], 0),
    ],
  },
  'AhaZtj5P2a8': {
    try: 'For an app you use, write how it handles authentication, authorization and accounting.',
    minutes: 10,
    questions: [
      q.order('Order the AAA steps.', ['Identification', 'Authentication', 'Authorization', 'Accounting']),
      q.single('Logging what a user did and when is…', ['Accounting', 'Authorization', 'Authentication', 'Identification'], 0),
      q.single('Authenticating a device with a certificate it holds is…', ['Certificate-based authentication', 'Shared password', 'Biometric', 'Anonymous'], 0),
    ],
  },
  'cuTVyyS5C7M': {
    try: 'Do a gap analysis of your personal security: where you are (passwords, backups, MFA) versus where you want to be.',
    minutes: 10,
    questions: [
      q.single('A gap analysis compares…', ['Current security posture with the desired one', 'Two firewalls', 'Two passwords', 'Upload and download speeds'], 0),
      q.single('Which framework is often used as the baseline in a gap analysis?', ['NIST or ISO 27001', 'HTML', 'SMTP', 'RAID'], 0),
      q.tf('The result of a gap analysis is a plan to close the gaps.', true),
    ],
  },
  'zC_Pndpg8-c': {
    try: 'Map zero trust to a small company: where would the policy engine, policy administrator and policy enforcement point sit?',
    minutes: 10,
    questions: [
      q.single('In zero trust, which component makes the allow or deny decision?', ['Policy engine', 'Policy enforcement point', 'Subject', 'Data plane'], 0),
      q.single('Where are access decisions enforced?', ['Policy enforcement point', 'Policy engine', 'Threat feed', 'Log server'], 0),
      q.tf('Zero trust treats the internal network as untrusted.', true),
    ],
  },
  'YtT8q2mUM9c': {
    try: 'List the physical controls of your building, from the fence line to the server room.',
    minutes: 5,
    questions: [
      q.single('Which stops vehicles ramming a building entrance?', ['Bollards', 'Badges', 'Cameras', 'Signs'], 0),
      q.single('Which sensor detects a change in heat from a person?', ['Infrared', 'Pressure', 'Microwave', 'Ultrasonic'], 0),
      q.single('An access control vestibule prevents…', ['Tailgating', 'Phishing', 'DDoS', 'Malware'], 0),
    ],
  },
  'X_qfMVty4ts': {
    try: 'Explain a honeypot, honeynet, honeyfile and honeytoken, and how each would alert you to an attacker.',
    minutes: 5,
    questions: [
      q.single('A fake file with an alluring name that triggers an alert when opened is a…', ['Honeyfile', 'Honeynet', 'Sandbox', 'Jump box'], 0),
      q.single('Fake credentials planted to detect their use are a…', ['Honeytoken', 'Honeypot', 'Bastion', 'Canary cage'], 0),
      q.tf('A honeynet is a network of honeypots.', true),
    ],
  },
  '48wRbMdHFVI': {
    try: 'Write a change request for patching a production web server: owner, impact analysis, test results, backout plan, maintenance window.',
    minutes: 15,
    questions: [
      q.multi('Which belong in a change approval process?', ['Impact analysis', 'Backout plan', 'Maintenance window', 'Skipping testing'], [0, 1, 2]),
      q.single('Who typically approves major changes?', ['Change advisory board', 'Any user', 'An intern', 'The attacker'], 0),
      q.single('A plan to restore the previous state if a change fails is a…', ['Backout plan', 'SOP', 'BIA', 'SLA'], 0),
    ],
  },
  'H9TYNjcpl-0': {
    try: 'List technical side-effects of a change: restarts, downtime, dependencies, allow/deny lists, legacy apps. Note which you’d test first.',
    minutes: 10,
    questions: [
      q.single('A change requires a service restart. This affects…', ['Availability during the change', 'Encryption strength', 'Password length', 'DNS records'], 0),
      q.single('Updating diagrams and documentation after a change is part of…', ['Change management', 'Penetration testing', 'Phishing', 'Hashing'], 0),
      q.tf('Version control helps track and roll back configuration changes.', true),
    ],
  },
  'xHAMEF7-inQ': {
    try: 'Generate a key pair with openssl genpkey -algorithm RSA and extract the public key. Write what each key is used for.',
    minutes: 15,
    questions: [
      q.single('In public key encryption, data encrypted with a public key is decrypted with…', ['The matching private key', 'The same public key', 'A shared password', 'A hash'], 0),
      q.single('Storing a copy of private keys with a trusted third party is…', ['Key escrow', 'Key stretching', 'Salting', 'Pinning'], 0),
      q.tf('Symmetric encryption uses the same key to encrypt and decrypt.', true),
    ],
  },
  'jpsc4c7lntw': {
    try: 'Check whether your laptop’s disk is encrypted (BitLocker or FileVault) and whether your phone is. Turn it on if not.',
    minutes: 10,
    questions: [
      q.single('Encrypting an entire drive is…', ['Full-disk encryption', 'File-level encryption', 'Transport encryption', 'Hashing'], 0),
      q.single('Which encrypts data moving across a network?', ['Transport encryption like TLS', 'Full-disk encryption', 'Salting', 'Obfuscation'], 0),
      q.single('Which is a symmetric algorithm?', ['AES', 'RSA', 'ECC', 'Diffie-Hellman'], 0),
    ],
  },
  'U6BWn81P5Ec': {
    try: 'Explain how Diffie-Hellman lets two parties agree a key over an open channel, using the paint-mixing analogy.',
    minutes: 5,
    questions: [
      q.single('Which method lets two parties agree a shared key without sending it?', ['Diffie-Hellman', 'MD5', 'AES', 'Base64'], 0),
      q.single('TLS typically uses asymmetric encryption to…', ['Exchange a session key', 'Encrypt all data', 'Compress data', 'Hash passwords'], 0),
      q.tf('Out-of-band key exchange means sharing the key through a different channel.', true),
    ],
  },
  'u61J0xR_XPU': {
    try: 'On Windows, run tpm.msc; on a Mac, read about the Secure Enclave. Write what a TPM, HSM and secure enclave each protect.',
    minutes: 5,
    questions: [
      q.single('Which hardware securely stores keys in a laptop?', ['TPM', 'NIC', 'GPU', 'SSD cache'], 0),
      q.single('Which dedicated device manages keys for many servers?', ['HSM', 'TPM', 'KVM', 'UPS'], 0),
      q.single('A key management system is used to…', ['Create, store, rotate and revoke keys centrally', 'Speed up Wi-Fi', 'Scan ports', 'Back up email'], 0),
    ],
  },
  'LfuTMzZke4g': {
    try: 'Use CyberChef (free, in browser) to Base64-encode a message, then explain why encoding isn’t encryption. Try a steganography example online.',
    minutes: 10,
    questions: [
      q.single('Hiding data inside an image is…', ['Steganography', 'Tokenization', 'Masking', 'Hashing'], 0),
      q.single('Replacing a card number with a random stand-in value is…', ['Tokenization', 'Hashing', 'Encryption', 'Salting'], 0),
      q.single('Showing only the last four digits of a card number is…', ['Data masking', 'Steganography', 'Key stretching', 'Escrow'], 0),
    ],
  },
  'EcGmQjl6XEo': {
    try: 'Hash a file with sha256sum (or certutil -hashfile file SHA256). Change one character and hash again. Compare.',
    minutes: 10,
    questions: [
      q.single('Two different inputs producing the same hash is a…', ['Collision', 'Salt', 'Pepper', 'Signature'], 0),
      q.single('Adding random data to a password before hashing is…', ['Salting', 'Stretching', 'Pinning', 'Escrow'], 0),
      q.single('Which hash algorithm is considered secure today?', ['SHA-256', 'MD5', 'SHA-1', 'CRC32'], 0),
    ],
  },
  '-wqU_2ToP1M': {
    try: 'Write in two sentences how a blockchain ledger makes past records tamper-evident.',
    minutes: 5,
    questions: [
      q.single('A blockchain is best described as…', ['A distributed, append-only ledger', 'A firewall', 'An encryption algorithm', 'A backup method'], 0),
      q.tf('Each block includes the hash of the previous block.', true),
      q.single('An open public ledger means…', ['Anyone can see the transactions', 'Only admins can see it', 'It is encrypted only', 'It has no copies'], 0),
    ],
  },
  'cLa94BZH_9s': {
    try: 'Click the padlock on an HTTPS site and read its certificate: issuer, validity dates, subject alternative names and chain of trust.',
    minutes: 10,
    questions: [
      q.single('Which checks in real time whether a certificate is revoked?', ['OCSP', 'CRL only', 'CSR', 'PEM'], 0),
      q.single('A certificate that covers *.example.com is a…', ['Wildcard certificate', 'Self-signed certificate', 'Root certificate', 'Code-signing certificate'], 0),
      q.single('To get a certificate from a CA you first create a…', ['CSR', 'CRL', 'OCSP', 'HSM'], 0),
    ],
  },
  '6xUH0t6ugIM': {
    try: 'Make a table of threat actors (nation state, unskilled attacker, hacktivist, insider, organized crime, shadow IT) with motivation and resources.',
    minutes: 10,
    questions: [
      q.single('Which threat actor usually has the most resources?', ['Nation state', 'Unskilled attacker', 'Hacktivist', 'Insider'], 0),
      q.single('Employees using unapproved cloud apps is…', ['Shadow IT', 'An APT', 'Hacktivism', 'Whaling'], 0),
      q.single('A hacktivist is mainly motivated by…', ['A political or social cause', 'Money only', 'Espionage only', 'Boredom'], 0),
    ],
  },
  '4lAbGpTDZ18': {
    try: 'List the threat vectors into your organization (email, SMS, USB, unsupported apps, open ports, default credentials, suppliers) and one control for each.',
    minutes: 15,
    questions: [
      q.multi('Which are threat vectors?', ['Removable media', 'Unsecured wireless', 'Default credentials', 'Strong MFA'], [0, 1, 2]),
      q.single('Leaving unused services listening on a server increases the…', ['Attack surface', 'Bandwidth', 'Redundancy', 'Availability'], 0),
      q.tf('Supply chain partners like MSPs can be a threat vector.', true),
    ],
  },
  '9SD6DRCKZFU': {
    try: 'Report a phishing email in your mail client. Note three indicators that gave it away.',
    minutes: 5,
    questions: [
      q.single('Phishing aimed at a specific person using personal details is…', ['Spear phishing', 'Whaling', 'Vishing', 'Smishing'], 0),
      q.single('Registering a domain that misspells a real one (e.g. gooogle.com) is…', ['Typosquatting', 'Pharming', 'Spoofing ARP', 'Brute force'], 0),
      q.tf('Smishing uses SMS text messages.', true),
    ],
  },
  'X3yoNAVuKwA': {
    try: 'Write a script your help desk can use to verify a caller’s identity before resetting a password.',
    minutes: 5,
    questions: [
      q.single('Creating a believable story to get information is…', ['Pretexting', 'Tailgating', 'Brute force', 'Spraying'], 0),
      q.single('Which defence works best against impersonation calls?', ['Verify identity through a known channel', 'Answer quickly', 'Share info to be helpful', 'Disable caller ID'], 0),
      q.tf('Attackers often claim authority or urgency.', true),
    ],
  },
  'z413PV6l_Ys': {
    try: 'Explain how a watering hole attack picks its website, and which controls (patching, web filtering, EDR) would help.',
    minutes: 5,
    questions: [
      q.single('A watering hole attack compromises…', ['A site the target group often visits', 'The target’s email directly', 'A USB drive', 'A printer'], 0),
      q.single('Which helps against watering hole attacks?', ['Patching browsers and web filtering', 'Longer passwords', 'Bigger screens', 'Disabling logs'], 0),
      q.tf('Watering hole attacks target a group, not one random person.', true),
    ],
  },
  'akoDmeV3LQo': {
    try: 'List three examples of misinformation or brand impersonation you’ve seen online and how a company could respond.',
    minutes: 5,
    questions: [
      q.single('A fake website copying a company’s logo to trick customers is…', ['Brand impersonation', 'Tailgating', 'Race condition', 'Buffer overflow'], 0),
      q.single('Deliberately spreading false information is…', ['Disinformation', 'Misconfiguration', 'Tokenization', 'Salting'], 0),
      q.tf('Social engineering targets people rather than systems.', true),
    ],
  },
  'kBcTczu8FsM': {
    try: 'Read MITRE ATT&CK technique T1055 (Process Injection) and summarise it in two sentences.',
    minutes: 5,
    questions: [
      q.single('Memory injection runs malicious code…', ['Inside another process’s memory', 'Only from USB', 'Only in the BIOS', 'On the printer'], 0),
      q.single('Which control helps detect process injection?', ['EDR monitoring behaviour', 'Disk defragmentation', 'Bigger RAM', 'NAT'], 0),
      q.tf('DLL injection is a type of memory injection.', true),
    ],
  },
  '0-qeeI5jTqU': {
    try: 'Explain in your own words why writing past the end of a memory buffer can let an attacker run code.',
    minutes: 5,
    questions: [
      q.single('A buffer overflow happens when…', ['More data is written than the buffer can hold', 'A disk is full', 'A password is short', 'DNS is slow'], 0),
      q.single('Which helps prevent buffer overflows?', ['Bounds checking and memory protections like ASLR/DEP', 'Longer usernames', 'Wi-Fi encryption', 'NAT'], 0),
      q.tf('Memory-safe languages reduce buffer overflow risk.', true),
    ],
  },
  'MKptc1lPSw8': {
    try: 'Explain time-of-check to time-of-use (TOCTOU) with a bank account example.',
    minutes: 5,
    questions: [
      q.single('A race condition occurs when…', ['The outcome depends on the timing of events', 'A disk races', 'Two users share a password', 'A cable is too long'], 0),
      q.single('TOCTOU stands for…', ['Time-of-check to time-of-use', 'Type of check to type of user', 'Total output control', 'Trusted operations to trusted users'], 0),
      q.tf('Proper locking helps prevent race conditions.', true),
    ],
  },
  'KbtUrdBy9Yo': {
    try: 'Check that your OS and browser updates come from official sources and are signed. Write how code signing protects updates.',
    minutes: 5,
    questions: [
      q.single('Which verifies that an update came from the vendor and wasn’t changed?', ['Code signing', 'Compression', 'Base64', 'NAT'], 0),
      q.tf('Attackers have pushed malware through compromised update servers.', true),
      q.single('Which practice reduces risk from malicious updates?', ['Testing updates before wide rollout', 'Disabling all updates', 'Installing from email links', 'Using admin accounts'], 0),
    ],
  },
  'narir8qpGq8': {
    try: 'Check Windows Update or your Linux package manager for pending security updates and install them.',
    minutes: 10,
    questions: [
      q.single('What is the main fix for OS vulnerabilities?', ['Patching', 'Rebooting', 'Changing wallpaper', 'Adding RAM'], 0),
      q.single('Microsoft’s monthly security release is called…', ['Patch Tuesday', 'Update Friday', 'Fix Monday', 'Release Sunday'], 0),
      q.tf('Unsupported operating systems no longer get security patches.', true),
    ],
  },
  'qFUOLkEk8AQ': {
    try: 'Complete PortSwigger Web Security Academy’s free lab "SQL injection vulnerability in WHERE clause" (sign up free; legal and safe).',
    minutes: 25,
    questions: [
      q.single('SQL injection is prevented best by…', ['Parameterized queries', 'Longer passwords', 'HTTPS only', 'Rate limiting only'], 0),
      q.single('Which input is a classic SQLi test?', ['\' OR 1=1--', '<script>alert(1)</script>', '../../etc/passwd', 'ping 127.0.0.1'], 0),
      q.tf('SQL injection can expose or change database data.', true),
    ],
  },
  'PKgw0CLZIhE': {
    try: 'Complete PortSwigger’s free lab "Reflected XSS into HTML context with nothing encoded".',
    minutes: 25,
    questions: [
      q.single('XSS where the script is stored on the server and shown to many users is…', ['Stored (persistent) XSS', 'Reflected XSS', 'DOM-only XSS', 'SQLi'], 0),
      q.single('XSS runs in…', ['The victim’s browser', 'The database', 'The router', 'The BIOS'], 0),
      q.single('Which defends against XSS?', ['Output encoding and input validation', 'Bigger servers', 'NAT', 'RAID'], 0),
    ],
  },
  'TaTaEvqjjDM': {
    try: 'Check your router’s and laptop’s firmware versions and whether they are end of life. Plan an update.',
    minutes: 10,
    questions: [
      q.single('Hardware that the vendor no longer supports is…', ['End of life', 'Legacy only by name', 'Patched', 'Hardened'], 0),
      q.single('Vulnerable firmware is fixed by…', ['Firmware updates', 'OS reinstall only', 'Antivirus', 'Bigger disks'], 0),
      q.tf('Legacy hardware may not support modern security features.', true),
    ],
  },
  't2JrPrzRDLA': {
    try: 'Explain VM escape and resource reuse in two sentences each, and how hypervisor patching helps.',
    minutes: 5,
    questions: [
      q.single('An attacker breaking out of a VM to reach the host is…', ['VM escape', 'VM sprawl', 'Jailbreaking', 'Pivot'], 0),
      q.single('Data left in memory reused by another VM is a…', ['Resource reuse vulnerability', 'Race condition only', 'SQL injection', 'Phishing'], 0),
      q.tf('Keeping the hypervisor patched reduces VM escape risk.', true),
    ],
  },
  'V2DCYO-sWRQ': {
    try: 'List three common cloud misconfigurations (public storage buckets, open security groups, unused keys) and how to find them.',
    minutes: 5,
    questions: [
      q.single('A publicly readable storage bucket is a…', ['Misconfiguration', 'Zero-day', 'Race condition', 'DoS'], 0),
      q.single('In the shared responsibility model, who secures customer data in IaaS?', ['The customer', 'The cloud provider only', 'Nobody', 'The ISP'], 0),
      q.tf('Cloud access security brokers (CASB) help enforce policy for cloud apps.', true),
    ],
  },
  'WqvCJLpwExY': {
    try: 'Generate a software bill of materials (SBOM) idea: list the libraries an app you know depends on (e.g. from package.json).',
    minutes: 10,
    questions: [
      q.single('A list of all components in a piece of software is an…', ['SBOM', 'SLA', 'MOU', 'AUP'], 0),
      q.single('Which is a supply chain risk?', ['A compromised third-party library', 'A long password', 'A locked door', 'A UPS'], 0),
      q.tf('Service providers and hardware suppliers are part of the supply chain.', true),
    ],
  },
  'NBKzlUqzVmE': {
    try: 'Check one device or service you manage for default credentials, open permissions or unnecessary open ports.',
    minutes: 10,
    questions: [
      q.multi('Which are misconfiguration vulnerabilities?', ['Default credentials', 'Open permissions on files', 'Unsecured admin accounts', 'Strong encryption'], [0, 1, 2]),
      q.single('Which helps catch misconfigurations?', ['Configuration audits and secure baselines', 'Ignoring logs', 'Adding users', 'Faster CPUs'], 0),
      q.tf('Insecure protocols like Telnet are a misconfiguration risk.', true),
    ],
  },
  'DRfAwwdzYpU': {
    try: 'On your phone, check that sideloading is disabled and the OS is current. Write why jailbreaking or rooting is risky.',
    minutes: 5,
    questions: [
      q.single('Installing apps from outside the official store is…', ['Sideloading', 'Tethering', 'Pinning', 'Roaming'], 0),
      q.single('Removing iOS restrictions is called…', ['Jailbreaking', 'Rooting', 'Flashing', 'Pairing'], 0),
      q.tf('Rooting an Android phone can bypass its security model.', true),
    ],
  },
  'FDFxGLnZtoY': {
    try: 'Look up the CISA Known Exploited Vulnerabilities catalogue and find the most recently added entry.',
    minutes: 5,
    questions: [
      q.single('A zero-day vulnerability is one…', ['With no available fix when exploited', 'Fixed for years', 'Found by antivirus', 'In hardware only'], 0),
      q.tf('Defence in depth helps limit damage from zero-days.', true),
      q.single('Which detects zero-day exploitation better than signatures?', ['Behaviour-based detection', 'Static blocklists only', 'Longer passwords', 'Disabling logs'], 0),
    ],
  },
  '-eZs8wjjGGE': {
    try: 'Read a recent ransomware incident report and note how attackers got in, what they did and how the victim recovered.',
    minutes: 10,
    questions: [
      q.single('Malware that encrypts data and demands payment is…', ['Ransomware', 'Spyware', 'Adware', 'A logic bomb'], 0),
      q.single('What is the best preparation for ransomware?', ['Offline, tested backups', 'Paying quickly', 'Disabling antivirus', 'Sharing admin passwords'], 0),
      q.tf('Malware often needs a user to run something to start.', true),
    ],
  },
  'Su8ANmAoerU': {
    try: 'Explain the difference between a virus and a worm and give a famous example of each.',
    minutes: 5,
    questions: [
      q.single('Which malware spreads without user action?', ['Worm', 'Virus', 'Trojan', 'Spyware'], 0),
      q.single('Fileless malware runs mainly from…', ['Memory', 'Floppy disks', 'The printer', 'CD-ROM'], 0),
      q.tf('A virus attaches itself to other files or programs.', true),
    ],
  },
  '-VmI3xFJw78': {
    try: 'Check a new laptop or phone for preinstalled apps you don’t need (bloatware) and remove them.',
    minutes: 5,
    questions: [
      q.single('Malware that secretly watches what a user does is…', ['Spyware', 'Bloatware', 'A worm', 'A logic bomb'], 0),
      q.single('Unnecessary preinstalled software is…', ['Bloatware', 'Ransomware', 'A rootkit', 'Keylogger'], 0),
      q.tf('Bloatware can add security risk as well as slowing systems.', true),
    ],
  },
  'nu27ovJ5rqw': {
    try: 'Make flashcards for keyloggers, logic bombs and rootkits: how they work and how to detect them.',
    minutes: 10,
    questions: [
      q.single('Malware that runs when a condition is met (e.g. a date) is a…', ['Logic bomb', 'Rootkit', 'Keylogger', 'Worm'], 0),
      q.single('Which records keystrokes?', ['Keylogger', 'Rootkit', 'Logic bomb', 'Bloatware'], 0),
      q.single('Which hides deep in the OS to avoid detection?', ['Rootkit', 'Adware', 'Worm', 'Bloatware'], 0),
    ],
  },
  'oIpOuTX2HRs': {
    try: 'Explain brute-force physical attacks, RFID cloning and environmental attacks, with one control for each.',
    minutes: 5,
    questions: [
      q.single('Copying an access badge’s signal to make a duplicate is…', ['RFID cloning', 'Tailgating', 'Vishing', 'Pharming'], 0),
      q.single('Shutting down a data centre’s cooling is an example of…', ['An environmental attack', 'A cryptographic attack', 'XSS', 'SQLi'], 0),
      q.tf('Forcing a door or window open is a brute-force physical attack.', true),
    ],
  },
  'Z7OntvK--PQ': {
    try: 'Explain how a reflected and amplified DDoS uses spoofed source addresses.',
    minutes: 5,
    questions: [
      q.single('A DDoS that sends small requests causing large replies to a victim is…', ['Amplification', 'Replay', 'Pass the hash', 'Downgrade'], 0),
      q.tf('A DDoS uses many systems to overwhelm a target.', true),
      q.single('Which mitigates large DDoS attacks?', ['Upstream scrubbing / DDoS protection services', 'Antivirus', 'Longer passwords', 'MFA'], 0),
    ],
  },
  'BoxeL5ybOXI': {
    try: 'Run nslookup for your bank’s domain using two different DNS servers and compare the answers.',
    minutes: 5,
    questions: [
      q.single('Changing DNS answers to redirect users to a fake site is…', ['DNS poisoning / spoofing', 'Typosquatting only', 'Replay', 'Jamming'], 0),
      q.single('Taking over a domain’s registration is…', ['Domain hijacking', 'Tokenization', 'Pharming only', 'MAC flooding'], 0),
      q.single('Which protects DNS answers from tampering?', ['DNSSEC', 'NAT', 'VLANs', 'WPA3'], 0),
    ],
  },
  'tSLqrKhUvts': {
    try: 'Explain deauthentication attacks and why WPA3 and 802.11w (management frame protection) help.',
    minutes: 5,
    questions: [
      q.single('Sending fake frames to disconnect clients from Wi-Fi is…', ['Deauthentication attack', 'Replay', 'SQLi', 'Whaling'], 0),
      q.single('Blocking wireless signals with interference is…', ['Jamming', 'Pinning', 'Spoofing', 'Sniffing'], 0),
      q.tf('Management frame protection helps against deauthentication attacks.', true),
    ],
  },
  'M_Af6_8JTuo': {
    try: 'In Wireshark, look at ARP traffic on your network. Explain how an attacker could poison it to get on-path.',
    minutes: 10,
    questions: [
      q.single('An attacker relays traffic between two parties to read or change it. This is…', ['An on-path attack', 'DoS', 'Brute force', 'XSS'], 0),
      q.single('Malware in the browser intercepting banking sessions is…', ['On-path browser attack', 'Replay', 'Jamming', 'Typosquatting'], 0),
      q.tf('ARP poisoning is one way to become on-path on a LAN.', true),
    ],
  },
  'ai6qS13gKRo': {
    try: 'Explain pass-the-hash and session hijacking, and why timestamps and nonces stop replay attacks.',
    minutes: 5,
    questions: [
      q.single('Capturing and re-sending valid authentication data is a…', ['Replay attack', 'Downgrade attack', 'Collision', 'DoS'], 0),
      q.single('Using a captured password hash to log in without the password is…', ['Pass the hash', 'Salting', 'Spraying', 'Phishing'], 0),
      q.single('Which defends against replay?', ['Timestamps, nonces and session tokens that expire', 'Longer usernames', 'Bigger RAM', 'NAT'], 0),
    ],
  },
  'xDhUBQ_lnUA': {
    try: 'Find an example of malicious code in a script (e.g. a known malicious npm package incident) and how it was detected.',
    minutes: 5,
    questions: [
      q.single('Malicious code can be found in…', ['Scripts, macros and libraries', 'Only .exe files', 'Only BIOS', 'Only printers'], 0),
      q.tf('Disabling Office macros by default reduces malware risk.', true),
      q.single('Which helps detect malicious code before it runs?', ['Code review and scanning', 'Bigger screens', 'NAT', 'RAID'], 0),
    ],
  },
  'yRSqIGjeb7s': {
    try: 'Run OWASP Juice Shop locally in Docker (docker run -p 3000:3000 bkimminich/juice-shop) and find the score board. Only attack your own instance.',
    minutes: 30,
    questions: [
      q.single('Accessing ../../etc/passwd through a web app is…', ['Directory traversal', 'SQLi', 'CSRF', 'XSS'], 0),
      q.single('Tricking a logged-in user’s browser into sending an unwanted request is…', ['CSRF', 'XSS', 'SQLi', 'Replay'], 0),
      q.single('Gaining higher permissions than intended is…', ['Privilege escalation', 'Pivoting', 'Fuzzing', 'Pinning'], 0),
    ],
  },
  '7aJaEQy6Yoc': {
    try: 'Explain a downgrade attack against TLS and why servers should disable old protocol versions.',
    minutes: 10,
    questions: [
      q.single('Forcing a connection to use a weaker, older protocol is a…', ['Downgrade attack', 'Collision', 'Birthday attack', 'Replay'], 0),
      q.single('Finding two inputs with the same hash is…', ['A collision (birthday attack)', 'Salting', 'Pinning', 'Spraying'], 0),
      q.tf('Disabling SSL and early TLS versions prevents some downgrade attacks.', true),
    ],
  },
  '-ZfbifHwEVE': {
    try: 'Check your organization’s (or your own) account lockout and password policy. Explain how spraying avoids lockouts.',
    minutes: 5,
    questions: [
      q.single('Trying a few common passwords against many accounts is…', ['Password spraying', 'Brute force on one account', 'Phishing', 'Replay'], 0),
      q.single('Which defeats most password attacks?', ['MFA', 'Short passwords', 'Password reuse', 'Writing them down'], 0),
      q.tf('Account lockout makes brute force against one account harder.', true),
    ],
  },
  'x72hG9GvkaQ': {
    try: 'List indicators of compromise you could spot in your own logs: impossible travel, account lockouts, unusual resource use, missing logs.',
    minutes: 10,
    questions: [
      q.single('A user logs in from two countries an hour apart. This is…', ['Impossible travel', 'Concurrent session usage only', 'Normal', 'Resource consumption'], 0),
      q.single('Logs that are suddenly missing may indicate…', ['An attacker covering tracks', 'Good performance', 'Low disk', 'A firmware update'], 0),
      q.tf('Out-of-cycle logging is an indicator of compromise.', true),
    ],
  },
  'yDeDGCh_PDs': {
    try: 'Design segments and access rules for a small company network: users, servers, guests, IoT. Write which may talk to which.',
    minutes: 10,
    questions: [
      q.single('Separating systems so a breach can’t spread easily is…', ['Segmentation', 'Hashing', 'Salting', 'Pinning'], 0),
      q.single('Granting only the permissions needed for a role is…', ['Least privilege', 'Implicit allow', 'Shared accounts', 'Open access'], 0),
      q.tf('Access control lists define what is allowed between segments.', true),
    ],
  },
  'Fc8ZJfmapbI': {
    try: 'Pick one vulnerability on a device you own and choose a mitigation: patch, isolate, encrypt, monitor or decommission.',
    minutes: 5,
    questions: [
      q.single('Only allowing approved applications to run is…', ['Application allow listing', 'Block listing', 'Sandboxing', 'Tokenizing'], 0),
      q.single('Fully separating a device so it can’t communicate is…', ['Isolation', 'Encryption', 'Hashing', 'Pinning'], 0),
      q.tf('Decommissioning removes systems that are no longer needed.', true),
    ],
  },
  'wXoC46Qr_9Q': {
    try: 'Harden a test VM: remove unused software, close unused ports, enable the host firewall, and install EDR or Defender.',
    minutes: 20,
    questions: [
      q.multi('Which are hardening techniques?', ['Disabling unused ports and services', 'Changing default passwords', 'Installing host-based firewall', 'Enabling guest accounts'], [0, 1, 2]),
      q.single('Which detects and responds to threats on endpoints?', ['EDR', 'NAT', 'DHCP', 'SNMP'], 0),
      q.tf('Removing unnecessary software reduces the attack surface.', true),
    ],
  },
  '8qpQ8Q6xxiU': {
    try: 'Draw the shared responsibility model for SaaS, PaaS and IaaS: what the customer and provider each secure.',
    minutes: 10,
    questions: [
      q.single('In IaaS, who patches the guest operating system?', ['The customer', 'The provider', 'Nobody', 'The ISP'], 0),
      q.single('Running functions without managing servers is…', ['Serverless', 'Bare metal', 'Mainframe', 'On-premises'], 0),
      q.tf('Microservices split an application into small independent services.', true),
    ],
  },
  'jd001Hj7XWM': {
    try: 'Explain physical isolation (air gap) and logical segmentation, with a place each is used.',
    minutes: 5,
    questions: [
      q.single('A system with no network connection to others is…', ['Air-gapped', 'Segmented', 'Clustered', 'Virtualized'], 0),
      q.single('Separating the control plane from the data plane is a feature of…', ['SDN', 'RAID', 'PKI', 'DLP'], 0),
      q.tf('Logical segmentation can use VLANs.', true),
    ],
  },
  'HDiNPPrGhzE': {
    try: 'List the security concerns of IoT, ICS/SCADA, embedded and real-time systems, with one example device each.',
    minutes: 15,
    questions: [
      q.single('Systems controlling power plants and factories are…', ['ICS/SCADA', 'SaaS', 'VDI', 'CDN'], 0),
      q.single('A real-time operating system (RTOS) is used where…', ['Responses must happen within strict time limits', 'Gaming only', 'Email servers', 'Office PCs'], 0),
      q.tf('IoT devices often lack strong security and are hard to patch.', true),
    ],
  },
  'Ap3Z_0ZdqpQ': {
    try: 'For a new system, rate availability, resilience, cost, responsiveness, scalability, ease of deployment and patch availability.',
    minutes: 10,
    questions: [
      q.single('A system that can recover quickly from failure is…', ['Resilient', 'Scalable only', 'Cheap', 'Legacy'], 0),
      q.single('Being able to grow to handle more load is…', ['Scalability', 'Availability', 'Integrity', 'Non-repudiation'], 0),
      q.tf('Security decisions involve trade-offs like cost and ease of deployment.', true),
    ],
  },
  'l64La1xYXL4': {
    try: 'Place devices in a network diagram by security zone: internet, screened subnet, internal, restricted.',
    minutes: 10,
    questions: [
      q.single('Public-facing servers should sit in the…', ['Screened subnet (DMZ)', 'Internal LAN', 'Restricted zone', 'Guest Wi-Fi'], 0),
      q.single('Fail-closed means that when a security device fails it…', ['Blocks traffic', 'Allows all traffic', 'Reboots forever', 'Logs only'], 0),
      q.tf('Attack surface is reduced by limiting exposed services.', true),
    ],
  },
  '7QuYupuic3Q': {
    try: 'Explain the difference between active (inline) and passive (tap/monitor) security devices.',
    minutes: 5,
    questions: [
      q.single('An IPS placed inline can…', ['Block traffic in real time', 'Only alert', 'Only log', 'Only copy traffic'], 0),
      q.single('A device connected to a SPAN port is…', ['Passive monitoring', 'Inline', 'Fail-closed', 'A firewall'], 0),
      q.tf('An IDS alerts but doesn’t block.', true),
    ],
  },
  'WlOslEy3ztg': {
    try: 'Match appliances to jobs: jump server, proxy, load balancer, sensors, WAF. Write where each sits.',
    minutes: 10,
    questions: [
      q.single('Which protects web applications from SQLi and XSS?', ['WAF', 'Load balancer', 'Jump server', 'Proxy only'], 0),
      q.single('A hardened server used to access other secure systems is a…', ['Jump server', 'Honeypot', 'Web server', 'DHCP server'], 0),
      q.single('Which distributes traffic across servers?', ['Load balancer', 'WAF', 'Sensor', 'Tap'], 0),
    ],
  },
  'QhLQ6J4satw': {
    try: 'Explain how 802.1X with EAP and a RADIUS server controls which devices get on a switch port.',
    minutes: 5,
    questions: [
      q.single('Port-based network access control uses which standard?', ['802.1X', '802.1Q', '802.3af', '802.11ax'], 0),
      q.single('In 802.1X, the device requesting access is the…', ['Supplicant', 'Authenticator', 'Authentication server', 'Proxy'], 0),
      q.tf('The switch acts as the authenticator in 802.1X.', true),
    ],
  },
  'mq1HRM-zGtQ': {
    try: 'Compare a stateless ACL, a stateful firewall and an NGFW: what each can inspect.',
    minutes: 10,
    questions: [
      q.single('A firewall that can identify applications regardless of port is a…', ['Next-generation firewall', 'Packet filter', 'Hub', 'Proxy cache'], 0),
      q.single('A firewall that tracks connections and allows replies is…', ['Stateful', 'Stateless', 'Passive', 'Fail-open'], 0),
      q.single('A layer 7 firewall understands…', ['Application traffic', 'Only IP addresses', 'Only MAC addresses', 'Only cables'], 0),
    ],
  },
  'uU3e_ntg-3g': {
    try: 'Compare IPsec tunnel mode and transport mode, and when you would use SD-WAN or SASE.',
    minutes: 10,
    questions: [
      q.single('Which IPsec mode encrypts the whole original packet?', ['Tunnel mode', 'Transport mode', 'AH only', 'GRE'], 0),
      q.single('SASE delivers networking and security…', ['From the cloud', 'Only on-premises', 'Through USB', 'Via SMS'], 0),
      q.tf('A TLS VPN can run in a web browser.', true),
    ],
  },
  'R0W0_gZCVzk': {
    try: 'Classify data you handle: public, private, sensitive, confidential, restricted. Give an example of each.',
    minutes: 5,
    questions: [
      q.single('Data protected by law about a person’s health is…', ['Regulated data', 'Public data', 'Trade secrets only', 'Open data'], 0),
      q.single('A company’s secret recipe is…', ['A trade secret', 'Public data', 'Legal data only', 'Metadata'], 0),
      q.tf('Data classification decides how data must be protected.', true),
    ],
  },
  '71RQaYQ4QSw': {
    try: 'For a file on your laptop, write when it is at rest, in transit and in use, and the protection for each.',
    minutes: 5,
    questions: [
      q.match('Match each data state to a protection.', [['At rest', 'Disk encryption'], ['In transit', 'TLS'], ['In use', 'Secure enclaves / access controls']]),
      q.single('Rules keeping data in a particular country are…', ['Data sovereignty', 'Data masking', 'Tokenization', 'Hashing'], 0),
      q.tf('Geolocation can be used to restrict where data is accessed from.', true),
    ],
  },
  'leX_Qa7wqB4': {
    try: 'Pick sensitive data you hold and choose a method for it: encryption, hashing, masking, tokenization, obfuscation or segmentation.',
    minutes: 10,
    questions: [
      q.single('Storing passwords safely uses…', ['Salted hashing', 'Reversible encryption', 'Plain text', 'Base64'], 0),
      q.single('Allowing only certain countries to access a system is…', ['Geographic restriction', 'Tokenization', 'Masking', 'Hashing'], 0),
      q.tf('Permission restrictions are a way to protect data.', true),
    ],
  },
  'sb0dRaQbuBA': {
    try: 'Draw a highly available web service: load balancer, multiple servers across two sites, replicated database.',
    minutes: 10,
    questions: [
      q.single('Spreading load across several servers that can each take over is…', ['Load balancing / clustering', 'Tokenization', 'Hashing', 'NAT'], 0),
      q.single('A recovery site with equipment and data nearly ready is a…', ['Hot site', 'Cold site', 'Warm site', 'Mobile site'], 0),
      q.tf('Using multiple cloud providers can improve resilience.', true),
    ],
  },
  'WGlT6-gNwqY': {
    try: 'For a service you know, list the people, technology and infrastructure capacity it needs for a busy period.',
    minutes: 5,
    questions: [
      q.multi('Capacity planning considers…', ['People', 'Technology', 'Infrastructure', 'Wallpaper choices'], [0, 1, 2]),
      q.tf('Cloud elasticity helps meet sudden demand.', true),
      q.single('Not planning capacity can cause…', ['Outages at peak times', 'Stronger encryption', 'Better logs', 'Lower costs always'], 0),
    ],
  },
  'IhT7Odu4xHc': {
    try: 'Plan a tabletop exercise for a ransomware scenario: participants, scenario, questions to discuss.',
    minutes: 10,
    questions: [
      q.single('A discussion-based walkthrough of an incident scenario is a…', ['Tabletop exercise', 'Failover test', 'Simulation with live systems', 'Pen test'], 0),
      q.single('Actually switching operations to a backup site is…', ['Failover', 'Tabletop', 'Parallel processing', 'Hashing'], 0),
      q.tf('Recovery plans should be tested regularly.', true),
    ],
  },
  '8mGSwRScqIM': {
    try: 'Set up an automatic backup and restore a file from it. Note frequency, encryption, on-site/off-site and whether it’s a snapshot or full copy.',
    minutes: 20,
    questions: [
      q.single('Which backup copies only data changed since the last backup of any kind?', ['Incremental', 'Differential', 'Full', 'Snapshot'], 0),
      q.single('Copying data to another site as it changes is…', ['Replication', 'Journaling', 'Archiving', 'Hashing'], 0),
      q.tf('Backups should be encrypted and tested.', true),
    ],
  },
  '-EY45MimSBM': {
    try: 'Work out what UPS and generator capacity a small server room needs, and how long the UPS must last until the generator starts.',
    minutes: 5,
    questions: [
      q.single('Which provides short-term power during an outage?', ['UPS', 'Generator', 'Solar panels only', 'PDU'], 0),
      q.single('Which provides long-term backup power?', ['Generator', 'UPS', 'Surge strip', 'KVM'], 0),
      q.tf('A UPS bridges the gap until a generator starts.', true),
    ],
  },
  ...operations,
};
