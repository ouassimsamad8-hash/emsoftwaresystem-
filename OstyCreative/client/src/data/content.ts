import type { Service, Project, BlogPost, FAQ, Translation } from '@shared/schema';

export const services: Service[] = [
  {
    id: '1',
    slug: 'web-development',
    icon: 'Globe',
    title: {
      en: 'Web Development',
      fr: 'Développement Web'
    },
    shortDescription: {
      en: 'Custom web applications built with modern technologies for optimal performance and user experience.',
      fr: 'Applications web sur mesure construites avec des technologies modernes pour des performances et une expérience utilisateur optimales.'
    },
    fullDescription: {
      en: 'We create powerful, scalable web applications tailored to your business needs. Our team leverages cutting-edge technologies like React, Node.js, and cloud infrastructure to deliver solutions that drive growth and efficiency.',
      fr: 'Nous créons des applications web puissantes et évolutives adaptées aux besoins de votre entreprise. Notre équipe utilise des technologies de pointe comme React, Node.js et l\'infrastructure cloud pour fournir des solutions qui stimulent la croissance et l\'efficacité.'
    },
    features: [
      { en: 'Responsive Design', fr: 'Design Réactif' },
      { en: 'Progressive Web Apps', fr: 'Applications Web Progressives' },
      { en: 'API Integration', fr: 'Intégration d\'API' },
      { en: 'Cloud Deployment', fr: 'Déploiement Cloud' }
    ],
    benefits: [
      { en: 'Faster time to market', fr: 'Mise sur le marché plus rapide' },
      { en: 'Scalable architecture', fr: 'Architecture évolutive' },
      { en: 'Enhanced user engagement', fr: 'Engagement utilisateur amélioré' },
      { en: 'Lower maintenance costs', fr: 'Coûts de maintenance réduits' }
    ]
  },
  {
    id: '2',
    slug: 'mobile-development',
    icon: 'Smartphone',
    title: {
      en: 'Mobile Development',
      fr: 'Développement Mobile'
    },
    shortDescription: {
      en: 'Native and cross-platform mobile apps that deliver exceptional user experiences on iOS and Android.',
      fr: 'Applications mobiles natives et multiplateformes offrant des expériences utilisateur exceptionnelles sur iOS et Android.'
    },
    fullDescription: {
      en: 'Our mobile development expertise spans native iOS and Android development, as well as cross-platform solutions using React Native and Flutter. We create intuitive, high-performance mobile applications that engage users and drive business results.',
      fr: 'Notre expertise en développement mobile couvre le développement natif iOS et Android, ainsi que les solutions multiplateformes utilisant React Native et Flutter. Nous créons des applications mobiles intuitives et performantes qui engagent les utilisateurs et génèrent des résultats commerciaux.'
    },
    features: [
      { en: 'iOS & Android Native', fr: 'Natif iOS & Android' },
      { en: 'Cross-Platform Development', fr: 'Développement Multiplateforme' },
      { en: 'Offline Functionality', fr: 'Fonctionnalité Hors Ligne' },
      { en: 'Push Notifications', fr: 'Notifications Push' }
    ],
    benefits: [
      { en: 'Reach wider audience', fr: 'Toucher un public plus large' },
      { en: 'Better user engagement', fr: 'Meilleur engagement utilisateur' },
      { en: 'Increased accessibility', fr: 'Accessibilité accrue' },
      { en: 'Direct customer connection', fr: 'Connexion directe avec les clients' }
    ]
  },
  {
    id: '3',
    slug: 'custom-software',
    icon: 'Code',
    title: {
      en: 'Custom Software',
      fr: 'Logiciel Sur Mesure'
    },
    shortDescription: {
      en: 'Tailored software solutions designed to solve your unique business challenges and streamline operations.',
      fr: 'Solutions logicielles personnalisées conçues pour résoudre vos défis commerciaux uniques et rationaliser les opérations.'
    },
    fullDescription: {
      en: 'Every business has unique needs. We develop custom software solutions from the ground up, designed specifically for your workflows, processes, and goals. Our agile development approach ensures your vision becomes reality.',
      fr: 'Chaque entreprise a des besoins uniques. Nous développons des solutions logicielles personnalisées à partir de zéro, conçues spécifiquement pour vos flux de travail, processus et objectifs. Notre approche de développement agile garantit que votre vision devienne réalité.'
    },
    features: [
      { en: 'Requirements Analysis', fr: 'Analyse des Besoins' },
      { en: 'Agile Development', fr: 'Développement Agile' },
      { en: 'Quality Assurance', fr: 'Assurance Qualité' },
      { en: 'Ongoing Support', fr: 'Support Continu' }
    ],
    benefits: [
      { en: 'Perfect fit for your needs', fr: 'Parfaitement adapté à vos besoins' },
      { en: 'Competitive advantage', fr: 'Avantage concurrentiel' },
      { en: 'Process automation', fr: 'Automatisation des processus' },
      { en: 'Improved efficiency', fr: 'Efficacité améliorée' }
    ]
  },
  {
    id: '4',
    slug: 'cloud-solutions',
    icon: 'Cloud',
    title: {
      en: 'Cloud Solutions',
      fr: 'Solutions Cloud'
    },
    shortDescription: {
      en: 'Secure, scalable cloud infrastructure and migration services for modern businesses.',
      fr: 'Infrastructure cloud sécurisée et évolutive et services de migration pour les entreprises modernes.'
    },
    fullDescription: {
      en: 'Harness the power of cloud computing with our comprehensive cloud solutions. We help businesses migrate to the cloud, optimize existing infrastructure, and build cloud-native applications using AWS, Azure, and Google Cloud Platform.',
      fr: 'Exploitez la puissance du cloud computing avec nos solutions cloud complètes. Nous aidons les entreprises à migrer vers le cloud, à optimiser l\'infrastructure existante et à créer des applications cloud natives utilisant AWS, Azure et Google Cloud Platform.'
    },
    features: [
      { en: 'Cloud Migration', fr: 'Migration Cloud' },
      { en: 'Infrastructure Setup', fr: 'Configuration d\'Infrastructure' },
      { en: 'Security & Compliance', fr: 'Sécurité et Conformité' },
      { en: 'Performance Optimization', fr: 'Optimisation des Performances' }
    ],
    benefits: [
      { en: 'Reduced IT costs', fr: 'Réduction des coûts informatiques' },
      { en: 'Enhanced security', fr: 'Sécurité renforcée' },
      { en: 'Improved scalability', fr: 'Évolutivité améliorée' },
      { en: 'Global accessibility', fr: 'Accessibilité mondiale' }
    ]
  },
  {
    id: '5',
    slug: 'digital-transformation',
    icon: 'Zap',
    title: {
      en: 'Digital Transformation',
      fr: 'Transformation Digitale'
    },
    shortDescription: {
      en: 'Strategic guidance and implementation to modernize your business operations and technology stack.',
      fr: 'Conseil stratégique et mise en œuvre pour moderniser vos opérations commerciales et votre pile technologique.'
    },
    fullDescription: {
      en: 'Navigate the digital landscape with confidence. Our digital transformation services help organizations embrace new technologies, optimize processes, and create digital-first experiences that delight customers and empower employees.',
      fr: 'Naviguez dans le paysage numérique en toute confiance. Nos services de transformation digitale aident les organisations à adopter de nouvelles technologies, à optimiser les processus et à créer des expériences axées sur le numérique qui ravissent les clients et responsabilisent les employés.'
    },
    features: [
      { en: 'Strategy Consulting', fr: 'Conseil en Stratégie' },
      { en: 'Process Automation', fr: 'Automatisation des Processus' },
      { en: 'Legacy System Modernization', fr: 'Modernisation des Systèmes Legacy' },
      { en: 'Change Management', fr: 'Gestion du Changement' }
    ],
    benefits: [
      { en: 'Increased agility', fr: 'Agilité accrue' },
      { en: 'Better decision-making', fr: 'Meilleures décisions' },
      { en: 'Enhanced customer experience', fr: 'Expérience client améliorée' },
      { en: 'Future-ready organization', fr: 'Organisation prête pour l\'avenir' }
    ]
  },
  {
    id: '6',
    slug: 'it-consulting',
    icon: 'Users',
    title: {
      en: 'IT Consulting',
      fr: 'Conseil Informatique'
    },
    shortDescription: {
      en: 'Expert technology advice and strategic planning to align IT with your business objectives.',
      fr: 'Conseils technologiques experts et planification stratégique pour aligner l\'informatique sur vos objectifs commerciaux.'
    },
    fullDescription: {
      en: 'Make informed technology decisions with our expert IT consulting services. We provide strategic guidance, technical assessments, and actionable recommendations to help you maximize your technology investments and achieve your business goals.',
      fr: 'Prenez des décisions technologiques éclairées avec nos services de conseil informatique experts. Nous fournissons des conseils stratégiques, des évaluations techniques et des recommandations concrètes pour vous aider à maximiser vos investissements technologiques et à atteindre vos objectifs commerciaux.'
    },
    features: [
      { en: 'Technology Assessment', fr: 'Évaluation Technologique' },
      { en: 'Architecture Design', fr: 'Conception d\'Architecture' },
      { en: 'Vendor Selection', fr: 'Sélection de Fournisseurs' },
      { en: 'Risk Management', fr: 'Gestion des Risques' }
    ],
    benefits: [
      { en: 'Reduced technical debt', fr: 'Dette technique réduite' },
      { en: 'Optimized IT spending', fr: 'Dépenses informatiques optimisées' },
      { en: 'Strategic alignment', fr: 'Alignement stratégique' },
      { en: 'Expert guidance', fr: 'Conseils d\'experts' }
    ]
  }
];

export const projects: Project[] = [
  {
    id: '1',
    slug: 'ecommerce-platform',
    title: { en: 'E-Commerce Platform', fr: 'Plateforme E-Commerce' },
    category: 'web',
    categoryLabel: { en: 'Web Development', fr: 'Développement Web' },
    description: { en: 'Modern online shopping experience with real-time inventory', fr: 'Expérience d\'achat en ligne moderne avec inventaire en temps réel' },
    image: 'Ecommerce_platform_interface_1b61c289.png',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    challenge: { en: 'Client needed a scalable e-commerce solution to handle high traffic during peak seasons while maintaining excellent performance.', fr: 'Le client avait besoin d\'une solution e-commerce évolutive pour gérer un trafic élevé pendant les périodes de pointe tout en maintenant d\'excellentes performances.' },
    solution: { en: 'We built a cloud-native platform with microservices architecture, implementing caching strategies and CDN integration for optimal performance.', fr: 'Nous avons construit une plateforme cloud native avec une architecture de microservices, en mettant en œuvre des stratégies de mise en cache et l\'intégration CDN pour des performances optimales.' },
    results: [
      { en: '300% increase in concurrent users', fr: 'Augmentation de 300% des utilisateurs simultanés' },
      { en: '45% improvement in page load time', fr: 'Amélioration de 45% du temps de chargement des pages' },
      { en: '25% increase in conversion rate', fr: 'Augmentation de 25% du taux de conversion' }
    ],
    screenshots: ['Ecommerce_platform_interface_1b61c289.png', 'Web_app_dashboard_d564f681.png']
  },
  {
    id: '2',
    slug: 'mobile-banking-app',
    title: { en: 'Mobile Banking App', fr: 'Application Bancaire Mobile' },
    category: 'mobile',
    categoryLabel: { en: 'Mobile Apps', fr: 'Applications Mobiles' },
    description: { en: 'Secure banking application for iOS and Android', fr: 'Application bancaire sécurisée pour iOS et Android' },
    image: 'Mobile_app_mockup_b758143d.png',
    technologies: ['React Native', 'Firebase', 'Biometric Auth'],
    challenge: { en: 'Creating a secure, user-friendly banking app that meets strict regulatory requirements while providing a seamless experience.', fr: 'Créer une application bancaire sécurisée et conviviale qui répond à des exigences réglementaires strictes tout en offrant une expérience transparente.' },
    solution: { en: 'Implemented multi-layer security with biometric authentication, end-to-end encryption, and comprehensive audit logging.', fr: 'Mise en œuvre d\'une sécurité multicouche avec authentification biométrique, chiffrement de bout en bout et journalisation d\'audit complète.' },
    results: [
      { en: '500K+ downloads in first 6 months', fr: '500K+ téléchargements en 6 mois' },
      { en: '4.8/5 app store rating', fr: 'Note de 4,8/5 sur l\'app store' },
      { en: 'Zero security incidents', fr: 'Aucun incident de sécurité' }
    ],
    screenshots: ['Mobile_app_mockup_b758143d.png', 'Web_app_dashboard_d564f681.png']
  },
  {
    id: '3',
    slug: 'enterprise-dashboard',
    title: { en: 'Enterprise Analytics Dashboard', fr: 'Tableau de Bord Analytique d\'Entreprise' },
    category: 'custom',
    categoryLabel: { en: 'Custom Software', fr: 'Logiciel Sur Mesure' },
    description: { en: 'Real-time business intelligence and reporting platform', fr: 'Plateforme d\'intelligence d\'affaires et de reporting en temps réel' },
    image: 'Enterprise_software_dashboard_9e058f15.png',
    technologies: ['Vue.js', 'Python', 'TensorFlow', 'PostgreSQL'],
    challenge: { en: 'Consolidating data from multiple sources into a unified analytics platform with real-time insights.', fr: 'Consolidation des données provenant de plusieurs sources dans une plateforme d\'analyse unifiée avec des informations en temps réel.' },
    solution: { en: 'Built a data pipeline with ETL processes, machine learning models for predictive analytics, and interactive visualizations.', fr: 'Construction d\'un pipeline de données avec des processus ETL, des modèles d\'apprentissage automatique pour l\'analyse prédictive et des visualisations interactives.' },
    results: [
      { en: '70% reduction in reporting time', fr: 'Réduction de 70% du temps de reporting' },
      { en: 'Real-time data from 15+ sources', fr: 'Données en temps réel de 15+ sources' },
      { en: '40% improvement in decision-making speed', fr: 'Amélioration de 40% de la vitesse de prise de décision' }
    ],
    screenshots: ['Enterprise_software_dashboard_9e058f15.png', 'Web_app_dashboard_d564f681.png']
  },
  {
    id: '4',
    slug: 'project-management-tool',
    title: { en: 'Project Management Tool', fr: 'Outil de Gestion de Projet' },
    category: 'web',
    categoryLabel: { en: 'Web Development', fr: 'Développement Web' },
    description: { en: 'Collaborative workspace for teams and project tracking', fr: 'Espace de travail collaboratif pour les équipes et le suivi de projets' },
    image: 'Project_management_software_c23ed5e4.png',
    technologies: ['React', 'GraphQL', 'MongoDB', 'WebSocket'],
    challenge: { en: 'Building a real-time collaboration platform that scales with team growth and supports complex project workflows.', fr: 'Construction d\'une plateforme de collaboration en temps réel qui évolue avec la croissance de l\'équipe et prend en charge des flux de travail de projet complexes.' },
    solution: { en: 'Developed a feature-rich platform with real-time updates, customizable workflows, and integrations with popular tools.', fr: 'Développement d\'une plateforme riche en fonctionnalités avec des mises à jour en temps réel, des flux de travail personnalisables et des intégrations avec des outils populaires.' },
    results: [
      { en: '1000+ active teams', fr: '1000+ équipes actives' },
      { en: '35% increase in productivity', fr: 'Augmentation de 35% de la productivité' },
      { en: '99.9% uptime achieved', fr: '99,9% de temps de disponibilité atteint' }
    ],
    screenshots: ['Project_management_software_c23ed5e4.png', 'Web_app_dashboard_d564f681.png']
  },
  {
    id: '5',
    slug: 'cloud-migration',
    title: { en: 'Cloud Infrastructure Migration', fr: 'Migration d\'Infrastructure Cloud' },
    category: 'cloud',
    categoryLabel: { en: 'Digital Transformation', fr: 'Transformation Digitale' },
    description: { en: 'Complete infrastructure modernization and cloud adoption', fr: 'Modernisation complète de l\'infrastructure et adoption du cloud' },
    image: 'Cloud_platform_dashboard_86d0bb3f.png',
    technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
    challenge: { en: 'Migrating legacy infrastructure to cloud while ensuring zero downtime and maintaining data security.', fr: 'Migration de l\'infrastructure legacy vers le cloud tout en garantissant zéro temps d\'arrêt et en maintenant la sécurité des données.' },
    solution: { en: 'Executed a phased migration strategy with containerization, automated deployment, and comprehensive disaster recovery.', fr: 'Exécution d\'une stratégie de migration par phases avec conteneurisation, déploiement automatisé et récupération après sinistre complète.' },
    results: [
      { en: '60% reduction in infrastructure costs', fr: 'Réduction de 60% des coûts d\'infrastructure' },
      { en: 'Zero downtime during migration', fr: 'Zéro temps d\'arrêt pendant la migration' },
      { en: '10x faster deployment cycles', fr: 'Cycles de déploiement 10x plus rapides' }
    ],
    screenshots: ['Cloud_platform_dashboard_86d0bb3f.png', 'Web_app_dashboard_d564f681.png']
  },
  {
    id: '6',
    slug: 'ai-powered-crm',
    title: { en: 'AI-Powered CRM System', fr: 'Système CRM Alimenté par IA' },
    category: 'custom',
    categoryLabel: { en: 'Custom Software', fr: 'Logiciel Sur Mesure' },
    description: { en: 'Intelligent customer relationship management with ML insights', fr: 'Gestion de la relation client intelligente avec des insights ML' },
    image: 'Web_app_dashboard_d564f681.png',
    technologies: ['Angular', 'Python', 'TensorFlow', 'Redis'],
    challenge: { en: 'Creating an intelligent CRM that predicts customer behavior and automates personalized engagement.', fr: 'Création d\'un CRM intelligent qui prédit le comportement des clients et automatise l\'engagement personnalisé.' },
    solution: { en: 'Integrated machine learning models for lead scoring, churn prediction, and recommendation engine for targeted campaigns.', fr: 'Intégration de modèles d\'apprentissage automatique pour le scoring des leads, la prédiction du churn et un moteur de recommandation pour les campagnes ciblées.' },
    results: [
      { en: '50% increase in lead conversion', fr: 'Augmentation de 50% de la conversion des leads' },
      { en: '30% reduction in customer churn', fr: 'Réduction de 30% du churn client' },
      { en: '2x improvement in campaign ROI', fr: 'Amélioration de 2x du ROI des campagnes' }
    ],
    screenshots: ['Web_app_dashboard_d564f681.png', 'Enterprise_software_dashboard_9e058f15.png']
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'future-of-web-development',
    title: { en: 'The Future of Web Development in 2025', fr: 'L\'Avenir du Développement Web en 2025' },
    excerpt: { en: 'Explore emerging trends and technologies shaping the future of web development.', fr: 'Explorez les tendances émergentes et les technologies qui façonnent l\'avenir du développement web.' },
    content: { en: 'Full article content here...', fr: 'Contenu complet de l\'article ici...' },
    category: 'technology',
    categoryLabel: { en: 'Technology', fr: 'Technologie' },
    image: 'Modern_office_interior_7cc1ed85.png',
    author: 'Sarah Chen',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    readTime: 8,
    publishedDate: '2025-01-15'
  },
  {
    id: '2',
    slug: 'digital-transformation-guide',
    title: { en: 'Complete Guide to Digital Transformation', fr: 'Guide Complet de la Transformation Digitale' },
    excerpt: { en: 'Learn how to successfully navigate digital transformation in your organization.', fr: 'Apprenez à naviguer avec succès dans la transformation digitale de votre organisation.' },
    content: { en: 'Full article content here...', fr: 'Contenu complet de l\'article ici...' },
    category: 'business',
    categoryLabel: { en: 'Business', fr: 'Affaires' },
    image: 'Team_meeting_collaboration_dfc2f0e9.png',
    author: 'Michael Rodriguez',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    readTime: 12,
    publishedDate: '2025-01-10'
  },
  {
    id: '3',
    slug: 'cloud-security-best-practices',
    title: { en: 'Cloud Security Best Practices', fr: 'Meilleures Pratiques de Sécurité Cloud' },
    excerpt: { en: 'Essential security measures for protecting your cloud infrastructure.', fr: 'Mesures de sécurité essentielles pour protéger votre infrastructure cloud.' },
    content: { en: 'Full article content here...', fr: 'Contenu complet de l\'article ici...' },
    category: 'security',
    categoryLabel: { en: 'Security', fr: 'Sécurité' },
    image: 'Modern_cityscape_offices_adc8f7a9.png',
    author: 'Emma Thompson',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    readTime: 10,
    publishedDate: '2025-01-05'
  }
];

export const faqs: FAQ[] = [
  {
    id: '1',
    category: 'general',
    categoryLabel: { en: 'General', fr: 'Général' },
    question: { en: 'What services does E&M Software System offer?', fr: 'Quels services offre E&M Software System ?' },
    answer: { en: 'We offer comprehensive software development services including web development, mobile app development, custom software solutions, cloud services, digital transformation, and IT consulting. Our team works closely with clients to deliver tailored solutions that meet their specific business needs.', fr: 'Nous offrons des services complets de développement logiciel, notamment le développement web, le développement d\'applications mobiles, les solutions logicielles personnalisées, les services cloud, la transformation digitale et le conseil informatique. Notre équipe travaille en étroite collaboration avec les clients pour fournir des solutions sur mesure qui répondent à leurs besoins commerciaux spécifiques.' }
  },
  {
    id: '2',
    category: 'general',
    categoryLabel: { en: 'General', fr: 'Général' },
    question: { en: 'How long does a typical project take?', fr: 'Combien de temps prend un projet typique ?' },
    answer: { en: 'Project timelines vary based on scope and complexity. A simple website might take 4-6 weeks, while a complex enterprise application could take 3-6 months. During our initial consultation, we provide a detailed timeline specific to your project requirements.', fr: 'Les délais du projet varient en fonction de la portée et de la complexité. Un site web simple peut prendre 4 à 6 semaines, tandis qu\'une application d\'entreprise complexe peut prendre 3 à 6 mois. Lors de notre consultation initiale, nous fournissons un calendrier détaillé spécifique aux exigences de votre projet.' }
  },
  {
    id: '3',
    category: 'services',
    categoryLabel: { en: 'Services', fr: 'Services' },
    question: { en: 'Do you provide ongoing support and maintenance?', fr: 'Offrez-vous un support et une maintenance continus ?' },
    answer: { en: 'Yes, we offer comprehensive support and maintenance packages to ensure your software continues to perform optimally. This includes bug fixes, security updates, performance monitoring, and feature enhancements as needed.', fr: 'Oui, nous offrons des forfaits de support et de maintenance complets pour garantir que votre logiciel continue de fonctionner de manière optimale. Cela comprend les corrections de bugs, les mises à jour de sécurité, la surveillance des performances et les améliorations de fonctionnalités selon les besoins.' }
  },
  {
    id: '4',
    category: 'services',
    categoryLabel: { en: 'Services', fr: 'Services' },
    question: { en: 'What technologies do you work with?', fr: 'Avec quelles technologies travaillez-vous ?' },
    answer: { en: 'We work with a wide range of modern technologies including React, Vue.js, Angular for frontend; Node.js, Python, Java for backend; AWS, Azure, Google Cloud for cloud services; and PostgreSQL, MongoDB for databases. We select the best technology stack for each project based on specific requirements.', fr: 'Nous travaillons avec un large éventail de technologies modernes, notamment React, Vue.js, Angular pour le frontend ; Node.js, Python, Java pour le backend ; AWS, Azure, Google Cloud pour les services cloud ; et PostgreSQL, MongoDB pour les bases de données. Nous sélectionnons la meilleure pile technologique pour chaque projet en fonction des exigences spécifiques.' }
  },
  {
    id: '5',
    category: 'pricing',
    categoryLabel: { en: 'Pricing', fr: 'Tarification' },
    question: { en: 'How do you price your services?', fr: 'Comment tarifiez-vous vos services ?' },
    answer: { en: 'We offer flexible pricing models including fixed-price projects, time and materials, and dedicated team arrangements. The best model depends on your project scope, timeline, and budget. We provide detailed quotes after understanding your requirements during the initial consultation.', fr: 'Nous proposons des modèles de tarification flexibles, notamment des projets à prix fixe, du temps et des matériaux, et des arrangements d\'équipe dédiée. Le meilleur modèle dépend de la portée de votre projet, du calendrier et du budget. Nous fournissons des devis détaillés après avoir compris vos besoins lors de la consultation initiale.' }
  },
  {
    id: '6',
    category: 'process',
    categoryLabel: { en: 'Process', fr: 'Processus' },
    question: { en: 'What is your development process?', fr: 'Quel est votre processus de développement ?' },
    answer: { en: 'We follow an agile development methodology with regular sprints and client feedback sessions. Our process includes: discovery and planning, design and prototyping, development and testing, deployment, and ongoing support. We maintain transparent communication throughout the entire project lifecycle.', fr: 'Nous suivons une méthodologie de développement agile avec des sprints réguliers et des sessions de feedback client. Notre processus comprend : la découverte et la planification, la conception et le prototypage, le développement et les tests, le déploiement et le support continu. Nous maintenons une communication transparente tout au long du cycle de vie du projet.' }
  }
];

export const menuItems = {
  en: [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Projects', path: '/projects' },
    { label: 'About', path: '/about' },
    { label: 'Blog', path: '/blog' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact', path: '/contact' }
  ],
  fr: [
    { label: 'Accueil', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Projets', path: '/projects' },
    { label: 'À Propos', path: '/about' },
    { label: 'Blog', path: '/blog' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact', path: '/contact' }
  ]
};
