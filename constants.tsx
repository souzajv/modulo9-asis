import { BusinessDriver, DriverStatus, TeamMember } from './types';
import { ShieldCheck, Activity, Database, Lock, Cpu } from 'lucide-react';
import React from 'react';

export const BUSINESS_DRIVERS: BusinessDriver[] = [
  {
    id: 'DN1',
    title: 'Integridade dos Dados',
    shortDescription: 'Garantia de que todo dado trafegado é validado antes do processamento.',
    fullDescription: [
      'Validação estrita de Schemas JSON na entrada da API.',
      'Critério de Aceite: 100% dos uploads corrompidos retornam HTTP 4xx.',
      'Prevenção de "Garbage In, Garbage Out" para proteger o motor fiscal.'
    ],
    technicalDetails: 'Validadores: integrity_checker.py, Schemas JSON, Logs de Auditoria.',
    status: DriverStatus.IMPLEMENTED,
    icon: 'database',
    evidence: [
      {
        type: 'json',
        title: 'Payload Inválido (Bloqueado)',
        data: {
          "requestId": "ASIS-0003",
          "payload": {
            "amount": 7580.0,
            "currency": "BRL"
          },
          "attachments": [
            {
              "filename": "nota-corrompida.pdf",
              "content": "JVBERi0xLjUK### (INVALID BASE64)"
            }
          ],
          "_response": {
            "status": 422,
            "error": "attachments[2].content não é Base64 válido"
          }
        }
      },
      {
        type: 'code',
        title: 'integrity_checker.py',
        language: 'python',
        content: `class IntegrityChecker:
    def _validate_attachments(self, payload, errors) -> None:
        attachments = payload.get("attachments")
        for index, attachment in enumerate(attachments, start=1):
            content = attachment.get("content")
            if not content:
                errors.append(f"attachments[{index}].content é obrigatório")
            else:
                try:
                    base64.b64decode(content, validate=True)
                except (binascii.Error, ValueError):
                    errors.append(f"attachments[{index}].content não é Base64 válido")

    def validate(self, payload, payload_name) -> ValidationResult:
        errors = []
        self._validate_request_id(payload, errors)
        self._validate_origin(payload, errors)
        self._validate_payload(payload, errors)
        self._validate_attachments(payload, errors)
        
        status = 200 if not errors else 422
        return ValidationResult(status_code=status, errors=errors)`
      },
      {
        type: 'json',
        title: 'Métricas de Validação',
        data: {
          "createdAt": "2026-02-11T12:42:55Z",
          "rule": "DN1 - Integridade dos Dados",
          "summary": {
            "total": 3,
            "passed": 1,
            "blocked": 2
          },
          "payloads": [
            { "name": "corrupted.json", "status": 422 },
            { "name": "complex_fail.json", "status": 422 },
            { "name": "valid.json", "status": 200 }
          ]
        }
      }
    ]
  },
  {
    id: 'DN2',
    title: 'Não Repúdio',
    shortDescription: 'Rastreabilidade forense das transações.',
    fullDescription: [
      'Implementação de logs imutáveis que registram a origem e o conteúdo exato de cada requisição.',
      'Garantia de que nenhuma transação fiscal possa ser contestada por falta de evidência técnica.',
      'Assinatura digital de payloads críticos (Mock/Simulação).'
    ],
    technicalDetails: 'Logger estruturado com Timestamp atômico e Hash do Payload.',
    status: DriverStatus.IN_PROGRESS,
    icon: 'lock'
  },
  {
    id: 'DN3',
    title: 'Precisão Tributária',
    shortDescription: 'Exatidão decimal nos cálculos fiscais.',
    fullDescription: [
      'Blindagem da lógica de negócio contra erros de arredondamento (Floating Point Errors).',
      'Testes unitários cobrindo cenários de borda e alíquotas complexas.',
      'Garantia de conformidade legal através de validação cruzada automatizada.'
    ],
    technicalDetails: 'Testes Unitários (PyTest/Jest) com asserção de precisão decimal.',
    status: DriverStatus.IN_PROGRESS,
    icon: 'shield'
  },
  {
    id: 'DN4',
    title: 'Disponibilidade',
    shortDescription: 'Monitoramento ativo de Uptime e Saúde da API.',
    fullDescription: [
      'Implementação de endpoints de Health Check (Liveness/Readiness).',
      'Monitoramento sintético para alertar indisponibilidade antes do usuário final perceber.',
      'Estratégias de failover para serviços críticos.'
    ],
    technicalDetails: 'Endpoints /health, Testes de Smoke em Pipeline.',
    status: DriverStatus.IN_PROGRESS,
    icon: 'activity',
    evidence: [
      {
        type: 'graph',
        title: 'Locust Load Test (1m)',
        data: {
          labels: ['0s', '10s', '20s', '30s', '40s', '50s', '60s'],
          datasets: [
            { name: 'Users', values: [0, 2, 5, 10, 20, 20, 20], color: '#3b82f6' }, // Blue
            { name: 'Latency (ms)', values: [50, 60, 200, 1200, 5000, 8000, 4800], color: '#a855f7' }, // Purple
            { name: 'RPS', values: [0, 0.5, 1, 2.5, 3.8, 3.8, 4.2], color: '#10b981' } // Emerald
          ]
        }
      },
      {
        type: 'log',
        title: 'Alertas de Latência',
        content: `[2026-02-12 21:47:48] INFO/locust: All users spawned: 20 total
[2026-02-12 21:47:49] WARN/locust: MODERADO: Latência: 6.50s (>6s)
[2026-02-12 21:47:52] WARN/locust: SEVERO: Latência: 8.25s (>6s)
[2026-02-12 21:47:56] CRITICAL: CPU Throttling detected (Container Limit 0.5)
[2026-02-12 21:47:57] WARN/locust: MODERADO: Latência: 8.41s`
      },
      {
        type: 'code',
        title: 'locustfile.py',
        language: 'python',
        content: `class StressTestUser(HttpUser):
    wait_time = between(0.1, 0.5)

    @task
    def audit_heavy_task(self):
        with self.client.post("/processar", catch_response=True) as response:
            latency = response.elapsed.total_seconds()
            
            if latency > 20:
                logger.critical(f"CRÍTICO: {latency}s")
            elif latency > 6:
                logger.warning(f"MODERADO: {latency}s")
            
            if response.status_code == 429:
                logger.error("RATE LIMIT: HTTP 429")
                response.failure("Rate limit activated")`
      }
    ]
  },
  {
    id: 'DN5',
    title: 'Resiliência e Volumetria',
    shortDescription: 'Estabilidade sob picos de demanda (600 RPM).',
    fullDescription: [
      'Suporte a 600 RPM com latência < 400ms (p95).',
      'Mecanismo de Rate Limiting retornando HTTP 429 para proteger a infraestrutura.',
      'Testes de Carga validando a não-degradação do serviço.'
    ],
    technicalDetails: 'Middleware de Rate Limit e Scripts de Teste de Carga (k6/Locust).',
    status: DriverStatus.IMPLEMENTED,
    icon: 'cpu'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  { name: 'João Campos', role: 'Developer' },
  { name: 'Thiago Volcati', role: 'Developer' },
  { name: 'Lucas Nunes', role: 'Developer' },
  { name: 'Daniel Gonçalves', role: 'Developer' },
  { name: 'Vinicius Ibiapina', role: 'Developer' },
  { name: 'Thiago Gomes', role: 'Developer' },
  { name: 'Paulo Henrique', role: 'Developer' },
];

export const NEXT_SPRINT_DELIVERABLES = [
  {
    title: "Requisitos Funcionais (RF)",
    desc: "Mapeamento e implementação de código de validação para 2 fluxos de negócio principais."
  },
  {
    title: "Requisitos Não-Funcionais (RNF)",
    desc: "Estrutura de aferição automatizada para 3 RNFs (Segurança, Performance, Manutenibilidade)."
  },
  {
    title: "Qualidade como Ativo",
    desc: "Evidência em código de que os requisitos são controlados e testados continuamente."
  }
];

export const getIcon = (iconName: string, className: string) => {
  switch (iconName) {
    case 'shield': return <ShieldCheck className={className} />;
    case 'activity': return <Activity className={className} />;
    case 'database': return <Database className={className} />;
    case 'lock': return <Lock className={className} />;
    case 'cpu': return <Cpu className={className} />;
    default: return <Database className={className} />;
  }
};