import { q } from '../../src/lib/content/plan';

// CompTIA A+ Core 1 (220-1201): a Try task and quick-check questions per video, keyed by
// YouTube id. Videos: ./videos/a-plus-core-1.json (Professor Messer's free course).

export default {
  'AIfIA7hEgrw': {
    try: 'Download the official 220-1201 exam objectives PDF from comptia.org and highlight the five domains and their weightings.',
    minutes: 10,
    questions: [
      q.single('How many exams must you pass to earn CompTIA A+?', ['One', 'Two', 'Three', 'Four'], 1, 'A+ needs both Core 1 (220-1201) and Core 2 (220-1202).'),
      q.tf('Performance-based questions ask you to complete a task, not just pick an answer.', true, 'PBQs are simulations or drag-and-drop tasks and usually appear first.'),
      q.single('Which is the best guide to what can appear on the exam?', ['A forum post', 'The official exam objectives', 'Last year’s practice test', 'The vendor’s marketing page'], 1, 'Every exam question maps to an objective in the official list.'),
    ],
  },
  'zODZ0i-Iark': {
    try: 'Look up the service manual for your own laptop (or any popular model) and note which parts are user-replaceable: RAM, storage, battery, keyboard.',
    minutes: 10,
    questions: [
      q.single('A laptop has M.2 slots. What is most likely to go in one?', ['A DIMM memory module', 'An SSD', 'A 3.5" hard drive', 'A PCIe x16 graphics card'], 1, 'M.2 slots usually hold NVMe or SATA SSDs, and sometimes Wi-Fi cards.'),
      q.single('Which memory form factor is used in most laptops?', ['DIMM', 'SO-DIMM', 'SIMM', 'RIMM'], 1, 'SO-DIMM (small outline DIMM) is the laptop form factor.'),
      q.tf('Before replacing a laptop battery or other internal part, you should disconnect power and remove the battery where possible.', true, 'Working on a powered device risks shorts and injury.'),
    ],
  },
  'Iis2-_89YvQ': {
    try: 'Pair a phone with another device over Bluetooth, then turn on the phone’s hotspot and connect a laptop to it. Note the steps for each.',
    minutes: 10,
    questions: [
      q.single('Which technology lets a phone pay at a card terminal by tapping?', ['Bluetooth', 'NFC', 'Wi-Fi Direct', 'Infrared'], 1, 'Near-field communication works over a few centimetres, ideal for tap-to-pay.'),
      q.single('Sharing a phone’s mobile data with a laptop over Wi-Fi is called…', ['Pairing', 'Tethering or hotspot', 'Docking', 'Mirroring'], 1, 'A mobile hotspot shares the cellular connection with other devices.'),
      q.tf('Bluetooth devices usually need to be paired before they can communicate.', true, 'Pairing exchanges keys and is often confirmed with a PIN.'),
    ],
  },
  '14iM8lLBS0c': {
    try: 'List the accessories you use with your phone or laptop and, for each, the connection it uses (USB-C, Bluetooth, Lightning, dock).',
    minutes: 5,
    questions: [
      q.single('Which accessory turns a laptop into a full desk setup with monitors and wired network through one connection?', ['Stylus', 'Docking station or port replicator', 'Touch pad', 'Webcam'], 1, 'Docks and port replicators expose many ports through one cable or connector.'),
      q.single('A user wants to sign documents by hand on a tablet. What should you recommend?', ['A trackpoint', 'A stylus', 'A smart card reader', 'A drawing pad driver'], 1, 'A stylus allows precise handwriting and drawing on touchscreens.'),
      q.tf('A headset can connect to a phone wirelessly over Bluetooth.', true, 'Bluetooth headsets and speakers are common mobile accessories.'),
    ],
  },
  '1LADZLBV3vo': {
    try: 'On your phone, find where it shows the cellular network type (4G/5G), toggle airplane mode, and check whether location uses GPS.',
    minutes: 5,
    questions: [
      q.single('Which technology lets a phone find its location from satellites?', ['NFC', 'GPS', 'Bluetooth', 'Wi-Fi Direct'], 1, 'GPS uses satellite timing signals to work out position.'),
      q.single('Airplane mode does what?', ['Turns off all wireless radios (some can be re-enabled)', 'Only turns off Wi-Fi', 'Only blocks apps', 'Turns off the screen'], 0, 'Airplane mode disables cellular, Wi-Fi and Bluetooth; Wi-Fi and Bluetooth can be turned back on.'),
      q.tf('A preferred roaming list (PRL) update helps a phone choose which cellular networks to use.', true, 'PRL updates tell CDMA phones which towers and networks to prefer.'),
    ],
  },
  'NhGi9M4JP7g': {
    try: 'On a phone, find the settings for a work profile or device management. Write down three policies an employer might enforce through MDM.',
    minutes: 10,
    questions: [
      q.single('What does mobile device management (MDM) let an organization do?', ['Build mobile apps', 'Centrally enforce policies like passcodes and remote wipe', 'Increase cellular speed', 'Unlock carrier-locked phones'], 1, 'MDM manages settings, apps and security on many devices.'),
      q.single('Employees using their own phones for work is called…', ['COPE', 'BYOD', 'VDI', 'MAM only'], 1, 'Bring your own device; MDM can separate work and personal data.'),
      q.tf('Remote wipe can erase a lost device so its data can’t be read.', true, 'Remote wipe is a key MDM feature for lost or stolen devices.'),
    ],
  },
  'RRFjKXxYJdM': {
    try: 'Run ipconfig /all (Windows) or ip addr (Linux/macOS: ifconfig). Note your IP address, subnet mask, default gateway and DNS servers.',
    minutes: 10,
    questions: [
      q.single('Which protocol guarantees delivery with acknowledgements and retransmissions?', ['UDP', 'TCP', 'ICMP', 'ARP'], 1, 'TCP is connection-oriented and reliable; UDP is connectionless.'),
      q.single('Video streaming and DNS lookups commonly use which transport for speed?', ['TCP', 'UDP', 'SMB', 'HTTPS'], 1, 'UDP has no handshake or retransmission, so it’s lighter and faster.'),
      q.tf('A port number identifies which application or service on a device should receive the data.', true, 'IP gets data to the device; the port gets it to the right service.'),
    ],
  },
  '_qGlbfZ44hg': {
    try: 'Make flashcards for these ports and memorise them: 20/21, 22, 23, 25, 53, 67/68, 80, 110, 137–139, 143, 389, 443, 445, 3389.',
    minutes: 15,
    questions: [
      q.match('Match each service to its port.', [['SSH', '22'], ['DNS', '53'], ['HTTPS', '443'], ['RDP', '3389']], 'Ports are some of the most tested facts on the exam.'),
      q.num('Which TCP port does SMB use directly over TCP?', 445, 0, 'SMB runs on TCP 445; older NetBIOS uses 137–139.'),
      q.single('Which port does LDAP use?', ['143', '389', '110', '25'], 1, '389 is LDAP; 143 IMAP, 110 POP3, 25 SMTP.'),
    ],
  },
  'aTuaEk5hnAs': {
    try: 'Use your phone or laptop Wi-Fi settings (or a free Wi-Fi analyser app) to see which networks use 2.4 GHz, 5 GHz or 6 GHz and which Wi-Fi standard they report.',
    minutes: 10,
    questions: [
      q.single('Which Wi-Fi generation adds the 6 GHz band?', ['Wi-Fi 4 (802.11n)', 'Wi-Fi 5 (802.11ac)', 'Wi-Fi 6E', 'Wi-Fi 3 (802.11g)'], 2, 'Wi-Fi 6E extends 802.11ax into 6 GHz; Wi-Fi 7 also uses it.'),
      q.tf('The 2.4 GHz band has better range through walls than 5 GHz but usually less speed.', true, 'Lower frequencies travel further and penetrate better.'),
      q.single('RFID is commonly used for…', ['Long-range internet', 'Inventory tags and access badges', 'Satellite navigation', 'Wired backbones'], 1, 'Radio-frequency identification reads tags at short range.'),
    ],
  },
  'Z-9mkqi2ELI': {
    try: 'Draw a diagram of a small office with a file server, print server, DHCP and DNS server, mail server and proxy. Label what each one does.',
    minutes: 15,
    questions: [
      q.single('Which server automatically gives devices an IP address?', ['DNS', 'DHCP', 'Proxy', 'Syslog'], 1, 'DHCP leases IP configuration to clients.'),
      q.single('Which server collects log messages from many devices?', ['Syslog server', 'File server', 'Web server', 'Print server'], 0, 'Syslog centralises logs for monitoring and troubleshooting.'),
      q.single('What does AAA stand for?', ['Access, Audit, Alert', 'Authentication, Authorization, Accounting', 'Admin, Application, Account', 'Authorize, Approve, Allow'], 1, 'AAA servers (like RADIUS) prove identity, grant access and log use.'),
    ],
  },
  'lAHqO9sDVy4': {
    try: 'Run nslookup -type=MX gmail.com and nslookup -type=TXT google.com. Identify the MX and SPF records in the output.',
    minutes: 10,
    questions: [
      q.match('Match each DNS record to what it holds.', [['A', 'An IPv4 address'], ['AAAA', 'An IPv6 address'], ['MX', 'The mail server for a domain'], ['CNAME', 'An alias for another name']], 'Record types are commonly tested.'),
      q.single('Which TXT-based record lists the servers allowed to send email for a domain?', ['DKIM', 'SPF', 'DMARC', 'PTR'], 1, 'SPF lists permitted senders; DKIM signs mail; DMARC sets the policy.'),
      q.tf('DMARC tells receiving mail servers what to do with mail that fails SPF or DKIM checks.', true, 'DMARC policy can be none, quarantine or reject.'),
    ],
  },
  'HwUqCZFx6wk': {
    try: 'Run ipconfig /release then ipconfig /renew (Windows) and watch your address renew. Note the lease times with ipconfig /all.',
    minutes: 10,
    questions: [
      q.order('Put the DHCP process in order.', ['Discover', 'Offer', 'Request', 'Acknowledge'], 'Remember DORA.'),
      q.single('An address the DHCP server always gives to the same device is a…', ['Scope', 'Reservation', 'Exclusion', 'Lease'], 1, 'Reservations tie an IP to a MAC address.'),
      q.single('A client shows 169.254.10.20. What does that mean?', ['It has a valid public address', 'It couldn’t reach a DHCP server (APIPA)', 'It’s using IPv6', 'It’s a loopback address'], 1, 'APIPA (169.254.0.0/16) is self-assigned when DHCP fails.'),
    ],
  },
  'Z1wPgxsx4GI': {
    try: 'If your router supports VLANs or a guest network, find that setting and note how it separates traffic. Otherwise, explain in a paragraph how a VPN protects remote workers.',
    minutes: 10,
    questions: [
      q.single('What does a VLAN do?', ['Encrypts traffic over the internet', 'Splits one physical switch into separate logical networks', 'Speeds up Wi-Fi', 'Assigns IP addresses'], 1, 'VLANs segment broadcast domains on the same hardware.'),
      q.single('Which connects a remote user securely to the office network over the internet?', ['VLAN', 'VPN', 'DMZ', 'NAT'], 1, 'A VPN creates an encrypted tunnel.'),
      q.tf('Devices in different VLANs need a router or layer 3 switch to talk to each other.', true, 'VLANs are separate networks, so traffic between them must be routed.'),
    ],
  },
  '0hd6_bx0ydo': {
    try: 'Identify each box in your home network (modem, router, switch, access point, ONT) and write down which layer of the network each one works at.',
    minutes: 10,
    questions: [
      q.single('Which device forwards frames using MAC addresses?', ['Hub', 'Switch', 'Router', 'Modem'], 1, 'Switches learn MAC addresses; routers use IP addresses.'),
      q.single('Which device connects different IP networks together?', ['Switch', 'Router', 'Patch panel', 'Repeater'], 1, 'Routers forward packets between networks.'),
      q.single('What does PoE provide?', ['Encryption', 'Power and data over one Ethernet cable', 'Faster Wi-Fi', 'Fibre conversion'], 1, 'Power over Ethernet runs devices like access points and cameras.'),
    ],
  },
  'yubEz-ZEVwY': {
    try: 'Classify these addresses as private, public, loopback or APIPA: 10.4.1.1, 172.20.5.5, 192.168.0.10, 8.8.8.8, 127.0.0.1, 169.254.3.3.',
    minutes: 10,
    questions: [
      q.single('Which is a private (RFC 1918) IPv4 address?', ['172.16.4.2', '8.8.4.4', '172.32.0.1', '11.0.0.1'], 0, 'Private ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16.'),
      q.num('How many bits long is an IPv6 address?', 128, 0, 'IPv4 is 32 bits; IPv6 is 128 bits.'),
      q.single('What is ::1 in IPv6?', ['The default gateway', 'The loopback address', 'A multicast address', 'A link-local address'], 1, '::1 is IPv6 loopback, like 127.0.0.1.'),
    ],
  },
  'nU5ko6cQWmc': {
    try: 'On a test machine or VM, set a static IP, mask, gateway and DNS, confirm with ping, then switch back to DHCP.',
    minutes: 15,
    questions: [
      q.single('What does the default gateway do?', ['Translates names to addresses', 'Sends traffic to other networks', 'Assigns addresses', 'Stores files'], 1, 'Traffic for a different network goes to the gateway, usually the router.'),
      q.single('Which device usually needs a static IP address?', ['A visitor’s phone', 'A network printer or server', 'A laptop that moves around', 'A tablet'], 1, 'Servers and printers need predictable addresses.'),
      q.tf('A subnet mask shows which part of an IP address is the network and which part is the host.', true, 'For example, 255.255.255.0 means the first three octets are the network.'),
    ],
  },
  'iN2QnGFl06E': {
    try: 'Find out what connection type your home or office uses (fibre, cable, DSL, satellite, 4G/5G fixed wireless) and its advertised download and upload speeds.',
    minutes: 5,
    questions: [
      q.single('Which connection uses the existing telephone line?', ['Cable', 'DSL', 'Fibre', 'Satellite'], 1, 'DSL runs over copper phone lines.'),
      q.single('Which connection typically has the highest latency?', ['Fibre', 'Cable', 'Geostationary satellite', 'DSL'], 2, 'Signals travel to a satellite ~36,000 km up and back.'),
      q.tf('A wireless ISP (WISP) delivers internet over radio links to fixed antennas.', true, 'WISPs are common where cables don’t reach.'),
    ],
  },
  'PBEXIMeqRNY': {
    try: 'Give a real-world example of each network type: PAN, LAN, WLAN, MAN, WAN and SAN.',
    minutes: 5,
    questions: [
      q.match('Match each network type to an example.', [['PAN', 'Bluetooth earbuds and a phone'], ['LAN', 'An office floor'], ['MAN', 'A city-wide network'], ['WAN', 'Offices in different countries']], 'Network types are defined by scale.'),
      q.single('A SAN is used for…', ['Block storage for servers', 'Wi-Fi for guests', 'Phone calls', 'Printing'], 0, 'A storage area network presents storage to servers as if local.'),
      q.tf('A WLAN is a local area network that uses wireless connections.', true, 'WLAN = wireless LAN.'),
    ],
  },
  'CHQQgjtrhYU': {
    try: 'Learn each tool’s job: crimper, cable stripper, cable tester, toner probe, punchdown tool, loopback plug, Wi-Fi analyser. If you have a spare cable, practise stripping and identifying the eight wires.',
    minutes: 10,
    questions: [
      q.single('Which tool traces a cable from one end of a building to the other?', ['Crimper', 'Toner probe', 'Loopback plug', 'Multimeter'], 1, 'A tone generator puts a signal on the wire; the probe finds it.'),
      q.single('Which tool connects wires to a patch panel or keystone jack?', ['Punchdown tool', 'Crimper', 'Cable tester', 'Spectrum analyser'], 0, 'Punchdown tools seat wires into IDC connectors.'),
      q.single('Which tool attaches an RJ45 connector to a cable?', ['Crimper', 'Punchdown tool', 'Toner', 'Tap'], 0, 'Crimpers press the connector’s pins into the wires.'),
    ],
  },
  'xOyialyd4JU': {
    try: 'Find out whether the screens you use are LCD (IPS, TN or VA), OLED or mini-LED, using the model number.',
    minutes: 5,
    questions: [
      q.single('Which display technology lights each pixel itself, with no backlight?', ['IPS LCD', 'TN LCD', 'OLED', 'VA LCD'], 2, 'OLED pixels emit their own light, giving true blacks.'),
      q.single('Which LCD panel type has the best viewing angles and colour?', ['TN', 'IPS', 'CRT', 'VA'], 1, 'IPS is known for colour and angles; TN for speed.'),
      q.tf('In a laptop, the Wi-Fi antennas are often in the lid around the display.', true, 'The lid is the highest point, which helps reception.'),
    ],
  },
  'fmrWo8swzyU': {
    try: 'Check your display settings: note the resolution, refresh rate and scaling. Work out its pixel density if you know the screen size.',
    minutes: 5,
    questions: [
      q.single('What does refresh rate measure?', ['Pixels per inch', 'How many times per second the image updates', 'Colour depth', 'Brightness'], 1, 'Refresh rate is in hertz, e.g. 60 Hz or 144 Hz.'),
      q.single('Running a display below its native resolution usually makes the image…', ['Sharper', 'Blurry', 'Brighter', 'Faster'], 1, 'The panel has to scale the image to its physical pixels.'),
      q.single('What is measured in nits?', ['Brightness', 'Response time', 'Colour gamut', 'Size'], 0, 'One nit is one candela per square metre.'),
    ],
  },
  '29X5Ho3m2KU': {
    try: 'Read the printing on an Ethernet cable’s jacket and identify its category (Cat 5e/6/6a), whether it’s UTP or STP, and whether it’s plenum-rated.',
    minutes: 5,
    questions: [
      q.single('What is the maximum standard length of a copper Ethernet run (Cat 5e/6)?', ['55 m', '100 m', '185 m', '500 m'], 1, 'Copper twisted pair is rated to 100 metres.'),
      q.single('Where must plenum-rated cable be used?', ['Outdoors', 'In air-handling spaces above ceilings', 'In patch cables only', 'Underground'], 1, 'Plenum jackets produce fewer toxic fumes in a fire.'),
      q.single('Which cable is best near strong electrical interference?', ['UTP', 'STP (shielded)', 'Coax only', 'Any'], 1, 'Shielding protects against EMI.'),
    ],
  },
  '1w42VC2_JYo': {
    try: 'Write out the T568A and T568B pin colour orders from memory, then check against the video. Repeat until you get both right.',
    minutes: 10,
    questions: [
      q.order('Put the T568B colours in pin order 1–4.', ['White/orange', 'Orange', 'White/green', 'Blue'], 'T568B: W-O, O, W-G, B, W-B, G, W-Br, Br.'),
      q.single('A cable with T568A on one end and T568B on the other is a…', ['Straight-through cable', 'Crossover cable', 'Rollover cable', 'Coax cable'], 1, 'Mixing the standards swaps transmit and receive pairs.'),
      q.tf('Most new installations use the same standard (usually T568B) on both ends.', true, 'Same standard on both ends = straight-through.'),
    ],
  },
  'poQdq2APqic': {
    try: 'List one advantage and one disadvantage of fibre compared with copper, and when you would choose single-mode over multimode.',
    minutes: 5,
    questions: [
      q.single('Which fibre type is used for the longest distances?', ['Multimode', 'Single-mode', 'Plastic optical fibre', 'Cat 6a'], 1, 'Single-mode uses a narrow core and lasers to go many kilometres.'),
      q.tf('Fibre is immune to electromagnetic interference.', true, 'It carries light, not electricity.'),
      q.single('Multimode fibre usually uses which light source?', ['Laser only', 'LED or VCSEL', 'Sunlight', 'Infrared remote'], 1, 'Multimode often uses LEDs/VCSELs over shorter runs.'),
    ],
  },
  'JGuVE-3CvT4': {
    try: 'Look at the USB ports on your devices and identify each one: USB-A, USB-C, micro-USB, Thunderbolt. Check the speed rating where it’s labelled.',
    minutes: 5,
    questions: [
      q.single('Which connector is reversible and supports USB 3.x, USB4 and Thunderbolt?', ['USB-A', 'USB-C', 'Micro-USB', 'Mini-USB'], 1, 'USB-C is the modern reversible connector.'),
      q.single('What is the main difference of Thunderbolt over standard USB?', ['It only charges devices', 'Higher speeds and can carry PCIe and DisplayPort', 'It is wireless', 'It uses fibre only'], 1, 'Thunderbolt tunnels PCIe and DisplayPort at high speed.'),
      q.tf('A serial (DB9) cable is still found on some network equipment for console access.', true, 'Console cables let you configure switches and routers directly.'),
    ],
  },
  'FK1b4stA2hk': {
    try: 'Identify the video outputs on a computer and monitor you have access to (HDMI, DisplayPort, DVI, VGA, USB-C) and which carry audio.',
    minutes: 5,
    questions: [
      q.single('Which video connector is analogue only?', ['HDMI', 'DisplayPort', 'VGA', 'USB-C'], 2, 'VGA (DB-15) is analogue.'),
      q.multi('Which connections can carry both video and audio?', ['HDMI', 'DisplayPort', 'VGA', 'DVI-D'], [0, 1], 'HDMI and DisplayPort carry audio; VGA and DVI don’t.'),
      q.tf('DisplayPort can be carried over USB-C (DisplayPort Alternate Mode).', true, 'Many laptops output video through USB-C.'),
    ],
  },
  'YM4pig2XYCo': {
    try: 'Open a desktop’s side panel (powered off and unplugged) or look up photos, and identify SATA data, SATA power and any M.2 or eSATA connections.',
    minutes: 5,
    questions: [
      q.single('Which interface connects most internal 2.5" SSDs and hard drives?', ['SATA', 'VGA', 'Molex only', 'SCSI parallel'], 0, 'SATA carries data; a separate SATA power connector powers it.'),
      q.single('eSATA is used for…', ['External SATA drives', 'Ethernet', 'Video', 'Audio'], 0, 'External SATA is a version of SATA for outside the case.'),
      q.tf('SCSI and SAS are interfaces commonly used for server storage.', true, 'SAS (Serial Attached SCSI) is common in servers.'),
    ],
  },
  '3GkSvmeuhe8': {
    try: 'List three adapters you might need in an office (e.g. USB-C to HDMI, DVI to HDMI, USB to Ethernet) and the problem each one solves.',
    minutes: 5,
    questions: [
      q.single('A laptop only has USB-C and needs a wired network. What do you use?', ['USB-C to Ethernet adapter', 'HDMI cable', 'Crossover cable', 'KVM switch'], 0, 'USB network adapters add an RJ45 port.'),
      q.tf('A KVM switch lets one keyboard, mouse and monitor control several computers.', true, 'KVM = keyboard, video, mouse.'),
      q.single('Converting a DisplayPort output to an HDMI monitor needs…', ['A DisplayPort to HDMI adapter or cable', 'A VGA splitter', 'A USB hub', 'A crossover cable'], 0, 'Passive or active adapters convert between video standards.'),
    ],
  },
  'VO8C3lrWlVU': {
    try: 'Identify which connectors you have seen: RJ45, RJ11, F-type (coax), BNC, punchdown block. Write where each is used.',
    minutes: 5,
    questions: [
      q.single('Which connector is used for Ethernet?', ['RJ11', 'RJ45', 'F-type', 'BNC'], 1, 'RJ45 is 8-pin Ethernet; RJ11 is telephone.'),
      q.single('Which connector screws onto cable modems and TV coax?', ['F-type', 'RJ45', 'LC', 'SC'], 0, 'F-type connectors are used with coaxial cable.'),
      q.tf('RJ11 connectors are mainly used for telephone lines and DSL.', true, 'RJ11 is smaller than RJ45.'),
    ],
  },
  'Qxbp-c23cYY': {
    try: 'Make a table of fibre connectors (LC, SC, ST) with one identifying feature of each.',
    minutes: 5,
    questions: [
      q.single('Which small fibre connector has a latching clip like RJ45?', ['LC', 'ST', 'SC', 'F-type'], 0, 'LC = "little connector", common in modern switches.'),
      q.single('Which fibre connector uses a twist-and-lock bayonet?', ['ST', 'LC', 'SC', 'RJ45'], 0, 'ST = "stick and twist".'),
      q.tf('SC is a square push-pull fibre connector.', true, 'SC is square and snaps in.'),
    ],
  },
  'JylKt1N6o0I': {
    try: 'Check how much RAM your computer has and its speed (Task Manager → Performance → Memory on Windows). Note how many slots are used.',
    minutes: 5,
    questions: [
      q.single('What happens to data in RAM when power is lost?', ['It’s saved', 'It’s lost (RAM is volatile)', 'It moves to the CPU', 'It goes to the cloud'], 1, 'RAM is volatile memory.'),
      q.single('What is virtual memory?', ['Extra RAM chips', 'Disk space used when RAM is full', 'Cloud storage', 'GPU memory'], 1, 'The page file lets the OS use disk as overflow RAM, much more slowly.'),
      q.tf('Laptops normally use SO-DIMMs and desktops normally use DIMMs.', true, 'Different physical sizes for different devices.'),
    ],
  },
  'HU-qsVtpnM0': {
    try: 'Look up your motherboard or laptop’s memory support: DDR generation, maximum capacity, and whether it runs dual-channel.',
    minutes: 10,
    questions: [
      q.single('Which type of memory detects and corrects errors and is common in servers?', ['Non-ECC', 'ECC', 'SODIMM', 'Virtual'], 1, 'ECC (error-correcting code) memory fixes single-bit errors.'),
      q.tf('DDR4 and DDR5 modules are physically keyed differently and not interchangeable.', true, 'The notch position prevents inserting the wrong generation.'),
      q.single('Installing matched modules in paired slots to double bandwidth is called…', ['Single-channel', 'Dual-channel', 'Parity', 'Buffered'], 1, 'Multi-channel memory runs modules in parallel.'),
    ],
  },
  'UfLNl8-c9VM': {
    try: 'Check what storage your computer uses (HDD, SATA SSD or NVMe SSD) in Device Manager or Disk Management, and its capacity.',
    minutes: 10,
    questions: [
      q.single('Which storage is fastest?', ['5400 rpm HDD', 'SATA SSD', 'NVMe SSD on PCIe', 'USB flash drive'], 2, 'NVMe uses PCIe lanes and avoids SATA’s limits.'),
      q.single('Which is a mechanical drive with spinning platters?', ['SSD', 'HDD', 'eMMC', 'NVMe'], 1, 'Hard disk drives use platters and read/write heads.'),
      q.tf('SSDs have no moving parts, making them more shock-resistant than HDDs.', true, 'Flash memory has no platters or heads.'),
    ],
  },
  '5E16qftlfRY': {
    try: 'For four 2 TB disks, work out the usable space and how many disks can fail for RAID 0, 1 (two disks), 5 and 10.',
    minutes: 15,
    questions: [
      q.single('Which RAID level stripes data with no redundancy?', ['RAID 0', 'RAID 1', 'RAID 5', 'RAID 10'], 0, 'RAID 0 is fast but one disk failure loses everything.'),
      q.single('Which RAID level mirrors data across two disks?', ['RAID 0', 'RAID 1', 'RAID 5', 'RAID 6'], 1, 'RAID 1 keeps an identical copy on each disk.'),
      q.num('What is the minimum number of disks for RAID 5?', 3, 0, 'RAID 5 stripes with parity across at least three disks.'),
    ],
  },
  'dbxM_LFMXpw': {
    try: 'Compare ATX, microATX and mini-ITX: list the size and how many expansion slots each typically has.',
    minutes: 5,
    questions: [
      q.single('Which is the smallest of these motherboard form factors?', ['ATX', 'microATX', 'mini-ITX', 'E-ATX'], 2, 'mini-ITX is 17 × 17 cm.'),
      q.tf('A motherboard’s form factor must match the case it goes in.', true, 'Mounting holes and slot positions are standardised per form factor.'),
      q.single('Which form factor is the most common full-size desktop board?', ['ATX', 'ITX', 'BTX', 'NLX'], 0, 'ATX is the standard full-size form factor.'),
    ],
  },
  'QvPX1XJwJH8': {
    try: 'Identify the PCIe slots on a motherboard photo or manual: x1, x4, x16. Note which one a graphics card goes in.',
    minutes: 5,
    questions: [
      q.single('Which slot usually holds a graphics card?', ['PCIe x1', 'PCIe x16', 'M.2 E-key', 'PCI'], 1, 'GPUs need the most lanes.'),
      q.tf('A PCIe x1 card can usually fit and work in an x16 slot.', true, 'Smaller cards work in larger slots.'),
      q.single('What does the "x" number in PCIe x4 mean?', ['Version', 'Number of lanes', 'Watts', 'Card length in inches'], 1, 'More lanes, more bandwidth.'),
    ],
  },
  'UjJwjjwa6Q0': {
    try: 'Using a motherboard manual (any model online), find the 24-pin power, CPU power, front-panel header, SATA ports and fan headers.',
    minutes: 10,
    questions: [
      q.single('What connects the case power button and LEDs to the motherboard?', ['Front-panel header', 'SATA port', 'PCIe slot', 'ATX 24-pin'], 0, 'The front-panel header has pins for power switch, reset and LEDs.'),
      q.single('Which connector provides the main power to an ATX motherboard?', ['4-pin Molex', '24-pin ATX', '6-pin PCIe', 'SATA power'], 1, 'The 24-pin connector is the main board power.'),
      q.tf('Fan headers on the motherboard can let the system control fan speed.', true, '4-pin headers support PWM speed control.'),
    ],
  },
  'O5wA53NYv1M': {
    try: 'Pick a CPU and use the maker’s site to find which socket and chipset it needs.',
    minutes: 5,
    questions: [
      q.tf('An Intel CPU will fit in an AMD motherboard socket if the pin count matches.', false, 'CPUs must match the board’s socket and chipset; Intel and AMD sockets are different.'),
      q.single('Which must you check first when upgrading a CPU?', ['Monitor size', 'Motherboard socket and chipset support', 'Keyboard layout', 'Case colour'], 1, 'The socket and BIOS must support the CPU.'),
      q.single('Which processor family is often found in phones and newer laptops?', ['x86 only', 'ARM', 'Itanium', 'PowerPC'], 1, 'ARM is power-efficient and common in mobile.'),
    ],
  },
  'TgUxAM8rjyg': {
    try: 'Restart a computer and find the key to enter its BIOS/UEFI setup (often F2, Del or F10). Look around without changing anything.',
    minutes: 10,
    questions: [
      q.single('What does the BIOS/UEFI do first when a computer turns on?', ['Runs Windows Update', 'Runs the POST and finds a boot device', 'Opens the browser', 'Installs drivers'], 1, 'Firmware tests hardware (POST) and starts the boot loader.'),
      q.single('Which is the modern replacement for legacy BIOS?', ['UEFI', 'CMOS', 'POST', 'MBR'], 0, 'UEFI supports Secure Boot and GPT disks.'),
      q.tf('Firmware settings are stored so they survive a reboot.', true, 'They’re kept in NVRAM/CMOS.'),
    ],
  },
  'QfJkU0vD3gg': {
    try: 'In BIOS/UEFI setup (look, don’t change), find the boot order, Secure Boot status, virtualization support (VT-x/AMD-V) and the setup password option.',
    minutes: 10,
    questions: [
      q.single('What does Secure Boot prevent?', ['Overheating', 'Unsigned or tampered boot loaders from starting', 'Slow boot times', 'Disk failure'], 1, 'Secure Boot only runs boot software signed by trusted keys.'),
      q.single('A VM won’t start and says virtualization is disabled. Where do you fix it?', ['In the BIOS/UEFI settings', 'In Device Manager', 'In the browser', 'In Disk Management'], 0, 'Enable VT-x/AMD-V in firmware.'),
      q.tf('A BIOS/UEFI password can stop people changing firmware settings or booting from USB.', true, 'Supervisor and boot passwords protect the firmware.'),
    ],
  },
  'qLSV_lpM_Mk': {
    try: 'On Windows, run tpm.msc to see if a TPM is present and its version. Note why BitLocker depends on it.',
    minutes: 5,
    questions: [
      q.single('What does a TPM store securely on a computer?', ['Browser history', 'Cryptographic keys', 'Printer drivers', 'Backups'], 1, 'The Trusted Platform Module protects keys, e.g. for BitLocker.'),
      q.single('Which device manages keys for many servers and is often a separate appliance?', ['TPM', 'HSM', 'NIC', 'KVM'], 1, 'A hardware security module serves keys at scale.'),
      q.tf('Windows 11 requires TPM 2.0.', true, 'TPM 2.0 is a Windows 11 requirement.'),
    ],
  },
  '4RPVQQd2sOM': {
    try: 'Look up your CPU in Task Manager or System Information: number of cores, threads, and whether it supports virtualization.',
    minutes: 5,
    questions: [
      q.single('What lets one physical core run two threads at once?', ['Overclocking', 'Hyper-threading / SMT', 'Caching', 'Virtual memory'], 1, 'Simultaneous multithreading presents two logical processors per core.'),
      q.tf('A 64-bit operating system can address more than 4 GB of RAM.', true, '32-bit systems are limited to about 4 GB.'),
      q.single('Which CPU feature must be enabled to run virtual machines well?', ['Virtualization support (VT-x/AMD-V)', 'Integrated GPU', 'Turbo boost', 'L1 cache'], 0, 'Hardware virtualization extensions are needed by hypervisors.'),
    ],
  },
  'KtipbKR8rqo': {
    try: 'Name an expansion card for each need: more video outputs, faster networking, better audio, capturing a camera feed.',
    minutes: 5,
    questions: [
      q.single('Which card would add a 10 Gb Ethernet port?', ['Sound card', 'NIC', 'Capture card', 'Graphics card'], 1, 'A network interface card adds network ports.'),
      q.single('Which card records video from an external camera or console?', ['Capture card', 'NIC', 'RAID controller', 'TPM'], 0, 'Capture cards digitise video input.'),
      q.tf('After installing a new expansion card, you may need to install its driver.', true, 'Drivers let the OS use the hardware.'),
    ],
  },
  'qC306MGytR8': {
    try: 'Check the CPU temperature with a free tool (e.g. HWMonitor) at idle and under load. Note the cooler type in your machine.',
    minutes: 10,
    questions: [
      q.single('What sits between the CPU and the heat sink to transfer heat?', ['Thermal paste', 'Glue', 'Foam', 'Electrical tape'], 0, 'Thermal paste fills tiny gaps for better heat transfer.'),
      q.single('Which cooling uses pumps, tubes and a radiator?', ['Passive heat sink', 'Liquid cooling', 'Case fan only', 'Fanless'], 1, 'Liquid cooling moves heat to a radiator.'),
      q.tf('A computer that shuts down under load may be overheating.', true, 'Thermal protection shuts the system down to prevent damage.'),
    ],
  },
  'gK0SYCnWoIM': {
    try: 'Find the power supply wattage in your desktop (or a spec sheet) and use an online PSU calculator to estimate the wattage your parts need.',
    minutes: 10,
    questions: [
      q.single('Which voltage do most modern computer components rely on most?', ['+3.3 V', '+5 V', '+12 V', '−12 V'], 2, 'The +12 V rail powers CPUs and GPUs.'),
      q.tf('A modular power supply lets you connect only the cables you need.', true, 'Fewer unused cables improves airflow.'),
      q.single('A server keeps running when one of two power supplies fails. These are…', ['Modular PSUs', 'Redundant PSUs', 'External PSUs', 'Surge protectors'], 1, 'Redundant power supplies remove a single point of failure.'),
    ],
  },
  'ctAOL7WyEUY': {
    try: 'On a computer, add a printer (a real one or Microsoft Print to PDF), print a test page, and find where to set default paper size and duplex.',
    minutes: 10,
    questions: [
      q.single('A shared office printer needs to be easy to find for every user. What should it have?', ['A static IP or DHCP reservation', 'A USB-only connection', 'No driver', 'A random IP each day'], 0, 'Network printers need predictable addresses.'),
      q.single('What should you do to stop sensitive pages being left in the printer tray?', ['Disable duplex', 'Use secured print / badge release', 'Use a bigger tray', 'Turn off the printer'], 1, 'Print release holds jobs until the user authenticates.'),
      q.tf('A multifunction device can print, scan, copy and sometimes fax.', true, 'MFDs combine several functions.'),
    ],
  },
  'hp2DfL6KxwA': {
    try: 'Write the seven laser printing steps in order from memory: processing, charging, exposing, developing, transferring, fusing, cleaning.',
    minutes: 10,
    questions: [
      q.order('Put the laser printing process in order.', ['Processing', 'Charging', 'Exposing', 'Developing', 'Transferring', 'Fusing', 'Cleaning'], 'This order is commonly tested.'),
      q.single('Which part melts toner onto the paper?', ['Fuser', 'Drum', 'Transfer roller', 'Pickup roller'], 0, 'The fuser uses heat and pressure.'),
      q.single('Toner smears and rubs off the page. What is likely faulty?', ['Fuser', 'Network cable', 'Driver', 'Paper tray size'], 0, 'If toner isn’t fused, it smears.'),
    ],
  },
  'qIIiTWNnWuQ': {
    try: 'Compare inkjet and laser printers for a small office: cost per page, speed and print quality.',
    minutes: 5,
    questions: [
      q.single('An inkjet printer applies ink using…', ['A heated fuser', 'A print head with nozzles', 'Impact pins', 'Heat-sensitive paper'], 1, 'Inkjet print heads spray tiny droplets.'),
      q.tf('Inkjet printers move the print head side to side on a carriage and belt.', true, 'The carriage moves across the page while paper feeds through.'),
      q.single('Which part is replaced most often in an inkjet printer?', ['Ink cartridges', 'Fuser', 'Drum', 'Ribbon'], 0, 'Ink cartridges are the main consumable.'),
    ],
  },
  'yRjKpaQQw1k': {
    try: 'If you have an inkjet, run its head-cleaning and alignment utility. Otherwise, find these steps in an inkjet manual online.',
    minutes: 5,
    questions: [
      q.single('An inkjet prints streaks and missing lines. What should you try first?', ['Replace the fuser', 'Clean the print heads', 'Change the IP address', 'Replace the drum'], 1, 'Clogged nozzles cause streaks.'),
      q.tf('Calibrating an inkjet printer aligns the print heads.', true, 'Calibration fixes misaligned colours and lines.'),
      q.single('Where does excess ink from cleaning go?', ['Duplexer', 'Ink waste pad or tank', 'Fuser', 'Pickup roller'], 1, 'Waste ink pads may need replacing.'),
    ],
  },
  'izk4zbSkUTg': {
    try: 'Find a thermal receipt and hold it near a heat source briefly (carefully): note how heat darkens the paper.',
    minutes: 5,
    questions: [
      q.single('Where are thermal printers commonly used?', ['Photo printing', 'Receipts and labels', 'Posters', 'Multi-part forms'], 1, 'Thermal printers are fast and quiet for receipts.'),
      q.tf('Direct thermal printers use special heat-sensitive paper.', true, 'The paper darkens where the print head heats it.'),
      q.single('Which part of a thermal printer creates the image?', ['Heating element', 'Laser', 'Ink nozzles', 'Ribbon pins'], 0, 'The heating element heats the paper.'),
    ],
  },
  'emKON9CAjks': {
    try: 'Write a three-step maintenance routine for a thermal printer at a shop counter.',
    minutes: 5,
    questions: [
      q.single('What do you clean a thermal print head with?', ['Water', 'Isopropyl alcohol', 'Bleach', 'Compressed air only'], 1, 'IPA removes residue without leaving moisture.'),
      q.tf('Thermal paper should be kept away from heat and sunlight.', true, 'Heat darkens unused thermal paper.'),
      q.single('Faded receipts most likely mean…', ['A dirty heating element or wrong paper', 'Low ink', 'A broken fuser', 'Wrong IP'], 0, 'Thermal printers use no ink.'),
    ],
  },
  'wkSlTGmPlWU': {
    try: 'List two places where impact (dot matrix) printers are still used today, and why.',
    minutes: 5,
    questions: [
      q.single('Why are impact printers still used for some forms?', ['Best photo quality', 'They print through multi-part carbon forms', 'They are silent', 'They need no paper'], 1, 'Pins strike through layers to make copies.'),
      q.single('What does an impact printer strike to make marks?', ['An inked ribbon', 'A toner drum', 'Thermal paper', 'An ink nozzle'], 0, 'Print-head pins strike an ink ribbon.'),
      q.tf('Tractor-feed paper has holes along the edges.', true, 'Sprockets pull continuous paper through.'),
    ],
  },
  'KCLqKxFsEOM': {
    try: 'Write the three parts you would check or replace on an impact printer: ribbon, print head, paper feed.',
    minutes: 5,
    questions: [
      q.single('Faint characters on an impact printer usually mean…', ['Replace the ribbon', 'Replace the fuser', 'Clean the laser', 'Update DNS'], 0, 'A worn ribbon prints lightly.'),
      q.tf('An impact printer’s print head can get very hot.', true, 'Let it cool before touching.'),
      q.single('A missing horizontal line through all characters suggests…', ['A failed pin on the print head', 'Low toner', 'Wet paper', 'Wrong driver'], 0, 'Each pin prints one row of dots.'),
    ],
  },
  'xXOIdDWUNGU': {
    try: 'Install VirtualBox (free) and create a virtual machine. You don’t need to install an OS yet; just note the RAM, CPU and disk settings.',
    minutes: 20,
    questions: [
      q.single('A hypervisor that runs directly on hardware with no host OS is…', ['Type 1', 'Type 2', 'Container', 'Emulator'], 0, 'Type 1 (bare metal) examples: ESXi, Hyper-V Server.'),
      q.single('VirtualBox running on Windows is an example of a…', ['Type 1 hypervisor', 'Type 2 hypervisor', 'Container', 'Cloud service'], 1, 'Type 2 hypervisors run on top of a host OS.'),
      q.tf('A sandbox VM is useful for testing suspicious software safely.', true, 'VMs isolate tests from the host.'),
    ],
  },
  'wPB_C7hOY-8': {
    try: 'Install a Linux distribution (e.g. Ubuntu) in your VirtualBox VM and take a snapshot. Change something, then roll back to the snapshot.',
    minutes: 30,
    questions: [
      q.single('What does a VM snapshot let you do?', ['Back up the cloud', 'Roll the VM back to an earlier state', 'Speed up the host', 'Share the screen'], 1, 'Snapshots capture the VM state for quick rollback.'),
      q.single('How do containers differ from VMs?', ['Containers include a full OS each', 'Containers share the host OS kernel', 'Containers need Type 1 hypervisors', 'They are the same'], 1, 'Containers are lighter because they share the kernel.'),
      q.single('What is VDI?', ['Virtual desktops hosted centrally and delivered to users', 'A disk format', 'A video connector', 'A type of RAID'], 0, 'Virtual desktop infrastructure runs desktops in the data centre.'),
    ],
  },
  'KZxAY5ssUxc': {
    try: 'Classify these as SaaS, PaaS or IaaS: Gmail, Microsoft 365, AWS EC2, Azure App Service, Google Drive, a rented virtual server.',
    minutes: 10,
    questions: [
      q.match('Match each cloud model to an example.', [['SaaS', 'Web-based email'], ['PaaS', 'A platform to deploy your app code'], ['IaaS', 'Rented virtual servers']], 'You manage more of the stack as you move from SaaS to IaaS.'),
      q.single('A cloud used by several organizations with shared needs (e.g. hospitals) is a…', ['Public cloud', 'Private cloud', 'Community cloud', 'Hybrid cloud'], 2, 'Community clouds serve a specific group.'),
      q.tf('A hybrid cloud combines private and public cloud resources.', true, 'Hybrid mixes on-premises/private with public cloud.'),
    ],
  },
  'XzNnFbY0dMQ': {
    try: 'Explain in a sentence each: elasticity, metered utilization, high availability, file synchronization. Give a real example of each.',
    minutes: 10,
    questions: [
      q.single('Automatically adding servers during a traffic spike and removing them after is…', ['Elasticity', 'Redundancy', 'Tenancy', 'Metering'], 0, 'Elastic resources scale up and down with demand.'),
      q.single('Paying only for the compute hours you used is…', ['Metered utilization', 'Shared tenancy', 'Rapid elasticity', 'Availability'], 0, 'Cloud billing measures use.'),
      q.tf('Multitenancy means several customers share the same underlying cloud infrastructure.', true, 'Their data and workloads stay logically separated.'),
    ],
  },
  'HgeURynWn_w': {
    try: 'Write the CompTIA troubleshooting method’s six steps from memory, then use them on a real problem you’ve had with a computer.',
    minutes: 15,
    questions: [
      q.order('Put the troubleshooting steps in order.', ['Identify the problem', 'Establish a theory of probable cause', 'Test the theory', 'Establish a plan of action and implement it', 'Verify full system functionality', 'Document findings'], 'The CompTIA method is heavily tested.'),
      q.single('A computer beeps and won’t show anything on screen at power-on. What gives the best clue?', ['The POST beep code', 'The browser cache', 'The event log', 'The printer queue'], 0, 'Beep codes indicate which hardware failed POST.'),
      q.single('A system randomly reboots and smells of burning. What do you do first?', ['Keep testing it', 'Power it off and check the power supply', 'Reinstall the OS', 'Update drivers'], 1, 'Burning smells often mean a failing PSU or component; safety first.'),
    ],
  },
  'aVIuyHCNPCE': {
    try: 'Run a drive health check: on Windows, open a command prompt and run wmic diskdrive get status, or use CrystalDiskInfo to read SMART data.',
    minutes: 10,
    questions: [
      q.single('A hard drive makes loud clicking sounds. This most likely means…', ['A failing drive', 'A full disk', 'A virus', 'A loose monitor cable'], 0, 'Clicking often means mechanical failure; back up now.'),
      q.single('What monitors a drive’s health and predicts failures?', ['SMART', 'RAID', 'TPM', 'POST'], 0, 'SMART reports reallocated sectors, errors and more.'),
      q.single('A RAID 5 array shows "degraded". What should you do?', ['Ignore it', 'Replace the failed disk and rebuild', 'Delete the array', 'Turn off the server permanently'], 1, 'A degraded array has lost redundancy until rebuilt.'),
    ],
  },
  'KXZu72i1eX8': {
    try: 'With an external monitor, practise switching display modes (Windows+P), then check the cable and input source as you would if it showed no signal.',
    minutes: 10,
    questions: [
      q.single('A monitor shows "No signal". What do you check first?', ['The cable and selected input source', 'The RAM', 'The CPU fan', 'The OS licence'], 0, 'Start with the simplest physical causes.'),
      q.single('A few pixels are always lit or always black. These are…', ['Dead or stuck pixels', 'Screen burn-in', 'A driver issue', 'Low refresh rate'], 0, 'Defective pixels are a hardware fault.'),
      q.single('A faint image remains after changing what is displayed (OLED). This is…', ['Burn-in', 'Flicker', 'Dim backlight', 'Incorrect resolution'], 0, 'Static images can burn in on OLED.'),
    ],
  },
  'huQwiY4kiko': {
    try: 'On a phone, check battery health and which apps use the most battery. Write two steps you would take for a phone that’s overheating.',
    minutes: 10,
    questions: [
      q.single('A laptop battery has swollen and lifts the touchpad. What do you do?', ['Keep using it', 'Stop using it and replace it safely', 'Charge it fully', 'Press it flat'], 1, 'Swollen lithium batteries are a fire risk.'),
      q.single('A phone touchscreen doesn’t respond accurately. What can help?', ['Recalibrate or clean the screen, remove the case', 'Change the Wi-Fi password', 'Replace the SIM', 'Increase brightness'], 0, 'Dirt, screen protectors and calibration affect touch.'),
      q.tf('A cracked screen protector can make touch input unreliable.', true, 'Damaged layers interfere with the digitizer.'),
    ],
  },
  'VBDS_kOHhVk': {
    try: 'Troubleshoot your own connection: ping your gateway, ping 8.8.8.8, then ping google.com. Explain what it means if only the last one fails.',
    minutes: 15,
    questions: [
      q.single('You can ping 8.8.8.8 but not google.com. What is the likely problem?', ['DNS', 'The cable', 'The NIC driver', 'The default gateway'], 0, 'Reaching IPs but not names points to DNS.'),
      q.single('Two devices report the same IP address. This is…', ['An IP conflict', 'A DNS loop', 'A VLAN mismatch', 'Latency'], 0, 'Duplicate IPs cause intermittent connectivity.'),
      q.single('Wi-Fi drops in one room only. What do you check first?', ['Signal strength and interference there', 'The printer', 'Windows activation', 'Disk space'], 0, 'Distance, walls and interference weaken wireless signals.'),
    ],
  },
  '_BhO_nYod0o': {
    try: 'Open the print queue (Windows: Settings → Printers) and practise cancelling a stuck job. Then find how to restart the Print Spooler service.',
    minutes: 10,
    questions: [
      q.single('Jobs are stuck in the queue and nothing prints. What do you restart?', ['The Print Spooler service', 'DHCP', 'The monitor', 'The router'], 0, 'Restarting the spooler clears stuck jobs.'),
      q.single('Printouts show garbled random characters. What is likely wrong?', ['The printer driver', 'The toner colour', 'The paper size', 'The fuser temperature'], 0, 'A wrong or corrupt driver sends the wrong language.'),
      q.single('A laser printer prints a repeating mark at regular intervals down the page. What is likely damaged?', ['A roller or the drum', 'The network cable', 'The PC RAM', 'The paper tray'], 0, 'Repeating marks match the circumference of a roller or drum.'),
    ],
  },
};
