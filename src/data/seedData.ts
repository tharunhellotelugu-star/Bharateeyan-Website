import { Campaign, Complaint, InvestorProfile, InvestorRequest, PledgeOrder } from '../types';

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-1',
    title: 'SuryaDry: Decentralized Solar Crop Dryer',
    tagline: 'Helps chilli & turmeric farmers dehydrate produce in 36 hours with zero electricity, preventing 40% post-harvest loss.',
    category: 'Agri',
    city: 'Warangal',
    state: 'Telangana',
    language: 'Telugu / English',
    founderId: 'f-1',
    founder: {
      id: 'f-1',
      name: 'Ravi Kumar',
      city: 'Warangal',
      state: 'Telangana',
      avatarBg: 'from-amber-600 to-indigo-800',
      initials: 'RK',
      bio: 'Grassroots mechanical technician & farmer son from Narsampet. Spent 4 years iterating solar thermal convection chambers.',
      entityType: 'Private Limited',
      kycVerified: true,
      bankVerified: true,
      phone: '+91 98480 12345',
      email: 'ravi.surya@gmail.com',
      pastCampaignsCount: 1,
      deliveryTrackRecord: '100% on-time delivery across 1 previous pilot batch of 20 units'
    },
    goalAmount: 1200000,
    raisedAmount: 1485000,
    backersCount: 142,
    daysLeft: 8,
    status: 'funded',
    communityValidated: true,
    meritScore: {
      publicBacking: 29,
      realCustomers: 18,
      deliveryRecord: 18,
      workingProduct: 14,
      founderCommitment: 9,
      communityVotes: 5,
      totalScore: 84
    },
    cardGradient: 'from-amber-500 to-indigo-700',
    iconName: 'Sun',
    pitchVideoPlaceholder: {
      duration: '3:45',
      aspectRatio: '16:9',
      hasDemo: true
    },
    story: {
      problem: 'In the Warangal and Khammam chilli belts, unseasonal rainfall during open-ground sun drying destroys up to 40% of the harvest. Commercial diesel dehydrators cost over ₹4.5 lakh and are unaffordable for smallholders.',
      solution: 'SuryaDry is a collapsible, UV-stabilized polycarbonate tunnel with passive solar-thermal airflow and a solar-powered exhaust fan. It dries 200 kg of red chillies or turmeric rhizomes in just 36 hours while keeping aflatoxin levels at export standards.',
      whoWeAre: 'We are a small workshop team of 6 fabricators based in Warangal industrial estate. Our founder Ravi Kumar grew up watching his family lose entire crops to sudden monsoon storms.',
      fundUsage: '55% for bulk sourcing of UV-resistant polycarbonate panels & anodized aluminum framing; 25% tooling & laser cutting; 20% logistics and packaging for backer rewards.',
      timeline: 'Field testing certified at PJTSAU Hyderabad. Batch 1 manufacturing begins immediately upon campaign closing; first 50 units ship by November 2026.',
      risks: 'Polycarbonate sheet supply from Gujarat has a 12-day logistics window. We have already secured an advance allocation with an established distributor in Secunderabad.'
    },
    rewardTiers: [
      {
        id: 'r-1-1',
        campaignId: 'camp-1',
        title: 'Community Supporter Pack',
        price: 999,
        description: 'Receive 1 kg of premium organic Warangal sun-dried GI-tagged Chapata chillies in jute pouch + Founder Thank-You Certificate.',
        items: ['1kg Warangal Chapata Chillies', 'Handmade Jute Pouch', 'Digital Backer Wall of Honour'],
        estimatedDeliveryMonth: 'Nov 2026',
        quantityLimit: 300,
        claimedCount: 88
      },
      {
        id: 'r-1-2',
        campaignId: 'camp-1',
        title: 'SuryaDry Mini (Kitchen & Terrace Herb Dryer)',
        price: 5499,
        description: 'Compact 15kg capacity solar tray dryer ideal for terrace gardeners, home herbalists, and kitchen pickle makers.',
        items: ['SuryaDry Mini Unit', '3 Food-Grade Mesh Trays', 'Instruction Manual in Telugu/Hindi/English'],
        estimatedDeliveryMonth: 'Dec 2026',
        quantityLimit: 120,
        claimedCount: 42
      },
      {
        id: 'r-1-3',
        campaignId: 'camp-1',
        title: 'SuryaDry Farm 200 (Full Commercial Unit)',
        price: 24999,
        description: 'Complete 200kg solar thermal dryer with solar-powered fan, temperature regulator, and on-farm setup guidance.',
        items: ['Full SuryaDry 200 Farm Rig', 'Solar Panel & 12V High-CFM Fan', '2-Year Warranty & Free On-Farm Video Support'],
        estimatedDeliveryMonth: 'Jan 2027',
        quantityLimit: 30,
        claimedCount: 12
      }
    ],
    updates: [
      {
        id: 'u-1-1',
        campaignId: 'camp-1',
        date: '2026-10-18',
        title: 'Goal reached! 100% funded in 18 days',
        content: 'Namaskaram backers! Thanks to 142 generous pre-orders across Andhra, Telangana, Maharashtra and Karnataka, we have fully hit our manufacturing target. Tooling dies have been ordered!',
        likesCount: 64
      },
      {
        id: 'u-1-2',
        campaignId: 'camp-1',
        date: '2026-10-22',
        title: 'Testing airflow speeds under October overcast conditions',
        content: 'Conducted live smoke testing in our Warangal yard today. The chimney design pulls 180 m3/hr even when sunlight is partially diffused by cloud cover.',
        likesCount: 39
      }
    ],
    comments: [
      {
        id: 'c-1-1',
        campaignId: 'camp-1',
        authorName: 'Suresh Babu',
        authorCity: 'Guntur',
        isBacker: true,
        date: '2026-10-19',
        text: 'బాగుంది రవి గారు. మేము గుంటూరు మిర్చి యార్డ్ లో చూశాం. 36 గంటల్లో డ్రై అయితే రైతులకు చాలా మేలు జరుగుతుంది. ప్రీ-ఆర్డర్ చేశాను.'
      },
      {
        id: 'c-1-2',
        campaignId: 'camp-1',
        authorName: 'Anand Kulkarni',
        authorCity: 'Hubballi',
        isBacker: true,
        date: '2026-10-21',
        text: 'Pre-ordered the SuryaDry Mini for our kitchen garden. Super excited to support a grassroots mechanical engineer!'
      }
    ],
    faqs: [
      {
        question: 'Does this require any grid electrical connection?',
        answer: 'None at all. The ventilation fan runs entirely on an integrated 25W monocrystalline solar panel.'
      },
      {
        question: 'What is the refund policy if the product fails?',
        answer: 'All pledges are protected under Bharateeyan escrow. Furthermore, our units come with a 2-year warranty and free replacement parts.'
      }
    ],
    payoutStatus: {
      firstStageReleased: true,
      secondStageReleased: false,
      proofUploaded: false
    },
    createdAt: '2026-10-01'
  },
  {
    id: 'camp-2',
    title: 'Balakode: Telugu-First Programming App for Rural Kids',
    tagline: 'Visual block coding and logic puzzles spoken natively in Telugu and Devanagari. Works 100% offline on ₹5,000 Android phones.',
    category: 'Education',
    city: 'Vijayawada',
    state: 'Andhra Pradesh',
    language: 'Telugu',
    founderId: 'f-2',
    founder: {
      id: 'f-2',
      name: 'Sunitha Rani',
      city: 'Vijayawada',
      state: 'Andhra Pradesh',
      avatarBg: 'from-pink-600 to-indigo-800',
      initials: 'SR',
      bio: 'Former government school teacher who taught herself Android programming to build learning tools for rural primary schools.',
      entityType: 'LLP',
      kycVerified: true,
      bankVerified: true,
      phone: '+91 94401 54321',
      email: 'sunitha.balakode@gmail.com',
      pastCampaignsCount: 0,
      deliveryTrackRecord: 'First time creator on platform; verified prototype live on 120 school tablets'
    },
    goalAmount: 600000,
    raisedAmount: 445000,
    backersCount: 189,
    daysLeft: 12,
    status: 'live',
    communityValidated: false,
    meritScore: {
      publicBacking: 22,
      realCustomers: 17,
      deliveryRecord: 12,
      workingProduct: 14,
      founderCommitment: 8,
      communityVotes: 3,
      totalScore: 76
    },
    cardGradient: 'from-indigo-600 to-sky-700',
    iconName: 'Code',
    pitchVideoPlaceholder: {
      duration: '2:50',
      aspectRatio: '16:9',
      hasDemo: true
    },
    story: {
      problem: 'Almost all coding curriculums in India require English fluency and stable 4G internet. Children in government schools in rural Andhra and Telangana feel left behind before they even start.',
      solution: 'Balakode translates fundamental algorithmic concepts into Telugu storytelling (with characters like Tenali Rama solving algorithmic riddles). Works completely offline without data charges.',
      whoWeAre: 'Sunitha and a team of 3 young diploma developers from Krishna District. We have tested this in 8 mandal parishad schools with 600 children.',
      fundUsage: '40% native voice-over recording and animation; 35% offline hardware optimization for low-end Android 9 devices; 25% reward fulfillment (printed storybooks and USB keys).',
      timeline: 'App build 1.0 complete. Sound design wrap-up in November. Backer USB kits & digital licenses dispatched December 2026.',
      risks: 'Testing on varied chipset architectures (MediaTek vs Unisoc low-cost phones). We have already acquired 15 refurbished test devices representing top rural phone models.'
    },
    rewardTiers: [
      {
        id: 'r-2-1',
        campaignId: 'camp-2',
        title: 'Single Child Annual License + Printed Comic',
        price: 499,
        description: '1 Full offline app license + 64-page full colour illustrated Telugu logic puzzle book shipped to your address.',
        items: ['1x Balakode Lifetime License', 'Printed Telugu Logic Comic', 'Backer Badge'],
        estimatedDeliveryMonth: 'Dec 2026',
        quantityLimit: 500,
        claimedCount: 130
      },
      {
        id: 'r-2-2',
        campaignId: 'camp-2',
        title: 'Sponsor a Rural School Lab (10 Kids Kit)',
        price: 3499,
        description: 'Sponsor offline kits for 10 kids in a rural school of your choice (or our partner ZP schools), plus you get backer certificate & student letters.',
        items: ['10 Offline Licenses', '10 Printed Comic Books', 'Handwritten Thank You Letters from Students'],
        estimatedDeliveryMonth: 'Dec 2026',
        quantityLimit: 50,
        claimedCount: 22
      }
    ],
    updates: [
      {
        id: 'u-2-1',
        campaignId: 'camp-2',
        date: '2026-10-15',
        title: 'Audio recordings in Vijayawada Studio completed',
        content: 'We recorded 40 hours of voice-acted dialogue in pure, child-friendly Telugu. Kids won’t need to read heavy text to understand looping!',
        likesCount: 48
      }
    ],
    comments: [
      {
        id: 'c-2-1',
        campaignId: 'camp-2',
        authorName: 'Dr. Venkat Rao',
        authorCity: 'Hyderabad',
        isBacker: true,
        date: '2026-10-16',
        text: 'మా ఊరి బడికి 10 కిట్స్ స్పాన్సర్ చేశాను. ఇటువంటి గ్రామీణ ఆవిష్కరణలకు మనందరం అండగా నిలవాలి.'
      }
    ],
    faqs: [
      {
        question: 'Will this app ever show ads to children?',
        answer: 'Strictly zero ads. The app is 100% ad-free and privacy-respecting, with zero data collection.'
      }
    ],
    payoutStatus: {
      firstStageReleased: false,
      secondStageReleased: false,
      proofUploaded: false
    },
    createdAt: '2026-10-05'
  },
  {
    id: 'camp-3',
    title: 'WeaveCraft: Modern Cut Pochampally Handloom Apparel',
    tagline: 'Direct-to-consumer organic ikat shirts and workwear handcrafted by 35 traditional weaver families in Bhoodan Pochampally.',
    category: 'Fashion',
    city: 'Pochampally',
    state: 'Telangana',
    language: 'Telugu / English',
    founderId: 'f-3',
    founder: {
      id: 'f-3',
      name: 'Mallesham Chary',
      city: 'Pochampally',
      state: 'Telangana',
      avatarBg: 'from-amber-700 to-rose-700',
      initials: 'MC',
      bio: 'Master weaver and community collective organizer. Fighting middleman exploitation so 82% of retail price reaches the artisan.',
      entityType: 'LLP',
      kycVerified: true,
      bankVerified: true,
      phone: '+91 97012 34567',
      email: 'mallesham.weave@gmail.com',
      pastCampaignsCount: 2,
      deliveryTrackRecord: 'Shipped 450 orders on time in prior community drive'
    },
    goalAmount: 800000,
    raisedAmount: 960000,
    backersCount: 312,
    daysLeft: 5,
    status: 'funded',
    communityValidated: true,
    meritScore: {
      publicBacking: 30,
      realCustomers: 19,
      deliveryRecord: 19,
      workingProduct: 13,
      founderCommitment: 9,
      communityVotes: 5,
      totalScore: 88
    },
    cardGradient: 'from-rose-600 to-amber-700',
    iconName: 'Scissors',
    pitchVideoPlaceholder: {
      duration: '4:10',
      aspectRatio: '16:9',
      hasDemo: true
    },
    story: {
      problem: 'Master weavers spend 3 weeks tying and dyeing threads for a single warp, but wholesale middlemen buy at cut-throat rates (₹800/piece) while luxury retail stores in Mumbai mark them up to ₹6,500.',
      solution: 'WeaveCraft creates contemporary, tailored office shirts, dresses, and unisex jackets using authentic double-ikat cotton directly from loom to backer wardrobe.',
      whoWeAre: 'A collective of 35 traditional weaver households in Yadadri Bhoodan Pochampally.',
      fundUsage: '60% upfront yarn procurement and fair artisan wages; 25% precision modern tailoring and bio-washing; 15% eco-friendly packaging.',
      timeline: 'Yarns are dyed. Loom warping in progress. Tailoring batch starts November 15. All backer shirts dispatched December 2026.',
      risks: 'Monsoon humidity can slightly extend natural vegetable dye drying times. We have built a 10-day buffer into our shipping schedule.'
    },
    rewardTiers: [
      {
        id: 'r-3-1',
        campaignId: 'camp-3',
        title: 'Ikat Pocket Handkerchief & Scarf Combo',
        price: 699,
        description: 'Set of 2 authentic vegetable-dyed Pochampally pocket squares + 1 lightweight unisex neck scarf.',
        items: ['2x Ikat Handkerchiefs', '1x Ikat Neck Scarf', 'Artisan signature card'],
        estimatedDeliveryMonth: 'Nov 2026',
        quantityLimit: 200,
        claimedCount: 160
      },
      {
        id: 'r-3-2',
        campaignId: 'camp-3',
        title: 'Modern Tailored Pochampally Shirt',
        price: 1999,
        description: '100% breathable organic handloom cotton shirt, custom stitched to your size (S to 3XL). Pre-washed and anti-shrink.',
        items: ['1x Tailored Double-Ikat Shirt', 'Wooden keepsake packaging', 'Certificate of GI Authenticity'],
        estimatedDeliveryMonth: 'Dec 2026',
        quantityLimit: 300,
        claimedCount: 215
      }
    ],
    updates: [
      {
        id: 'u-3-1',
        campaignId: 'camp-3',
        date: '2026-10-20',
        title: 'Warp tying ceremony held at village temple',
        content: 'All 35 loom master weavers gathered today to initiate the warp setup for the Bharateeyan backer batch. Photos attached!',
        likesCount: 92
      }
    ],
    comments: [
      {
        id: 'c-3-1',
        campaignId: 'camp-3',
        authorName: 'Kavita Menon',
        authorCity: 'Bengaluru',
        isBacker: true,
        date: '2026-10-21',
        text: 'Pre-ordered two shirts for my husband and myself. Direct payment to weavers is the only real way to preserve Indian heritage.'
      }
    ],
    faqs: [
      {
        question: 'How do I choose my size?',
        answer: 'Right after campaign completion, you will receive a measurement confirmation link on WhatsApp to choose your exact fit and sleeve length.'
      }
    ],
    payoutStatus: {
      firstStageReleased: true,
      secondStageReleased: false,
      proofUploaded: true,
      proofUrl: 'https://example.com/pochampally-loom-batch-proof.jpg'
    },
    createdAt: '2026-09-28'
  },
  {
    id: 'camp-4',
    title: 'MilletBites: Low-GI Ancient Grain Snacks',
    tagline: 'Wood-pressed cold oil roasted finger millet & barnyard cookies with zero palm oil, zero maida, sweetened only with organic Kakira jaggery.',
    category: 'Food',
    city: 'Karimnagar',
    state: 'Telangana',
    language: 'Telugu / Hindi / English',
    founderId: 'f-4',
    founder: {
      id: 'f-4',
      name: 'Padma Lakshmi',
      city: 'Karimnagar',
      state: 'Telangana',
      avatarBg: 'from-emerald-700 to-amber-700',
      initials: 'PL',
      bio: 'Nutritionist and rural women self-help group leader empowering 40 farm women to process dryland millets locally.',
      entityType: 'Sole Proprietor',
      kycVerified: true,
      bankVerified: true,
      phone: '+91 94901 87654',
      email: 'padma.milletbites@gmail.com',
      pastCampaignsCount: 0,
      deliveryTrackRecord: 'Local FSSAI licensed workshop with 200kg/day certified processing capacity'
    },
    goalAmount: 500000,
    raisedAmount: 462000,
    backersCount: 228,
    daysLeft: 3,
    status: 'ending_soon',
    communityValidated: false,
    meritScore: {
      publicBacking: 25,
      realCustomers: 18,
      deliveryRecord: 11,
      workingProduct: 13,
      founderCommitment: 8,
      communityVotes: 4,
      totalScore: 79
    },
    cardGradient: 'from-amber-600 to-emerald-700',
    iconName: 'Wheat',
    pitchVideoPlaceholder: {
      duration: '3:15',
      aspectRatio: '16:9',
      hasDemo: true
    },
    story: {
      problem: 'Most supermarket "diet" biscuits contain 60% refined wheat flour (maida), hydrogenated palm oil, and artificial emulsifiers that spike blood sugar.',
      solution: 'MilletBites creates genuinely diabetic-safe, crunchy roasted snacks made from 100% locally grown Ragi, Jowar, and Bajra using traditional slow-roasting pans and cold-pressed sesame oil.',
      whoWeAre: 'A women-led cooperative based in Karimnagar rural mandal.',
      fundUsage: '50% nitrogen-flush automatic pouch packaging machine; 30% bulk purchase of harvest millets directly from dryland farmers; 20% backer shipping boxes.',
      timeline: 'FSSAI audit completed. Packaging unit arrives November 10. Freshly roasted snack hampers ship to all backers by November 30, 2026.',
      risks: 'Maintaining shelf-life without chemical preservatives. We have achieved 6 months stability through inert nitrogen packaging tested at CFTRI Hyderabad.'
    },
    rewardTiers: [
      {
        id: 'r-4-1',
        campaignId: 'camp-4',
        title: 'Taster Hamper (4 Snack Boxes)',
        price: 599,
        description: 'Contains 1 box Ragi Almond Crunch, 1 box Jowar Masala Crisps, 1 box Foxtail Khakhra, and 1 box Bajra Mathri.',
        items: ['4x 200g Snack Boxes', 'Nutritional Factsheet', 'Handwritten note'],
        estimatedDeliveryMonth: 'Nov 2026',
        quantityLimit: 400,
        claimedCount: 175
      },
      {
        id: 'r-4-2',
        campaignId: 'camp-4',
        title: 'Quarterly Healthy Pantry Subscription (12 Boxes)',
        price: 1599,
        description: '3 months supply of fresh roasted snacks delivered in 3 monthly dispatches directly to your doorstep.',
        items: ['12x 200g Assorted Millet Snack Packs', 'Free Shipping Across India', 'Founder VIP Discount Club'],
        estimatedDeliveryMonth: 'Dec 2026',
        quantityLimit: 100,
        claimedCount: 45
      }
    ],
    updates: [
      {
        id: 'u-4-1',
        campaignId: 'camp-4',
        date: '2026-10-23',
        title: 'Only 3 days left! 92% funded',
        content: 'We need just ₹38,000 more to unlock the nitrogen packaging equipment. Please share with your friends and family on WhatsApp!',
        likesCount: 56
      }
    ],
    comments: [
      {
        id: 'c-4-1',
        campaignId: 'camp-4',
        authorName: 'Rajesh Sharma',
        authorCity: 'Indore',
        isBacker: true,
        date: '2026-10-24',
        text: 'मातृशक्ति को नमन। पाम ऑयल मुक्त स्नैक्स की देश को बहुत ज़रूरत है। मैंने 12 बॉक्स का पैक ऑर्डर किया है।'
      }
    ],
    faqs: [
      {
        question: 'Are there any added artificial sugars or preservatives?',
        answer: 'Zero chemical preservatives or refined sugar. We only use organic mineral-rich Kakira jaggery and rock salt.'
      }
    ],
    payoutStatus: {
      firstStageReleased: false,
      secondStageReleased: false,
      proofUploaded: false
    },
    createdAt: '2026-10-02'
  },
  {
    id: 'camp-5',
    title: 'SurakshaHelmet: Collision-Alert Smart Helmet',
    tagline: 'ISI-approved helmet with built-in accelerometer, fall detection, automatic SOS to emergency contacts, and active anti-fog visor.',
    category: 'Hardware',
    city: 'Indore',
    state: 'Madhya Pradesh',
    language: 'Hindi / English',
    founderId: 'f-5',
    founder: {
      id: 'f-5',
      name: 'Vikas Patidar',
      city: 'Indore',
      state: 'Madhya Pradesh',
      avatarBg: 'from-blue-700 to-indigo-900',
      initials: 'VP',
      bio: 'Diploma in Automobile Engineering from SGSITS Indore. Survived a highway accident and vowed to make high-tech rider safety affordable.',
      entityType: 'Private Limited',
      kycVerified: true,
      bankVerified: true,
      phone: '+91 98260 99887',
      email: 'vikas.suraksha@gmail.com',
      pastCampaignsCount: 0,
      deliveryTrackRecord: 'Completed 15 crash-test simulations; PCB prototype validated at Indore lab'
    },
    goalAmount: 1500000,
    raisedAmount: 720000,
    backersCount: 165,
    daysLeft: 19,
    status: 'live',
    communityValidated: false,
    meritScore: {
      publicBacking: 19,
      realCustomers: 17,
      deliveryRecord: 11,
      workingProduct: 13,
      founderCommitment: 8,
      communityVotes: 3,
      totalScore: 71
    },
    cardGradient: 'from-blue-600 to-slate-800',
    iconName: 'Shield',
    pitchVideoPlaceholder: {
      duration: '3:30',
      aspectRatio: '16:9',
      hasDemo: true
    },
    story: {
      problem: 'Every day in India, over 120 two-wheeler riders die due to delayed emergency response after crashes on state highways and remote bypass roads.',
      solution: 'SurakshaHelmet features an integrated MEMS sensor that distinguishes a drop from a real crash. In an impact, it blinks ultra-bright LEDs and sends a GPS location SMS via the rider phone in under 8 seconds.',
      whoWeAre: 'A 4-member hardware engineering outfit in Indore.',
      fundUsage: '60% injection moulding dies for ISI-certified outer shell; 25% SMT PCB manufacturing batch; 15% shock-absorbing EPS liner procurement.',
      timeline: 'Tooling complete by December. First 200 helmets ship to backers in January 2027.',
      risks: 'BIS / ISI certification testing queues can take 4 weeks. We have already passed pre-compliance impact tests.'
    },
    rewardTiers: [
      {
        id: 'r-5-1',
        campaignId: 'camp-5',
        title: 'Early Bird Backer: SurakshaHelmet V1',
        price: 2899,
        description: 'First production run unit with Bluetooth 5.2 link, crash SOS, optical anti-fog visor, and matte black finish.',
        items: ['1x Smart Helmet (Choose M/L/XL)', 'Type-C Fast Charging Cable', '1-Year Sensor Warranty'],
        estimatedDeliveryMonth: 'Jan 2027',
        quantityLimit: 250,
        claimedCount: 135
      },
      {
        id: 'r-5-2',
        campaignId: 'camp-5',
        title: 'Rider Duo Pack (His & Hers / 2 Helmets)',
        price: 5299,
        description: 'Two complete Suraksha smart helmets with custom laser engraved name tags on the rear collar.',
        items: ['2x Smart Helmets', '2x Charging Cables', '2x Engraved Nameplates'],
        estimatedDeliveryMonth: 'Jan 2027',
        quantityLimit: 75,
        claimedCount: 22
      }
    ],
    updates: [
      {
        id: 'u-5-1',
        campaignId: 'camp-5',
        date: '2026-10-19',
        title: 'Live Drop Test Video Uploaded',
        content: 'Dropped from 3 meters onto an anvil at 28 km/h. Sensor triggered SOS in 1.4 seconds with zero false positives.',
        likesCount: 81
      }
    ],
    comments: [
      {
        id: 'c-5-1',
        campaignId: 'camp-5',
        authorName: 'Deepak Verma',
        authorCity: 'Bhopal',
        isBacker: true,
        date: '2026-10-21',
        text: 'मैंने भोपाल से प्री-ऑर्डर किया है। हाईवे पर चलने वाले हम जैसे लोगों के लिए यह वरदान है।'
      }
    ],
    faqs: [
      {
        question: 'How long does the battery last on a single charge?',
        answer: 'Over 25 days on normal commuting (2 hours riding per day). Recharges via any USB Type-C phone charger.'
      }
    ],
    payoutStatus: {
      firstStageReleased: false,
      secondStageReleased: false,
      proofUploaded: false
    },
    createdAt: '2026-10-10'
  },
  {
    id: 'camp-6',
    title: 'EcoPattra: Biodegradable Areca-Leaf Tableware',
    tagline: 'Export-grade plates, meal trays, and bowls made from fallen areca palm leaves. Zero trees cut, 100% compostable in 60 days.',
    category: 'Clean Energy',
    city: 'Hubballi',
    state: 'Karnataka',
    language: 'Kannada / English',
    founderId: 'f-6',
    founder: {
      id: 'f-6',
      name: 'Basavaraj Hiremath',
      city: 'Hubballi',
      state: 'Karnataka',
      avatarBg: 'from-emerald-600 to-teal-800',
      initials: 'BH',
      bio: 'Grassroots rural manufacturing promoter connecting 120 farm families who gather naturally shed areca sheaths in Malnad.',
      entityType: 'Private Limited',
      kycVerified: true,
      bankVerified: true,
      phone: '+91 94801 11223',
      email: 'basava.ecopattra@gmail.com',
      pastCampaignsCount: 1,
      deliveryTrackRecord: 'Successfully fulfilled 3 corporate eco-events with zero broken goods'
    },
    goalAmount: 900000,
    raisedAmount: 1140000,
    backersCount: 284,
    daysLeft: 11,
    status: 'funded',
    communityValidated: true,
    meritScore: {
      publicBacking: 28,
      realCustomers: 18,
      deliveryRecord: 17,
      workingProduct: 14,
      founderCommitment: 8,
      communityVotes: 5,
      totalScore: 82
    },
    cardGradient: 'from-emerald-600 to-lime-800',
    iconName: 'Leaf',
    pitchVideoPlaceholder: {
      duration: '2:40',
      aspectRatio: '16:9',
      hasDemo: true
    },
    story: {
      problem: 'Single-use plastic and thermocol plates take 500 years to degrade, releasing carcinogens into hot Indian curries and sambar.',
      solution: 'EcoPattra uses high-temperature steam compression to sanitize and shape naturally fallen areca palm sheaths into sturdy, microwave-safe, leak-proof party plates and catering boxes.',
      whoWeAre: 'A rural cluster enterprise operating between Hubballi and Sirsi.',
      fundUsage: '60% 4-station hydraulic heat press machinery; 25% advance leaf procurement payments to tribal foragers; 15% recycled corrugated carton packaging.',
      timeline: 'Machinery arrives next week. Tableware party boxes ship December 2026 in time for year-end family celebrations.',
      risks: 'Leaf supply is seasonal. We have warehouse storage for 150,000 dry sheaths ensuring year-round manufacturing.'
    },
    rewardTiers: [
      {
        id: 'r-6-1',
        campaignId: 'camp-6',
        title: 'Eco Party Box (100 Pieces)',
        price: 1299,
        description: '50 large 10-inch dinner plates + 25 3-compartment snack plates + 25 curry bowls + 100 wooden spoons.',
        items: ['100 Biodegradable Tableware Items', 'Free Home Delivery Across India', 'Compost Guide'],
        estimatedDeliveryMonth: 'Dec 2026',
        quantityLimit: 300,
        claimedCount: 198
      },
      {
        id: 'r-6-2',
        campaignId: 'camp-6',
        title: 'Wedding / Community Event Mega Pack (500 Pieces)',
        price: 4999,
        description: 'Complete 500-piece feast pack for family gatherings, poojas, or green weddings.',
        items: ['250 Large 12-inch Traditional Thali Plates', '150 Curry Bowls', '100 Dessert Cups', '500 Birchwood Cutlery'],
        estimatedDeliveryMonth: 'Dec 2026',
        quantityLimit: 50,
        claimedCount: 38
      }
    ],
    updates: [
      {
        id: 'u-6-1',
        campaignId: 'camp-6',
        date: '2026-10-18',
        title: 'Quality inspection passed for food-grade safety',
        content: 'NABL accredited test reports confirm zero heavy metals, zero chemical residues, and 100% heat resistance up to 140°C.',
        likesCount: 52
      }
    ],
    comments: [
      {
        id: 'c-6-1',
        campaignId: 'camp-6',
        authorName: 'Girish Rao',
        authorCity: 'Bengaluru',
        isBacker: true,
        date: '2026-10-19',
        text: 'Pre-ordered for our housing society Diwali get-together. Plastic-free India starts from such grassroots efforts.'
      }
    ],
    faqs: [
      {
        question: 'Can these plates hold hot sambar or dal without leaking?',
        answer: 'Yes! Areca leaves naturally hold hot boiling liquids for over 4 hours without softening or leaking.'
      }
    ],
    payoutStatus: {
      firstStageReleased: true,
      secondStageReleased: false,
      proofUploaded: false
    },
    createdAt: '2026-10-03'
  },
  {
    id: 'camp-7',
    title: 'RaituKural: Voice-First Farm Advisory in Regional Dialects',
    tagline: 'Simple voice-activated AI assistant accessible via regular missed calls or basic feature phones in 14 local Telugu and Kannada sub-dialects.',
    category: 'Apps',
    city: 'Guntur',
    state: 'Andhra Pradesh',
    language: 'Telugu',
    founderId: 'f-7',
    founder: {
      id: 'f-7',
      name: 'Kalyan Chakravarthy',
      city: 'Guntur',
      state: 'Andhra Pradesh',
      avatarBg: 'from-sky-700 to-indigo-900',
      initials: 'KC',
      bio: 'Son of small cotton farmers in Tenali. Built voice speech models trained on rural agrarian accents and slang.',
      entityType: 'LLP',
      kycVerified: true,
      bankVerified: true,
      phone: '+91 98492 33445',
      email: 'kalyan.kural@gmail.com',
      pastCampaignsCount: 0,
      deliveryTrackRecord: 'Live IVR pilot handling 1,200 farmer queries daily across Guntur & Prakasam'
    },
    goalAmount: 750000,
    raisedAmount: 487500,
    backersCount: 172,
    daysLeft: 14,
    status: 'live',
    communityValidated: false,
    meritScore: {
      publicBacking: 20,
      realCustomers: 17,
      deliveryRecord: 11,
      workingProduct: 14,
      founderCommitment: 8,
      communityVotes: 3,
      totalScore: 73
    },
    cardGradient: 'from-blue-700 to-indigo-800',
    iconName: 'Mic',
    pitchVideoPlaceholder: {
      duration: '3:05',
      aspectRatio: '16:9',
      hasDemo: true
    },
    story: {
      problem: 'Most agri apps fail because farmers cannot type complex English or Sanskritized scientific pest names. They need immediate spoken guidance in their native dialect when standing in the field.',
      solution: 'A farmer calls our local phone number, asks a question in casual spoken language ("మా పత్తి చేనులో ఆకులు ఎర్రబడుతున్నాయి, ఏం పిచికారీ చేయాలి?"), and receives an immediate certified agronomist response.',
      whoWeAre: 'A small computational linguistics and agronomy group in Guntur.',
      fundUsage: '45% telephony telecom gateway capacity & cloud speech inference servers; 35% on-the-ground validation with Krishi Vigyan Kendras; 20% backer perk logistics.',
      timeline: 'Full 14-district Telugu dialing gateway launches December 2026.',
      risks: 'Telecom operator IVR API latency. We have redundant SIP routing via two Tier-1 Indian telecom providers.'
    },
    rewardTiers: [
      {
        id: 'r-7-1',
        campaignId: 'camp-7',
        title: 'Sponsor 1 Farmer for 1 Year Unlimited Voice Advisory',
        price: 699,
        description: 'Provide an entire year of unlimited automated pest, weather, and mandi price alerts to a smallholder farmer.',
        items: ['1 Year Farm Subscription Card', 'Sponsorship Certificate with Farmer Name & Mandi', 'Monthly Progress Digest'],
        estimatedDeliveryMonth: 'Dec 2026',
        quantityLimit: 500,
        claimedCount: 140
      },
      {
        id: 'r-7-2',
        campaignId: 'camp-7',
        title: 'Gram Panchayat Digital Kiosk Package (50 Farmers)',
        price: 9999,
        description: 'Deploy solar-backed audio speaker kiosk in your village panchayat office with dedicated helpline access.',
        items: ['Outdoor Bluetooth Speakerphone Unit', '50 Farmer Registration Cards', 'Honorary Village Supporter Plaque'],
        estimatedDeliveryMonth: 'Jan 2027',
        quantityLimit: 25,
        claimedCount: 8
      }
    ],
    updates: [
      {
        id: 'u-7-1',
        campaignId: 'camp-7',
        date: '2026-10-21',
        title: 'Mandi price prediction model hits 94% accuracy',
        content: 'Back-tested against Khammam and Warangal APMC real auction records. Farmers can now time their harvest pickups effectively.',
        likesCount: 37
      }
    ],
    comments: [
      {
        id: 'c-7-1',
        campaignId: 'camp-7',
        authorName: 'Nageswara Rao',
        authorCity: 'Tenali',
        isBacker: true,
        date: '2026-10-22',
        text: 'మా ఊరి రైతుల కోసం 5 స్పాన్సర్‌షిప్లు తీసుకున్నాను. టైప్ చేయడం రాని వారికి వాయిస్ కాల్ చాలా ఉపయోగం.'
      }
    ],
    faqs: [
      {
        question: 'Does the farmer need a smartphone?',
        answer: 'No! It works on simple basic button phones costing ₹1,000 via regular phone calls.'
      }
    ],
    payoutStatus: {
      firstStageReleased: false,
      secondStageReleased: false,
      proofUploaded: false
    },
    createdAt: '2026-10-08'
  },
  {
    id: 'camp-8',
    title: 'JalParikshak: Low-Cost Fluoride & Arsenic Water Test Kit',
    tagline: 'Instant colorimetric field test strip reader providing quantitative fluoride, arsenic, and nitrate readings in 90 seconds for rural borewells.',
    category: 'Health',
    city: 'Nagpur',
    state: 'Maharashtra',
    language: 'Marathi / Hindi / English',
    founderId: 'f-8',
    founder: {
      id: 'f-8',
      name: 'Dr. Archana Deshmukh',
      city: 'Nagpur',
      state: 'Maharashtra',
      avatarBg: 'from-cyan-700 to-indigo-900',
      initials: 'AD',
      bio: 'Applied chemist working in Vidarbha water testing camps. Designed a simple handheld photometer that matches ₹80,000 lab instruments.',
      entityType: 'Private Limited',
      kycVerified: true,
      bankVerified: true,
      phone: '+91 97650 44556',
      email: 'archana.jal@gmail.com',
      pastCampaignsCount: 0,
      deliveryTrackRecord: 'Field-tested across 40 fluoride-affected villages in Chandrapur'
    },
    goalAmount: 850000,
    raisedAmount: 705500,
    backersCount: 198,
    daysLeft: 7,
    status: 'live',
    communityValidated: false,
    meritScore: {
      publicBacking: 24,
      realCustomers: 18,
      deliveryRecord: 12,
      workingProduct: 13,
      founderCommitment: 7,
      communityVotes: 3,
      totalScore: 77
    },
    cardGradient: 'from-cyan-600 to-blue-800',
    iconName: 'Droplet',
    pitchVideoPlaceholder: {
      duration: '3:20',
      aspectRatio: '16:9',
      hasDemo: true
    },
    story: {
      problem: 'Over 66 million Indians suffer from dental or skeletal fluorosis due to contaminated groundwater. Lab tests take weeks and cost ₹1,500 per sample.',
      solution: 'JalParikshak is a pocket-sized optical scanner with chemical test reagent vials that costs only ₹15 per test, giving an instant digital reading on a backlit LCD screen.',
      whoWeAre: 'A Nagpur-based team of chemists and embedded hardware tinkerers.',
      fundUsage: '50% precision LED sensor assembly and 3D printed rugged silicone cases; 35% bulk synthesis of safe colorimetric reagents; 15% courier boxes.',
      timeline: 'Production commences mid-November. Test kits ship December 2026.',
      risks: 'Reagent shelf life under high summer heat. We use vacuum-sealed nitrogen foil blister packaging good for 18 months.'
    },
    rewardTiers: [
      {
        id: 'r-8-1',
        campaignId: 'camp-8',
        title: 'Home & Well Water Testing Kit (50 Tests)',
        price: 1899,
        description: 'Complete handheld digital photometer reader + 50 fluoride & arsenic reagent strips + calibration vial.',
        items: ['1x JalParikshak Scanner', '50 Test Strips', '1-Year Warranty & App Sync'],
        estimatedDeliveryMonth: 'Dec 2026',
        quantityLimit: 250,
        claimedCount: 142
      },
      {
        id: 'r-8-2',
        campaignId: 'camp-8',
        title: 'Panchayat & School Community Kit (300 Tests)',
        price: 4999,
        description: 'Heavy-duty scanner + 300 test reagents + water filtration advisory guide for village water committees.',
        items: ['1x Ruggedized Field Scanner', '300 Test Reagents', 'Safe Water Signage Board'],
        estimatedDeliveryMonth: 'Dec 2026',
        quantityLimit: 60,
        claimedCount: 28
      }
    ],
    updates: [
      {
        id: 'u-8-1',
        campaignId: 'camp-8',
        date: '2026-10-20',
        title: 'Comparison tests against spectrophotometer complete',
        content: 'Our handheld unit showed 98.6% R-squared correlation with standard university lab equipment at a fraction of the cost!',
        likesCount: 61
      }
    ],
    comments: [
      {
        id: 'c-8-1',
        campaignId: 'camp-8',
        authorName: 'Prakash Patil',
        authorCity: 'Chandrapur',
        isBacker: true,
        date: '2026-10-22',
        text: 'विदर्भातील फ्लोरोसिसग्रस्त गावांना याची खूप गरज आहे. मी दोन किट्स बुक केल्या आहेत.'
      }
    ],
    faqs: [
      {
        question: 'Is it safe to use by non-chemists?',
        answer: 'Yes, reagents are enclosed in sealed squeeze droppers with zero direct contact with hazardous chemicals.'
      }
    ],
    payoutStatus: {
      firstStageReleased: false,
      secondStageReleased: false,
      proofUploaded: false
    },
    createdAt: '2026-10-04'
  },
  {
    id: 'camp-9',
    title: 'AdivasiVana: Wild Forest Honey & Cold-Pressed Mahua Skincare',
    tagline: 'Pure medicinal forest honey, sal butter body creams, and cold-pressed mahua seed balms harvested by indigenous Santhal and Gond cooperatives.',
    category: 'Health',
    city: 'Bhubaneswar',
    state: 'Odisha',
    language: 'Odia / Hindi / English',
    founderId: 'f-9',
    founder: {
      id: 'f-9',
      name: 'Saloni Murmu',
      city: 'Bhubaneswar',
      state: 'Odisha',
      avatarBg: 'from-amber-800 to-rose-900',
      initials: 'SM',
      bio: 'Tribal youth leader and botanist organizing 110 forest gatherers in Mayurbhanj to ensure fair community price realization.',
      entityType: 'LLP',
      kycVerified: true,
      bankVerified: true,
      phone: '+91 94370 77889',
      email: 'saloni.adivasi@gmail.com',
      pastCampaignsCount: 1,
      deliveryTrackRecord: 'Delivered 800 jars of certified wild honey to direct backers last winter'
    },
    goalAmount: 700000,
    raisedAmount: 895000,
    backersCount: 340,
    daysLeft: 6,
    status: 'funded',
    communityValidated: true,
    meritScore: {
      publicBacking: 29,
      realCustomers: 18,
      deliveryRecord: 18,
      workingProduct: 13,
      founderCommitment: 9,
      communityVotes: 5,
      totalScore: 85
    },
    cardGradient: 'from-amber-700 to-rose-800',
    iconName: 'HeartHandshake',
    pitchVideoPlaceholder: {
      duration: '3:50',
      aspectRatio: '16:9',
      hasDemo: true
    },
    story: {
      problem: 'Commercial honey on store shelves is frequently diluted with inverted sugar syrup, while tribal gatherers risking their lives in deep forests receive less than ₹120/kg from exploitative traders.',
      solution: 'AdivasiVana brings pure, raw, unheated multi-floral wild honey and indigenous sal butter body balms directly from Mayurbhanj forest cooperatives to your home.',
      whoWeAre: 'A registered tribal producer collective in Similipal biosphere.',
      fundUsage: '55% stainless steel hygienic honey processing and cold settling tanks; 25% custom glass jars and wooden spoons; 20% eco-friendly protective packaging.',
      timeline: 'Winter honey harvest underway. Extraction and bottling starts November 15. Dispatched to backers December 2026.',
      risks: 'Glass jar breakage during long-distance transit. We use honeycomb recycled paper padding with zero bubble plastic.'
    },
    rewardTiers: [
      {
        id: 'r-9-1',
        campaignId: 'camp-9',
        title: 'Wild Forest Raw Honey Duo (1kg Total)',
        price: 899,
        description: 'Two 500g glass jars of raw unpasteurized multi-floral forest honey with wild pollen intact + carved wooden honey dipper.',
        items: ['2x 500g Glass Jars Honey', '1x Carved Neem Wood Honey Dipper', 'Tribal Producer Certificate'],
        estimatedDeliveryMonth: 'Dec 2026',
        quantityLimit: 400,
        claimedCount: 260
      },
      {
        id: 'r-9-2',
        campaignId: 'camp-9',
        title: 'Forest Wellness Hamper (Honey + Sal Butter Balm)',
        price: 1899,
        description: '1kg Wild Honey + 200g Organic Sal Butter Winter Cream + 100g Mahua Seed Lip & Heel Balm.',
        items: ['2x 500g Wild Honey', '1x 200g Sal Butter Cream', '1x 100g Mahua Balm', 'Handwoven Sabai Grass Basket'],
        estimatedDeliveryMonth: 'Dec 2026',
        quantityLimit: 150,
        claimedCount: 75
      }
    ],
    updates: [
      {
        id: 'u-9-1',
        campaignId: 'camp-9',
        date: '2026-10-17',
        title: 'NMR test results confirm 100% pure wild honey',
        content: 'German lab NMR test reports returned zero adulteration, zero C4 sugar markers, and rich anti-oxidant levels. Proof uploaded!',
        likesCount: 77
      }
    ],
    comments: [
      {
        id: 'c-9-1',
        campaignId: 'camp-9',
        authorName: 'Arpita Mohanty',
        authorCity: 'Bhubaneswar',
        isBacker: true,
        date: '2026-10-18',
        text: 'Last year I tasted their honey. It has a distinctive floral aroma that store brands can never match. Backed again!'
      }
    ],
    faqs: [
      {
        question: 'Does wild honey crystallize in winter?',
        answer: 'Yes! Pure raw honey with high pollen content naturally crystallizes in cold weather. It is proof of authenticity and can be gently warmed in warm water.'
      }
    ],
    payoutStatus: {
      firstStageReleased: true,
      secondStageReleased: false,
      proofUploaded: true,
      proofUrl: 'https://example.com/adivasi-bottling-proof.jpg'
    },
    createdAt: '2026-09-30'
  },
  {
    id: 'camp-10',
    title: 'GatiRetrofit: Electric Conversion Kit for Passenger Auto-Rickshaws',
    tagline: 'Converts smoky 2-stroke and 4-stroke autos into 100% electric in 4 hours. Cuts driver fuel cost from ₹400/day to ₹45/day.',
    category: 'Hardware',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    language: 'Tamil / English',
    founderId: 'f-10',
    founder: {
      id: 'f-10',
      name: 'M. Senthil Nathan',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      avatarBg: 'from-amber-600 to-indigo-900',
      initials: 'SN',
      bio: 'Veteran lathe workshop machinist & auto-mechanic mentor with 18 years repairing vehicles in Ganapathy, Coimbatore.',
      entityType: 'Private Limited',
      kycVerified: true,
      bankVerified: true,
      phone: '+91 98422 66778',
      email: 'senthil.gatiev@gmail.com',
      pastCampaignsCount: 0,
      deliveryTrackRecord: 'Built 8 road-running EV auto conversions tested over 45,000 km in city traffic'
    },
    goalAmount: 2000000,
    raisedAmount: 1120000,
    backersCount: 154,
    daysLeft: 18,
    status: 'live',
    communityValidated: false,
    meritScore: {
      publicBacking: 21,
      realCustomers: 18,
      deliveryRecord: 12,
      workingProduct: 14,
      founderCommitment: 8,
      communityVotes: 4,
      totalScore: 75
    },
    cardGradient: 'from-emerald-700 to-slate-900',
    iconName: 'Zap',
    pitchVideoPlaceholder: {
      duration: '4:20',
      aspectRatio: '16:9',
      hasDemo: true
    },
    story: {
      problem: 'Auto drivers in Indian cities spend over ₹12,000 every month on petrol or LPG, leaving them with meagre earnings. Buying a brand new EV auto costs ₹3.8 lakh which requires huge loans.',
      solution: 'GatiRetrofit replaces the petrol engine with a high-torque BLDC motor, smart regenerative controller, and swappable LFP battery pack that bolts directly onto existing chassis in under 4 hours.',
      whoWeAre: 'A precision engineering workshop in Coimbatore.',
      fundUsage: '60% procurement of Grade-A LFP battery cells and AIS-156 safety certified BMS; 25% motor mounting precision CNC brackets; 15% testing and backer reward tools.',
      timeline: 'Batch conversion kits begin field dispatch January 2027.',
      risks: 'State RTO retrofitting endorsement documentation can vary by state. We provide pre-filled RTO Form 22 and ARAI test certs.'
    },
    rewardTiers: [
      {
        id: 'r-10-1',
        campaignId: 'camp-10',
        title: 'EV Supporter & Mechanic Training Manual + Tool',
        price: 999,
        description: 'Comprehensive 120-page illustrated wiring and conversion handbook + digital diagnostic voltmeter.',
        items: ['Illustrated EV Retrofit Manual', 'Digital Multimeter', 'Backer Name on Pioneer Chassis'],
        estimatedDeliveryMonth: 'Dec 2026',
        quantityLimit: 300,
        claimedCount: 112
      },
      {
        id: 'r-10-2',
        campaignId: 'camp-10',
        title: 'Complete Auto Retrofit Kit (Driver Early Bird)',
        price: 49999,
        description: 'Complete bolt-on kit: 5kW BLDC motor, 72V 100Ah LFP battery pack, smart controller, digital dashboard, and wiring harness.',
        items: ['Complete Powertrain Kit', '72V Fast Charger', '3-Year Battery Replacement Warranty'],
        estimatedDeliveryMonth: 'Jan 2027',
        quantityLimit: 20,
        claimedCount: 9
      }
    ],
    updates: [
      {
        id: 'u-10-1',
        campaignId: 'camp-10',
        date: '2026-10-22',
        title: 'Completed 120 km single-charge test with full 3-passenger load',
        content: 'Driven through Coimbatore city traffic with headlamps on. Battery retained 14% charge at destination with zero overheating!',
        likesCount: 68
      }
    ],
    comments: [
      {
        id: 'c-10-1',
        campaignId: 'camp-10',
        authorName: 'Murugan K',
        authorCity: 'Madurai',
        isBacker: true,
        date: '2026-10-23',
        text: 'எங்கள் ஆட்டோ ஓட்டுநர்களுக்கு இது பெரிய வரப்பிரசாதம். டீசல் விலை தினமும் ஏறிக்கொண்டிருக்கிறது.'
      }
    ],
    faqs: [
      {
        question: 'What is the top speed and climbing ability on flyovers?',
        answer: 'Top speed is governed at 55 km/h for safety, with instant electric torque easily climbing 14-degree flyovers with 4 passengers.'
      }
    ],
    payoutStatus: {
      firstStageReleased: false,
      secondStageReleased: false,
      proofUploaded: false
    },
    createdAt: '2026-10-06'
  },
  {
    id: 'camp-11',
    title: 'BhashaSetu: Regional Language Sarkari Exam Prep',
    tagline: 'High quality video lectures and mock tests in Hindi, Bhojpuri, and Awadhi for UP Police, SSC, and Railway exams. No expensive coaching required.',
    category: 'Education',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    language: 'Hindi',
    founderId: 'f-11',
    founder: {
      id: 'f-11',
      name: 'Anurag Tiwari',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
      avatarBg: 'from-orange-700 to-indigo-900',
      initials: 'AT',
      bio: 'Former village tutor who cleared 3 competitive exams and decided to democratize coaching for small-town aspirants.',
      entityType: 'LLP',
      kycVerified: true,
      bankVerified: true,
      phone: '+91 99350 12398',
      email: 'anurag.setu@gmail.com',
      pastCampaignsCount: 0,
      deliveryTrackRecord: 'Helped 420 rural students pass state exams through grassroots offline study circles'
    },
    goalAmount: 500000,
    raisedAmount: 305000,
    backersCount: 145,
    daysLeft: 16,
    status: 'live',
    communityValidated: false,
    meritScore: {
      publicBacking: 19,
      realCustomers: 18,
      deliveryRecord: 11,
      workingProduct: 13,
      founderCommitment: 8,
      communityVotes: 3,
      totalScore: 72
    },
    cardGradient: 'from-amber-600 to-red-800',
    iconName: 'BookOpen',
    pitchVideoPlaceholder: {
      duration: '2:55',
      aspectRatio: '16:9',
      hasDemo: true
    },
    story: {
      problem: 'Coaching centres in Prayagraj and Lucknow charge ₹35,000 for government exam classes, forcing poor village parents to take heavy interest loans.',
      solution: 'BhashaSetu provides clear, high-yield concept videos and 100 printed mock question booklets in everyday regional spoken Hindi.',
      whoWeAre: 'A small cadre of selected civil and railway officers who mentor students in their spare time.',
      fundUsage: '50% printing and logistics of high-quality physical test series booklets; 30% digital studio recording equipment; 20% backer delivery.',
      timeline: 'Mock series printing in November. Books ship December 2026.',
      risks: 'Paper cost inflation. We have pre-booked 50 reams of paper at wholesale rate.'
    },
    rewardTiers: [
      {
        id: 'r-11-1',
        campaignId: 'camp-11',
        title: 'Complete Exam Test Series (15 Printed Mock Papers)',
        price: 499,
        description: '15 Full-length printed OMR test booklets with step-by-step Hindi explanations delivered to your village address.',
        items: ['15 Printed Test Booklets', 'OMR Sheets Bundle', 'Lifetime App Access'],
        estimatedDeliveryMonth: 'Dec 2026',
        quantityLimit: 400,
        claimedCount: 110
      }
    ],
    updates: [
      {
        id: 'u-11-1',
        campaignId: 'camp-11',
        date: '2026-10-19',
        title: 'Completed General Studies syllabus breakdown in simple Hindi',
        content: 'All history and polity concepts condensed into visual mind-maps. Aspirants love the easy recall techniques.',
        likesCount: 41
      }
    ],
    comments: [
      {
        id: 'c-11-1',
        campaignId: 'camp-11',
        authorName: 'Ramesh Yadav',
        authorCity: 'Gorakhpur',
        isBacker: true,
        date: '2026-10-21',
        text: 'गाँव के बच्चों के लिए यह बहुत बड़ी मदद है। मैंने अपने छोटे भाई के लिए यह टेस्ट सीरीज़ ली है।'
      }
    ],
    faqs: [
      {
        question: 'Does it include official OMR answer sheets for practice?',
        answer: 'Yes! Exact duplicate OMR sheets are included so candidates can master timing and bubble-filling without exam anxiety.'
      }
    ],
    payoutStatus: {
      firstStageReleased: false,
      secondStageReleased: false,
      proofUploaded: false
    },
    createdAt: '2026-10-07'
  },
  {
    id: 'camp-12',
    title: 'KalamCraft: Natural Vegetable Dye Hand-Block Laptop Sleeves',
    tagline: 'Water-resistant, padded canvas laptop sleeves, tote bags, and tech organizers hand-printed with authentic Machilipatnam Kalamkari blocks.',
    category: 'Handicrafts',
    city: 'Machilipatnam',
    state: 'Andhra Pradesh',
    language: 'Telugu / English',
    founderId: 'f-12',
    founder: {
      id: 'f-12',
      name: 'B. Satyanarayana',
      city: 'Machilipatnam',
      state: 'Andhra Pradesh',
      avatarBg: 'from-amber-700 to-indigo-800',
      initials: 'BS',
      bio: 'Third generation master block carver and natural dyer preserving the 400-year-old art of Pedana Kalamkari.',
      entityType: 'Sole Proprietor',
      kycVerified: true,
      bankVerified: true,
      phone: '+91 94405 88990',
      email: 'satya.kalamkari@gmail.com',
      pastCampaignsCount: 1,
      deliveryTrackRecord: 'Successfully fulfilled 200 custom corporate gift sets in 2025'
    },
    goalAmount: 600000,
    raisedAmount: 720000,
    backersCount: 260,
    daysLeft: 9,
    status: 'funded',
    communityValidated: true,
    meritScore: {
      publicBacking: 28,
      realCustomers: 18,
      deliveryRecord: 17,
      workingProduct: 12,
      founderCommitment: 8,
      communityVotes: 4,
      totalScore: 81
    },
    cardGradient: 'from-amber-600 to-rose-900',
    iconName: 'Briefcase',
    pitchVideoPlaceholder: {
      duration: '3:35',
      aspectRatio: '16:9',
      hasDemo: true
    },
    story: {
      problem: 'Most modern tech accessories are made of cheap synthetic polyester imported from overseas, while India traditional block-printers struggle for steady work.',
      solution: 'We marry traditional teakwood hand-block printing using myrobalan nut and madder root dyes with modern water-resistant organic canvas and shockproof foam padding for laptops (13" to 16").',
      whoWeAre: 'A family workshop of 14 artisans and tailors in Pedana.',
      fundUsage: '55% heavy organic cotton canvas and certified non-toxic plant dyes; 30% precision stitching and YKK brass zippers; 15% courier packaging.',
      timeline: 'Fabric printed and river-washed. Stitching in progress. Dispatched to backers November 2026.',
      risks: 'Heavy river currents during washing. We have an on-site filtered recirculating water tank to maintain non-stop washing.'
    },
    rewardTiers: [
      {
        id: 'r-12-1',
        campaignId: 'camp-12',
        title: 'Kalamkari Tech Cable Organizer Pouch',
        price: 599,
        description: 'Compact 3-fold travel organizer for chargers, earphones, and mouse, printed with Tree of Life motif.',
        items: ['1x Padded Cable Organizer', 'Artisan signature card', 'GI Authenticity Tag'],
        estimatedDeliveryMonth: 'Nov 2026',
        quantityLimit: 300,
        claimedCount: 180
      },
      {
        id: 'r-12-2',
        campaignId: 'camp-12',
        title: 'Padded Kalamkari Laptop Sleeve (13" / 14" / 16")',
        price: 1399,
        description: 'Shockproof memory foam sleeve with waterproof lining and external zipper pocket for adapter.',
        items: ['1x Hand-printed Laptop Sleeve', 'Dust Cover', 'Free Shipping Across India'],
        estimatedDeliveryMonth: 'Dec 2026',
        quantityLimit: 250,
        claimedCount: 165
      }
    ],
    updates: [
      {
        id: 'u-12-1',
        campaignId: 'camp-12',
        date: '2026-10-16',
        title: 'River washing batch at Krishna canals complete',
        content: 'Natural river minerals react with the alum mordant to fix rich ruby red and black hues into the canvas!',
        likesCount: 58
      }
    ],
    comments: [
      {
        id: 'c-12-1',
        campaignId: 'camp-12',
        authorName: 'Sneha Patel',
        authorCity: 'Ahmedabad',
        isBacker: true,
        date: '2026-10-18',
        text: 'The Tree of Life pattern looks stunning! Can not wait to use this in my design office.'
      }
    ],
    faqs: [
      {
        question: 'Will the natural vegetable dye bleed onto my clothes?',
        answer: 'No. The fabric is boiled with cow dung and myrobalan nut water in traditional boilers to permanently fix the dye before stitching.'
      }
    ],
    payoutStatus: {
      firstStageReleased: true,
      secondStageReleased: false,
      proofUploaded: false
    },
    createdAt: '2026-10-01'
  },
  {
    id: 'camp-13',
    title: 'SheetalCart: Solar Cold-Storage Cart for Sabzi Vendors',
    tagline: 'Solar-cooled pushcart that keeps leafy greens and tomatoes fresh at 12°C for 3 days, eliminating distress selling by street vegetable hawkers.',
    category: 'Agri',
    city: 'Madurai',
    state: 'Tamil Nadu',
    language: 'Tamil / English',
    founderId: 'f-13',
    founder: {
      id: 'f-13',
      name: 'K. Meenakshi Sundaram',
      city: 'Madurai',
      state: 'Tamil Nadu',
      avatarBg: 'from-teal-700 to-indigo-900',
      initials: 'MS',
      bio: 'Refrigeration technician from Madurai Central Market. Watched vegetable cart vendors dump 25% of their daily stock in garbage bins by evening.',
      entityType: 'Private Limited',
      kycVerified: true,
      bankVerified: true,
      phone: '+91 98430 77123',
      email: 'sundaram.sheetal@gmail.com',
      pastCampaignsCount: 1,
      deliveryTrackRecord: 'Deployed 12 solar cooling carts operating with zero breakdown for 18 months in Madurai'
    },
    goalAmount: 1800000,
    raisedAmount: 2150000,
    backersCount: 178,
    daysLeft: 4,
    status: 'funded',
    communityValidated: true,
    meritScore: {
      publicBacking: 29,
      realCustomers: 18,
      deliveryRecord: 19,
      workingProduct: 14,
      founderCommitment: 9,
      communityVotes: 5,
      totalScore: 86
    },
    cardGradient: 'from-teal-600 to-sky-900',
    iconName: 'Snowflake',
    pitchVideoPlaceholder: {
      duration: '4:00',
      aspectRatio: '16:9',
      hasDemo: true
    },
    story: {
      problem: 'Vegetable hawkers in 40°C heat must sell their produce at loss by 6 PM or watch tomatoes and greens rot. Small street vendors lose ₹300-₹500 daily to heat spoilage.',
      solution: 'SheetalCart integrates a 100W flexible solar rooftop canopy, thermal phase-change cooling bricks, and a 12V DC compressor into an ergonomic pushcart with bicycle wheels.',
      whoWeAre: 'A Madurai refrigeration and metal fab crew.',
      fundUsage: '60% phase-change thermal materials and 12V DC cooling units; 25% lightweight steel chassis and puncture-proof wheels; 15% rewards and testing.',
      timeline: 'Carts will be assembled in November; initial vendor deliveries ship December 2026.',
      risks: 'Phase-change material imports. We have tied up with a domestic supplier in Chennai for non-toxic salt-hydrate phase materials.'
    },
    rewardTiers: [
      {
        id: 'r-13-1',
        campaignId: 'camp-13',
        title: 'Vendor Sponsor Champion (Gift a Cart to a Vendor)',
        price: 24999,
        description: 'Sponsor a full solar cooling pushcart for an identified street vendor in Madurai or your city, with your name plaque welded to the cart.',
        items: ['1x Full Solar Cold Storage Cart', 'Sponsor Plaque on Cart', 'Video & Photo of Vendor Handover'],
        estimatedDeliveryMonth: 'Dec 2026',
        quantityLimit: 40,
        claimedCount: 28
      },
      {
        id: 'r-13-2',
        campaignId: 'camp-13',
        title: 'Home Solar Cooling Cooler Box (30 Litre)',
        price: 6499,
        description: 'Portable solar cooler box for home camping, terrace fruit storage, and perishable medicines during power cuts.',
        items: ['30L Cold Storage Box', '12V DC Adapter & Car Plug', '2-Year Warranty'],
        estimatedDeliveryMonth: 'Jan 2027',
        quantityLimit: 100,
        claimedCount: 42
      }
    ],
    updates: [
      {
        id: 'u-13-1',
        campaignId: 'camp-13',
        date: '2026-10-21',
        title: 'Field temperature logs show steady 11.8°C throughout 38°C afternoon',
        content: 'Testing in Madurai flower market: Jasmine buds remained fresh and fragrant for 48 hours without wilting!',
        likesCount: 84
      }
    ],
    comments: [
      {
        id: 'c-13-1',
        campaignId: 'camp-13',
        authorName: 'R. Kannan',
        authorCity: 'Chennai',
        isBacker: true,
        date: '2026-10-22',
        text: 'மிகச்சிறந்த யோசனை. காய்கறி வியாபாரிகளுக்கு இது வாழ்வாதாரத்தை உயர்த்தும்.'
      }
    ],
    faqs: [
      {
        question: 'Does the cooling work at night when there is no sun?',
        answer: 'Yes! The phase-change thermal material freezes during the day and holds the temperature below 14°C for over 16 hours overnight.'
      }
    ],
    payoutStatus: {
      firstStageReleased: true,
      secondStageReleased: false,
      proofUploaded: true,
      proofUrl: 'https://example.com/sheetalcart-madurai-proof.jpg'
    },
    createdAt: '2026-09-25'
  },
  {
    id: 'camp-14',
    title: 'HerbTower: IoT Hydroponic Balcony Garden',
    tagline: 'Automated vertical nutrient misting system for urban balconies. (FAILED GOAL DEMO - Demonstrates the 100% Escrow Refund Path!)',
    category: 'Agri',
    city: 'Nizamabad',
    state: 'Telangana',
    language: 'Telugu / English',
    founderId: 'f-14',
    founder: {
      id: 'f-14',
      name: 'Vamshi Krishna',
      city: 'Nizamabad',
      state: 'Telangana',
      avatarBg: 'from-slate-700 to-indigo-900',
      initials: 'VK',
      bio: 'Enthusiastic robotics student attempting his first commercial product.',
      entityType: 'Sole Proprietor',
      kycVerified: true,
      bankVerified: true,
      phone: '+91 98499 55667',
      email: 'vamshi.herbtower@gmail.com',
      pastCampaignsCount: 0,
      deliveryTrackRecord: 'First campaign; target not reached by deadline'
    },
    goalAmount: 800000,
    raisedAmount: 240000,
    backersCount: 44,
    daysLeft: 0,
    status: 'failed', // Failed to reach goal -> eligible for 100% refund demonstration!
    communityValidated: false,
    meritScore: {
      publicBacking: 9,
      realCustomers: 12,
      deliveryRecord: 10,
      workingProduct: 10,
      founderCommitment: 6,
      communityVotes: 2,
      totalScore: 49
    },
    cardGradient: 'from-slate-600 to-zinc-800',
    iconName: 'AlertCircle',
    pitchVideoPlaceholder: {
      duration: '2:15',
      aspectRatio: '16:9',
      hasDemo: false
    },
    story: {
      problem: 'City residents lack outdoor ground space to grow fresh pesticide-free herbs and leafy greens.',
      solution: 'An automated PVC vertical tower with timed submersible pumps and nutrient sensors.',
      whoWeAre: 'A two-person prototyping hobby group from Nizamabad.',
      fundUsage: 'Pumps, PVC pipes, and nutrient bottles.',
      timeline: 'Could not secure local plastics extrusion partner within target budget.',
      risks: 'Campaign fell short of the all-or-nothing threshold (raised 30% of ₹8L goal).'
    },
    rewardTiers: [
      {
        id: 'r-14-1',
        campaignId: 'camp-14',
        title: 'Single Balcony HerbTower Pre-Order',
        price: 4999,
        description: 'Complete 24-pod vertical hydroponic kit with nutrients and seeds.',
        items: ['Vertical Tower', 'Submersible Pump', '3-Month Nutrients'],
        estimatedDeliveryMonth: 'Nov 2026',
        quantityLimit: 100,
        claimedCount: 22
      }
    ],
    updates: [
      {
        id: 'u-14-1',
        campaignId: 'camp-14',
        date: '2026-10-24',
        title: 'Campaign deadline ended under target',
        content: 'Dear backers, we reached ₹2,40,000 against our ₹8,00,000 threshold. Under Bharateeyan all-or-nothing escrow guarantee, all 44 backers will receive a 100% automatic refund with zero deductions.',
        likesCount: 15
      }
    ],
    comments: [
      {
        id: 'c-14-1',
        campaignId: 'camp-14',
        authorName: 'Arun V.',
        authorCity: 'Hyderabad',
        isBacker: true,
        date: '2026-10-24',
        text: 'Appreciate the honesty and the instant escrow refund. Better to refund than fail to deliver!'
      }
    ],
    faqs: [
      {
        question: 'When will I receive my refund?',
        answer: 'Refunds are initiated immediately via the admin escrow engine and credit back to original UPI/Card in 2-3 business days.'
      }
    ],
    payoutStatus: {
      firstStageReleased: false,
      secondStageReleased: false,
      proofUploaded: false
    },
    createdAt: '2026-09-20'
  }
];

export const INITIAL_ORDERS: PledgeOrder[] = [
  {
    id: 'BHT-2026-78219',
    campaignId: 'camp-1',
    campaignTitle: 'SuryaDry: Decentralized Solar Crop Dryer',
    founderName: 'Ravi Kumar',
    backerName: 'Priya Reddy',
    backerPhone: '+91 98480 99112',
    backerEmail: 'priya.reddy@hyderabad.in',
    rewardTierId: 'r-1-2',
    rewardTitle: 'SuryaDry Mini (Kitchen & Terrace Herb Dryer)',
    amount: 5499,
    extraTip: 500,
    totalPaid: 5999,
    shippingAddress: {
      fullName: 'Priya Reddy',
      street: 'Plot 42, Road No 12, Banjara Hills',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500034',
      phone: '+91 98480 99112'
    },
    paymentMethod: 'UPI',
    paymentTxnId: 'UPI-YESB-7821908234',
    status: 'in_production',
    createdAt: '2026-10-14'
  },
  {
    id: 'BHT-2026-64112',
    campaignId: 'camp-3',
    campaignTitle: 'WeaveCraft: Modern Cut Pochampally Handloom Apparel',
    founderName: 'Mallesham Chary',
    backerName: 'Priya Reddy',
    backerPhone: '+91 98480 99112',
    backerEmail: 'priya.reddy@hyderabad.in',
    rewardTierId: 'r-3-2',
    rewardTitle: 'Modern Tailored Pochampally Shirt',
    amount: 1999,
    extraTip: 0,
    totalPaid: 1999,
    shippingAddress: {
      fullName: 'Priya Reddy',
      street: 'Plot 42, Road No 12, Banjara Hills',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500034',
      phone: '+91 98480 99112'
    },
    paymentMethod: 'Card',
    paymentTxnId: 'TXN-HDFC-992384112',
    status: 'shipped',
    trackingNumber: 'DTDC-HYD-882910',
    courierName: 'DTDC Express',
    createdAt: '2026-10-08',
    deliveryRating: 5,
    deliveryReview: 'Excellent fabric quality! Fits wonderfully and arrived in beautiful wooden packaging.'
  },
  {
    id: 'BHT-2026-91044',
    campaignId: 'camp-14',
    campaignTitle: 'HerbTower: IoT Hydroponic Balcony Garden',
    founderName: 'Vamshi Krishna',
    backerName: 'Priya Reddy',
    backerPhone: '+91 98480 99112',
    backerEmail: 'priya.reddy@hyderabad.in',
    rewardTierId: 'r-14-1',
    rewardTitle: 'Single Balcony HerbTower Pre-Order',
    amount: 4999,
    extraTip: 0,
    totalPaid: 4999,
    shippingAddress: {
      fullName: 'Priya Reddy',
      street: 'Plot 42, Road No 12, Banjara Hills',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500034',
      phone: '+91 98480 99112'
    },
    paymentMethod: 'UPI',
    paymentTxnId: 'UPI-SBIN-889123001',
    status: 'refunded',
    createdAt: '2026-09-22'
  }
];

export const INITIAL_INVESTORS: InvestorProfile[] = [
  {
    id: 'inv-1',
    name: 'Meera Krishnan',
    firmName: 'Meera Angel Fund',
    city: 'Bengaluru',
    type: 'SEBI-registered Angel Fund',
    sebiRegNo: 'IN/AIF1/23-24/0981',
    verified: true,
    portfolioCount: 18,
    ticketSize: '₹25L - ₹1.5 Cr',
    savedCampaignIds: ['camp-1', 'camp-6', 'camp-13']
  },
  {
    id: 'inv-2',
    name: 'Vikramaditya Raju',
    firmName: 'Bharat Rise Syndicate',
    city: 'Hyderabad',
    type: 'Accredited Investor',
    verified: true,
    portfolioCount: 9,
    ticketSize: '₹10L - ₹50L',
    savedCampaignIds: ['camp-1', 'camp-3']
  },
  {
    id: 'inv-3',
    name: 'Col. Rajesh Deshpande',
    firmName: 'Deccan Tech Angels',
    city: 'Pune',
    type: 'Accredited Investor',
    verified: false, // Pending admin approval
    portfolioCount: 4,
    ticketSize: '₹15L - ₹40L',
    savedCampaignIds: []
  }
];

export const INITIAL_INVESTOR_REQUESTS: InvestorRequest[] = [
  {
    id: 'req-1',
    investorId: 'inv-1',
    investorName: 'Meera Krishnan (Meera Angel Fund)',
    investorFirm: 'Meera Angel Fund',
    campaignId: 'camp-1',
    campaignTitle: 'SuryaDry: Decentralized Solar Crop Dryer',
    founderId: 'f-1',
    type: 'pitch_deck',
    status: 'pending',
    createdAt: '2026-10-23'
  },
  {
    id: 'req-2',
    investorId: 'inv-2',
    investorName: 'Vikramaditya Raju',
    investorFirm: 'Bharat Rise Syndicate',
    campaignId: 'camp-13',
    campaignTitle: 'SheetalCart: Solar Cold-Storage Cart for Sabzi Vendors',
    founderId: 'f-13',
    type: 'intro',
    status: 'accepted',
    createdAt: '2026-10-20'
  }
];

export const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: 'comp-1',
    orderId: 'BHT-2026-55410',
    campaignId: 'camp-2',
    campaignTitle: 'Balakode: Telugu-First Programming App for Rural Kids',
    founderName: 'Sunitha Rani',
    backerName: 'Kishore Goud',
    reason: 'Late Delivery',
    description: 'My printed comic book was expected by October 15th, but tracking details are not yet generated in the portal.',
    status: 'Founder Responded',
    resolutionComment: 'Founder confirmed that comic book printing wrapped on October 18th and will be dispatched by Indian Speed Post on Monday.',
    createdAt: '2026-10-20'
  },
  {
    id: 'comp-2',
    orderId: 'BHT-2026-33918',
    campaignId: 'camp-8',
    campaignTitle: 'JalParikshak: Low-Cost Fluoride & Arsenic Water Test Kit',
    founderName: 'Dr. Archana Deshmukh',
    backerName: 'Mahesh Joshi',
    reason: 'Other',
    description: 'Wanted to update delivery address before courier dispatch due to office relocation.',
    status: 'Resolved',
    resolutionComment: 'Address updated successfully in the shipping database.',
    createdAt: '2026-10-18'
  },
  {
    id: 'comp-3',
    orderId: 'BHT-2026-11890',
    campaignId: 'camp-10',
    campaignTitle: 'GatiRetrofit: Electric Conversion Kit for Passenger Auto-Rickshaws',
    founderName: 'M. Senthil Nathan',
    backerName: 'Senthil V.',
    reason: 'Late Delivery',
    description: 'Inquiry regarding expected dispatch date for Coimbatore workshop pickup.',
    status: 'Under Review',
    createdAt: '2026-10-22'
  },
  {
    id: 'comp-4',
    orderId: 'BHT-2026-99014',
    campaignId: 'camp-4',
    campaignTitle: 'MilletBites: Low-GI Ancient Grain Snacks',
    founderName: 'Padma Lakshmi',
    backerName: 'Radha Swaminathan',
    reason: 'Wrong Item',
    description: 'Received 2 boxes of Jowar instead of the Foxtail millet variety in the sample pack.',
    status: 'Submitted',
    createdAt: '2026-10-24'
  }
];
