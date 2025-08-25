# 💰 Controle Financeiro Pessoal

Um sistema completo de controle financeiro pessoal com interface moderna e intuitiva, disponível como aplicação web e **aplicativo desktop executável**.

## 🚀 **Funcionalidades Principais**

### **📊 Controle Financeiro Básico**
- **Receitas e Despesas**: Adicione, edite e exclua transações
- **Saldo Automático**: Cálculo automático do saldo mensal
- **Tabelas Separadas**: Receitas e despesas em cores diferentes
- **Navegação Mensal**: Mude entre meses facilmente

### **💳 Gerenciamento de Cartões de Crédito**
- **Cadastro de Cartões**: Adicione quantos cartões quiser
- **Dívidas Parceladas**: Sistema inteligente de parcelas
- **Atualização Automática**: Parcelas avançam automaticamente mês a mês
- **Controle de Saldo**: Acompanhe o total devido em cada cartão

### **🔄 Sistema Inteligente de Parcelas**
- **Cálculo Automático**: Parcelas avançam conforme os meses passam
- **Histórico Completo**: Visualize o status das dívidas em qualquer mês
- **Finalização Automática**: Dívidas desaparecem após a última parcela
- **Consulta Histórica**: Volte aos meses passados e veja o status correto

### **⚡ Ações em Lote**
- **Replicar Dados**: Copie todos os dados para o próximo mês
- **Limpar Mês**: Apague todos os dados do mês atual
- **Exportar PDF**: Gere relatórios completos em PDF

## 🖥️ **Versões Disponíveis**

### **1. Aplicação Web**
- Funciona em qualquer navegador
- Dados salvos no localStorage
- Interface responsiva e moderna

### **2. Aplicativo Desktop (NOVO! 🎉)**
- **Executável Windows (.exe)**
- **Portátil** - não precisa instalar
- **Funciona offline**
- **Dados persistentes**
- **Interface idêntica** à versão web

## 📦 **Instalação e Uso**

### **🌐 Versão Web**
1. Clone o repositório
2. Abra `index.html` no navegador
3. Pronto! Funciona offline

### **💻 Versão Desktop**
1. **Baixe o executável:** `controle-financeiro-pessoal.exe`
2. **Execute o arquivo** - não precisa instalar
3. **Use normalmente** - dados salvos automaticamente

## 🛠️ **Tecnologias Utilizadas**

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Armazenamento**: LocalStorage (navegador)
- **PDF**: jsPDF + jspdf-autotable
- **Desktop**: Electron
- **Empacotamento**: @electron/packager

## 📁 **Estrutura do Projeto**

```
Controle Financeiro/
├── index.html              # Interface principal
├── styles.css              # Estilos e design
├── script.js               # Lógica da aplicação
├── main.js                 # Processo principal do Electron
├── package.json            # Configurações e dependências
├── dist/                   # Arquivos de distribuição
│   └── controle-financeiro-pessoal-win32-x64/
│       └── controle-financeiro-pessoal.exe  # EXECUTÁVEL!
├── app-portatil/           # Versão portátil alternativa
└── README.md               # Este arquivo
```

## 🔧 **Desenvolvimento**

### **Para Executar em Desenvolvimento**
```bash
# Instalar dependências
npm install

# Executar aplicação web
npm start

# Criar executável desktop
npm run packager
```

### **Para Criar Executável**
```bash
npm run packager
```
O arquivo será criado em: `dist/controle-financeiro-pessoal-win32-x64/`

## 📱 **Design Responsivo**

- **Interface moderna** com gradientes e glassmorphism
- **Cores intuitivas**: Verde para receitas, vermelho para despesas
- **Layout responsivo** que funciona em qualquer tela
- **Ícones profissionais** do Font Awesome
- **Animações suaves** para melhor experiência

## 💡 **Sistema Inteligente de Parcelas**

O sistema calcula automaticamente:
- **Parcela atual** baseada no mês de criação da dívida
- **Parcelas restantes** para o mês visualizado
- **Status da dívida** (ativa/completada)
- **Valor devido** para cada mês específico

**Exemplo**: Dívida de 5 parcelas criada em agosto
- Agosto: Parcela 1 de 5
- Setembro: Parcela 2 de 5
- Outubro: Parcela 3 de 5
- Novembro: Parcela 4 de 5
- Dezembro: Parcela 5 de 5
- Janeiro: Dívida completada (não aparece mais)

## 🎯 **Casos de Uso**

- **Controle pessoal** de receitas e despesas
- **Gerenciamento** de cartões de crédito
- **Acompanhamento** de dívidas parceladas
- **Planejamento** financeiro mensal
- **Relatórios** para análise financeira

## 📄 **Licença**

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 **Autor**

**Ewerton Alexander** - Desenvolvedor Full Stack

## 🤝 **Contribuições**

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📞 **Suporte**

Para dúvidas ou problemas:
- Abra uma issue no GitHub
- Entre em contato com o autor

---

**⭐ Se este projeto te ajudou, considere dar uma estrela no GitHub!**
