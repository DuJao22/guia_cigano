import { CardProblem, Benefit, Chapter, Bonus, Testimonial } from './types';

export const PROBLEMS_DATA: CardProblem[] = [
  {
    id: 'p1',
    icon: '😔',
    title: 'Medo de Errar Previssões',
    description: 'Você sente uma forte atração pelas cartas, mas sente insegurança e medo de dar uma resposta errada ou de confundir quem está ouvindo.'
  },
  {
    id: 'p2',
    icon: '😔',
    title: 'Travar na Hora da Leitura',
    description: 'Até consegue memorizar o significado isolado de algumas cartas, mas na hora de abrir o jogo as ideias travam e você não sabe por onde começar.'
  },
  {
    id: 'p3',
    icon: '😔',
    title: 'Não Conectar as Cartas',
    description: 'Sabe o que cada carta significa, mas na hora de combiná-las em duplas ou trios, a interpretação parece não fazer sentido e fica confusa.'
  },
  {
    id: 'p4',
    icon: '😔',
    title: 'Falta de Intuição Prática',
    description: 'Sente que suas leituras são muito mecânicas e "frias", parecendo que está apenas lendo um dicionário em vez de acessar a intuição divina.'
  }
];

export const BENEFITS_DATA: Benefit[] = [
  {
    id: 'b1',
    icon: '✨',
    title: 'Intuição Desperta e Afiada',
    text: 'Sinta sua intuição guiar cada leitura de forma fluida.',
    description: 'Deixe para trás as interpretações decoradas e aprenda a escutar sua voz interior, conectando-se profundamente com a egrégora do Baralho Cigano.'
  },
  {
    id: 'b2',
    icon: '✨',
    title: 'Combinação Sem Esforço',
    text: 'Aprenda a criar conexões lógicas entre cartas.',
    description: 'Domine a gramática das cartas combinadas. Saiba exatamente o que significa quando a Foice cruza o Caixão ou quando o Cavaleiro encontra o Anel.'
  },
  {
    id: 'b3',
    icon: '✨',
    title: 'Confiança nos Atendimentos',
    text: 'Leitura segura para você e para os outros.',
    description: 'Tenha total segurança para ler para amigos, familiares e clientes reais, sabendo conduzir perguntas difíceis e fornecer orientações curativas.'
  },
  {
    id: 'b4',
    icon: '✨',
    title: 'Conselhos e Direcionamento',
    text: 'Use as cartas para clarear caminhos cotidianos.',
    description: 'Use o Baralho Cigano como um portal diário de sabedoria prática para clarear decisões no amor, trabalho, finanças e na espiritualidade.'
  }
];

export const CHAPTERS_DATA: Chapter[] = [
  {
    id: 1,
    title: 'O Despertar das 36 Cartas Sagradas',
    subtitle: 'Capítulo 1',
    description: 'O significado prático e intuitivo de cada uma das 36 cartas do Baralho Cigano. Aprenda a sentir a vibração e a linguagem visual de cada arcano de forma descomplicada.',
    duration: 'Manual de Significados Práticos',
    icon: '🃏',
    topics: [
      'A classificação das cartas: Positivas, Negativas e Neutras',
      'Cartas de pessoas, de sentimentos e de ações temporais',
      'Os segredos dos naipes e elementos associados a cada símbolo',
      'Como sintonizar sua energia mental e consagrar seu primeiro deck'
    ]
  },
  {
    id: 2,
    title: 'A Gramática das Combinações',
    subtitle: 'Capítulo 2',
    description: 'Aprenda a fazer as cartas conversarem entre si! Descubra o método definitivo para cruzar duas ou mais cartas e obter uma resposta coesa, sem rodeios ou dúvidas.',
    duration: 'Passo a Passo das Combinações',
    icon: '🔗',
    topics: [
      'O método da Carta Tema e das cartas adjacentes que a qualificam',
      'Aberturas dinâmicas em linha de 3 cartas para respostas diretas',
      'Como determinar prazos de tempo no jogo (dias, semanas, meses)',
      'Exemplos práticos de cruzamentos reais comentados (Amor e Dinheiro)'
    ]
  },
  {
    id: 3,
    title: 'Métodos de Tiragens e Jogos Práticos',
    subtitle: 'Capítulo 3',
    description: 'Domine os principais jogos de medição e aconselhamento do Baralho Cigano. Das perguntas simples de "Sim ou Não" até layouts de caminhos e previsões futuras.',
    duration: 'Técnicas de Jogo Profissionais',
    icon: '🌟',
    topics: [
      'Jogo de 1 Carta para o conselho diário rápido',
      'A Tiragem das 5 Cartas para analisar Passado, Presente e Destino',
      'Método da Estrela Cigana para direcionamento de caminhos e tomada de decisões',
      'Introdução ao Grand Tableau (Mesa Real): O jogo completo de 36 cartas'
    ]
  },
  {
    id: 4,
    title: 'Preparação, Limpeza e Consagração',
    subtitle: 'Capítulo 4',
    description: 'Rituais práticos para limpar energeticamente seu deck e despertar as cartas usando as forças naturais dos 4 elementos (terra, água, fogo e ar).',
    duration: 'Conexão Energética Forte',
    icon: '🔮',
    topics: [
      'Como purificar o baralho usando incenções e cristais amuleto',
      'O ritual tradicional de consagração e ativação da egrégora cigana',
      'Como se proteger espiritualmente e blindar seu campo áurico antes de ler',
      'Como guardar e acolher seu baralho em tecidos e cores corretas'
    ]
  },
  {
    id: 5,
    title: 'Ética Oracular e Atendimentos Extraordinários',
    subtitle: 'Capítulo 5',
    description: 'Como estruturar uma leitura profissional ou recreativa com total segurança, sabendo responder perguntas delicadas com empatia e autoridade, protegendo sua própria energia.',
    duration: 'Padrão Profissional',
    icon: '🤝',
    topics: [
      'Como formular perguntas precisas e evitar ambiguidades no jogo',
      'O sigilo e a ética de atendimento: como comunicar verdades difíceis',
      'Práticas para fechar e limpar o campo de jogo após a consulta',
      'Dicas essenciais para começar a precificar e divulgar suas primeiras leituras'
    ]
  }
];

export const BONUS_DATA: Bonus[] = [
  {
    id: 'bonus1',
    badge: 'BÔNUS EXCLUSIVO 1',
    title: 'Caderno de Combinações Rápidas (A-Z)',
    description: 'Um guia prático de referência rápida contendo as 100 principais combinações do Baralho Cigano para consulta ágil durante suas leituras.',
    originalPrice: 'R$ 69,90',
    icon: '📖',
    details: [
      'Dicionário rápido com combinações clássicas anotadas',
      'Foco direto em Amor, Relacionamentos, Finanças e Saúde',
      'Ideal para consultar na tela do celular durante o treino'
    ]
  },
  {
    id: 'bonus2',
    badge: 'BÔNUS EXCLUSIVO 2',
    title: 'Áudio de Programação Intuitiva 528Hz',
    description: 'Frequência de cura harmônica para silenciar a mente racional analítica e abrir o chakra frontal antes de iniciar seus jogos.',
    originalPrice: 'R$ 89,00',
    icon: '🎧',
    details: [
      'Áudio de alta fidelidade com onda binaural de relaxamento',
      'Reduz a ansiedade e clareia o medo mental de errar previsões',
      'Excelente para ambientar seu espaço sagrado de leitura'
    ]
  },
  {
    id: 'bonus3',
    badge: 'BÔNUS EXCLUSIVO 3',
    title: 'Guia de Jogos Específicos para o Amor',
    description: 'Apostila com métodos exclusivos para desvendar sentimentos ocultos, compatibilidades de parceiros e tendências afetivas.',
    originalPrice: 'R$ 49,90',
    icon: '💝',
    details: [
      'O jogo do Templo de Afrodite adaptado ao Baralho Cigano',
      'Indicação exata de intenções, atitudes e a energia mútua do casal',
      'Identificação de influências externas, reconciliações ou novos rumos'
    ]
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't1',
    name: 'Mariana Vasconcelos',
    role: 'Estudante de Oráculos',
    location: 'Belo Horizonte - MG',
    text: '“Comprei o guia e em menos de uma semana já consegui ler para minhas amigas usando o passo a passo das combinações do capítulo 2. Elas ficaram chocadas com os detalhes e acertos!”',
    avatarText: 'MV',
    stars: 5,
    date: 'Há 2 semanas'
  },
  {
    id: 't2',
    name: 'Carlos Alberto Mendes',
    role: 'Terapeuta Holístico',
    location: 'São Paulo - SP',
    text: '“Sempre tive baralhos parados na gaveta com vergonha de ler. O manual de consagração e tiragens me deu a confiança que faltava. Hoje realizo previsões precisas de 5 cartas nos meus atendimentos para apoiar meus pacientes.”',
    avatarText: 'CA',
    stars: 5,
    date: 'Há 1 mês'
  },
  {
    id: 't3',
    name: 'Helena Santos',
    role: 'Cartomante Iniciante',
    location: 'Curitiba - PR',
    text: '“Excelente didática! O manual de ética oracular e a apostila de combinações rápidas de amor valem ouro. Consegui tirar as dúvidas que cursos caríssimos nunca me responderam. Já estou cobrando minhas primeiras consultas!”',
    avatarText: 'HS',
    stars: 5,
    date: 'Há 3 dias'
  }
];
