// ── Estrutural Vidros — Mock Data ───────────────────────────────
// Todos os dados são fictícios para fins de demonstração.

export type LeadStatus = "ativo" | "pendente" | "potencial" | "finalizado";
export type AttendantStatus = "online" | "offline" | "busy";
export type MessageSender = "client" | "attendant" | "ai" | "system";

export interface Tag {
  id: string;
  name: string;
  color: string; // tailwind color name
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
  rating: number;
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
  status: LeadStatus;
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
  aiSummary?: string;
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
  { id: "t1", name: "Orçamento", color: "blue" },
  { id: "t2", name: "Vidro Temperado", color: "cyan" },
  { id: "t3", name: "Urgente", color: "red" },
  { id: "t4", name: "Retorno", color: "amber" },
  { id: "t5", name: "Instalação", color: "green" },
  { id: "t6", name: "Garantia", color: "orange" },
  { id: "t7", name: "Box Banheiro", color: "violet" },
  { id: "t8", name: "Espelho", color: "pink" },
  { id: "t9", name: "Janela", color: "teal" },
  { id: "t10", name: "VIP", color: "yellow" },
];

// ── Atendentes ────────────────────────────────────────────────────
export const attendants: Attendant[] = [
  {
    id: "a1",
    name: "Amarildo",
    initials: "AM",
    email: "amarildo@estruturalvidros.com.br",
    phone: "61 9 8801-2233",
    department: "Vendas",
    status: "online",
    activeCount: 14,
    totalToday: 22,
    totalMonth: 187,
    avgResponseTime: 3.2,
    rating: 4.8,
    color: "#f59e0b",
  },
  {
    id: "a2",
    name: "Andrilene",
    initials: "AN",
    email: "andrilene@estruturalvidros.com.br",
    phone: "61 9 9912-4455",
    department: "Vendas",
    status: "online",
    activeCount: 8,
    totalToday: 15,
    totalMonth: 134,
    avgResponseTime: 5.1,
    rating: 4.6,
    color: "#ec4899",
  },
  {
    id: "a3",
    name: "Clayton",
    initials: "CL",
    email: "clayton@estruturalvidros.com.br",
    phone: "61 9 9745-6677",
    department: "Vendas",
    status: "online",
    activeCount: 25,
    totalToday: 31,
    totalMonth: 220,
    avgResponseTime: 2.8,
    rating: 4.9,
    color: "#3b82f6",
  },
  {
    id: "a4",
    name: "Michael",
    initials: "MI",
    email: "michael@estruturalvidros.com.br",
    phone: "61 9 8823-8899",
    department: "Vendas",
    status: "busy",
    activeCount: 6,
    totalToday: 9,
    totalMonth: 98,
    avgResponseTime: 7.4,
    rating: 4.3,
    color: "#8b5cf6",
  },
  {
    id: "a5",
    name: "Michele",
    initials: "MC",
    email: "michele@estruturalvidros.com.br",
    phone: "61 9 9034-1122",
    department: "Gestão / Vendas",
    status: "online",
    activeCount: 5,
    totalToday: 8,
    totalMonth: 72,
    avgResponseTime: 4.0,
    rating: 4.7,
    color: "#10b981",
  },
  {
    id: "a6",
    name: "Nayara",
    initials: "NY",
    email: "nayara@estruturalvidros.com.br",
    phone: "61 9 9234-5566",
    department: "Vendas",
    status: "online",
    activeCount: 18,
    totalToday: 26,
    totalMonth: 198,
    avgResponseTime: 3.5,
    rating: 4.7,
    color: "#f97316",
  },
  {
    id: "a7",
    name: "Raquel",
    initials: "RQ",
    email: "raquel@estruturalvidros.com.br",
    phone: "61 9 9345-6677",
    department: "Financeiro",
    status: "online",
    activeCount: 11,
    totalToday: 17,
    totalMonth: 145,
    avgResponseTime: 4.2,
    rating: 4.5,
    color: "#06b6d4",
  },
  {
    id: "a8",
    name: "Jaqueline",
    initials: "JQ",
    email: "jaqueline@estruturalvidros.com.br",
    phone: "61 9 9456-7788",
    department: "Vendas",
    status: "busy",
    activeCount: 9,
    totalToday: 13,
    totalMonth: 112,
    avgResponseTime: 5.8,
    rating: 4.4,
    color: "#84cc16",
  },
  {
    id: "a9",
    name: "Nathalia",
    initials: "NT",
    email: "nathalia@estruturalvidros.com.br",
    phone: "61 9 9567-8899",
    department: "Vendas",
    status: "offline",
    activeCount: 0,
    totalToday: 7,
    totalMonth: 88,
    avgResponseTime: 6.1,
    rating: 4.2,
    color: "#e11d48",
  },
  {
    id: "a10",
    name: "Mirce",
    initials: "MR",
    email: "mirce@estruturalvidros.com.br",
    phone: "61 9 9678-9900",
    department: "Suporte",
    status: "offline",
    activeCount: 0,
    totalToday: 5,
    totalMonth: 64,
    avgResponseTime: 4.8,
    rating: 4.3,
    color: "#14b8a6",
  },
  {
    id: "a11",
    name: "Diretoria",
    initials: "DI",
    email: "diretoria@estruturalvidros.com.br",
    phone: "61 9 9789-0011",
    department: "Gestão",
    status: "offline",
    activeCount: 0,
    totalToday: 2,
    totalMonth: 18,
    avgResponseTime: 15.0,
    rating: 5.0,
    color: "#1d4ed8",
  },
  {
    id: "a12",
    name: "Reserva",
    initials: "RE",
    email: "reserva@estruturalvidros.com.br",
    phone: "61 9 9890-1122",
    department: "Geral",
    status: "offline",
    activeCount: 0,
    totalToday: 0,
    totalMonth: 12,
    avgResponseTime: 8.0,
    rating: 4.0,
    color: "#6b7280",
  },
  {
    id: "a13",
    name: "Marlene",
    initials: "ML",
    email: "marlene@estruturalvidros.com.br",
    phone: "61 9 9901-2233",
    department: "Vendas",
    status: "online",
    activeCount: 7,
    totalToday: 11,
    totalMonth: 93,
    avgResponseTime: 5.0,
    rating: 4.5,
    color: "#a855f7",
  },
  {
    id: "a14",
    name: "Jardel",
    initials: "JD",
    email: "jardel@estruturalvidros.com.br",
    phone: "61 9 9012-3344",
    department: "Gestão",
    status: "online",
    activeCount: 3,
    totalToday: 6,
    totalMonth: 44,
    avgResponseTime: 9.0,
    rating: 4.8,
    color: "#dc2626",
  },
];

// ── Contas (login demo) ────────────────────────────────────────────
export const accounts: Account[] = [
  {
    id: "acc1",
    name: "Michele",
    role: "gestor",
    initials: "MC",
    email: "michele@estruturalvidros.com.br",
    color: "#10b981",
  },
  {
    id: "acc2",
    name: "Jardel",
    role: "gestor",
    initials: "JD",
    email: "jardel@estruturalvidros.com.br",
    color: "#dc2626",
  },
  {
    id: "acc3",
    name: "Amarildo",
    role: "atendente",
    initials: "AM",
    email: "amarildo@estruturalvidros.com.br",
    color: "#f59e0b",
  },
  {
    id: "acc4",
    name: "Andrilene",
    role: "atendente",
    initials: "AN",
    email: "andrilene@estruturalvidros.com.br",
    color: "#ec4899",
  },
  {
    id: "acc5",
    name: "Clayton",
    role: "atendente",
    initials: "CL",
    email: "clayton@estruturalvidros.com.br",
    color: "#3b82f6",
  },
];

// ── Mensagens Rápidas ─────────────────────────────────────────────
export const quickMessages = [
  {
    id: "qm1",
    title: "Boas-vindas",
    content:
      "Olá! Bem-vindo à Estrutural Vidros 🏗️ Como posso ajudar você hoje?",
    category: "Abertura",
  },
  {
    id: "qm2",
    title: "Orçamento em análise",
    content:
      "Oi! Seu orçamento está em análise pela nossa equipe técnica. Retornaremos em breve com os valores.",
    category: "Orçamento",
  },
  {
    id: "qm3",
    title: "Confirmação de medidas",
    content:
      "Para prosseguir com o orçamento, preciso que você me informe as medidas (largura x altura em cm). Pode me enviar uma foto também! 📐",
    category: "Orçamento",
  },
  {
    id: "qm4",
    title: "Agendamento de instalação",
    content:
      "Ótima notícia! Sua instalação foi agendada. Nossa equipe técnica estará no local no horário combinado. Qualquer dúvida é só chamar! 🔧",
    category: "Instalação",
  },
  {
    id: "qm5",
    title: "Garantia",
    content:
      "Todos os nossos produtos possuem garantia de 12 meses. Para acionar a garantia, nos envie fotos do problema e o número do pedido.",
    category: "Suporte",
  },
  {
    id: "qm6",
    title: "Formas de pagamento",
    content:
      "Aceitamos: PIX (5% desconto), cartão de crédito até 12x, boleto bancário e transferência. Qual prefere?",
    category: "Financeiro",
  },
  {
    id: "qm7",
    title: "Encerramento",
    content:
      "Foi um prazer atender você! Qualquer dúvida futura, estamos à disposição. Até logo! 😊",
    category: "Encerramento",
  },
];

// ── Leads / Conversas ─────────────────────────────────────────────
export const leads: Lead[] = [
  // ── Lead 1: Novo lead — fluxo de IA selecionando atendente ──
  {
    id: "l1",
    name: "João Pedro Silva",
    phone: "61 9 9801-2345",
    email: "joao.pedro@gmail.com",
    status: "potencial",
    tagIds: ["t1", "t7"],
    attendantId: "a1",
    lastMessage: "Amarildo",
    lastMessageTime: "09:47",
    unreadCount: 1,
    totalPurchases: 0,
    totalSpent: 0,
    createdAt: "2024-04-15",
    notes: "Novo cliente, chegou via Instagram.",
    messages: [
      {
        id: "m1",
        content: "Oi, quero fazer um orçamento para box de banheiro",
        sender: "client",
        time: "09:44",
        status: "read",
      },
      {
        id: "m2",
        content:
          "Olá! Bem-vindo à **Estrutural Vidros** 🏗️\n\nSou a assistente virtual. Para te atender melhor, com qual de nossos atendentes você deseja falar?\n\n• Amarildo — Vendas\n• Andrilene — Vendas\n• Clayton — Vendas\n• Michael — Vendas\n• Nayara — Suporte",
        sender: "ai",
        senderName: "IA Estrutural",
        time: "09:44",
      },
      {
        id: "m3",
        content: "Amarildo",
        sender: "client",
        time: "09:47",
        status: "read",
      },
      {
        id: "m4",
        content:
          "Perfeito! Conectando você com **Amarildo** agora... 🔄\nUm momento, por favor!",
        sender: "ai",
        senderName: "IA Estrutural",
        time: "09:47",
      },
      {
        id: "m5",
        content: "Atendimento transferido para Amarildo (Vendas)",
        sender: "system",
        time: "09:47",
      },
    ],
  },

  // ── Lead 2: Ativo — conversa em andamento ──
  {
    id: "l2",
    name: "Ana Paula Almeida",
    phone: "61 9 9723-8876",
    email: "ana.paula@outlook.com",
    company: "Residencial Almeida",
    status: "ativo",
    tagIds: ["t1", "t2", "t7"],
    attendantId: "a1",
    lastMessage: "Essas medidas estão perfeitas, quando fica pronto?",
    lastMessageTime: "14:32",
    unreadCount: 2,
    totalPurchases: 1,
    totalSpent: 2800,
    lastPurchase: "Box Vidro Temperado 8mm",
    lastPurchaseValue: 2800,
    createdAt: "2024-03-10",
    notes: "Cliente VIP. Prefere contato via WhatsApp. Indicou 2 amigos.",
    messages: [
      {
        id: "m1",
        content: "Oi, preciso de um box de vidro temperado para o banheiro",
        sender: "client",
        time: "10:15",
        status: "read",
      },
      {
        id: "m2",
        content:
          "Olá! Bem-vindo à **Estrutural Vidros** 🏗️\n\nSou a assistente virtual. Com qual atendente você deseja falar?\n\n• Amarildo — Vendas\n• Andrilene — Vendas\n• Clayton — Vendas\n• Michael — Vendas\n• Nayara — Suporte",
        sender: "ai",
        senderName: "IA Estrutural",
        time: "10:15",
      },
      {
        id: "m3",
        content: "Amarildo",
        sender: "client",
        time: "10:16",
        status: "read",
      },
      {
        id: "m4",
        content:
          "Perfeito! Transferindo para **Amarildo** agora... 🔄",
        sender: "ai",
        senderName: "IA Estrutural",
        time: "10:16",
      },
      {
        id: "m5",
        content: "Atendimento transferido para Amarildo (Vendas)",
        sender: "system",
        time: "10:16",
      },
      {
        id: "m6",
        content:
          "Oi Ana Paula! Aqui é o Amarildo 😊 Que ótimo que entrou em contato! Para fazer o orçamento do box, você pode me passar as medidas do seu banheiro?",
        sender: "attendant",
        senderName: "Amarildo",
        time: "10:18",
        status: "read",
      },
      {
        id: "m7",
        content: "Claro! O box tem 90cm de largura e 200cm de altura",
        sender: "client",
        time: "10:22",
        status: "read",
      },
      {
        id: "m8",
        content:
          "Perfeito! Temos ótimas opções. Vou montar o orçamento:\n\n📋 **Box Vidro Temperado 8mm** — R$ 2.800\n📋 **Box Vidro Temperado 10mm** — R$ 3.400\n\nAmbos com perfil de alumínio e instalação inclusa. Qual prefere?",
        sender: "attendant",
        senderName: "Amarildo",
        time: "10:35",
        status: "read",
      },
      {
        id: "m9",
        content: "Prefiro o de 8mm. Quais são as formas de pagamento?",
        sender: "client",
        time: "10:38",
        status: "read",
      },
      {
        id: "m10",
        content:
          "Aceitamos PIX com 5% de desconto (R$ 2.660), cartão em até 12x ou boleto. O prazo de fabricação é de 7 dias úteis após aprovação.",
        sender: "attendant",
        senderName: "Amarildo",
        time: "10:42",
        status: "read",
      },
      {
        id: "m11",
        content: "Vou pagar no PIX! Me manda os dados",
        sender: "client",
        time: "14:28",
        status: "read",
      },
      {
        id: "m12",
        content:
          "Ótimo! Chave PIX: estruturalvidros@estruturalvidros.com.br\nValor: R$ 2.660,00\nTitular: Estrutural Vidros LTDA\n\nApós o pagamento me envia o comprovante 🙏",
        sender: "attendant",
        senderName: "Amarildo",
        time: "14:30",
        status: "read",
      },
      {
        id: "m13",
        content: "Essas medidas estão perfeitas, quando fica pronto?",
        sender: "client",
        time: "14:32",
        status: "delivered",
      },
    ],
  },

  // ── Lead 3: Ativo — Andrilene, janelas ──
  {
    id: "l3",
    name: "Maria das Graças Costa",
    phone: "61 9 8834-5566",
    email: "maria.graca@yahoo.com.br",
    status: "ativo",
    tagIds: ["t9", "t1"],
    attendantId: "a2",
    lastMessage: "Pode ser na quinta-feira de manhã?",
    lastMessageTime: "11:20",
    unreadCount: 0,
    totalPurchases: 2,
    totalSpent: 5600,
    lastPurchase: "Janela de Correr 2 Folhas",
    lastPurchaseValue: 3200,
    createdAt: "2024-02-20",
    messages: [
      {
        id: "m1",
        content: "Boa tarde, quero trocar as janelas do meu apartamento",
        sender: "client",
        time: "08:30",
        status: "read",
      },
      {
        id: "m2",
        content:
          "Olá! Bem-vindo à **Estrutural Vidros** 🏗️\n\nSou a assistente virtual. Com qual atendente você deseja falar?\n\n• Amarildo — Vendas\n• Andrilene — Vendas\n• Clayton — Vendas\n• Michael — Vendas\n• Nayara — Suporte",
        sender: "ai",
        senderName: "IA Estrutural",
        time: "08:30",
      },
      {
        id: "m3",
        content: "Andrilene",
        sender: "client",
        time: "08:31",
        status: "read",
      },
      {
        id: "m4",
        content: "Perfeito! Transferindo para **Andrilene** agora... 🔄",
        sender: "ai",
        senderName: "IA Estrutural",
        time: "08:31",
      },
      {
        id: "m5",
        content: "Atendimento transferido para Andrilene (Vendas)",
        sender: "system",
        time: "08:31",
      },
      {
        id: "m6",
        content:
          "Olá Maria! Sou a Andrilene 😊 Que tipo de janela você está pensando? Correr, guilhotina ou de abrir?",
        sender: "attendant",
        senderName: "Andrilene",
        time: "08:45",
        status: "read",
      },
      {
        id: "m7",
        content: "De correr, tenho 3 janelas. Cada uma tem 1,20m x 1,00m",
        sender: "client",
        time: "09:02",
        status: "read",
      },
      {
        id: "m8",
        content:
          "Ótimo! Para janelas de correr 2 folhas nessas medidas, temos a opção em alumínio com vidro 6mm: R$ 780,00 cada. As 3 sairiam por R$ 2.340,00 com instalação. Posso te mandar uma visita técnica para confirmar medidas?",
        sender: "attendant",
        senderName: "Andrilene",
        time: "09:15",
        status: "read",
      },
      {
        id: "m9",
        content: "Pode ser na quinta-feira de manhã?",
        sender: "client",
        time: "11:20",
        status: "read",
      },
    ],
  },

  // ── Lead 4: Pendente — sem resposta ──
  {
    id: "l4",
    name: "Carlos Eduardo Faria",
    phone: "61 9 9990-0012",
    status: "pendente",
    tagIds: ["t3", "t1"],
    lastMessage: "Preciso urgente de um vidro quebrado para minha porta",
    lastMessageTime: "07:15",
    unreadCount: 3,
    totalPurchases: 0,
    totalSpent: 0,
    createdAt: "2024-04-15",
    messages: [
      {
        id: "m1",
        content: "Bom dia, preciso urgente de um vidro quebrado para minha porta",
        sender: "client",
        time: "07:15",
        status: "delivered",
      },
      {
        id: "m2",
        content:
          "Olá! Bem-vindo à **Estrutural Vidros** 🏗️\n\nSou a assistente virtual. Com qual atendente você deseja falar?\n\n• Amarildo — Vendas\n• Andrilene — Vendas\n• Clayton — Vendas\n• Michael — Vendas\n• Nayara — Suporte",
        sender: "ai",
        senderName: "IA Estrutural",
        time: "07:15",
      },
      {
        id: "m3",
        content: "Qualquer um, é urgente!",
        sender: "client",
        time: "07:16",
        status: "delivered",
      },
      {
        id: "m4",
        content:
          "Perfeito! Transferindo para **Michael** (Vendas) agora... 🔄",
        sender: "ai",
        senderName: "IA Estrutural",
        time: "07:16",
      },
      {
        id: "m5",
        content: "Atendimento transferido para Michael (Vendas)",
        sender: "system",
        time: "07:16",
      },
      {
        id: "m6",
        content: "Preciso de uma resposta rápida, ta quebrando vento aqui",
        sender: "client",
        time: "08:30",
        status: "delivered",
      },
      {
        id: "m7",
        content: "Alguém vai me atender?",
        sender: "client",
        time: "09:00",
        status: "delivered",
      },
    ],
  },

  // ── Lead 5: Ativo — Nayara, suporte/garantia ──
  {
    id: "l5",
    name: "Fernanda Oliveira",
    phone: "61 9 9112-3344",
    email: "fernanda.oli@gmail.com",
    status: "ativo",
    tagIds: ["t6", "t5"],
    attendantId: "a3",
    lastMessage: "Vou te mandar a foto agora",
    lastMessageTime: "13:55",
    unreadCount: 1,
    totalPurchases: 3,
    totalSpent: 9200,
    lastPurchase: "Porta de Vidro Temperado",
    lastPurchaseValue: 4500,
    createdAt: "2023-11-05",
    messages: [
      {
        id: "m1",
        content: "Oi, o meu box de banheiro que comprei faz 3 meses está soltando do perfil",
        sender: "client",
        time: "13:40",
        status: "read",
      },
      {
        id: "m2",
        content:
          "Olá! Bem-vindo à **Estrutural Vidros** 🏗️\n\nSou a assistente virtual. Com qual atendente você deseja falar?\n\n• Amarildo — Vendas\n• Andrilene — Vendas\n• Clayton — Vendas\n• Michael — Vendas\n• Nayara — Suporte",
        sender: "ai",
        senderName: "IA Estrutural",
        time: "13:40",
      },
      {
        id: "m3",
        content: "Nayara, suporte",
        sender: "client",
        time: "13:41",
        status: "read",
      },
      {
        id: "m4",
        content: "Perfeito! Transferindo para **Nayara** (Suporte) agora... 🔄",
        sender: "ai",
        senderName: "IA Estrutural",
        time: "13:41",
      },
      {
        id: "m5",
        content: "Atendimento transferido para Nayara (Suporte)",
        sender: "system",
        time: "13:41",
      },
      {
        id: "m6",
        content:
          "Oi Fernanda! Aqui é a Nayara 😊 Entendo, isso está dentro da garantia sim! Você pode me mandar uma foto do problema para eu acionar nossa equipe técnica?",
        sender: "attendant",
        senderName: "Nayara",
        time: "13:43",
        status: "read",
      },
      {
        id: "m7",
        content: "Vou te mandar a foto agora",
        sender: "client",
        time: "13:55",
        status: "delivered",
      },
    ],
  },

  // ── Lead 6: Finalizado com resumo de IA ──
  {
    id: "l6",
    name: "Roberto Campos",
    phone: "61 9 8845-6789",
    email: "roberto.campos@empresa.com.br",
    company: "Campos Construções",
    address: "QI 25 Lote 5, Guará II, Brasília-DF",
    status: "finalizado",
    tagIds: ["t2", "t7", "t5", "t10"],
    attendantId: "a1",
    lastMessage: "Produto entregue e instalado com sucesso ✅",
    lastMessageTime: "Ontem",
    unreadCount: 0,
    totalPurchases: 5,
    totalSpent: 18400,
    lastPurchase: "Box Vidro Temperado 10mm + Espelho",
    lastPurchaseValue: 5200,
    createdAt: "2023-08-12",
    aiSummary:
      "**Resumo do Atendimento — gerado por IA**\n\nCliente Roberto Campos da empresa Campos Construções entrou em contato solicitando orçamento para box de banheiro temperado 10mm e espelho para projeto residencial em Guará II.\n\n**Produtos adquiridos:**\n• Box Vidro Temperado 10mm (80x200cm) — R$ 3.800\n• Espelho com moldura (120x80cm) — R$ 1.400\n**Total:** R$ 5.200 (pago via PIX)\n\n**Histórico do atendimento:**\nCliente foi atendido pelo Amarildo. Solicitou 2 visitas técnicas para confirmação de medidas. Aprovação do orçamento no mesmo dia. Fabricação concluída em 6 dias úteis. Instalação realizada sem intercorrências.\n\n**Próxima ação:** Contato de follow-up em 30 dias para verificar satisfação e possível indicação.",
    messages: [
      {
        id: "m1",
        content: "Boa tarde, preciso de orçamento para box e espelho",
        sender: "client",
        time: "14:00",
        status: "read",
      },
      {
        id: "m5",
        content: "Atendimento transferido para Amarildo (Vendas)",
        sender: "system",
        time: "14:01",
      },
      {
        id: "m6",
        content:
          "Roberto! Aqui é o Amarildo. Que ótimo! Me passa as medidas que faço o orçamento 🙂",
        sender: "attendant",
        senderName: "Amarildo",
        time: "14:05",
        status: "read",
      },
      {
        id: "m7",
        content: "Box: 80x200cm. Espelho: 120x80cm",
        sender: "client",
        time: "14:10",
        status: "read",
      },
      {
        id: "m8",
        content:
          "Orçamento:\n📋 Box 10mm — R$ 3.800\n📋 Espelho — R$ 1.400\n**Total: R$ 5.200** (PIX com 5% desc: R$ 4.940)",
        sender: "attendant",
        senderName: "Amarildo",
        time: "14:25",
        status: "read",
      },
      {
        id: "m9",
        content: "Aprovado! Vou pagar no PIX agora",
        sender: "client",
        time: "14:28",
        status: "read",
      },
      {
        id: "m10",
        content: "Produto entregue e instalado com sucesso ✅",
        sender: "system",
        time: "16:00",
      },
    ],
  },

  // ── Lead 7: Potencial — novo ──
  {
    id: "l7",
    name: "Patricia Mendes Rocha",
    phone: "61 9 9956-7788",
    status: "potencial",
    tagIds: ["t8"],
    lastMessage: "Tenho interesse em espelhos decorativos",
    lastMessageTime: "10:05",
    unreadCount: 1,
    totalPurchases: 0,
    totalSpent: 0,
    createdAt: "2024-04-15",
    messages: [
      {
        id: "m1",
        content: "Oi, tenho interesse em espelhos decorativos para sala",
        sender: "client",
        time: "10:05",
        status: "delivered",
      },
      {
        id: "m2",
        content:
          "Olá! Bem-vindo à **Estrutural Vidros** 🏗️\n\nSou a assistente virtual. Com qual atendente você deseja falar?\n\n• Amarildo — Vendas\n• Andrilene — Vendas\n• Clayton — Vendas\n• Michael — Vendas\n• Nayara — Suporte",
        sender: "ai",
        senderName: "IA Estrutural",
        time: "10:05",
      },
    ],
  },

  // ── Lead 8: Ativo — Michael ──
  {
    id: "l8",
    name: "Lucas Ferreira Braga",
    phone: "61 9 8867-9900",
    email: "lucas.braga@hotmail.com",
    status: "ativo",
    tagIds: ["t2", "t5"],
    attendantId: "a4",
    lastMessage: "Ok, agendado para sexta!",
    lastMessageTime: "16:10",
    unreadCount: 0,
    totalPurchases: 1,
    totalSpent: 1800,
    lastPurchase: "Vidro Temperado para Mesa",
    lastPurchaseValue: 1800,
    createdAt: "2024-03-28",
    messages: [
      {
        id: "m5",
        content: "Atendimento transferido para Michael (Vendas)",
        sender: "system",
        time: "15:30",
      },
      {
        id: "m6",
        content:
          "Lucas! Aqui é o Michael. Você quer agendar a instalação do vidro da mesa, certo?",
        sender: "attendant",
        senderName: "Michael",
        time: "15:45",
        status: "read",
      },
      {
        id: "m7",
        content: "Isso! Pode ser essa semana?",
        sender: "client",
        time: "16:00",
        status: "read",
      },
      {
        id: "m8",
        content:
          "Pode ser sexta-feira às 14h. Nosso técnico Clayton estará aí. Confirma?",
        sender: "attendant",
        senderName: "Michael",
        time: "16:05",
        status: "read",
      },
      {
        id: "m9",
        content: "Ok, agendado para sexta!",
        sender: "client",
        time: "16:10",
        status: "read",
      },
    ],
  },

  // ── Lead 9: Ativo — Amarildo, cliente recorrente ──
  {
    id: "l9",
    name: "Sandra Lima Pereira",
    phone: "61 9 9023-4455",
    email: "sandra.lima@gmail.com",
    status: "ativo",
    tagIds: ["t10", "t1", "t4"],
    attendantId: "a1",
    lastMessage: "Excelente! Mesmo modelo da última vez",
    lastMessageTime: "09:30",
    unreadCount: 0,
    totalPurchases: 4,
    totalSpent: 12600,
    lastPurchase: "Box Vidro Temperado 8mm",
    lastPurchaseValue: 2800,
    createdAt: "2023-06-15",
    messages: [
      {
        id: "m6",
        content:
          "Oi Sandra, cliente VIP! Aqui é o Amarildo! Como posso ajudar hoje? 😊",
        sender: "attendant",
        senderName: "Amarildo",
        time: "09:20",
        status: "read",
      },
      {
        id: "m7",
        content: "Amarildo! Quero mais um box igual ao que comprei no ano passado para o outro banheiro",
        sender: "client",
        time: "09:25",
        status: "read",
      },
      {
        id: "m8",
        content:
          "Claro! Box Vidro Temperado 8mm com perfil cromado, R$ 2.800. Mesmo modelo e instalação inclusa. Confirma?",
        sender: "attendant",
        senderName: "Amarildo",
        time: "09:28",
        status: "read",
      },
      {
        id: "m9",
        content: "Excelente! Mesmo modelo da última vez",
        sender: "client",
        time: "09:30",
        status: "read",
      },
    ],
  },

  // ── Lead 10: Finalizado com resumo de IA ──
  {
    id: "l10",
    name: "Marcos Henrique Alves",
    phone: "61 9 8890-1122",
    status: "finalizado",
    tagIds: ["t9", "t5"],
    attendantId: "a2",
    lastMessage: "Obrigado! Ficou perfeito 🙌",
    lastMessageTime: "Há 2 dias",
    unreadCount: 0,
    totalPurchases: 2,
    totalSpent: 4800,
    lastPurchase: "Janela de Correr 3 Folhas",
    lastPurchaseValue: 3600,
    createdAt: "2023-12-01",
    aiSummary:
      "**Resumo do Atendimento — gerado por IA**\n\nCliente Marcos Henrique entrou em contato para substituição das janelas da sala. Atendido pela Andrilene.\n\n**Produto adquirido:**\n• Janela de Correr 3 Folhas Alumínio (2,00x1,20m) — R$ 3.600\n**Forma de pagamento:** Cartão de crédito 6x\n\n**Histórico:** Cliente pesquisou preços antes, escolheu a Estrutural pelo prazo e qualidade. Instalação realizada em 8 dias úteis pelo técnico Clayton. Zero problemas relatados.\n\n**Satisfação:** Cliente deu nota 5 estrelas e sinalizou possível interesse em trocar portas no segundo semestre.",
    messages: [
      {
        id: "m5",
        content: "Atendimento transferido para Andrilene (Vendas)",
        sender: "system",
        time: "10:00",
      },
      {
        id: "m6",
        content: "Marcos, tudo certo com a janela?",
        sender: "attendant",
        senderName: "Andrilene",
        time: "15:00",
        status: "read",
      },
      {
        id: "m7",
        content: "Obrigado! Ficou perfeito 🙌",
        sender: "client",
        time: "15:10",
        status: "read",
      },
    ],
  },

  // ── Lead 11: Pendente ──
  {
    id: "l11",
    name: "Beatriz Santos Melo",
    phone: "61 9 9778-3344",
    status: "pendente",
    tagIds: ["t1"],
    lastMessage: "Quero saber sobre portas de vidro",
    lastMessageTime: "Ontem",
    unreadCount: 1,
    totalPurchases: 0,
    totalSpent: 0,
    createdAt: "2024-04-14",
    messages: [
      {
        id: "m1",
        content: "Boa tarde, quero saber sobre portas de vidro temperado",
        sender: "client",
        time: "17:30",
        status: "delivered",
      },
      {
        id: "m2",
        content:
          "Olá! Bem-vindo à **Estrutural Vidros** 🏗️\n\nSou a assistente virtual. Com qual atendente você deseja falar?\n\n• Amarildo — Vendas\n• Andrilene — Vendas\n• Clayton — Vendas\n• Michael — Vendas\n• Nayara — Suporte",
        sender: "ai",
        senderName: "IA Estrutural",
        time: "17:30",
      },
      {
        id: "m3",
        content: "Amarildo",
        sender: "client",
        time: "17:32",
        status: "delivered",
      },
      {
        id: "m4",
        content: "Perfeito! Transferindo para **Amarildo** agora... 🔄",
        sender: "ai",
        senderName: "IA Estrutural",
        time: "17:32",
      },
      {
        id: "m5",
        content: "Atendimento transferido para Amarildo (Vendas)",
        sender: "system",
        time: "17:32",
      },
    ],
  },

  // ── Lead 12: Potencial — fluxo de IA ──
  {
    id: "l12",
    name: "Gustavo Alves Moreira",
    phone: "61 9 9334-5566",
    status: "potencial",
    tagIds: ["t1", "t2"],
    lastMessage: "Olá! Preciso de orçamento para sacada",
    lastMessageTime: "08:50",
    unreadCount: 1,
    totalPurchases: 0,
    totalSpent: 0,
    createdAt: "2024-04-15",
    messages: [
      {
        id: "m1",
        content: "Olá! Preciso de orçamento para fechamento de sacada em vidro",
        sender: "client",
        time: "08:50",
        status: "delivered",
      },
      {
        id: "m2",
        content:
          "Olá! Bem-vindo à **Estrutural Vidros** 🏗️\n\nSou a assistente virtual. Com qual atendente você deseja falar?\n\n• Amarildo — Vendas\n• Andrilene — Vendas\n• Clayton — Vendas\n• Michael — Vendas\n• Nayara — Suporte",
        sender: "ai",
        senderName: "IA Estrutural",
        time: "08:50",
      },
    ],
  },
];

// ── Dados para Dashboard ──────────────────────────────────────────
export const peakHoursData = [
  { hour: "00h", messages: 2 },
  { hour: "01h", messages: 1 },
  { hour: "02h", messages: 0 },
  { hour: "03h", messages: 0 },
  { hour: "04h", messages: 1 },
  { hour: "05h", messages: 3 },
  { hour: "06h", messages: 8 },
  { hour: "07h", messages: 18 },
  { hour: "08h", messages: 42 },
  { hour: "09h", messages: 67 },
  { hour: "10h", messages: 78 },
  { hour: "11h", messages: 65 },
  { hour: "12h", messages: 38 },
  { hour: "13h", messages: 45 },
  { hour: "14h", messages: 71 },
  { hour: "15h", messages: 82 },
  { hour: "16h", messages: 74 },
  { hour: "17h", messages: 56 },
  { hour: "18h", messages: 35 },
  { hour: "19h", messages: 22 },
  { hour: "20h", messages: 15 },
  { hour: "21h", messages: 10 },
  { hour: "22h", messages: 7 },
  { hour: "23h", messages: 4 },
];

export const weeklyLeadsData = [
  { day: "Seg", novos: 8, finalizados: 5 },
  { day: "Ter", novos: 12, finalizados: 9 },
  { day: "Qua", novos: 7, finalizados: 6 },
  { day: "Qui", novos: 15, finalizados: 11 },
  { day: "Sex", novos: 18, finalizados: 14 },
  { day: "Sáb", novos: 10, finalizados: 7 },
  { day: "Dom", novos: 4, finalizados: 2 },
];

export const monthlyRevenueData = [
  { month: "Jan", value: 28400 },
  { month: "Fev", value: 34200 },
  { month: "Mar", value: 31800 },
  { month: "Abr", value: 42600 },
  { month: "Mai", value: 38900 },
  { month: "Jun", value: 45200 },
  { month: "Jul", value: 41700 },
  { month: "Ago", value: 50300 },
  { month: "Set", value: 47800 },
  { month: "Out", value: 53600 },
  { month: "Nov", value: 61200 },
  { month: "Dez", value: 58900 },
];
