"""
Page Object para a página de Cadastro.
"""

from selenium.webdriver.common.by import By
from pages.base_page import BasePage


class CadastroPage(BasePage):
    """Page Object para a página de Cadastro."""
    
    # Localizadores
    NAME_INPUT = (By.ID, "name")
    EMAIL_INPUT = (By.ID, "email")
    PASSWORD_INPUT = (By.ID, "password")
    CONFIRM_PASSWORD_INPUT = (By.ID, "confirmPassword")
    SIGNUP_BUTTON = (By.XPATH, "//button[contains(text(), 'Criar conta')]")
    SUCCESS_MESSAGE = (By.XPATH, "//*[contains(text(), 'Conta criada com sucesso')]")
    ERROR_MESSAGE = (By.XPATH, "//*[contains(@class, 'destructive')]")
    LOGIN_LINK = (By.XPATH, "//a[contains(text(), 'Fazer login')]")
    
    def navigate(self):
        """Navega para a página de cadastro."""
        super().navigate("/cadastro")
    
    def signup(self, name, email, password, confirm_password):
        """Realiza o cadastro."""
        self.type_text(self.NAME_INPUT, name)
        self.type_text(self.EMAIL_INPUT, email)
        self.type_text(self.PASSWORD_INPUT, password)
        self.type_text(self.CONFIRM_PASSWORD_INPUT, confirm_password)
        self.click(self.SIGNUP_BUTTON)
    
    def has_success_message(self):
        """Verifica se mensagem de sucesso está visível."""
        return self.is_visible(self.SUCCESS_MESSAGE, timeout=5)
    
    def get_error_message(self):
        """Obtém mensagem de erro."""
        return self.get_text(self.ERROR_MESSAGE)
    
    def click_login_link(self):
        """Clica no link de login."""
        self.click(self.LOGIN_LINK)
