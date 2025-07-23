from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from .models import *  # Import all models from productos

class ProductosTestCase(TestCase):
    def setUp(self):
        """Set up test data"""
        pass

    def test_models_exist(self):
        """Test that we can import models without errors"""
        # This test will pass if models import successfully
        self.assertTrue(True)

    def test_productos_app_exists(self):
        """Test that the productos app is properly configured"""
        from django.apps import apps
        app = apps.get_app_config('productos')
        self.assertEqual(app.name, 'productos')