from django.test import LiveServerTestCase
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait # available since 2.4.0
from selenium.webdriver.support import expected_conditions as EC # available since 2.26.0

class WeatherTestCase(LiveServerTestCase):

    def setUp(self):
        self.selenium = webdriver.Chrome()
        super(WeatherTestCase, self).setUp()

    def tearDown(self):
        self.selenium.quit()
        super(WeatherTestCase, self).tearDown()

    def test_weather_component_render(self):
        driver = self.selenium
        
        #Opening the link we want to test
        driver.get('http://127.0.0.1:9001/')
        #Check if elements are present
        try:
            city = driver.find_element_by_id('city')
            date_picker = driver.find_element_by_id('date')
            button = driver.find_element_by_id('forecast')
            active = button.is_enabled()

            #Check if button is enabled (should be disabled)
            self.assertEqual(active,False)
        except Exception as e:
            raise
        finally:
            driver.close()

    def test_weather_component_show_results(self):
        driver = self.selenium
        
        #Opening the link we want to test
        driver.get('http://127.0.0.1:9001/')

        try:
            city = driver.find_element_by_id('city')
            date_picker = driver.find_element_by_id('date')
            button = driver.find_element_by_id('forecast')
            city.send_keys('Miami')
            date_picker.send_keys('06/22/2017')

            #Check if button is enabled (should be)
            self.assertEqual(button.is_enabled(),True)
            
            button.click()

            results = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "results")))

            #Check if results table shows up
            self.assertEqual(results.is_displayed(),True)

        except Exception as e:
            raise
        finally:
            driver.close()