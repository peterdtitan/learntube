import { q } from '../../src/lib/content/plan';

// CompTIA A+ Core 2 (220-1202): a Try task and quick-check questions per video, keyed by
// YouTube id. Videos: ./videos/a-plus-core-2.json (Professor Messer's free course).

export default {
  'IhcZqUs1IF8': {
    try: 'Write down which operating systems you use daily (desktop and phone), their versions, and when each one stops getting security updates.',
    minutes: 10,
    questions: [
      q.single('Why does an OS reaching end of life matter for security?', ['It stops getting security patches', 'It runs faster', 'It loses its licence key', 'It deletes user files'], 0, 'Unpatched systems collect known vulnerabilities.'),
      q.match('Match each OS to a typical device.', [['Windows', 'Office desktop'], ['macOS', 'Apple laptop'], ['Android', 'Many smartphones'], ['iPadOS', 'Apple tablet']], 'Know which OS runs where.'),
      q.tf('Linux is open source, so its source code is publicly available.', true, 'Many distributions are free to use and modify.'),
    ],
  },
  'lwCu2rpXP1E': {
    try: 'Plug in a USB drive and check its file system (Windows: right-click → Properties). Note whether it is FAT32, exFAT or NTFS and why that matters.',
    minutes: 5,
    questions: [
      q.single('Which file system supports permissions and encryption on Windows?', ['FAT32', 'exFAT', 'NTFS', 'ext4'], 2, 'NTFS supports ACLs, EFS and large files.'),
      q.single('FAT32 can’t store a single file larger than…', ['2 GB', '4 GB', '16 GB', '2 TB'], 1, 'FAT32 has a 4 GB file size limit; exFAT removes it.'),
      q.single('Which file system is common on Linux?', ['ext4', 'NTFS', 'APFS', 'ReFS'], 0, 'ext4 is a common Linux default; APFS is macOS.'),
    ],
  },
  'SoDrALxWWTg': {
    try: 'Create a bootable Windows or Ubuntu USB installer with the official tool or Rufus, or install an OS into a VirtualBox VM.',
    minutes: 30,
    questions: [
      q.single('Which partition style supports drives larger than 2 TB and is used with UEFI?', ['MBR', 'GPT', 'FAT', 'Extended'], 1, 'GPT replaces MBR on modern systems.'),
      q.single('An installation that wipes the drive and starts fresh is a…', ['Clean install', 'In-place upgrade', 'Repair install', 'Image deployment'], 0, 'Clean installs remove existing data.'),
      q.single('Installing an OS over the network with PXE boot is useful for…', ['Single home PCs', 'Deploying many computers at once', 'Mobile phones', 'Printers'], 1, 'Network boot lets IT image many machines.'),
    ],
  },
  'KUD7v9nHiL4': {
    try: 'Check whether your PC meets Windows 11 requirements with the PC Health Check app, and note any that fail.',
    minutes: 10,
    questions: [
      q.single('Which upgrade keeps the user’s files, settings and apps?', ['Clean install', 'In-place upgrade', 'Format and install', 'Image restore'], 1, 'In-place upgrades preserve data and applications.'),
      q.single('Before upgrading Windows, what should you always do first?', ['Back up the user’s data', 'Delete the page file', 'Disable the firewall', 'Remove all users'], 0, 'Upgrades can fail; backups protect data.'),
      q.multi('Which are Windows 11 hardware requirements?', ['TPM 2.0', 'UEFI with Secure Boot', 'A floppy drive', 'A DVD drive'], [0, 1], 'Windows 11 needs TPM 2.0 and UEFI Secure Boot capability.'),
    ],
  },
  'B7JZ6rfH06Q': {
    try: 'Find your Windows edition (Home, Pro, Enterprise) under Settings → System → About, and list one feature Pro has that Home doesn’t.',
    minutes: 5,
    questions: [
      q.single('Which Windows edition can join an Active Directory domain?', ['Home', 'Pro', 'Home N', 'S mode'], 1, 'Home editions can’t join a domain.'),
      q.single('BitLocker full-disk encryption is available in which editions?', ['Home only', 'Pro and Enterprise', 'None', 'Only Windows Server'], 1, 'Home has the more limited device encryption.'),
      q.tf('Group Policy Editor (gpedit.msc) is included in Windows Home.', false, 'It’s in Pro and higher.'),
    ],
  },
  'uvreKWR__FA': {
    try: 'Explore three Windows features: Remote Desktop settings, BitLocker (if available) and Windows Sandbox or Hyper-V (Pro). Note which your edition supports.',
    minutes: 10,
    questions: [
      q.single('Which feature lets you connect to and control another Windows PC remotely?', ['Remote Desktop', 'BitLocker', 'Windows Hello', 'OneDrive'], 0, 'RDP uses TCP port 3389.'),
      q.tf('A Windows Home PC can host incoming Remote Desktop connections.', false, 'Home can connect out but not host RDP.'),
      q.single('Which feature encrypts an entire drive?', ['EFS', 'BitLocker', 'Defender', 'Storage Spaces'], 1, 'EFS encrypts individual files; BitLocker encrypts volumes.'),
    ],
  },
  'iyUyHTelPeQ': {
    try: 'Open Task Manager (Ctrl+Shift+Esc). Find the app using the most memory, check the Startup tab, and see live CPU and network graphs.',
    minutes: 5,
    questions: [
      q.single('Where can you disable programs that launch at sign-in?', ['Task Manager → Startup apps', 'Disk Management', 'Device Manager', 'Event Viewer'], 0, 'Startup apps slow boot when there are many.'),
      q.single('A computer is slow. Where do you quickly see which process uses the most CPU?', ['Task Manager', 'Regedit', 'Print Management', 'Notepad'], 0, 'The Processes tab sorts by usage.'),
      q.single('What is the keyboard shortcut to open Task Manager directly?', ['Ctrl+Shift+Esc', 'Alt+F4', 'Ctrl+C', 'Windows+L'], 0, 'Ctrl+Alt+Del also offers it.'),
    ],
  },
  'e0KInDq-6Pw': {
    try: 'Open Event Viewer and find the last 3 errors in the System log. Open Disk Management and Device Manager and note what each shows.',
    minutes: 15,
    questions: [
      q.match('Match each MMC tool to its job.', [['Event Viewer', 'View system and application logs'], ['Device Manager', 'Manage hardware drivers'], ['Disk Management', 'Create and format partitions'], ['Task Scheduler', 'Run tasks at set times']], 'MMC snap-ins are frequently tested.'),
      q.single('Which tool manages local users and groups on Windows Pro?', ['lusrmgr.msc', 'devmgmt.msc', 'diskmgmt.msc', 'perfmon'], 0, 'Local Users and Groups isn’t in Home editions.'),
      q.single('Which tool monitors system performance counters over time?', ['Performance Monitor', 'Notepad', 'Paint', 'Disk Cleanup'], 0, 'Perfmon logs counters like CPU and disk queue length.'),
    ],
  },
  'kLIUVFTTdcA': {
    try: 'Run msinfo32, resmon and cleanmgr. Note one useful piece of information from each.',
    minutes: 10,
    questions: [
      q.single('Which tool shows detailed hardware and system information?', ['msinfo32', 'cleanmgr', 'regedit', 'dxdiag only'], 0, 'System Information lists hardware, drivers and settings.'),
      q.single('Which tool removes temporary files to free disk space?', ['Disk Cleanup (cleanmgr)', 'Resource Monitor', 'MSConfig', 'Event Viewer'], 0),
      q.tf('Editing the registry with regedit can stop Windows from starting if done wrongly.', true, 'Back up the registry before editing it.'),
    ],
  },
  'iLgAwxmTSzI': {
    try: 'Open Command Prompt and run: dir, cd, md test, copy, robocopy, chkdsk (read-only), sfc /scannow (as admin), gpupdate /force, and whoami.',
    minutes: 20,
    questions: [
      q.single('Which command checks and repairs protected Windows system files?', ['sfc /scannow', 'chkdsk', 'diskpart', 'gpresult'], 0, 'System File Checker restores corrupted system files.'),
      q.single('Which command applies new Group Policy settings immediately?', ['gpupdate /force', 'gpresult /r', 'ipconfig /renew', 'net use'], 0),
      q.single('Which command copies folders robustly, with retries and mirroring?', ['robocopy', 'copy', 'xcopy only', 'move'], 0, 'Robocopy is the robust file copy tool.'),
    ],
  },
  'FOaw5aPO0ZI': {
    try: 'Run ipconfig /all, ping, tracert google.com, nslookup google.com, netstat -an and pathping. Write one sentence on what each told you.',
    minutes: 15,
    questions: [
      q.single('Which command shows each router hop to a destination?', ['tracert', 'ping', 'netstat', 'nslookup'], 0),
      q.single('Which command lists active connections and listening ports?', ['netstat', 'ipconfig', 'hostname', 'net user'], 0),
      q.single('Which command queries a DNS server for a name?', ['nslookup', 'arp', 'route', 'tracert'], 0),
    ],
  },
  'AhGWshIRcKw': {
    try: 'In Control Panel, find: Programs and Features, Device Manager, User Accounts, Power Options, File Explorer Options (show hidden files and extensions).',
    minutes: 15,
    questions: [
      q.single('A user can’t see file extensions. Where do you change this?', ['File Explorer Options', 'Power Options', 'Sound', 'Mail'], 0, 'View tab → uncheck "Hide extensions for known file types".'),
      q.single('Where do you set what happens when a laptop lid closes?', ['Power Options', 'Device Manager', 'Programs and Features', 'Region'], 0),
      q.tf('Showing file extensions helps users spot malware like invoice.pdf.exe.', true, 'Hidden extensions disguise executables.'),
    ],
  },
  '0qfZtEZCvn0': {
    try: 'In Windows Settings, find where to manage Windows Update, apps, privacy permissions (camera/microphone) and accounts.',
    minutes: 5,
    questions: [
      q.single('Where do you control which apps can use the microphone in Windows 11?', ['Settings → Privacy & security', 'Device Manager', 'Disk Management', 'Task Scheduler'], 0),
      q.single('Where do you pause or check Windows updates?', ['Settings → Windows Update', 'Event Viewer', 'Regedit', 'Paint'], 0),
      q.tf('Many Control Panel functions are moving into the Settings app in newer Windows versions.', true),
    ],
  },
  '1OlbYiS-xHY': {
    try: 'Check whether your PC is on a workgroup or domain (Settings → System → About → advanced). Map a network drive to a shared folder if you have one.',
    minutes: 10,
    questions: [
      q.single('Which Windows network model uses central accounts and policies from a server?', ['Workgroup', 'Domain', 'Homegroup', 'Peer-to-peer'], 1, 'Domains use Active Directory.'),
      q.single('Which command maps a network drive letter?', ['net use', 'ipconfig', 'netstat', 'tracert'], 0, 'e.g. net use Z: \\\\server\\share'),
      q.tf('An administrative share like C$ exists by default on Windows.', true, 'Hidden admin shares end with $.'),
    ],
  },
  'ZmtkzwzVDaE': {
    try: 'Open Windows Defender Firewall with Advanced Security and look at one inbound rule. Note which profile (domain, private, public) your network uses.',
    minutes: 10,
    questions: [
      q.single('Which firewall profile should be used on a coffee-shop Wi-Fi?', ['Domain', 'Private', 'Public', 'None'], 2, 'Public is the most restrictive.'),
      q.tf('Windows Firewall can allow or block traffic per program and per port.', true),
      q.single('A game needs incoming connections. What should you do?', ['Turn the firewall off', 'Create an exception for that app or port', 'Disable antivirus', 'Change the IP address'], 1, 'Allow only what’s needed.'),
    ],
  },
  'wA0BV7FzH9Q': {
    try: 'In a VM, set a static IPv4 address in Windows network adapter properties, test it, then set it back to obtain automatically.',
    minutes: 10,
    questions: [
      q.single('Which setting is needed to reach websites by name when using a static IP?', ['DNS server', 'Wallpaper', 'MAC address', 'NetBIOS name'], 0),
      q.single('Which address is a valid alternate configuration if DHCP fails?', ['A user-configured static address', 'The DNS name', 'The MAC address', 'A URL'], 0, 'Windows can use an alternate config instead of APIPA.'),
      q.tf('A static IP must not be in the range the DHCP server hands out.', true, 'Overlaps cause IP conflicts.'),
    ],
  },
  'Ir1Yhigsdtw': {
    try: 'Set up a VPN connection in Windows Settings (fields only, no need to connect) and look at the metered connection setting for Wi-Fi.',
    minutes: 10,
    questions: [
      q.single('Marking a connection as metered in Windows does what?', ['Limits background data use', 'Speeds it up', 'Encrypts it', 'Blocks all apps'], 0),
      q.single('Which connection type connects securely to the office over the internet?', ['VPN', 'Dial-up', 'WWAN only', 'Ad hoc'], 0),
      q.tf('A proxy server setting in Windows sends web traffic through another server.', true, 'Proxies filter and cache traffic.'),
    ],
  },
  '6Xg4VbEfx88': {
    try: 'If you have a Mac, open About This Mac and System Information; otherwise, look up the macOS equivalents of Task Manager and Control Panel.',
    minutes: 5,
    questions: [
      q.match('Match each macOS tool to its Windows equivalent.', [['Activity Monitor', 'Task Manager'], ['Finder', 'File Explorer'], ['System Settings', 'Control Panel / Settings'], ['Terminal', 'Command Prompt']], 'Know the macOS names.'),
      q.single('Which macOS feature backs up to an external drive automatically?', ['Time Machine', 'Spotlight', 'Keychain', 'Mission Control'], 0),
      q.single('Which macOS app installs approved software?', ['App Store', 'Disk Utility', 'Boot Camp', 'Remote Disc'], 0),
    ],
  },
  'vhf6FMK1BOk': {
    try: 'Find in macOS System Settings (or screenshots online): displays, networks, privacy & security, and accessibility.',
    minutes: 5,
    questions: [
      q.single('Where in macOS do you allow an app to record the screen?', ['Privacy & Security', 'Dock', 'Finder', 'Spotlight'], 0),
      q.tf('macOS stores passwords and certificates in the Keychain.', true),
      q.single('Which macOS tool repairs and erases disks?', ['Disk Utility', 'Activity Monitor', 'Console', 'Finder'], 0),
    ],
  },
  'J5aZyz-ng7A': {
    try: 'List these macOS features and what they do: Mission Control, Spotlight, iCloud, FileVault, Gestures.',
    minutes: 5,
    questions: [
      q.single('Which macOS feature encrypts the whole drive?', ['FileVault', 'Spotlight', 'Gatekeeper', 'Time Machine'], 0),
      q.single('Which feature searches files and apps across the Mac?', ['Spotlight', 'Dock', 'Siri only', 'Launchpad'], 0),
      q.tf('Mission Control shows all open windows and desktops at once.', true),
    ],
  },
  'cpc3bHzWKG4': {
    try: 'In your Linux VM, find the distribution and version (cat /etc/os-release) and where home folders and logs live (/home, /var/log).',
    minutes: 10,
    questions: [
      q.single('Which directory holds Linux system logs?', ['/var/log', '/home', '/etc', '/bin'], 0),
      q.single('Which directory holds system-wide configuration files?', ['/etc', '/tmp', '/home', '/dev'], 0),
      q.tf('The root account on Linux has full administrative control.', true, 'Use sudo instead of logging in as root.'),
    ],
  },
  'ig0X_dR68Ac': {
    try: 'In your Linux VM, practise: ls -la, cd, pwd, mkdir, cp, mv, rm, cat, grep, find, chmod, chown, and sudo apt update.',
    minutes: 25,
    questions: [
      q.single('Which command searches inside files for text?', ['grep', 'find', 'ls', 'cd'], 0),
      q.single('Which command changes file permissions?', ['chmod', 'chown', 'passwd', 'ps'], 0, 'chown changes the owner.'),
      q.single('Which command runs a command as an administrator?', ['sudo', 'su -c only', 'admin', 'runas'], 0),
    ],
  },
  'rtL8aKAFlqc': {
    try: 'In your Linux VM, run ps aux, top, df -h, du -sh *, ip addr, ping -c 4, nano, and man ls. Note what each shows.',
    minutes: 20,
    questions: [
      q.single('Which command shows free disk space on mounted file systems?', ['df -h', 'du', 'free', 'ps'], 0),
      q.single('Which command shows running processes updating live?', ['top', 'cat', 'ls', 'pwd'], 0),
      q.single('Which command shows the manual page for another command?', ['man', 'help me', 'info only', 'about'], 0),
    ],
  },
  'G2Equ2pG7aY': {
    try: 'Check an app’s system requirements (RAM, CPU, disk, OS) against your computer. Then install it from a trusted source.',
    minutes: 10,
    questions: [
      q.single('Before installing software for a user, what should you check?', ['System requirements and licence', 'Their wallpaper', 'The router model', 'Printer toner'], 0),
      q.tf('Running a 64-bit application requires a 64-bit operating system.', true),
      q.single('Which is the safest source for installing an app?', ['The vendor or an official store', 'A random download site', 'An email attachment', 'A pop-up ad'], 0),
    ],
  },
  'FTRbdIjK1DU': {
    try: 'List the cloud tools you use (email, storage, collaboration) and where you would manage their accounts and sharing settings.',
    minutes: 5,
    questions: [
      q.single('Which is an example of cloud file storage and synchronisation?', ['OneDrive', 'Event Viewer', 'BitLocker', 'Task Manager'], 0),
      q.tf('Cloud productivity tools usually need licences assigned to each user.', true, 'Microsoft 365 and Google Workspace are licensed per user.'),
      q.single('Which helps several people edit the same document at once?', ['Cloud collaboration suites', 'Local copies on USB', 'Printing', 'Fax'], 0),
    ],
  },
  'ZseOfNiOaYM': {
    try: 'Walk round your building and list physical security controls you see: badge readers, cameras, locks, fences, lighting, signage.',
    minutes: 10,
    questions: [
      q.single('A space where only one person can pass at a time between two doors is a…', ['Access control vestibule', 'Bollard', 'Fence', 'Badge reader'], 0, 'Formerly called a mantrap; it stops tailgating.'),
      q.single('Which stops vehicles getting too close to a building?', ['Bollards', 'Cameras', 'Lighting', 'Signs'], 0),
      q.tf('Video surveillance can both deter and record incidents.', true),
    ],
  },
  'X1v63NhrcP4': {
    try: 'Identify each in your daily life: key fob, smart card, biometric reader, lock. Which are something you have, know, or are?',
    minutes: 5,
    questions: [
      q.single('Fingerprint readers are an example of…', ['Something you know', 'Something you have', 'Something you are', 'Somewhere you are'], 2),
      q.single('Someone follows an employee through a secure door without badging. This is…', ['Tailgating', 'Phishing', 'Shoulder surfing', 'Vishing'], 0),
      q.tf('Equipment locks such as cable locks deter theft of laptops.', true),
    ],
  },
  'xU_OoSXTVHA': {
    try: 'Review the permissions on a shared folder you use. Who has access, and does everyone need it? Apply the principle of least privilege on paper.',
    minutes: 10,
    questions: [
      q.single('Giving users only the access they need to do their job is…', ['Least privilege', 'Implicit deny', 'Zero trust', 'Separation of duties'], 0),
      q.single('Which protects data from leaving the organization by accident?', ['DLP', 'NTP', 'DHCP', 'DNS'], 0, 'Data loss prevention monitors and blocks sensitive data transfers.'),
      q.tf('Access control lists (ACLs) define who can access a resource.', true),
    ],
  },
  '4U0WRPkDPhM': {
    try: 'Turn on multi-factor authentication for one of your important accounts (email or bank) using an authenticator app.',
    minutes: 10,
    questions: [
      q.single('Password + authenticator app code is an example of…', ['Single sign-on', 'Multi-factor authentication', 'Biometrics only', 'Federation'], 1),
      q.single('Logging in once to reach many applications is…', ['SSO', 'MFA', 'RBAC', 'TOTP'], 0),
      q.single('Which MFA method is least secure?', ['SMS code', 'Hardware security key', 'Authenticator app', 'Passkey'], 0, 'SMS can be intercepted or SIM-swapped.'),
    ],
  },
  'zAArPlmVssU': {
    try: 'Open Windows Security, run a quick scan, check that real-time protection is on and find the protection history.',
    minutes: 5,
    questions: [
      q.single('What is Microsoft Defender Antivirus?', ['Built-in Windows anti-malware', 'A firewall only', 'A backup tool', 'A VPN'], 0),
      q.tf('Antivirus definitions must be kept up to date to detect new threats.', true),
      q.single('Where do you see threats Defender found and removed?', ['Protection history', 'Device Manager', 'Disk Cleanup', 'Task Scheduler'], 0),
    ],
  },
  'VecgTIZTG1g': {
    try: 'Check that Windows Firewall is on for all profiles, and look at which apps are allowed through it.',
    minutes: 5,
    questions: [
      q.tf('A host-based firewall protects a single computer.', true, 'Network firewalls protect whole networks.'),
      q.single('An app can’t receive connections after install. What should you check?', ['Firewall rules for that app', 'Screen resolution', 'Keyboard layout', 'Printer driver'], 0),
      q.single('Turning the firewall off to fix an app is…', ['A good long-term fix', 'Bad practice; add a rule instead', 'Required by Windows', 'The default'], 1),
    ],
  },
  'SR7tw10W5YU': {
    try: 'Review your Windows account type (admin or standard), turn on UAC to the default level, and set a screen lock after a few minutes idle.',
    minutes: 10,
    questions: [
      q.single('What does User Account Control (UAC) do?', ['Prompts before changes needing admin rights', 'Encrypts the disk', 'Blocks websites', 'Backs up files'], 0),
      q.single('Which account type should people use for daily work?', ['Standard user', 'Administrator', 'Guest', 'Built-in Administrator'], 0, 'Least privilege limits damage from malware.'),
      q.tf('BitLocker To Go encrypts removable drives.', true),
    ],
  },
  'GuWMKVTMD7k': {
    try: 'Draw how Active Directory organizes a small company: domain, OUs for departments, users, groups and a Group Policy that sets a password policy.',
    minutes: 15,
    questions: [
      q.single('What is used to organize users and computers inside an AD domain?', ['Organizational units (OUs)', 'VLANs', 'Subnets', 'Workgroups'], 0),
      q.single('What applies settings like password rules to many computers at once?', ['Group Policy', 'Task Manager', 'Device Manager', 'Disk Management'], 0),
      q.single('A user is locked out after too many wrong passwords. What do you do in AD?', ['Unlock the account and verify identity', 'Delete the account', 'Disable Group Policy', 'Reinstall Windows'], 0),
    ],
  },
  'oQV7ZLu25KI': {
    try: 'Check your home Wi-Fi router’s security setting. Change it to WPA3 (or WPA2/WPA3 mixed) if available, and set a strong passphrase.',
    minutes: 10,
    questions: [
      q.single('Which is the most secure Wi-Fi security protocol here?', ['WEP', 'WPA', 'WPA2-TKIP', 'WPA3'], 3),
      q.single('Which encryption does WPA2 use?', ['AES (CCMP)', 'RC4 only', 'DES', 'None'], 0),
      q.tf('WEP should never be used because it can be cracked quickly.', true),
    ],
  },
  'zj9bqo_s0yE': {
    try: 'Compare WPA2/WPA3-Personal and Enterprise. Write which one a company of 200 people should use and why.',
    minutes: 5,
    questions: [
      q.single('Which wireless setup authenticates each user with their own credentials through a RADIUS server?', ['WPA-Personal (PSK)', 'WPA-Enterprise (802.1X)', 'Open network', 'WPS'], 1),
      q.single('Which protocol is commonly used for central network authentication?', ['RADIUS', 'SMTP', 'FTP', 'SNMP'], 0, 'TACACS+ and Kerberos are others.'),
      q.tf('A pre-shared key means everyone uses the same Wi-Fi password.', true),
    ],
  },
  'lB5VwnsUG3E': {
    try: 'Make a table of malware types (virus, worm, trojan, ransomware, spyware, keylogger, rootkit) with how each spreads or hides.',
    minutes: 15,
    questions: [
      q.single('Which malware spreads by itself across networks without user action?', ['Worm', 'Trojan', 'Spyware', 'Adware'], 0),
      q.single('Which malware encrypts files and demands payment?', ['Ransomware', 'Rootkit', 'Keylogger', 'Virus'], 0),
      q.single('Which malware hides deep in the OS to avoid detection?', ['Rootkit', 'Adware', 'Worm', 'Trojan'], 0),
    ],
  },
  'u2oKe31twIU': {
    try: 'Find where Windows Recovery Environment (WinRE) is accessed, and list three anti-malware tools or steps you could use on an infected PC.',
    minutes: 10,
    questions: [
      q.single('Which tool helps remove malware that loads before Windows starts?', ['Boot-time or offline scan', 'Disk Cleanup', 'Task Manager', 'Paint'], 0),
      q.tf('Restoring from a known-good backup can recover from ransomware.', true),
      q.single('Endpoint detection and response (EDR) does what?', ['Monitors endpoints for suspicious behaviour and responds', 'Speeds up Wi-Fi', 'Replaces the firewall', 'Manages printers'], 0),
    ],
  },
  '9xtzpbY1n9I': {
    try: 'Look through your spam folder for a phishing email. List the signs: sender address, urgency, links, attachments, spelling.',
    minutes: 10,
    questions: [
      q.match('Match each attack to its description.', [['Phishing', 'Fraudulent email'], ['Vishing', 'Fraudulent phone call'], ['Smishing', 'Fraudulent text message'], ['Shoulder surfing', 'Watching someone type']], 'Know the social engineering terms.'),
      q.single('An attacker calls pretending to be IT and asks for a password. This is…', ['Impersonation / pretexting', 'Tailgating', 'DoS', 'Whaling only'], 0),
      q.single('Phishing aimed at senior executives is…', ['Whaling', 'Spear phishing of interns', 'Vishing', 'Pharming'], 0),
    ],
  },
  '00dFDSv03EQ': {
    try: 'Explain in two sentences the difference between a DoS and a DDoS attack, and one defence for each.',
    minutes: 5,
    questions: [
      q.single('A DDoS attack differs from DoS because it…', ['Uses many systems at once', 'Steals passwords', 'Encrypts files', 'Targets printers only'], 0),
      q.tf('Botnets are often used to launch DDoS attacks.', true),
      q.single('Which service can absorb large DDoS attacks for a website?', ['A DDoS protection/CDN service', 'A USB drive', 'A local antivirus', 'A KVM switch'], 0),
    ],
  },
  'STiRgWoRtI4': {
    try: 'Write how an on-path (man-in-the-middle) attack works on public Wi-Fi and two ways to protect against it.',
    minutes: 5,
    questions: [
      q.single('An attacker secretly relays and reads traffic between two parties. This is…', ['On-path attack', 'DoS', 'Brute force', 'Spoofed MAC'], 0),
      q.single('Which helps protect against on-path attacks on public Wi-Fi?', ['A VPN and HTTPS', 'A bigger screen', 'Turning off antivirus', 'Using HTTP'], 0),
      q.tf('ARP poisoning is a way to perform an on-path attack on a local network.', true),
    ],
  },
  'H3mG-ovnXJc': {
    try: 'Look up a recent zero-day vulnerability in the news and note how long it took the vendor to release a patch.',
    minutes: 5,
    questions: [
      q.single('A zero-day attack exploits…', ['A vulnerability with no patch yet', 'Old malware', 'Weak Wi-Fi only', 'A printer driver'], 0),
      q.tf('Antivirus signatures always detect zero-day attacks.', false, 'Zero-days are new; behaviour-based detection helps.'),
      q.single('What reduces the impact of an unknown zero-day?', ['Defence in depth and least privilege', 'Disabling updates', 'Using admin accounts', 'Turning off the firewall'], 0),
    ],
  },
  'JEBzY5QjYAY': {
    try: 'Check a password you use against haveibeenpwned.com’s Pwned Passwords and switch to a password manager if you don’t use one.',
    minutes: 10,
    questions: [
      q.single('Trying every possible combination is a…', ['Brute-force attack', 'Dictionary attack', 'Phishing attack', 'Rainbow table'], 0),
      q.single('Trying common words and leaked passwords is a…', ['Dictionary attack', 'Brute-force of all combinations', 'Zero-day', 'DoS'], 0),
      q.single('What best defends against password attacks?', ['Long unique passwords and MFA', 'Short passwords', 'Writing passwords on notes', 'Reusing one strong password'], 0),
    ],
  },
  '3cgrALf45zs': {
    try: 'List three warning signs that could indicate an insider threat at work.',
    minutes: 5,
    questions: [
      q.tf('An insider threat comes from someone with legitimate access to the organization.', true),
      q.single('Which control limits what a malicious insider can do?', ['Least privilege', 'Bigger monitors', 'Faster CPUs', 'Open file shares'], 0),
      q.single('Which helps detect an insider copying large amounts of data?', ['DLP and monitoring', 'Disk defragmenting', 'Printer logs only', 'Screen savers'], 0),
    ],
  },
  'yAt4DO8dUNM': {
    try: 'Try the free SQL injection lab on PortSwigger Web Security Academy (sign up free) to see how input changes a query, legally and safely.',
    minutes: 20,
    questions: [
      q.single('What does SQL injection exploit?', ['Unvalidated input inserted into database queries', 'Weak Wi-Fi', 'Open ports', 'Old printers'], 0),
      q.single('What best prevents SQL injection?', ['Parameterized queries and input validation', 'Longer passwords', 'A faster server', 'HTTPS alone'], 0),
      q.tf('The input \' OR 1=1 -- is a classic SQL injection test.', true),
    ],
  },
  'BIO49rnHCQM': {
    try: 'Read OWASP’s page on cross-site scripting and write how output encoding stops it.',
    minutes: 10,
    questions: [
      q.single('Cross-site scripting (XSS) injects…', ['Malicious script into pages other users view', 'SQL into databases', 'Packets into routers', 'Malware into BIOS'], 0),
      q.single('Which defence stops XSS?', ['Encoding output and validating input', 'Disabling Wi-Fi', 'Using RAID', 'Changing DNS'], 0),
      q.tf('XSS runs in the victim’s browser.', true),
    ],
  },
  '8HoIOlYk82g': {
    try: 'Write the steps your organization should use to verify a request to change a supplier’s bank details.',
    minutes: 5,
    questions: [
      q.single('An attacker uses a compromised executive mailbox to request an urgent wire transfer. This is…', ['Business email compromise', 'DoS', 'Ransomware', 'XSS'], 0),
      q.single('Best defence against fake payment requests?', ['Verify by calling a known number', 'Reply to the email', 'Pay quickly', 'Forward to colleagues'], 0),
      q.tf('BEC often uses urgency and authority to pressure staff.', true),
    ],
  },
  'iw3aytkhi_I': {
    try: 'Read about a famous supply chain attack (e.g. SolarWinds) and write how the attacker got in and who was affected.',
    minutes: 10,
    questions: [
      q.single('A supply chain attack compromises…', ['A trusted vendor or component to reach its customers', 'Only physical deliveries', 'Wi-Fi passwords', 'Printers'], 0),
      q.tf('Malicious code hidden in a software update is a supply chain attack.', true),
      q.single('Which reduces supply chain risk?', ['Vetting vendors and verifying software integrity', 'Disabling updates forever', 'Using one admin account', 'Turning off logging'], 0),
    ],
  },
  'bReDIugJDyA': {
    try: 'Check your devices for missing OS updates, unsupported software, and default passwords. Fix one thing you find.',
    minutes: 10,
    questions: [
      q.multi('Which are security vulnerabilities?', ['Unpatched systems', 'End-of-life OS', 'Default passwords', 'Strong MFA'], [0, 1, 2]),
      q.single('Which practice fixes known vulnerabilities?', ['Regular patching', 'Disabling logs', 'Sharing passwords', 'Using admin accounts'], 0),
      q.tf('BYOD devices can introduce vulnerabilities if not managed.', true),
    ],
  },
  'job81SfpQNU': {
    try: 'Write the seven malware removal steps in order from memory, then check them against the video.',
    minutes: 10,
    questions: [
      q.order('Put the malware removal steps in order.', ['Investigate and verify symptoms', 'Quarantine the infected system', 'Disable System Restore (Windows)', 'Remediate: update tools and scan', 'Schedule scans and run updates', 'Re-enable System Restore and create a restore point', 'Educate the end user'], 'CompTIA’s malware removal process.'),
      q.single('Why disable System Restore during malware removal?', ['Restore points may contain the malware', 'It speeds up the PC', 'It is required by law', 'It removes all users'], 0),
      q.tf('Quarantining means disconnecting the infected machine from the network.', true),
    ],
  },
  '6OR_EiHoG8k': {
    try: 'Audit your own computer: strong password, screen lock, disabled guest account, autorun off, updates on. Fix anything missing.',
    minutes: 15,
    questions: [
      q.multi('Which are workstation security best practices?', ['Screen lock on idle', 'Disable autorun/autoplay', 'Use a guest account for admins', 'Change default passwords'], [0, 1, 3]),
      q.single('Which encrypts data on a lost laptop?', ['Full-disk encryption', 'A screen saver', 'A firewall', 'A backup'], 0),
      q.tf('Password expiry and complexity rules can be enforced with Group Policy.', true),
    ],
  },
  'WNWFV4r_6Wk': {
    try: 'On your phone, check screen lock, biometric unlock, encryption status, remote find/wipe and app permissions.',
    minutes: 10,
    questions: [
      q.single('Which feature erases a lost phone remotely?', ['Remote wipe', 'Screen rotation', 'Airplane mode', 'Hotspot'], 0),
      q.single('Which protects a phone if someone tries many wrong passcodes?', ['Failed-attempt lockout or wipe', 'Larger screen', 'Bluetooth', 'Dark mode'], 0),
      q.tf('Installing apps only from official stores reduces malware risk.', true),
    ],
  },
  'VCQpo2pas1o': {
    try: 'Write a data destruction plan for old office drives: which method for SSDs, HDDs and paper, and what certificate you would keep.',
    minutes: 5,
    questions: [
      q.single('Which method physically destroys a drive?', ['Shredding', 'Quick format', 'Deleting files', 'Emptying the recycle bin'], 0),
      q.single('Which removes data from a magnetic hard drive using strong magnetism?', ['Degaussing', 'Formatting', 'Defragmenting', 'Encrypting'], 0),
      q.tf('A certificate of destruction proves data was destroyed by a third party.', true),
    ],
  },
  'pq_CKhYYYVQ': {
    try: 'Harden your home router: change the admin password, update firmware, disable WPS and remote admin, and set WPA3/WPA2 with a strong passphrase.',
    minutes: 15,
    questions: [
      q.multi('Which make a SOHO router more secure?', ['Change default admin password', 'Update firmware', 'Disable WPS', 'Enable UPnP for everything'], [0, 1, 2]),
      q.single('Which feature lets you reach a home server from the internet on a specific port?', ['Port forwarding', 'DHCP', 'MAC filtering', 'SSID broadcast'], 0),
      q.tf('Changing the default SSID name and password is good practice.', true),
    ],
  },
  'aIcO1ZMj92U': {
    try: 'In your browser, review installed extensions, saved passwords, pop-up blocking and certificate details for an HTTPS site.',
    minutes: 15,
    questions: [
      q.single('A browser warns a site’s certificate isn’t trusted. What should a user do?', ['Not continue and report it', 'Ignore it', 'Save the password', 'Disable HTTPS'], 0),
      q.single('Which browser item can be malicious if installed from untrusted sources?', ['Extensions', 'Bookmarks', 'History', 'Tabs'], 0),
      q.tf('Private/incognito browsing hides activity from your employer’s network.', false, 'It only stops local history from being saved.'),
    ],
  },
  'qIenQsBAg2U': {
    try: 'Practise recovery tools in a VM: boot into Safe Mode, then open the Windows Recovery Environment and find System Restore and Startup Repair.',
    minutes: 20,
    questions: [
      q.single('Windows crashes with a blue screen after a new driver. What should you try first?', ['Boot into Safe Mode and roll back the driver', 'Replace the motherboard', 'Format the drive', 'Change the wallpaper'], 0),
      q.single('Windows is very slow to boot. Where do you look first?', ['Startup apps and services', 'The printer queue', 'Screen resolution', 'Mouse settings'], 0),
      q.single('Which tool undoes recent system changes without touching personal files?', ['System Restore', 'Disk Cleanup', 'Format', 'Defrag'], 0),
    ],
  },
  'F5NxaV7t6Bc': {
    try: 'Write what you would try, in order, for a phone app that keeps crashing: force close, update, clear cache, reinstall, restart, OS update.',
    minutes: 10,
    questions: [
      q.single('A mobile app keeps crashing. What do you try first?', ['Force-close and reopen it, then update it', 'Factory reset immediately', 'Replace the battery', 'Remove the SIM'], 0),
      q.single('A phone’s battery drains fast after an update. What should you check?', ['Battery usage by app', 'The SIM tray', 'Screen protector', 'Case colour'], 0),
      q.tf('A factory reset should be a last resort because it erases data.', true),
    ],
  },
  '_nsBbRwyNMo': {
    try: 'List the signs of a compromised phone: unexpected data use, unknown apps, pop-ups, high battery use, and what you would do about each.',
    minutes: 10,
    questions: [
      q.single('A phone suddenly uses lots of data and shows unknown apps. What is likely?', ['Malware', 'A bad screen', 'Low storage', 'Old case'], 0),
      q.single('Which increases risk on Android phones?', ['Sideloading apps from unknown sources', 'Using the Play Store', 'Updating the OS', 'Using a PIN'], 0),
      q.tf('Jailbroken or rooted phones bypass built-in security controls.', true),
    ],
  },
  'OCLOLvwgdMY': {
    try: 'Write what each symptom suggests: browser redirects, fake antivirus pop-ups, disabled security tools, unexpected file renames.',
    minutes: 10,
    questions: [
      q.single('A browser keeps redirecting to unwanted sites. What is likely?', ['Malware or a malicious extension', 'A failing monitor', 'Low RAM', 'Wrong time zone'], 0),
      q.single('Files suddenly have strange extensions and won’t open. This suggests…', ['Ransomware', 'A bad keyboard', 'Low battery', 'DNS issue'], 0),
      q.tf('Fake antivirus pop-ups asking for payment are a sign of malware (scareware).', true),
    ],
  },
  'EzjHn6vvrsI': {
    try: 'Write a ticket for a real problem you’ve had: user, contact, category, priority, description, steps taken, and resolution.',
    minutes: 10,
    questions: [
      q.multi('What should a good support ticket include?', ['A clear description of the problem', 'Steps already taken', 'The user’s password', 'Priority/severity'], [0, 1, 3]),
      q.single('When should a ticket be escalated?', ['When it’s beyond your knowledge or authority', 'Never', 'Always immediately', 'Only on Fridays'], 0),
      q.tf('Documenting the resolution helps others solve the same problem later.', true),
    ],
  },
  'aYp60Y9_bbg': {
    try: 'Make a simple asset inventory for your devices: type, make/model, serial number, owner, purchase date, warranty end.',
    minutes: 10,
    questions: [
      q.single('What tracks an organization’s hardware and software?', ['Asset management / inventory', 'DNS', 'A firewall', 'RAID'], 0),
      q.tf('Asset tags help identify and track equipment.', true),
      q.single('Which helps know when hardware needs replacing?', ['Tracking warranty and lifecycle dates', 'Desktop wallpaper', 'Printer colour', 'Wi-Fi name'], 0),
    ],
  },
  'LVNSo06uPqM': {
    try: 'Find or draft an acceptable use policy (AUP) for a small office and list three rules it should contain.',
    minutes: 10,
    questions: [
      q.single('Which document tells users what they can and can’t do with company IT?', ['Acceptable use policy', 'Network diagram', 'SLA', 'Invoice'], 0),
      q.single('Which document sets agreed service levels with a customer?', ['SLA', 'AUP', 'NDA', 'MSDS'], 0),
      q.tf('A knowledge base article helps users and technicians solve common problems.', true),
    ],
  },
  'AhcQlR73Bo4': {
    try: 'Write a change request for updating all office PCs to a new Windows version: purpose, scope, risk, rollback plan and schedule.',
    minutes: 15,
    questions: [
      q.multi('What should a change request include?', ['Rollback plan', 'Risk analysis', 'Scope and purpose', 'The CEO’s password'], [0, 1, 2]),
      q.single('Who usually approves significant changes?', ['A change advisory board', 'The first user who asks', 'Nobody', 'An outside vendor only'], 0),
      q.tf('Testing a change in a sandbox before production reduces risk.', true),
    ],
  },
  'xJc7-KM-Fsk': {
    try: 'Set up an automatic backup of your important files (File History, Time Machine or a cloud tool). Then test restoring one file.',
    minutes: 20,
    questions: [
      q.single('The 3-2-1 backup rule means…', ['3 copies, 2 media types, 1 off-site', '3 servers, 2 users, 1 admin', '3 days, 2 weeks, 1 month', '3 disks in RAID 2'], 0),
      q.single('Which backup copies only files changed since the last full backup and is cumulative?', ['Differential', 'Incremental', 'Full', 'Synthetic only'], 0),
      q.tf('A backup you haven’t tested restoring may not work.', true),
    ],
  },
  'sDlVVU3oAlA': {
    try: 'Before opening any computer, practise the routine: unplug it, touch grounded metal or wear an ESD strap, and handle parts by the edges.',
    minutes: 5,
    questions: [
      q.single('What prevents electrostatic discharge damage to components?', ['ESD strap and mat', 'Rubber gloves only', 'Carpet', 'Wool clothes'], 0),
      q.tf('Components should be kept in anti-static bags when not installed.', true),
      q.single('Which environment increases ESD risk?', ['Low humidity', 'High humidity', 'Cold rooms only', 'Bright light'], 0),
    ],
  },
  'JZ5Ht_wzyt8': {
    try: 'Find the safety data sheet (SDS) for a cleaning product or toner online and note its hazards and disposal instructions.',
    minutes: 5,
    questions: [
      q.single('Which document explains how to handle and dispose of a chemical safely?', ['Safety data sheet (SDS)', 'AUP', 'SLA', 'Change request'], 0),
      q.single('How should you lift a heavy server or printer?', ['With your legs, back straight, and get help if needed', 'Bend at the waist', 'Twist while lifting', 'Lift quickly'], 0),
      q.tf('You should never open a power supply because it holds dangerous charge.', true),
    ],
  },
  'FqWHM4Sws1M': {
    try: 'Find how your local council recycles electronics and batteries, and where you would take old laptops and toner.',
    minutes: 5,
    questions: [
      q.single('How should old batteries and toner be disposed of?', ['According to local regulations / recycling', 'In general waste', 'Burned', 'Buried'], 0),
      q.single('Which protects equipment from power sags and short outages?', ['UPS', 'Surge strip only', 'KVM', 'Patch panel'], 0),
      q.tf('Server rooms need temperature and humidity control.', true),
    ],
  },
  'jKhIYQioCE8': {
    try: 'Write what you would do if you found illegal content on a user’s computer: who to notify, what not to touch, and how to preserve evidence.',
    minutes: 10,
    questions: [
      q.single('What records who handled evidence and when?', ['Chain of custody', 'SLA', 'AUP', 'Asset tag'], 0),
      q.single('You find prohibited content on a work PC. What first?', ['Follow policy and report to the right people', 'Delete it', 'Tell everyone', 'Ignore it'], 0),
      q.tf('Evidence should be preserved, not changed, during an investigation.', true),
    ],
  },
  'FnRB3yS_Qxo': {
    try: 'Check the licence type of three programs you use (open source, freeware, personal, commercial, subscription).',
    minutes: 10,
    questions: [
      q.single('Which data must be protected under privacy rules?', ['PII such as names and ID numbers', 'Public press releases', 'Office wallpaper', 'Printer models'], 0),
      q.single('A licence for one person on many devices is…', ['A per-user licence', 'A site licence for any company', 'Open source', 'A EULA violation'], 0),
      q.tf('Using unlicensed commercial software can expose the company to legal risk.', true),
    ],
  },
  '8kKg8RJHAFQ': {
    try: 'Write three things you’d do to show professionalism when visiting a customer: dress, punctuality, respecting their space and data.',
    minutes: 5,
    questions: [
      q.single('A customer is upset about a slow fix. What should you do?', ['Stay calm, listen and set expectations', 'Argue', 'Walk away', 'Blame another team'], 0),
      q.tf('You should avoid looking at confidential documents on a customer’s desk.', true),
      q.single('You’ll be late for an appointment. What should you do?', ['Contact the customer and let them know', 'Say nothing', 'Cancel without notice', 'Send a colleague silently'], 0),
    ],
  },
  '1mIkDOfjd_I': {
    try: 'Explain a technical problem you solved to a non-technical friend without jargon. Ask them to repeat it back.',
    minutes: 5,
    questions: [
      q.multi('Which are good communication practices with users?', ['Active listening', 'Avoiding jargon', 'Interrupting', 'Clarifying the problem'], [0, 1, 3]),
      q.single('After fixing an issue, what should you do?', ['Confirm with the user it’s resolved', 'Leave immediately', 'Close the ticket without telling them', 'Reboot again'], 0),
      q.tf('Taking personal calls while with a customer is unprofessional.', true),
    ],
  },
  'nJKUP1twjbY': {
    try: 'Write a one-line script in PowerShell (Get-Process | Sort-Object CPU -Descending | Select-Object -First 5) and a bash equivalent (ps aux --sort=-%cpu | head -6).',
    minutes: 15,
    questions: [
      q.match('Match each file extension to its scripting language.', [['.ps1', 'PowerShell'], ['.sh', 'Bash'], ['.py', 'Python'], ['.bat', 'Windows batch']], 'Extensions are tested.'),
      q.single('Which language is built into Windows for automation?', ['PowerShell', 'Swift', 'Kotlin', 'COBOL'], 0),
      q.single('Which extension is JavaScript?', ['.js', '.vbs', '.ps1', '.sh'], 0, '.vbs is VBScript.'),
    ],
  },
  'YTi7jALWueg': {
    try: 'Write (don’t run on important machines) a short script idea that would map a network drive or restart a service, and list one risk of running untested scripts.',
    minutes: 10,
    questions: [
      q.multi('Good uses of scripting include…', ['Basic automation', 'Restarting services', 'Remapping network drives', 'Bypassing security controls'], [0, 1, 2]),
      q.single('Which is a risk of running untested scripts?', ['Unintended changes or malware', 'Faster computers', 'Better graphics', 'Lower power use'], 0),
      q.tf('Scripts can install updates and applications automatically.', true),
    ],
  },
  'B-xa0hjmuAs': {
    try: 'Compare RDP, SSH, VPN and remote support tools: what each is for and its main security risk.',
    minutes: 10,
    questions: [
      q.match('Match each remote access tool to its port or use.', [['RDP', 'TCP 3389'], ['SSH', 'TCP 22'], ['VNC', 'Remote desktop for many OSs'], ['VPN', 'Encrypted network tunnel']]),
      q.single('Which is the most secure way to manage a Linux server remotely?', ['SSH with keys', 'Telnet', 'FTP', 'HTTP'], 0),
      q.tf('Exposing RDP directly to the internet is a common attack target.', true, 'Use a VPN or gateway instead.'),
    ],
  },
  'oofb6ROU7LM': {
    try: 'Check your organization’s (or a known company’s) AI use policy. List what data you would never paste into a public AI tool.',
    minutes: 10,
    questions: [
      q.single('Why shouldn’t you paste customer data into a public AI chatbot?', ['It may be stored or used outside your control', 'It makes the AI slower', 'It changes your IP', 'It’s always illegal'], 0),
      q.single('An AI tool gives a confident but wrong answer. This is called…', ['A hallucination', 'Encryption', 'Latency', 'Phishing'], 0),
      q.tf('AI outputs should be checked by a person before being relied on.', true),
    ],
  },
};
