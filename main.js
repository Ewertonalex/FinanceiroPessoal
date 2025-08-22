const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

// Mantenha uma referência global do objeto da janela
let mainWindow;

function createWindow() {
  // Criar a janela do navegador
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true
    },
    icon: path.join(__dirname, 'assets/icon.png'),
    show: false, // Não mostrar até estar pronto
    titleBarStyle: 'default',
    resizable: true,
    maximizable: true,
    fullscreenable: false
  });

  // Carregar o arquivo HTML
  mainWindow.loadFile('index.html');

  // Mostrar a janela quando estiver pronta
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // Focar na janela
    mainWindow.focus();
  });

  // Abrir links externos no navegador padrão
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Emitido quando a janela é fechada
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Menu da aplicação
  createMenu();
}

// Criar menu da aplicação
function createMenu() {
  const template = [
    {
      label: 'Arquivo',
      submenu: [
        {
          label: 'Novo Mês',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.executeJavaScript(`
                if (window.controleFinanceiro) {
                  window.controleFinanceiro.clearMonth();
                }
              `);
            }
          }
        },
        {
          label: 'Exportar PDF',
          accelerator: 'CmdOrCtrl+E',
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.executeJavaScript(`
                if (window.controleFinanceiro) {
                  window.controleFinanceiro.exportPDF();
                }
              `);
            }
          }
        },
        { type: 'separator' },
        {
          label: 'Sair',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Editar',
      submenu: [
        { role: 'undo', label: 'Desfazer' },
        { role: 'redo', label: 'Refazer' },
        { type: 'separator' },
        { role: 'cut', label: 'Recortar' },
        { role: 'copy', label: 'Copiar' },
        { role: 'paste', label: 'Colar' },
        { role: 'selectall', label: 'Selecionar Tudo' }
      ]
    },
    {
      label: 'Visualizar',
      submenu: [
        { role: 'reload', label: 'Recarregar' },
        { role: 'forceReload', label: 'Forçar Recarregamento' },
        { role: 'toggleDevTools', label: 'Ferramentas de Desenvolvedor' },
        { type: 'separator' },
        { role: 'resetZoom', label: 'Zoom Normal' },
        { role: 'zoomIn', label: 'Aumentar Zoom' },
        { role: 'zoomOut', label: 'Diminuir Zoom' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Tela Cheia' }
      ]
    },
    {
      label: 'Navegação',
      submenu: [
        {
          label: 'Mês Anterior',
          accelerator: 'Left',
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.executeJavaScript(`
                if (window.controleFinanceiro) {
                  document.getElementById('prevMonth').click();
                }
              `);
            }
          }
        },
        {
          label: 'Próximo Mês',
          accelerator: 'Right',
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.executeJavaScript(`
                if (window.controleFinanceiro) {
                  document.getElementById('nextMonth').click();
                }
              `);
            }
          }
        }
      ]
    },
    {
      label: 'Ajuda',
      submenu: [
        {
          label: 'Sobre',
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.executeJavaScript(`
                alert('Controle Financeiro Pessoal\\n\\nVersão 1.0.0\\n\\nDesenvolvido por Ewerton Alexander\\n\\nUm sistema completo para controle de suas finanças pessoais!');
              `);
            }
          }
        },
        {
          label: 'Documentação',
          click: () => {
            shell.openExternal('https://github.com/Ewertonalex/FinanceiroPessoal');
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// Este método será chamado quando o Electron terminar de inicializar
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // No macOS, é comum recriar uma janela quando o dock é clicado
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit quando todas as janelas estiverem fechadas
app.on('window-all-closed', () => {
  // No macOS, é comum para aplicativos manterem-se ativos
  // até que sejam explicitamente fechados com Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Neste arquivo você pode incluir o resto do código específico do processo principal
// Você também pode colocar em arquivos separados e requerê-los aqui.
