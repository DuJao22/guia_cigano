import { CardProblem, Benefit, Chapter, Bonus, Testimonial } from './types';

export const PROBLEMS_DATA: CardProblem[] = [
  {
    id: 'p1',
    icon: '😔',
    title: 'Cansaço Sem Explicação',
    description: 'Você dorme bem, mas acorda sem energia. Sente que suas forças estão sendo drenadas por fontes invisíveis e ambientes pesados.'
  },
  {
    id: 'p2',
    icon: '😔',
    title: 'Sensação Espessa de Peso',
    description: 'Uma impaciência constante, dores inexplicáveis nos ombros ou na nuca, e uma nuvem escura que parece acompanhar você por onde passa.'
  },
  {
    id: 'p3',
    icon: '😔',
    title: 'Conflitos Constantes',
    description: 'Discussões tolas em casa, irritabilidade à flor da pele com quem você ama e desentendimentos recorrentes sem justificativa lógica.'
  },
  {
    id: 'p4',
    icon: '😔',
    title: 'Falta de Prosperidade',
    description: 'Caminhos financeiros travados, projetos promissores que dão errado de última hora e dinheiro que desaparece sem você perceber.'
  }
];

export const BENEFITS_DATA: Benefit[] = [
  {
    id: 'b1',
    icon: '✨',
    title: 'Energia Renovada',
    text: 'Sinta sua vitalidade retornar imediatamente.',
    description: 'Liberte-se do cansaço crônico e desperte todas as manhãs com disposição física, foco mental e leveza espiritual.'
  },
  {
    id: 'b2',
    icon: '✨',
    title: 'Mais Proteção',
    text: 'Aprenda a erguer barreiras invisíveis.',
    description: 'Fique imune a inveja, mau-olhado, fofocas e energias vampirizadoras vindas de pessoas tóxicas ou ambientes carregados.'
  },
  {
    id: 'b3',
    icon: '✨',
    title: 'Mais Equilíbrio',
    text: 'Paz interna restaurada.',
    description: 'Alcance estabilidade emocional profunda, paciência e harmonia duradoura no seu lar e no seu relacionamento familiar.'
  },
  {
    id: 'b4',
    icon: '✨',
    title: 'Mais Clareza',
    text: 'Caminhos abertos e visão limpa.',
    description: 'Tome decisões sábias e sinta o fluxo da prosperidade financeira e do sucesso profissional voltando a circular livremente.'
  }
];

export const CHAPTERS_DATA: Chapter[] = [
  {
    id: 1,
    title: 'Banhos Sagrados de Descarrego',
    subtitle: 'Capítulo 1',
    description: 'A ciência espiritual das ervas quentes, mornas e frias. Saiba a combinação exata de ervas protetoras para eliminar a negatividade e energizar sua aura.',
    duration: 'Fórmula Exata Prática',
    icon: '🍃',
    topics: [
      'Ervas de descarrego forte (Guiné, Arruda, Espada-de-São-Jorge)',
      'Como preparar o banho sem anular os princípios ativos das plantas',
      'O ritual de consagração e ativação da energia das ervas',
      'Banho de atração: reequilibrando a aura para o amor e prosperidade'
    ]
  },
  {
    id: 2,
    title: 'Limpeza e Purificação de Ambientes',
    subtitle: 'Capítulo 2',
    description: 'Como diagnosticar e neutralizar energias estagnadas ou nocivas presas nos cantos da sua casa, móveis antigos ou locais onde houve discussões graves.',
    duration: 'Passo a Passo Prático',
    icon: '🏡',
    topics: [
      'Ritual de defumação caseira simples com carvão e ervas',
      'Uso estratégico de sal grosso e limão para detecção e absorção de inveja',
      'Como sintonizar o som e a vibração para reorganizar o campo do lar',
      'A proteção dos portais da casa (portas e janelas)'
    ]
  },
  {
    id: 3,
    title: 'Blindagem e Escudos Espirituais',
    subtitle: 'Capítulo 3',
    description: 'Métodos ancestrais de autodefesa energética. Aprenda a programar cristais amuleto e a traçar barreiras protetoras em volta do seu corpo antes de sair de casa.',
    duration: 'Proteção 24 Horas',
    icon: '🛡️',
    topics: [
      'Como carregar e consagrar sua Turmalina Negra e Olho de Tigre',
      'Visualização ativa: Construindo o Escudo Energético Violeta',
      'Como se blindar contra vampiros de energia no ambiente de trabalho',
      'Desinfecção áurica urgente após receber visitas carregadas'
    ]
  },
  {
    id: 4,
    title: 'Orações Ancestrais de Libertação',
    subtitle: 'Capítulo 4',
    description: 'Orações de alta potência vibracional capazes de romper cordões energéticos doentios, quebrar amarras espirituais e abrir as travas que impedem seu progresso.',
    duration: 'Frequência Milenar',
    icon: '📜',
    topics: [
      'A Oração Oculta de São Miguel para quebra de correntes',
      'Preces de desobstrução e circulação de prosperidade divina',
      'Palavras de força para afastar espíritos zombeteiros e obsessores',
      'Salmos consagrados de proteção (Salmo 91 e Salmo 23 explicados)'
    ]
  },
  {
    id: 5,
    title: 'Rotina de Manutenção Energética',
    subtitle: 'Capítulo 5',
    description: 'Aprenda a estruturar um estilo de vida sintonizado com altas vibrações. Um plano diário de 5 minutos para nunca mais acumular poeira espiritual.',
    duration: 'Estilo de Vida Elevado',
    icon: '🧘',
    topics: [
      'A micro-meditação matinal para ancoragem espiritual',
      'Como reequilibrar seus centros de força (Chakras) de maneira simples',
      'Higiene mental preventiva e eliminação de pensamentos obsessivos',
      'O fechamento de corpo noturno e blindagem do sono contra pesadelos'
    ]
  }
];

export const BONUS_DATA: Bonus[] = [
  {
    id: 'bonus1',
    badge: 'BÔNUS EXCLUSIVO 1',
    title: 'Caderno de Defumação do Lar',
    description: 'O segredo ancestral das ervas aromáticas para afastar forças densas da sua casa.',
    originalPrice: 'R$ 69,90',
    icon: '🔥',
    details: [
      'Fórmulas com alecrim, sálvia e alfazema',
      'Como realizar a defumação no sentido correto',
      'Oração de purificação para recitar durante o processo'
    ]
  },
  {
    id: 'bonus2',
    badge: 'BÔNUS EXCLUSIVO 2',
    title: 'Áudio de Programação Mental 528Hz',
    description: 'Uma frequência de cura e regeneração celular das correntes sutis com mensagens subliminares.',
    originalPrice: 'R$ 89,00',
    icon: '🎧',
    details: [
      'Tecnologia binaural de purificação',
      'Indução ao sono reparador e blindagem mental',
      'Afirmações subliminares gravadas na camada quântica'
    ]
  },
  {
    id: 'bonus3',
    badge: 'BÔNUS EXCLUSIVO 3',
    title: 'Guia Prático de Cristais de Blindagem',
    description: 'O manual definitivo com os 7 cristais essenciais de proteção rápida.',
    originalPrice: 'R$ 49,90',
    icon: '💎',
    details: [
      'Como limpar fisicamente e energizar as pedras',
      'Onde colocar na casa ou no escritório',
      'Como consagrar o amuleto para que ele atue permanentemente'
    ]
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't1',
    name: 'Mariana Vasconcelos',
    role: 'Arquiteta',
    location: 'Belo Horizonte - MG',
    text: '“Minha casa vivia cheia de fofoca e intriga, eu sentia minhas pernas pesadas e uma preguiça inexplicável ao passar da porta. Fiz o banho ensinado e o ritual de sal grosso do capítulo 2. No mesmo dia a energia clareou de uma forma absurda! Sinto que respiro de verdade agora!”',
    avatarText: 'MV',
    stars: 5,
    date: 'Há 2 semanas'
  },
  {
    id: 't2',
    name: 'Carlos Alberto Mendes',
    role: 'Terapeuta e Empresário',
    location: 'São Paulo - SP',
    text: '“Como terapeuta, eu absorvia muita energia pesada dos outros. O capítulo de blindagem e escudos energéticos mudou minha rotina. Hoje consigo atender dezenas de pacientes sem terminar o dia esgotado. Essa apostila digital vale mais do que mentorias de milhares de reais.”',
    avatarText: 'CA',
    stars: 5,
    date: 'Há 1 mês'
  },
  {
    id: 't3',
    name: 'Helena Santos',
    role: 'Professora',
    location: 'Curitiba - PR',
    text: '“Eu estava desempregada, com processos travados e parecia que tudo que eu tentava fazer dava errado na última hora. Apliquei a oração oculta de desobstrução espiritual e comecei o cronograma de 5 minutos de manutenção. Dois dias depois fui chamada para uma entrevista! O dinheiro já se pagou no primeiro dia, sensacional!”',
    avatarText: 'HS',
    stars: 5,
    date: 'Há 3 dias'
  }
];
