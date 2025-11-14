"""
Page Object para a página de Login.
"""

from selenium.webdriver.common.by import By
from pages.base_page import BasePage


class LoginPage(BasePage):
    """Page Object para a página de Login."""
    
    # Localizadores
    EMAIL_INPUT = (By.ID, "email")
    PASSWORD_INPUT = (By.ID, "password")
    LOGIN_BUTTON = (By.XPATH, "//button[contains(text(), 'Entrar')]")
    ERROR_MESSAGE = (By.XPATH, "//*[contains(@class, 'destructive')]")
    CADASTRO_LINK = (By.XPATH, "//a[contains(text(), 'Criar conta')]")
    BACK_TO_HOME = (By.XPATH, "//a[contains(text(), 'Voltar')]")
    
    def navigate(self):
        """Navega para a página de login."""
        super().navigate("/login")
    
    def login(self, email, password):
        """Realiza o login."""
        self.type_text(self.EMAIL_INPUT, email)
        self.type_text(self.PASSWORD_INPUT, password)
        self.click(self.LOGIN_BUTTON)
    
    def get_error_message(self):
        """Obtém mensagem de erro."""
        return self.get_text(self.ERROR_MESSAGE)
    
    def has_error_message(self):
        """Verifica se há mensagem de erro."""
        return self.is_visible(self.ERROR_MESSAGE, timeout=3)
    
    def click_cadastro_link(self):
        """Clica no link de cadastro."""
        self.click(self.CADASTRO_LINK)
    
    def is_on_login_page(self):
        """Verifica se está na página de login."""
        return "/login" in self.get_current_url()