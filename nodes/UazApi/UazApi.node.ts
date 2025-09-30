import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
} from 'n8n-workflow';

export class UazApi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'UazAPI',
		name: 'uazApi',
		icon: 'file:uazapi.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Integração completa com UazAPI - 90+ endpoints para automação WhatsApp',
		defaults: {
			name: 'UazAPI',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'uazApiApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			// ============================================
			// RESOURCE SELECTOR
			// ============================================
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Instance',
						value: 'instance',
						description: 'Gerenciar instâncias WhatsApp',
					},
					{
						name: 'Message',
						value: 'message',
						description: 'Enviar e gerenciar mensagens',
					},
					{
						name: 'Group',
						value: 'group',
						description: 'Gerenciar grupos WhatsApp',
					},
					{
						name: 'Contact',
						value: 'contact',
						description: 'Gerenciar contatos',
					},
					{
						name: 'Chat',
						value: 'chat',
						description: 'Gerenciar conversas',
					},
					{
						name: 'Campaign',
						value: 'campaign',
						description: 'Campanhas de disparo em massa',
					},
					{
						name: 'Chatbot',
						value: 'chatbot',
						description: 'Configurar chatbot com IA',
					},
					{
						name: 'Label',
						value: 'label',
						description: 'Gerenciar etiquetas/tags',
					},
				],
				default: 'message',
			},

			// ============================================
			// INSTANCE OPERATIONS
			// ============================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['instance'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Criar nova instância',
						action: 'Create instance',
					},
					{
						name: 'Connect',
						value: 'connect',
						description: 'Conectar ao WhatsApp (gera QR Code)',
						action: 'Connect instance',
					},
					{
						name: 'Get Status',
						value: 'getStatus',
						description: 'Verificar status da instância',
						action: 'Get instance status',
					},
					{
						name: 'Disconnect',
						value: 'disconnect',
						description: 'Desconectar instância',
						action: 'Disconnect instance',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Deletar instância',
						action: 'Delete instance',
					},
					{
						name: 'List All',
						value: 'listAll',
						description: 'Listar todas as instâncias',
						action: 'List all instances',
					},
					{
						name: 'Update Name',
						value: 'updateName',
						description: 'Atualizar nome da instância',
						action: 'Update instance name',
					},
				],
				default: 'create',
			},

			// Instance Name field (usado em várias operações)
			{
				displayName: 'Instance Name',
				name: 'instanceName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['instance'],
						operation: ['create', 'connect', 'getStatus', 'disconnect', 'delete', 'updateName'],
					},
				},
				default: '',
				placeholder: 'minha-instancia',
				description: 'Nome único da instância WhatsApp',
			},

			// New Instance Name (para updateName)
			{
				displayName: 'New Name',
				name: 'newName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['instance'],
						operation: ['updateName'],
					},
				},
				default: '',
				description: 'Novo nome para a instância',
			},

			// Phone for connect
			{
				displayName: 'Phone Number',
				name: 'phone',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['instance'],
						operation: ['connect'],
					},
				},
				default: '',
				placeholder: '5511999999999',
				description: 'Número de telefone (opcional - para código de pareamento)',
			},

			// ============================================
			// MESSAGE OPERATIONS
			// ============================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['message'],
					},
				},
				options: [
					{
						name: 'Send Text',
						value: 'sendText',
						description: 'Enviar mensagem de texto',
						action: 'Send text message',
					},
					{
						name: 'Send Media',
						value: 'sendMedia',
						description: 'Enviar mídia (imagem, vídeo, áudio, documento)',
						action: 'Send media message',
					},
					{
						name: 'Send Contact',
						value: 'sendContact',
						description: 'Enviar cartão de contato (vCard)',
						action: 'Send contact card',
					},
					{
						name: 'Send Location',
						value: 'sendLocation',
						description: 'Enviar localização geográfica',
						action: 'Send location',
					},
					{
						name: 'Send Menu',
						value: 'sendMenu',
						description: 'Enviar menu interativo (botões, lista, enquete)',
						action: 'Send interactive menu',
					},
					{
						name: 'Send Status/Story',
						value: 'sendStatus',
						description: 'Enviar story/status do WhatsApp',
						action: 'Send status story',
					},
					{
						name: 'Download Media',
						value: 'downloadMedia',
						description: 'Baixar arquivo de uma mensagem',
						action: 'Download media file',
					},
					{
						name: 'Delete Message',
						value: 'deleteMessage',
						description: 'Apagar mensagem para todos',
						action: 'Delete message for everyone',
					},
					{
						name: 'Edit Message',
						value: 'editMessage',
						description: 'Editar mensagem enviada',
						action: 'Edit sent message',
					},
					{
						name: 'React to Message',
						value: 'reactMessage',
						description: 'Enviar reação (emoji) a uma mensagem',
						action: 'React to message',
					},
					{
						name: 'Mark as Read',
						value: 'markRead',
						description: 'Marcar mensagem como lida',
						action: 'Mark message as read',
					},
				],
				default: 'sendText',
			},

			// Number field (usado em várias operações de mensagem)
			{
				displayName: 'Number',
				name: 'number',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendText', 'sendMedia', 'sendContact', 'sendLocation', 'sendMenu', 'reactMessage'],
					},
				},
				default: '',
				placeholder: '5511999999999',
				description: 'Número do destinatário (com código do país, sem +)',
			},

			// Send Text fields
			{
				displayName: 'Text',
				name: 'text',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendText'],
					},
				},
				default: '',
				description: 'Texto da mensagem',
			},

			// Send Media fields
			{
				displayName: 'Media Type',
				name: 'mediaType',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendMedia'],
					},
				},
				options: [
					{
						name: 'Image',
						value: 'image',
					},
					{
						name: 'Video',
						value: 'video',
					},
					{
						name: 'Audio',
						value: 'audio',
					},
					{
						name: 'Document',
						value: 'document',
					},
					{
						name: 'PTT (Voice Note)',
						value: 'ptt',
					},
					{
						name: 'Sticker',
						value: 'sticker',
					},
				],
				default: 'image',
			},
			{
				displayName: 'File URL or Base64',
				name: 'file',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendMedia'],
					},
				},
				default: '',
				placeholder: 'https://exemplo.com/imagem.jpg ou data:image/png;base64,...',
				description: 'URL do arquivo ou string base64',
			},
			{
				displayName: 'Caption',
				name: 'caption',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendMedia'],
					},
				},
				default: '',
				description: 'Legenda da mídia (opcional)',
			},

			// Send Contact fields
			{
				displayName: 'Contact Full Name',
				name: 'fullName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendContact'],
					},
				},
				default: '',
				description: 'Nome completo do contato',
			},
			{
				displayName: 'Contact Phone',
				name: 'phoneNumber',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendContact'],
					},
				},
				default: '',
				placeholder: '5511999999999',
				description: 'Número(s) de telefone do contato (separados por vírgula se múltiplos)',
			},

			// Send Location fields
			{
				displayName: 'Location Name',
				name: 'locationName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendLocation'],
					},
				},
				default: '',
				description: 'Nome do local',
			},
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendLocation'],
					},
				},
				default: '',
				description: 'Endereço do local',
			},
			{
				displayName: 'Latitude',
				name: 'latitude',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendLocation'],
					},
				},
				default: 0,
				description: 'Latitude (-90 a 90)',
			},
			{
				displayName: 'Longitude',
				name: 'longitude',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendLocation'],
					},
				},
				default: 0,
				description: 'Longitude (-180 a 180)',
			},

			// Send Menu fields
			{
				displayName: 'Menu Type',
				name: 'menuType',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendMenu'],
					},
				},
				options: [
					{
						name: 'Button',
						value: 'button',
						description: 'Botões de resposta rápida',
					},
					{
						name: 'List',
						value: 'list',
						description: 'Lista de opções',
					},
					{
						name: 'Poll',
						value: 'poll',
						description: 'Enquete',
					},
				],
				default: 'button',
			},
			{
				displayName: 'Menu Text',
				name: 'menuText',
				type: 'string',
				typeOptions: {
					rows: 3,
				},
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendMenu'],
					},
				},
				default: '',
				description: 'Texto principal do menu',
			},

			// React to Message fields
			{
				displayName: 'Message ID',
				name: 'messageId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['reactMessage', 'deleteMessage', 'editMessage', 'downloadMedia'],
					},
				},
				default: '',
				description: 'ID da mensagem',
			},
			{
				displayName: 'Emoji',
				name: 'emoji',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['reactMessage'],
					},
				},
				default: '👍',
				placeholder: '👍 ❤️ 😂 😮 😢 🙏',
				description: 'Emoji de reação',
			},

			// Edit Message fields
			{
				displayName: 'New Text',
				name: 'newText',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['editMessage'],
					},
				},
				default: '',
				description: 'Novo texto da mensagem',
			},

			// ============================================
			// CAMPAIGN OPERATIONS
			// ============================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['campaign'],
					},
				},
				options: [
					{
						name: 'Create Simple',
						value: 'createSimple',
						description: 'Criar campanha simples',
						action: 'Create simple campaign',
					},
					{
						name: 'Create Advanced',
						value: 'createAdvanced',
						description: 'Criar campanha avançada com personalização',
						action: 'Create advanced campaign',
					},
					{
						name: 'Control Campaign',
						value: 'control',
						description: 'Controlar campanha (pausar, continuar, parar)',
						action: 'Control campaign',
					},
					{
						name: 'List Campaigns',
						value: 'listCampaigns',
						description: 'Listar todas as campanhas',
						action: 'List campaigns',
					},
					{
						name: 'List Messages',
						value: 'listMessages',
						description: 'Listar mensagens de uma campanha',
						action: 'List campaign messages',
					},
					{
						name: 'Clear Sent',
						value: 'clearSent',
						description: 'Limpar mensagens enviadas antigas',
						action: 'Clear sent messages',
					},
				],
				default: 'createSimple',
			},

			// Campaign Simple fields
			{
				displayName: 'Numbers',
				name: 'numbers',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['createSimple'],
					},
				},
				default: '',
				placeholder: '5511999999999, 5511888888888, 5511777777777',
				description: 'Números separados por vírgula (com código do país)',
			},
			{
				displayName: 'Message Type',
				name: 'campaignMessageType',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['createSimple'],
					},
				},
				options: [
					{
						name: 'Text',
						value: 'text',
					},
					{
						name: 'Image',
						value: 'image',
					},
					{
						name: 'Video',
						value: 'video',
					},
					{
						name: 'Document',
						value: 'document',
					},
				],
				default: 'text',
			},
			{
				displayName: 'Message Text',
				name: 'campaignText',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				required: true,
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['createSimple'],
					},
				},
				default: '',
				description: 'Texto da mensagem (use {{variável}} para personalização)',
			},
			{
				displayName: 'Delay Min (seconds)',
				name: 'delayMin',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['createSimple', 'createAdvanced'],
					},
				},
				default: 10,
				description: 'Delay mínimo entre envios (anti-ban)',
			},
			{
				displayName: 'Delay Max (seconds)',
				name: 'delayMax',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['createSimple', 'createAdvanced'],
					},
				},
				default: 30,
				description: 'Delay máximo entre envios (anti-ban)',
			},

			// Campaign Control fields
			{
				displayName: 'Folder ID',
				name: 'folderId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['control', 'listMessages'],
					},
				},
				default: '',
				description: 'ID da pasta/campanha',
			},
			{
				displayName: 'Action',
				name: 'campaignAction',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['control'],
					},
				},
				options: [
					{
						name: 'Stop',
						value: 'stop',
					},
					{
						name: 'Continue',
						value: 'continue',
					},
					{
						name: 'Delete',
						value: 'delete',
					},
				],
				default: 'stop',
			},

			// ============================================
			// GROUP OPERATIONS
			// ============================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['group'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Criar novo grupo',
						action: 'Create group',
					},
					{
						name: 'Get Info',
						value: 'getInfo',
						description: 'Obter informações do grupo',
						action: 'Get group info',
					},
					{
						name: 'List All',
						value: 'listAll',
						description: 'Listar todos os grupos',
						action: 'List all groups',
					},
					{
						name: 'Update Participants',
						value: 'updateParticipants',
						description: 'Adicionar/remover/promover participantes',
						action: 'Update participants',
					},
					{
						name: 'Update Name',
						value: 'updateName',
						description: 'Alterar nome do grupo',
						action: 'Update group name',
					},
					{
						name: 'Update Description',
						value: 'updateDescription',
						description: 'Alterar descrição do grupo',
						action: 'Update group description',
					},
					{
						name: 'Leave Group',
						value: 'leave',
						description: 'Sair do grupo',
						action: 'Leave group',
					},
					{
						name: 'Get Invite Link',
						value: 'getInviteLink',
						description: 'Obter link de convite',
						action: 'Get invite link',
					},
				],
				default: 'create',
			},

			// Group JID field
			{
				displayName: 'Group JID',
				name: 'groupJid',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['group'],
						operation: ['getInfo', 'updateParticipants', 'updateName', 'updateDescription', 'leave', 'getInviteLink'],
					},
				},
				default: '',
				placeholder: '120363308883996631@g.us',
				description: 'ID do grupo (JID)',
			},

			// Create Group fields
			{
				displayName: 'Group Name',
				name: 'groupName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['group'],
						operation: ['create', 'updateName'],
					},
				},
				default: '',
				description: 'Nome do grupo',
			},
			{
				displayName: 'Participants',
				name: 'participants',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['group'],
						operation: ['create', 'updateParticipants'],
					},
				},
				default: '',
				placeholder: '5511999999999, 5511888888888',
				description: 'Números dos participantes separados por vírgula',
			},
			{
				displayName: 'Participant Action',
				name: 'participantAction',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['group'],
						operation: ['updateParticipants'],
					},
				},
				options: [
					{
						name: 'Add',
						value: 'add',
					},
					{
						name: 'Remove',
						value: 'remove',
					},
					{
						name: 'Promote (Admin)',
						value: 'promote',
					},
					{
						name: 'Demote',
						value: 'demote',
					},
				],
				default: 'add',
			},

			// ============================================
			// CHAT OPERATIONS
			// ============================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['chat'],
					},
				},
				options: [
					{
						name: 'Archive',
						value: 'archive',
						description: 'Arquivar/desarquivar chat',
						action: 'Archive chat',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Deletar chat',
						action: 'Delete chat',
					},
					{
						name: 'Mark as Read',
						value: 'markRead',
						description: 'Marcar como lido',
						action: 'Mark chat as read',
					},
					{
						name: 'Pin',
						value: 'pin',
						description: 'Fixar/desafixar chat',
						action: 'Pin chat',
					},
					{
						name: 'Mute',
						value: 'mute',
						description: 'Silenciar chat',
						action: 'Mute chat',
					},
					{
						name: 'Find',
						value: 'find',
						description: 'Buscar chats',
						action: 'Find chats',
					},
					{
						name: 'Check Number',
						value: 'checkNumber',
						description: 'Verificar se número está no WhatsApp',
						action: 'Check number',
					},
				],
				default: 'markRead',
			},

			// Chat Number field
			{
				displayName: 'Chat Number',
				name: 'chatNumber',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['archive', 'delete', 'markRead', 'pin', 'mute', 'checkNumber'],
					},
				},
				default: '',
				placeholder: '5511999999999',
				description: 'Número do chat',
			},

			// Archive field
			{
				displayName: 'Archive',
				name: 'archive',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['archive'],
					},
				},
				default: true,
				description: 'Whether to archive (true) or unarchive (false)',
			},

			// Pin field
			{
				displayName: 'Pin',
				name: 'pin',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['pin'],
					},
				},
				default: true,
				description: 'Whether to pin (true) or unpin (false)',
			},

			// Mute time field
			{
				displayName: 'Mute Duration',
				name: 'muteDuration',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['mute'],
					},
				},
				options: [
					{
						name: 'Unmute',
						value: 0,
					},
					{
						name: '8 hours',
						value: 8,
					},
					{
						name: '1 week',
						value: 168,
					},
					{
						name: 'Forever',
						value: -1,
					},
				],
				default: 8,
			},

			// ============================================
			// CONTACT OPERATIONS
			// ============================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['contact'],
					},
				},
				options: [
					{
						name: 'List All',
						value: 'listAll',
						description: 'Listar todos os contatos',
						action: 'List all contacts',
					},
					{
						name: 'Add',
						value: 'add',
						description: 'Adicionar contato à agenda',
						action: 'Add contact',
					},
					{
						name: 'Remove',
						value: 'remove',
						description: 'Remover contato da agenda',
						action: 'Remove contact',
					},
					{
						name: 'Get Details',
						value: 'getDetails',
						description: 'Obter detalhes do contato',
						action: 'Get contact details',
					},
				],
				default: 'listAll',
			},

			// Contact fields
			{
				displayName: 'Contact Phone',
				name: 'contactPhone',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['add', 'remove', 'getDetails'],
					},
				},
				default: '',
				placeholder: '5511999999999',
				description: 'Número do contato',
			},
			{
				displayName: 'Contact Name',
				name: 'contactName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['add'],
					},
				},
				default: '',
				description: 'Nome do contato',
			},

			// ============================================
			// LABEL OPERATIONS
			// ============================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['label'],
					},
				},
				options: [
					{
						name: 'List All',
						value: 'listAll',
						description: 'Listar todas as etiquetas',
						action: 'List all labels',
					},
					{
						name: 'Manage Chat Labels',
						value: 'manageChat',
						description: 'Adicionar/remover etiquetas de um chat',
						action: 'Manage chat labels',
					},
					{
						name: 'Edit Label',
						value: 'edit',
						description: 'Editar etiqueta',
						action: 'Edit label',
					},
				],
				default: 'listAll',
			},

			// ============================================
			// CHATBOT OPERATIONS
			// ============================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['chatbot'],
					},
				},
				options: [
					{
						name: 'Update Settings',
						value: 'updateSettings',
						description: 'Atualizar configurações do chatbot',
						action: 'Update chatbot settings',
					},
					{
						name: 'Create Agent',
						value: 'createAgent',
						description: 'Criar agente de IA',
						action: 'Create AI agent',
					},
					{
						name: 'List Agents',
						value: 'listAgents',
						description: 'Listar agentes de IA',
						action: 'List AI agents',
					},
					{
						name: 'Create Knowledge',
						value: 'createKnowledge',
						description: 'Adicionar base de conhecimento',
						action: 'Create knowledge base',
					},
					{
						name: 'List Knowledge',
						value: 'listKnowledge',
						description: 'Listar bases de conhecimento',
						action: 'List knowledge bases',
					},
				],
				default: 'updateSettings',
			},

			// Chatbot Settings fields
			{
				displayName: 'OpenAI API Key',
				name: 'openaiApiKey',
				type: 'string',
				typeOptions: {
					password: true,
				},
				displayOptions: {
					show: {
						resource: ['chatbot'],
						operation: ['updateSettings'],
					},
				},
				default: '',
				description: 'Chave da API OpenAI',
			},
			{
				displayName: 'Chatbot Enabled',
				name: 'chatbotEnabled',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['chatbot'],
						operation: ['updateSettings'],
					},
				},
				default: true,
				description: 'Whether to enable chatbot',
			},

			// Create Agent fields
			{
				displayName: 'Agent Name',
				name: 'agentName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['chatbot'],
						operation: ['createAgent'],
					},
				},
				default: '',
				description: 'Nome do agente',
			},
			{
				displayName: 'AI Provider',
				name: 'aiProvider',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['chatbot'],
						operation: ['createAgent'],
					},
				},
				options: [
					{
						name: 'OpenAI (GPT)',
						value: 'openai',
					},
					{
						name: 'Anthropic (Claude)',
						value: 'anthropic',
					},
					{
						name: 'Google (Gemini)',
						value: 'gemini',
					},
					{
						name: 'DeepSeek',
						value: 'deepseek',
					},
				],
				default: 'openai',
			},
			{
				displayName: 'Model',
				name: 'aiModel',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['chatbot'],
						operation: ['createAgent'],
					},
				},
				default: 'gpt-4o-mini',
				placeholder: 'gpt-4o-mini, claude-3-5-sonnet, gemini-pro',
				description: 'Nome do modelo de IA',
			},
			{
				displayName: 'System Prompt',
				name: 'systemPrompt',
				type: 'string',
				typeOptions: {
					rows: 5,
				},
				displayOptions: {
					show: {
						resource: ['chatbot'],
						operation: ['createAgent'],
					},
				},
				default: '',
				description: 'Instruções do sistema para o agente',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		// Get credentials
		const credentials = await this.getCredentials('uazApiApi');
		const baseUrl = credentials.baseUrl as string;

		for (let i = 0; i < items.length; i++) {
			try {
				// ============================================
				// INSTANCE OPERATIONS
				// ============================================
				if (resource === 'instance') {
					if (operation === 'create') {
						const instanceName = this.getNodeParameter('instanceName', i) as string;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'POST',
					baseURL: baseUrl,
								url: '/instance/init',
								body: {
									name: instanceName,
								},
							},
						);

						returnData.push({ json: response as IDataObject });
					}

					if (operation === 'connect') {
						const phone = this.getNodeParameter('phone', i, '') as string;

						const body: IDataObject = {};
						if (phone) {
							body.phone = phone;
						}

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'POST',
					baseURL: baseUrl,
								url: '/instance/connect',
								body,
							},
						);

						returnData.push({ json: response as IDataObject });
					}

					if (operation === 'getStatus') {
						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'GET',
					baseURL: baseUrl,
								url: '/instance/status',
							},
						);

						returnData.push({ json: response as IDataObject });
					}

					if (operation === 'disconnect') {
						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'POST',
					baseURL: baseUrl,
								url: '/instance/disconnect',
							},
						);

						returnData.push({ json: response as IDataObject });
					}

					if (operation === 'delete') {
						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'DELETE',
					baseURL: baseUrl,
								url: '/instance',
							},
						);

						returnData.push({ json: response as IDataObject });
					}

					if (operation === 'listAll') {
						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'GET',
					baseURL: baseUrl,
								url: '/instance/all',
							},
						);

						returnData.push({ json: response as IDataObject });
					}

					if (operation === 'updateName') {
						const newName = this.getNodeParameter('newName', i) as string;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'POST',
					baseURL: baseUrl,
								url: '/instance/updateInstanceName',
								body: {
									name: newName,
								},
							},
						);

						returnData.push({ json: response as IDataObject });
					}
				}

				// ============================================
				// MESSAGE OPERATIONS
				// ============================================
				if (resource === 'message') {
					if (operation === 'sendText') {
						const number = this.getNodeParameter('number', i) as string;
						const text = this.getNodeParameter('text', i) as string;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'POST',
					baseURL: baseUrl,
								url: '/send/text',
								body: {
									number,
									text,
								},
							},
						);

						returnData.push({ json: response as IDataObject });
					}

					if (operation === 'sendMedia') {
						const number = this.getNodeParameter('number', i) as string;
						const mediaType = this.getNodeParameter('mediaType', i) as string;
						const file = this.getNodeParameter('file', i) as string;
						const caption = this.getNodeParameter('caption', i, '') as string;

						const body: IDataObject = {
							number,
							type: mediaType,
							file,
						};

						if (caption) {
							body.caption = caption;
						}

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'POST',
					baseURL: baseUrl,
								url: '/send/media',
								body,
							},
						);

						returnData.push({ json: response as IDataObject });
					}

					if (operation === 'sendContact') {
						const number = this.getNodeParameter('number', i) as string;
						const fullName = this.getNodeParameter('fullName', i) as string;
						const phoneNumber = this.getNodeParameter('phoneNumber', i) as string;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'POST',
					baseURL: baseUrl,
								url: '/send/contact',
								body: {
									number,
									fullName,
									phoneNumber,
								},
							},
						);

						returnData.push({ json: response as IDataObject });
					}

					if (operation === 'sendLocation') {
						const number = this.getNodeParameter('number', i) as string;
						const locationName = this.getNodeParameter('locationName', i) as string;
						const address = this.getNodeParameter('address', i) as string;
						const latitude = this.getNodeParameter('latitude', i) as number;
						const longitude = this.getNodeParameter('longitude', i) as number;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'POST',
					baseURL: baseUrl,
								url: '/send/location',
								body: {
									number,
									name: locationName,
									address,
									latitude,
									longitude,
								},
							},
						);

						returnData.push({ json: response as IDataObject });
					}

					if (operation === 'reactMessage') {
						const number = this.getNodeParameter('number', i) as string;
						const messageId = this.getNodeParameter('messageId', i) as string;
						const emoji = this.getNodeParameter('emoji', i) as string;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'POST',
					baseURL: baseUrl,
								url: '/message/react',
								body: {
									number,
									id: messageId,
									text: emoji,
								},
							},
						);

						returnData.push({ json: response as IDataObject });
					}

					if (operation === 'deleteMessage') {
						const messageId = this.getNodeParameter('messageId', i) as string;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'POST',
					baseURL: baseUrl,
								url: '/message/delete',
								body: {
									id: messageId,
								},
							},
						);

						returnData.push({ json: response as IDataObject });
					}

					if (operation === 'editMessage') {
						const messageId = this.getNodeParameter('messageId', i) as string;
						const newText = this.getNodeParameter('newText', i) as string;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'POST',
					baseURL: baseUrl,
								url: '/message/edit',
								body: {
									id: messageId,
									text: newText,
								},
							},
						);

						returnData.push({ json: response as IDataObject });
					}

					if (operation === 'downloadMedia') {
						const messageId = this.getNodeParameter('messageId', i) as string;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'POST',
					baseURL: baseUrl,
								url: '/message/download',
								body: {
									id: messageId,
								},
							},
						);

						returnData.push({ json: response as IDataObject });
					}

					if (operation === 'markRead') {
						const messageId = this.getNodeParameter('messageId', i) as string;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'POST',
					baseURL: baseUrl,
								url: '/message/markread',
								body: {
									id: [messageId],
								},
							},
						);

						returnData.push({ json: response as IDataObject });
					}
				}

				// ============================================
				// CAMPAIGN OPERATIONS
				// ============================================
				if (resource === 'campaign') {
					if (operation === 'createSimple') {
						const numbersString = this.getNodeParameter('numbers', i) as string;
						const campaignMessageType = this.getNodeParameter('campaignMessageType', i) as string;
						const campaignText = this.getNodeParameter('campaignText', i) as string;
						const delayMin = this.getNodeParameter('delayMin', i) as number;
						const delayMax = this.getNodeParameter('delayMax', i) as number;

						const numbers = numbersString.split(',').map(n => n.trim() + '@s.whatsapp.net');

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'POST',
					baseURL: baseUrl,
								url: '/sender/simple',
								body: {
									numbers,
									type: campaignMessageType,
									text: campaignText,
									delayMin,
									delayMax,
								},
							},
						);

						returnData.push({ json: response as IDataObject });
					}

					if (operation === 'control') {
						const folderId = this.getNodeParameter('folderId', i) as string;
						const campaignAction = this.getNodeParameter('campaignAction', i) as string;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'POST',
					baseURL: baseUrl,
								url: '/sender/edit',
								body: {
									folder_id: folderId,
									action: campaignAction,
								},
							},
						);

						returnData.push({ json: response as IDataObject });
					}

					if (operation === 'listCampaigns') {
						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'GET',
					baseURL: baseUrl,
								url: '/sender/listfolders',
							},
						);

						returnData.push({ json: response as IDataObject });
					}

					if (operation === 'listMessages') {
						const folderId = this.getNodeParameter('folderId', i) as string;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'POST',
					baseURL: baseUrl,
								url: '/sender/listmessages',
								body: {
									folder_id: folderId,
									page: 1,
									pageSize: 50,
								},
							},
						);

						returnData.push({ json: response as IDataObject });
					}

					if (operation === 'clearSent') {
						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'POST',
					baseURL: baseUrl,
								url: '/sender/cleardone',
								body: {
									hours: 168, // 1 semana
								},
							},
						);

						returnData.push({ json: response as IDataObject });
					}
				}

				// ============================================
				// GROUP OPERATIONS
				// ============================================
				if (resource === 'group') {
					if (operation === 'create') {
						const groupName = this.getNodeParameter('groupName', i) as string;
						const participantsString = this.getNodeParameter('participants', i) as string;

						const participants = participantsString.split(',').map(n => n.trim());

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'POST',
					baseURL: baseUrl,
								url: '/group/create',
								body: {
									name: groupName,
									participants,
								},
							},
						);

						returnData.push({ json: response as IDataObject });
					}

					if (operation === 'getInfo') {
						const groupJid = this.getNodeParameter('groupJid', i) as string;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'POST',
					baseURL: baseUrl,
								url: '/group/info',
								body: {
									groupjid: groupJid,
								},
							},
						);

						returnData.push({ json: response as IDataObject });
					}

					if (operation === 'listAll') {
						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'GET',
					baseURL: baseUrl,
								url: '/group/list',
							},
						);

						returnData.push({ json: response as IDataObject });
					}

					if (operation === 'updateParticipants') {
						const groupJid = this.getNodeParameter('groupJid', i) as string;
						const participantsString = this.getNodeParameter('participants', i) as string;
						const participantAction = this.getNodeParameter('participantAction', i) as string;

						const participants = participantsString.split(',').map(n => n.trim());

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'POST',
					baseURL: baseUrl,
								url: '/group/updateParticipants',
								body: {
									groupjid: groupJid,
									action: participantAction,
									participants,
								},
							},
						);

						returnData.push({ json: response as IDataObject });
					}

					if (operation === 'updateName') {
						const groupJid = this.getNodeParameter('groupJid', i) as string;
						const groupName = this.getNodeParameter('groupName', i) as string;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'POST',
					baseURL: baseUrl,
								url: '/group/updateName',
								body: {
									groupjid: groupJid,
									name: groupName,
								},
							},
						);

						returnData.push({ json: response as IDataObject });
					}

					if (operation === 'updateDescription') {
						const groupJid = this.getNodeParameter('groupJid', i) as string;
						const description = this.getNodeParameter('description', i, '') as string;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'POST',
					baseURL: baseUrl,
								url: '/group/updateDescription',
								body: {
									groupjid: groupJid,
									description,
								},
							},
						);

						returnData.push({ json: response as IDataObject });
					}

					if (operation === 'leave') {
						const groupJid = this.getNodeParameter('groupJid', i) as string;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'POST',
					baseURL: baseUrl,
								url: '/group/leave',
								body: {
									groupjid: groupJid,
								},
							},
						);

						returnData.push({ json: response as IDataObject });
					}

					if (operation === 'getInviteLink') {
						const groupJid = this.getNodeParameter('groupJid', i) as string;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'GET',
					baseURL: baseUrl,
								url: `/group/invitelink/${groupJid}`,
							},
						);

						returnData.push({ json: response as IDataObject });
					}
				}

				// ============================================
				// CHAT OPERATIONS
				// ============================================
				if (resource === 'chat') {
					if (operation === 'archive') {
						const chatNumber = this.getNodeParameter('chatNumber', i) as string;
						const archive = this.getNodeParameter('archive', i) as boolean;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'POST',
					baseURL: baseUrl,
								url: '/chat/archive',
								body: {
									number: chatNumber,
									archive,
								},
							},
						);

						returnData.push({ json: response as IDataObject });
					}

					if (operation === 'delete') {
						const chatNumber = this.getNodeParameter('chatNumber', i) as string;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'POST',
					baseURL: baseUrl,
								url: '/chat/delete',
								body: {
									number: chatNumber,
									deleteChatDB: true,
									deleteMessagesDB: true,
									deleteChatWhatsApp: true,
								},
							},
						);

						returnData.push({ json: response as IDataObject });
					}

					if (operation === 'markRead') {
						const chatNumber = this.getNodeParameter('chatNumber', i) as string;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'POST',
					baseURL: baseUrl,
								url: '/chat/read',
								body: {
									number: `${chatNumber}@s.whatsapp.net`,
									read: true,
								},
							},
						);

						returnData.push({ json: response as IDataObject });
					}

					if (operation === 'pin') {
						const chatNumber = this.getNodeParameter('chatNumber', i) as string;
						const pin = this.getNodeParameter('pin', i) as boolean;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'POST',
					baseURL: baseUrl,
								url: '/chat/pin',
								body: {
									number: chatNumber,
									pin,
								},
							},
						);

						returnData.push({ json: response as IDataObject });
					}

					if (operation === 'mute') {
						const chatNumber = this.getNodeParameter('chatNumber', i) as string;
						const muteDuration = this.getNodeParameter('muteDuration', i) as number;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'POST',
					baseURL: baseUrl,
								url: '/chat/mute',
								body: {
									number: `${chatNumber}@s.whatsapp.net`,
									muteEndTime: muteDuration,
								},
							},
						);

						returnData.push({ json: response as IDataObject });
					}

					if (operation === 'find') {
						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'POST',
					baseURL: baseUrl,
								url: '/chat/find',
								body: {
									operator: 'AND',
									sort: '-wa_lastMsgTimestamp',
									limit: 50,
									offset: 0,
								},
							},
						);

						returnData.push({ json: response as IDataObject });
					}

					if (operation === 'checkNumber') {
						const chatNumber = this.getNodeParameter('chatNumber', i) as string;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'POST',
					baseURL: baseUrl,
								url: '/chat/check',
								body: {
									numbers: [chatNumber],
								},
							},
						);

						returnData.push({ json: response as IDataObject });
					}
				}

				// ============================================
				// CONTACT OPERATIONS
				// ============================================
				if (resource === 'contact') {
					if (operation === 'listAll') {
						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'GET',
					baseURL: baseUrl,
								url: '/contacts',
							},
						);

						returnData.push({ json: response as IDataObject });
					}

					if (operation === 'add') {
						const contactPhone = this.getNodeParameter('contactPhone', i) as string;
						const contactName = this.getNodeParameter('contactName', i) as string;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'POST',
					baseURL: baseUrl,
								url: '/contact/add',
								body: {
									phone: contactPhone,
									name: contactName,
								},
							},
						);

						returnData.push({ json: response as IDataObject });
					}

					if (operation === 'remove') {
						const contactPhone = this.getNodeParameter('contactPhone', i) as string;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'POST',
					baseURL: baseUrl,
								url: '/contact/remove',
								body: {
									phone: contactPhone,
								},
							},
						);

						returnData.push({ json: response as IDataObject });
					}

					if (operation === 'getDetails') {
						const contactPhone = this.getNodeParameter('contactPhone', i) as string;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'POST',
					baseURL: baseUrl,
								url: '/chat/details',
								body: {
									number: contactPhone,
									preview: false,
								},
							},
						);

						returnData.push({ json: response as IDataObject });
					}
				}

				// ============================================
				// LABEL OPERATIONS
				// ============================================
				if (resource === 'label') {
					if (operation === 'listAll') {
						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'GET',
					baseURL: baseUrl,
								url: '/labels',
							},
						);

						returnData.push({ json: response as IDataObject });
					}
				}

				// ============================================
				// CHATBOT OPERATIONS
				// ============================================
				if (resource === 'chatbot') {
					if (operation === 'updateSettings') {
						const openaiApiKey = this.getNodeParameter('openaiApiKey', i, '') as string;
						const chatbotEnabled = this.getNodeParameter('chatbotEnabled', i) as boolean;

						const body: IDataObject = {
							chatbot_enabled: chatbotEnabled,
						};

						if (openaiApiKey) {
							body.openai_apikey = openaiApiKey;
						}

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'POST',
					baseURL: baseUrl,
								url: '/instance/updatechatbotsettings',
								body,
							},
						);

						returnData.push({ json: response as IDataObject });
					}

					if (operation === 'createAgent') {
						const agentName = this.getNodeParameter('agentName', i) as string;
						const aiProvider = this.getNodeParameter('aiProvider', i) as string;
						const aiModel = this.getNodeParameter('aiModel', i) as string;
						const systemPrompt = this.getNodeParameter('systemPrompt', i, '') as string;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'POST',
					baseURL: baseUrl,
								url: '/agent/edit',
								body: {
									id: '',
									delete: false,
									agent: {
										name: agentName,
										provider: aiProvider,
										model: aiModel,
										systemPrompt,
										maxTokens: 2000,
										temperature: 70,
									},
								},
							},
						);

						returnData.push({ json: response as IDataObject });
					}

					if (operation === 'listAgents') {
						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'GET',
					baseURL: baseUrl,
								url: '/agent/list',
							},
						);

						returnData.push({ json: response as IDataObject });
					}

					if (operation === 'listKnowledge') {
						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'uazApiApi',
							{
								method: 'GET',
					baseURL: baseUrl,
								url: '/knowledge/list',
							},
						);

						returnData.push({ json: response as IDataObject });
					}
				}

			} catch (error) {
				if (this.continueOnFail()) {
					const errorMessage = error instanceof Error ? error.message : String(error);
					returnData.push({ json: { error: errorMessage } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}