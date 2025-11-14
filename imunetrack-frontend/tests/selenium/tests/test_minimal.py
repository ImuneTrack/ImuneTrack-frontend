from datetime import datetime, timedelta
from pages.dashboard_page import DashboardPage
from pages.agendamentoVacina_page import VaccineSchedulePage


class TestAgendamentoVacina:
    def test_agendar_vacina_sucesso(self, authenticated_driver):

        driver = authenticated_driver

        dashboard = DashboardPage(driver)
        dashboard.wait_for_page_load()
        dashboard.navigate_to_schedule()

        schedule_page = VaccineSchedulePage(driver)
        schedule_page.wait_for_react_to_load()

        future_date = (datetime.now() + timedelta(days=30)).strftime("%d/%m/%Y")

        schedule_page.schedule_vaccine(
            vaccine="BCG",
            date=future_date,
            location="Clínica Teste",
            notes="Teste de agendamento"
        )

        assert schedule_page.has_success_message(), \
            "Mensagem de sucesso não foi exibida após o agendamento"