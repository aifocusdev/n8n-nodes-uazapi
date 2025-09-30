import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class UazApiApi implements ICredentialType {
	name = 'uazApiApi';
	displayName = 'UazAPI';
	documentationUrl = 'https://docs.uazapi.com';
	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://focus.uazapi.com',
			description: 'URL base da UazAPI. Normalmente: https://focus.uazapi.com',
			required: true,
		},
		{
			displayName: 'Admin Token',
			name: 'adminToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'Token de administrador da UazAPI (necessário para criar/listar instâncias)',
			required: false,
		},
		{
			displayName: 'Instance Token',
			name: 'instanceToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'Token da instância específica (obtido ao criar a instância)',
			required: false,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			qs: {
				admintoken: '={{$credentials.adminToken || ""}}',
				token: '={{$credentials.instanceToken || ""}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/instance/status',
			method: 'GET',
		},
	};
}