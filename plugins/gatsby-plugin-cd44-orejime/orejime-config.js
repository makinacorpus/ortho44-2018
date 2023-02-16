exports.orejimeConfig = {
  lang: 'fr',
  privacyPolicy: 'https://www.loire-atlantique.fr/rgpd',
  logo: 'https://design.loire-atlantique.fr/assets/images/pictos/picto-cookies.svg',
  translations: {
    fr: {
      consentModal: {
        title: 'Gestion de vos préférences sur les cookies',
        description: 'Les fonctionnalités de ce site listées ci-dessous s’appuient sur des services proposés par des tiers (Statistiques Google Analytics, vidéo YouTube, etc.). \r\nSi vous donnez votre consentement, ces tiers déposeront des cookies qui vous permettront de visualiser directement sur loire-atlantique.fr du contenu hébergé par ces tiers ou de partager nos contenus.\r\nVia ces cookies, ces tiers collecteront et utiliseront vos données de navigation pour des finalités qui leur sont propres, conformément à leur politique de confidentialité (liens ci-dessous).\r\nCette page vous permet de donner ou de retirer votre consentement, soit globalement soit finalité par finalité.',
        privacyPolicy: {
          name: 'politique de confidentialité',
          text: 'Pour en savoir plus, merci de lire notre {privacyPolicy}',
        },
      },
      consentNotice: {
        description: 'Le site vuduciel.loire-atlantique.fr utilise des cookies afin d’analyser notre trafic.\r\nCliquez sur le bouton « J’accepte » pour donner votre consentement à ces opérations. Vous pouvez modifier vos préférences en cliquant sur le bouton « Je paramètre ». ',
        learnMore: 'Je paramètre les cookies',
        privacyPolicy: {
          name: 'politique de confidentialité',
          text: 'Pour en savoir plus, merci de lire notre {privacyPolicy}',
        },
      },
      accept: 'J’accepte les cookies',
      acceptAll: 'J’accepte tout',
      decline: 'Je refuse les cookies',
      declineAll: 'Je refuse tout',
      purposes: { analytics: 'Analyse' },
      'google-tag-manager': { description: 'Nous utilisons Google Analytics par l’intermédiaire de Google Tag Manager pour collecter des informations analytiques sur nos utilisateurs.' },
      orejime: { description: 'Ce cookie est utilisé par notre gestionnaire de cookies pour mémoriser vos préférences.' },
    },
    en: { purposes: { analytics: 'Analytics' } },
  },
  apps: [
    {
      name: 'google-tag-manager',
      title: 'Google Analytics et Tag Manager',
      cookies: [
        '_ga',
        '_gat',
        '_gid',
        '__utma',
        '__utmb',
        '__utmc',
        '__utmt',
        '__utmz',
        '_gat_gtag_GTM-WHL52DJ',
        '_gat_GTM-WHL52DJ',
        '_gat_gtag_GTM-TPB269K',
        '_gat_GTM-TPB269K',
      ],
      optOut: true,
      purposes: ['analytics'],
    },
    { name: 'orejime', title: 'orejime', purposes: [], required: true },
  ],
};
