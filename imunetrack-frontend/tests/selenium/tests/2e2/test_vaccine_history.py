"""
Testes de Histórico de Vacinas com Selenium.
"""

import pytest
from selenium.webdriver.common.by import By
from pages.dashboard_page import DashboardPage


class TestVaccineHistory:
    """Testes de histórico de vacinação."""

    def test_acessar_pagina_historico(self, authenticated_driver):
        """Deve acessar página de histórico."""
        dashboard = DashboardPage(authenticated_driver)
        dashboard.navigate_to_history()

        # Verifica que está na página de histórico (título visível)
        history_title = (By.XPATH, "//main//*[contains(text(), 'Histórico')]")
        assert dashboard.is_visible(history_title, timeout=10), "Página de histórico não foi exibida"

        # Garante que URL também indica a página certa
        assert "history" in authenticated_driver.current_url.lower(), "URL não corresponde à página de histórico"

    def test_visualizar_lista_vacinas(self, authenticated_driver):
        """Deve exibir lista de vacinas no histórico (ou mensagem de vazio)."""
        dashboard = DashboardPage(authenticated_driver)
        dashboard.navigate_to_history()

        # Verifica se há lista de vacinas ou mensagem de ausência
        history_items = authenticated_driver.find_elements(By.CSS_SELECTOR, ".vaccine-history-item")
        empty_message = authenticated_driver.find_elements(By.XPATH, "//*[contains(text(), 'Nenhuma vacina encontrada')]")

        assert (history_items or empty_message), "A página de histórico não exibiu nem lista nem mensagem de vazio"

        # Verifica se continua na URL correta
        assert "history" in authenticated_driver.current_url.lower(), "Não está na página de histórico"
