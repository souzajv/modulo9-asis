import { BusinessDriver, DriverStatus, TeamMember } from './types';
import { ShieldCheck, Activity, Database, Lock, Cpu } from 'lucide-react';
import React from 'react';

export const BUSINESS_DRIVERS: BusinessDriver[] = [
  {
    id: 'DN1',
    title: 'Integridade dos Dados',
    shortDescription: 'Garantia de que todo dado trafegado é validado antes do processamento.',
    testScenario: 'Deve rejeitar automaticamente payloads contendo anexos com Base64 corrompido ou JSON malformado (HTTP 422).',
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
    testScenario: 'Cada transação deve gerar um Hash SHA-256 único do payload original, persistido antes de qualquer processamento.',
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
    testScenario: 'Cálculos de alíquotas complexas (ex: 13.3333%) devem manter precisão de 10 casas decimais sem erros de ponto flutuante.',
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
    testScenario: 'O endpoint /health deve retornar HTTP 200 em menos de 200ms, mesmo com carga simulada de 20 usuários simultâneos.',
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
    shortDescription: 'Estabilidade sob picos de demanda.',
    testScenario: 'O sistema deve aplicar Throttling (HTTP 429) imediatamente ao ultrapassar o limite de 600 requisições por minuto.',
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

export const SPRINT_2_DRIVERS: BusinessDriver[] = [
  {
    id: 'DN1',
    title: 'Não Repúdio e Integridade',
    shortDescription: 'Upload seguro e validação estrutural de payloads.',
    testScenario: 'Upload deve registrar process_id/hash; Validação deve bloquear violações estruturais (4xx).',
    fullDescription: [
      'RF: Upload de não-repúdio registra process_id, hash do arquivo e credenciais no log.',
      'RNF: Validação estrutural contra regra de integridade (IDs, timestamps, anexos base64).',
      'Bloqueio automático de violações antes do processamento.'
    ],
    technicalDetails: 'test_nao_repudio.py, integrity_checker.py',
    status: DriverStatus.IMPLEMENTED,
    icon: 'shield',
    evidence: [
      {
        type: 'code',
        title: 'Validação de Integridade',
        language: 'python',
        content: `def validate_integrity(payload):
    # RNF: Validação estrutural dos payloads
    if not payload.get('process_id'):
        raise ValidationError("Missing process_id")
    
    # Validação de anexos Base64
    for attachment in payload.get('attachments', []):
        if not is_valid_base64(attachment['content']):
            return HTTP_422("Invalid Base64")
            
    return HTTP_200`
      },
      {
        type: 'log',
        title: 'Log de Não-Repúdio',
        content: `[INFO] Upload recebido: /nao_repudio/upload
[AUDIT] ProcessID: PROC-9982
[AUDIT] FileHash: sha256:a1b2c3d4...
[AUDIT] Credentials: Verified (User: admin)`
      }
    ]
  },
  {
    id: 'DN2',
    title: 'Rastreabilidade e Auditoria',
    shortDescription: 'Logs estruturados e Request IDs únicos para rastreio.',
    testScenario: 'Toda requisição gera request_id único e logs JSON auditáveis.',
    fullDescription: [
      'RF: Geração de request_id único e log de método/URL/headers antes do envio.',
      'RNF: Logs de auditoria em JSON contendo request/response, timestamps e status.',
      'Garantia de rastreabilidade e não repúdio.'
    ],
    technicalDetails: 'api_client.py, logger.py, test_non_repudiation.py',
    status: DriverStatus.IMPLEMENTED,
    icon: 'lock',
    evidence: [
      {
        type: 'json',
        title: 'Log Estruturado (JSON)',
        data: {
          "timestamp": "2026-02-27T10:00:00Z",
          "level": "INFO",
          "request_id": "req-12345-xyz",
          "method": "POST",
          "url": "/api/v1/transaction",
          "headers": { "User-Agent": "TestClient/1.0" },
          "status_code": 201
        }
      }
    ]
  },
  {
    id: 'DN3',
    title: 'Precisão e Governança Fiscal',
    shortDescription: 'Motor de cálculo v2 e validação de versão de regras.',
    testScenario: 'Cálculo exato de tributos (v2) e rejeição de versões expiradas (422).',
    fullDescription: [
      'RF: Motor de cálculo replica regras vigentes (v2) com precisão ao centavo.',
      'RNF: Requisições com versão de regra expirada são rejeitadas com 422.',
      'Governança estrita de versões fiscais.'
    ],
    technicalDetails: 'tax_precision_checker.py, tax_rules_v2.json',
    status: DriverStatus.IMPLEMENTED,
    icon: 'database',
    evidence: [
      {
        type: 'code',
        title: 'Verificação de Precisão',
        language: 'python',
        content: `def check_tax_precision(amount, rules):
    # RF: Confere valores ao centavo
    expected_icms = round(amount * rules['icms_rate'], 2)
    calculated = tax_engine.calculate(amount)
    
    assert calculated['icms'] == expected_icms
    
    # RNF: Versão expirada
    if rules['version'] < CURRENT_VERSION:
        return HTTP_422("Regra expirada")`
      }
    ]
  },
  {
    id: 'DN4',
    title: 'Performance e Monitoramento',
    shortDescription: 'Teste de carga e sistema de alertas de latência.',
    testScenario: 'Carga de 20 usuários/1min; Alertas de latência (>6s/>10s/>20s).',
    fullDescription: [
      'RF: Teste de carga (Locust) com 20 usuários simulando uso real.',
      'RNF: Sistema de alertas classifica latência (Moderado/Severo/Crítico).',
      'Visibilidade imediata de degradação de performance.'
    ],
    technicalDetails: 'dn4.md, Locust logs',
    status: DriverStatus.IMPLEMENTED,
    icon: 'activity',
    evidence: [
      {
        type: 'log',
        title: 'Alertas de Latência',
        content: `[WARN] MODERADO: Latência 6.5s (>6s)
[ERROR] SEVERO: Latência 10.2s (>10s)
[CRITICAL] CRÍTICO: Latência 22.1s (>20s)
[INFO] RPS: 4.2 | Active Users: 20`
      }
    ]
  },
  {
    id: 'DN5',
    title: 'Resiliência e SLA',
    shortDescription: 'Validação de carga, SLA e Rate Limiting.',
    testScenario: 'Manter p95 <300ms, bloquear excesso (429) e garantir 99.5% sucesso.',
    fullDescription: [
      'RF: Validator roda cenários de carga nominal, burst e violação.',
      'RNF: API mantém p95 <300ms, emite alerta crítico >390ms.',
      'Bloqueio de excesso com 429 (zero 500) e Rate Limit por account-key.'
    ],
    technicalDetails: 'dn5.md, stress_checker.py, locustfile.py',
    status: DriverStatus.IMPLEMENTED,
    icon: 'cpu',
    evidence: [
      {
        type: 'graph',
        title: 'SLA Compliance',
        data: {
          labels: ['Nominal', 'Burst', 'SLA Violation'],
          datasets: [
            { name: 'p95 Latency (ms)', values: [150, 280, 410], color: '#a855f7' },
            { name: 'Success Rate (%)', values: [100, 99.9, 98.5], color: '#10b981' }
          ]
        }
      }
    ]
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

export const SPRINT_3_DELIVERABLES = [
  {
    title: "ESPECIFICAÇÃO DA SOLUÇÃO TÉCNICA COMO CÓDIGO",
    desc: "Documento de Integração como ativo: mapa de 5 integrações com versionamento sincronizado (3.0 pts), implementação e ajustes das integrações (2.0 pts) e instrumentação em código para aferição/observabilidade das integrações (5.0 pts)."
  },
  {
    title: "Observabilidade Total",
    desc: "Dashboards Grafana/Kibana para monitoramento em tempo real dos 5 DNs."
  },
  {
    title: "Testes de Caos",
    desc: "Validação de resiliência com injeção de falhas (Chaos Engineering)."
  }
];

export const SPRINT_4_DELIVERABLES = [
  {
    title: "Dashboard de Qualidade Vivo",
    desc: "Catálogo de serviços monitorados, histórico de testes e alertas automatizados para toda a malha de integrações."
  },
  {
    title: "Red Team x Blue Team",
    desc: "Consolidação dos ataques de caos, vulnerabilidades encontradas e evidências de correção em código."
  },
  {
    title: "Governança de Releases",
    desc: "Indicadores de change lead time, sucesso de deploy, rollback e auditoria fim a fim por release_id."
  }
];

export const SPRINT_3_DRIVERS: BusinessDriver[] = [
  {
    id: 'INT-01',
    title: 'Upload API -> Message Broker',
    shortDescription: 'A API recebe arquivo e responde 202, desacoplando processamento via fila asis.upload.process.',
    testScenario: 'Bridge: abrir integration_checker.py e mostrar a checagem INT-01 validando publicação da BrokerMessage com schema v1.0.0.',
    fullDescription: [
      'Problema: processamento síncrono degrada sob pico fiscal.',
      'Ataque: uploads simultâneos para estourar tempo de resposta.',
      'Defesa: enfileiramento no broker com confirmação imediata e contrato versionado.',
      'Resultado: integração validada com checks automatizados e trilha em metrics JSON.'
    ],
    technicalDetails: 'g02/src/testes/integracoes/validators/integration_checker.py + contracts/integration_contracts.json',
    status: DriverStatus.IMPLEMENTED,
    icon: 'database',
    evidence: [
      {
        type: 'code',
        title: 'INT-01 Aferição em Código',
        language: 'python',
        content: `def checar_int01_upload_para_broker(self) -> IntegrationResult:\n    created = service.create_upload(...)\n\n    msg = BrokerMessage(process_id=created.process_id)\n    broker.publish(QUEUE_PROCESS, msg)\n\n    queue_size = broker.queue_size(QUEUE_PROCESS)\n    if queue_size != 1:\n        result.errors.append(...)\n\n    consumed = broker.consume(QUEUE_PROCESS)\n    if not isinstance(consumed.process_id, int):\n        result.errors.append(...)\n\n    total = broker.total_published(QUEUE_PROCESS)\n    if total != 1:\n        result.errors.append(...)`
      },
      {
        type: 'json',
        title: 'Contrato Versionado da Integração',
        data: {
          "id": "INT-01",
          "contract_version": "1.0.0",
          "contract_hash": "sha256:a1b2c3d4e5f6",
          "producer": "POST /api/v1/upload",
          "consumer": "asis.upload.process",
          "http_status_on_accept": 202
        }
      }
    ]
  },
  {
    id: 'INT-02',
    title: 'Worker de Resiliência -> Repositório',
    shortDescription: 'Worker consome fila e persiste status do processo (100 -> 201) com data_hora_fim para auditoria.',
    testScenario: 'Bridge: abrir resilience_worker.py e mostrar outcome ok + persistência status=201 no repositório.',
    fullDescription: [
      'Problema: sem confirmação persistida, cliente não sabe se o job terminou.',
      'Ataque: simular mensagens concorrentes e falhas intermitentes de processamento.',
      'Defesa: worker resiliente com atualização explícita de status no ProcessRepository.',
      'Resultado: polling confiável e rastreabilidade de conclusão por processo.'
    ],
    technicalDetails: 'g02/src/testes/integracoes/workers/resilience_worker.py',
    status: DriverStatus.IMPLEMENTED,
    icon: 'activity',
    evidence: [
      {
        type: 'code',
        title: 'Processamento e Status 201',
        language: 'python',
        content: `def process_message(self, msg: BrokerMessage) -> str:\n    try:\n        self._service.process_job(msg.process_id)\n        self._outcomes.append({"process_id": msg.process_id, "result": "ok"})\n        return "ok"\n    except Exception as exc:\n        ...\n\n# Checker\nif process.status != 201:\n    result.errors.append(f"Status esperado 201, encontrado {process.status}")`
      },
      {
        type: 'json',
        title: 'Métrica da Execução',
        data: {
          "id": "INT-02",
          "passed": true,
          "checks": [
            "Worker consumiu mensagem",
            "status=201 no repositório",
            "data_hora_fim preenchida"
          ]
        }
      }
    ]
  },
  {
    id: 'INT-03',
    title: 'CI GitLab -> Manifesto -> Jenkins Handoff',
    shortDescription: 'Pipeline executa testes de contrato, gera release-manifest e aciona Jenkins com release_id assinada.',
    testScenario: 'Bridge: abrir .gitlab-ci.yml no stage handoff e mostrar generate_release_manifest + POST para Jenkins.',
    fullDescription: [
      'Problema: deploy sem versionamento quebra sincronismo entre times e ambientes.',
      'Ataque: simular mudança em main sem trilha de release e sem validação de contrato.',
      'Defesa: pipeline com gates, contrato automatizado e handoff autenticado para CD.',
      'Resultado: release_id rastreável (rel-YYYYMMDD-sha) e governança de promoção/rollback.'
    ],
    technicalDetails: 'g02/.gitlab-ci.yml + g02/scripts/generate_release_manifest.py + g02/jenkins/pipelines',
    status: DriverStatus.IMPLEMENTED,
    icon: 'cpu',
    evidence: [
      {
        type: 'code',
        title: 'Gate + Handoff',
        language: 'yaml',
        content: `test:\n  script:\n    - python -m pytest src/release_orchestrator/tests -q\n    - python -m pytest src/testes/contract_testing -q\n\nhandoff:\n  rules:\n    - if: '$CI_COMMIT_BRANCH == "main" && $CI_PIPELINE_SOURCE == "push"'\n  script:\n    - python scripts/generate_release_manifest.py --image "$IMAGE_TAG" --commit-sha "$CI_COMMIT_SHA" --output release-manifest.json\n    - python - <<'PY'\n      manifest = json.loads(Path("release-manifest.json").read_text())\n      print(manifest["release_id"])\n      PY`
      },
      {
        type: 'json',
        title: 'Assinatura de Versão da Release',
        data: {
          "release_id": "rel-YYYYMMDD-<shortsha>",
          "source": "main push",
          "includes": ["commit_sha", "image", "feature defaults", "repo_url"]
        }
      }
    ]
  },
  {
    id: 'INT-04',
    title: 'Orquestrador -> Deploy/Promote/Rollback + Feature Flags',
    shortDescription: 'Release Orchestrator centraliza deploy por ambiente, auditoria e toggle de feature por release.',
    testScenario: 'Bridge: abrir release_orchestrator/main.py (deployments + patch de feature) e cicd_orchestrator.md.',
    fullDescription: [
      'Problema: mudança de negócio sem controle fino de ativação aumenta risco em produção.',
      'Ataque: forçar rollback rápido após bug em release recente.',
      'Defesa: endpoints de deploy/promote/rollback e patch de feature flag por ambiente.',
      'Resultado: decisões rápidas de negócio com trilha de auditoria e reversão controlada.'
    ],
    technicalDetails: 'g02/src/release_orchestrator/main.py + g02/src/tributron/feature_flags.py',
    status: DriverStatus.IMPLEMENTED,
    icon: 'lock',
    evidence: [
      {
        type: 'code',
        title: 'Endpoints de Orquestração',
        language: 'python',
        content: `@app.post("/deployments")\ndef deploy_release(payload: DeployRequest, actor: str = Depends(_require_auth)) -> dict[str, Any]:\n    ...\n\n@app.post("/deployments/promote")\ndef promote_to_production(payload: PromoteRequest, actor: str = Depends(_require_auth)) -> dict[str, Any]:\n    ...\n\n@app.post("/deployments/rollback")\ndef rollback_env(payload: RollbackRequest, actor: str = Depends(_require_auth)) -> dict[str, Any]:\n    ...\n\n@app.patch("/releases/{release_id}/features/{feature_key}")\ndef patch_release_feature(...):\n    ...`
      },
      {
        type: 'code',
        title: 'Catálogo de Flags',
        language: 'python',
        content: `register_feature(key="core_uploads", default_enabled=True, description="...")\nregister_feature(key="core_process_read", default_enabled=True, description="...")\nregister_feature(key="core_results", default_enabled=True, description="...")\nregister_feature(key="diagnostics_release_info", default_enabled=True, description="...")`
      }
    ]
  },
  {
    id: 'INT-05',
    title: 'Observabilidade e Escalabilidade (Blueprint Arquitetural)',
    shortDescription: 'Integração de monitoramento e elasticidade (ALB/K8s/Datadog) mapeada para hardening da Sprint 4.',
    testScenario: 'Bridge: mostrar docs/cicd_orchestrator.md e projeto.md; classificar como Em Construção para monitoramento externo e autoscaling produtivo.',
    fullDescription: [
      'Problema: picos fiscais exigem visão em tempo real e resposta automática da infraestrutura.',
      'Ataque: sobrecarga com múltiplos usuários e falhas de rede entre nós.',
      'Defesa: health checks ativos, balanceamento e plano de autoscaling/telemetria externa.',
      'Resultado: trilha técnica pronta para conectar monitoramento externo e escalar com segurança.'
    ],
    technicalDetails: 'g02/docker-compose.yml (healthcheck) + g02/docs/cicd_orchestrator.md + g02/documentos/projeto.md',
    status: DriverStatus.IN_PROGRESS,
    icon: 'shield',
    evidence: [
      {
        type: 'code',
        title: 'Health Check da API',
        language: 'yaml',
        content: `api:\n  healthcheck:\n    test:\n      [\n        "CMD-SHELL",\n        "python -c \\\"import urllib.request; urllib.request.urlopen('http://127.0.0.1:8000/health', timeout=2)\\\"",\n      ]\n    interval: 5s\n    timeout: 3s\n    retries: 20`
      },
      {
        type: 'json',
        title: 'Classificação de Entregável',
        data: {
          "status": "Em Construcao / Blueprint Arquitetural",
          "next_step": "Conectar telemetria externa e autoscaling produtivo",
          "sprint_target": "Sprint 4"
        }
      }
    ]
  }
];

export const SPRINT_2_METRICS = {
  goal: "Implementação de RF e RNF como Código",
  progress: 100,
  driversDelivered: 5,
  totalDrivers: 5,
  qualityGate: {
    ci: "ATIVO",
    lint: "RÍGIDO",
    coverage: "85%"
  }
};

export const SPRINT_3_METRICS = {
  goal: "Solução Técnica e Integrações como Ativo de Software",
  progress: 90,
  driversDelivered: 4,
  totalDrivers: 5,
  qualityGate: {
    ci: "ATIVO",
    contracts: "VERSIONADO",
    handoff: "JENKINS READY"
  }
};

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