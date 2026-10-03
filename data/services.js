/**
 * Roofing services.
 * Each entry powers: the services grid, the service detail page,
 * the sitemap, breadcrumb + Service schema, and internal linking.
 */

const services = [
  {
    slug: 'residential-roofing',
    title: 'Residential Roofing',
    icon: 'home',
    image: '/img/service-residential-roofing.webp',
    cardImage: '/img/service-residential-roofing.webp',
    priceFrom: '$8,900',
    excerpt:
      'Complete residential roofing for single-family homes — from architectural shingles and standing-seam metal to tile and slate.',
    metaTitle: 'Residential Roofing Services in Kansas City, CO | Roofex',
    metaDescription:
      'Roofex installs and repairs residential roofs across Kansas City with architectural shingles, metal, tile and slate. Licensed, insured and backed by a 10-year workmanship warranty. Free estimate.',
    heroIntro:
      'Your home deserves a roof that looks beautiful and performs for decades. Roofex designs, installs and repairs residential roofing systems tailored to the Kansas City climate — with premium materials, factory-certified crews and a workmanship warranty you can hold us to.',
    overview: [
      'A residential roof is the single largest protective system on your home, yet most homeowners only think about it when something goes wrong. At Roofex we take a different approach: we treat every roof as a long-term investment and build it as a complete system — decking, underlayment, ventilation, flashing, shingles and drainage working together.',
      'Whether you are replacing a worn-out roof, upgrading to a more energy-efficient material or addressing a persistent leak, our residential division brings the same disciplined process to every project. We start with a free, no-obligation inspection, document the condition of your roof with photos, and present clear options at multiple price points — never pressure, never hidden fees.',
      'We work with all major manufacturers including GAF, Owens Corning and CertainTeed, which means stronger material warranties and access to the full range of colours and profiles. Because we are a Master Elite® contractor, your manufacturer warranty is the best available, not the standard limited version.',
    ],
    features: [
      { title: 'Architectural Shingles', text: 'Dimensional asphalt shingles that deliver curb appeal, 30–50 year lifespans and excellent value for money.' },
      { title: 'Standing-Seam Metal', text: 'Energy-efficient, hail-resistant metal roofing that can last 50+ years with almost no maintenance.' },
      { title: 'Tile & Slate', text: 'Clay, concrete and natural slate installations for premium, Mediterranean and historic homes.' },
      { title: 'Full Tear-Off', text: 'We remove the old roof down to the decking, inspect for rot and rebuild the system correctly.' },
      { title: 'Ventilation Design', text: 'Balanced intake and exhaust ventilation to prevent moisture, ice dams and premature shingle failure.' },
      { title: 'Ice & Water Shield', text: 'Self-adhering membrane at eaves and valleys — essential protection for freeze–thaw climates.' },
    ],
    benefits: [
      'Free written estimate with photo documentation',
      'Manufacturer-backed 25–50 year material warranties',
      '10-year Roofex workmanship warranty',
      'Most homes completed in 1–2 days',
      'We handle permits, inspections and clean-up',
      'Financing available with approved credit',
    ],
    process: [
      { title: 'Free Inspection', text: 'We assess your roof, attic and flashing, then document everything with photos.' },
      { title: 'Transparent Quote', text: 'A written proposal with material options, timelines and fixed pricing.' },
      { title: 'Material Selection', text: 'Choose shingles, metal or tile from samples delivered to your door.' },
      { title: 'Professional Install', text: 'Certified crews tear off, repair decking and install your new roof system.' },
      { title: 'Final Walkthrough', text: 'Magnetic sweep for nails, site clean-up and a signed completion checklist.' },
    ],
    faqs: [
      { q: 'How long does a residential roof replacement take?', a: 'Most single-family homes are completed in one to two days once materials are delivered. Larger or steeper roofs, tile and slate projects can take three to five days.' },
      { q: 'Will you work with my insurance claim?', a: 'Yes. We document storm damage thoroughly, meet your adjuster on site and provide the paperwork your insurer needs to approve a full replacement.' },
      { q: 'What roofing material is best for Kansas City roofs?', a: 'Class 4 impact-rated architectural shingles and standing-seam metal both perform exceptionally well against hail, UV and freeze–thaw cycles. We will recommend the best option for your budget and HOA rules.' },
    ],
    related: ['roof-installation', 'roof-repair', 'gutters'],
  },

  {
    slug: 'commercial-roofing',
    title: 'Commercial Roofing',
    icon: 'building',
    image: '/img/service-commercial-roofing.webp',
    cardImage: '/img/service-commercial-roofing.webp',
    priceFrom: 'Custom quote',
    excerpt:
      'Flat and low-slope commercial roofing systems for offices, warehouses, retail and multi-family buildings — installed with minimal disruption.',
    metaTitle: 'Commercial Roofing Contractor in Kansas City, CO | Roofex',
    metaDescription:
      'Roofex installs, maintains and repairs commercial roofing in Kansas City — TPO, EPDM, modified bitumen and metal. Minimally disruptive scheduling, planned maintenance and emergency response.',
    heroIntro:
      'Commercial roofs protect your assets, your tenants and your bottom line. Roofex delivers flat and low-slope roofing systems built for longevity — installed around your operating hours so your business never stops.',
    overview: [
      'Commercial roofing is a different discipline from residential work. Buildings have larger surface areas, complex drainage, rooftop equipment, heavy foot traffic and strict safety requirements. Our commercial team is built for exactly that environment, with project managers who coordinate trades, schedule around tenants and keep every site safe and documented.',
      'We install and service all major low-slope systems — TPO and PVC single-ply, EPDM, modified bitumen and standing-seam metal — and we match the membrane to the building rather than selling the same product to every client. A restaurant with heavy grease exhaust, a warehouse with a wide clear span and a multi-family building with rooftop HVAC all need different detailing.',
      'Beyond installation we offer planned maintenance programmes that extend roof life and prevent surprise failures. Routine inspections, drain clearing, seam checks and minor repairs cost a fraction of an emergency replacement — and they keep your roof under warranty.',
    ],
    features: [
      { title: 'TPO & PVC Single-Ply', text: 'Reflective white membranes that cut cooling costs and resist ponding and UV degradation.' },
      { title: 'EPDM Rubber', text: 'A proven, cost-effective, highly weather-resistant option for large flat roofs.' },
      { title: 'Modified Bitumen', text: 'Multi-ply, torch-applied systems for high-traffic and equipment-heavy roofs.' },
      { title: 'Roof Coatings', text: 'Restorative acrylic and silicone coatings that extend an existing roof’s life by years.' },
      { title: 'Rooftop Equipment Flashing', text: 'Proper curbs and flashing around HVAC, skylights and vents — the most common leak source.' },
      { title: 'Planned Maintenance', text: 'Scheduled inspections and reporting that protect your warranty and your capital plan.' },
    ],
    benefits: [
      'Work scheduled around your operating hours',
      'Dedicated project manager and daily reporting',
      'OSHA-compliant safety programme on every site',
      'Long-term NDL and manufacturer warranties',
      'Budget planning and capital forecasting support',
      'Emergency leak response within 24 hours',
    ],
    process: [
      { title: 'Roof Survey', text: 'Core samples, moisture scans and infrared imaging to understand the existing assembly.' },
      { title: 'System Design', text: 'We specify the membrane, insulation and detailing that fit your building and budget.' },
      { title: 'Phased Scheduling', text: 'Work is sequenced to keep tenants, customers and operations unaffected.' },
      { title: 'Installation', text: 'Certified crews install to manufacturer specification with daily quality checks.' },
      { title: 'Warranty & Handover', text: 'Documentation, maintenance plan and warranty registration on completion.' },
    ],
    faqs: [
      { q: 'How long does a commercial roof last?', a: 'A properly installed TPO or EPDM system typically lasts 20–30 years, and metal can exceed 40. With a planned maintenance programme many roofs comfortably beat those figures.' },
      { q: 'Can you work while our building is occupied?', a: 'Yes. We phase work, use odour-controlled adhesives where required, and schedule noisy operations outside business hours.' },
      { q: 'Do you offer roof restoration instead of replacement?', a: 'Often yes. If the existing roof is structurally sound, a coating or overlay system can add 10–15 years of life for a fraction of replacement cost. We will tell you honestly which option makes sense.' },
    ],
    related: ['roof-inspection', 'roof-repair', 'roof-installation'],
  },

  {
    slug: 'roof-repair',
    title: 'Roof Repair & Maintenance',
    icon: 'wrench',
    image: '/img/service-roof-repair.webp',
    cardImage: '/img/service-roof-repair.webp',
    priceFrom: '$249',
    excerpt:
      'Fast, permanent repairs for leaks, missing shingles, damaged flashing and storm damage — with honest advice on repair versus replace.',
    metaTitle: 'Roof Repair Services in Kansas City, CO | Leak Repair | Roofex',
    metaDescription:
      'Fast roof repair in Kansas City — leaking roofs, missing shingles, flashing damage and storm repairs. Same-week service, honest repair-vs-replace advice and a written warranty.',
    heroIntro:
      'A small leak today becomes a rotten deck and a stained ceiling tomorrow. Roofex repairs roofs properly — finding the true source of the problem and fixing it permanently, not just patching the symptom.',
    overview: [
      'Most roof leaks do not start where the water appears inside your home. Water travels along decking, rafters and insulation before it drips through the ceiling, which is why DIY patching so often fails. Our technicians trace the leak to its actual entry point — often failing flashing, a cracked pipe boot, an ice-dam edge or a nail pop — and repair it correctly.',
      'We handle everything from a single missing shingle to extensive storm damage, and we are equally comfortable on asphalt, metal, tile and flat membrane roofs. Every repair is documented with before-and-after photos, and all workmanship is warrantied.',
      'Just as importantly, we are honest about when a repair is no longer the smart financial choice. If your roof is at the end of its life, we will show you the evidence and explain your options — we never sell a replacement you do not need.',
    ],
    features: [
      { title: 'Leak Detection & Repair', text: 'Systematic tracing to the true entry point, then a permanent, warrantied repair.' },
      { title: 'Shingle Replacement', text: 'Colour-matched replacement of missing, cracked or wind-lifted shingles.' },
      { title: 'Flashing Repair', text: 'Chimney, valley, wall and skylight flashing re-sealed or rebuilt to shed water correctly.' },
      { title: 'Pipe Boot & Vent Seals', text: 'One of the most common leak sources — replaced with long-life neoprene or silicone boots.' },
      { title: 'Ice Dam Prevention', text: 'Heat cable, ventilation and insulation improvements to stop winter ice dams.' },
      { title: 'Emergency Tarping', text: '24/7 emergency response to stop water intrusion immediately after a storm.' },
    ],
    benefits: [
      'Same-week appointments, 24/7 emergency line',
      'Photo-documented diagnosis before any work',
      'Permanent fixes, not temporary patches',
      'Colour-matched materials on every repair',
      'Honest repair-vs-replace recommendations',
      'Written warranty on all repair workmanship',
    ],
    process: [
      { title: 'Book a Visit', text: 'Call or request a repair online — we confirm a same-week slot.' },
      { title: 'Diagnose', text: 'We inspect the roof, attic and interior and photograph the root cause.' },
      { title: 'Approve', text: 'You receive a clear, fixed-price repair quote before we start.' },
      { title: 'Repair', text: 'Our technicians complete the work, usually in a single visit.' },
      { title: 'Verify', text: 'Water testing and a final photo report confirm the leak is resolved.' },
    ],
    faqs: [
      { q: 'How much does a roof repair cost?', a: 'Most minor repairs fall between $249 and $850. Larger repairs involving flashing rebuilds or multiple areas are quoted individually after inspection. We always give a fixed price before starting.' },
      { q: 'Can you repair a roof in winter?', a: 'Yes. We repair roofs year-round using cold-application adhesives and safe access methods, and we provide emergency tarping whenever weather prevents a permanent fix.' },
      { q: 'Should I repair or replace my roof?', a: 'If the roof is under 15 years old and the damage is localised, repair is usually the right call. If it is older, leaking in multiple places, or storm-damaged across large areas, replacement is often more cost-effective. We will show you the evidence and let you decide.' },
    ],
    related: ['roof-inspection', 'emergency-roofing', 'storm-damage'],
  },

  {
    slug: 'roof-installation',
    title: 'Roof Installation & Replacement',
    icon: 'layers',
    image: '/img/service-roof-installation.webp',
    cardImage: '/img/service-roof-installation.webp',
    priceFrom: '$9,400',
    excerpt:
      'Full tear-off and new-roof installation built as a complete system — decking, underlayment, ventilation, flashing and premium finishes.',
    metaTitle: 'Roof Installation & Replacement in Kansas City, CO | Roofex',
    metaDescription:
      'Roof replacement in Kansas City done right — full tear-off, new decking, ice-and-water shield, balanced ventilation and premium shingles, metal or tile. Free estimate and 10-year workmanship warranty.',
    heroIntro:
      'A new roof is a once-in-a-generation purchase, so it has to be built correctly from the deck up. Roofex installs complete roofing systems engineered for Midwest weather and finished to a standard you will be proud of.',
    overview: [
      'Replacement is more than laying new shingles over the old ones. The layers beneath your roof — decking, underlayment, ice-and-water shield, drip edge, ventilation and flashing — determine how long the finished roof actually lasts. We rebuild the whole assembly, and we never skip steps to win on price.',
      'Every Roofex installation begins with a thorough assessment of your decking and structure. Any soft, delaminated or rotten sheathing is replaced, and we verify that your attic ventilation is balanced. This is the unglamorous work that separates a roof that lasts 30 years from one that fails in 10.',
      'We install architectural asphalt shingles, standing-seam metal, clay and concrete tile, and synthetic slate — and we help you choose based on your home’s architecture, your HOA requirements, your insurance considerations and your budget. You receive manufacturer samples, a written specification and a fixed price before a single nail is pulled.',
    ],
    features: [
      { title: 'Complete Tear-Off', text: 'Full removal of old roofing down to the decking for a clean, honest installation.' },
      { title: 'Decking Replacement', text: 'Rotten or delaminated sheathing replaced with new OSB or plywood.' },
      { title: 'Synthetic Underlayment', text: 'High-performance, tear-resistant underlayment across the entire roof field.' },
      { title: 'Ice & Water Shield', text: 'Self-adhering membrane at eaves, valleys and penetrations for freeze–thaw protection.' },
      { title: 'New Flashing & Drip Edge', text: 'Every flashing detail rebuilt — not reused — to guarantee watertight performance.' },
      { title: 'Ridge Ventilation', text: 'Balanced intake and ridge exhaust to keep the attic dry and the roof cool.' },
    ],
    benefits: [
      'Fixed written pricing with no surprise extras',
      'Full tear-off and deck inspection on every job',
      'Premium manufacturer certifications and warranties',
      'Typical homes completed in 1–2 days',
      'Complete site protection and magnetic nail sweep',
      'Financing and insurance-claim assistance',
    ],
    process: [
      { title: 'Inspection & Measure', text: 'Detailed roof measurement, deck check and material take-off.' },
      { title: 'Specification', text: 'A written scope covering every layer of the new roof system.' },
      { title: 'Material Delivery', text: 'Materials staged safely, with your landscaping protected.' },
      { title: 'Tear-Off & Build', text: 'Old roof removed, decking repaired, system installed and inspected.' },
      { title: 'Clean-Up & Warranty', text: 'Magnetic sweep, site walkthrough and warranty registration.' },
    ],
    faqs: [
      { q: 'How much does a new roof cost in Kansas City?', a: 'A typical 2,000 sq ft home with architectural shingles ranges from roughly $9,400 to $18,000 depending on pitch, layers and material. Metal and tile cost more. Every quote is fixed and itemised.' },
      { q: 'Do I need a full tear-off or can you overlay?', a: 'We recommend full tear-off in almost every case. Overlays trap moisture, hide decking damage and shorten the life of the new roof. Where building codes allow an overlay and the existing roof is in good condition, we will explain the trade-offs honestly.' },
      { q: 'Will you protect my landscaping?', a: 'Yes. We tarp gardens, protect siding and windows, use a debris chute where needed, and run a magnetic sweep for nails at the end of every day.' },
    ],
    related: ['residential-roofing', 'roof-repair', 'gutters'],
  },

  {
    slug: 'roof-inspection',
    title: 'Roof Inspection & Leak Detection',
    icon: 'search',
    image: '/img/service-roof-inspection.webp',
    cardImage: '/img/service-roof-inspection.webp',
    priceFrom: '$199',
    excerpt:
      'Detailed 21-point roof inspections with photo reports — ideal for home sales, insurance claims, storm checks and annual maintenance.',
    metaTitle: 'Roof Inspection & Leak Detection in Kansas City, CO | Roofex',
    metaDescription:
      'Professional 21-point roof inspections in Kansas City with photo reports and honest recommendations. Ideal for real estate, insurance claims and annual maintenance. Book online.',
    heroIntro:
      'You cannot manage what you have not measured. A professional Roofex inspection tells you exactly what condition your roof is in, what it needs and when — in plain language, backed by photographs.',
    overview: [
      'Roofs fail slowly and quietly. By the time a stain appears on the ceiling, water has usually been entering the assembly for months. A routine inspection catches failing sealant, lifted flashing, granule loss and early deck deterioration while they are still inexpensive to fix.',
      'Our 21-point inspection covers the roof surface, penetrations, valleys, flashing, gutters, attic ventilation and, where accessible, the decking and insulation. We photograph every finding and deliver a written report with a simple condition rating and prioritised recommendations — repair now, monitor, or plan for replacement.',
      'Inspections are especially valuable during a real estate transaction, after a hailstorm, or as an annual maintenance habit. Many insurers and manufacturers also require documented maintenance to honour a warranty claim, and our reports provide exactly that record.',
    ],
    features: [
      { title: '21-Point Checklist', text: 'A consistent, thorough evaluation of every roof component and detail.' },
      { title: 'Photo Report', text: 'Clear images of each finding so you can see exactly what we see.' },
      { title: 'Leak Detection', text: 'Systematic tracing of active leaks using moisture meters and water testing.' },
      { title: 'Attic & Ventilation Check', text: 'Assessment of insulation, vapour barrier and airflow for moisture control.' },
      { title: 'Storm & Hail Assessment', text: 'Documentation formatted for insurance adjusters and claims.' },
      { title: 'Real Estate Reports', text: 'Fast turnaround for buyers, sellers and agents during due diligence.' },
    ],
    benefits: [
      'Same-week appointments, reports within 24 hours',
      'Fully photo-documented, jargon-free findings',
      'No-pressure recommendations you can act on later',
      'Accepted for real estate and insurance purposes',
      'Maintenance records that protect your warranty',
      'Inspection fee credited toward any repair we perform',
    ],
    process: [
      { title: 'Schedule', text: 'Book online or by phone — most inspections completed within a week.' },
      { title: 'On-Site Inspection', text: 'A certified inspector evaluates the roof, attic and drainage.' },
      { title: 'Photo Report', text: 'You receive a written report with images and a condition rating.' },
      { title: 'Recommendations', text: 'Prioritised actions: repair now, monitor, or plan replacement.' },
      { title: 'Optional Repair', text: 'If work is needed, we quote it clearly — with the fee credited.' },
    ],
    faqs: [
      { q: 'How often should I have my roof inspected?', a: 'Once a year for most homes, and always after a major hailstorm or wind event. Annual inspections are the cheapest insurance you can buy for a roof.' },
      { q: 'Do you inspect roofs for home sales?', a: 'Yes. We provide fast, detailed reports for buyers and sellers, and we are happy to talk directly with agents and lenders.' },
      { q: 'Is the inspection really free of obligation?', a: 'Completely. You receive the report and recommendations with no pressure to buy anything. If you do proceed with a repair, we credit the inspection fee toward the work.' },
    ],
    related: ['roof-repair', 'storm-damage', 'roof-installation'],
  },

  {
    slug: 'gutters',
    title: 'Gutter Installation & Cleaning',
    icon: 'droplet',
    image: '/img/service-gutters.webp',
    cardImage: '/img/service-gutters.webp',
    priceFrom: '$690',
    excerpt:
      'Seamless aluminium gutters, guards and downspouts that move water away from your roof, walls and foundation — plus professional cleaning.',
    metaTitle: 'Gutter Installation, Guards & Cleaning in Kansas City | Roofex',
    metaDescription:
      'Seamless gutter installation, gutter guards and professional cleaning in Kansas City. Protect your roof, siding and foundation from water damage. Free gutter estimate.',
    heroIntro:
      'Gutters are the drainage system that keeps your roof — and your foundation — out of trouble. Roofex installs seamless gutters sized for Midwest rain and snowmelt, and keeps them flowing clear.',
    overview: [
      'A roof can be flawless and still cause damage if water is not carried away from the building. Overflowing gutters rot fascia boards, stain siding, erode landscaping and dump water against your foundation, where it can find its way into basements and crawl spaces.',
      'We fabricate seamless aluminium gutters on site to the exact length of your roofline, which means fewer joints, fewer leaks and a cleaner appearance than sectional systems. We size the gutter and downspouts to the actual roof area and rainfall intensity, so the system performs even in a downpour.',
      'For homeowners tired of climbing ladders, we install high-quality gutter guards that keep leaves and debris out while letting water through. And for existing gutters we offer thorough cleaning, re-sealing and re-pitching to restore proper drainage.',
    ],
    features: [
      { title: 'Seamless Aluminium Gutters', text: 'Custom-fabricated on site for a leak-resistant, tailored fit in a range of colours.' },
      { title: 'Downspout Design', text: 'Correctly sized and routed downspouts with extensions to move water well clear of the foundation.' },
      { title: 'Gutter Guards', text: 'Micro-mesh and reverse-curve guards that block debris while handling heavy flow.' },
      { title: 'Gutter Cleaning', text: 'Complete removal of leaves, needles and sediment, plus a flush test.' },
      { title: 'Re-Sealing & Re-Pitching', text: 'Repairing leaking joints and correcting slope so water actually reaches the downspouts.' },
      { title: 'Fascia & Soffit Repair', text: 'Replacing water-damaged fascia and soffit before new gutters are hung.' },
    ],
    benefits: [
      'Seamless, custom-fit gutters in 20+ colours',
      'Correctly sized for your roof and rainfall',
      'Gutter guards that end the ladder work',
      'Protects fascia, siding and foundation',
      'Clean, tidy installation with full clean-up',
      'Maintenance plans available',
    ],
    process: [
      { title: 'Measure', text: 'We measure every run and calculate the drainage capacity you need.' },
      { title: 'Fabricate', text: 'Seamless gutters are formed on site to exact lengths.' },
      { title: 'Install', text: 'Hangers set at correct spacing and pitch, with downspouts positioned for drainage.' },
      { title: 'Guard Fitting', text: 'Optional gutter guards installed for maintenance-free performance.' },
      { title: 'Test & Clean Up', text: 'Water test, final inspection and complete site clean-up.' },
    ],
    faqs: [
      { q: 'How often should gutters be cleaned?', a: 'Twice a year for most homes, and more often if you have overhanging trees. Clogged gutters are one of the leading causes of fascia rot and foundation water damage.' },
      { q: 'Are gutter guards worth it?', a: 'For most homes with trees nearby, yes. Quality micro-mesh guards keep out leaves and pine needles, dramatically reduce cleaning and pay for themselves over a few seasons.' },
      { q: 'What size gutters do I need?', a: 'Most homes use 5-inch gutters, while large or steep roofs benefit from 6-inch. We calculate capacity from your actual roof area and local rainfall so the system never overflows.' },
    ],
    related: ['residential-roofing', 'roof-repair', 'roof-inspection'],
  },

  {
    slug: 'storm-damage',
    title: 'Storm Damage Restoration',
    icon: 'storm',
    image: '/img/service-roof-repair.webp',
    cardImage: '/img/service-commercial-roofing.webp',
    priceFrom: 'Insurance claim',
    excerpt:
      'Hail, wind and storm damage restoration with full documentation, insurance-claim support and rapid, warrantied repairs.',
    metaTitle: 'Storm & Hail Damage Roof Restoration in Kansas City | Roofex',
    metaDescription:
      'Storm and hail damage roof restoration in Kansas City. We document damage, meet your adjuster and restore your roof fast — full insurance claim support from Roofex.',
    heroIntro:
      'Kansas City’s hail and wind are unforgiving, and storm damage is rarely obvious from the ground. Roofex documents, claims and restores storm-damaged roofs so you get the repair your insurance already covers.',
    overview: [
      'After a hailstorm, most homeowners have no idea whether their roof was damaged. Bruised shingles, cracked sealant and dented metal often look fine from the driveway but fail within a year or two, long after the claim window has closed. A prompt professional assessment is the difference between a covered replacement and an out-of-pocket bill.',
      'Roofex specialises in storm restoration. We inspect and photographically document every form of damage — granule loss, mat bruising, cracked shingles, dented vents, gutters and flashing — and prepare a report in the format insurance adjusters expect. We meet your adjuster on site to make sure nothing is missed.',
      'Once the claim is approved we complete the restoration with premium, impact-rated materials that better withstand the next storm, and we handle the paperwork, supplements and warranty registration for you. If your claim is denied, we will tell you honestly and give you a clear plan for protecting the roof in the meantime.',
    ],
    features: [
      { title: 'Hail Damage Assessment', text: 'Identification of impact bruising and granule loss that shortens shingle life.' },
      { title: 'Wind Damage Repair', text: 'Replacement of lifted, creased and missing shingles and failed ridge caps.' },
      { title: 'Insurance Documentation', text: 'Photo evidence and reports formatted for adjusters and claims.' },
      { title: 'Adjuster Meetings', text: 'We meet your adjuster on site to ensure the full scope is captured.' },
      { title: 'Emergency Tarping', text: 'Immediate protection for active leaks and exposed decking.' },
      { title: 'Impact-Rated Upgrades', text: 'Class 4 shingles and metal that may lower your insurance premium.' },
    ],
    benefits: [
      'Free post-storm roof assessment',
      'Complete insurance claim documentation',
      'We meet and negotiate with your adjuster',
      '24/7 emergency tarping and water mitigation',
      'Impact-rated materials for future protection',
      'No work, no obligation — honest outcomes',
    ],
    process: [
      { title: 'Free Assessment', text: 'We inspect and photograph all storm-related damage.' },
      { title: 'Claim Support', text: 'We help you file and document a complete insurance claim.' },
      { title: 'Adjuster Meeting', text: 'We walk the roof with your adjuster to agree the full scope.' },
      { title: 'Restoration', text: 'Approved work is completed with premium impact-rated materials.' },
      { title: 'Final Inspection', text: 'Quality check, clean-up and warranty registration.' },
    ],
    faqs: [
      { q: 'How do I know if my roof has hail damage?', a: 'You usually cannot tell from the ground. Look for dented gutters, downspouts or vents as a clue, then book a free inspection — we photograph the actual shingle damage.' },
      { q: 'How long do I have to file a storm damage claim?', a: 'Deadlines vary by policy, but many Missouri and Kansas insurers expect claims within a year of the storm. The sooner you document the damage, the stronger your claim.' },
      { q: 'Will filing a claim raise my premium?', a: 'Storm and hail claims are typically treated as “acts of God” and often do not affect your premium the way an at-fault claim would. We can explain the general picture, though your insurer has the final word.' },
    ],
    related: ['emergency-roofing', 'roof-repair', 'roof-inspection'],
  },

  {
    slug: 'emergency-roofing',
    title: 'Emergency Roofing Services',
    icon: 'siren',
    image: '/img/service-roof-inspection.webp',
    cardImage: '/img/service-residential-roofing.webp',
    priceFrom: '24/7 callout',
    excerpt:
      '24/7 emergency roof response — rapid tarping, leak control and temporary repairs to stop damage before it spreads.',
    metaTitle: '24/7 Emergency Roofing & Leak Repair in Kansas City | Roofex',
    metaDescription:
      'Emergency roofing in Kansas City, available 24/7. Rapid tarping, leak control and temporary repairs to stop water damage fast. Call Roofex any time, day or night.',
    heroIntro:
      'When a storm tears off shingles or water is pouring through your ceiling, every hour counts. Roofex answers the phone 24/7 and gets a crew to your property fast to stop the damage.',
    overview: [
      'Roofing emergencies do not wait for business hours. A wind-lifted section of shingles, a fallen branch or a sudden interior leak can cause thousands of dollars of damage to insulation, drywall, flooring and belongings within hours. The priority is simple: stop the water, secure the structure, and stabilise the situation until a permanent repair can be made.',
      'Our emergency crews are on call around the clock, every day of the year. We arrive with tarps, plywood, sealants and water-mitigation equipment, and we work in the dark and in bad weather when it is safe to do so. We photograph everything for your insurance claim and provide a written scope for the permanent repair.',
      'Once the immediate threat is controlled we schedule the permanent fix — usually within days — and coordinate directly with your insurer so the process is as painless as possible during a stressful time.',
    ],
    features: [
      { title: '24/7 Phone Response', text: 'A real person answers, day or night, and dispatches a crew.' },
      { title: 'Emergency Tarping', text: 'Heavy-duty tarping to stop water intrusion immediately.' },
      { title: 'Board-Up & Shoring', text: 'Securing damaged decking and structure after impact or collapse.' },
      { title: 'Leak Containment', text: 'Interior water control to protect ceilings, insulation and belongings.' },
      { title: 'Rapid Permanent Repair', text: 'Follow-up scheduling for a lasting repair, usually within days.' },
      { title: 'Insurance Documentation', text: 'Full photo documentation and reporting for your claim.' },
    ],
    benefits: [
      'Answered 24 hours a day, 365 days a year',
      'Fast dispatch across the Kansas City metro',
      'Immediate tarping and water control',
      'Full photo documentation for insurance',
      'Permanent repair scheduled within days',
      'One point of contact from emergency to completion',
    ],
    process: [
      { title: 'Call Us', text: 'Reach a real person any time — describe the emergency and we dispatch.' },
      { title: 'Rapid Dispatch', text: 'The nearest crew is sent with tarping and mitigation equipment.' },
      { title: 'Stabilise', text: 'We stop water intrusion and secure the structure.' },
      { title: 'Document', text: 'Damage is photographed and reported for your insurance claim.' },
      { title: 'Permanent Repair', text: 'We schedule and complete the lasting repair.' },
    ],
    faqs: [
      { q: 'Do you really answer at 3 AM?', a: 'Yes. Our emergency line is staffed around the clock, every day of the year, and crews are dispatched as soon as it is safe to work.' },
      { q: 'How quickly can you get to my home?', a: 'For most of the Kansas City metro we aim to be on site within a few hours, weather and traffic permitting. We will give you an honest ETA when you call.' },
      { q: 'What should I do while I wait?', a: 'Move valuables away from the leak, place buckets and towels, and if it is safe, turn off power to affected areas. Do not climb onto a wet or storm-damaged roof yourself.' },
    ],
    related: ['storm-damage', 'roof-repair', 'roof-inspection'],
  },
];

module.exports = services;
