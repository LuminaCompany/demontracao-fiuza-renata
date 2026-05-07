// ── Clínica Renata Fiuza — Mock Data ────────────────────────────────────────────
// Todos os dados são fictícios para fins de demonstração.

export type LeadStatus = "ativo" | "pendente" | "potencial" | "finalizado";
export type AttendantStatus = "online" | "offline" | "busy";
export type MessageSender = "client" | "attendant" | "system";

export type AtendimentoStage =
  | "novo_contato"
  | "em_orcamento"
  | "proposta_enviada"
  | "aguardando_aprovacao"
  | "pagamento_pendente"
  | "em_producao"
  | "instalacao_agendada"
  | "pos_venda";

export const STAGE_LABELS: Record<AtendimentoStage, string> = {
  novo_contato: "Novo Contato",
  em_orcamento: "Consulta Agendada",
  proposta_enviada: "Consulta Confirmada",
  aguardando_aprovacao: "Em Consulta",
  pagamento_pendente: "Retorno Agendado",
  em_producao: "Cirurgia Agendada",
  instalacao_agendada: "Cirurgia Confirmada",
  pos_venda: "Pós-Atendimento",
};

export const STAGE_ORDER: AtendimentoStage[] = [
  "novo_contato",
  "em_orcamento",
  "proposta_enviada",
  "aguardando_aprovacao",
  "pagamento_pendente",
  "em_producao",
  "instalacao_agendada",
  "pos_venda",
];

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Attendant {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  department: string;
  status: AttendantStatus;
  activeCount: number;
  totalToday: number;
  totalMonth: number;
  avgResponseTime: number; // minutos
  color: string;
}

export interface Message {
  id: string;
  content: string;
  sender: MessageSender;
  senderName?: string;
  time: string;
  status?: "sent" | "delivered" | "read";
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  company?: string;
  address?: string;
  region?: string;
  status: LeadStatus;
  stage?: AtendimentoStage;
  pendingItems?: string[];
  attendanceSummary?: string;
  tagIds: string[];
  attendantId?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
  notes?: string;
  createdAt: string;
  lastPurchase?: string;
  lastPurchaseValue?: number;
  totalPurchases: number;
  totalSpent: number;
  // Campos clínica
  doctor?: string;
  healthInsurance?: string;
  appointmentDate?: string;
  appointmentType?: "consulta" | "retorno" | "cirurgia" | "exame";
  attendedBy?: "ia" | "humano";
  followUpName?: string;
  followUpActivatesIn?: string;
}

export interface Account {
  id: string;
  name: string;
  role: "gestor" | "atendente";
  initials: string;
  email: string;
  color: string;
}

// ── Tags ─────────────────────────────────────────────────────────
export const tags: Tag[] = [
  { id: "t1", name: "Consulta Pré-natal", color: "blue" },
  { id: "t2", name: "Alta Prioridade", color: "red" },
  { id: "t3", name: "Urgente", color: "red" },
  { id: "t4", name: "Plano de Saúde", color: "amber" },
  { id: "t5", name: "Particular", color: "green" },
  { id: "t6", name: "Retorno", color: "orange" },
  { id: "t7", name: "Novo Paciente", color: "violet" },
  { id: "t8", name: "Follow-up", color: "pink" },
  { id: "t9", name: "Cirurgia", color: "teal" },
  { id: "t10", name: "VIP", color: "yellow" },
];

// ── Atendentes ────────────────────────────────────────────────────
export const attendants: Attendant[] = [
  {
    id: "a1",
    name: "Ana Lima",
    initials: "AL",
    email: "ana@clinicabemestar.com.br",
    phone: "44 9 8801-2233",
    department: "Recepção",
    status: "online",
    activeCount: 14,
    totalToday: 22,
    totalMonth: 187,
    avgResponseTime: 3.2,
    color: "#f59e0b",
  },
  {
    id: "a2",
    name: "Fernanda Silva",
    initials: "FS",
    email: "fernanda@clinicabemestar.com.br",
    phone: "44 9 9912-4455",
    department: "Recepção",
    status: "online",
    activeCount: 8,
    totalToday: 15,
    totalMonth: 134,
    avgResponseTime: 5.1,
    color: "#ec4899",
  },
  {
    id: "a3",
    name: "Marcos Costa",
    initials: "MC",
    email: "marcos@clinicabemestar.com.br",
    phone: "44 9 9745-6677",
    department: "Recepção",
    status: "online",
    activeCount: 25,
    totalToday: 31,
    totalMonth: 220,
    avgResponseTime: 2.8,
    color: "#3b82f6",
  },
  {
    id: "a4",
    name: "Carla Andrade",
    initials: "CA",
    email: "carla@clinicabemestar.com.br",
    phone: "44 9 8823-8899",
    department: "Administrativo",
    status: "busy",
    activeCount: 6,
    totalToday: 9,
    totalMonth: 98,
    avgResponseTime: 7.4,
    color: "#8b5cf6",
  },
  {
    id: "a5",
    name: "Dra. Renata Fiuza",
    initials: "RF",
    email: "renata@clinicabemestar.com.br",
    phone: "44 9 9034-1122",
    department: "Direção / Obstetrícia",
    status: "online",
    activeCount: 5,
    totalToday: 8,
    totalMonth: 72,
    avgResponseTime: 4.0,
    color: "#10b981",
  },
  {
    id: "a6",
    name: "Patricia Moura",
    initials: "PM",
    email: "patricia@clinicabemestar.com.br",
    phone: "44 9 9234-5566",
    department: "Recepção",
    status: "online",
    activeCount: 18,
    totalToday: 26,
    totalMonth: 198,
    avgResponseTime: 3.5,
    color: "#f97316",
  },
  {
    id: "a7",
    name: "Juliana Rocha",
    initials: "JR",
    email: "juliana@clinicabemestar.com.br",
    phone: "44 9 9345-6677",
    department: "Financeiro",
    status: "online",
    activeCount: 11,
    totalToday: 17,
    totalMonth: 145,
    avgResponseTime: 4.2,
    color: "#06b6d4",
  },
  {
    id: "a8",
    name: "Beatriz Nunes",
    initials: "BN",
    email: "beatriz@clinicabemestar.com.br",
    phone: "44 9 9456-7788",
    department: "Enfermagem",
    status: "busy",
    activeCount: 9,
    totalToday: 13,
    totalMonth: 112,
    avgResponseTime: 5.8,
    color: "#84cc16",
  },
  {
    id: "a9",
    name: "Sandra Oliveira",
    initials: "SO",
    email: "sandra@clinicabemestar.com.br",
    phone: "44 9 9567-8899",
    department: "Recepção",
    status: "offline",
    activeCount: 0,
    totalToday: 7,
    totalMonth: 88,
    avgResponseTime: 6.1,
    color: "#e11d48",
  },
  {
    id: "a10",
    name: "Dr. Carlos Mendes",
    initials: "CM",
    email: "carlos@clinicabemestar.com.br",
    phone: "44 9 9678-9900",
    department: "Ginecologia",
    status: "offline",
    activeCount: 0,
    totalToday: 5,
    totalMonth: 64,
    avgResponseTime: 4.8,
    color: "#14b8a6",
  },
  {
    id: "a11",
    name: "Diretoria",
    initials: "DI",
    email: "diretoria@clinicabemestar.com.br",
    phone: "44 9 9789-0011",
    department: "Direção",
    status: "offline",
    activeCount: 0,
    totalToday: 2,
    totalMonth: 18,
    avgResponseTime: 15.0,
    color: "#1d4ed8",
  },
  {
    id: "a12",
    name: "Reserva",
    initials: "RE",
    email: "reserva@clinicabemestar.com.br",
    phone: "44 9 9890-1122",
    department: "Geral",
    status: "offline",
    activeCount: 0,
    totalToday: 0,
    totalMonth: 12,
    avgResponseTime: 8.0,
    color: "#6b7280",
  },
  {
    id: "a13",
    name: "Dra. Patricia Lima",
    initials: "PL",
    email: "plima@clinicabemestar.com.br",
    phone: "44 9 9901-2233",
    department: "Ultrassonografia",
    status: "online",
    activeCount: 7,
    totalToday: 11,
    totalMonth: 93,
    avgResponseTime: 5.0,
    color: "#a855f7",
  },
  {
    id: "a14",
    name: "Dr. Roberto Alves",
    initials: "RA",
    email: "roberto@clinicabemestar.com.br",
    phone: "44 9 9012-3344",
    department: "Clínica Geral",
    status: "online",
    activeCount: 3,
    totalToday: 6,
    totalMonth: 44,
    avgResponseTime: 9.0,
    color: "#dc2626",
  },
];

// ── Contas (login demo) ────────────────────────────────────────────
export const accounts: Account[] = [
  { id: "acc1", name: "Dra. Renata Fiuza", role: "gestor", initials: "RF", email: "renata@clinicabemestar.com.br", color: "#10b981" },
  { id: "acc3", name: "Ana Lima", role: "atendente", initials: "AL", email: "ana@clinicabemestar.com.br", color: "#f59e0b" },
  { id: "acc5", name: "Marcos Costa", role: "atendente", initials: "MC", email: "marcos@clinicabemestar.com.br", color: "#3b82f6" },
];

// ── Mensagens Rápidas ─────────────────────────────────────────────
export const quickMessages = [
  {
    id: "qm1",
    title: "Boas-vindas",
    content:
      "Olá! Bem-vindo(a) à Clínica Bem Estar 😊 Como posso ajudar você hoje? Estamos aqui para cuidar de você com todo carinho!",
    category: "Abertura",
  },
  {
    id: "qm2",
    title: "Consulta agendada",
    content:
      "Sua consulta foi agendada com sucesso! ✅ Confirmaremos o horário exato em breve. Lembre-se de trazer documento com foto e carteirinha do plano de saúde.",
    category: "Agendamento",
  },
  {
    id: "qm3",
    title: "Solicitar dados do paciente",
    content:
      "Para realizar o agendamento, preciso de algumas informações: nome completo, data de nascimento, número de telefone e plano de saúde (ou pagamento particular). Pode me informar? 📋",
    category: "Agendamento",
  },
  {
    id: "qm4",
    title: "Confirmação de cirurgia",
    content:
      "Sua cirurgia foi confirmada! 🎉 Nossa equipe entrará em contato para passar todas as orientações de preparo. Qualquer dúvida, estamos à disposição!",
    category: "Cirurgia",
  },
  {
    id: "qm5",
    title: "Preparo para consulta",
    content:
      "Para sua consulta, lembre-se de trazer: documento com foto 📄, carteirinha do plano de saúde, exames anteriores (se houver) e chegar 15 minutos antes do horário marcado. 🕐",
    category: "Orientações",
  },
  {
    id: "qm6",
    title: "Planos aceitos",
    content:
      "Trabalhamos com os principais planos de saúde: Unimed, Amil, Bradesco Saúde, SulAmérica, Hapvida e Porto Seguro. Também atendemos particular com formas de pagamento facilitadas. Qual é o seu plano?",
    category: "Financeiro",
  },
  {
    id: "qm7",
    title: "Encerramento",
    content:
      "Foi um prazer atender você! 💙 Qualquer dúvida sobre consultas, exames ou procedimentos, estamos à disposição. Cuide-se!",
    category: "Encerramento",
  },
];

// ── Leads / Pacientes ─────────────────────────────────────────────
export const leads: Lead[] = [
  // ── Paciente 1: Potencial — novo contato ──
  {
    id: "l1",
    name: "Maria Fernanda Santos",
    phone: "44 9 9801-2345",
    email: "mariafernanda@gmail.com",
    status: "potencial",
    stage: "novo_contato",
    pendingItems: [
      "Retornar mensagem da paciente",
      "Informar opções de médicos disponíveis",
    ],
    tagIds: ["t1", "t7"],
    attendantId: "a1",
    lastMessage: "Oi, gostaria de agendar uma consulta de pré-natal",
    lastMessageTime: "09:47",
    unreadCount: 0,
    totalPurchases: 0,
    totalSpent: 0,
    createdAt: "2024-04-15",
    notes: "Nova paciente, chegou via Instagram.",
    appointmentType: "consulta",
    attendedBy: "ia",
    appointmentDate: "A definir",
    messages: [
      {
        id: "m1",
        content: "Oi, gostaria de agendar uma consulta de pré-natal",
        sender: "client",
        time: "09:44",
        status: "read",
      },
      {
        id: "m2",
        content: "Atendimento recebido — Ana Lima (Recepção)",
        sender: "system",
        time: "09:44",
      },
      {
        id: "m3",
        content: "Olá, Maria Fernanda! 😊 Fico feliz em ajudar com o agendamento de pré-natal.\n\nPoderia me informar seu nome completo e se possui plano de saúde ou pagará particular?",
        sender: "attendant",
        senderName: "IA — Mari",
        time: "09:45",
        status: "sent",
      },
    ],
  },

  // ── Paciente 2: Ativo — consulta agendada ──
  {
    id: "l2",
    name: "Juliana Costa Rodrigues",
    phone: "44 9 9723-8876",
    email: "juliana.costa@outlook.com",
    status: "ativo",
    stage: "em_orcamento",
    pendingItems: [
      "Aguardando confirmação de presença para sexta-feira às 14h",
      "Enviar orientações de preparo para a consulta",
    ],
    tagIds: ["t1", "t4", "t7"],
    attendantId: "a1",
    lastMessage: "Ótimo! Vou estar lá na sexta com certeza 😊",
    lastMessageTime: "14:32",
    unreadCount: 0,
    totalPurchases: 1,
    totalSpent: 280,
    lastPurchase: "Consulta Pré-natal — Dra. Renata Fiuza",
    lastPurchaseValue: 280,
    createdAt: "2024-03-10",
    notes: "Paciente gestante, 12 semanas. Prefere atendimento às sextas.",
    doctor: "Dra. Renata Fiuza",
    healthInsurance: "Unimed",
    appointmentDate: "Sexta-feira, 14h",
    appointmentType: "consulta",
    attendedBy: "ia",
    messages: [
      {
        id: "m1",
        content: "Olá! Quero agendar consulta de pré-natal com a Dra. Renata",
        sender: "client",
        time: "10:15",
        status: "read",
      },
      {
        id: "m2",
        content: "Atendimento recebido — Ana Lima (Recepção)",
        sender: "system",
        time: "10:15",
      },
      {
        id: "m3",
        content:
          "Olá Juliana! Aqui é a Ana 😊 Que ótimo você entrar em contato! A Dra. Renata tem disponibilidade na sexta-feira às 14h. Você possui plano de saúde?",
        sender: "attendant",
        senderName: "Ana Lima",
        time: "10:18",
        status: "read",
      },
      {
        id: "m4",
        content: "Tenho sim, sou Unimed",
        sender: "client",
        time: "10:22",
        status: "read",
      },
      {
        id: "m5",
        content:
          "Perfeito! Trabalhamos com Unimed ✅ Sua consulta está pré-agendada para sexta-feira às 14h com a Dra. Renata Fiuza. Pode confirmar presença?",
        sender: "attendant",
        senderName: "Ana Lima",
        time: "10:25",
        status: "read",
      },
      {
        id: "m6",
        content: "Ótimo! Vou estar lá na sexta com certeza 😊",
        sender: "client",
        time: "14:32",
        status: "read",
      },
    ],
  },

  // ── Paciente 3: Ativo — consulta confirmada ──
  {
    id: "l3",
    name: "Camila Rodrigues Oliveira",
    phone: "44 9 9612-5544",
    email: "camila.rodrigues@gmail.com",
    status: "ativo",
    stage: "proposta_enviada",
    pendingItems: [
      "Enviar lembrete de consulta — amanhã às 10h",
    ],
    tagIds: ["t1", "t4"],
    attendantId: "a2",
    lastMessage: "Combinado! Até amanhã então 🌸",
    lastMessageTime: "16:10",
    unreadCount: 0,
    totalPurchases: 1,
    totalSpent: 250,
    lastPurchase: "Consulta Ginecológica — Dr. Carlos Mendes",
    lastPurchaseValue: 250,
    createdAt: "2024-04-01",
    doctor: "Dr. Carlos Mendes",
    healthInsurance: "Amil",
    appointmentDate: "Terça-feira, 10h",
    appointmentType: "consulta",
    attendedBy: "ia",
    messages: [
      {
        id: "m1",
        content: "Boa tarde! Quero consulta com Dr. Carlos, tenho plano Amil",
        sender: "client",
        time: "15:30",
        status: "read",
      },
      {
        id: "m2",
        content: "Atendimento recebido — Fernanda Silva (Recepção)",
        sender: "system",
        time: "15:30",
      },
      {
        id: "m3",
        content:
          "Boa tarde, Camila! 💙 Aceitamos Amil sim! O Dr. Carlos tem disponibilidade na terça-feira às 10h. Vou confirmar seu agendamento!",
        sender: "attendant",
        senderName: "Fernanda Silva",
        time: "15:35",
        status: "read",
      },
      {
        id: "m4",
        content: "Perfeito! Pode confirmar sim",
        sender: "client",
        time: "15:40",
        status: "read",
      },
      {
        id: "m5",
        content:
          "✅ Consulta confirmada! Terça-feira, 10h com Dr. Carlos Mendes. Traga carteirinha Amil e documento com foto. A clínica fica na Av. Brasil, 1450.",
        sender: "attendant",
        senderName: "Fernanda Silva",
        time: "15:42",
        status: "read",
      },
      {
        id: "m6",
        content: "Combinado! Até amanhã então 🌸",
        sender: "client",
        time: "16:10",
        status: "read",
      },
    ],
  },

  // ── Paciente 4: Ativo — em consulta ──
  {
    id: "l4",
    name: "Beatriz Lima Ferreira",
    phone: "44 9 9534-7788",
    status: "ativo",
    stage: "aguardando_aprovacao",
    pendingItems: [
      "Paciente em consulta agora — aguardar retorno",
      "Solicitar resultado de exames de ultrassom",
    ],
    tagIds: ["t1", "t4", "t2"],
    attendantId: "a3",
    lastMessage: "Estou na clínica agora! Obrigada pelo lembrete ❤️",
    lastMessageTime: "10:05",
    unreadCount: 0,
    totalPurchases: 3,
    totalSpent: 1850,
    lastPurchase: "Consulta Pré-natal + Ultrassom Morfológico",
    lastPurchaseValue: 650,
    createdAt: "2024-01-20",
    notes: "Paciente com 28 semanas de gestação. Acompanhamento mensal.",
    doctor: "Dra. Renata Fiuza",
    healthInsurance: "Bradesco Saúde",
    appointmentDate: "Hoje, 10h",
    appointmentType: "consulta",
    attendedBy: "ia",
    messages: [
      {
        id: "m1",
        content: "Lembrete: sua consulta hoje às 10h com a Dra. Renata! 💙",
        sender: "attendant",
        senderName: "Marcos Costa",
        time: "08:00",
        status: "read",
      },
      {
        id: "m2",
        content: "Estou na clínica agora! Obrigada pelo lembrete ❤️",
        sender: "client",
        time: "10:05",
        status: "read",
      },
    ],
  },

  // ── Paciente 5: Ativo — retorno agendado ──
  {
    id: "l5",
    name: "Sandra Pereira Gomes",
    phone: "44 9 9445-3322",
    email: "sandra.pereira@hotmail.com",
    status: "ativo",
    stage: "pagamento_pendente",
    pendingItems: [
      "Confirmar retorno para daqui 30 dias",
      "Solicitar resultado do exame de toxoplasmose",
    ],
    tagIds: ["t6", "t4"],
    attendantId: "a6",
    lastMessage: "Pode confirmar o retorno para dia 28 às 09h 👍",
    lastMessageTime: "11:20",
    unreadCount: 0,
    totalPurchases: 5,
    totalSpent: 3200,
    lastPurchase: "Consulta Pré-natal — Retorno",
    lastPurchaseValue: 280,
    createdAt: "2023-11-05",
    doctor: "Dra. Renata Fiuza",
    healthInsurance: "SulAmérica",
    appointmentDate: "Dia 28, 09h",
    appointmentType: "retorno",
    attendedBy: "humano",
    messages: [
      {
        id: "m1",
        content:
          "Sandra, a Dra. Renata solicitou retorno daqui 30 dias. Temos disponibilidade no dia 28 às 09h ou às 14h. Qual prefere?",
        sender: "attendant",
        senderName: "Patricia Moura",
        time: "11:00",
        status: "read",
      },
      {
        id: "m2",
        content: "Pode confirmar o retorno para dia 28 às 09h 👍",
        sender: "client",
        time: "11:20",
        status: "read",
      },
    ],
  },

  // ── Paciente 6: Ativo — cirurgia agendada (cesárea) ──
  {
    id: "l6",
    name: "Fernanda Oliveira Costa",
    phone: "44 9 9356-6699",
    email: "fernanda.oliveira@gmail.com",
    status: "ativo",
    stage: "em_producao",
    pendingItems: [
      "Enviar protocolo de preparo pré-operatório",
      "Confirmar anestesista — Dr. Paulo Melo",
      "Solicitar exames pré-cirúrgicos",
    ],
    tagIds: ["t9", "t2", "t4"],
    attendantId: "a5",
    lastMessage: "Estou muito ansiosa mas confiante na equipe! 🙏",
    lastMessageTime: "Ontem",
    unreadCount: 2,
    totalPurchases: 8,
    totalSpent: 12400,
    lastPurchase: "Cesárea eletiva — programada",
    lastPurchaseValue: 8500,
    createdAt: "2023-08-15",
    notes: "Gestação de alto risco. 38 semanas. Cesárea eletiva programada para dia 15.",
    doctor: "Dra. Renata Fiuza",
    healthInsurance: "Unimed",
    appointmentDate: "Dia 15, 07h",
    appointmentType: "cirurgia",
    attendedBy: "humano",
    messages: [
      {
        id: "m1",
        content:
          "Fernanda, sua cesárea está confirmada para o dia 15 às 07h! 🍼 A Dra. Renata irá te ligar ainda hoje para conversar.",
        sender: "attendant",
        senderName: "Dra. Renata Fiuza",
        time: "14:00",
        status: "read",
      },
      {
        id: "m2",
        content: "Meu Deus que emoção! Que horas devo chegar na clínica?",
        sender: "client",
        time: "14:15",
        status: "read",
      },
      {
        id: "m3",
        content:
          "Chegue às 05h30 para os preparativos. Esteja em jejum a partir das 22h do dia anterior. Pode trazer acompanhante 💙",
        sender: "attendant",
        senderName: "Dra. Renata Fiuza",
        time: "14:20",
        status: "read",
      },
      {
        id: "m4",
        content: "Estou muito ansiosa mas confiante na equipe! 🙏",
        sender: "client",
        time: "18:45",
        status: "delivered",
      },
    ],
  },

  // ── Paciente 7: Ativo — cirurgia confirmada ──
  {
    id: "l7",
    name: "Ana Paula Mendes",
    phone: "44 9 9267-5544",
    email: "ana.mendes@yahoo.com",
    status: "ativo",
    stage: "instalacao_agendada",
    pendingItems: [
      "Confirmar presença de anestesista e equipe cirúrgica",
      "Checar resultado dos exames pré-operatórios",
    ],
    tagIds: ["t9", "t4", "t10"],
    attendantId: "a5",
    lastMessage: "Tudo certo! Exames entregues na clínica 📋",
    lastMessageTime: "Há 2 dias",
    unreadCount: 0,
    totalPurchases: 12,
    totalSpent: 18600,
    lastPurchase: "Miomectomia laparoscópica",
    lastPurchaseValue: 9800,
    createdAt: "2023-05-10",
    notes: "Paciente VIP. Já realizou 3 cirurgias na clínica.",
    doctor: "Dra. Renata Fiuza",
    healthInsurance: "Amil",
    appointmentDate: "Dia 20, 08h",
    appointmentType: "cirurgia",
    attendedBy: "humano",
    messages: [
      {
        id: "m1",
        content:
          "Ana Paula, tudo certo com sua cirurgia para o dia 20! Todos os exames foram aprovados. ✅",
        sender: "attendant",
        senderName: "Dra. Renata Fiuza",
        time: "09:00",
        status: "read",
      },
      {
        id: "m2",
        content: "Tudo certo! Exames entregues na clínica 📋",
        sender: "client",
        time: "10:30",
        status: "read",
      },
    ],
  },

  // ── Paciente 8: Finalizado — pós-atendimento ──
  {
    id: "l8",
    name: "Luciana Souza Martins",
    phone: "44 9 9178-3311",
    email: "luciana.souza@gmail.com",
    status: "finalizado",
    stage: "pos_venda",
    pendingItems: [],
    attendanceSummary:
      "Paciente Luciana Souza realizou pré-natal completo na clínica ao longo de 9 meses.\n\nServiços realizados:\n• 8 consultas de pré-natal — Dra. Renata Fiuza\n• 3 ultrassonografias morfológicas\n• Cesárea eletiva em 12/01/2024\n\nEvolução excelente. Bebê nasceu saudável com 3,2kg. Paciente e bebê tiveram alta após 48h. Retorno pós-parto agendado para 30 dias.",
    tagIds: ["t5", "t10"],
    attendantId: "a6",
    lastMessage: "Minha filha nasceu! Muito obrigada por tudo ❤️🍼",
    lastMessageTime: "Há 3 dias",
    unreadCount: 0,
    totalPurchases: 12,
    totalSpent: 14800,
    lastPurchase: "Cesárea eletiva + pós-operatório",
    lastPurchaseValue: 8500,
    createdAt: "2023-04-10",
    doctor: "Dra. Renata Fiuza",
    healthInsurance: "Particular",
    appointmentType: "cirurgia",
    attendedBy: "humano",
    messages: [
      {
        id: "m1",
        content: "Luciana! Como você e o bebê estão? 💙",
        sender: "attendant",
        senderName: "Patricia Moura",
        time: "10:00",
        status: "read",
      },
      {
        id: "m2",
        content: "Minha filha nasceu! Muito obrigada por tudo ❤️🍼",
        sender: "client",
        time: "10:15",
        status: "read",
      },
      {
        id: "m3",
        content:
          "Que notícia maravilhosa! 🎉 Estamos muito felizes! Seu retorno pós-parto está agendado para daqui 30 dias com a Dra. Renata.",
        sender: "attendant",
        senderName: "Patricia Moura",
        time: "10:18",
        status: "read",
      },
    ],
  },

  // ── Paciente 9: Follow UP ──
  {
    id: "l9",
    name: "Tatiana Lima Alves",
    phone: "44 9 9089-4455",
    status: "pendente",
    stage: "novo_contato",
    pendingItems: [
      "Retornar contato — paciente aguarda informações",
      "Enviar lista de planos de saúde aceitos",
    ],
    tagIds: ["t7", "t1"],
    lastMessage: "Sim, trabalhamos com Hapvida ✅",
    lastMessageTime: "Ontem",
    unreadCount: 0,
    totalPurchases: 0,
    totalSpent: 0,
    createdAt: "2024-04-14",
    appointmentType: "consulta",
    attendedBy: "ia",
    followUpName: "Confirmação Hapvida",
    followUpActivatesIn: "Amanhã às 10h",
    messages: [
      {
        id: "m1",
        content: "Vocês aceitam plano Hapvida? Quero marcar uma consulta",
        sender: "client",
        time: "19:30",
        status: "delivered",
      },
      {
        id: "m2",
        content: "Olá, Tatiana! 😊 Sim, trabalhamos com Hapvida ✅\n\nGostaria de agendar uma consulta? Com qual médico(a) você prefere ser atendida?",
        sender: "attendant",
        senderName: "IA — Mari",
        time: "19:32",
        status: "sent",
      },
    ],
  },

  // ── Paciente 10: Ativo — consulta agendada ──
  {
    id: "l10",
    name: "Patricia Moreira Dias",
    phone: "44 9 9990-7788",
    email: "patricia.dias@hotmail.com",
    status: "ativo",
    stage: "em_orcamento",
    pendingItems: [
      "Aguardando confirmação para quinta-feira às 15h30",
    ],
    tagIds: ["t1", "t4"],
    attendantId: "a3",
    lastMessage: "Quinta-feira às 15h30 está ótimo pra mim!",
    lastMessageTime: "13:45",
    unreadCount: 0,
    totalPurchases: 0,
    totalSpent: 0,
    createdAt: "2024-04-12",
    doctor: "Dra. Patricia Lima",
    healthInsurance: "Porto Seguro",
    appointmentDate: "Quinta-feira, 15h30",
    appointmentType: "exame",
    attendedBy: "ia",
    messages: [
      {
        id: "m1",
        content: "Oi! Quero agendar ultrassom morfológico, tenho Porto Seguro",
        sender: "client",
        time: "13:00",
        status: "read",
      },
      {
        id: "m2",
        content: "Atendimento recebido — Marcos Costa (Recepção)",
        sender: "system",
        time: "13:00",
      },
      {
        id: "m3",
        content:
          "Olá Patricia! Aceitamos Porto Seguro ✅ A Dra. Patricia Lima faz ultrassonografia. Tem disponibilidade na quinta às 15h30. Posso agendar?",
        sender: "attendant",
        senderName: "Marcos Costa",
        time: "13:10",
        status: "read",
      },
      {
        id: "m4",
        content: "Quinta-feira às 15h30 está ótimo pra mim!",
        sender: "client",
        time: "13:45",
        status: "read",
      },
    ],
  },

  // ── Paciente 11: Pendente — consulta confirmada, aguardando exames ──
  {
    id: "l11",
    name: "Isabela Martins Campos",
    phone: "44 9 9881-6633",
    email: "isabela.martins@gmail.com",
    status: "pendente",
    stage: "proposta_enviada",
    pendingItems: [
      "Solicitar resultado de hemograma antes da consulta",
      "Confirmar se paciente possui histórico de hipertensão",
    ],
    tagIds: ["t2", "t4", "t8"],
    attendantId: "a2",
    lastMessage: "Vou buscar os exames na UBS e te mando foto",
    lastMessageTime: "Há 2 dias",
    unreadCount: 0,
    totalPurchases: 0,
    totalSpent: 0,
    createdAt: "2024-04-08",
    doctor: "Dra. Renata Fiuza",
    healthInsurance: "Bradesco Saúde",
    appointmentDate: "Segunda-feira, 09h",
    appointmentType: "consulta",
    attendedBy: "ia",
    followUpName: "Lembrete pré-consulta",
    followUpActivatesIn: "Em 2 dias",
    messages: [
      {
        id: "m1",
        content: "Tenho pressão alta e estou grávida de 10 semanas. Preciso de consulta urgente!",
        sender: "client",
        time: "08:00",
        status: "read",
      },
      {
        id: "m2",
        content: "Atendimento recebido — Fernanda Silva (Recepção)",
        sender: "system",
        time: "08:00",
      },
      {
        id: "m3",
        content:
          "Isabela, bom dia! Entendo a urgência 💙 Agendei com a Dra. Renata na segunda às 09h. Você tem exames recentes de sangue?",
        sender: "attendant",
        senderName: "Fernanda Silva",
        time: "08:10",
        status: "read",
      },
      {
        id: "m4",
        content: "Vou buscar os exames na UBS e te mando foto",
        sender: "client",
        time: "08:30",
        status: "delivered",
      },
      {
        id: "m5",
        content: "Claro, Isabela! Quando tiver os exames, pode enviar a foto aqui mesmo 📸\n\nSua consulta com a Dra. Renata está confirmada para segunda às 09h. Qualquer dúvida, estamos aqui! 💙",
        sender: "attendant",
        senderName: "IA — Mari",
        time: "08:35",
        status: "sent",
      },
    ],
  },

  // ── Paciente 12: Finalizado — pós-atendimento ──
  {
    id: "l12",
    name: "Renata Costa Ferreira",
    phone: "44 9 9772-1144",
    email: "renata.costa@outlook.com",
    status: "finalizado",
    stage: "pos_venda",
    pendingItems: [],
    attendanceSummary:
      "Paciente Renata Costa realizou cirurgia ginecológica com sucesso.\n\nProcedimento:\n• Histeroscopia diagnóstica e cirúrgica — Dra. Renata Fiuza\n• Data: 05/03/2024\n• Duração: 45 minutos | Alta no mesmo dia\n\nEvolução pós-operatória excelente. Sem intercorrências. Retorno de 30 dias realizado com sucesso. Alta definitiva concedida.",
    tagIds: ["t9", "t5"],
    attendantId: "a7",
    lastMessage: "Obrigada pela atenção de toda a equipe! Voltarei com certeza 🌸",
    lastMessageTime: "Há 1 semana",
    unreadCount: 0,
    totalPurchases: 4,
    totalSpent: 6200,
    lastPurchase: "Histeroscopia cirúrgica",
    lastPurchaseValue: 3800,
    createdAt: "2023-12-15",
    doctor: "Dra. Renata Fiuza",
    healthInsurance: "Particular",
    appointmentType: "cirurgia",
    attendedBy: "ia",
    messages: [
      {
        id: "m1",
        content: "Renata, como está se sentindo após a cirurgia? 💙",
        sender: "attendant",
        senderName: "Juliana Rocha",
        time: "10:00",
        status: "read",
      },
      {
        id: "m2",
        content: "Me recuperei muito bem! Sem dor nenhuma",
        sender: "client",
        time: "10:30",
        status: "read",
      },
      {
        id: "m3",
        content: "Obrigada pela atenção de toda a equipe! Voltarei com certeza 🌸",
        sender: "client",
        time: "10:35",
        status: "read",
      },
    ],
  },

  // ── Paciente 13: Vitrine — Agendado ──
  {
    id: "l13",
    name: "Gabriela Torres Alves",
    phone: "44 9 9301-5544",
    email: "gabriela.torres@gmail.com",
    status: "potencial",
    stage: "novo_contato",
    tagIds: ["t1", "t7"],
    attendantId: "a1",
    lastMessage: "Ótimo! Confirmo para segunda às 09h",
    lastMessageTime: "10:15",
    unreadCount: 0,
    totalPurchases: 0,
    totalSpent: 0,
    createdAt: "2024-04-18",
    doctor: "Dra. Renata Fiuza",
    healthInsurance: "Unimed",
    appointmentDate: "Segunda-feira, 09h",
    appointmentType: "consulta",
    attendedBy: "ia",
    messages: [
      { id: "m1", content: "Bom dia! Gostaria de agendar consulta de pré-natal", sender: "client", time: "09:45", status: "read" },
      { id: "m2", content: "Atendimento recebido — IA Mari", sender: "system", time: "09:45" },
      { id: "m3", content: "Olá! A Dra. Renata tem disponibilidade na segunda às 09h. Posso confirmar?", sender: "attendant", senderName: "IA — Mari", time: "09:46", status: "read" },
      { id: "m4", content: "Ótimo! Confirmo para segunda às 09h", sender: "client", time: "10:15", status: "read" },
    ],
  },

  // ── Paciente 14: Vitrine — Agendado ──
  {
    id: "l14",
    name: "Larissa Menezes Costa",
    phone: "44 9 9412-7788",
    email: "larissa.menezes@hotmail.com",
    status: "potencial",
    stage: "novo_contato",
    tagIds: ["t7", "t4"],
    attendantId: "a2",
    lastMessage: "Perfeito! Estarei lá na terça às 14h",
    lastMessageTime: "15:02",
    unreadCount: 0,
    totalPurchases: 0,
    totalSpent: 0,
    createdAt: "2024-04-17",
    doctor: "Dr. Carlos Mendes",
    healthInsurance: "Amil",
    appointmentDate: "Terça-feira, 14h",
    appointmentType: "consulta",
    attendedBy: "ia",
    messages: [
      { id: "m1", content: "Boa tarde, gostaria de agendar com Dr. Carlos", sender: "client", time: "14:30", status: "read" },
      { id: "m2", content: "Boa tarde Larissa! Dr. Carlos tem disponibilidade na terça às 14h. Tem plano de saúde?", sender: "attendant", senderName: "IA — Mari", time: "14:31", status: "read" },
      { id: "m3", content: "Tenho Amil", sender: "client", time: "14:45", status: "read" },
      { id: "m4", content: "Ótimo, aceitamos Amil ✅ Confirmando terça às 14h com Dr. Carlos!", sender: "attendant", senderName: "IA — Mari", time: "14:46", status: "read" },
      { id: "m5", content: "Perfeito! Estarei lá na terça às 14h", sender: "client", time: "15:02", status: "read" },
    ],
  },

  // ── Paciente 15: Vitrine — Agendado ──
  {
    id: "l15",
    name: "Rafaela Souza Lima",
    phone: "44 9 9523-3344",
    email: "rafaela.souza@gmail.com",
    status: "potencial",
    stage: "novo_contato",
    tagIds: ["t7", "t5"],
    attendantId: "a3",
    lastMessage: "Combinado, até quarta!",
    lastMessageTime: "Ontem",
    unreadCount: 0,
    totalPurchases: 0,
    totalSpent: 0,
    createdAt: "2024-04-16",
    doctor: "Dra. Patricia Lima",
    healthInsurance: "Particular",
    appointmentDate: "Quarta-feira, 11h",
    appointmentType: "exame",
    attendedBy: "ia",
    messages: [
      { id: "m1", content: "Olá! Quero agendar ultrassom, pago particular", sender: "client", time: "10:00", status: "read" },
      { id: "m2", content: "Olá! Dra. Patricia Lima faz ultrassonografia. Quarta às 11h está disponível!", sender: "attendant", senderName: "IA — Mari", time: "10:01", status: "read" },
      { id: "m3", content: "Combinado, até quarta!", sender: "client", time: "10:15", status: "read" },
    ],
  },

  // ── Paciente 16: Vitrine — Agendado ──
  {
    id: "l16",
    name: "Monique Pereira Neves",
    phone: "44 9 9634-6677",
    email: "monique.pereira@outlook.com",
    status: "potencial",
    stage: "novo_contato",
    tagIds: ["t1", "t7", "t4"],
    attendantId: "a6",
    lastMessage: "Confirmado! Obrigada, até quinta",
    lastMessageTime: "09:40",
    unreadCount: 0,
    totalPurchases: 0,
    totalSpent: 0,
    createdAt: "2024-04-19",
    doctor: "Dra. Renata Fiuza",
    healthInsurance: "Bradesco Saúde",
    appointmentDate: "Quinta-feira, 10h",
    appointmentType: "consulta",
    attendedBy: "ia",
    messages: [
      { id: "m1", content: "Bom dia! Preciso de consulta ginecológica, tenho Bradesco Saúde", sender: "client", time: "09:20", status: "read" },
      { id: "m2", content: "Bom dia! Aceitamos Bradesco Saúde ✅ Dra. Renata tem vaga na quinta às 10h. Confirmo?", sender: "attendant", senderName: "IA — Mari", time: "09:21", status: "read" },
      { id: "m3", content: "Confirmado! Obrigada, até quinta", sender: "client", time: "09:40", status: "read" },
    ],
  },

  // ── Paciente 17: Vitrine — Agendado ──
  {
    id: "l17",
    name: "Thaís Oliveira Rocha",
    phone: "44 9 9745-9900",
    email: "thais.oliveira@gmail.com",
    status: "potencial",
    stage: "novo_contato",
    tagIds: ["t7", "t4"],
    attendantId: "a3",
    lastMessage: "Perfeito! Sexta às 09h confirmado",
    lastMessageTime: "16:55",
    unreadCount: 0,
    totalPurchases: 0,
    totalSpent: 0,
    createdAt: "2024-04-20",
    doctor: "Dr. Roberto Alves",
    healthInsurance: "SulAmérica",
    appointmentDate: "Sexta-feira, 09h",
    appointmentType: "consulta",
    attendedBy: "ia",
    messages: [
      { id: "m1", content: "Oi! Preciso agendar consulta clínica, tenho SulAmérica", sender: "client", time: "16:30", status: "read" },
      { id: "m2", content: "Olá! Aceitamos SulAmérica ✅ Dr. Roberto Alves faz clínica geral. Sexta às 09h disponível!", sender: "attendant", senderName: "IA — Mari", time: "16:31", status: "read" },
      { id: "m3", content: "Perfeito! Sexta às 09h confirmado", sender: "client", time: "16:55", status: "read" },
    ],
  },

  // ── Paciente 18: Finalizado — Laparoscopia realizada ──
  {
    id: "l18",
    name: "Cristina Alves Barbosa",
    phone: "44 9 9801-4433",
    email: "cristina.barbosa@gmail.com",
    status: "finalizado",
    stage: "pos_venda",
    pendingItems: [],
    attendanceSummary:
      "Paciente Cristina Alves realizou laparoscopia diagnóstica e tratamento de endometriose.\n\nProcedimento:\n• Videolaparoscopia — Dra. Renata Fiuza\n• Data: 18/02/2024 | Duração: 1h20min\n• Alta hospitalar após 24h de observação\n\nEvolução pós-operatória excelente. Sem intercorrências. Dor pélvica cessou completamente. Retorno de 45 dias realizado — paciente liberada.",
    tagIds: ["t9", "t5", "t10"],
    attendantId: "a5",
    lastMessage: "Minha vida mudou! A dor sumiu. Sou grata à equipe toda 🌸",
    lastMessageTime: "Há 5 dias",
    unreadCount: 0,
    totalPurchases: 6,
    totalSpent: 9400,
    lastPurchase: "Videolaparoscopia — endometriose",
    lastPurchaseValue: 7200,
    createdAt: "2023-10-12",
    doctor: "Dra. Renata Fiuza",
    healthInsurance: "Unimed",
    appointmentType: "cirurgia",
    attendedBy: "humano",
    messages: [
      { id: "m1", content: "Cristina, como está se sentindo após a cirurgia? 💙", sender: "attendant", senderName: "Dra. Renata Fiuza", time: "09:00", status: "read" },
      { id: "m2", content: "Muito bem! Sem dor nenhuma, parece milagre", sender: "client", time: "09:20", status: "read" },
      { id: "m3", content: "Que notícia maravilhosa! Seu retorno de 45 dias está agendado para confirmar a alta definitiva 💙", sender: "attendant", senderName: "IA — Mari", time: "09:22", status: "read" },
      { id: "m4", content: "Minha vida mudou! A dor sumiu. Sou grata à equipe toda 🌸", sender: "client", time: "09:45", status: "read" },
    ],
  },

  // ── Paciente 19: Finalizado — Colposcopia + biopsia ──
  {
    id: "l19",
    name: "Vanessa Ribeiro Nunes",
    phone: "44 9 9612-8877",
    email: "vanessa.ribeiro@hotmail.com",
    status: "finalizado",
    stage: "pos_venda",
    pendingItems: [],
    attendanceSummary:
      "Paciente Vanessa Ribeiro realizou colposcopia com biópsia cervical.\n\nProcedimentos:\n• Preventivo ginecológico — Dr. Carlos Mendes\n• Colposcopia + biópsia — Dra. Patricia Lima\n• Resultado: NIC I (lesão de baixo grau) — conduta expectante\n\nPaciente orientada. Retorno semestral agendado. Alta com sucesso.",
    tagIds: ["t9", "t4"],
    attendantId: "a2",
    lastMessage: "Ufa! Que alívio saber que está tudo controlado. Obrigada 💙",
    lastMessageTime: "Há 1 semana",
    unreadCount: 0,
    totalPurchases: 2,
    totalSpent: 890,
    lastPurchase: "Colposcopia + biópsia",
    lastPurchaseValue: 620,
    createdAt: "2024-01-08",
    doctor: "Dra. Patricia Lima",
    healthInsurance: "Bradesco Saúde",
    appointmentType: "exame",
    attendedBy: "ia",
    messages: [
      { id: "m1", content: "Vanessa, recebemos o resultado da sua biópsia. Pode vir conversar com a Dra. Patricia amanhã às 10h?", sender: "attendant", senderName: "Fernanda Silva", time: "15:00", status: "read" },
      { id: "m2", content: "Claro! Estarei lá. Está tudo bem?", sender: "client", time: "15:10", status: "read" },
      { id: "m3", content: "Sim! A lesão é de baixo grau, muito controlável. A Dra. explicará tudo amanhã 😊", sender: "attendant", senderName: "Fernanda Silva", time: "15:12", status: "read" },
      { id: "m4", content: "Ufa! Que alívio saber que está tudo controlado. Obrigada 💙", sender: "client", time: "15:20", status: "read" },
    ],
  },

  // ── Paciente 20: Finalizado — Consulta ginecológica anual ──
  {
    id: "l20",
    name: "Priscila Martins Lopes",
    phone: "44 9 9523-1122",
    email: "priscila.lopes@gmail.com",
    status: "finalizado",
    stage: "pos_venda",
    pendingItems: [],
    attendanceSummary:
      "Consulta ginecológica de rotina anual — Dr. Carlos Mendes.\n\nServiços:\n• Exame clínico completo\n• Coleta preventivo (papanicolau)\n• Solicitação de exames de rotina\n\nResultados dentro da normalidade. Retorno anual agendado.",
    tagIds: ["t5"],
    attendantId: "a1",
    lastMessage: "Tudo certo! Até o ano que vem então 😊",
    lastMessageTime: "Há 2 semanas",
    unreadCount: 0,
    totalPurchases: 3,
    totalSpent: 960,
    lastPurchase: "Consulta ginecológica anual",
    lastPurchaseValue: 320,
    createdAt: "2023-07-20",
    doctor: "Dr. Carlos Mendes",
    healthInsurance: "SulAmérica",
    appointmentType: "consulta",
    attendedBy: "ia",
    messages: [
      { id: "m1", content: "Priscila, sua consulta anual foi realizada com sucesso! Todos os exames solicitados. 💙", sender: "attendant", senderName: "IA — Mari", time: "17:00", status: "read" },
      { id: "m2", content: "Tudo certo! Até o ano que vem então 😊", sender: "client", time: "17:15", status: "read" },
    ],
  },

  // ── Paciente 21: Finalizado — Histerectomia realizada ──
  {
    id: "l21",
    name: "Mariana Gomes Pereira",
    phone: "44 9 9734-5566",
    email: "mariana.gomes@outlook.com",
    status: "finalizado",
    stage: "pos_venda",
    pendingItems: [],
    attendanceSummary:
      "Paciente Mariana Gomes realizou histerectomia laparoscópica por mioma uterino múltiplo.\n\nProcedimento:\n• Histerectomia total laparoscópica — Dra. Renata Fiuza\n• Data: 10/01/2024 | Alta após 48h\n• Sem intercorrências cirúrgicas\n\nRecuperação excelente. Retorno de 30 e 60 dias realizados. Alta definitiva concedida.",
    tagIds: ["t9", "t4", "t10"],
    attendantId: "a5",
    lastMessage: "Me sinto uma pessoa nova. Vocês transformaram minha vida! ❤️",
    lastMessageTime: "Há 3 semanas",
    unreadCount: 0,
    totalPurchases: 8,
    totalSpent: 22500,
    lastPurchase: "Histerectomia laparoscópica",
    lastPurchaseValue: 14800,
    createdAt: "2023-06-01",
    doctor: "Dra. Renata Fiuza",
    healthInsurance: "Amil",
    appointmentType: "cirurgia",
    attendedBy: "humano",
    messages: [
      { id: "m1", content: "Mariana, você realizou sua alta definitiva hoje. Foi uma jornada incrível! 💙", sender: "attendant", senderName: "Dra. Renata Fiuza", time: "11:00", status: "read" },
      { id: "m2", content: "Me sinto uma pessoa nova. Vocês transformaram minha vida! ❤️", sender: "client", time: "11:30", status: "read" },
    ],
  },

  // ── Paciente 22: Finalizado — Pré-natal completo ──
  {
    id: "l22",
    name: "Karoline Dias Ferreira",
    phone: "44 9 9845-2233",
    email: "karoline.dias@gmail.com",
    status: "finalizado",
    stage: "pos_venda",
    pendingItems: [],
    attendanceSummary:
      "Paciente Karoline Dias realizou acompanhamento pré-natal completo.\n\nServiços ao longo de 9 meses:\n• 9 consultas de pré-natal — Dra. Renata Fiuza\n• 4 ultrassonografias (morfológica, translucência nucal, eco fetal)\n• Parto normal hospitalar em 22/03/2024\n\nBebê nasceu saudável com 3,4kg. Alta maternidade após 24h. Retorno pós-parto realizado com sucesso.",
    tagIds: ["t1", "t4", "t10"],
    attendantId: "a6",
    lastMessage: "Meu filho nasceu! Graças a Deus e à Dra. Renata 🍼❤️",
    lastMessageTime: "Há 1 mês",
    unreadCount: 0,
    totalPurchases: 14,
    totalSpent: 5800,
    lastPurchase: "Consulta pós-parto",
    lastPurchaseValue: 280,
    createdAt: "2023-06-20",
    doctor: "Dra. Renata Fiuza",
    healthInsurance: "Bradesco Saúde",
    appointmentType: "consulta",
    attendedBy: "ia",
    messages: [
      { id: "m1", content: "Karoline! Como você e o bebê estão? 💙", sender: "attendant", senderName: "Patricia Moura", time: "08:00", status: "read" },
      { id: "m2", content: "Meu filho nasceu! Graças a Deus e à Dra. Renata 🍼❤️", sender: "client", time: "08:30", status: "read" },
      { id: "m3", content: "Que notícia linda! 🎉 Felicidades à família! Seu retorno pós-parto está agendado para daqui 30 dias.", sender: "attendant", senderName: "IA — Mari", time: "08:32", status: "read" },
    ],
  },

  // ── Paciente 23: Potencial — Cirurgia agendada ──
  {
    id: "l23",
    name: "Débora Santos Vieira",
    phone: "44 9 9956-7744",
    email: "debora.vieira@hotmail.com",
    status: "potencial",
    stage: "em_producao",
    pendingItems: ["Enviar protocolo pré-operatório", "Confirmar equipe anestésica"],
    tagIds: ["t9", "t4", "t2"],
    attendantId: "a5",
    lastMessage: "Entendido! Vou seguir todas as orientações 🙏",
    lastMessageTime: "Ontem",
    unreadCount: 0,
    totalPurchases: 2,
    totalSpent: 560,
    lastPurchase: "Consulta pré-operatória",
    lastPurchaseValue: 280,
    createdAt: "2024-03-05",
    doctor: "Dra. Renata Fiuza",
    healthInsurance: "Amil",
    appointmentDate: "Dia 10, 07h",
    appointmentType: "cirurgia",
    attendedBy: "humano",
    messages: [
      { id: "m1", content: "Débora, sua miomectomia está confirmada para o dia 10 às 07h! Jejum a partir das 22h do dia anterior.", sender: "attendant", senderName: "Dra. Renata Fiuza", time: "14:00", status: "read" },
      { id: "m2", content: "Entendido! Vou seguir todas as orientações 🙏", sender: "client", time: "14:20", status: "read" },
    ],
  },

  // ── Paciente 24: Potencial — Exame de ultrassom agendado ──
  {
    id: "l24",
    name: "Letícia Campos Rocha",
    phone: "44 9 9867-3344",
    email: "leticia.campos@gmail.com",
    status: "potencial",
    stage: "novo_contato",
    tagIds: ["t7", "t4"],
    attendantId: "a3",
    lastMessage: "Combinado! Estarei lá na quarta às 14h",
    lastMessageTime: "10:30",
    unreadCount: 0,
    totalPurchases: 0,
    totalSpent: 0,
    createdAt: "2024-04-22",
    doctor: "Dra. Patricia Lima",
    healthInsurance: "Porto Seguro",
    appointmentDate: "Quarta-feira, 14h",
    appointmentType: "exame",
    attendedBy: "ia",
    messages: [
      { id: "m1", content: "Oi! Preciso fazer ultrassom morfológico com 20 semanas, tenho Porto Seguro", sender: "client", time: "09:50", status: "read" },
      { id: "m2", content: "Atendimento recebido — IA Mari", sender: "system", time: "09:50" },
      { id: "m3", content: "Olá Letícia! Aceitamos Porto Seguro ✅ Dra. Patricia Lima tem vaga na quarta às 14h para o morfológico. Posso confirmar?", sender: "attendant", senderName: "IA — Mari", time: "09:51", status: "read" },
      { id: "m4", content: "Combinado! Estarei lá na quarta às 14h", sender: "client", time: "10:30", status: "read" },
    ],
  },

  // ── Paciente 25: Finalizado — Cirurgia bariátrica ginecológica ──
  {
    id: "l25",
    name: "Alessandra Borges Pinto",
    phone: "44 9 9778-4455",
    email: "alessandra.borges@outlook.com",
    status: "finalizado",
    stage: "pos_venda",
    pendingItems: [],
    attendanceSummary:
      "Paciente Alessandra Borges realizou ooforoplastia por cisto ovariano complexo.\n\nProcedimento:\n• Ooforoplastia laparoscópica — Dra. Renata Fiuza\n• Data: 28/02/2024 | Alta após 24h\n• Cisto de 7cm removido com sucesso\n\nRecuperação dentro do esperado. Exames pós-op normais. Alta definitiva após retorno de 30 dias.",
    tagIds: ["t9", "t5"],
    attendantId: "a5",
    lastMessage: "Recuperação foi rápida, já estou trabalhando normalmente! 🙌",
    lastMessageTime: "Há 2 semanas",
    unreadCount: 0,
    totalPurchases: 5,
    totalSpent: 11200,
    lastPurchase: "Ooforoplastia laparoscópica",
    lastPurchaseValue: 8900,
    createdAt: "2023-11-20",
    doctor: "Dra. Renata Fiuza",
    healthInsurance: "Particular",
    appointmentType: "cirurgia",
    attendedBy: "humano",
    messages: [
      { id: "m1", content: "Alessandra, como está a recuperação? 💙", sender: "attendant", senderName: "Dra. Renata Fiuza", time: "10:00", status: "read" },
      { id: "m2", content: "Recuperação foi rápida, já estou trabalhando normalmente! 🙌", sender: "client", time: "10:15", status: "read" },
      { id: "m3", content: "Ótima notícia! Seu exame pós-operatório veio perfeito. Alta definitiva concedida! 🌸", sender: "attendant", senderName: "Dra. Renata Fiuza", time: "10:18", status: "read" },
    ],
  },

  // ── Paciente 26: Pendente — Follow-up pós-exame ──
  {
    id: "l26",
    name: "Rosana Melo Cardoso",
    phone: "44 9 9689-5566",
    email: "rosana.melo@gmail.com",
    status: "pendente",
    stage: "proposta_enviada",
    pendingItems: ["Aguardar resultado do preventivo", "Ligar caso não responda até sexta"],
    tagIds: ["t8", "t4"],
    attendantId: "a2",
    lastMessage: "Ok! Aguardarei o resultado então 😊",
    lastMessageTime: "Há 3 dias",
    unreadCount: 0,
    totalPurchases: 1,
    totalSpent: 320,
    lastPurchase: "Consulta + preventivo",
    lastPurchaseValue: 320,
    createdAt: "2024-04-05",
    doctor: "Dr. Carlos Mendes",
    healthInsurance: "Hapvida",
    appointmentType: "exame",
    attendedBy: "ia",
    followUpName: "Resultado preventivo",
    followUpActivatesIn: "Em 5 dias",
    messages: [
      { id: "m1", content: "Rosana, seu preventivo foi coletado! Resultado em aproximadamente 7 dias úteis.", sender: "attendant", senderName: "IA — Mari", time: "16:00", status: "read" },
      { id: "m2", content: "Ok! Aguardarei o resultado então 😊", sender: "client", time: "16:10", status: "read" },
    ],
  },

  // ── Paciente 27: Finalizado — Ultrassom morfológico completo ──
  {
    id: "l27",
    name: "Aline Ferreira Nascimento",
    phone: "44 9 9590-6677",
    email: "aline.nascimento@gmail.com",
    status: "finalizado",
    stage: "pos_venda",
    pendingItems: [],
    attendanceSummary:
      "Paciente Aline Ferreira realizou ultrassonografia morfológica do 2º trimestre.\n\nExame:\n• Ultrassom morfológico 20 semanas — Dra. Patricia Lima\n• Ecocardiograma fetal incluso\n• Resultado: feto em desenvolvimento normal, sem alterações\n\nLaudo entregue. Paciente e companheiro muito satisfeitos.",
    tagIds: ["t1", "t4"],
    attendantId: "a3",
    lastMessage: "O bebê está perfeito! Obrigada pela atenção de toda equipe 💙",
    lastMessageTime: "Há 1 semana",
    unreadCount: 0,
    totalPurchases: 3,
    totalSpent: 1240,
    lastPurchase: "Ultrassom morfológico + ecocardiograma fetal",
    lastPurchaseValue: 720,
    createdAt: "2024-02-14",
    doctor: "Dra. Patricia Lima",
    healthInsurance: "Unimed",
    appointmentType: "exame",
    attendedBy: "ia",
    messages: [
      { id: "m1", content: "Aline, seu laudo do morfológico está pronto! Tudo normal com o bebê 🍼", sender: "attendant", senderName: "IA — Mari", time: "14:00", status: "read" },
      { id: "m2", content: "O bebê está perfeito! Obrigada pela atenção de toda equipe 💙", sender: "client", time: "14:20", status: "read" },
    ],
  },
];

// ── Dados para Dashboard ──────────────────────────────────────────
export const peakHoursData = [
  { hour: "00h", messages: 1 },
  { hour: "01h", messages: 0 },
  { hour: "02h", messages: 0 },
  { hour: "03h", messages: 0 },
  { hour: "04h", messages: 0 },
  { hour: "05h", messages: 2 },
  { hour: "06h", messages: 5 },
  { hour: "07h", messages: 14 },
  { hour: "08h", messages: 38 },
  { hour: "09h", messages: 62 },
  { hour: "10h", messages: 74 },
  { hour: "11h", messages: 58 },
  { hour: "12h", messages: 32 },
  { hour: "13h", messages: 40 },
  { hour: "14h", messages: 68 },
  { hour: "15h", messages: 76 },
  { hour: "16h", messages: 65 },
  { hour: "17h", messages: 44 },
  { hour: "18h", messages: 28 },
  { hour: "19h", messages: 18 },
  { hour: "20h", messages: 10 },
  { hour: "21h", messages: 6 },
  { hour: "22h", messages: 4 },
  { hour: "23h", messages: 2 },
];

export const weeklyLeadsData = [
  { day: "Seg", novos: 6, finalizados: 4 },
  { day: "Ter", novos: 9, finalizados: 7 },
  { day: "Qua", novos: 5, finalizados: 5 },
  { day: "Qui", novos: 12, finalizados: 8 },
  { day: "Sex", novos: 14, finalizados: 11 },
  { day: "Sáb", novos: 4, finalizados: 3 },
  { day: "Dom", novos: 1, finalizados: 1 },
];

export const monthlyRevenueData = [
  { month: "Jan", value: 84000 },
  { month: "Fev", value: 92000 },
  { month: "Mar", value: 88000 },
  { month: "Abr", value: 106000 },
  { month: "Mai", value: 98000 },
  { month: "Jun", value: 118000 },
  { month: "Jul", value: 112000 },
  { month: "Ago", value: 124000 },
  { month: "Set", value: 108000 },
  { month: "Out", value: 132000 },
  { month: "Nov", value: 116000 },
  { month: "Dez", value: 140000 },
];

export const serviceDistributionData = [
  { name: "Pré-natal", value: 35, color: "#0891b2" },
  { name: "Ginecologia", value: 28, color: "#1d4ed8" },
  { name: "Ultrassonografia", value: 18, color: "#6366f1" },
  { name: "Cirurgias", value: 11, color: "#38bdf8" },
  { name: "Clínica Geral", value: 8, color: "#60a5fa" },
];
