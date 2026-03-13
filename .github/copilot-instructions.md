# CONTEXTO GERAL E INSTRUÇÕES PARA O GITHUB COPILOT
**Projeto:** ESMD9 - Sistema Digital Resiliente (Quality as Code)
**Grupo:** 2
**Módulo:** 9 (Engenharia de Software - Inteli)

## 1. O PARCEIRO E O PROBLEMA
* **Empresa:** ASIS TaxTech (adquirida pelo Grupo Sankhya, gigante de ERP).
* **Produto Base:** Kolossus (Plataforma SaaS de auditoria fiscal e compliance).
* **O Core Business:** A ASIS processa arquivos fiscais complexos e pesados (como SPED Fiscal/Contábil). Se o sistema falhar ou auditar errado, o cliente pode levar multas milionárias da Receita Federal.
* **O Problema a Resolver:** Em uma arquitetura API First, testar manualmente é inviável. O parceiro não quer apenas "cobertura de testes" (code coverage vazio). Eles precisam de um sistema **resiliente**, capaz de aguentar arquivos corrompidos, picos de acesso (sazonalidade fiscal) e mudanças bruscas na legislação.

## 2. A METODOLOGIA DO PROJETO
* **Quality as Code:** A qualidade não é um documento à parte; ela deve ser garantida por código automatizado rodando em pipelines de CI/CD.
* **War Gaming (Dinâmica Blue vs. Red Team):**
    * *Blue Team (Defesa):* Constrói a API, implementa os testes, garante a observabilidade, cria Feature Flags e protege o sistema.
    * *Red Team (Ataque):* Executa engenharia do caos, injeta falhas de rede, faz testes de estresse (Locust) e tenta quebrar a lógica de negócio do Blue Team.

## 3. ROADMAP DE ENTREGAS (SPRINTS DE 2 SEMANAS)
Sempre que for solicitado a criação de uma apresentação, verifique em qual Sprint estamos e busque no repositório os códigos que evidenciem os seguintes entregáveis:

* **Sprint 1: Business Drivers (Direcionadores de Negócio)**
    * *Foco:* O valor para a empresa.
    * *Entregável:* 5 DNs implementados em código (ex: Integridade de Dados, Volumetria, Disponibilidade, Precisão Tributária, Não Repúdio). O código deve provar que a regra de negócio funciona sob pressão.
* **Sprint 2: Requisitos Funcionais e Não Funcionais**
    * *Foco:* O comportamento do sistema.
    * *Entregável:* 2 RFs e 3 RNFs implementados como código de teste. Foco forte em resiliência (simular quedas, rate limiting, ataques).
* **Sprint 3: Solução Técnica e Integrações**
    * *Foco:* Arquitetura e Contratos.
    * *Entregável:* 5 integrações validadas por código (Contract Testing) com assinaturas de versão. Implementação de Feature Flags e Mock de atualização de regras tributárias.
* **Sprint 4: Dashboard de Qualidade**
    * *Foco:* Visibilidade.
    * *Entregável:* Geração de dados vivos da pipeline. Catálogo de serviços monitorados, estatísticas de testes, alertas e vulnerabilidades encontradas pelo Red Team.
* **Sprint 5: Storytelling e Entrega Final**
    * *Foco:* Organização e Acessibilidade.
    * *Entregável:* Repositório impecável, ajustes finais na API, dashboard consolidado e princípios de acessibilidade (WCAG) aplicados na interface.

## 4. INSTRUÇÕES PARA GERAÇÃO DE APRESENTAÇÕES DE SPRINT REVIEW
Sempre que o usuário pedir para gerar a apresentação da Sprint Review, você deve atuar como um **Engenheiro de Software Sênior e Tech Presenter** e seguir estas regras rigorosamente:

3.  **Duração e Conteúdo:** A apresentação deve durar entre 5 a 10 minutos de fala. Para isso, o conteúdo gerado não deve ser denso em texto.
4.  **Estrutura de Evidências (O "Show me the Code"):**
    * Você deve ler o repositório atual para encontrar os testes da Sprint solicitada.
    * Extraia trechos curtos e relevantes do código-fonte (testes, configurações de CI/CD, rotas da API) e inclua-os na apresentação usando blocos de código formatados (`<pre><code>`).
    * Adicione placeholders (comentários claros no HTML) onde o usuário deve inserir prints, GIFs do terminal ou gráficos do Locust.
5.  **A Narrativa:**
    * Nunca diga apenas "Fizemos X".
    * Use a estrutura: **Problema de Negócio -> O Ataque (Red Team) -> A Defesa em Código (Blue Team) -> O Resultado**.
    * Destaque itens que falharam e foram corrigidos; a vulnerabilidade é o ponto alto do "Quality as Code".
6.  **Itens Incompletos:** Se identificar no código que algo está "mockado" ou incompleto (ex: TODOs), classifique na apresentação como "Em Construção / Blueprint Arquitetural", mantendo um tom profissional sobre os próximos passos.
7.  **Responsividade e Excelência de Qualidade Web:** Toda apresentação deve ser totalmente responsiva para **mobile e desktop**. Além disso, a implementação deve visar **nota máxima no Lighthouse** (Google) nos pilares de **Performance, Acessibilidade, Boas Práticas e SEO**, aplicando otimizações e validações necessárias durante o desenvolvimento.
8.  **Checklist de Validação Obrigatório (Pré-Entrega):** Antes de finalizar, valide e corrija os pontos abaixo para sustentar nota máxima no Lighthouse:
    * **Performance:** otimizar imagens (formatos leves), reduzir bloqueios de renderização, evitar scripts desnecessários e manter animações suaves.
    * **Acessibilidade:** contraste adequado, navegação por teclado, uso correto de headings, `aria-label` quando necessário e textos alternativos em imagens.
    * **Boas Práticas:** evitar erros de console, garantir compatibilidade de recursos web e aplicar práticas seguras de carregamento de assets.
    * **SEO:** definir `title`, `meta description`, hierarquia semântica (`main`, `section`, `article`) e conteúdo legível para indexação.
    * **Responsividade:** testar breakpoints principais (mobile, tablet e desktop), evitar overflow horizontal e garantir legibilidade tipográfica em telas menores.