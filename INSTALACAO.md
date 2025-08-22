# 🚀 **Instruções de Instalação e Build**

## 📋 **Pré-requisitos**

Antes de começar, você precisa ter instalado:

1. **Node.js** (versão 16 ou superior)
   - Download: https://nodejs.org/
   - Verificar: `node --version`

2. **npm** (vem com o Node.js)
   - Verificar: `npm --version`

## 🔧 **Passo a Passo para Criar o Executável**

### **1. Instalar Dependências**
```bash
npm install
```

### **2. Testar o Aplicativo (Opcional)**
```bash
npm start
```

### **3. Criar o Executável**
```bash
npm run dist
```

### **4. Encontrar o Instalador**
O arquivo `.exe` será criado na pasta `dist/`

## 📁 **Estrutura Após o Build**

```
dist/
├── win-unpacked/                    # Aplicativo não empacotado
│   ├── Controle Financeiro Pessoal.exe
│   └── ... (outros arquivos)
└── Controle Financeiro Pessoal Setup 1.0.0.exe  # Instalador
```

## 🎯 **Características do Aplicativo Desktop**

### **✅ Funcionalidades:**
- **Interface nativa** do Windows
- **Menu completo** com atalhos de teclado
- **Dados persistentes** entre sessões
- **Atalhos** no menu iniciar e área de trabalho
- **Instalador profissional** com NSIS

### **⌨️ Atalhos de Teclado:**
- **Ctrl+N**: Novo mês
- **Ctrl+E**: Exportar PDF
- **Seta Esquerda**: Mês anterior
- **Seta Direita**: Próximo mês
- **Ctrl+Q**: Sair

### **🔧 Menu da Aplicação:**
- **Arquivo**: Novo mês, Exportar PDF, Sair
- **Editar**: Desfazer, Copiar, Colar, etc.
- **Visualizar**: Zoom, Ferramentas de desenvolvedor
- **Navegação**: Mês anterior/próximo
- **Ajuda**: Sobre, Documentação

## 🚨 **Solução de Problemas**

### **Erro: "electron não é reconhecido"**
```bash
npm install electron --save-dev
```

### **Erro: "electron-builder não é reconhecido"**
```bash
npm install electron-builder --save-dev
```

### **Erro de Build**
```bash
# Limpar cache
npm cache clean --force
# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

### **Aplicativo não abre**
- Verificar se o antivírus não está bloqueando
- Executar como administrador
- Verificar logs em `%APPDATA%/Controle Financeiro Pessoal/`

## 🌟 **Vantagens do Aplicativo Desktop**

1. **✅ Executável nativo** (.exe)
2. **✅ Instalação profissional** com NSIS
3. **✅ Atalhos automáticos** no Windows
4. **✅ Dados persistentes** entre sessões
5. **✅ Menu nativo** com atalhos
6. **✅ Sem dependência** do navegador
7. **✅ Interface idêntica** ao projeto web
8. **✅ Funciona offline** após instalação

## 📱 **Distribuição**

### **Para Usuários Finais:**
- Envie apenas o arquivo `.exe` da pasta `dist/`
- O usuário executa e instala normalmente
- Dados são salvos automaticamente

### **Para Desenvolvedores:**
- Clone o repositório
- Execute `npm install`
- Execute `npm run dist`
- Use o executável gerado

## 🔄 **Atualizações**

Para atualizar o aplicativo:

1. **Modifique o código** (HTML, CSS, JS)
2. **Atualize a versão** no `package.json`
3. **Execute** `npm run dist`
4. **Distribua** o novo instalador

## 📞 **Suporte**

Se encontrar problemas:

1. Verifique se o Node.js está atualizado
2. Limpe o cache do npm
3. Reinstale as dependências
4. Verifique os logs de erro
5. Abra uma issue no GitHub

---

**🎉 Agora você tem um aplicativo desktop profissional para Windows!**
