"""
Testes do Dashboard com Selenium.
"""

import pytest
from selenium.webdriver.common.by import By
from pages.dashboard_page import DashboardPage
from pages.agendamentoVacina_page import VaccineSchedulePage


class TestDashboard:
    """Testes do Dashboard."""

    def test_visualizar_dashboard(self, authenticated_driver):
        """Deve exibir o dashboard corretamente."""
        dashboard = DashboardPage(authenticated_driver)

        assert dashboard.is_logged_in(), "Usuário não está autenticado"
        assert "olá" in dashboard.get_welcome_message().lower(), "Mensagem de boas-vindas não encontrada"

    def test_exibir_cards_estatisticas(self, authenticated_driver):
        """Deve exibir todos os cards de estatísticas."""
        dashboard = DashboardPage(authenticated_driver)

        assert dashboard.are_stats_cards_visible(), "Cards de estatísticas não estão visíveis"

    def test_conteudo_cards_estatisticas(self, authenticated_driver):
        """Deve exibir valores nos cards de estatísticas."""
        dashboard = DashboardPage(authenticated_driver)

        up_to_date = dashboard.get_vaccines_up_to_date_count()
        upcoming = dashboard.get_upcoming_vaccines_count()
        overdue = dashboard.get_overdue_vaccines_count()

        assert up_to_date.isdigit(), "Contagem de vacinas em dia não é numérica"
        assert upcoming.isdigit(), "Contagem de próximas vacinas não é numérica"
        assert overdue.isdigit(), "Contagem de vacinas atrasadas não é numérica"

    def test_navegar_para_agendamento(self, authenticated_driver):
        """Deve navegar para página de agendamento."""
        dashboard = DashboardPage(authenticated_driver)
        dashboard.navigate_to_schedule()

        schedule_page = VaccineSchedulePage(authenticated_driver)
        assert schedule_page.is_on_schedule_page(), "Não foi redirecionado para a página de agendamento"

    def test_navegar_para_historico(self, authenticated_driver):
        """Deve navegar para página de histórico."""
        dashboard = DashboardPage(authenticated_driver)
        dashboard.navigate_to_history()

        assert (
            "history" in authenticated_driver.current_url.lower()
            or dashboard.is_visible((By.XPATH, "//*[contains(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'histórico')]"))
        ), "Não navegou para a página de histórico"

    def test_abrir_configuracoes(self, authenticated_driver):
        """Deve abrir modal de configurações."""
        dashboard = DashboardPage(authenticated_driver)
        dashboard.open_settings()

        settings_modal = (By.XPATH, "//*[contains(text(), 'Configurações')]")
        assert dashboard.is_visible(settings_modal, timeout=5), "Modal de configurações não foi exibido"

    def test_informacoes_usuario_visiveis(self, authenticated_driver):
        """Deve exibir informações do usuário."""
        dashboard = DashboardPage(authenticated_driver)

        assert dashboard.is_visible(dashboard.USER_NAME, timeout=3), "Nome do usuário não está visível"
        assert dashboard.is_visible(dashboard.USER_EMAIL, timeout=3), "Email do usuário não está visível"
