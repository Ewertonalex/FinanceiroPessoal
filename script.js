// Classe principal do Controle Financeiro
class ControleFinanceiro {
    constructor() {
        this.currentMonth = new Date();
        this.data = this.loadData();
        this.initializeEventListeners();
        this.updateDisplay();
        this.updateCardsDropdown();
    }

    // Carregar dados do localStorage
    loadData() {
        const savedData = localStorage.getItem('controleFinanceiro');
        if (savedData) {
            return JSON.parse(savedData);
        }
        
        // Estrutura inicial dos dados
        return {
            months: {},
            creditCards: [],
            debts: []
        };
    }

    // Salvar dados no localStorage
    saveData() {
        localStorage.setItem('controleFinanceiro', JSON.stringify(this.data));
    }

    // Obter chave do mês atual
    getMonthKey() {
        return `${this.currentMonth.getFullYear()}-${String(this.currentMonth.getMonth() + 1).padStart(2, '0')}`;
    }

    // Obter mês atual formatado
    getCurrentMonthFormatted() {
        const months = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        return `${months[this.currentMonth.getMonth()]} ${this.currentMonth.getFullYear()}`;
    }

    // Inicializar mês se não existir
    initializeMonth() {
        const monthKey = this.getMonthKey();
        if (!this.data.months[monthKey]) {
            this.data.months[monthKey] = {
                incomes: [],
                expenses: []
            };
        }
    }

    // Inicializar event listeners
    initializeEventListeners() {
        // Navegação de meses
        document.getElementById('prevMonth').addEventListener('click', () => this.changeMonth(-1));
        document.getElementById('nextMonth').addEventListener('click', () => this.changeMonth(1));

        // Formulários
        document.getElementById('incomeForm').addEventListener('submit', (e) => this.handleIncomeSubmit(e));
        document.getElementById('expenseForm').addEventListener('submit', (e) => this.handleExpenseSubmit(e));
        document.getElementById('cardForm').addEventListener('submit', (e) => this.handleCardSubmit(e));
        document.getElementById('debtForm').addEventListener('submit', (e) => this.handleDebtSubmit(e));

        // Ações em lote
        document.getElementById('replicateMonth').addEventListener('click', () => this.replicateMonth());
        document.getElementById('clearMonth').addEventListener('click', () => this.clearMonth());
        document.getElementById('exportPDF').addEventListener('click', () => this.exportPDF());

        // Modais
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) modal.style.display = 'none';
            });
        });
        
        // Fechar modais ao clicar fora
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });
    }

    // Mudar mês
    changeMonth(direction) {
        const previousMonth = new Date(this.currentMonth);
        this.currentMonth.setMonth(this.currentMonth.getMonth() + direction);
        
        // Se estamos avançando no tempo (direction > 0), atualizar dívidas
        if (direction > 0) {
            this.updateDebtsMonthly();
        }
        
        this.updateDisplay();
    }

    // Atualizar display
    updateDisplay() {
        this.initializeMonth();
        this.updateMonthDisplay();
        this.updateSummaryCards();
        this.updateTables();
        this.updateDebtsList();
    }

    // Atualizar display do mês
    updateMonthDisplay() {
        document.getElementById('currentMonth').textContent = this.getCurrentMonthFormatted();
    }

    // Atualizar cards de resumo
    updateSummaryCards() {
        const monthKey = this.getMonthKey();
        const monthData = this.data.months[monthKey];
        
        const totalIncome = monthData.incomes.reduce((sum, income) => sum + income.amount, 0);
        const totalExpense = monthData.expenses.reduce((sum, expense) => sum + expense.amount, 0);
        const totalBalance = totalIncome - totalExpense;

        document.getElementById('totalIncome').textContent = this.formatCurrency(totalIncome);
        document.getElementById('totalExpense').textContent = this.formatCurrency(totalExpense);
        document.getElementById('totalBalance').textContent = this.formatCurrency(totalBalance);

        // Atualizar cores do saldo
        const balanceElement = document.getElementById('totalBalance');
        if (totalBalance >= 0) {
            balanceElement.style.color = '#27ae60';
        } else {
            balanceElement.style.color = '#e74c3c';
        }
    }

    // Atualizar tabelas
    updateTables() {
        const monthKey = this.getMonthKey();
        const monthData = this.data.months[monthKey];

        this.updateTable('incomeTableBody', monthData.incomes, 'income');
        this.updateTable('expenseTableBody', monthData.expenses, 'expense');
    }

    // Atualizar tabela específica
    updateTable(tableBodyId, items, type) {
        const tbody = document.getElementById(tableBodyId);
        tbody.innerHTML = '';

        items.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.description}</td>
                <td>${this.formatCurrency(item.amount)}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn edit-btn" onclick="controleFinanceiro.editItem('${type}', ${index})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete-btn" onclick="controleFinanceiro.deleteItem('${type}', ${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    // Atualizar lista de dívidas organizada por cartão
    updateDebtsList() {
        const container = document.getElementById('debtsList');
        container.innerHTML = '';

        // Criar container de grid
        const gridContainer = document.createElement('div');
        gridContainer.className = 'debts-grid';

        this.data.creditCards.forEach(card => {
            // Mostrar TODAS as dívidas do cartão, mas com status correto para o mês atual
            const cardDebts = this.data.debts.filter(debt => debt.cardId === card.id);
            
            if (cardDebts.length > 0) {
                const cardSection = document.createElement('div');
                cardSection.className = 'debt-card-section';
                
                cardSection.innerHTML = `
                    <h5><i class="fas fa-credit-card"></i> ${card.name}</h5>
                    <div class="debts-container">
                        ${cardDebts.map((debt, index) => this.createDebtItem(debt, index)).join('')}
                    </div>
                `;
                
                gridContainer.appendChild(cardSection);
            }
        });

        container.appendChild(gridContainer);
    }

    // Criar item de dívida individual
    createDebtItem(debt, index) {
        // Calcular o status da dívida para o mês atual
        const monthKey = this.getMonthKey();
        const monthNumber = parseInt(monthKey.split('-')[1]);
        const yearNumber = parseInt(monthKey.split('-')[0]);
        
        // Calcular quantos meses se passaram desde a criação da dívida
        const debtCreatedDate = new Date(debt.createdAt);
        const debtCreatedMonth = debtCreatedDate.getMonth() + 1;
        const debtCreatedYear = debtCreatedDate.getFullYear();
        
        console.log(`Dívida criada em: ${debtCreatedMonth}/${debtCreatedYear}`);
        console.log(`Mês atual visualizado: ${monthNumber}/${yearNumber}`);
        
        let monthsPassed = 0;
        if (yearNumber > debtCreatedYear) {
            monthsPassed = (yearNumber - debtCreatedYear) * 12 + (monthNumber - debtCreatedMonth);
        } else if (yearNumber === debtCreatedYear) {
            monthsPassed = monthNumber - debtCreatedMonth;
        }
        
        console.log(`Meses passados: ${monthsPassed}`);
        
        // Calcular a parcela atual para este mês específico
        const currentInstallmentForMonth = Math.min(debt.currentInstallment + monthsPassed, debt.installments);
        const remainingInstallments = Math.max(0, debt.installments - currentInstallmentForMonth);
        
        // A dívida só está completada se já passou do mês da última parcela
        const isCompleted = monthsPassed > (debt.installments - debt.currentInstallment);
        
        // Aplicar estilo diferente para dívidas completadas
        const debtItemClass = isCompleted ? 'debt-item completed' : 'debt-item';
        const statusText = isCompleted ? 'DÍVIDA COMPLETADA' : 'DÍVIDA ATIVA';
        const statusColor = isCompleted ? '#27ae60' : '#e74c3c';
        
        return `
            <div class="${debtItemClass}">
                <div class="debt-info">
                    <h6>${debt.description}</h6>
                    <p>Valor da parcela: ${this.formatCurrency(debt.amount)}</p>
                    <p>Parcela atual: ${currentInstallmentForMonth} de ${debt.installments}</p>
                    <p>Parcelas restantes: ${remainingInstallments}</p>
                    <p style="color: ${statusColor}; font-weight: bold; margin-top: 8px;">${statusText}</p>
                </div>
                <div class="debt-actions">
                    <button class="action-btn edit-btn" onclick="controleFinanceiro.editDebt('${debt.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="controleFinanceiro.deleteDebt('${debt.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    // Atualizar dropdown de cartões
    updateCardsDropdown() {
        const select = document.getElementById('debtCard');
        select.innerHTML = '<option value="">Selecione o cartão</option>';
        
        this.data.creditCards.forEach(card => {
            const option = document.createElement('option');
            option.value = card.id;
            option.textContent = card.name;
            select.appendChild(option);
        });
    }

    // Atualizar lista de cartões
    updateCardsList() {
        const container = document.getElementById('cardsList');
        container.innerHTML = '';

        this.data.creditCards.forEach(card => {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card-item';
            
            // Mostrar todas as dívidas do cartão, mas calcular o valor mensal baseado no status atual
            const cardDebts = this.data.debts.filter(debt => debt.cardId === card.id);
            
            // Calcular o valor mensal baseado no status atual de cada dívida
            const totalMonthly = cardDebts.reduce((sum, debt) => {
                const monthKey = this.getMonthKey();
                const monthNumber = parseInt(monthKey.split('-')[1]);
                const yearNumber = parseInt(monthKey.split('-')[0]);
                
                const debtCreatedDate = new Date(debt.createdAt);
                const debtCreatedMonth = debtCreatedDate.getMonth() + 1;
                const debtCreatedYear = debtCreatedDate.getFullYear();
                
                let monthsPassed = 0;
                if (yearNumber > debtCreatedYear) {
                    monthsPassed = (yearNumber - debtCreatedYear) * 12 + (monthNumber - debtCreatedMonth);
                } else if (yearNumber === debtCreatedYear) {
                    monthsPassed = monthNumber - debtCreatedMonth;
                }
                
                const currentInstallmentForMonth = Math.min(debt.currentInstallment + monthsPassed, debt.installments);
                // A dívida só está completada se já passou do mês da última parcela
                const isActive = monthsPassed <= (debt.installments - debt.currentInstallment);
                
                return isActive ? sum + debt.amount : sum;
            }, 0);
            
            // Contar dívidas ativas para este mês
            const activeDebtsCount = cardDebts.filter(debt => {
                const monthKey = this.getMonthKey();
                const monthNumber = parseInt(monthKey.split('-')[1]);
                const yearNumber = parseInt(monthKey.split('-')[0]);
                
                const debtCreatedDate = new Date(debt.createdAt);
                const debtCreatedMonth = debtCreatedDate.getMonth() + 1;
                const debtCreatedYear = debtCreatedDate.getFullYear();
                
                let monthsPassed = 0;
                if (yearNumber > debtCreatedYear) {
                    monthsPassed = (yearNumber - debtCreatedYear) * 12 + (monthNumber - debtCreatedMonth);
                } else if (yearNumber === debtCreatedYear) {
                    monthsPassed = monthNumber - debtCreatedMonth;
                }
                
                const currentInstallmentForMonth = Math.min(debt.currentInstallment + monthsPassed, debt.installments);
                // A dívida só está completada se já passou do mês da última parcela
                return monthsPassed <= (debt.installments - debt.currentInstallment);
            }).length;

            cardDiv.innerHTML = `
                <h5>${card.name}</h5>
                <p>Valor mensal em dívidas: ${this.formatCurrency(totalMonthly)}</p>
                <p>Dívidas ativas: ${activeDebtsCount}</p>
                <div class="action-buttons">
                    <button class="action-btn edit-btn" onclick="controleFinanceiro.editCard('${card.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="controleFinanceiro.deleteCard('${card.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            container.appendChild(cardDiv);
        });
    }

    // Handlers de formulários
    handleIncomeSubmit(e) {
        e.preventDefault();
        const description = document.getElementById('incomeDescription').value;
        const amount = parseFloat(document.getElementById('incomeAmount').value);

        this.addIncome(description, amount);
        e.target.reset();
    }

    handleExpenseSubmit(e) {
        e.preventDefault();
        const description = document.getElementById('expenseDescription').value;
        const amount = parseFloat(document.getElementById('expenseAmount').value);

        this.addExpense(description, amount);
        e.target.reset();
    }

    handleCardSubmit(e) {
        e.preventDefault();
        const name = document.getElementById('cardName').value;

        this.addCreditCard(name);
        e.target.reset();
    }

    handleDebtSubmit(e) {
        e.preventDefault();
        const cardId = document.getElementById('debtCard').value;
        const description = document.getElementById('debtDescription').value;
        const amount = parseFloat(document.getElementById('debtAmount').value);
        const installments = parseInt(document.getElementById('debtInstallments').value);
        const currentInstallment = parseInt(document.getElementById('debtCurrentInstallment').value);

        this.addDebt(cardId, description, amount, installments, currentInstallment);
        e.target.reset();
    }

    // Adicionar receita
    addIncome(description, amount) {
        const monthKey = this.getMonthKey();
        this.initializeMonth();
        
        this.data.months[monthKey].incomes.push({
            id: Date.now(),
            description,
            amount,
            date: new Date().toISOString()
        });

        this.saveData();
        this.updateDisplay();
        this.showNotification('Receita adicionada com sucesso!', 'success');
    }

    // Adicionar despesa
    addExpense(description, amount) {
        const monthKey = this.getMonthKey();
        this.initializeMonth();
        
        this.data.months[monthKey].expenses.push({
            id: Date.now(),
            description,
            amount,
            date: new Date().toISOString()
        });

        this.saveData();
        this.updateDisplay();
        this.showNotification('Despesa adicionada com sucesso!', 'success');
    }

    // Adicionar cartão de crédito
    addCreditCard(name) {
        const card = {
            id: Date.now().toString(),
            name,
            createdAt: new Date().toISOString()
        };

        this.data.creditCards.push(card);
        this.saveData();
        this.updateCardsDropdown();
        this.updateCardsList();
        this.showNotification('Cartão adicionado com sucesso!', 'success');
    }

    // Adicionar dívida
    addDebt(cardId, description, amount, installments, currentInstallment) {
        const debt = {
            id: Date.now().toString(),
            cardId,
            description,
            amount, // Valor da parcela
            installments,
            currentInstallment,
            createdAt: new Date().toISOString()
        };

        this.data.debts.push(debt);
        this.saveData();
        this.updateDebtsList();
        this.updateCardsList();
        this.showNotification('Dívida adicionada com sucesso!', 'success');
    }

    // Editar item
    editItem(type, index) {
        const monthKey = this.getMonthKey();
        const item = this.data.months[monthKey][type + 's'][index];
        
        document.getElementById('editDescription').value = item.description;
        document.getElementById('editAmount').value = item.amount;
        
        this.currentEditItem = { type, index };
        this.openModal('editModal');
    }

    // Salvar edição
    saveEdit() {
        const { type, index } = this.currentEditItem;
        const monthKey = this.getMonthKey();
        
        this.data.months[monthKey][type + 's'][index].description = document.getElementById('editDescription').value;
        this.data.months[monthKey][type + 's'][index].amount = parseFloat(document.getElementById('editAmount').value);
        
        this.saveData();
        this.updateDisplay();
        this.closeModal('editModal');
        this.showNotification('Item editado com sucesso!', 'success');
    }

    // Editar dívida
    editDebt(debtId) {
        const debt = this.data.debts.find(d => d.id === debtId);
        if (debt) {
            document.getElementById('editDebtDescription').value = debt.description;
            document.getElementById('editDebtAmount').value = debt.amount;
            document.getElementById('editDebtInstallments').value = debt.installments;
            document.getElementById('editDebtCurrentInstallment').value = debt.currentInstallment;
            
            this.currentEditDebt = debtId;
            this.openModal('editDebtModal');
        }
    }

    // Salvar edição de dívida
    saveDebtEdit() {
        const debt = this.data.debts.find(d => d.id === this.currentEditDebt);
        if (debt) {
            debt.description = document.getElementById('editDebtDescription').value;
            debt.amount = parseFloat(document.getElementById('editDebtAmount').value);
            debt.installments = parseInt(document.getElementById('editDebtInstallments').value);
            debt.currentInstallment = parseInt(document.getElementById('editDebtCurrentInstallment').value);
            
            this.saveData();
            this.updateDebtsList();
            this.updateCardsList();
            this.closeModal('editDebtModal');
            this.showNotification('Dívida editada com sucesso!', 'success');
        }
    }

    // Deletar item
    deleteItem(type, index) {
        this.showConfirmModal(
            'Tem certeza que deseja excluir este item?',
            () => {
                const monthKey = this.getMonthKey();
                this.data.months[monthKey][type + 's'].splice(index, 1);
                this.saveData();
                this.updateDisplay();
                this.showNotification('Item excluído com sucesso!', 'success');
            }
        );
    }

    // Deletar dívida
    deleteDebt(debtId) {
        this.showConfirmModal(
            'Tem certeza que deseja excluir esta dívida?',
            () => {
                this.data.debts = this.data.debts.filter(d => d.id !== debtId);
                this.saveData();
                this.updateDebtsList();
                this.updateCardsList();
                this.showNotification('Dívida excluída com sucesso!', 'success');
            }
        );
    }

    // Editar cartão
    editCard(cardId) {
        const card = this.data.creditCards.find(c => c.id === cardId);
        if (card) {
            const newName = prompt('Novo nome do cartão:', card.name);
            
            if (newName) {
                card.name = newName;
                this.saveData();
                this.updateCardsDropdown();
                this.updateCardsList();
                this.updateDebtsList();
                this.showNotification('Cartão editado com sucesso!', 'success');
            }
        }
    }

    // Deletar cartão
    deleteCard(cardId) {
        this.showConfirmModal(
            'Tem certeza que deseja excluir este cartão? Todas as dívidas associadas serão removidas.',
            () => {
                this.data.creditCards = this.data.creditCards.filter(c => c.id !== cardId);
                this.data.debts = this.data.debts.filter(d => d.cardId !== cardId);
                this.saveData();
                this.updateCardsDropdown();
                this.updateCardsList();
                this.updateDebtsList();
                this.showNotification('Cartão excluído com sucesso!', 'success');
            }
        );
    }

    // Replicar mês
    replicateMonth() {
        const currentMonthKey = this.getMonthKey();
        const nextMonth = new Date(this.currentMonth);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        
        const nextMonthKey = `${nextMonth.getFullYear()}-${String(nextMonth.getMonth() + 1).padStart(2, '0')}`;
        
        if (this.data.months[currentMonthKey]) {
            this.data.months[nextMonthKey] = {
                incomes: [...this.data.months[currentMonthKey].incomes],
                expenses: [...this.data.months[currentMonthKey].expenses]
            };
            
            this.saveData();
            this.showNotification('Mês replicado com sucesso!', 'success');
        }
    }

    // Limpar mês
    clearMonth() {
        this.showConfirmModal(
            'Tem certeza que deseja limpar todos os dados deste mês? Esta ação não pode ser desfeita.',
            () => {
                const monthKey = this.getMonthKey();
                this.data.months[monthKey] = { incomes: [], expenses: [] };
                this.saveData();
                this.updateDisplay();
                this.showNotification('Dados do mês limpos com sucesso!', 'success');
            }
        );
    }

    // Exportar PDF
    exportPDF() {
        const monthKey = this.getMonthKey();
        const monthData = this.data.months[monthKey];
        
        if (!monthData || (monthData.incomes.length === 0 && monthData.expenses.length === 0)) {
            this.showNotification('Não há dados para exportar neste mês.', 'warning');
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Título
        doc.setFontSize(20);
        doc.text('Relatório Financeiro Mensal', 105, 20, { align: 'center' });
        
        doc.setFontSize(14);
        doc.text(this.getCurrentMonthFormatted(), 105, 35, { align: 'center' });

        // Resumo
        const totalIncome = monthData.incomes.reduce((sum, income) => sum + income.amount, 0);
        const totalExpense = monthData.expenses.reduce((sum, expense) => sum + expense.amount, 0);
        const totalBalance = totalIncome - totalExpense;

        doc.setFontSize(16);
        doc.text('Resumo Financeiro', 20, 55);
        doc.setFontSize(12);
        doc.text(`Receitas: R$ ${totalIncome.toFixed(2)}`, 20, 70);
        doc.text(`Despesas: R$ ${totalExpense.toFixed(2)}`, 20, 80);
        doc.text(`Saldo: R$ ${totalBalance.toFixed(2)}`, 20, 90);

        // Tabela de receitas
        if (monthData.incomes.length > 0) {
            doc.setFontSize(14);
            doc.text('Receitas', 20, 110);
            
            const incomeData = monthData.incomes.map(income => [
                income.description,
                `R$ ${income.amount.toFixed(2)}`
            ]);

            doc.autoTable({
                startY: 115,
                head: [['Descrição', 'Valor']],
                body: incomeData,
                theme: 'grid'
            });
        }

        // Tabela de despesas
        if (monthData.expenses.length > 0) {
            const startY = monthData.incomes.length > 0 ? doc.lastAutoTable.finalY + 10 : 115;
            
            doc.setFontSize(14);
            doc.text('Despesas', 20, startY);
            
            const expenseData = monthData.expenses.map(expense => [
                expense.description,
                `R$ ${expense.amount.toFixed(2)}`
            ]);

            doc.autoTable({
                startY: startY + 5,
                head: [['Descrição', 'Valor']],
                body: expenseData,
                theme: 'grid'
            });
        }

        // Salvar PDF
        doc.save(`relatorio-financeiro-${monthKey}.pdf`);
        this.showNotification('PDF exportado com sucesso!', 'success');
    }

    // Atualizar dívidas automaticamente (chamado mensalmente)
    updateDebtsMonthly() {
        console.log('Atualizando dívidas...');
        console.log('Dívidas antes:', this.data.debts.map(d => ({id: d.id, desc: d.description, current: d.currentInstallment, total: d.installments})));
        
        // NÃO vamos mais modificar debt.currentInstallment aqui
        // O cálculo será feito dinamicamente baseado no mês atual
        
        this.updateDebtsList();
        this.updateCardsList();
        
        console.log('Dívidas não foram modificadas - cálculo dinâmico ativo');
    }

    // Utilitários
    formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }

    // Modais
    openModal(modalId) {
        document.getElementById(modalId).style.display = 'block';
    }

    closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }

    showConfirmModal(message, onConfirm) {
        document.getElementById('confirmMessage').textContent = message;
        this.currentConfirmCallback = onConfirm;
        this.openModal('confirmModal');
    }

    // Event listeners para modais
    setupModalEventListeners() {
        // Formulário de edição
        document.getElementById('editForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveEdit();
        });

        // Formulário de edição de dívida
        document.getElementById('editDebtForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveDebtEdit();
        });

        // Confirmação
        document.getElementById('confirmYes').addEventListener('click', () => {
            if (this.currentConfirmCallback) {
                this.currentConfirmCallback();
            }
            this.closeModal('confirmModal');
        });
    }

    // Notificações
    showNotification(message, type = 'info') {
        // Criar elemento de notificação
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Estilos da notificação
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 10px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            max-width: 300px;
        `;

        // Cores por tipo
        switch (type) {
            case 'success':
                notification.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
                break;
            case 'error':
                notification.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
                break;
            case 'warning':
                notification.style.background = 'linear-gradient(135deg, #f39c12, #e67e22)';
                break;
            default:
                notification.style.background = 'linear-gradient(135deg, #3498db, #2980b9)';
        }

        document.body.appendChild(notification);

        // Remover após 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Adicionar estilos CSS para notificações
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Inicializar aplicação quando DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.controleFinanceiro = new ControleFinanceiro();
    window.controleFinanceiro.setupModalEventListeners();
});
