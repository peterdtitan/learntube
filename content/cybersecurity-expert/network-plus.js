import { q } from '../../src/lib/content/plan';

// CompTIA Network+ (N10-009): a Try task and quick-check questions per video, keyed by
// YouTube id. Videos: ./videos/network-plus.json (Professor Messer's free course).
// Many Try tasks use Cisco Packet Tracer, a free network simulator (netacad.com).

export default {
  'k7IOn3TiUc8': {
    try: 'Download the official N10-009 exam objectives from comptia.org and install Cisco Packet Tracer (free with a NetAcad account) for the labs ahead.',
    minutes: 20,
    questions: [
      q.single('How many domains does the Network+ N10-009 exam cover?', ['3', '5', '7', '9'], 1, 'Concepts, implementation, operations, security and troubleshooting.'),
      q.tf('CompTIA A+ is required before you can sit Network+.', false, 'It is recommended, not required.'),
      q.single('What should guide your study plan?', ['The official exam objectives', 'Random forum lists', 'Old exam versions', 'Social media'], 0),
    ],
  },
  'AYgXr1dynKU': {
    try: 'Write the seven OSI layers with one example protocol or device at each layer. Learn a mnemonic, e.g. "Please Do Not Throw Sausage Pizza Away".',
    minutes: 15,
    questions: [
      q.order('Put the OSI layers in order from layer 1 to layer 7.', ['Physical', 'Data link', 'Network', 'Transport', 'Session', 'Presentation', 'Application'], 'Layer 1 at the bottom, 7 at the top.'),
      q.single('At which OSI layer do routers operate?', ['Layer 2', 'Layer 3', 'Layer 4', 'Layer 7'], 1, 'Routers forward by IP address, layer 3.'),
      q.single('TCP and UDP work at which layer?', ['Network', 'Transport', 'Session', 'Data link'], 1),
    ],
  },
  'iqjj4ZSPV08': {
    try: 'In Packet Tracer, build a network with a router, a switch, an access point and two PCs. Note which device works at which OSI layer.',
    minutes: 20,
    questions: [
      q.single('Which device inspects traffic and blocks it based on rules?', ['Firewall', 'Switch', 'Repeater', 'Hub'], 0),
      q.single('Which device spreads requests across several servers?', ['Load balancer', 'Proxy', 'Modem', 'Bridge'], 0),
      q.single('Which device detects and actively blocks attacks in real time?', ['IPS', 'IDS', 'Hub', 'Patch panel'], 0, 'An IDS only alerts; an IPS can block.'),
    ],
  },
  '9uDpWfMbAdQ': {
    try: 'Look up three network functions in your router’s admin page (e.g. QoS, content filtering, VPN) and note what each is set to.',
    minutes: 10,
    questions: [
      q.single('Which prioritises voice traffic over downloads?', ['QoS', 'NAT', 'DHCP', 'CDN'], 0),
      q.single('What does a content delivery network do?', ['Serves content from servers close to users', 'Assigns IPs', 'Encrypts email', 'Stores logs'], 0),
      q.single('Which function hides internal hosts and filters web requests on their behalf?', ['Proxy server', 'Switch', 'Repeater', 'Media converter'], 0),
    ],
  },
  'HzF7sg6Nx0c': {
    try: 'Sign in to a free cloud console (AWS, Azure or Google Cloud free tier) and find where VPCs/virtual networks, security groups and gateways are configured. Don’t create paid resources.',
    minutes: 15,
    questions: [
      q.single('A private, isolated network inside a public cloud is a…', ['VPC', 'VLAN trunk', 'WAN link', 'DMZ cable'], 0),
      q.single('Which cloud object acts like a stateful firewall for instances?', ['Security group', 'NAT gateway', 'Internet gateway', 'Subnet'], 0),
      q.single('Which lets instances in a private subnet reach the internet without being reachable from it?', ['NAT gateway', 'Internet gateway only', 'VPN', 'Security list'], 0),
    ],
  },
  'wI2x6eGF1Yg': {
    try: 'Classify five services you use as SaaS, PaaS or IaaS, and say whether each is public, private or hybrid cloud.',
    minutes: 5,
    questions: [
      q.match('Match the cloud model to what the customer manages.', [['SaaS', 'Only their data and users'], ['PaaS', 'Their application code'], ['IaaS', 'The OS and everything above it']]),
      q.tf('A hybrid cloud combines on-premises or private cloud with public cloud.', true),
      q.single('Which deployment model is shared by organizations with common requirements?', ['Community', 'Public', 'Private', 'Hybrid'], 0),
    ],
  },
  'ueth6WvFVMU': {
    try: 'Run a packet capture in Wireshark (free) while loading a website. Find a TCP three-way handshake (SYN, SYN-ACK, ACK).',
    minutes: 20,
    questions: [
      q.order('Put the TCP three-way handshake in order.', ['SYN', 'SYN-ACK', 'ACK'], 'This starts every TCP connection.'),
      q.single('Which protocol is connectionless?', ['UDP', 'TCP', 'HTTPS', 'SSH'], 0),
      q.single('An IP packet’s header contains…', ['Source and destination IP addresses', 'Only a MAC address', 'A port number only', 'The file name'], 0),
    ],
  },
  'jX1pobYmZdE': {
    try: 'Make flashcards for the Network+ ports: 20/21, 22, 23, 25, 53, 67/68, 69, 80, 123, 161/162, 389, 443, 445, 587, 636, 1433, 3389, 5060/5061.',
    minutes: 20,
    questions: [
      q.match('Match each protocol to its port.', [['SNMP', '161'], ['NTP', '123'], ['LDAPS', '636'], ['SQL Server', '1433']]),
      q.num('Which port does TFTP use?', 69, 0, 'TFTP uses UDP 69.'),
      q.single('Which ports does SIP use for VoIP signalling?', ['5060/5061', '161/162', '20/21', '67/68'], 0),
    ],
  },
  '5BahWbszVAY': {
    try: 'Look up GRE, IPsec (AH and ESP) and ICMP. Write in one line each what they do.',
    minutes: 10,
    questions: [
      q.single('Which IPsec protocol provides encryption?', ['ESP', 'AH', 'GRE', 'ICMP'], 0, 'AH gives integrity and authentication only.'),
      q.single('Which protocol carries ping messages?', ['ICMP', 'TCP', 'UDP', 'ARP'], 0),
      q.tf('GRE tunnels traffic but does not encrypt it by itself.', true),
    ],
  },
  '9Vx-awO6qfc': {
    try: 'Define unicast, multicast, anycast and broadcast with an everyday example of each.',
    minutes: 5,
    questions: [
      q.single('Sending to every device on a network segment is…', ['Broadcast', 'Unicast', 'Anycast', 'Multicast'], 0),
      q.single('Sending to the nearest of several servers sharing one address is…', ['Anycast', 'Unicast', 'Broadcast', 'Multicast'], 0),
      q.tf('IPv6 doesn’t use broadcast; it uses multicast instead.', true),
    ],
  },
  'NeTwL-040ds': {
    try: 'Use a Wi-Fi analyser app to see which 2.4 GHz channels nearby networks use. Explain why 1, 6 and 11 are recommended.',
    minutes: 10,
    questions: [
      q.single('Which 2.4 GHz channels don’t overlap?', ['1, 6, 11', '1, 2, 3', '3, 7, 13', '2, 5, 8'], 0),
      q.single('Which standard is Wi-Fi 6?', ['802.11ax', '802.11ac', '802.11n', '802.11g'], 0),
      q.tf('Wider channels give more speed but more chance of interference.', true),
    ],
  },
  'BxpRuARS56g': {
    try: 'Match these to their media and speed: 1000BASE-T, 10GBASE-T, 1000BASE-SX, 10GBASE-LR.',
    minutes: 5,
    questions: [
      q.single('What does the "T" in 1000BASE-T mean?', ['Twisted pair copper', 'Fibre', 'Coax', 'Wireless'], 0),
      q.single('10GBASE-LR uses…', ['Long-range single-mode fibre', 'Copper', 'Multimode only', 'Coax'], 0),
      q.single('1000BASE-SX uses…', ['Short-range multimode fibre', 'Twisted pair', 'Single-mode long range', 'Wi-Fi'], 0),
    ],
  },
  'qLsNZSaj35E': {
    try: 'Explain why a data centre might use multimode fibre inside a room but single-mode between buildings.',
    minutes: 5,
    questions: [
      q.single('Which fibre type has a smaller core and goes further?', ['Single-mode', 'Multimode', 'Plastic', 'Coax'], 0),
      q.tf('Fibre isn’t affected by electromagnetic interference.', true),
      q.single('Which is a benefit of fibre over copper?', ['Longer distances and higher bandwidth', 'Cheaper connectors', 'Easier to terminate', 'Carries PoE'], 0),
    ],
  },
  'zoefzxHIfPc': {
    try: 'Compare Cat 5e, Cat 6, Cat 6a and Cat 8: maximum speed and distance for each.',
    minutes: 10,
    questions: [
      q.single('Which category supports 10 Gb/s over the full 100 metres?', ['Cat 5e', 'Cat 6', 'Cat 6a', 'Cat 3'], 2, 'Cat 6 reaches 10 Gb/s only to about 55 m.'),
      q.single('Which cable is used for broadband from a cable ISP?', ['Coax (RG-6)', 'Cat 6', 'Single-mode fibre', 'Rollover'], 0),
      q.tf('Twinaxial (twinax) cable is used for short high-speed links in data centres.', true),
    ],
  },
  '0aMmwkiuT0o': {
    try: 'Look up what an SFP and a QSFP module are, and which speeds each supports.',
    minutes: 5,
    questions: [
      q.single('What plugs into a switch port to add a fibre interface?', ['SFP/SFP+ transceiver', 'RJ11', 'BNC', 'DB9'], 0),
      q.single('Which form factor carries 40 Gb/s or more?', ['QSFP', 'SFP', 'GBIC', 'RJ45'], 0),
      q.tf('A bidirectional (BiDi) transceiver sends and receives on one fibre strand using two wavelengths.', true),
    ],
  },
  'PNoqhs5QvFw': {
    try: 'Make a quick reference: LC, SC, ST, MPO, and the difference between UPC and APC polish.',
    minutes: 5,
    questions: [
      q.single('Which connector holds many fibres in one ferrule?', ['MPO', 'LC', 'ST', 'SC'], 0),
      q.single('Angled physical contact (APC) connectors are usually what colour?', ['Green', 'Blue', 'Black', 'Red'], 0, 'UPC is usually blue.'),
      q.tf('APC and UPC connectors shouldn’t be mated together.', true),
    ],
  },
  'Ca6rzoQm15w': {
    try: 'Identify RJ45, RJ11, F-type and BNC on devices or photos.',
    minutes: 5,
    questions: [
      q.single('Which connector is used with coax for cable modems?', ['F-type', 'RJ45', 'LC', 'MPO'], 0),
      q.single('Which connector is 8P8C?', ['RJ45', 'RJ11', 'BNC', 'SC'], 0),
      q.tf('BNC connectors are used on older coax video and network equipment.', true),
    ],
  },
  '3ARTjvpZCoQ': {
    try: 'Draw star, mesh, hybrid, spine-and-leaf and point-to-point topologies, and give one place each is used.',
    minutes: 10,
    questions: [
      q.single('Which topology connects every device to every other?', ['Full mesh', 'Star', 'Bus', 'Ring'], 0),
      q.single('Most office Ethernet networks use which topology?', ['Star', 'Bus', 'Ring', 'Full mesh'], 0),
      q.single('Which data centre design connects every leaf switch to every spine?', ['Spine and leaf', 'Bus', 'Ring', 'Daisy chain'], 0),
    ],
  },
  'vVEL1LokboE': {
    try: 'Draw a three-tier network (core, distribution, access) and a collapsed core. Label where users, servers and the internet connect.',
    minutes: 10,
    questions: [
      q.order('Order the three-tier layers from users upward.', ['Access', 'Distribution', 'Core'], 'Users connect at access; core is the high-speed backbone.'),
      q.single('Traffic between servers inside a data centre is called…', ['East-west', 'North-south', 'Up-down', 'In-out'], 0),
      q.tf('A collapsed core combines core and distribution layers.', true),
    ],
  },
  '94dcHJfEAIo': {
    try: 'Convert by hand: 192 to binary, 11110000 to decimal, and 172 to binary. Check with a calculator.',
    minutes: 15,
    questions: [
      q.num('What is 11000000 in decimal?', 192, 0),
      q.num('What is 11111000 in decimal?', 248, 0),
      q.num('How many bits are in one IPv4 octet?', 8, 0),
    ],
  },
  'JNNcyZ_VE2A': {
    try: 'For 192.168.10.37/24, write the network address, broadcast address and first and last usable host.',
    minutes: 15,
    questions: [
      q.single('What is the broadcast address of 192.168.10.37/24?', ['192.168.10.0', '192.168.10.255', '192.168.10.254', '192.168.255.255'], 1),
      q.single('Which address is in the CGNAT (shared address) range?', ['100.64.1.1', '10.1.1.1', '192.0.2.1', '169.254.1.1'], 0, '100.64.0.0/10 is used by ISPs for carrier-grade NAT.'),
      q.single('127.0.0.1 is…', ['The loopback address', 'A public address', 'A broadcast address', 'APIPA'], 0),
    ],
  },
  'XVIOtj-Z9m0': {
    try: 'Write the default masks and first-octet ranges of classes A, B and C.',
    minutes: 10,
    questions: [
      q.single('A class B address has which default mask?', ['255.0.0.0', '255.255.0.0', '255.255.255.0', '255.255.255.255'], 1),
      q.single('An address starting with 10 belongs to which class?', ['A', 'B', 'C', 'D'], 0),
      q.single('Class D addresses (224–239) are used for…', ['Multicast', 'Private LANs', 'Loopback', 'Experiments only'], 0),
    ],
  },
  'p5NJ5Jt6oJo': {
    try: 'Convert these masks to CIDR: 255.255.255.0, 255.255.255.192, 255.255.240.0, 255.255.255.252.',
    minutes: 10,
    questions: [
      q.single('255.255.255.192 in CIDR is…', ['/24', '/25', '/26', '/27'], 2),
      q.single('/28 as a dotted mask is…', ['255.255.255.240', '255.255.255.248', '255.255.255.224', '255.255.255.0'], 0),
      q.num('How many bits are set in a /20 mask?', 20, 0),
    ],
  },
  'cYQOMifDlKI': {
    try: 'For a /26, work out how many subnets you get from a /24 and how many usable hosts each has.',
    minutes: 15,
    questions: [
      q.num('How many usable hosts are in a /26?', 62, 0, '2^6 − 2 = 62.'),
      q.num('How many usable hosts are in a /30?', 2, 0, 'Point-to-point links often use /30 (or /31).'),
      q.num('How many /27 subnets fit in one /24?', 8, 0),
    ],
  },
  'P1ROXMLjL04': {
    try: 'Use the magic number method to find the network and broadcast of 172.16.45.100/20. Repeat with three addresses of your own.',
    minutes: 20,
    questions: [
      q.single('What is the network address of 172.16.45.100/20?', ['172.16.32.0', '172.16.40.0', '172.16.45.0', '172.16.0.0'], 0, 'Magic number 16 in the third octet: 32–47.'),
      q.single('What is the broadcast address of 10.1.1.70/26?', ['10.1.1.127', '10.1.1.63', '10.1.1.255', '10.1.1.95'], 0, 'Block size 64: 64–127.'),
      q.num('What is the magic number (block size) for a /27?', 32, 0),
    ],
  },
  'I3LBYMXBhus': {
    try: 'Time yourself: find the subnet, broadcast and host range of 192.168.1.200/29 in under a minute. Do five more.',
    minutes: 20,
    questions: [
      q.single('What is the first usable host of 192.168.1.200/29?', ['192.168.1.201', '192.168.1.200', '192.168.1.193', '192.168.1.199'], 0, 'Block size 8: 200–207.'),
      q.single('What is the last usable host of 192.168.1.200/29?', ['192.168.1.206', '192.168.1.207', '192.168.1.205', '192.168.1.215'], 0),
      q.single('Which mask gives exactly 14 usable hosts?', ['/28', '/27', '/29', '/26'], 0),
    ],
  },
  'A6tPNGEfOzc': {
    try: 'Draw the three SDN planes (management, control, data) and write what each does.',
    minutes: 5,
    questions: [
      q.single('In SDN, which plane decides where traffic should go?', ['Control plane', 'Data plane', 'Management plane', 'Physical plane'], 0),
      q.single('Which plane actually forwards packets?', ['Data plane', 'Control plane', 'Management plane', 'Application plane'], 0),
      q.tf('SD-WAN builds a virtual WAN over multiple connections like broadband and LTE.', true),
    ],
  },
  'eBhqN6d6lRU': {
    try: 'Explain why VXLAN is used in data centres and how many segments it allows compared with VLANs.',
    minutes: 5,
    questions: [
      q.single('VXLAN extends layer 2 networks over…', ['Layer 3 (UDP) networks', 'Serial links', 'Bluetooth', 'Coax'], 0),
      q.single('Why use VXLAN over VLANs in large data centres?', ['Millions of segments versus 4,094', 'It’s older', 'It needs no IP', 'It’s wireless'], 0),
      q.tf('VXLAN wraps Ethernet frames inside UDP packets.', true),
    ],
  },
  'jlMwWL4yalM': {
    try: 'Write three zero trust principles and how each would apply to remote workers at a small company.',
    minutes: 5,
    questions: [
      q.single('Zero trust assumes…', ['No user or device is trusted by default', 'Everything inside the firewall is safe', 'Passwords are enough', 'VPNs aren’t needed'], 0),
      q.single('SASE combines networking and security delivered from…', ['The cloud', 'A local hub', 'A printer', 'A USB key'], 0),
      q.tf('Zero trust checks identity and device health on every access request.', true),
    ],
  },
  'n6jIaKWixF4': {
    try: 'Read a small Terraform or Ansible example online and write what infrastructure it creates. Note how it avoids configuration drift.',
    minutes: 10,
    questions: [
      q.single('Infrastructure as code means…', ['Defining infrastructure in files that can be versioned and reused', 'Writing apps on servers', 'Using spreadsheets', 'Manual setup'], 0),
      q.single('Settings slowly differing from the approved baseline is…', ['Configuration drift', 'Latency', 'Jitter', 'Bleed'], 0),
      q.tf('Storing infrastructure code in source control lets you track and roll back changes.', true),
    ],
  },
  'CpLznUxkzg8': {
    try: 'Shorten 2001:0db8:0000:0000:0000:ff00:0042:8329 to its shortest form. Run ipconfig and find your IPv6 link-local address.',
    minutes: 15,
    questions: [
      q.single('What is the short form of 2001:0db8:0000:0000:0000:ff00:0042:8329?', ['2001:db8::ff00:42:8329', '2001:db8:0:ff00:42:8329', '2001::db8::ff00:42:8329', '2001:db8:ff00:42:8329'], 0, ':: replaces one run of zero groups, once.'),
      q.single('IPv6 link-local addresses start with…', ['fe80::', '2001:', 'ff00::', '::1'], 0),
      q.single('Which lets IPv6 traffic cross an IPv4-only network?', ['Tunnelling (e.g. 6to4)', 'NAT64 only for DNS', 'APIPA', 'VLANs'], 0),
    ],
  },
  '23a6_qexTvs': {
    try: 'In Packet Tracer, connect two routers with a LAN behind each and add static routes so the two LANs can ping each other.',
    minutes: 20,
    questions: [
      q.single('A static route is…', ['Entered manually by an admin', 'Learned from neighbours', 'Created by DHCP', 'Learned from DNS'], 0),
      q.single('The route 0.0.0.0/0 is the…', ['Default route', 'Loopback', 'Broadcast route', 'Multicast route'], 0),
      q.tf('Static routes don’t adapt automatically when a link fails.', true),
    ],
  },
  'YRZxshxI1xs': {
    try: 'Compare RIP, OSPF, EIGRP and BGP: type (distance vector/link state/path vector), where used, and metric.',
    minutes: 10,
    questions: [
      q.single('Which routing protocol is used between ISPs on the internet?', ['BGP', 'OSPF', 'RIP', 'EIGRP'], 0),
      q.single('OSPF is a…', ['Link-state protocol', 'Distance-vector protocol', 'Path-vector protocol', 'Static method'], 0),
      q.tf('Dynamic routing protocols share routes and adapt to failures.', true),
    ],
  },
  'hU9bbmFhKxk': {
    try: 'Look at your computer’s routing table (route print or ip route) and explain each line.',
    minutes: 15,
    questions: [
      q.single('When several routes match, the router chooses the…', ['Most specific (longest prefix)', 'Oldest route', 'Shortest name', 'Random one'], 0),
      q.single('Which value decides which routing source is trusted more?', ['Administrative distance', 'TTL', 'MTU', 'Jitter'], 0),
      q.tf('First hop redundancy protocols like HSRP or VRRP give a backup default gateway.', true),
    ],
  },
  'UILwCNOC5EI': {
    try: 'Explain in your own words how your home router uses PAT so many devices share one public IP.',
    minutes: 5,
    questions: [
      q.single('Many private hosts sharing one public IP using different ports is…', ['PAT (NAT overload)', 'Static NAT', 'DNS', 'DHCP'], 0),
      q.single('Mapping one private address permanently to one public address is…', ['Static NAT', 'PAT', 'Proxy', 'Dynamic routing'], 0),
      q.tf('NAT helps conserve public IPv4 addresses.', true),
    ],
  },
  'ATbzbST_OIw': {
    try: 'In Packet Tracer, create VLAN 10 and VLAN 20 on a switch, assign ports and configure a trunk to a second switch.',
    minutes: 25,
    questions: [
      q.single('Which standard tags VLAN traffic on a trunk?', ['802.1Q', '802.11ac', '802.3af', '802.1X'], 0),
      q.single('Untagged frames on a trunk belong to the…', ['Native VLAN', 'Management VLAN', 'Voice VLAN', 'Default gateway'], 0),
      q.tf('A trunk link carries traffic for many VLANs.', true),
    ],
  },
  'dno_MRp57UQ': {
    try: 'Look up speed, duplex and MTU settings on a switch interface (Packet Tracer show interfaces). Explain jumbo frames.',
    minutes: 10,
    questions: [
      q.single('A port set to full duplex on one side and half on the other causes…', ['Collisions and slow performance', 'Faster speed', 'Better security', 'No effect'], 0),
      q.single('Frames larger than 1500 bytes are called…', ['Jumbo frames', 'Runts', 'Giants only on errors', 'Tags'], 0),
      q.tf('Port mirroring copies traffic to another port for analysis.', true),
    ],
  },
  'Jm0BOz1Ur28': {
    try: 'Build a loop with three switches in Packet Tracer and watch Spanning Tree block one port. Find the root bridge with show spanning-tree.',
    minutes: 20,
    questions: [
      q.single('What does Spanning Tree Protocol prevent?', ['Layer 2 loops', 'IP conflicts', 'DNS failures', 'Weak passwords'], 0),
      q.single('Which STP standard is 802.1D?', ['Original STP', 'Rapid STP', 'VTP', 'LACP'], 0, 'RSTP is 802.1w.'),
      q.tf('A broadcast storm can bring down a switched network with a loop.', true),
    ],
  },
  '_VwpcLiBkAQ': {
    try: 'Compare 2.4, 5 and 6 GHz Wi-Fi: range, speed, interference. Decide which you’d use for a warehouse and a conference room.',
    minutes: 10,
    questions: [
      q.single('Which band has the most non-overlapping channels?', ['6 GHz', '2.4 GHz', '900 MHz', '1 GHz'], 0),
      q.single('Band steering does what?', ['Moves capable clients to 5/6 GHz', 'Blocks old devices', 'Changes SSIDs', 'Encrypts traffic'], 0),
      q.tf('Directional antennas focus signal in one direction.', true),
    ],
  },
  'YEDutqG4C4U': {
    try: 'Plan Wi-Fi for a two-floor office: number of access points, channels, SSIDs and whether to use a wireless controller.',
    minutes: 15,
    questions: [
      q.single('What centrally manages many access points?', ['Wireless LAN controller', 'Modem', 'Hub', 'Patch panel'], 0),
      q.single('Clients moving between APs on the same network without dropping is…', ['Roaming', 'Jitter', 'Bleed', 'Beaconing'], 0),
      q.single('A guest network should be…', ['Separated from the internal network', 'On the same VLAN as servers', 'Open with no isolation', 'Hidden only'], 0),
    ],
  },
  '8ExS_LYAe-M': {
    try: 'Give an example of each wireless network type: ad hoc, infrastructure, mesh and point-to-point.',
    minutes: 5,
    questions: [
      q.single('Devices connecting directly without an access point is…', ['Ad hoc', 'Infrastructure', 'Mesh', 'Point-to-multipoint'], 0),
      q.single('Which wireless network has nodes that relay for each other?', ['Mesh', 'Ad hoc only', 'Point-to-point', 'Infrastructure only'], 0),
      q.tf('A point-to-point wireless link can connect two buildings.', true),
    ],
  },
  'YNcobcHXnnY': {
    try: 'Check which Wi-Fi security your network uses and whether WPA3 is available. Switch if your devices support it.',
    minutes: 5,
    questions: [
      q.single('Which authentication framework do WPA2/3-Enterprise use?', ['802.1X with EAP', 'PSK', 'WEP', 'MAC filtering'], 0),
      q.single('Which replaces the PSK handshake in WPA3-Personal?', ['SAE', 'TKIP', 'WEP', 'WPS'], 0),
      q.tf('A captive portal asks guests to accept terms or sign in before access.', true),
    ],
  },
  '7NLsuBIvVVA': {
    try: 'Draw the path of a cable from a desk jack to the switch: wall jack, horizontal run, patch panel (IDF), patch cable, switch.',
    minutes: 10,
    questions: [
      q.single('Where do horizontal cables from offices usually end?', ['Patch panel in the IDF', 'Each PC', 'The ISP', 'The roof'], 0),
      q.single('The main wiring room for a building is the…', ['MDF', 'IDF', 'DMZ', 'NOC'], 0),
      q.single('Rack space is measured in…', ['Rack units (U)', 'Inches only', 'Watts', 'Ports'], 0),
    ],
  },
  'Ok0XpAzwCVQ': {
    try: 'Work out how long a 1500 VA UPS could run a 300 W load using a vendor runtime calculator. Note why UPS and generator work together.',
    minutes: 10,
    questions: [
      q.single('Which provides power instantly during an outage?', ['UPS', 'Generator', 'PDU', 'Surge strip'], 0, 'Generators take time to start.'),
      q.single('Which distributes power to equipment in a rack?', ['PDU', 'UPS', 'ATS', 'Patch panel'], 0),
      q.tf('PoE+ (802.3at) supplies more power per port than original PoE (802.3af).', true),
    ],
  },
  'v7AIXZi7pyA': {
    try: 'List the environmental controls for a small server room: temperature, humidity, fire suppression and airflow.',
    minutes: 5,
    questions: [
      q.single('Hot aisle / cold aisle arrangement improves…', ['Cooling efficiency', 'Wi-Fi coverage', 'Security', 'Cabling colours'], 0),
      q.single('Very low humidity in a server room increases risk of…', ['Static discharge', 'Corrosion', 'Flooding', 'Dust'], 0),
      q.tf('Water sprinklers can damage IT equipment; data centres often use gas-based suppression.', true),
    ],
  },
  'CEZyq-fBn3w': {
    try: 'Draw a physical and a logical diagram of your home network. Label IP addresses, VLANs (if any) and the rack/room layout.',
    minutes: 15,
    questions: [
      q.single('Which diagram shows IP addressing and how traffic flows?', ['Logical diagram', 'Physical diagram', 'Floor plan', 'Rack diagram'], 0),
      q.single('Which document lists where every cable runs from and to?', ['Cable map / wiring diagram', 'AUP', 'SLA', 'NDA'], 0),
      q.tf('An IP address management (IPAM) tool tracks which addresses are in use.', true),
    ],
  },
  'E8423-hdsHg': {
    try: 'For your router or phone, find its end-of-support date and current firmware version. Decide when it should be replaced.',
    minutes: 5,
    questions: [
      q.single('A device that no longer receives security updates is…', ['End of life / end of support', 'Brand new', 'Under warranty', 'Patched'], 0),
      q.single('Updating device firmware fixes…', ['Bugs and vulnerabilities', 'Cable faults', 'Power outages', 'DNS records'], 0),
      q.tf('Decommissioning includes securely wiping devices before disposal.', true),
    ],
  },
  'cbHcjzlLjuc': {
    try: 'Back up your router configuration (most have an export option). Note what a production config baseline should contain.',
    minutes: 10,
    questions: [
      q.single('An approved, documented configuration to compare against is a…', ['Baseline / golden config', 'Draft', 'Ticket', 'Topology'], 0),
      q.tf('Configuration backups let you restore a device quickly after failure.', true),
      q.single('Who should approve changes to network configuration?', ['Change management', 'Any user', 'Nobody', 'The vendor only'], 0),
    ],
  },
  'We5MkaEJOs0': {
    try: 'Compare SNMP v1, v2c and v3. Write which you’d use on a production network and why.',
    minutes: 10,
    questions: [
      q.single('Which SNMP version adds encryption and authentication?', ['SNMPv3', 'SNMPv1', 'SNMPv2c', 'All versions'], 0),
      q.single('An unsolicited message from a device to the manager is a…', ['Trap', 'Get', 'Walk', 'Set'], 0),
      q.single('The database of SNMP objects is the…', ['MIB', 'OID list only', 'DNS zone', 'CAM table'], 0),
    ],
  },
  'ieqSi5Aicxc': {
    try: 'Open Event Viewer (or /var/log on Linux) and find a warning and an error. Explain what a SIEM would do with logs from 100 devices.',
    minutes: 15,
    questions: [
      q.single('Which collects and correlates logs from many systems?', ['SIEM', 'NAT', 'DHCP', 'CDN'], 0),
      q.single('Which syslog severity is most urgent?', ['0 – Emergency', '7 – Debug', '4 – Warning', '6 – Informational'], 0),
      q.tf('Flow data like NetFlow shows who talked to whom, not the full content.', true),
    ],
  },
  'zIX_SzezCi0': {
    try: 'List what a network monitoring tool should alert on: link down, high utilisation, errors, CPU, failed logins.',
    minutes: 5,
    questions: [
      q.single('Checking that devices are on the network and reachable is…', ['Discovery and availability monitoring', 'Port forwarding', 'Load balancing', 'DNS'], 0),
      q.single('Measuring the normal traffic level to spot anomalies is…', ['Baselining', 'Tunnelling', 'Bonding', 'Mirroring'], 0),
      q.tf('Port mirroring sends a copy of traffic to a monitoring device.', true),
    ],
  },
  'NaXMohP4-vU': {
    try: 'For a small business, define RPO and RTO for email and sales data, and choose cold, warm or hot site recovery.',
    minutes: 15,
    questions: [
      q.single('The maximum acceptable data loss, measured in time, is…', ['RPO', 'RTO', 'MTTR', 'MTBF'], 0),
      q.single('How long until a system must be running again is…', ['RTO', 'RPO', 'SLA', 'MTBF'], 0),
      q.single('A site ready to take over almost immediately is a…', ['Hot site', 'Cold site', 'Warm site', 'Branch office'], 0),
    ],
  },
  'dsvNPjK0ihM': {
    try: 'Draw a network with redundant internet links, two firewalls and two switches. Mark where single points of failure were removed.',
    minutes: 10,
    questions: [
      q.single('Combining several links into one logical link is…', ['Link aggregation (LACP)', 'NAT', 'STP', 'DNS'], 0),
      q.single('Active-passive clustering means…', ['One device handles traffic; the other waits to take over', 'Both always share load', 'No backup', 'Only for Wi-Fi'], 0),
      q.tf('Removing single points of failure increases availability.', true),
    ],
  },
  'b7fiXM3vO18': {
    try: 'Capture a DHCP exchange in Wireshark (filter: dhcp or bootp) while renewing your IP. Identify the DORA packets.',
    minutes: 15,
    questions: [
      q.order('Order the DHCP messages.', ['Discover', 'Offer', 'Request', 'Acknowledge']),
      q.single('Which forwards DHCP requests to a server on another subnet?', ['DHCP relay / IP helper', 'NAT', 'Proxy', 'DNS forwarder'], 0),
      q.single('Which UDP port does a DHCP server listen on?', ['67', '68', '53', '69'], 0),
    ],
  },
  'Zu70w3YTtpg': {
    try: 'Configure a DHCP pool on a Packet Tracer router: network, default gateway, DNS server and an excluded range.',
    minutes: 20,
    questions: [
      q.single('A range of addresses the DHCP server won’t hand out is an…', ['Exclusion', 'Reservation', 'Scope', 'Lease'], 0),
      q.single('Which DHCP option provides the default gateway?', ['Router option', 'Lease time', 'NTP server', 'Hostname'], 0),
      q.tf('Short lease times suit networks with many visiting devices.', true),
    ],
  },
  'A6WVj82by3Y': {
    try: 'Run ipconfig and look for IPv6 addresses. Explain how SLAAC lets a device configure an address without DHCP.',
    minutes: 10,
    questions: [
      q.single('SLAAC configures IPv6 addresses using…', ['Router advertisements', 'DHCPv4', 'APIPA', 'ARP'], 0),
      q.tf('IPv6 uses Neighbor Discovery instead of ARP.', true),
      q.single('Which can also provide IPv6 settings like DNS servers?', ['DHCPv6', 'SNMP', 'FTP', 'LDAP'], 0),
    ],
  },
  'S4s3vgm4h84': {
    try: 'Run nslookup with set debug, then try dig +trace example.com (Linux/macOS) and follow the path from root to authoritative server.',
    minutes: 15,
    questions: [
      q.order('Order a recursive DNS lookup for www.example.com.', ['Ask the recursive resolver', 'Resolver asks a root server', 'Resolver asks the .com TLD server', 'Resolver asks example.com’s authoritative server']),
      q.single('Which server holds the definitive records for a domain?', ['Authoritative name server', 'Recursive resolver', 'Root hint', 'Cache only'], 0),
      q.single('Which protects DNS answers from tampering with signatures?', ['DNSSEC', 'DoH', 'DHCP', 'NAT'], 0, 'DoH/DoT encrypt queries for privacy.'),
    ],
  },
  'qAyVND44jaE': {
    try: 'Use nslookup -type=PTR on 8.8.8.8, and look up the SOA and NS records of a domain you know.',
    minutes: 10,
    questions: [
      q.match('Match each DNS record type to its purpose.', [['PTR', 'Reverse lookup (IP to name)'], ['NS', 'Name servers for the zone'], ['SOA', 'Zone authority and serial'], ['TXT', 'Text such as SPF']]),
      q.single('Which record maps a name to an IPv6 address?', ['AAAA', 'A', 'MX', 'CNAME'], 0),
      q.tf('A CNAME record creates an alias pointing to another name.', true),
    ],
  },
  '9MwHexC3Fkc': {
    try: 'Check your computer’s time source (w32tm /query /status on Windows, timedatectl on Linux).',
    minutes: 5,
    questions: [
      q.single('Which protocol synchronises clocks across a network?', ['NTP', 'SNMP', 'SMTP', 'SIP'], 0),
      q.single('Why does accurate time matter for security?', ['Logs and authentication (e.g. Kerberos) depend on it', 'It speeds up Wi-Fi', 'It saves power', 'It changes IPs'], 0),
      q.tf('PTP is used where very precise time is needed, like industrial or financial systems.', true),
    ],
  },
  'tm7i0zEitPQ': {
    try: 'Compare site-to-site and client-to-site VPNs, and full tunnel versus split tunnel, in a short table.',
    minutes: 10,
    questions: [
      q.single('Connecting two offices’ networks permanently uses a…', ['Site-to-site VPN', 'Client-to-site VPN', 'Clientless VPN', 'Proxy'], 0),
      q.single('Sending only company traffic over the VPN is…', ['Split tunnel', 'Full tunnel', 'Clientless', 'NAT'], 0),
      q.tf('A clientless VPN runs in a web browser.', true),
    ],
  },
  'QbEDRTjcom4': {
    try: 'List secure ways to manage a switch remotely (SSH, HTTPS GUI, out-of-band console, jump box) and one insecure way to avoid.',
    minutes: 10,
    questions: [
      q.single('Which is secure for command-line management?', ['SSH', 'Telnet', 'HTTP', 'TFTP'], 0),
      q.single('Managing devices through a separate network or console path is…', ['Out-of-band management', 'In-band only', 'NAT', 'Trunking'], 0),
      q.single('A hardened server used as the only entry point to manage other systems is a…', ['Jump box', 'Honeypot', 'Proxy', 'DHCP server'], 0),
    ],
  },
  '51W4Fhds7DQ': {
    try: 'Give an example of confidentiality, integrity and availability for a hospital network.',
    minutes: 10,
    questions: [
      q.match('Match each part of the CIA triad to an example.', [['Confidentiality', 'Encrypting patient records'], ['Integrity', 'Hashing to detect changes'], ['Availability', 'Redundant servers']]),
      q.single('Which keeps data private in transit?', ['Encryption', 'Hashing', 'Backups', 'RAID'], 0),
      q.single('Which proves who sent data and that it wasn’t changed?', ['Digital signature', 'Compression', 'NAT', 'VLAN'], 0),
    ],
  },
  'enyRd-8m8SI': {
    try: 'Draw how SSO with SAML works: user, identity provider and service provider. Note which protocol your workplace uses.',
    minutes: 10,
    questions: [
      q.single('Which uses tickets to authenticate in Windows domains?', ['Kerberos', 'RADIUS', 'TACACS+', 'LDAP only'], 0),
      q.single('Which separates authentication, authorization and accounting and encrypts the whole payload?', ['TACACS+', 'RADIUS', 'SAML', 'NTP'], 0),
      q.single('Which standard is used for web single sign-on between organizations?', ['SAML', 'SNMP', 'SMTP', 'SSH'], 0),
    ],
  },
  'qIQQKCv6P_s': {
    try: 'Explain honeypots, NAC and DLP in one sentence each, with where each would sit in a network.',
    minutes: 10,
    questions: [
      q.single('A decoy system that attracts attackers is a…', ['Honeypot', 'Jump box', 'Bastion', 'Proxy'], 0),
      q.single('Which checks a device’s health before allowing it on the network?', ['NAC', 'NAT', 'NTP', 'NFS'], 0),
      q.tf('802.1X is used for port-based network access control.', true),
    ],
  },
  '5KjXu7SvU6E': {
    try: 'Find which regulations would apply if you handled card payments (PCI DSS) or EU personal data (GDPR), and one requirement of each.',
    minutes: 10,
    questions: [
      q.single('Which standard applies to organizations handling card payments?', ['PCI DSS', 'GDPR', 'HIPAA', 'SOX'], 0),
      q.single('Which regulation protects personal data of people in the EU?', ['GDPR', 'PCI DSS', 'FERPA', 'GLBA'], 0),
      q.tf('Data locality rules can require data to stay in certain countries.', true),
    ],
  },
  'DsOzQLX5cg4': {
    try: 'Design segments for a small company: users, servers, guests, IoT and PCI. Note which may talk to which.',
    minutes: 10,
    questions: [
      q.single('Separating IoT devices from user devices is an example of…', ['Segmentation', 'Load balancing', 'NAT', 'Trunking'], 0),
      q.single('A screened subnet (DMZ) holds…', ['Public-facing servers', 'All user PCs', 'Backups only', 'Printers only'], 0),
      q.tf('Segmentation limits how far an attacker can move after a breach.', true),
    ],
  },
  'x8dIr6JYkjA': {
    try: 'Read about a large DDoS attack in the news and note its size and how it was mitigated.',
    minutes: 5,
    questions: [
      q.single('A DDoS using reflection sends spoofed requests so servers reply to…', ['The victim', 'The attacker', 'Nobody', 'The ISP only'], 0),
      q.single('Which amplifies traffic using small requests that cause large replies?', ['DNS or NTP amplification', 'Phishing', 'Tailgating', 'VLAN hopping'], 0),
      q.tf('Upstream filtering by the ISP or a scrubbing service helps against DDoS.', true),
    ],
  },
  'hcaGiWteVTM': {
    try: 'Write two switch settings that prevent VLAN hopping (disable auto-trunking, change the native VLAN).',
    minutes: 5,
    questions: [
      q.single('VLAN hopping by switch spoofing abuses…', ['Automatic trunk negotiation (DTP)', 'DHCP leases', 'DNS caching', 'NAT'], 0),
      q.single('Which prevents double-tagging attacks?', ['Using an unused native VLAN', 'Enabling Telnet', 'Bigger MTU', 'Static IPs'], 0),
      q.tf('Access ports should be set to access mode explicitly.', true),
    ],
  },
  'ttLNYwt-aq0': {
    try: 'Explain how port security limiting MAC addresses per port stops MAC flooding.',
    minutes: 5,
    questions: [
      q.single('MAC flooding fills the switch’s…', ['MAC address table', 'Routing table', 'DNS cache', 'ARP table on PCs'], 0),
      q.single('When its table is full, a switch may…', ['Flood frames out all ports like a hub', 'Shut down', 'Encrypt traffic', 'Drop all traffic'], 0),
      q.tf('Port security can limit how many MAC addresses a port learns.', true),
    ],
  },
  '2QijB5GtNE4': {
    try: 'Run arp -a and look for two IPs sharing one MAC (a sign of ARP poisoning). Explain how DNSSEC helps against DNS poisoning.',
    minutes: 10,
    questions: [
      q.single('ARP poisoning lets an attacker…', ['Intercept traffic on the local network', 'Crack Wi-Fi', 'Steal BIOS passwords', 'Flood DNS'], 0),
      q.single('Which switch feature defends against ARP poisoning?', ['Dynamic ARP inspection', 'STP', 'PoE', 'LACP'], 0),
      q.single('DNS poisoning sends users to…', ['A fake address for a real name', 'A faster server', 'The loopback', 'A printer'], 0),
    ],
  },
  '6AcRzyPuOL8': {
    try: 'Explain how DHCP snooping stops a rogue DHCP server and how wireless scans find rogue access points.',
    minutes: 5,
    questions: [
      q.single('An unauthorized access point plugged into the network is a…', ['Rogue AP', 'Evil twin only', 'Honeypot', 'Repeater'], 0),
      q.single('Which switch feature blocks rogue DHCP servers?', ['DHCP snooping', 'Port mirroring', 'STP', 'QoS'], 0),
      q.tf('An evil twin imitates a legitimate SSID to trick users.', true),
    ],
  },
  'sF0uBtavItI': {
    try: 'Write a short security awareness tip for colleagues on phishing, tailgating and shoulder surfing.',
    minutes: 10,
    questions: [
      q.single('Someone looks over your shoulder to see your password. This is…', ['Shoulder surfing', 'Dumpster diving', 'Tailgating', 'Vishing'], 0),
      q.single('Searching an organization’s rubbish for information is…', ['Dumpster diving', 'Phishing', 'Smishing', 'Pretexting'], 0),
      q.tf('Training users is a key defence against social engineering.', true),
    ],
  },
  'rnfViZdGfmA': {
    try: 'List how malware can reach a network (email, downloads, USB, exploits) and one control for each.',
    minutes: 5,
    questions: [
      q.single('Which control stops users running unknown programs?', ['Application allow listing', 'NAT', 'PoE', 'STP'], 0),
      q.single('Malware moving from one infected host to others on the network is…', ['Lateral movement', 'Jitter', 'Bleed', 'Roaming'], 0),
      q.tf('Keeping systems patched reduces malware infections.', true),
    ],
  },
  'TZUh1qF6ypI': {
    try: 'Harden a device you own: change default credentials, disable unused services, update firmware.',
    minutes: 10,
    questions: [
      q.multi('Which harden a network device?', ['Change default passwords', 'Disable unused ports', 'Update firmware', 'Enable Telnet'], [0, 1, 2]),
      q.single('Which protocol should replace Telnet?', ['SSH', 'FTP', 'HTTP', 'TFTP'], 0),
      q.tf('Unused switch ports should be shut down or put in an unused VLAN.', true),
    ],
  },
  'ORRcLSS9_Ps': {
    try: 'Write an ACL that allows web traffic to a web server and blocks everything else. Note why rule order matters.',
    minutes: 15,
    questions: [
      q.single('Firewall rules are processed…', ['Top to bottom, first match wins', 'Bottom to top', 'All at once randomly', 'Alphabetically'], 0),
      q.single('Rules usually end with…', ['An implicit deny', 'An implicit allow', 'A reboot', 'A NAT rule'], 0),
      q.tf('URL filtering blocks access to websites by category or address.', true),
    ],
  },
  'dovuPm3dGhc': {
    try: 'Use the troubleshooting methodology on a network problem you’ve had. Write each step and what you did.',
    minutes: 10,
    questions: [
      q.order('Put the network troubleshooting steps in order.', ['Identify the problem', 'Establish a theory of probable cause', 'Test the theory', 'Establish a plan of action', 'Implement the solution or escalate', 'Verify full system functionality', 'Document findings']),
      q.single('Starting at the physical layer and moving up is…', ['Bottom-up', 'Top-down', 'Divide and conquer', 'Guessing'], 0),
      q.tf('You should question the obvious when identifying a problem.', true),
    ],
  },
  'L6P6ovTEPvU': {
    try: 'If you have spare cables, test them with a cable tester or by swapping. List symptoms of crosstalk, attenuation and wrong pinouts.',
    minutes: 15,
    questions: [
      q.single('Signal getting weaker over a long cable is…', ['Attenuation', 'Crosstalk', 'Jitter', 'Bleed'], 0),
      q.single('Signal from one pair interfering with another is…', ['Crosstalk', 'Attenuation', 'Latency', 'Collision'], 0),
      q.single('Which tool finds where a cable break is?', ['TDR', 'Toner only', 'Loopback plug', 'Wi-Fi analyser'], 0),
    ],
  },
  '7b4RkdITO4Q': {
    try: 'In Packet Tracer, run show interfaces on a switch port and find CRC errors, runts, giants and the up/down status.',
    minutes: 10,
    questions: [
      q.single('Rising CRC errors on an interface usually mean…', ['A bad cable or interference', 'Wrong DNS', 'Too many users', 'An IP conflict'], 0),
      q.single('A port shows "err-disabled". What might have caused it?', ['Port security violation', 'Good config', 'DNS', 'NTP'], 0),
      q.tf('A speed or duplex mismatch causes errors and poor performance.', true),
    ],
  },
  '_IeIUxDe1fo': {
    try: 'List what you’d check if a PoE access point won’t power on: switch PoE budget, standard, cable, port.',
    minutes: 5,
    questions: [
      q.single('A PoE device won’t start on one switch but works on another. Likely cause?', ['Insufficient PoE budget or standard', 'DNS', 'Wrong SSID', 'Firewall'], 0),
      q.single('A transceiver isn’t recognised. What should you check?', ['Compatibility and type (SFP vs SFP+)', 'Printer driver', 'User password', 'IP address'], 0),
      q.tf('Overheating can make network hardware fail intermittently.', true),
    ],
  },
  'rUONzfO11m8': {
    try: 'Write the symptoms of a switching loop, an incorrect VLAN assignment and a native VLAN mismatch.',
    minutes: 10,
    questions: [
      q.single('A PC gets an address from the wrong subnet. Likely cause?', ['Port in the wrong VLAN', 'Bad DNS', 'Weak Wi-Fi', 'Full disk'], 0),
      q.single('Network slows to a halt with broadcast storms. Likely cause?', ['Switching loop (STP issue)', 'Wrong password', 'Expired certificate', 'Low toner'], 0),
      q.tf('Mismatched native VLANs on a trunk can cause traffic to end up in the wrong VLAN.', true),
    ],
  },
  'pbOi48USeVw': {
    try: 'Troubleshoot on paper: a PC can reach its LAN but not the internet. List what you’d check, in order.',
    minutes: 10,
    questions: [
      q.single('A PC reaches local devices but not other networks. Check first…', ['Its default gateway', 'Its wallpaper', 'Its printer', 'Its keyboard'], 0),
      q.single('Two devices with the same IP cause…', ['An IP conflict', 'A routing loop', 'A DNS cache', 'Latency only'], 0),
      q.single('A subnet mask that is too small on a PC can cause…', ['Some local hosts to seem remote', 'Faster speed', 'Better security', 'No effect'], 0),
    ],
  },
  'FVxENIjdAJk': {
    try: 'Run a speed test and a long ping (ping -n 50 8.8.8.8). Note latency, jitter and any packet loss.',
    minutes: 10,
    questions: [
      q.single('Variation in delay between packets is…', ['Jitter', 'Latency', 'Bandwidth', 'Throughput'], 0),
      q.single('Which most harms voice calls?', ['Jitter and packet loss', 'Large file sizes', 'Long passwords', 'Static IPs'], 0),
      q.tf('Congestion on a link can cause packet loss.', true),
    ],
  },
  'UO3G_OJhBS4': {
    try: 'Walk around with a Wi-Fi analyser and map signal strength (RSSI) in each room. Note weak spots and channel overlaps.',
    minutes: 15,
    questions: [
      q.single('Clients connect but are very slow far from the AP. Likely cause?', ['Low signal / distance', 'Wrong DNS', 'Bad CPU', 'IP conflict'], 0),
      q.single('Two nearby APs on the same channel cause…', ['Co-channel interference', 'Better speed', 'Encryption', 'Roaming'], 0),
      q.tf('A client can’t connect if its security settings don’t match the network.', true),
    ],
  },
  'b81_GeoN12I': {
    try: 'Install nmap and scan only your own machine or scanme.nmap.org (explicitly permitted): nmap -sV scanme.nmap.org. Never scan networks you don’t own.',
    minutes: 15,
    questions: [
      q.single('Which tool captures packets for analysis?', ['Wireshark / protocol analyser', 'nmap', 'iperf', 'TDR'], 0),
      q.single('Which tool measures throughput between two hosts?', ['iperf', 'nslookup', 'arp', 'dig'], 0),
      q.single('Which tool scans for open ports and services?', ['nmap', 'Wireshark', 'Toner', 'Cable tester'], 0),
    ],
  },
  'iYojIK1173k': {
    try: 'Run ping, tracert/traceroute, nslookup/dig, ipconfig/ip, arp -a and netstat. Write what each found on your network.',
    minutes: 15,
    questions: [
      q.single('Which command shows the IP-to-MAC mappings a computer has learned?', ['arp -a', 'netstat', 'tracert', 'hostname'], 0),
      q.single('Which Linux command shows the path to a host?', ['traceroute', 'ifconfig only', 'dig', 'nslookup'], 0),
      q.single('Which Linux tool queries DNS in detail?', ['dig', 'ping', 'arp', 'route'], 0),
    ],
  },
  'ytcAqNxkI9I': {
    try: 'Match each hardware tool to a problem: toner probe, cable tester, TDR/OTDR, loopback plug, Wi-Fi analyser, multimeter.',
    minutes: 5,
    questions: [
      q.single('Which tests a fibre cable’s length and finds breaks?', ['OTDR', 'Toner', 'Crimper', 'Punchdown'], 0),
      q.single('Which tests that a NIC port can send and receive?', ['Loopback plug', 'OTDR', 'Toner', 'Multimeter'], 0),
      q.tf('A tap device copies traffic from a link for analysis.', true),
    ],
  },
  '3-KakmVmEpo': {
    try: 'In Packet Tracer, run show running-config, show interfaces, show ip route, show vlan and show mac address-table on a switch and router.',
    minutes: 15,
    questions: [
      q.single('Which command shows a router’s routing table?', ['show ip route', 'show vlan', 'show mac address-table', 'show clock'], 0),
      q.single('Which command shows which MAC addresses a switch learned on each port?', ['show mac address-table', 'show ip route', 'show arp only', 'show version'], 0),
      q.single('Which command shows the current configuration?', ['show running-config', 'show history', 'show users', 'show flash'], 0),
    ],
  },
};
