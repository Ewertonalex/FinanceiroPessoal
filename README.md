# 💰 Controle Financeiro Pessoal

Um sistema completo de controle financeiro pessoal desenvolvido em HTML5, CSS3 e JavaScript puro, com interface moderna e intuitiva para gerenciar suas finanças mensais.

## ✨ **Funcionalidades Principais**

### 📊 **Controle Mensal**
- **Receitas e Despesas**: Adicione, edite e exclua transações
- **Saldo Automático**: Cálculo automático do saldo mensal
- **Navegação por Meses**: Visualize dados de qualquer mês
- **Histórico Completo**: Acompanhe sua evolução financeira

### 💳 **Gestão de Cartões de Crédito**
- **Cadastro de Cartões**: Organize seus cartões por nome
- **Dívidas Parceladas**: Controle dívidas com parcelamento automático
- **Atualização Mensal**: Sistema atualiza automaticamente as parcelas
- **Status das Dívidas**: Visualize dívidas ativas e completadas

### 🔄 **Ações em Lote**
- **Replicar Mês**: Copie dados para o próximo mês
- **Limpar Mês**: Remova todos os dados de um mês específico
- **Exportar PDF**: Gere relatórios em PDF para impressão

## 🚀 **Como Usar**

### 1. **Primeira Execução**
- Abra o arquivo `index.html` em qualquer navegador moderno
- O sistema salva automaticamente seus dados no navegador

### 2. **Adicionando Receitas/Despesas**
- Preencha a descrição e valor
- Clique em "Adicionar Receita" ou "Adicionar Despesa"
- As transações aparecem nas tabelas correspondentes

### 3. **Gerenciando Cartões**
- **Adicionar Cartão**: Digite o nome e clique em "Adicionar Cartão"
- **Adicionar Dívida**: Selecione o cartão, preencha os dados da dívida
- **Editar/Excluir**: Use os botões de ação em cada item

### 4. **Navegando pelos Meses**
- Use os botões **<** e **>** para navegar entre meses
- As dívidas são atualizadas automaticamente ao avançar no tempo
- Você pode voltar para meses passados e ver o histórico

## 🎯 **Sistema de Parcelas Inteligente**

### **Como Funciona:**
- **Agosto**: Parcela 1/5 - DÍVIDA ATIVA (R$ 100)
- **Setembro**: Parcela 2/5 - DÍVIDA ATIVA (R$ 100)
- **Outubro**: Parcela 3/5 - DÍVIDA ATIVA (R$ 100)
- **Novembro**: Parcela 4/5 - DÍVIDA ATIVA (R$ 100)
- **Dezembro**: Parcela 5/5 - DÍVIDA ATIVA (R$ 100)
- **Janeiro**: Parcela 5/5 - **DÍVIDA COMPLETADA** (R$ 0)

### **Características:**
- ✅ **Histórico Preservado**: Navegue livremente pelos meses
- ✅ **Atualização Automática**: Parcelas avançam automaticamente
- ✅ **Status Visual**: Diferenciação clara entre dívidas ativas e completadas
- ✅ **Cálculo Inteligente**: Valor mensal baseado no status atual

## 🛠️ **Tecnologias Utilizadas**

- **HTML5**: Estrutura semântica e moderna
- **CSS3**: Design responsivo com Flexbox e Grid
- **JavaScript ES6+**: Lógica robusta e orientada a objetos
- **LocalStorage**: Persistência de dados no navegador
- **jsPDF**: Geração de relatórios em PDF
- **Font Awesome**: Ícones profissionais

## 📱 **Design Responsivo**

- **Desktop**: Layout otimizado para telas grandes
- **Tablet**: Adaptação automática para dispositivos médios
- **Mobile**: Interface amigável para smartphones
- **Grid System**: Layout flexível que se adapta a qualquer tela

## 🔧 **Instalação e Configuração**

### **Requisitos:**
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Conexão com internet (apenas para carregar Font Awesome)

### **Passos:**
1. Clone o repositório:
   ```bash
   git clone https://github.com/Ewertonalex/FinanceiroPessoal.git
   ```

2. Navegue para a pasta:
   ```bash
   cd FinanceiroPessoal
   ```

3. Abra o arquivo `index.html` no navegador

## 📁 **Estrutura do Projeto**

```
FinanceiroPessoal/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript
├── .gitignore          # Arquivos ignorados pelo Git
├── README.md           # Documentação
└── assets/             # Recursos (se houver)
```

## 🎨 **Características do Design**

- **Glassmorphism**: Efeito de vidro translúcido
- **Gradientes**: Cores vibrantes e modernas
- **Animações**: Transições suaves e responsivas
- **Ícones**: Font Awesome para melhor usabilidade
- **Paleta de Cores**: Verde para receitas, vermelho para despesas

## 🔒 **Segurança e Privacidade**

- **Dados Locais**: Todas as informações ficam no seu navegador
- **Sem Backend**: Não há envio de dados para servidores externos
- **LocalStorage**: Persistência segura no dispositivo local
- **Sem Cookies**: Não rastreamos suas atividades

## 🚀 **Futuras Melhorias**

- [ ] **Sincronização na Nuvem**: Backup automático
- [ ] **Múltiplas Contas**: Suporte a diferentes perfis
- [ ] **Categorização**: Organização por categorias
- [ ] **Gráficos**: Visualizações estatísticas
- [ ] **Notificações**: Lembretes de pagamentos
- [ ] **Importação/Exportação**: Suporte a CSV/Excel

## 🤝 **Contribuição**

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 **Licença**

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 **Autor**

**Ewerton Alexander**
- GitHub: [@Ewertonalex](https://github.com/Ewertonalex)
- Projeto: [FinanceiroPessoal](https://github.com/Ewertonalex/FinanceiroPessoal)

## 🙏 **Agradecimentos**

- **Font Awesome** pelos ícones
- **jsPDF** pela funcionalidade de PDF
- **Comunidade Open Source** pelo suporte

---

⭐ **Se este projeto te ajudou, considere dar uma estrela no repositório!**
