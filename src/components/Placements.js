import React, { useState } from 'react';
import { Briefcase, TrendingUp, Award, Users, Building2, ChevronDown, ChevronUp, DollarSign, BarChart3, Search } from 'lucide-react';

export default function Placements() {
  const [activeBatch, setActiveBatch] = useState('2025');
  const [showAllRecruiters, setShowAllRecruiters] = useState(false);
  const [recruiterSearch, setRecruiterSearch] = useState("");

  const highlights2025 = {
    highest: "62.00",
    second: "55.38",
    third: "52.75",
    average: "11.13",
    median: "7.93",
    companies: "260+",
    offers: {
      high: "178", // > 13L
      mid: "350", // 6-13L
      low: "406" // < 6L
    }
  };

  const batchStats = {
    '2025': {
      year: '2021-2025',
      highest: '62.00 Lakhs (Atlassian)',
      second: '52.38 Lakhs (Microsoft India)',
      data: [
        { branch: 'CSE', students: 461, offers: 666, totalPerc: '144%', absolute: 452, absPerc: '98%' },
        { branch: 'ECE', students: 121, offers: 142, totalPerc: '117%', absolute: 119, absPerc: '98%' },
        { branch: 'IT', students: 50, offers: 71, totalPerc: '142%', absolute: 49, absPerc: '98%' },
        { branch: 'BT', students: 26, offers: 25, totalPerc: '96%', absolute: 22, absPerc: '85%' },
        { branch: 'TOTAL', students: 658, offers: 904, totalPerc: '137%', absolute: 642, absPerc: '98%' }
      ]
    },
    '2024': {
      year: '2020-2024',
      highest: '60.71 Lakhs (Linkedin)',
      second: '52.00 Lakhs (Microsoft India)',
      data: [
        { branch: 'CSE', students: 449, offers: 505, totalPerc: '112%', absolute: 437, absPerc: '97%' },
        { branch: 'ECE', students: 188, offers: 184, totalPerc: '98%', absolute: 166, absPerc: '88%' },
        { branch: 'IT', students: 52, offers: 58, totalPerc: '112%', absolute: 50, absPerc: '96%' },
        { branch: 'BT', students: 32, offers: 27, totalPerc: '84%', absolute: 26, absPerc: '81%' },
        { branch: 'TOTAL', students: 721, offers: 774, totalPerc: '107%', absolute: 679, absPerc: '94%' }
      ]
    },
    '2023': {
      year: '2019-2023',
      highest: '82.89 Lakhs (Atlassian)',
      second: '55.38 Lakhs (Adobe)',
      data: [
        { branch: 'CSE', students: 457, offers: 631, totalPerc: '138%', absolute: 456, absPerc: '100%' },
        { branch: 'ECE', students: 221, offers: 336, totalPerc: '152%', absolute: 219, absPerc: '99%' },
        { branch: 'IT', students: 49, offers: 61, totalPerc: '124%', absolute: 48, absPerc: '98%' },
        { branch: 'BT', students: 36, offers: 41, totalPerc: '114%', absolute: 28, absPerc: '78%' },
        { branch: 'TOTAL', students: 763, offers: 1069, totalPerc: '140%', absolute: 751, absPerc: '98%' }
      ]
    },
    '2022': {
      year: '2018-2022',
      highest: '1.15 Cr (Amazon EMEA)',
      second: '1.05 Cr (Amazon EMEA)',
      data: [
        { branch: 'CSE', students: 453, offers: 774, totalPerc: '171%', absolute: 451, absPerc: '100%' },
        { branch: 'ECE', students: 257, offers: 491, totalPerc: '191%', absolute: 256, absPerc: '100%' },
        { branch: 'IT', students: 47, offers: 81, totalPerc: '172%', absolute: 45, absPerc: '96%' },
        { branch: 'BT', students: 30, offers: 37, totalPerc: '123%', absolute: 28, absPerc: '93%' },
        { branch: 'TOTAL', students: 787, offers: 1383, totalPerc: '176%', absolute: 780, absPerc: '99%' }
      ]
    },
    '2021': {
      year: '2017-2021',
      highest: '43.88 Lakhs (Adobe)',
      second: '31.00 Lakhs (Cisco)',
      data: [
        { branch: 'CSE', students: 455, offers: 766, totalPerc: '168%', absolute: 453, absPerc: '100%' },
        { branch: 'ECE', students: 307, offers: 513, totalPerc: '167%', absolute: 305, absPerc: '99%' },
        { branch: 'IT', students: 51, offers: 85, totalPerc: '167%', absolute: 51, absPerc: '100%' },
        { branch: 'BT', students: 26, offers: 26, totalPerc: '100%', absolute: 23, absPerc: '88%' },
        { branch: 'TOTAL', students: 839, offers: 1390, totalPerc: '166%', absolute: 832, absPerc: '99%' }
      ]
    }
  };

  const recruiters = [
    "1Digitalstack.ai", "ABC Info Soft", "Accenture", "Acro Engineering", "Adbrew", "Afford Medical", "Agoda", "AKS IT Services", "Altudo", "Amar Ujala (Digital)",
    "Amazon", "Amazon Non Tech", "American Express", "AppVin Technologies", "Aspire", "Athena Executive Search", "Atlassian", "Atomic Work", "Avendum Technologies", "AventIQ",
    "Axeno", "Axtria", "Bebetta", "Bhanzu", "Bharat Digital Education", "Bharat Pe", "BlogVault", "BN Group", "BOSCH", "BOT Consulting",
    "Branch International", "BrickWin Consultancy", "Bureau Veritas", "Cadence", "Capgemini", "CERN (European)", "Ciena", "CISCO", "Clarivate", "Classplus",
    "CloudKeeper", "Coditas Solutions", "Coforge", "Cognida.ai", "Cognizant", "Collegedekho", "Comcon Technologies", "Contevolve", "Convegenius", "CORIZO",
    "Crib", "Decimal Technologies", "Decision Tree Analytics", "Deloitte USI", "Deltax", "DHA-1 India", "Digite Infotech", "EagleView", "EcoRatings", "EdiQue Solutions",
    "EffiGO GLOBAL", "Empirico", "Encora Innovation", "Epack", "E-Solutions", "ESQ", "ETrade Online", "EvalueServe", "Evigway", "ExpoPlatform",
    "EY India", "FACE Prep", "Farzi Engineer", "FealtyX", "Fidelity International", "Finsol", "Flow Metering Tech", "Forvia Faurecia", "Franciscan Solutions", "FundaMento",
    "Futures First", "Galytix", "GE Vernova", "GeeksforGeeks", "Genaxy Scientific", "Genpact", "Goldman Sachs", "Google India", "Gradious Technologies", "Grapecity",
    "GreyB Research", "HashedIn by Deloitte", "HCL Tech", "Huber Suhner", "Hyperverge-IE", "HyTechPro", "IBM", "IBM Systems", "IMARC", "Impetus",
    "Infoedge", "InfoEdge India", "Infosys", "Innovaccer", "Innovexia Lifesciences", "Inn-think Technologies", "Intel", "Intellipaat", "Internzvalley", "ION Group",
    "Iravan Technologies", "Jakson Group", "Jaro Education", "JIIT, Noida", "JindalX", "Jmitra & Co.", "Johnson & Johnson", "JP Morgan Chase", "JTP", "Juspay",
    "Kalvium", "Keyence India", "Kickdrum", "Kinben Innovation", "KollegeApply", "KPMG", "Kuick Research", "L&T Technology", "Letsai", "LifeCell International",
    "LTIMindtree", "Lumiq", "Lutron Electronics", "Madgical Techdom", "Magicpin", "Mahindra Bristlecone", "Manglam Electricals", "MAQ Software", "Masilamani Law", "mElimu Edutech",
    "Meritto", "Microsoft India", "MiPhi Semicon", "Mitsubishi Electric", "MyCaptain", "MyParkplus", "Newgen Software", "Nicox IT Solutions", "Novus Hi-Tech", "NWN",
    "NXP", "Nytarra Naturals", "Octro", "Odoo India", "OEM Technological", "Omniful", "Oracle Financial", "Orange Business", "Orangewood", "Ori Serve",
    "Ottonomy.IO", "Palco Labs Inc", "Paques Environmental", "Paypal India", "Paytm", "PayU", "PensionBox", "Pentair", "PepsiCo", "Phronesis Partners",
    "Physicswallah", "Planet Spark", "Platelink UKI", "Playsimple Games", "Plotline", "Probo", "Proffus", "ProgrammingPathshala", "Quokka Labs", "R Star Technologies",
    "RAS Tech Serv", "Red Hat", "RemoteState", "Reunion", "Rinex Technologies", "RNF Technologies", "Rockwell Automation", "Rohde & Schwarz", "Roots Analysis", "S&P Global",
    "SAAS Labs", "Safe Security", "Samsung R&D", "SAP Labs", "Semifront Technologies", "Servosys Solutions", "Siemens Healthineers", "Siemens Logistics", "Siemens Technology", "Skyroot Aerospace",
    "SmartED Innovations", "SmartShift", "Snackmagic-Vinsol", "SNVA Ventures", "SocioShop", "Sopra Banking", "SquadStack", "Star Health Insurance", "Starlight Data", "StarShield",
    "STMicroelectronics", "Stratbeans Consulting", "Streebo", "StrideOne", "Sun Life Global", "Sunstone", "Super AI", "Superkalam", "SurveySensum", "Taazaa",
    "TAK Technologies", "Tata Advanced Systems", "Tata Power", "TCS", "TeacherOn.com", "Techginity", "Thales Group", "The Catalysts Group", "The Goodspace AI", "Think41",
    "Threatcop-Kratikal", "TickIT", "TotheNew", "Transcend Info", "TravClan", "Triton Software", "Udaan", "Uniqode Phygital", "University Living", "Uolo",
    "upGrad", "Valorant Consulting", "Vehant", "Venera Connect", "Vitraya", "VServe Infosystems", "Walmart Global", "WatchGuard", "Wingify", "Wipro",
    "WiserStack", "Workato", "Xeno", "Xogene", "Youngsoft India", "Zomato", "ZopSmart", "Zscaler", "Zycus", "Zydus"
  ];

  const filteredRecruiters = recruiters.filter(r => r.toLowerCase().includes(recruiterSearch.toLowerCase()));
  const displayedRecruiters = showAllRecruiters || recruiterSearch ? filteredRecruiters : filteredRecruiters.slice(0, 20);

  return (
    <div className="space-y-6 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-emerald-500" />
          Placements
        </h2>
        <span className="text-[10px] font-bold text-zinc-500 bg-zinc-900 px-3 py-1.5 rounded-full border border-white/10 uppercase tracking-wider">
          JIIT Noida
        </span>
      </div>

      {/* Intro Card */}
      <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-4 text-sm text-zinc-400 leading-relaxed">
        Training and Placement activities are executed centrally from JIIT Noida. The department is headed by Brigadier Sanjay Dawar (Retd.), Dean of Students’ Welfare.
      </div>

      {/* 2025 Highlights */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-500" /> Batch 2025 Highlights
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-emerald-900/50 to-emerald-900/20 border border-emerald-500/20 p-4 rounded-2xl">
            <div className="text-xs text-emerald-400 font-bold uppercase mb-1">Highest Package</div>
            <div className="text-2xl font-bold text-white">₹{highlights2025.highest} L</div>
            <div className="text-[10px] text-emerald-300/60 mt-1">Atlassian (1 Offer)</div>
          </div>
          <div className="bg-zinc-900 border border-white/10 p-4 rounded-2xl">
            <div className="text-xs text-zinc-500 font-bold uppercase mb-1">Average Package</div>
            <div className="text-2xl font-bold text-white">₹{highlights2025.average} L</div>
            <div className="text-[10px] text-zinc-600 mt-1">Median: ₹{highlights2025.median} L</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
           <div className="bg-zinc-900/50 border border-white/5 p-3 rounded-xl text-center">
              <div className="text-lg font-bold text-white">{highlights2025.offers.high}</div>
              <div className="text-[9px] text-zinc-500 uppercase font-bold">13L - 52L</div>
           </div>
           <div className="bg-zinc-900/50 border border-white/5 p-3 rounded-xl text-center">
              <div className="text-lg font-bold text-white">{highlights2025.offers.mid}</div>
              <div className="text-[9px] text-zinc-500 uppercase font-bold">6L - 13L</div>
           </div>
           <div className="bg-zinc-900/50 border border-white/5 p-3 rounded-xl text-center">
              <div className="text-lg font-bold text-white">{highlights2025.offers.low}</div>
              <div className="text-[9px] text-zinc-500 uppercase font-bold">&lt; 6L</div>
           </div>
        </div>
      </div>

      {/* Batch Stats */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
           <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
             <BarChart3 className="w-4 h-4 text-blue-500" /> Batch Records
           </h3>
           <select 
             value={activeBatch} 
             onChange={(e) => setActiveBatch(e.target.value)}
             className="bg-zinc-900 text-zinc-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10 outline-none"
           >
             {Object.keys(batchStats).reverse().map(year => (
               <option key={year} value={year}>Batch {year}</option>
             ))}
           </select>
        </div>

        <div className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden">
           <div className="p-4 border-b border-white/5 bg-white/5">
              <div className="flex justify-between items-start mb-2">
                 <div>
                    <div className="text-xs text-zinc-400 font-bold uppercase">Highest Package</div>
                    <div className="text-lg font-bold text-white">{batchStats[activeBatch].highest}</div>
                 </div>
                 <div className="text-right">
                    <div className="text-xs text-zinc-400 font-bold uppercase">2nd Highest</div>
                    <div className="text-sm font-bold text-zinc-300">{batchStats[activeBatch].second}</div>
                 </div>
              </div>
           </div>
           
           <div className="overflow-x-auto">
             <table className="w-full text-left text-xs">
               <thead className="bg-black/20 text-zinc-500 font-bold uppercase">
                 <tr>
                   <th className="p-3">Branch</th>
                   <th className="p-3 text-right">Offers</th>
                   <th className="p-3 text-right">% Total</th>
                   <th className="p-3 text-right">% Abs</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5 text-zinc-300">
                 {batchStats[activeBatch].data.map((row, idx) => (
                   <tr key={idx} className={row.branch === 'TOTAL' ? 'bg-white/5 font-bold text-white' : ''}>
                     <td className="p-3">{row.branch}</td>
                     <td className="p-3 text-right">{row.offers}</td>
                     <td className="p-3 text-right">{row.totalPerc}</td>
                     <td className="p-3 text-right">{row.absPerc}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      </div>

      {/* Recruiters */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
          <Building2 className="w-4 h-4 text-purple-500" /> Key Recruiters
        </h3>
        
        <div className="relative">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
           <input 
             type="text" 
             placeholder="Search companies..." 
             className="w-full bg-zinc-900 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-white/20 transition-colors"
             value={recruiterSearch}
             onChange={(e) => setRecruiterSearch(e.target.value)}
           />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {displayedRecruiters.map((company, idx) => (
            <div key={idx} className="bg-zinc-900/50 border border-white/5 p-2.5 rounded-lg text-xs text-zinc-300 truncate">
              {company}
            </div>
          ))}
        </div>
        
        {!recruiterSearch && (
          <button 
            onClick={() => setShowAllRecruiters(!showAllRecruiters)}
            className="w-full py-2 text-xs font-bold text-zinc-500 hover:text-white transition-colors flex items-center justify-center gap-1"
          >
            {showAllRecruiters ? <>Show Less <ChevronUp className="w-3 h-3" /></> : <>View All ({recruiters.length}) <ChevronDown className="w-3 h-3" /></>}
          </button>
        )}
      </div>
    </div>
  );
}