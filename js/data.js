/* Edit your content here. The page builds itself from this file. */
const DATA = {
  status: "Open to cybersecurity roles",
  roles: ["Cybersecurity Professional", "Cloud Security", "Detection and Response", "Vulnerability Assessment"],
  lede: "I build hands-on security systems: an AWS pipeline that auto-contains threats, a self-hosted SOC lab that correlated 600+ real attack events, and my own scanning tools. Based in Chandrapur, Maharashtra.",
  stats: [
    { n: 600, suffix: "+", label: "attack events correlated in my SOC lab" },
    { n: 4, suffix: "", label: "security projects on GitHub" },
    { n: 3, suffix: "", label: "certifications and course credentials" },
    { n: 8.54, dec: 2, suffix: "", label: "B.Tech CGPA" }
  ],
  about: [
    "I'm completing the PGCP-ITISS program at C-DAC ACTS Pune, covering network defense, cyber forensics, compliance auditing, and DevOps.",
    "My background is a B.Tech in Computer Science. Since then I've built projects across cloud incident response, SIEM detection engineering, and vulnerability assessment. I'd rather build and break things in a lab than only study the theory.",
    "Outside coursework I spend time on self-directed lab building, ethical hacking practice, and learning the tools security teams use every day."
  ],
  facts: [
    ["Program", "PGCP-ITISS, C-DAC ACTS Pune"], ["Score", "75.36%"],
    ["Degree", "B.Tech CSE, Ballarpur Institute of Technology"], ["CGPA", "8.54"],
    ["Focus", "Cloud security, blue team, vulnerability assessment"], ["Location", "Chandrapur, Maharashtra, India"]
  ],
  skills: [
    { group: "Cloud security", items: ["AWS", "GuardDuty", "EventBridge", "Lambda", "EC2 / EBS / SNS", "IAM", "CloudWatch Logs"] },
    { group: "Detection and response", items: ["Wazuh SIEM", "Threat detection", "Incident response", "Log analysis"] },
    { group: "Offensive and assessment", items: ["Nmap", "Burp Suite", "Hydra", "Kali Linux", "Vulnerability scanning"] },
    { group: "Networking", items: ["TCP/IP", "DNS", "Firewalls", "Wireshark", "Nmap"] },
    { group: "Systems", items: ["Ubuntu", "Kali Linux", "Windows", "Shell scripting", "VirtualBox / VMware"] },
    { group: "Programming", items: ["Python", "Bash", "boto3", "JavaScript", "HTML / CSS", "Git & GitHub"] }
  ],
  projects: [
    { title: "CloudGuard AI", type: "Cloud", sev: "High", result: "Auto-contained",
      url: "https://github.com/Ashu-ye/Cloud-Guard",
      summary: "Automated AWS cloud security and incident response pipeline.",
      points: ["Event-driven workflow (GuardDuty, EventBridge, Lambda) that identifies and contains suspicious EC2 activity using forensic EBS snapshots and security-group isolation.",
               "Python/boto3 orchestration with idempotency checks and dry-run safety controls, plus SNS alerting and CloudWatch Logs monitoring."],
      stack: ["AWS", "GuardDuty", "Lambda", "Python / boto3", "EventBridge"] },
    { title: "Home SOC Lab", type: "Defensive", sev: "High", result: "600+ detected",
      url: "https://github.com/Ashu-ye/home-soc-lab",
      summary: "Blue-team detection and incident response lab, built from scratch.",
      points: ["Self-hosted lab in VirtualBox (Kali attacker, Ubuntu victim, Wazuh SIEM) with simulated SSH brute-force attacks using Hydra and Nmap.",
               "Diagnosed a Wazuh agent log-source misconfiguration that was suppressing alerts, reaching correlated detection of 600+ authentication failures.",
               "Documented the build, the troubleshooting log, and a formal SOC-style incident report on GitHub."],
      stack: ["Wazuh SIEM", "Kali Linux", "Hydra", "Nmap", "VirtualBox"] },
    { title: "Vulnerability Scanner", type: "Offensive", sev: "Medium", result: "Scanning",
      url: "https://github.com/Ashu-ye/Vulnerability-Scanner",
      summary: "Multithreaded Python security assessment tool.",
      points: ["Port scanning, banner grabbing, and a security header audit, with live CVE lookups against the NVD."],
      stack: ["Python", "Multithreading", "NVD API", "Vulnerability assessment"] },
    { title: "Host Scanner", type: "Offensive", sev: "Low", result: "Monitoring",
      url: "https://github.com/Ashu-ye/host-scanner",
      summary: "Lightweight network host discovery and scanning utility.",
      points: ["A scripting-focused tool for sweeping networks and surfacing live hosts, built for recon and asset-discovery practice."],
      stack: ["Python", "Networking", "Recon"] }
  ],
  certs: [
    { name: "Introduction to Cybersecurity", by: "Cisco Networking Academy", meta: "Issued Apr 2, 2026" },
    { name: "Android Bug Bounty Hunting: Hunt Like a Rat", by: "codeRED Continuous Learning", meta: "Issued Aug 18, 2026 · Cert #521065" },
    { name: "Introduction to Agent Skills", by: "Anthropic", meta: "Course completion" }
  ],
  contact: {
    text: "Reach out directly, or find me on GitHub and LinkedIn.",
    email: "ashrayyenpreddiwar2@gmail.com", phone: "+91 85302 36543",
    linkedin: "https://www.linkedin.com/in/ashray-yenpreddiwar/", github: "https://github.com/Ashu-ye",
    resume: "assets/Ashray_Yenpreddiwar_Resume.pdf"
  },
  footer: "© 2026 Ashray Yenpreddiwar"
};
