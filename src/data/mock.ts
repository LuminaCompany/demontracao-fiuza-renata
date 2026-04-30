// ── Fiuza Construções — Mock Data ─────────────────────────────────────────────
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
  em_orcamento: "Em Orçamento",
  proposta_enviada: "Proposta Enviada",
  aguardando_aprovacao: "Aguardando Aprovação",
  pagamento_pendente: "Pagamento Pendente",
  em_producao: "Em Obra",
  instalacao_agendada: "Visita Agendada",
  pos_venda: "Pós-Obra",
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
  { id: "t2", name: "Alta Prioridade", color: "red" },
  { id: "t3", name: "Urgente", color: "red" },
  { id: "t4", name: "Reforma", color: "amber" },
  { id: "t5", name: "Visita Técnica", color: "green" },
  { id: "t6", name: "Ampliação", color: "orange" },
  { id: "t7", name: "Novo Cliente", color: "violet" },
  { id: "t8", name: "Follow-up", color: "pink" },
  { id: "t9", name: "Proposta", color: "teal" },
  { id: "t10", name: "VIP", color: "yellow" },
];

// ── Atendentes ────────────────────────────────────────────────────
export const attendants: Attendant[] = [
  {
    id: "a1",
    name: "Amarildo",
    initials: "AM",
    email: "amarildo@fiuza.com.br",
    phone: "61 9 8801-2233",
    department: "Vendas",
    status: "online",
    activeCount: 14,
    totalToday: 22,
    totalMonth: 187,
    avgResponseTime: 3.2,
    color: "#f59e0b",
  },
  {
    id: "a2",
    name: "Andrilene",
    initials: "AN",
    email: "andrilene@fiuza.com.br",
    phone: "61 9 9912-4455",
    department: "Vendas",
    status: "online",
    activeCount: 8,
    totalToday: 15,
    totalMonth: 134,
    avgResponseTime: 5.1,
    color: "#ec4899",
  },
  {
    id: "a3",
    name: "Clayton",
    initials: "CL",
    email: "clayton@fiuza.com.br",
    phone: "61 9 9745-6677",
    department: "Vendas",
    status: "online",
    activeCount: 25,
    totalToday: 31,
    totalMonth: 220,
    avgResponseTime: 2.8,
    color: "#3b82f6",
  },
  {
    id: "a4",
    name: "Michael",
    initials: "MI",
    email: "michael@fiuza.com.br",
    phone: "61 9 8823-8899",
    department: "Vendas",
    status: "busy",
    activeCount: 6,
    totalToday: 9,
    totalMonth: 98,
    avgResponseTime: 7.4,
    color: "#8b5cf6",
  },
  {
    id: "a5",
    name: "Cirlene",
    initials: "CL",
    email: "cirlene@fiuza.com.br",
    phone: "61 9 9034-1122",
    department: "Gestão / Vendas",
    status: "online",
    activeCount: 5,
    totalToday: 8,
    totalMonth: 72,
    avgResponseTime: 4.0,
    color: "#10b981",
  },
  {
    id: "a6",
    name: "Nayara",
    initials: "NY",
    email: "nayara@fiuza.com.br",
    phone: "61 9 9234-5566",
    department: "Vendas",
    status: "online",
    activeCount: 18,
    totalToday: 26,
    totalMonth: 198,
    avgResponseTime: 3.5,
    color: "#f97316",
  },
  {
    id: "a7",
    name: "Raquel",
    initials: "RQ",
    email: "raquel@fiuza.com.br",
    phone: "61 9 9345-6677",
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
    name: "Jaqueline",
    initials: "JQ",
    email: "jaqueline@fiuza.com.br",
    phone: "61 9 9456-7788",
    department: "Vendas",
    status: "busy",
    activeCount: 9,
    totalToday: 13,
    totalMonth: 112,
    avgResponseTime: 5.8,
    color: "#84cc16",
  },
  {
    id: "a9",
    name: "Nathalia",
    initials: "NT",
    email: "nathalia@fiuza.com.br",
    phone: "61 9 9567-8899",
    department: "Vendas",
    status: "offline",
    activeCount: 0,
    totalToday: 7,
    totalMonth: 88,
    avgResponseTime: 6.1,
    color: "#e11d48",
  },
  {
    id: "a10",
    name: "Mirce",
    initials: "MR",
    email: "mirce@fiuza.com.br",
    phone: "61 9 9678-9900",
    department: "Técnico",
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
    email: "diretoria@fiuza.com.br",
    phone: "61 9 9789-0011",
    department: "Gestão",
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
    email: "reserva@fiuza.com.br",
    phone: "61 9 9890-1122",
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
    name: "Marlene",
    initials: "ML",
    email: "marlene@fiuza.com.br",
    phone: "61 9 9901-2233",
    department: "Vendas",
    status: "online",
    activeCount: 7,
    totalToday: 11,
    totalMonth: 93,
    avgResponseTime: 5.0,
    color: "#a855f7",
  },
  {
    id: "a14",
    name: "Jardel",
    initials: "JD",
    email: "jardel@fiuza.com.br",
    phone: "61 9 9012-3344",
    department: "Gestão",
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
  {
    id: "acc1",
    name: "Cirlene",
    role: "gestor",
    initials: "CL",
    email: "cirlene@fiuza.com.br",
    color: "#10b981",
  },
  {
    id: "acc2",
    name: "Jardel",
    role: "gestor",
    initials: "JD",
    email: "jardel@fiuza.com.br",
    color: "#dc2626",
  },
  {
    id: "acc3",
    name: "Amarildo",
    role: "atendente",
    initials: "AM",
    email: "amarildo@fiuza.com.br",
    color: "#f59e0b",
  },
  {
    id: "acc4",
    name: "Andrilene",
    role: "atendente",
    initials: "AN",
    email: "andrilene@fiuza.com.br",
    color: "#ec4899",
  },
  {
    id: "acc5",
    name: "Clayton",
    role: "atendente",
    initials: "CL",
    email: "clayton@fiuza.com.br",
    color: "#3b82f6",
  },
];

// ── Mensagens Rápidas ─────────────────────────────────────────────
export const quickMessages = [
  {
    id: "qm1",
    title: "Boas-vindas",
    content:
      "Olá! Bem-vindo à Fiuza Construções 😊 Como posso ajudar você hoje? Me conte sobre seu projeto que montamos um orçamento completo!",
    category: "Abertura",
  },
  {
    id: "qm2",
    title: "Orçamento em elaboração",
    content:
      "Oi! Seu orçamento está sendo elaborado pela nossa equipe técnica. Retornaremos em breve com os valores detalhados por etapa da obra.",
    category: "Orçamento",
  },
  {
    id: "qm3",
    title: "Solicitar informações da obra",
    content:
      "Para montar o orçamento, preciso de algumas informações: qual a metragem da obra (m²), tipo (casa, reforma, ampliação ou comercial) e padrão de acabamento desejado (simples, médio ou alto padrão)? 📐",
    category: "Orçamento",
  },
  {
    id: "qm4",
    title: "Agendamento de visita técnica",
    content:
      "Ótima notícia! Sua visita técnica foi agendada. Nossa equipe de engenharia estará no local no horário combinado para levantamento de medidas e análise do terreno. Qualquer dúvida é só chamar! 🏗️",
    category: "Visita",
  },
  {
    id: "qm5",
    title: "Prazo estimado de obra",
    content:
      "O prazo depende da metragem e do acabamento. Casas de até 150m² padrão médio: aproximadamente 8 a 12 meses. Reformas de 80m²: 2 a 4 meses. Podemos detalhar melhor após a visita técnica!",
    category: "Suporte",
  },
  {
    id: "qm6",
    title: "Formas de pagamento",
    content:
      "Trabalhamos com: entrada + parcelas mensais durante a obra, financiamento bancário (CAIXA / Banco do Brasil) ou pagamento à vista com desconto especial. Qual prefere?",
    category: "Financeiro",
  },
  {
    id: "qm7",
    title: "Encerramento",
    content:
      "Foi um prazer atender você! Qualquer dúvida sobre o projeto ou a obra, estamos à disposição. Até logo! 😊",
    category: "Encerramento",
  },
];

// ── Leads / Conversas ─────────────────────────────────────────────
export const leads: Lead[] = [
  // ── Lead 1: Potencial — novo contato, incompleto ──
  {
    id: "l1",
    name: "João Pedro Silva",
    phone: "61 9 9801-2345",
    email: "joao.pedro@gmail.com",
    region: "centro",
    status: "potencial",
    stage: "novo_contato",
    pendingItems: [
      "Retornar mensagem do cliente",
      "Solicitar metragem e tipo de construção desejada",
    ],
    tagIds: ["t1", "t7"],
    attendantId: "a1",
    lastMessage: "Oi, quero fazer um orçamento para construir uma casa",
    lastMessageTime: "09:47",
    unreadCount: 1,
    totalPurchases: 0,
    totalSpent: 0,
    createdAt: "2024-04-15",
    notes: "Novo cliente, chegou via Instagram.",
    messages: [
      {
        id: "m1",
        content: "Oi, quero fazer um orçamento para construir uma casa",
        sender: "client",
        time: "09:44",
        status: "read",
      },
      {
        id: "m2",
        content: "Atendimento recebido — Amarildo (Vendas)",
        sender: "system",
        time: "09:44",
      },
    ],
  },

  // ── Lead 2: Ativo — aguardando aprovação ──
  {
    id: "l2",
    name: "Ana Paula Almeida",
    phone: "61 9 9723-8876",
    email: "ana.paula@outlook.com",
    company: "Residencial Almeida",
    region: "batel",
    status: "ativo",
    stage: "aguardando_aprovacao",
    pendingItems: [
      "Aguardando aprovação do orçamento pela cliente",
      "Confirmar dados para contrato e emissão de nota fiscal",
    ],
    tagIds: ["t1", "t9", "t10"],
    attendantId: "a1",
    lastMessage: "Vou conversar com meu marido e te respondo hoje!",
    lastMessageTime: "14:32",
    unreadCount: 2,
    totalPurchases: 1,
    totalSpent: 320000,
    lastPurchase: "Casa Residencial 150m² — Padrão Médio",
    lastPurchaseValue: 320000,
    createdAt: "2024-03-10",
    notes: "Cliente VIP. Prefere contato via WhatsApp. Indicou 2 amigos.",
    messages: [
      {
        id: "m1",
        content: "Oi, quero construir uma casa de 150m². Quanto custa?",
        sender: "client",
        time: "10:15",
        status: "read",
      },
      {
        id: "m2",
        content: "Atendimento recebido — Amarildo (Vendas)",
        sender: "system",
        time: "10:15",
      },
      {
        id: "m3",
        content:
          "Oi Ana Paula! Aqui é o Amarildo 😊 Que projeto incrível! Me conta um pouco mais: o terreno já é seu? E qual padrão de acabamento você deseja — simples, médio ou alto padrão?",
        sender: "attendant",
        senderName: "Amarildo",
        time: "10:18",
        status: "read",
      },
      {
        id: "m4",
        content:
          "Sim, o terreno é meu. Quero padrão médio, 3 quartos, 2 banheiros e garagem para 2 carros",
        sender: "client",
        time: "10:22",
        status: "read",
      },
      {
        id: "m5",
        content:
          "Perfeito! Com base nessas informações, montei o orçamento estimado:\n\nCasa 150m² — Padrão Médio\n• Fundação e estrutura: R$ 85.000\n• Alvenaria e cobertura: R$ 72.000\n• Instalações elétricas e hidráulicas: R$ 45.000\n• Acabamentos internos: R$ 68.000\n• Mão de obra e gestão: R$ 50.000\n\nTotal estimado: R$ 320.000\nPrazo de obra: 10 a 12 meses\n\nPosso agendar uma visita técnica ao terreno para detalhar melhor?",
        sender: "attendant",
        senderName: "Amarildo",
        time: "10:35",
        status: "read",
      },
      {
        id: "m6",
        content: "Que ótimo! Vocês trabalham com financiamento pela CAIXA?",
        sender: "client",
        time: "10:38",
        status: "read",
      },
      {
        id: "m7",
        content:
          "Sim! Somos credenciados para obras financiadas pela CAIXA Econômica e Banco do Brasil. Auxiliamos em toda a documentação do processo.",
        sender: "attendant",
        senderName: "Amarildo",
        time: "10:42",
        status: "read",
      },
      {
        id: "m8",
        content: "Vou conversar com meu marido e te respondo hoje!",
        sender: "client",
        time: "14:32",
        status: "delivered",
      },
    ],
  },

  // ── Lead 3: Ativo — proposta enviada, visita a confirmar ──
  {
    id: "l3",
    name: "Maria das Graças Costa",
    phone: "61 9 8834-5566",
    email: "maria.graca@yahoo.com.br",
    region: "santacruz",
    status: "ativo",
    stage: "proposta_enviada",
    pendingItems: [
      "Confirmar visita técnica — quinta-feira de manhã",
      "Aguardar aprovação do orçamento após visita",
    ],
    tagIds: ["t9", "t4"],
    attendantId: "a2",
    lastMessage: "Pode ser na quinta-feira de manhã?",
    lastMessageTime: "11:20",
    unreadCount: 0,
    totalPurchases: 1,
    totalSpent: 95000,
    lastPurchase: "Reforma Completa 80m²",
    lastPurchaseValue: 95000,
    createdAt: "2024-02-20",
    messages: [
      {
        id: "m1",
        content: "Boa tarde, quero fazer uma reforma completa no meu apartamento de 80m²",
        sender: "client",
        time: "08:30",
        status: "read",
      },
      {
        id: "m2",
        content: "Atendimento recebido — Andrilene (Vendas)",
        sender: "system",
        time: "08:30",
      },
      {
        id: "m3",
        content:
          "Olá Maria! Sou a Andrilene 😊 Que tipo de reforma você está planejando? Estrutural, elétrica, hidráulica ou acabamentos completos?",
        sender: "attendant",
        senderName: "Andrilene",
        time: "08:45",
        status: "read",
      },
      {
        id: "m4",
        content:
          "Reforma completa. Cozinha, banheiros, troca de piso e pintura em todo o apartamento",
        sender: "client",
        time: "09:02",
        status: "read",
      },
      {
        id: "m5",
        content:
          "Entendi! Para uma reforma completa de 80m² incluindo cozinha, banheiros, piso e pintura, o valor estimado fica entre R$ 85.000 e R$ 105.000 dependendo dos materiais. Posso agendar uma visita técnica para fechar o orçamento exato?",
        sender: "attendant",
        senderName: "Andrilene",
        time: "09:15",
        status: "read",
      },
      {
        id: "m6",
        content: "Pode ser na quinta-feira de manhã?",
        sender: "client",
        time: "11:20",
        status: "read",
      },
    ],
  },

  // ── Lead 4: Pendente — urgente, sem resposta ──
  {
    id: "l4",
    name: "Carlos Eduardo Faria",
    phone: "61 9 9990-0012",
    region: "centro",
    status: "pendente",
    stage: "novo_contato",
    pendingItems: [
      "URGENTE: cliente aguarda resposta há mais de 2h",
      "Atribuir atendente disponível imediatamente",
      "Verificar risco estrutural relatado pelo cliente",
    ],
    tagIds: ["t3", "t2"],
    lastMessage: "Alguém vai me atender?",
    lastMessageTime: "09:00",
    unreadCount: 3,
    totalPurchases: 0,
    totalSpent: 0,
    createdAt: "2024-04-15",
    messages: [
      {
        id: "m1",
        content:
          "Bom dia, apareceu uma rachadura enorme na parede da minha casa, preciso de uma vistoria urgente",
        sender: "client",
        time: "07:15",
        status: "delivered",
      },
      {
        id: "m2",
        content: "Também tá vazando água no teto depois da chuva de ontem, tô preocupado",
        sender: "client",
        time: "08:30",
        status: "delivered",
      },
      {
        id: "m3",
        content: "Alguém vai me atender?",
        sender: "client",
        time: "09:00",
        status: "delivered",
      },
    ],
  },

  // ── Lead 5: Ativo — em orçamento, aguardando planta ──
  {
    id: "l5",
    name: "Fernanda Oliveira",
    phone: "61 9 9112-3344",
    email: "fernanda.oli@gmail.com",
    region: "santana",
    status: "ativo",
    stage: "em_orcamento",
    pendingItems: [
      "Aguardando planta baixa da área para fechar orçamento",
      "Após receber: acionar engenheiro para laudo técnico",
    ],
    tagIds: ["t6", "t1"],
    attendantId: "a3",
    lastMessage: "Vou te mandar a planta agora",
    lastMessageTime: "13:55",
    unreadCount: 1,
    totalPurchases: 1,
    totalSpent: 280000,
    lastPurchase: "Casa Residencial 120m² — Padrão Médio",
    lastPurchaseValue: 280000,
    createdAt: "2023-11-05",
    messages: [
      {
        id: "m1",
        content:
          "Oi! Quero ampliar minha casa. Tenho 60m² e quero adicionar mais 50m² nos fundos do terreno",
        sender: "client",
        time: "13:40",
        status: "read",
      },
      {
        id: "m2",
        content: "Atendimento recebido — Clayton (Vendas)",
        sender: "system",
        time: "13:40",
      },
      {
        id: "m3",
        content:
          "Oi Fernanda! Aqui é o Clayton 😊 Que projeto bacana! Para uma ampliação de 50m², preciso da planta atual da sua casa para verificar a viabilidade estrutural. Você tem a planta baixa?",
        sender: "attendant",
        senderName: "Clayton",
        time: "13:43",
        status: "read",
      },
      {
        id: "m4",
        content: "Vou te mandar a planta agora",
        sender: "client",
        time: "13:55",
        status: "delivered",
      },
    ],
  },

  // ── Lead 6: Finalizado ──
  {
    id: "l6",
    name: "Roberto Campos",
    phone: "61 9 8845-6789",
    email: "roberto.campos@empresa.com.br",
    company: "Campos Incorporadora",
    address: "QI 25 Lote 5, Guará II, Brasília-DF",
    region: "centro",
    status: "finalizado",
    stage: "pos_venda",
    pendingItems: [],
    attendanceSummary:
      "Cliente Roberto Campos da Campos Incorporadora entrou em contato solicitando orçamento para construção de sobrado comercial de 220m² em Guará II.\n\nServiços contratados:\n• Projeto arquitetônico e estrutural: R$ 28.000\n• Construção Sobrado Comercial 220m²: R$ 480.000\n• Acabamentos alto padrão: R$ 95.000\nTotal: R$ 603.000 (à vista com 8% de desconto: R$ 555.000)\n\nCliente atendido pelo Amarildo. Visita técnica realizada em 2 dias após o contato inicial. Orçamento aprovado na semana seguinte. Obra concluída em 14 meses dentro do prazo contratado. Zero aditivos de obra.\n\nPróxima ação: Follow-up em 30 dias para verificar satisfação e prospectar novo projeto residencial.",
    tagIds: ["t9", "t5", "t10"],
    attendantId: "a1",
    lastMessage: "Obra entregue dentro do prazo ✅",
    lastMessageTime: "Ontem",
    unreadCount: 0,
    totalPurchases: 3,
    totalSpent: 1240000,
    lastPurchase: "Sobrado Comercial 220m² + Acabamentos",
    lastPurchaseValue: 603000,
    createdAt: "2023-08-12",
    messages: [
      {
        id: "m1",
        content: "Boa tarde, preciso de orçamento para construção de um sobrado comercial de 220m²",
        sender: "client",
        time: "14:00",
        status: "read",
      },
      {
        id: "m2",
        content: "Atendimento recebido — Amarildo (Vendas)",
        sender: "system",
        time: "14:01",
      },
      {
        id: "m3",
        content:
          "Roberto! Aqui é o Amarildo. Que projeto! Me passa o endereço do terreno que agendo a visita técnica 🙂",
        sender: "attendant",
        senderName: "Amarildo",
        time: "14:05",
        status: "read",
      },
      {
        id: "m4",
        content: "QI 25 Lote 5, Guará II. Pode agendar para semana que vem",
        sender: "client",
        time: "14:10",
        status: "read",
      },
      {
        id: "m5",
        content:
          "Orçamento Sobrado Comercial 220m²:\n• Projeto: R$ 28.000\n• Construção: R$ 480.000\n• Acabamentos alto padrão: R$ 95.000\nTotal: R$ 603.000\n(À vista: R$ 555.000 — 8% desc.)\nPrazo: 14 meses",
        sender: "attendant",
        senderName: "Amarildo",
        time: "14:25",
        status: "read",
      },
      {
        id: "m6",
        content: "Aprovado! Vamos fechar à vista",
        sender: "client",
        time: "14:28",
        status: "read",
      },
      {
        id: "m7",
        content: "Obra entregue dentro do prazo ✅",
        sender: "system",
        time: "16:00",
      },
    ],
  },

  // ── Lead 7: Potencial — novo contato, incompleto ──
  {
    id: "l7",
    name: "Patricia Mendes Rocha",
    phone: "61 9 9956-7788",
    region: "trianon",
    status: "potencial",
    stage: "novo_contato",
    pendingItems: [
      "Iniciar atendimento sobre construção comercial",
      "Enviar portfólio de galpões e obras comerciais",
    ],
    tagIds: ["t1", "t7"],
    lastMessage: "Preciso de orçamento para um galpão comercial",
    lastMessageTime: "10:05",
    unreadCount: 1,
    totalPurchases: 0,
    totalSpent: 0,
    createdAt: "2024-04-15",
    messages: [
      {
        id: "m1",
        content: "Oi, preciso de orçamento para construir um galpão comercial de 300m²",
        sender: "client",
        time: "10:05",
        status: "delivered",
      },
    ],
  },

  // ── Lead 8: Ativo — visita técnica agendada ──
  {
    id: "l8",
    name: "Lucas Ferreira Braga",
    phone: "61 9 8867-9900",
    email: "lucas.braga@hotmail.com",
    region: "batel",
    status: "ativo",
    stage: "instalacao_agendada",
    pendingItems: [
      "Visita técnica agendada: sexta-feira às 14h",
      "Confirmar endereço com o cliente no dia anterior",
    ],
    tagIds: ["t5", "t9"],
    attendantId: "a4",
    lastMessage: "Ok, agendado para sexta!",
    lastMessageTime: "16:10",
    unreadCount: 0,
    totalPurchases: 1,
    totalSpent: 185000,
    lastPurchase: "Casa Residencial 90m² — Padrão Simples",
    lastPurchaseValue: 185000,
    createdAt: "2024-03-28",
    messages: [
      {
        id: "m1",
        content: "Atendimento recebido — Michael (Vendas)",
        sender: "system",
        time: "15:30",
      },
      {
        id: "m2",
        content:
          "Lucas! Aqui é o Michael. Você quer agendar a visita técnica ao terreno para levantamento do orçamento da sua casa, certo?",
        sender: "attendant",
        senderName: "Michael",
        time: "15:45",
        status: "read",
      },
      {
        id: "m3",
        content: "Isso! Pode ser essa semana?",
        sender: "client",
        time: "16:00",
        status: "read",
      },
      {
        id: "m4",
        content:
          "Pode ser sexta-feira às 14h. Nosso engenheiro Clayton estará lá para o levantamento. Confirma?",
        sender: "attendant",
        senderName: "Michael",
        time: "16:05",
        status: "read",
      },
      {
        id: "m5",
        content: "Ok, agendado para sexta!",
        sender: "client",
        time: "16:10",
        status: "read",
      },
    ],
  },

  // ── Lead 9: Ativo — cliente recorrente, aguardando confirmação ──
  {
    id: "l9",
    name: "Sandra Lima Pereira",
    phone: "61 9 9023-4455",
    email: "sandra.lima@gmail.com",
    region: "batel",
    status: "ativo",
    stage: "aguardando_aprovacao",
    pendingItems: [
      "Aguardando confirmação do orçamento de ampliação",
      "Após aprovação: assinar contrato e iniciar projeto",
    ],
    tagIds: ["t10", "t6", "t4"],
    attendantId: "a1",
    lastMessage: "Excelente! Mesmo padrão de acabamento da casa original",
    lastMessageTime: "09:30",
    unreadCount: 0,
    totalPurchases: 2,
    totalSpent: 420000,
    lastPurchase: "Ampliação 60m² — Padrão Médio",
    lastPurchaseValue: 120000,
    createdAt: "2023-06-15",
    messages: [
      {
        id: "m1",
        content: "Oi Sandra, cliente VIP! Aqui é o Amarildo! Como posso ajudar hoje? 😊",
        sender: "attendant",
        senderName: "Amarildo",
        time: "09:20",
        status: "read",
      },
      {
        id: "m2",
        content:
          "Amarildo! Quero ampliar a casa mais uma vez. Quero 60m² nos fundos — uma suíte master e varanda gourmet",
        sender: "client",
        time: "09:25",
        status: "read",
      },
      {
        id: "m3",
        content:
          "Claro! Ampliação de 60m² com suíte master e varanda gourmet, padrão médio: R$ 120.000 estimado. Prazo de 6 meses. Inclui projeto, materiais e mão de obra. Confirma?",
        sender: "attendant",
        senderName: "Amarildo",
        time: "09:28",
        status: "read",
      },
      {
        id: "m4",
        content: "Excelente! Mesmo padrão de acabamento da casa original",
        sender: "client",
        time: "09:30",
        status: "read",
      },
    ],
  },

  // ── Lead 10: Finalizado ──
  {
    id: "l10",
    name: "Marcos Henrique Alves",
    phone: "61 9 8890-1122",
    region: "santacruz",
    status: "finalizado",
    stage: "pos_venda",
    pendingItems: [],
    attendanceSummary:
      "Cliente Marcos Henrique entrou em contato para reforma completa de cozinha e 2 banheiros. Atendido pela Andrilene.\n\nServiço contratado:\n• Reforma de Cozinha + 2 Banheiros (40m²): R$ 68.000\nForma de pagamento: 30% entrada + saldo em 8 parcelas mensais durante a obra\n\nCliente pesquisou outras construtoras antes, escolheu a Fiuza pelo prazo e qualidade no atendimento. Obra concluída em 3 meses sem intercorrências. Zero retrabalhos.\n\nSatisfação: Cliente elogiou os acabamentos e sinalizou interesse em reformar a área de lazer no segundo semestre.",
    tagIds: ["t5", "t4"],
    attendantId: "a2",
    lastMessage: "Obrigado! Ficou lindo demais 🙌",
    lastMessageTime: "Há 2 dias",
    unreadCount: 0,
    totalPurchases: 2,
    totalSpent: 118000,
    lastPurchase: "Reforma Cozinha + 2 Banheiros",
    lastPurchaseValue: 68000,
    createdAt: "2023-12-01",
    messages: [
      {
        id: "m1",
        content: "Atendimento recebido — Andrilene (Vendas)",
        sender: "system",
        time: "10:00",
      },
      {
        id: "m2",
        content: "Marcos, tudo certo com a reforma? Ficou do jeito que esperava?",
        sender: "attendant",
        senderName: "Andrilene",
        time: "15:00",
        status: "read",
      },
      {
        id: "m3",
        content: "Obrigado! Ficou lindo demais 🙌",
        sender: "client",
        time: "15:10",
        status: "read",
      },
    ],
  },

  // ── Lead 11: Pendente — sem atendimento, incompleto ──
  {
    id: "l11",
    name: "Beatriz Santos Melo",
    phone: "61 9 9778-3344",
    region: "trianon",
    status: "pendente",
    stage: "novo_contato",
    pendingItems: [
      "Retornar mensagem da cliente (desde ontem)",
      "Iniciar atendimento sobre construção de casa térrea",
    ],
    tagIds: ["t1"],
    lastMessage: "Quero saber sobre construção de casa térrea",
    lastMessageTime: "Ontem",
    unreadCount: 1,
    totalPurchases: 0,
    totalSpent: 0,
    createdAt: "2024-04-14",
    messages: [
      {
        id: "m1",
        content: "Boa tarde, quero saber o valor para construir uma casa térrea de 100m²",
        sender: "client",
        time: "17:30",
        status: "delivered",
      },
    ],
  },

  // ── Lead 12: Potencial — em orçamento, aguardando informações ──
  {
    id: "l12",
    name: "Gustavo Alves Moreira",
    phone: "61 9 9334-5566",
    region: "santana",
    status: "potencial",
    stage: "em_orcamento",
    pendingItems: [
      "Aguardando resposta do cliente sobre padrão de acabamento",
      "Enviar estimativa preliminar após retorno",
    ],
    tagIds: ["t1", "t7"],
    lastMessage: "Olá! Preciso de orçamento para construir uma casa",
    lastMessageTime: "08:50",
    unreadCount: 1,
    totalPurchases: 0,
    totalSpent: 0,
    createdAt: "2024-04-15",
    messages: [
      {
        id: "m1",
        content: "Olá! Preciso de orçamento para construir uma casa de 130m² em terreno plano",
        sender: "client",
        time: "08:50",
        status: "delivered",
      },
      {
        id: "m2",
        content: "Atendimento recebido",
        sender: "system",
        time: "08:51",
      },
      {
        id: "m3",
        content:
          "Oi Gustavo! Aqui é o Amarildo 😊 Ótima escolha! Para montar o orçamento da sua casa de 130m², me diz: qual padrão de acabamento você busca — simples, médio ou alto padrão? E já tem projeto arquitetônico?",
        sender: "attendant",
        senderName: "Amarildo",
        time: "08:55",
        status: "read",
      },
    ],
  },

  // ── Lead 13: Ativo — Centro, em orçamento ──
  {
    id: "l13",
    name: "Rodrigo Amaral Costa",
    phone: "42 9 9821-3344",
    email: "rodrigo.amaral@gmail.com",
    region: "centro",
    status: "ativo",
    stage: "em_orcamento",
    pendingItems: [
      "Enviar orçamento detalhado para aprovação",
      "Confirmar metragem do terreno com engenheiro",
    ],
    tagIds: ["t1", "t5"],
    attendantId: "a3",
    lastMessage: "Preciso do orçamento até sexta, tenho reunião com o banco",
    lastMessageTime: "11:30",
    unreadCount: 1,
    totalPurchases: 0,
    totalSpent: 0,
    createdAt: "2024-04-10",
    notes: "Cliente veio por indicação do Roberto Campos.",
    messages: [
      {
        id: "m1",
        content: "Olá! Quero construir uma casa de 180m² no Centro de Guarapuava",
        sender: "client",
        time: "10:00",
        status: "read",
      },
      {
        id: "m2",
        content: "Atendimento recebido — Clayton (Vendas)",
        sender: "system",
        time: "10:01",
      },
      {
        id: "m3",
        content:
          "Oi Rodrigo! Aqui é o Clayton. Que projeto bacana! Me conta mais: o terreno já é seu? Qual padrão de acabamento está buscando?",
        sender: "attendant",
        senderName: "Clayton",
        time: "10:05",
        status: "read",
      },
      {
        id: "m4",
        content:
          "Sim, tenho o terreno no Centro. Quero padrão médio-alto, 4 quartos sendo 2 suítes",
        sender: "client",
        time: "10:18",
        status: "read",
      },
      {
        id: "m5",
        content:
          "Perfeito! Estou montando o orçamento detalhado agora. Para 180m² padrão médio-alto, estimo entre R$ 460.000 e R$ 510.000. Mando o detalhamento completo ainda hoje",
        sender: "attendant",
        senderName: "Clayton",
        time: "10:30",
        status: "read",
      },
      {
        id: "m6",
        content: "Preciso do orçamento até sexta, tenho reunião com o banco",
        sender: "client",
        time: "11:30",
        status: "delivered",
      },
    ],
  },

  // ── Lead 14: Potencial — Batel, novo contato ──
  {
    id: "l14",
    name: "Elaine Rodrigues Pinto",
    phone: "42 9 9634-5566",
    email: "elaine.rodrigues@hotmail.com",
    region: "batel",
    status: "potencial",
    stage: "novo_contato",
    pendingItems: [
      "Iniciar atendimento sobre reforma residencial",
      "Enviar portfólio de reformas realizadas no Batel",
    ],
    tagIds: ["t4", "t7"],
    lastMessage: "Vi no Instagram vocês fazendo reforma, quero fazer na minha casa também",
    lastMessageTime: "09:15",
    unreadCount: 1,
    totalPurchases: 0,
    totalSpent: 0,
    createdAt: "2024-04-16",
    messages: [
      {
        id: "m1",
        content: "Vi no Instagram vocês fazendo reforma, quero fazer na minha casa também",
        sender: "client",
        time: "09:15",
        status: "delivered",
      },
    ],
  },

  // ── Lead 15: Ativo — Santana, proposta enviada ──
  {
    id: "l15",
    name: "Felipe Souza Neto",
    phone: "42 9 9745-8899",
    email: "felipe.souza@empresa.com",
    company: "Souza & Filhos LTDA",
    region: "santana",
    status: "ativo",
    stage: "proposta_enviada",
    pendingItems: [
      "Aguardando assinatura do contrato",
      "Verificar documentação do terreno para licença",
    ],
    tagIds: ["t9", "t1", "t10"],
    attendantId: "a6",
    lastMessage: "O contrato está ótimo! Só preciso revisar com meu advogado",
    lastMessageTime: "16:45",
    unreadCount: 0,
    totalPurchases: 1,
    totalSpent: 215000,
    lastPurchase: "Galpão Comercial 120m²",
    lastPurchaseValue: 215000,
    createdAt: "2024-03-05",
    notes: "Cliente recorrente. Empresa de distribuição de alimentos.",
    messages: [
      {
        id: "m1",
        content: "Nayara, quero construir mais um galpão no meu terreno da Santana",
        sender: "client",
        time: "13:00",
        status: "read",
      },
      {
        id: "m2",
        content: "Atendimento recebido — Nayara (Vendas)",
        sender: "system",
        time: "13:01",
      },
      {
        id: "m3",
        content:
          "Felipe! Que ótimo voltar a trabalhar com vocês 😊 Qual metragem está pensando desta vez?",
        sender: "attendant",
        senderName: "Nayara",
        time: "13:05",
        status: "read",
      },
      {
        id: "m4",
        content: "Quero 200m² desta vez, padrão industrial mas com área de escritório integrada",
        sender: "client",
        time: "13:15",
        status: "read",
      },
      {
        id: "m5",
        content:
          "Proposta Galpão Industrial 200m² com escritório:\n• Estrutura metálica: R$ 120.000\n• Alvenaria + cobertura: R$ 68.000\n• Elétrica e hidráulica: R$ 38.000\n• Escritório integrado (30m²): R$ 52.000\nTotal: R$ 278.000 | Prazo: 7 meses",
        sender: "attendant",
        senderName: "Nayara",
        time: "14:00",
        status: "read",
      },
      {
        id: "m6",
        content: "O contrato está ótimo! Só preciso revisar com meu advogado",
        sender: "client",
        time: "16:45",
        status: "read",
      },
    ],
  },

  // ── Lead 16: Pendente — Trianon, urgente ──
  {
    id: "l16",
    name: "Camila Torres Mendes",
    phone: "42 9 9856-7788",
    region: "trianon",
    status: "pendente",
    stage: "novo_contato",
    pendingItems: [
      "URGENTE: infiltração grave relatada — acionar equipe técnica",
      "Retornar ligação da cliente imediatamente",
    ],
    tagIds: ["t3", "t2"],
    lastMessage: "Tô com infiltração grave no teto, o reboco já caiu, preciso de ajuda",
    lastMessageTime: "07:42",
    unreadCount: 2,
    totalPurchases: 0,
    totalSpent: 0,
    createdAt: "2024-04-16",
    messages: [
      {
        id: "m1",
        content:
          "Bom dia, tô com infiltração grave no teto do meu quarto. O reboco já caiu e molhou o colchão",
        sender: "client",
        time: "07:40",
        status: "delivered",
      },
      {
        id: "m2",
        content: "Tô com infiltração grave no teto, o reboco já caiu, preciso de ajuda",
        sender: "client",
        time: "07:42",
        status: "delivered",
      },
    ],
  },

  // ── Lead 17: Ativo — Santa Cruz, aguardando aprovação ──
  {
    id: "l17",
    name: "André Luiz Machado",
    phone: "42 9 9967-1122",
    email: "andre.machado@construfacil.com",
    company: "ConstruFácil",
    region: "santacruz",
    status: "ativo",
    stage: "aguardando_aprovacao",
    pendingItems: [
      "Aguardando aprovação dos sócios para iniciar a obra",
      "Verificar disponibilidade de equipe para março",
    ],
    tagIds: ["t9", "t6"],
    attendantId: "a1",
    lastMessage: "Reunião dos sócios é na quinta. Te aviso logo depois",
    lastMessageTime: "15:20",
    unreadCount: 0,
    totalPurchases: 2,
    totalSpent: 540000,
    lastPurchase: "Sede Comercial 180m²",
    lastPurchaseValue: 380000,
    createdAt: "2024-02-14",
    notes: "Empresa de construção leve, contraria a Fiuza para obras pesadas.",
    messages: [
      {
        id: "m1",
        content:
          "Amarildo, preciso de orçamento para expandir nossa sede em Santa Cruz. Quero mais 90m² nos fundos",
        sender: "client",
        time: "09:00",
        status: "read",
      },
      {
        id: "m2",
        content: "André! Claro, vou agendar visita técnica para esta semana",
        sender: "attendant",
        senderName: "Amarildo",
        time: "09:10",
        status: "read",
      },
      {
        id: "m3",
        content:
          "Expansão 90m² Sede ConstruFácil:\n• Estrutura e alvenaria: R$ 82.000\n• Cobertura: R$ 24.000\n• Acabamentos padrão médio: R$ 38.000\n• Elétrica + hidráulica: R$ 22.000\nTotal: R$ 166.000 | Prazo: 5 meses",
        sender: "attendant",
        senderName: "Amarildo",
        time: "11:00",
        status: "read",
      },
      {
        id: "m4",
        content: "Reunião dos sócios é na quinta. Te aviso logo depois",
        sender: "client",
        time: "15:20",
        status: "read",
      },
    ],
  },

  // ── Lead 18: Potencial — Centro, em orçamento ──
  {
    id: "l18",
    name: "Vanessa Pires Moura",
    phone: "42 9 9078-3344",
    email: "vanessa.pires@gmail.com",
    region: "centro",
    status: "potencial",
    stage: "em_orcamento",
    pendingItems: [
      "Aguardando resposta sobre padrão de acabamento",
      "Verificar viabilidade de ampliação do recuo",
    ],
    tagIds: ["t6", "t1"],
    attendantId: "a2",
    lastMessage: "Deixa eu ver com meu marido qual padrão de acabamento vamos querer",
    lastMessageTime: "12:10",
    unreadCount: 0,
    totalPurchases: 0,
    totalSpent: 0,
    createdAt: "2024-04-08",
    messages: [
      {
        id: "m1",
        content: "Boa tarde! Quero fazer uma ampliação na minha casa no Centro",
        sender: "client",
        time: "11:00",
        status: "read",
      },
      {
        id: "m2",
        content: "Atendimento recebido — Andrilene (Vendas)",
        sender: "system",
        time: "11:01",
      },
      {
        id: "m3",
        content: "Oi Vanessa! Sou a Andrilene 😊 Que área você quer ampliar e quantos m²?",
        sender: "attendant",
        senderName: "Andrilene",
        time: "11:08",
        status: "read",
      },
      {
        id: "m4",
        content: "Quero ampliar a cozinha e fazer uma varanda gourmet nos fundos. Uns 40m²",
        sender: "client",
        time: "11:25",
        status: "read",
      },
      {
        id: "m5",
        content:
          "Para 40m² com cozinha ampliada e varanda gourmet, estimo entre R$ 75.000 e R$ 95.000 dependendo do padrão de acabamento. Qual prefere — simples, médio ou alto padrão?",
        sender: "attendant",
        senderName: "Andrilene",
        time: "11:40",
        status: "read",
      },
      {
        id: "m6",
        content: "Deixa eu ver com meu marido qual padrão de acabamento vamos querer",
        sender: "client",
        time: "12:10",
        status: "read",
      },
    ],
  },

  // ── Lead 19: Ativo — Batel, em produção ──
  {
    id: "l19",
    name: "Diego Santos Costa",
    phone: "42 9 9189-4455",
    email: "diego.santos@gmail.com",
    region: "batel",
    status: "ativo",
    stage: "em_producao",
    pendingItems: [
      "Acompanhar andamento da concretagem da laje",
      "Emitir relatório fotográfico semanal para o cliente",
    ],
    tagIds: ["t5"],
    attendantId: "a3",
    lastMessage: "A laje ficou perfeita! Equipe de vocês é muito profissional",
    lastMessageTime: "17:00",
    unreadCount: 0,
    totalPurchases: 1,
    totalSpent: 342000,
    lastPurchase: "Casa Residencial 160m² — Padrão Médio",
    lastPurchaseValue: 342000,
    createdAt: "2023-10-18",
    notes: "Obra iniciada em novembro. Prazo de conclusão: agosto de 2024.",
    messages: [
      {
        id: "m1",
        content: "Clayton, como está o andamento da minha obra?",
        sender: "client",
        time: "16:30",
        status: "read",
      },
      {
        id: "m2",
        content:
          "Diego! Estamos na concretagem da laje do segundo pavimento. Segue conforme cronograma 👷",
        sender: "attendant",
        senderName: "Clayton",
        time: "16:45",
        status: "read",
      },
      {
        id: "m3",
        content: "A laje ficou perfeita! Equipe de vocês é muito profissional",
        sender: "client",
        time: "17:00",
        status: "read",
      },
    ],
  },

  // ── Lead 20: Finalizado — Santana ──
  {
    id: "l20",
    name: "Juliana Martins Rocha",
    phone: "42 9 9290-5566",
    email: "juliana.martins@outlook.com",
    region: "santana",
    status: "finalizado",
    stage: "pos_venda",
    pendingItems: [],
    attendanceSummary:
      "Cliente Juliana Martins entrou em contato para construção de residência unifamiliar de 140m² na Santana.\n\nContratação:\n• Casa 140m² padrão médio | 3 quartos + 2 banheiros: R$ 308.000\n• Paisagismo e área externa: R$ 22.000\nTotal: R$ 330.000 | Prazo: 11 meses\n\nObra concluída dentro do prazo com nota máxima de satisfação. Cliente indicou 3 amigas para orçamento.",
    tagIds: ["t5", "t10"],
    attendantId: "a6",
    lastMessage: "Adorei tudo! Já indiquei para 3 amigas minhas ❤️",
    lastMessageTime: "Há 3 dias",
    unreadCount: 0,
    totalPurchases: 1,
    totalSpent: 330000,
    lastPurchase: "Casa Residencial 140m² + Paisagismo",
    lastPurchaseValue: 330000,
    createdAt: "2023-07-20",
    messages: [
      {
        id: "m1",
        content: "Nayara, vim te dar um retorno da minha casa nova!",
        sender: "client",
        time: "10:00",
        status: "read",
      },
      {
        id: "m2",
        content: "Juliana! Ansiosa para saber 😍 Conta tudo!",
        sender: "attendant",
        senderName: "Nayara",
        time: "10:02",
        status: "read",
      },
      {
        id: "m3",
        content: "Adorei tudo! Já indiquei para 3 amigas minhas ❤️",
        sender: "client",
        time: "10:05",
        status: "read",
      },
    ],
  },

  // ── Lead 21: Ativo — Trianon, visita agendada ──
  {
    id: "l21",
    name: "Paulo César Andrade",
    phone: "42 9 9391-7788",
    email: "paulo.andrade@andrade.eng.br",
    company: "Andrade Engenharia",
    region: "trianon",
    status: "ativo",
    stage: "instalacao_agendada",
    pendingItems: [
      "Visita técnica agendada: segunda-feira às 10h",
      "Levar pranchas do projeto arquitetônico para aprovação",
    ],
    tagIds: ["t5", "t9", "t1"],
    attendantId: "a5",
    lastMessage: "Segunda às 10h está perfeito. Estarei no local",
    lastMessageTime: "14:50",
    unreadCount: 0,
    totalPurchases: 3,
    totalSpent: 890000,
    lastPurchase: "Condomínio 4 casas 100m² cada",
    lastPurchaseValue: 560000,
    createdAt: "2024-01-09",
    notes: "Engenheiro parceiro. Indica obras de terceiros para a Fiuza.",
    messages: [
      {
        id: "m1",
        content:
          "Cirlene, tenho um cliente querendo construir um sobrado no Trianon. Posso indicar para vocês fazerem a visita técnica?",
        sender: "client",
        time: "14:00",
        status: "read",
      },
      {
        id: "m2",
        content:
          "Paulo! Claro, adoramos trabalhar com seus clientes 😊 Que dia funciona para a visita?",
        sender: "attendant",
        senderName: "Cirlene",
        time: "14:10",
        status: "read",
      },
      {
        id: "m3",
        content: "Segunda às 10h está perfeito. Estarei no local",
        sender: "client",
        time: "14:50",
        status: "read",
      },
    ],
  },

  // ── Lead 22: Potencial — Santa Cruz, novo contato ──
  {
    id: "l22",
    name: "Cristina Lima Duarte",
    phone: "42 9 9492-9900",
    region: "santacruz",
    status: "potencial",
    stage: "novo_contato",
    pendingItems: [
      "Ligar para cliente — não responde no WhatsApp",
      "Enviar catálogo de projetos residenciais prontos",
    ],
    tagIds: ["t1", "t7"],
    lastMessage: "Quero construir uma casinha simples para minha mãe, qual o valor mínimo?",
    lastMessageTime: "Ontem",
    unreadCount: 1,
    totalPurchases: 0,
    totalSpent: 0,
    createdAt: "2024-04-15",
    messages: [
      {
        id: "m1",
        content: "Quero construir uma casinha simples para minha mãe, qual o valor mínimo?",
        sender: "client",
        time: "19:30",
        status: "delivered",
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
  { month: "Jan", value: 284000 },
  { month: "Fev", value: 342000 },
  { month: "Mar", value: 318000 },
  { month: "Abr", value: 426000 },
  { month: "Mai", value: 389000 },
  { month: "Jun", value: 452000 },
  { month: "Jul", value: 417000 },
  { month: "Ago", value: 503000 },
  { month: "Set", value: 478000 },
  { month: "Out", value: 536000 },
  { month: "Nov", value: 612000 },
  { month: "Dez", value: 589000 },
];
